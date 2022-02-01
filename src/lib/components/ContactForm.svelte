<script lang="ts">
  import { slide } from 'svelte/transition'

  let email: string
  let content: string

  const submit = () => {
    console.log(email, content)
  }
</script>

<form in:slide={{ duration: 400 }}>
  <fieldset>
    <label for="email">Email address</label>
    <input name="email" type="email" autocomplete="email" bind:value={email} />
    <small>(Your email address will not be shared.)</small>
  </fieldset>

  <fieldset>
    <label for="comment">Comment</label>
    <textarea name="comment" rows="4" bind:value={content} />
  </fieldset>

  <button type="submit" on:click|preventDefault={submit}>Submit</button>
</form>

<style lang="scss">
  @import './src/_core';

  form {
    background: var(--color-background-dark);
    border-radius: var(--border-radius-standard);
    flex-direction: column;
    row-gap: 20px;
    display: flex;
    margin-top: var(--margin-top, 0);
    padding: 1em;
    width: 100%;
  }

  fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    row-gap: 0.35em;
  }

  label {
    color: var(--color-highlight);
    font-size: 16px;
  }

  input[type='email'],
  textarea {
    background: none;
    border: 1px solid var(--color-subdued-text);
    box-sizing: border-box;
    color: var(--color-text);
    border-radius: 2px;
    font-size: 16px;
    outline: none;
    margin: 0;
    padding: 0.35em 0.5em;
    transition: border-color 200ms;

    &:focus {
      border-color: var(--color-text);
    }
  }

  input[type='email'] {
    display: inline-flex;
    width: 20em;

    @include mobile {
      width: 100%;
    }
  }

  button {
    background: var(--color-highlight);
    border: none;
    border-radius: var(--border-radius-standard);
    color: var(--color-background);
    font-family: var(--font-monospace);
    font-size: 16px;
    font-weight: normal;
    display: inline-block;
    outline: none;
    padding: 0.25em 0;
    transition: background-color 200ms;
    text-transform: uppercase;
    width: 10em;

    &:focus,
    &:hover {
      background: var(--color-link);
    }
  }
</style>
