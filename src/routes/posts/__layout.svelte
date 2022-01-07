<script lang="ts">
  import { theme } from '$lib/stores/theme'

  import './global.scss'
  import themes from '../../themes.json'

  theme.set(themes['/posts*'])
</script>

<div id="posts--container">
  <slot />
</div>

<style lang="scss">
  @import './src/_core';

  #posts--container {
    @include desktop {
      margin: 0 4vw;
      padding: 3.5em 0;
    }
  }
</style>
