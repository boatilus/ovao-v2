import { writable } from 'svelte/store'

/** Tracks whether the app has started. */
export const started = writable(false)
