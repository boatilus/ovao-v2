<blockquote>
  <h3 class="prepend">Note</h3>
  <slot />
</blockquote>

<style lang="scss">
  blockquote {
    background: var(--color-background-dark);
    font-size: 16px;
    margin: 0;
    padding: 1em;
  }

  .prepend {
    color: var(--color-highlight);
    display: inline;
    font-size: inherit;
    letter-spacing: 0.1em;
    margin-right: 0.35em;
    text-transform: uppercase;

    &::after {
      content: ':';
    }
  }
</style>
