import type { FlyParams } from "svelte/transition"
import { expoOut } from "svelte/easing"

/** The default options to use for the fly animation on main <h1> elements. */
export const header_fly_opts: FlyParams = {
  duration: 2000,
  y: -10,
  easing: expoOut
}