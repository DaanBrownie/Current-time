/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Show Date - undefined */
  "showDate": boolean,
  /** Use 12-Hour Clock - undefined */
  "use12HourClock": boolean
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `current-time` command */
  export type CurrentTime = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `current-time` command */
  export type CurrentTime = {}
}

