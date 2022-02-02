---
title: Mocking Shopify's Storefront GraphQL API
date: 2022-02-02
tags: [tech, Shopify, GraphQL, JavaScript, mocking, Node.js]
description: With no solid local development story for Shopify headless e-commerce, mocking the Storefront API in your JavaScript app is the way to seamless development.
---

<script>
  import CodeBlock from '$lib/components/CodeBlock.svelte'
</script>

While recently working on a headless e-commerce project using [Shopify's Storefront API](https://shopify.dev/api/storefront#top) in [Next.js](https://nextjs.org), I found myself wishing for the ability to spin up a local instance of Shopify to develop against. It's becoming an increasingly-popular option for platform providers to offer CLI apps and other tools that can be run locally for development (and testing) purposes, and although Shopify *does* provide tools for local theme development, they don't yet offer an option to simplify local development with the Storefront and Admin APIs.

While the latency cost of having to query an actual Shopify test store is fairly minor overall -- and as a GraphQL API, Storefront is aligned toward keeping response payloads small -- I did find that the extra bit of round-trip latency was having a bit of a negative affect on my development workflow. And, since the Storefront API is rate-limited, making real API requests means there's always a non-zero risk of brushing up against the rate limit during development.

Luckily, thanks to JavaScript HTTP mocking libraries like [Nock](https://github.com/nock/nock), grabbing mock data from a GraphQL client is fairly easy. (Prisma Labs also offers their own tool for achieving this as part of [GraphQL Tools](https://github.com/ardatan/graphql-tools), and suffice it to say there are a number of other alternatives.) What follows is an overview of mocking Storefront API responses from Prisma's [graphql-request](https://github.com/prisma-labs/graphql-request) library.

> ### Note
> For a general overview of mocking, be sure to [check out this blog post](https://blog.scottlogic.com/2016/02/08/data-mocking.html).

## The Setup

Suppose your interface consists of a `shopify.ts` file, which instantiates a `graphql-request` client with your Shopify domain and access token, and `products.ts`, which exports a number of functions for querying products:

<CodeBlock filename="shopify.ts" lang="typescript" escape-content>
  import { GraphQLClient, gql } from 'graphql-request'

  export const client = new GraphQLClient(
    `https://${process.env.SHOPIFY_DOMAIN}/api/2022-01/graphql.json`,
    {
      headers: {
        'X-Shopify-Storefront-Access-Token':
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    }
  )
</CodeBlock>

<CodeBlock filename="products.ts" lang="typescript" escape-content>
  import { gql } from 'graphql-request'
  import { client } from 'shopify.ts'

  export const all = async (limit: number) => {
    return client.request(gql`
      {
        products(first: ${limit}) {
          edges {
            node {
              id
              handle
              productType
              # ..and probably some other fields
            }
          }
        }
      }
    `)
  }

  // ..and probably more functions for dealing with product queries
</CodeBlock>

As is hopefully self-explanatory, users can call `all(5)` and get a promise which will resolve to the first set of five products from the store.

## Implementing Nock

As Nock overrides Node's `http.request` function -- which is how `graphql-request` ultimately processes requests in Node.js environments -- Nock's monkey-patching lets us return our own data from any route we specify.

The simplest approach is to instantiate Nock alongside our client in `shopify.ts`, and we can [set a condition](https://github.com/nock/nock#conditional-scope-filtering) that it only intercepts calls if, say, we're in our development environment:

<CodeBlock filename="products-with-mock.ts" lang="typescript" escape-content>
  import { GraphQLClient } from 'graphql-request'
  import nock from 'nock'

  nock(`https://${process.env.SHOPIFY_DOMAIN}`, {
    conditionally: () => process.env.NODE_ENV === 'development'
  })
    .post('/api/2022-01/graphql.json')
    .reply(200, {
      // GraphQL responses are always wrapped in a `data` object, so make sure
      // you're doing the same in your mocked response. Otherwise, expect your
      // request to throw an unfortunately less-than-helpful error. 
      data: {
        products: {
          edges: [
            {
              node: {
                id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDAxNjk1MjczODk=',
                handle: 'body-cream',
                productType: 'skincare'
              }
            }
          ]
        }
      }
    })

  export const client = new GraphQLClient(
    `https://${process.env.SHOPIFY_DOMAIN}/api/2022-01/graphql.json`,
    {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
      }
    }
  )
</CodeBlock>

Here, we've set up Nock to intercept POST requests to the Storefront API endpoint only if `NODE_ENV === development`. Easy!

> ### Tip
> Since Nock's `conditionally` option is a function, we can get as elaborate with it as we'd like. (We could, for example, bypass the mocked endpoint through the result of querying some external source.) Be sure to check out [Nock's documentation](https://github.com/nock/nock#usage) for more usage guidelines.

As mentioned earlier, using Nock is one approach to solving this particular problem, but certainly not the only approach. One alternative is [fetch-mock](https://github.com/wheresrhys/fetch-mock), which is an isomorphic library for mocking requests via the Fetch API, and is well worth considering. You might also even consider going so far as to set up your own GraphQL server to simplify modifying mock data, or for use in staging environments.