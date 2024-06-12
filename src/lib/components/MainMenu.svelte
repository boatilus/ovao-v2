<script lang="ts" context="module">
  import { Easings } from '$lib/util/anime'

  const BUTTON_TOGGLE_DURATION = 250
  const BUTTON_TOGGLE_EASING = Easings.OutExpo
  const OVERLAY_DURATION = 300
  const LINK_DISTANCE = 30
  const LINK_FADE_DURATION = 400
  const LINK_SLIDE_DURATION = 450
  const LINK_STAGGER = 45
</script>

<script lang="ts">
  import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL } from '$lib/variables'
  import { page } from '$app/stores'
  import { theme } from '$lib/stores/theme'
  import anime from 'animejs'
  import chroma from 'chroma-js'
  import { onMount } from 'svelte'
  import { beforeNavigate } from '$app/navigation'
  import disableScroll from 'disable-scroll'
  import hotkeys from 'hotkeys-js'

  $: transparent = ''

  beforeNavigate(() => {
    close()
  })

  /** Whether navigation is ready to be interacted with. */
  let ready = false

  let open = false

  /**
   * Whether the menu's been opened at least once; used to toggle visibility
   * of button label.
   */
  let opened = false

  /** Whether the menu is currently in a state of animating open or close. */
  let animating = false

  let container: HTMLElement
  let button: HTMLButtonElement
  let overlay: HTMLDivElement
  let gradient: HTMLDivElement
  let nav: HTMLElement

  let button_line_1: SVGPathElement
  let button_line_2: SVGPathElement
  let button_line_3: SVGPathElement

  onMount(() => {
    const unsubscribe = theme.subscribe(({ background }) => {
      if (background) {
        transparent = chroma(background).alpha(0).css('hsl')
        ready = true

        hotkeys('esc', () => {
          if (!animating) {
            close()
          }
        })
      }
    })

    return () => {
      unsubscribe()
      hotkeys.unbind('esc')
    }
  })

  const onWindowClick = ({ target }) => {
    if (open && !animating && !container.contains(target)) {
      close()
    }
  }

  const close = async () => {
    if (!open) {
      return
    }

    open = false
    animating = true
    button.disabled = true
    disableScroll.off()

    anime
      .timeline({
        targets: button_line_1,
        duration: BUTTON_TOGGLE_DURATION,
        easing: BUTTON_TOGGLE_EASING
      })
      .add({
        rotate: 0
      })
      .add({
        targets: button_line_2,
        opacity: 1,
        duration: 1
      })
      .add({
        translateY: 0
      })

    anime
      .timeline({
        targets: button_line_3,
        duration: BUTTON_TOGGLE_DURATION,
        easing: BUTTON_TOGGLE_EASING
      })
      .add({
        rotate: 0
      })
      .add({
        translateY: 0
      })

    const nav_finished = anime({
      targets: nav.children,
      opacity: {
        value: [1, 0],
        duration: 60,
        easing: Easings.Linear
      },
      translateX: {
        value: LINK_DISTANCE,
        easing: Easings.OutSine,
        duration: 250
      },
      delay: anime.stagger(LINK_STAGGER / 2, { direction: 'reverse' })
    }).finished

    await anime({
      targets: [overlay, gradient],
      easing: Easings.Linear,
      duration: OVERLAY_DURATION / 2,
      opacity: 0
    }).finished

    gradient.style.display = 'none'
    overlay.style.display = 'none'

    await nav_finished
    nav.style.display = 'none'
    button.disabled = false
    animating = false
  }

  const toggle = async () => {
    if (ready && !open) {
      open = !open

      if (!opened) {
        /**
         * The user's opened the menu once, so we can make the label
         * invisible.
         */
        button.style.color = 'transparent'
      }

      opened = true
      disableScroll.on()
      overlay.style.display = 'block'
      gradient.style.display = 'block'
      nav.style.display = 'flex'
      animating = true
      button.disabled = true

      anime
        .timeline({
          targets: button_line_1,
          duration: BUTTON_TOGGLE_DURATION,
          easing: BUTTON_TOGGLE_EASING
        })
        .add({
          translateY: 8
        })
        .add({
          targets: button_line_2,
          opacity: 0,
          duration: 1
        })
        .add({
          rotate: 45
        })

      anime
        .timeline({
          targets: button_line_3,
          duration: BUTTON_TOGGLE_DURATION,
          easing: BUTTON_TOGGLE_EASING
        })
        .add({
          translateY: -8
        })
        .add({
          rotate: -45
        })

      const overlay_finished = anime({
        targets: [overlay],
        easing: Easings.Linear,
        duration: OVERLAY_DURATION,
        opacity: 0.6
      }).finished

      const gradient_finished = anime({
        targets: [gradient],
        easing: Easings.Linear,
        duration: OVERLAY_DURATION,
        opacity: 1
      })

      const nav_finished = anime({
        targets: nav.children,
        opacity: {
          value: [0, 1],
          duration: LINK_FADE_DURATION,
          easing: Easings.Linear
        },
        translateX: {
          value: [LINK_DISTANCE, 0],
          easing: Easings.OutExpo,
          duration: LINK_SLIDE_DURATION
        },
        delay: anime.stagger(LINK_STAGGER)
      }).finished

      await Promise.all([overlay_finished, gradient_finished, nav_finished])
      button.disabled = false
      animating = false
    } else {
      close()
    }
  }
</script>

<svelte:window on:sveltekit:navigation-end={close} on:click={onWindowClick} />

<noscript>
  <style>
    #mainmenu--overlay,
    #mainmenu--gradient,
    #mainmenu--container {
      display: none;
    }
  </style>
</noscript>

<div bind:this={overlay} id="mainmenu--overlay" />
<div
  bind:this={gradient}
  id="mainmenu--gradient"
  style="--transparent: {transparent}"
/>
<div
  bind:this={container}
  id="mainmenu--container"
  class:hidden={$page.url.pathname === '/tree'}
>
  <button bind:this={button} id="mainmenu--toggle" on:click={toggle}
    >{open ? 'Close' : 'Menu'}

    <svg
      width="22px"
      height="18px"
      viewBox="0 0 22 18"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g fill="white">
        <rect
          bind:this={button_line_1}
          x="0"
          y="0"
          width="22"
          height="2"
          transform-origin="center"
        />
        <rect
          bind:this={button_line_2}
          x="0"
          y="8"
          width="22"
          height="2"
          transform-origin="center"
        />
        <rect
          bind:this={button_line_3}
          x="0"
          y="16"
          width="22"
          height="2"
          transform-origin="center"
        />
      </g>
    </svg></button
  >

  <nav bind:this={nav}>
    <a href="/" class:disabled={$page.url.pathname === '/'} sveltekit:prefetch
      >Home</a
    >
    <a
      href="/works"
      class:disabled={$page.url.pathname === '/works'}
      sveltekit:prefetch>Works</a
    >
    <a
      href="/posts"
      class:disabled={$page.url.pathname === '/posts'}
      sveltekit:prefetch>Blog</a
    >
    <a
      href="/resume"
      class:disabled={$page.url.pathname === '/resume'}
      sveltekit:prefetch>Résumé</a
    >

    <a class="github-link" href={GITHUB_URL} rel="external"
      ><svg
        width="29px"
        height="28px"
        viewBox="0 0 29 28"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M14.3529791,0 C6.4274699,0 1.77635684e-15,6.4265887 1.77635684e-15,14.3547415 C1.77635684e-15,20.6967351 4.11255854,26.0764586 9.81656357,27.9745626 C10.5347412,28.1067425 10.7964575,27.6634991 10.7964575,27.2828209 C10.7964575,26.9417966 10.7841207,26.0394483 10.7770711,24.841898 C6.78435574,25.7089984 5.94192892,22.9173581 5.94192892,22.9173581 C5.28896001,21.2589404 4.34783884,20.8174594 4.34783884,20.8174594 C3.04454463,19.9274478 4.44653319,19.9450718 4.44653319,19.9450718 C5.88729454,20.0464098 6.6451262,21.4246059 6.6451262,21.4246059 C7.92550922,23.6179117 10.0051403,22.9843292 10.8228935,22.616869 C10.9533111,21.689847 11.3242961,21.0571457 11.7340539,20.6984975 C8.54675494,20.3363244 5.19555286,19.1044074 5.19555286,13.6039595 C5.19555286,12.0371866 5.7551146,10.7550411 6.67332459,9.752236 C6.52528306,9.38918176 6.03269248,7.92903402 6.81431653,5.95338451 C6.81431653,5.95338451 8.01891638,5.56741909 10.7612095,7.42498785 C11.9058878,7.10599359 13.1342801,6.94737767 14.3547415,6.94120927 C15.5743218,6.94737767 16.8018328,7.10599359 17.9482735,7.42498785 C20.6888043,5.56741909 21.8916417,5.95338451 21.8916417,5.95338451 C22.6750282,7.92903402 22.1824376,9.38918176 22.0352773,9.752236 C22.9552496,10.7550411 23.5104054,12.0371866 23.5104054,13.6039595 C23.5104054,19.1185066 20.1539161,20.3319184 16.9569239,20.6870419 C17.4715445,21.1302853 17.9306495,22.0061977 17.9306495,23.3447399 C17.9306495,25.2639926 17.9130255,26.8122603 17.9130255,27.2828209 C17.9130255,27.6670239 18.1720982,28.1137921 18.8999691,27.9736814 C24.5995681,26.0711714 28.7086018,20.6949727 28.7086018,14.3547415 C28.7086018,6.4265887 22.2811319,0 14.3529791,0"
        />
      </svg> GitHub</a
    >
    <a href={INSTAGRAM_URL} rel="external"
      ><svg
        width="28px"
        height="28px"
        viewBox="0 0 28 28"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <polygon
            id="path-dxnlv8kb_7-1"
            points="0 0 28.0033348 0 28.0033348 28 0 28"
          />
        </defs>
        <mask id="mask-dxnlv8kb_7-2" fill="white">
          <use xlink:href="#path-dxnlv8kb_7-1" />
        </mask>
        <path
          d="M14.0016952,0 C10.1990428,0 9.72222454,0.0161181148 8.22879783,0.0842588347 C6.73848359,0.152232815 5.72065243,0.388946784 4.83004321,0.735097195 C3.9093098,1.09286376 3.12847051,1.57162735 2.35002114,2.35002114 C1.57162735,3.12847051 1.09286376,3.9093098 0.735097195,4.83004321 C0.388946784,5.72065243 0.152232815,6.73848359 0.0842588347,8.22879783 C0.0161181148,9.72222454 0,10.1990428 0,14.0016952 C0,17.8042919 0.0161181148,18.2811102 0.0842588347,19.774537 C0.152232815,21.2648512 0.388946784,22.2826824 0.735097195,23.1732916 C1.09286376,24.094025 1.57162735,24.8748643 2.35002114,25.6533136 C3.12847051,26.4317074 3.9093098,26.910471 4.83004321,27.2682932 C5.72065243,27.614388 6.73848359,27.851102 8.22879783,27.9190759 C9.72222454,27.9872167 10.1990428,28.0033348 14.0016952,28.0033348 C17.8042919,28.0033348 18.2811102,27.9872167 19.774537,27.9190759 C21.2648512,27.851102 22.2826824,27.614388 23.1732916,27.2682932 C24.094025,26.910471 24.8748643,26.4317074 25.6533136,25.6533136 C26.4317074,24.8748643 26.910471,24.094025 27.2682932,23.1732916 C27.614388,22.2826824 27.851102,21.2648512 27.9190759,19.774537 C27.9872167,18.2811102 28.0033348,17.8042919 28.0033348,14.0016952 C28.0033348,10.1990428 27.9872167,9.72222454 27.9190759,8.22879783 C27.851102,6.73848359 27.614388,5.72065243 27.2682932,4.83004321 C26.910471,3.9093098 26.4317074,3.12847051 25.6533136,2.35002114 C24.8748643,1.57162735 24.094025,1.09286376 23.1732916,0.735097195 C22.2826824,0.388946784 21.2648512,0.152232815 19.774537,0.0842588347 C18.2811102,0.0161181148 17.8042919,0 14.0016952,0 Z M14.0016952,2.52281845 C17.7402641,2.52281845 18.1831232,2.53710243 19.6595425,2.60446504 C21.0246913,2.66671431 21.766069,2.89481342 22.25945,3.08656341 C22.9130118,3.34056267 23.3794367,3.64397228 23.8693718,4.13396297 C24.3593625,4.62389808 24.6627721,5.09032298 24.9167714,5.74388474 C25.1085214,6.2372658 25.3366205,6.9786435 25.3988697,8.34379224 C25.4662324,9.82021156 25.4805163,10.2630707 25.4805163,14.0016952 C25.4805163,17.7402641 25.4662324,18.1831232 25.3988697,19.6595425 C25.3366205,21.0246913 25.1085214,21.766069 24.9167714,22.25945 C24.6627721,22.9130118 24.3593625,23.3794367 23.8693718,23.8693718 C23.3794367,24.3593625 22.9130118,24.6627721 22.25945,24.9167714 C21.766069,25.1085214 21.0246913,25.3366205 19.6595425,25.3988697 C18.1833455,25.4662324 17.740542,25.4805163 14.0016952,25.4805163 C10.2627928,25.4805163 9.82004482,25.4662324 8.34379224,25.3988697 C6.9786435,25.3366205 6.2372658,25.1085214 5.74388474,24.9167714 C5.09032298,24.6627721 4.62389808,24.3593625 4.13396297,23.8693718 C3.64402786,23.3794367 3.34056267,22.9130118 3.08656341,22.25945 C2.89481342,21.766069 2.66671431,21.0246913 2.60446504,19.6595425 C2.53710243,18.1831232 2.52281845,17.7402641 2.52281845,14.0016952 C2.52281845,10.2630707 2.53710243,9.82021156 2.60446504,8.34379224 C2.66671431,6.9786435 2.89481342,6.2372658 3.08656341,5.74388474 C3.34056267,5.09032298 3.64397228,4.62389808 4.13396297,4.13396297 C4.62389808,3.64397228 5.09032298,3.34056267 5.74388474,3.08656341 C6.2372658,2.89481342 6.9786435,2.66671431 8.34379224,2.60446504 C9.82021156,2.53710243 10.2630707,2.52281845 14.0016952,2.52281845 L14.0016952,2.52281845 Z"
          mask="url(#mask-dxnlv8kb_7-2)"
        />
        <path
          d="M14.0016952,18.6688899 C11.4240196,18.6688899 9.33444493,16.5793152 9.33444493,14.0016952 C9.33444493,11.4240196 11.4240196,9.33444493 14.0016952,9.33444493 C16.5793152,9.33444493 18.6688899,11.4240196 18.6688899,14.0016952 C18.6688899,16.5793152 16.5793152,18.6688899 14.0016952,18.6688899 Z M14.0016952,6.81162648 C10.0306919,6.81162648 6.81162648,10.0306919 6.81162648,14.0016952 C6.81162648,17.9726429 10.0306919,21.1917083 14.0016952,21.1917083 C17.9726429,21.1917083 21.1917083,17.9726429 21.1917083,14.0016952 C21.1917083,10.0306919 17.9726429,6.81162648 14.0016952,6.81162648 L14.0016952,6.81162648 Z"
          id="Fill-4"
        />
        <path
          d="M23.1560063,6.5275586 C23.1560063,7.45551738 22.403735,8.20773312 21.4757762,8.20773312 C20.547873,8.20773312 19.7956017,7.45551738 19.7956017,6.5275586 C19.7956017,5.59959983 20.547873,4.8473285 21.4757762,4.8473285 C22.403735,4.8473285 23.1560063,5.59959983 23.1560063,6.5275586"
          id="Fill-5"
        />
      </svg> Instagram</a
    >
    <a href={LINKEDIN_URL} rel="external"
      ><svg
        width="28px"
        height="28px"
        viewBox="0 0 28 28"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M25.9260923,0.000173166832 C27.0482496,-0.0144278744 27.9850506,0.89619778 28.0000794,2.01860558 L28.0000794,2.01860558 L28.0000794,25.9792944 C27.9850506,27.1022032 27.049502,28.0138307 25.9260923,27.9998411 L25.9260923,27.9998411 L2.06609702,27.9998411 C0.945442589,28.0117016 0.0131502811,27.0999488 2.84217094e-14,25.9792944 L2.84217094e-14,25.9792944 L2.84217094e-14,2.02023371 C0.0136512442,0.900205485 0.946068793,-0.0105454104 2.06609702,0.00210390756 L2.06609702,0.00210390756 L25.9260923,0.00210390756 Z M18.879295,10.1641402 C17.2739587,10.1045256 15.7605493,10.9357486 14.9496153,12.3222892 L14.9496153,12.3222892 L14.8937579,12.3222892 L14.8937579,10.4964039 L10.9109761,10.4964039 L10.9109761,23.85734 L15.0597019,23.85734 L15.0597019,17.2477582 C15.0597019,15.5047824 15.3903375,13.8167873 17.5512418,13.8167873 C19.6813369,13.8167873 19.7090151,15.8112466 19.7090151,17.3606002 L19.7090151,17.3606002 L19.7090151,23.857841 L23.8578661,23.857841 L23.8596195,16.52825 C23.8596195,12.9299574 23.0842539,10.1641402 18.879295,10.1641402 Z M8.3040894,10.4964039 L4.15098015,10.4964039 L4.15098015,23.857841 L8.3040894,23.857841 L8.3040894,10.4964039 Z M6.22922553,3.85488578 C4.90843634,3.85488578 3.82159692,4.9417252 3.82159692,6.26251439 C3.82159692,7.58330357 4.90843634,8.67001775 6.22922553,8.67001775 L6.22922553,8.67001775 L6.38701361,8.66484109 C7.63545377,8.58257144 8.63685413,7.53023154 8.63685413,6.26251439 L8.63685413,6.26251439 L8.63166361,6.10472631 C8.5492922,4.85628615 7.49706291,3.85488578 6.22922553,3.85488578 Z"
        />
      </svg>LinkedIn</a
    >
  </nav>
</div>

<style lang="scss">
  @import './src/_core';

  #mainmenu--overlay {
    background-color: var(--color-background);
    display: none;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  #mainmenu--gradient {
    background: linear-gradient(
      220deg,
      var(--color-background) 0%,
      var(--transparent) 50%
    );
    display: none;
    opacity: 0;
    width: 910px;
    height: 910px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 101;
  }

  #mainmenu--container {
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 102;

    &.hidden {
      display: none;
    }

    button {
      animation:
        700ms var(--ease-out-cubic) 500ms 1 slide-in,
        700ms linear 500ms 1 fade-in;
      animation-fill-mode: forwards;
      align-items: center;
      background: transparent;
      border: 0;
      cursor: pointer;
      display: flex;
      font-size: 12px;
      gap: 10px;
      height: 42px;
      letter-spacing: 3px;
      margin: 0;
      opacity: 0;
      padding: 0;
      text-transform: uppercase;
      transition:
        color 250ms,
        opacity 250ms;

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }

      @include desktop {
        color: white;

        &:hover {
          color: white !important;
        }
      }

      @include mobile {
        color: transparent;
      }

      @keyframes slide-in {
        from {
          transform: translateX(7px);
        }

        to {
          transform: translateX(0);
        }
      }

      @keyframes fade-in {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      svg * {
        transform-box: fill-box;
        transform-origin: center center;
      }
    }
  }

  nav {
    display: none;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: 33px;
    position: absolute;
    gap: 25px;
    top: 42px;
    right: 0;
    text-align: right;

    a {
      color: white;
      display: inline-flex;
      align-items: center;
      flex-direction: row-reverse;
      gap: 8px;
      justify-content: flex-start;
      font-size: 18px;
      height: 20px;
      text-decoration: none;
      transition: color 250ms;

      &:hover {
        color: var(--color-link);

        path {
          fill: var(--color-link);
        }
      }

      svg {
        height: 20px;
        width: auto;
      }

      path {
        fill: white;
        transition: fill 250ms;
      }

      &.disabled {
        color: hsl(0, 0%, 50%);
        pointer-events: none;
      }

      &.github-link {
        margin-top: 25px;
      }
    }
  }
</style>
