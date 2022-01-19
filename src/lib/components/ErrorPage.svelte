<script lang="ts">
  export let status: string = '500'
</script>

<h1>Error {status}</h1>

<style lang="scss">
  @import './src/_core.scss';

  h1 {
    cursor: default;
    font-size: 24vw;
    letter-spacing: -0.5rem;
    margin: 0;
    overflow: hidden;
    opacity: 0.3;
    text-overflow: clip;
    text-rendering: geometricPrecision;
    white-space: nowrap;

    @include mobile {
      margin-top: 0.5em;
    }

    @supports (-webkit-text-stroke: 2px white) {
      -webkit-text-stroke: 2px var(--color-text);
      -webkit-text-fill-color: transparent;
    }
  }
</style>
