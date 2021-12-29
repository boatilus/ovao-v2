<script lang="ts" context="module">
  const enum Lang {
    TS = 'ts',
    Svelte = 'svelte'
  }

  const COPY_BUTTON_LABEL = 'Copy snippet to clipboard'
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  export let lang: Lang
  export let filename: string
  export let disable_copy = false

  let slot: HTMLElement
  let copy_button: HTMLButtonElement

  const copyButtonTransitionEnd = () => {
    const label = copy_button.attributes.getNamedItem('aria-label')
    label.textContent = COPY_BUTTON_LABEL
  }

  const onCopyMouseOut = () => {
    copy_button.addEventListener('transitionend', copyButtonTransitionEnd)
  }

  const onCopyClick = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(slot.textContent)

      const label = copy_button.attributes.getNamedItem('aria-label')
      label.textContent = 'Copied!'
    }
  }

  onMount(() => {
    return () => {
      if (copy_button) {
        copy_button.removeEventListener(
          'transitionend',
          copyButtonTransitionEnd
        )
      }
    }
  })
</script>

<figure>
  {#if filename}
    <figcaption>{filename}</figcaption>
  {/if}
  <!-- shiki will automatically wrap code in pre/code elements -->
  <div>
    <div bind:this={slot}>
      <slot />
    </div>
    <aside>
      {#if lang === 'ts'}
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title>TypeScript logo</title>
          <path
            d="M20,0 L20,20 L0,20 L0,0 L20,0 Z M15.4066562,8.125 C14.8877344,8.125 14.396125,8.18092188 13.9318125,8.29278125 C13.4675156,8.40464063 13.0589687,8.57928125 12.7061875,8.8166875 C12.3534062,9.05410938 12.0745938,9.35657813 11.8697656,9.72410938 C11.6649219,10.0916406 11.5625,10.5310781 11.5625,11.0424375 C11.5625,11.6953281 11.7502656,12.2523281 12.1258125,12.7134531 C12.5013594,13.1745938 13.0714844,13.5649531 13.8362187,13.8845469 C14.1366562,14.0078125 14.4166094,14.1288125 14.6760625,14.2475156 C14.9355312,14.3662188 15.1597187,14.4894844 15.348625,14.6173281 C15.5375312,14.7451719 15.6865625,14.8844219 15.7957812,15.0350781 C15.9051562,15.18575 15.9596875,15.3569531 15.9596875,15.5487188 C15.9596875,15.6903125 15.925625,15.8215625 15.8573437,15.9425 C15.7890625,16.0634375 15.6854687,16.1684375 15.5466406,16.2575 C15.4077969,16.3465625 15.2348281,16.41625 15.0277031,16.4664063 C14.8205937,16.5165625 14.5782031,16.5417188 14.3005312,16.5417188 C13.8271094,16.5417188 13.3582656,16.4584375 12.8939531,16.2917188 C12.4296562,16.1251563 11.9995,15.8751563 11.6034687,15.541875 L11.6034687,17.7334375 C11.9585312,17.9159375 12.3784375,18.0529688 12.8632344,18.1442188 C13.3480312,18.235625 13.8589844,18.28125 14.396125,18.28125 C14.9196094,18.28125 15.4169062,18.2310938 15.8879687,18.130625 C16.3592187,18.0301563 16.7721875,17.8646875 17.1273437,17.6340625 C17.4823437,17.4034375 17.7634375,17.1021875 17.970625,16.73 C18.1776562,16.3579688 18.28125,15.8979688 18.28125,15.3501094 C18.28125,14.9529063 18.2220312,14.6047813 18.10375,14.3057188 C17.9853125,14.0066719 17.8146875,13.7407344 17.5915625,13.507875 C17.3685937,13.2750313 17.1010937,13.0661563 16.789375,12.88125 C16.4775,12.6963438 16.1259375,12.5217031 15.734375,12.3573438 C15.447625,12.2386406 15.1904375,12.1233594 14.9628437,12.0115 C14.7352344,11.8996406 14.5417812,11.7855 14.3824687,11.6690781 C14.2231406,11.5526406 14.1002344,11.429375 14.01375,11.29925 C13.9272656,11.1691406 13.8840156,11.0218906 13.8840156,10.8575313 C13.8840156,10.7068594 13.9227031,10.5710313 14.0000937,10.4500469 C14.0774844,10.3290625 14.1867344,10.2251875 14.3278437,10.1384375 C14.4689531,10.0517031 14.6419219,9.98435938 14.8467656,9.93642188 C15.0516094,9.88846875 15.2792031,9.8645 15.5295625,9.8645 C15.7117187,9.8645 15.9039062,9.87820313 16.1065625,9.90559375 C16.3090625,9.93298438 16.5128125,9.97521875 16.7176562,10.0322969 C16.9225,10.0893594 17.1215625,10.1612656 17.3151562,10.2480156 C17.5085937,10.3347656 17.6871875,10.4352031 17.8510937,10.5493438 L17.8510937,8.50167188 C17.51875,8.37382813 17.1557812,8.27909375 16.7620312,8.21745313 C16.3682812,8.1558125 15.9165625,8.125 15.4066562,8.125 Z M10.78125,8.28125 L2.8125,8.28125 L2.8125,10.086625 L5.65748438,10.086625 L5.65748438,18.125 L7.92228125,18.125 L7.92228125,10.086625 L10.78125,10.086625 L10.78125,8.28125 Z"
          />
        </svg>
      {/if}
      {#if !disable_copy}
        <button
          bind:this={copy_button}
          on:click={onCopyClick}
          on:mouseleave={onCopyMouseOut}
          aria-label={COPY_BUTTON_LABEL}
          data-microtip-position="left"
          role="tooltip"
        >
          <svg
            width="19px"
            height="16px"
            viewBox="0 0 19 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M16.4474453,-1.11411193 L4.78077859,-1.11411193 C4.41411193,-1.11411193 4.11411193,-0.772910209 4.11411193,-0.355885888 L4.11411193,12.9130698 C4.11411193,13.3300941 4.41411193,13.6333845 4.74744526,13.6333845 L16.4474453,13.6333845 C16.8141119,13.6333845 17.0807786,13.2921828 17.0807786,12.9130698 L17.0807786,-0.355885888 C17.1141119,-0.772910209 16.8141119,-1.11411193 16.4474453,-1.11411193 Z M15.8141119,12.192755 L5.41411193,12.192755 L5.41411193,0.364428847 L15.8141119,0.364428847 L15.8141119,12.192755 Z M13.4474453,17.083313 L1.78077859,17.083313 C1.41411193,17.083313 1.11411193,16.7421113 1.11411193,16.3250869 L1.11411193,3.05613128 C1.11411193,2.63910696 1.41411193,2.33581654 1.74744526,2.33581654 C2.08077859,2.33581654 2.38077859,2.67701826 2.38077859,3.05613128 L2.38077859,15.6047722 L13.4474453,15.6047722 C13.8141119,15.6047722 14.0807786,15.9459739 14.0807786,16.3250869 C14.1141119,16.7421113 13.8141119,17.083313 13.4474453,17.083313 Z"
              transform="translate(9.098712, 7.984601) rotate(-270.000000) translate(-9.098712, -7.984601) "
            />
          </svg>
        </button>
      {/if}
    </aside>
  </div>
</figure>

<style lang="scss">
  @import './src/_core';

  figure {
    --horz-padding: 15px;

    background: var(--color-background-code);
    border-radius: var(--border-radius-standard);
    margin: 1.5em 0;
    min-height: 80px;
    overflow: hidden;

    &:hover button {
      opacity: 1;
    }

    @include mobile {
      overflow: scroll;
    }
  }

  figcaption {
    border-bottom: 1px solid
      hsla(var(--primary-hue), var(--highlight-sat), var(--highlight-lum), 0.35);
    cursor: default;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 2.5px;
    line-height: 2.5;
    margin: 0;
    padding-left: var(--horz-padding);
    text-transform: uppercase;
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  aside {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 5px;

    path {
      fill: var(--color-highlight);
    }

    button {
      background: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
      opacity: 0.4;
      transition: 400ms opacity;

      @include mobile {
        display: none;
      }
    }
  }

  :global(pre) {
    margin: 0;

    @include desktop {
      padding: calc(var(--horz-padding) / 1.5) var(--horz-padding);
    }

    @include mobile {
      padding: 10px;
    }
  }

  :global(pre > code) {
    display: inline-block;
    transition: transform 400ms cubic-bezier(0.25, 1, 0.5, 1);
    transform: translateX(-2rem);
  }

  :global(pre > code span.line) {
    counter-increment: line;
  }

  :global(pre > code .line::before) {
    content: counter(line);
    display: inline-block;
    // padding: 0 0.5em;
    // margin-right: 1em;
    color: var(--color-subdued);
    opacity: 0;
    cursor: default;
    transition: opacity 250ms;
    transition-delay: 75ms;
    width: 2rem;
  }

  :global(figure:hover code) {
    transform: translateX(0);
  }

  :global(figure:hover .line::before) {
    opacity: 1;
  }
</style>
