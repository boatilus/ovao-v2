import { TITLE } from '$lib/variables'

export const titler = (str: string, title: string = TITLE) => {
  if (title === '') {
    return str
  }

  return `${str} - ${title}`
}

/** Returns a random integer between `min` and `max`, inclusive. */
export const randBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

/**
 * Performs an in-place shuffle of an array using the Fisher–Yates/Durstenfeld
 * shuffle algorithm.
 */
export const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

/*!
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/**
 * Shims `window.requestIdleCallback` for unsupported browsers (*cough* Safari).
 *
 * @see https://developers.google.com/web/updates/2015/08/using-requestidlecallback
 */
export const fillRequestIdleCallback = (window: Window) => {
  if (typeof window === 'undefined' || window === null) {
    return
  }

  // @ts-ignore
  window.requestIdleCallback =
    window.requestIdleCallback ||
    function (cb) {
      var start = Date.now()
      return setTimeout(function () {
        cb({
          didTimeout: false,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - start))
          }
        })
      }, 1)
    }

  window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function (id) {
      clearTimeout(id)
    }
}
