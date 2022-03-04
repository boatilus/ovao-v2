---
title: On-Demand Static Regeneration in Next.js
date: 2022-03-05
tags: [tech, code, Next.js, JavaScript, TypeScript, React]
description: Next.js' new on-demand incremental static regeneration support further bridges the gap between static- and server-side rendering.
---

<script>
  import CodeBlock from '$lib/components/CodeBlock.svelte'
</script>

The Next.js team introduced incremental static regeneration (or ISR) [way back in 2020](https://nextjs.org/blog/next-9-5#stable-incremental-static-regeneration]), allowing statically-generated pages to update their content according to specified time intervals, without requiring a full app rebuild. Mimicking HTTP's [stale-while-revalidate](https://datatracker.ietf.org/doc/html/rfc5861#section-3) mechanism, a visitor's page request can kick off an incremental addition to (or replacement of) the static site content, which will then be available immediately to all subsequent visitors to that page, served hot from cache.

In that early generation of incremental static revalidation, the behavior was strictly request-driven: ISR will only kick in when there's a request for a page not already present in the static cache, and only after a specified revalidation interval. There was no way (or at least no way that wouldn't be considered a hack) to kick manually off ISR otherwise.

Despite it being a mere point release, [Next.js 12.1](https://nextjs.org/blog/next-12-1) kinda turns the situation on its head.

With 12.1, we now have on tap what's known as _on-demand incremental static generation_. In short, [on-demand ISR](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) gives us the option to trigger static generation outside the context of requests. We can trigger it with a user's button click, from a page request, from an API request or webhook, from a timer, or by whatever mechanism makes sense for the app. With this, we can effectively eliminate a major source of tradeoffs in traditional static page generation.

An obvious use case for on-demand ISR, as Vercel themselves allude to, is e-commerce. Previously, developers have been forced to consider very carefully as to how to handle product additions, price changes, out-of-stock conditions and so on when leveraging statically-generated product pages, collection pages, and the like. With the prior generation of ISR in Next, users could only see current inventory availability if, for example, we used SSR for product pages, if we'd configured ISR _and_ if a visitor doesn't make that page request before the next revalidation interval, _or_ if we fetch inventory availability on the client after hydration. Regardless of the exact approach, there are notable tradeoffs.

With on-demand ISR, however, we can, for example, listen on a product inventory update webhook from our e-commerce platform to automatically trigger re-generation of a product page, and provide users with then up-to-date information on product availability.

> ### Note
>
> If you're running Shopify, check out [the official documentation](https://shopify.dev/api/admin-rest/2022-01/resources/webhook) for an overview on working with their webhooks.

## An Example Implementation

Let's look at a simple use case of updating a product's inventory availability with on-demand ISR. In our example, we'll set up an API route that listens for webhook requests, retrieving the SKU provided by our hypothetical webhook body, and using that SKU to drive regeneration of our 'static' product page:

<CodeBlock filename="pages/api/webhook.ts" lang="typescript" escape-content>
  import type { NextApiRequest, NextApiResponse } from 'next'

  const handler = async ({ body }: NextApiRequest, res: NextApiResponse) => {
    // IMPORTANT: Always validate the authenticity of the webhook before handling.

    // Let's assume the webhook sends a JSON body containing the SKU that's
    // been modified.
    const { sku } = body

    try {
      const path = `/products/${sku}`

      console.log(`revalidating ${path}..`)

      // Calling unstable_revalidate on the response object will trigger the
      // server to regenerate the resource at path by calling that page's
      // getStaticProps function.
      await res.unstable_revalidate(path)

      res.send('OK')
    } catch (err) {
      // unstable_revalidate may throw for a variety of reasons, including from
      // specifying an invalid path.
      res.status(500).send(`revalidating ${sku}: ${err}`)
    }
  }

  export default handler
</CodeBlock>

The magic bullet here is `res.unstable_revalidate`. Regardless of the mechanism of how we're fetching data in our page's `getStaticProps` function, `unstable_revalidate` is simply re-triggering the data fetch at the route specified by `path`.

In our product page, we implement our component, `getStaticPaths`, and `getStaticProps` exactly as we usually would. The webhook request handler we specified in `webhook.ts` will simply call `getStaticProps` at the specified path. If, formerly, we were supplying [the `revalidate` option](https://nextjs.org/docs/api-reference/data-fetching/get-static-props#revalidate) to leverage traditional ISR, we can potentially remove it if we can instead fully rely on our webhook to keep all page content up to date. (In practice, you may not want to do this.) 

<CodeBlock filename="pages/products/[sku].tsx" lang="tsx" escape-content>
  import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
  import type { PropsWithChildren } from 'react'
  import { getProductBySKU } from 'db'

  interface Props {
    sku?: string
    name?: string
    inventory_available?: number
  }

  const ProductPage: NextPage = (props: PropsWithChildren<Props>) => {
    return (
      <>
        <h1>{props.name}</h1>
        <p>Quantity available: {props.inventory_available}</p>

        ...
      </>
    )
  }

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    let sku = ''
    if (typeof params !== 'undefined') {
      sku = params['sku'] as string
    }

    // Fetch current product details.
    const product = await getProductBySKU(sku)

    return {
      props: {
        sku,
        name: product.name,
        inventory_available: product.inventory_available
      }
    }
  }

  export const getStaticPaths: GetStaticPaths = () => {
    return {
      paths: [
        { params: { sku: 'facial-cream' } },
        { params: { sku: 'shower-gel' } }
      ]
    }
  }

  export default ProductPage
</CodeBlock>

There's a fair amount of code here to grok, but it's no different than what we'd otherwise implement for our product pages. This highlights one of the best aspects of on-demand ISR, in that it requires pretty minimal changes to the codebase. The API handler handles the 'heavy lifting' for us: whenever the webhook's fired, the product page is statically regenerated in the background, and every user immediately sees fresh, current product data.

## Known Limitations

One of the largest limitations on on-demand ISR, currently, is that a while call to `NextApiResponse.unstable_revalidate` will re-run a page's `getStaticProps` function, but will *not* re-run that page's `getStaticPaths` function. Given this, it's not currently possible with on-demand ISR for example, to add a new product to our app without triggering a full re-build, or by leveraging either `fallback: true` or `fallback: 'blocking'`.

> ### Note
>
> Be sure to reference [Next.js's documentation](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false) on the `fallback` property carefully for your use case, as well as implementation details specific to fallback pages.

As of the time of writing, another minor limitation is that the revalidation function currently only accepts a single, fully-specified path. To revalidate multiple pages simulatneously from one webhook handler, you'll need to call `NextApiResponse.unstable_revalidate` once for each path.

## Wrapping Up

Suffice it to say that, in a pretty healthy number of contexts, it's possible now with on-demand incremental static regeneration to really close the traditional gaps between server-rendered and statically-rendered apps. With a relatively small amount of extra code, we can selectively re-generate static pages with fresh content without falling back to traditional SSR with `getServerSideProps`, without needing to tune our revalidation intervals, and without having to trigger full app re-builds. I'm really excited to see similar features make it into other frameworks and platforms.