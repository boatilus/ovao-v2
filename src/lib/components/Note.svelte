<blockquote>
  <h3 class="prepend">
    <svg
      id="note--icon"
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M8.8605,11.788 L8.6685,3.9 L10.4925,3.9 L10.3005,11.788 L8.8605,11.788 Z M9.6285,15.196 C9.29783333,15.196 9.0285,15.092 8.8205,14.884 C8.6125,14.676 8.5085,14.428 8.5085,14.14 C8.5085,13.8413333 8.6125,13.588 8.8205,13.38 C9.0285,13.172 9.29783333,13.068 9.6285,13.068 C9.93783333,13.068 10.1965,13.172 10.4045,13.38 C10.6125,13.588 10.7165,13.8413333 10.7165,14.14 C10.7165,14.428 10.6125,14.676 10.4045,14.884 C10.1965,15.092 9.93783333,15.196 9.6285,15.196 Z"
      />
      <path
        d="M9.6,0 C4.2980664,0 0,4.2980664 0,9.6 C0,14.9019336 4.2980664,19.2 9.6,19.2 C14.9019336,19.2 19.2,14.9019336 19.2,9.6 C19.2,4.2980664 14.9019336,0 9.6,0 Z M9.6,1.2 C14.2391919,1.2 18,4.9608081 18,9.6 C18,14.2391919 14.2391919,18 9.6,18 C4.9608081,18 1.2,14.2391919 1.2,9.6 C1.2,4.9608081 4.9608081,1.2 9.6,1.2 Z"
      />
    </svg>Note
  </h3>
  <p><slot /></p>
</blockquote>

<style lang="scss">
  @import './src/_core';

  blockquote {
    --line-height: 20px;
    --note--font-size: 16px;

    background: var(--color-background-dark);
    border-radius: var(--border-radius-standard);
    font-size: var(--note--font-size);
    line-height: calc(var(--note--font-size) * var(--line-height-ratio));
    margin: 2em 0;

    @include desktop {
      padding: 1em 1em 0.5em;
    }

    @include mobile {
      padding: 1em 10px 0.5em 10px;
    }
  }

  #note--icon {
    margin-right: 7px;

    path {
      fill: var(--color-highlight);
    }
  }

  .prepend {
    color: var(--color-highlight);
    display: inline-flex;
    align-items: center;
    font-size: inherit;
    font-weight: normal;
    height: var(--line-height);
    line-height: var(--line-height);
    letter-spacing: 0.1em;
    margin-right: 0.35em;
    text-transform: uppercase;

    &::after {
      content: ':';
    }
  }

  h3 {
    margin: 0;
  }
</style>
