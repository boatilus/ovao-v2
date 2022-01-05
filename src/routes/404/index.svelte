<main>
  <h1>Error 404</h1>
</main>

<style lang="scss">
  :global(body) {
    width: 100%;
    overflow: hidden;
  }

  main {
    align-items: center;
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  h1 {
    cursor: default;
    font-size: 23vw;
    letter-spacing: -0.5rem;
    margin: 0;
    overflow: hidden;
    opacity: 0.3;
    text-overflow: clip;
    text-rendering: geometricPrecision;
    white-space: nowrap;

    @supports (-webkit-text-stroke: 2px white) {
      -webkit-text-stroke: 2px var(--text-color);
      -webkit-text-fill-color: transparent;
    }
  }
</style>
