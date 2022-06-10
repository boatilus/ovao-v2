---
title: JAMStack May Finally Have it Solved
date: 2022-03-02
tags: [tech, code, Next.js, JavaScript, JAMstack, React]
description: Next.js' filesystem-based routing makes structuring your app simple and automatic, but there are useful options available for more complex routing scenarios.
---

<script>
  import CodeBlock from '$lib/components/CodeBlock.svelte'
</script>

I am, for better or for worse, a compiled language guy. I cut my programming teeth on C++, where I pained over massive, template-laden, SFINAE-induced build times, but I knew the benefits. Despite genuinely loving JavaScript, I'm miserable without having a compiler in front of it (these days, that's mostly tsc). I reach for Go whenever I can, and as few others are, I'm appreciative when it chew me out over not using a variable. (That, my friend, is, and _should be_, an error.) So it probably comes as no surprise that I'm all-in on JAMstack and the statically-generated web.

The Next.js crew introduced incremental static regeneration (or ISR) [https://nextjs.org/blog/next-9-5#stable-incremental-static-regeneration](way back in 2020), allowing statically-generated apps to update their content according to fixed time intervals, without requiring a full app rebuild. Mimicking HTTP's [https://datatracker.ietf.org/doc/html/rfc5861#section-3](stale-while-revalidate) mechanism, a visitor's page request can kick off an incremental addition to (or replacement of) the static site content, which will then be available immediately to all subsequent visitors to that page, served hot from cache. ISR has also proven a useful technique to reduce build-time costs: by selecting only a subset of pages for build time generation, a developer can rely on ISR to build out the remaining pages only as needed. Subsetting sites to build out only the hot paths means we can offset the generation of cold paths to whenever they're first requested.

In that early generation of incremental static revalidation, the behavior was strictly request-driven: ISR will only kick in when there's a request for a page not already present in the static cache. There was no way (at least no way that wouldn't be considered a total hack) to kick off ISR otherwise.

Despite it being a mere point release, Next.js 12.1 kinda throws a wrench into things -- and in a way I expect developers may not appreciate.

With 12.1, we now have on tap what's known as on-demand incremental static generation. In short, on-demand ISR allows us to trigger static generation outside the context of requests. We can trigger it with a user's button click, from a page request, from an API request or webhook, from a timer, or by whatever mechanism makes sense for the app. With this, we no longer need to make any tradeoffs to leverage the best that JAMstack offers: we have full reign over what happens when, and at what level of performance.

An obvious use case for on-demand ISR is e-commerce. Before, there were open questions as to how to handle product additions, price changes, out-of-stock conditions and so on. With the prior generation of ISR in Next, users could only see current inventory availability if we used server-side rendering for product pages, or if we'd configured ISR _and_ if a visitor had previously visited a product page prior to another (`stale-while-revalidate` is...complicated). With on-demand ISR, we can, for example, listen on a Shopify product inventory update webhook to automatically trigger re-generation of a product page and provide users with then-up-to-date information on product availability with

> ### Note
>
> What follows is an overview of the _how_, and illustrates at least some potential _whys_, but be cautious about extending this approach too far and creating too much complexity. [Google offers some recommendations](https://developers.google.com/search/docs/advanced/guidelines/url-structure) about how to maintain simple, crawler-friendly URL structures, and what situations to consider avoiding when designing your app's structure.

## Employing Catch-All Routes for Custom Dispatch

Without touching on the basics of Next.js' routing -- that's all well-covered in the [documentation](https://nextjs.org/docs/routing/introduction) -- I'd like to explore one potential use case for Next's catch-all routes, and present one possible implementation approach.

Let's consider an e-commerce store that offers self-care products in a range of product categories, from skincare, to haircare products and fragrances. The simplest way to represent our store's structure in Next.js might be:

```
pages/
├── index.jsx
├── skincare.jsx
├── haircare.jsx
├── fragrances.jsx
├── products/
│   ├── index.jsx
│   ├── [title].jsx
```

Here, we might expect to see a listing of skincare products under `/skincare/`, haircare products under `/haircare/`, and so on, where individual page files support a level of hand-customization of the layout, header images, synoposes and so forth for each category. Individual products would then be accessible at -- as an example -- `/products/night-cream` with our `/products/[title].jsx` page handler. This setup works well, and is pretty similar to the structured URLs you'll see across platforms like Shopify and BigCommerce. If we instead wanted to maintain the product's category within the URL, while keeping our URL short and simple (for example, having our night cream accessible at `/skincare/night-cream`), we can instead employ a catch-all route:

```
pages/
├── index.jsx
├── [...slug].jsx
```

In `[...slug].jsx`, depending on whether we're looking to pre-render or server render our pages, we'll implement and export `getStaticProps` (in tandem with `getStaticPaths`) or `getServerSideProps`, which will fetch the data needed for the route based on the `query` property returned from the `context` argument:

<CodeBlock filename="[...slug].jsx" lang="jsx" escape-content>
  import { getStaticProps } from 'next'

export const getStaticProps = async (context) => {
const { query } = context
// query (an array of path components) will be [skincare] if the visitor
// accessed /skincare, and [skincare, night-cream] if the visitor
// accessed /skincare/night-cream.
//
// If we also wanted to expose product variations along sub-routes,
// a visitor hitting /skincare/night-cream/4oz would yield a query
// containing [skincare, night-cream, 4oz] -- we can take this as deep as
// we'd like.

    return {
      props: {} // we'll get to this.
    }

}
</CodeBlock>

With access to all the path components in `query`, we can now leverage a custom dispatch mechanism to determine what to render at any given path. A straightforward approach is to describe possible content _types_ we'll return from `getStaticProps`, fetching content according to what we've deduced the content type to be, and returning both the content and the type as `props` to our component.

> ### Important
>
> The following is designed purely to be illustrative code, and is a naïve implementation that intentionally skirts many details. A robust design is an exercise for the reader. Note also that use of `getStaticProps` requires a complementary implementation of `getStaticPaths`, providing a list of pages which need to be pre-rendered based on fetched content. For the sake of brevity, an implementation of `getStaticPaths` isn't shown here.

<CodeBlock filename="[...slug].jsx"  lang="jsx" escape-content>
  import { getStaticProps } from 'next'
  import db from 'lib/db'

export const getStaticProps = async (context) => {
const { query } = context

    // To keep it simple, let's assume query[0] is always the product category,
    // and query[1] -- if present -- the product's title.
    switch (query.length) {
      case 1:
        const data = await db.getProductsByCategory(query[0])

        return {
          props: {
            data,
            type: 'category'
          }
        }
      case 2:
        const data = await db.getProductByTitle(query[1])

        return {
          props: {
            data,
            type: 'product'
          }
        }
      default:
        // 🤷🏻‍♂️
    }

}
</CodeBlock>

While the use of the switch statement here is inelegant (at best), it conveys the basic idea: we deduce the type of content according to the value of `query`, fetch that content accordingly, then return the content along with the content type -- `category` or `product` -- in `props`. In our page component, we key rendering based on `props.type`:

<CodeBlock filename="[...slug].jsx" lang="jsx" escape-content>
  import { getStaticProps } from 'next'

import CategoryListView from 'lib/components/CategoryListView'
import ProductView from 'lib/components/ProductView'

export default (props) => {
switch (props.type) {
case 'category':
return <CategoryListView data={data} />
case 'product':
return <ProductView data={data} />
default:
// do something else
}
}

export const getStaticProps = async (context) => {
// omitted
}
</CodeBlock>

This code requires little in the way of explanation, and achieves the desired result: visitors can expect a list of skincare products at `/skincare` and the product view for the night cream at `/skincare/night-cream`. Similarly, a list of haircare products at `/haircare` and a product view at, say, `/haircare/tea-tree-shampoo`. For consistency, you'd also want to consider configuring checks and redirects to canonical product URLs if a visitor, for example, somehow winds up at `/fragrances/night-cream`.

During pre-rendering, Next will evaluate `getStaticPaths`, `getStaticProps`, and our page component, generating a static pages for categories and products as part of the build output.

## Is This Really Worth It?

If you've gotten this far, you're probably questioning whether the additional complexity is worth it for this use case. To which I'd answer: "_probably_ not", but it depends. There's nothing particularly or notably wrong, in this case, with both a night cream and a fragrance being listed under a `/products/` path. (They are, after all, both products.)

While it's true that the structure and apperance of a URL may not have quite the relevance to users as they once did, they still remain one of primary ways we share content with each other on the web, and it's still important for URLs to be structurally meaningful, semantic, and, in to a point, short. If sidestepping the limitations of filesystem-based routing is the right approach for your app, Next provides the means for you to do so with some added complexity.
