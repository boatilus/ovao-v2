---
title: Advanced Routing in Next.js
date: 2022-02-10
tags: [tech, code, Next.js, JavaScript, React]
description: Next.js' filesystem-based routing makes structuring your app simple and automatic, but there are useful options available for more complex routing scenarios.
---

<script>
  import CodeBlock from '$lib/components/CodeBlock.svelte'
</script>

Most web apps tackle routing and their URL structures in a relatively simple and hierarchical way -- for example, displaying products under the `/products/` path, or listing blog posts under `/posts/`. (As this very site does.) Not only does this approach tend to be semantic, neatly conforming to the kind of content users would reasonably expect a given URL to point to, but it's also an approach that's easy to represent in the directory-oriented page structures used by modern frameworks like [Next.js](https://nextjs.org) and [SvelteKit](https://kit.svelte.dev). Drop in a new page or component file at `/about/index.jsx` (or `/about/index.svelte` in SvelteKit-land) and you've now got an `/about` page. Great!

In many cases, breaking out of the confines of file-based application routing is unnecessary (and for SEO purposes, sometimes ill-advised), but Next.js offers an option to open up the hood and delve into more complex routing with [catch-all routes](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes).

> ### Note
> What follows is an overview of the *how*, and illustrates at least some potential *whys*, but be cautious about extending this approach too far and creating too much complexity. [Google offers some recommendations](https://developers.google.com/search/docs/advanced/guidelines/url-structure) about how to maintain simple, crawler-friendly URL structures, and what situations to consider avoiding when designing your app's structure.

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

With access to all the path components in `query`, we can now leverage a custom dispatch mechanism to determine what to render at any given path. A straightforward approach is to describe possible content *types* we'll return from `getStaticProps`, fetching content according to what we've deduced the content type to be, and returning both the content and the type as `props` to our component.

> ### Important
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

If you've gotten this far, you're probably questioning whether the additional complexity is worth it for this use case. To which I'd answer: "*probably* not", but it depends. There's nothing particularly or notably wrong, in this case, with both a night cream and a fragrance being listed under a `/products/` path. (They are, after all, both products.)

While it's true that the structure and apperance of a URL may not have quite the relevance to users as they once did, they still remain one of primary ways we share content with each other on the web, and it's still important for URLs to be structurally meaningful, semantic, and, in to a point, short. If sidestepping the limitations of filesystem-based routing is the right approach for your app, Next provides the means for you to do so with some added complexity.