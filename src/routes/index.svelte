<script lang="ts" context="module">
  export const prerender = true
</script>

<script lang="ts">
  import { Easings } from '$lib/util/anime'
  import { started } from '$lib/stores/core'
  import anime from 'animejs'
  import { onMount } from 'svelte'
  import { theme } from '$lib/stores/theme'
  import { TITLE } from '$lib/variables'

  import themes from '../themes.json'

  theme.set(themes['/'])

  let h1_element: SVGElement
  let h2_element: SVGElement
  let summary_element: HTMLDivElement

  onMount(() => {
    if ($started) {
      h1_element.style.opacity = '1'
      h2_element.style.opacity = '1'
      summary_element.style.opacity = '1'
    } else {
      const h1_gradient = h1_element.querySelectorAll('rect')
      const h2_gradient = h2_element.querySelectorAll('rect')

      if (h1_gradient && h2_gradient) {
        anime({
          targets: [h1_element, h2_element, summary_element],
          duration: 950,
          delay: anime.stagger(220),
          translateX: {
            value: [-15, 0],
            easing: Easings.OutCubic
          },
          opacity: {
            value: [0, 1],
            easing: Easings.Linear
          }
        })
        anime({
          targets: [h1_gradient, h2_gradient],
          translateX: [0, 800],
          delay: anime.stagger(200),
          duration: 2200,
          easing: Easings.OutCubic
        })
      }
    }
  })
</script>

<svelte:head>
  <title>{TITLE}</title>

  <noscript>
    <style>
      #h1,
      #h2 {
        opacity: 0 !important;
      }

      #index--summary {
        opacity: 1 !important;
      }
    </style>
  </noscript>
</svelte:head>

<div id="index--container">
  <svg
    bind:this={h1_element}
    id="h1"
    width="242px"
    height="193px"
    viewBox="0 0 242 193"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <linearGradient id="gradient" x1="30%" y1="100%" x2="0%" y2="100%">
        <stop offset="0%" />
        <stop stop-opacity="0" offset="100%" />
      </linearGradient>
    </defs>
    <title>Hi.</title>
    <g
      transform="translate(2.000000, 2.000000)"
      fill="none"
      fill-rule="nonzero"
      stroke-width="2"
    >
      <path
        vector-effect="non-scaling-stroke"
        d="M28.56,4.2 L28.56,82.2 L114.7,82.2 L114.7,4.2 L144.26,4.2 L144.26,188.2 L114.7,188.2 L114.7,106.82 L28.56,106.82 L28.56,188.2 L-1,188.2 L-1,4.2 L28.56,4.2 Z"
      />
      <path
        vector-effect="non-scaling-stroke"
        d="M191.65,57.24 L191.65,188.2 L162.09,188.2 L162.09,57.24 L191.65,57.24 Z M176.87,-1 C182.352983,-1 186.867505,0.706383871 190.42826,4.0845363 C194.011078,7.48361986 195.81,11.7532366 195.81,16.9 C195.81,22.0467634 194.011078,26.3163801 190.42826,29.7154637 C186.867505,33.0936161 182.352983,34.8 176.87,34.8 C171.387017,34.8 166.872495,33.0936161 163.31174,29.7154637 C159.728922,26.3163801 157.93,22.0467634 157.93,16.9 C157.93,11.7532366 159.728922,7.48361986 163.31174,4.0845363 C166.872495,0.706383871 171.387017,-1 176.87,-1 Z"
      />
      <path
        vector-effect="non-scaling-stroke"
        d="M220.1,153.18 C225.597426,153.18 230.077748,154.982115 233.55623,158.552135 C237.03566,162.12313 238.78,166.471144 238.78,171.6 C238.78,176.549769 237.039662,180.812763 233.55623,184.387865 C230.077748,187.957885 225.597426,189.76 220.1,189.76 C214.610145,189.76 210.088598,187.962812 206.522893,184.397107 C202.945207,180.819421 201.16,176.552727 201.16,171.6 C201.16,166.46806 202.949369,162.116417 206.522893,158.542893 C210.088598,154.977188 214.610145,153.18 220.1,153.18 Z"
      />
    </g>
    <rect
      x="-300"
      y="0"
      width="1000"
      height="100%"
      stroke="none"
      fill="url(#gradient)"
    />
  </svg>
  <svg
    bind:this={h2_element}
    id="h2"
    width="513px"
    height="118px"
    viewBox="0 0 513 118"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>I'm Ron.</title>
    <defs>
      <linearGradient id="gradient" x1="25%" y1="100%" x2="0%" y2="100%">
        <stop offset="0%" />
        <stop stop-opacity="0" offset="100%" />
      </linearGradient>
    </defs>
    <g
      transform="translate(2.000000, 2.000000)"
      fill="none"
      fill-rule="nonzero"
      stroke-width="2"
    >
      <path
        vector-effect="non-scaling-stroke"
        d="M17.96,-1 L17.96,113 L-1,113 L-1,-1 L17.96,-1 Z"
      />
      <path
        vector-effect="non-scaling-stroke"
        d="M55.094605,-1 L38.7490731,38.6 L24.9737012,38.6 L34.410297,-1 L55.094605,-1 Z"
      />
      <path
        vector-effect="non-scaling-stroke"
        d="M156.16,29.72 C166.399294,29.72 174.41719,32.833563 180.246293,38.9926152 C186.045061,45.1196154 189,54.2374936 189,66.4 L189,66.4 L189,113 L170.04,113 L170.04,68.16 C170.04,60.7642224 168.675615,55.1921425 165.845329,51.4870404 C163.088589,47.8782174 158.936374,46.12 153.44,46.12 C147.7795,46.12 143.152857,48.2392446 139.563731,52.4855346 C135.904378,56.8149098 134.12,63.0130042 134.12,71.04 L134.12,71.04 L134.12,113 L115.16,113 L115.16,68.16 C115.16,60.7659558 113.783412,55.1948394 110.92799,51.4905079 C108.143992,47.8788351 103.950635,46.12 98.4,46.12 C92.8427722,46.12 88.2706743,48.2418271 84.683731,52.4855346 C81.0243781,56.8149098 79.24,63.0130042 79.24,71.04 L79.24,71.04 L79.24,113 L60.28,113 L60.28,31.64 L77.19966,31.64 L78.420648,41.1365736 C80.8480934,37.9511172 83.8522487,35.3609404 87.4334184,33.3663649 C91.786788,30.9417033 96.8272376,29.72 102.56,29.72 C109.0504,29.72 114.545117,31.0136711 119.05328,33.5701295 C123.13956,35.8873493 126.424682,39.2422928 128.899082,43.6439711 C131.752506,39.5797836 135.425116,36.3124463 139.918451,33.8435808 C144.920079,31.0954338 150.333693,29.72 156.16,29.72 Z"
      />
      <path
        vector-effect="non-scaling-stroke"
        d="M271.36,-1 C280.404922,-1 287.835869,0.54392815 293.663698,3.59400645 C299.559816,6.67982547 303.932699,10.846652 306.797189,16.0798545 C309.649409,21.2906407 311.08,27.0765637 311.08,33.44 C311.08,40.5741595 309.184417,47.0488557 305.398082,52.865544 C301.871738,58.2828262 296.529377,62.2942661 289.344678,64.8675525 L288.773636,65.0677183 L312.820471,113 L290.892052,113 L269.132052,67.88 L250.76,67.88 L250.76,113 L231.8,113 L231.8,-1 L271.36,-1 Z M270.24,15.24 L250.76,15.24 L250.76,53.08 L270.4,53.08 L270.908075,53.077211 C277.977563,52.9990941 283.216722,51.278994 286.557582,47.7885431 C289.961217,44.2325064 291.64,39.6029702 291.64,33.92 C291.64,28.2480918 289.995095,23.6999878 286.647597,20.3017704 C283.274072,16.8771318 277.778169,15.24 270.24,15.24 L270.24,15.24 Z"
      />
      <path
        vector-effect="non-scaling-stroke"
        d="M353.92,29.72 C361.679572,29.72 368.644645,31.5017779 374.818615,35.0531766 C380.998892,38.6082029 385.92315,43.5836222 389.587786,49.9830625 C393.242426,56.3650447 395.08,63.8087291 395.08,72.32 C395.08,80.8312709 393.242426,88.2749553 389.587786,94.6569375 C385.922782,101.057019 380.970981,106.03329 374.735318,109.588712 C368.508271,113.139221 361.517515,114.92 353.76,114.92 C346.000428,114.92 339.035355,113.138222 332.861385,109.586823 C326.678832,106.030488 321.780275,101.053089 318.169022,94.6513212 C314.569834,88.2709437 312.76,80.8291065 312.76,72.32 C312.76,63.8087291 314.597574,56.3650447 318.252214,49.9830625 C321.917218,43.5829811 326.869019,38.6067104 333.104682,35.0512883 C339.332887,31.5001186 346.270498,29.72 353.92,29.72 Z M353.92,46.28 C350.048148,46.28 346.456256,47.2473085 343.144697,49.1832968 C339.83037,51.1209033 337.161024,54.0080799 335.122353,57.8305882 C333.056127,61.7047625 332.04,66.5378133 332.04,72.32 C332.04,78.1021867 333.056127,82.9352375 335.122353,86.8094118 C337.161712,90.6332098 339.806016,93.5218346 343.070539,95.4601453 C346.328279,97.3944287 349.891724,98.36 353.76,98.36 C357.631852,98.36 361.223744,97.3926915 364.535303,95.4567032 C367.84963,93.5190967 370.518976,90.6319201 372.557647,86.8094118 C374.623873,82.9352375 375.64,78.1021867 375.64,72.32 C375.64,66.5339817 374.648638,61.6979964 372.632783,57.8213527 C370.647191,54.0029055 368.006134,51.1188595 364.695303,49.1832968 C361.383744,47.2473085 357.791852,46.28 353.92,46.28 Z"
      />
      <path
        vector-effect="non-scaling-stroke"
        d="M448,29.72 C457.922356,29.72 465.704132,32.8355501 471.376062,39.0030859 C477.008561,45.1277453 479.88,54.2425291 479.88,66.4 L479.88,66.4 L479.88,113 L461.08,113 L461.08,68.16 C461.08,60.7775884 459.61777,55.2129731 456.586522,51.5138226 C453.611739,47.8835795 449.130884,46.12 443.2,46.12 C437.206064,46.12 432.249767,48.2474202 428.337154,52.5157246 C424.375017,56.8380555 422.44,63.0269493 422.44,71.04 L422.44,71.04 L422.44,113 L403.48,113 L403.48,31.64 L420.432265,31.64 L421.504333,43.2987389 C423.924728,39.5305621 427.119237,36.4644349 431.088346,34.1008082 C435.983101,31.185954 441.618659,29.72 448,29.72 Z"
      />
      <path
        vector-effect="non-scaling-stroke"
        d="M497.6,90.68 C501.097426,90.68 503.944415,91.8321152 506.15623,94.1021353 C508.368994,96.3731298 509.48,99.1378106 509.48,102.4 C509.48,105.549769 508.372996,108.262763 506.15623,110.537865 C503.944415,112.807885 501.097426,113.96 497.6,113.96 C494.110145,113.96 491.238598,112.812812 488.972893,110.547107 C486.695207,108.269421 485.56,105.552727 485.56,102.4 C485.56,99.1347264 486.699369,96.3664172 488.972893,94.0928932 C491.238598,91.8271884 494.110145,90.68 497.6,90.68 Z"
      />
    </g>
    <rect
      x="-250"
      y="0"
      width="1000"
      height="100%"
      stroke="none"
      fill="url(#gradient)"
    />
  </svg>
  <div bind:this={summary_element} id="index--summary">
    <p>
      I'm a developer, technologist and business analyst in Los Angeles. I'm on <a
        href="https://github.com/boatilus"
        rel="external">GitHub</a
      >, and I blog <a href="/posts" sveltekit:prefetch>occasionally</a>. I also
      dabble in <a href="/works" sveltekit:prefetch>digital art</a>.
    </p>
    <p>You can reach me <a href="mailto:ron@ovao.dev">here</a>.</p>
  </div>
</div>

<style lang="scss">
  @import './src/_core';

  #index--container {
    @include desktop {
      padding: 4em var(--horz-margin) 0 var(--horz-margin);
    }

    @include mobile {
      padding: 20px var(--horz-margin) 0 var(--horz-margin);
    }

    svg {
      display: block;
      height: auto;

      @include mobile {
        @include landscape {
          display: inline-block;
        }
      }
    }

    #h1,
    #h2 {
      opacity: 0;

      rect {
        opacity: 0;
      }

      stop {
        stop-color: var(--background-color);
      }
    }

    #h1 {
      max-width: 242px;

      @include desktop {
        stroke: hsla(var(--primary-hue), 70%, 66%, 0.35);
      }

      @include mobile {
        stroke: hsla(var(--primary-hue), 70%, 66%, 0.5);

        @include landscape {
          width: 20vw;
        }

        @include portrait {
          width: 37.7vw;
        }
      }
    }

    #h2 {
      max-width: 513px;
      stroke: hsla(var(--primary-hue), 70%, 66%, 0.75);

      @include desktop {
        margin-top: 2em;
        margin-bottom: 3em;
      }

      @include mobile {
        @include portrait {
          margin-top: 1.5em;
          margin-bottom: 3em;
          width: 80vw;
        }

        @include landscape {
          margin-left: 2em;
          width: 45vw;
        }
      }
    }

    #index--summary {
      opacity: 0;
    }

    p {
      @include desktop {
        --font-size: 1.9em;
        --background-size: 1.9rem;
      }

      @include mobile {
        --font-size: 1.6em;
        --background-size: 1.6rem;
      }

      font-size: var(--font-size);
      line-height: 1.5em;
      text-rendering: geometricPrecision;
    }
  }

  a {
    text-decoration: none;
    white-space: nowrap;
    text-shadow: -3px -3px var(--color-background),
      -3px 3px var(--color-background), 3px -3px var(--color-background),
      3px 3px var(--color-background);

    background-size: 2px var(--font-size);
    box-shadow: inset 0 -0.1rem var(--color-background),
      inset 0 -0.2rem var(--color-highlight);
    transition: 250ms color;

    &:hover {
      color: var(--color-highlight);
    }
  }

  // #index--loading {
  //   animation: 850ms cubic-bezier(0.16, 1, 0.3, 1) 0s 1 slide-from-top;
  //   color: var(--color-subdued-text);
  //   font-family: var(--font-system);
  //   font-size: small;
  //   position: absolute;
  //   top: 18px;
  //   left: 0;
  //   letter-spacing: 0.5rem;
  //   text-align: center;
  //   text-transform: uppercase;
  //   width: 100vw;
  // }

  @keyframes slide-from-top {
    0% {
      opacity: 0;
      transform: perspective(0px) rotateX(30deg) translateY(-1rem);
    }
    100% {
      opacity: 1;
      transform: perspective(2rem) rotateX(0) translateY(0);
    }
  }
</style>
