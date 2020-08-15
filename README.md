# Open Source - Timerbars

Created by LeonMrBonnie

⭐ This repository if you found it useful!

[![Generic badge](https://img.shields.io/badge/.altv_Installer%3F-Yes!-4E753E.svg)](https://shields.io/)

---

# Description

This repository provides an alt:V resource to allow easy usage of GTA V timerbars.

This resource provides events to create, remove and edit timerbars.

## Installing Dependencies / Installation

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   An Existing or New Gamemode
-   General Scripting Knowledge


After simply add the name of this resource to your `server.cfg` resource section.

`altv-os-timerbars`

Then simply clone this repository into your main server resources folder.

```
cd resources
git clone https://github.com/LeonMrBonnie/altv-os-timerbars
```

Ensure your `package.json` includes this property:

```json
"type": "module"
```

# Usage

The resource gives you access to a few different events to interact with timerbars. Below is a list of all events:<br>
(Every event has the prefix `timerbars:` when you use them, for a more detailed guide look at [Examples](#examples))

| Event                | Description                             |
| -------------------- | --------------------------------------- |
| `create`             | Creates a new timerbar                  |
| `remove`             | Removes a timerbar                      |
| `removeAll`          | Removes all timerbars                   |
| `setTitle`           | Sets the title of a timerbar            |
| `setText`            | Sets the text of a timerbar             |
| `setColor`           | Sets the color of a timerbar            |
| `setTextColor`       | Sets the text color of a timerbar       |
| `setHighlightColor`  | Sets the highlight color of a timerbar  |
| `setCheckpointState` | Sets the checkpoint state of a timerbar |
| `setProgress`        | Sets the progress of a timerbar         |

## Detailed Usage

Detailed usage for all events: (Parameters marked with a `?` are optional)

### `create`:
| Parameter    | Type       | Description                                            | Default value   |
| ------------ | ---------- | ------------------------------------------------------ | --------------- |
| `id`         | `String`   | Unique id to identify the timerbar                     |                 |
| `type`       | `String`   | The timerbar type                                      |                 |
| `title`      | `String`   | The timer bar title                                    |                 |
| `?options`   | `Object`   | The timer bar options like text etc.                   | `{}`            |

Available `type`s:
| Type         | Description                            |
| ------------ | -------------------------------------- |
| `text`       | Simple timer bar that shows a text     |
| `player`     | Timer bar that shows a player name     |
| `checkpoint` | Timer bar with checkpoint circles      |
| `progress`   | Timer bar that displays a progress bar |

Available `options` properties:
| Property      | Type       | Description                                            | Available on type  |
| ------------- | ---------- | ------------------------------------------------------ | ------------------ |
| `text`        | `String`   | The text that displays on the right side               | All types          |
| `checkpoints` | `Number`   | The amount of checkpoints to display                   | `checkpoint`       |
| `progress`    | `Number`   | The progress amount in %                               | `progress`         |

### `remove`:
| Parameter    | Type       | Description                                            | Default value   |
| ------------ | ---------- | ------------------------------------------------------ | --------------- |
| `id`         | `String`   | Unique id of the timerbar                              |                 |

### `removeAll`:
Has no parameters

### `setTitle`:
| Parameter    | Type       | Description                                            | Default value   |
| ------------ | ---------- | ------------------------------------------------------ | --------------- |
| `id`         | `String`   | Unique id of the timerbar                              |                 |
| `title`      | `String`   | The timer bar title                                    |                 |

### `setText`:
| Parameter    | Type       | Description                                            | Default value   |
| ------------ | ---------- | ------------------------------------------------------ | --------------- |
| `id`         | `String`   | Unique id of the timerbar                              |                 |
| `text`       | `String`    | The timer bar text                                    |                 |

### `setColor`:
| Parameter    | Type       | Description                                            | Default value   |
| ------------ | ---------- | ------------------------------------------------------ | --------------- |
| `id`         | `String`   | Unique id of the timerbar                              |                 |
| `color`      | `Number`   | The color of the timerbar (uses GTA V hud color ids)   |                 |

### `setTextColor`:
| Parameter    | Type       | Description                                                 | Default value   |
| ------------ | ---------- | ----------------------------------------------------------- | --------------- |
| `id`         | `String`   | Unique id of the timerbar                                   |                 |
| `textColor`  | `Number`   | The text color of the timerbar (uses GTA V hud color ids)   |                 |

### `setHighlightColor`:
| Parameter        | Type       | Description                                                      | Default value   |
| ---------------- | ---------- | ---------------------------------------------------------------- | --------------- |
| `id`             | `String`   | Unique id of the timerbar                                        |                 |
| `highlightColor` | `Number`   | The highlight color of the timerbar (uses GTA V hud color ids)   |                 |

### `setCheckpointState`:
Only works for type `checkpoint`
| Parameter       | Type       | Description                                                          | Default value   |
| --------------- | ---------- | -------------------------------------------------------------------- | --------------- |
| `id`            | `String`   | Unique id of the timerbar                                            |                 |
| `checkpointIdx` | `Number`   | The checkpoint index (starts at 0) (`-1` means all checkpoints)      |                 |
| `state`         | `Number`   | State of the checkpoint (`0 = In Progress, 1 = Success, 2 = Failed`) |                 |

### `setProgress`:
Only works for type `progress`
| Parameter    | Type       | Description                  | Default value   |
| ------------ | ---------- | ---------------------------- | --------------- |
| `id`         | `String`   | Unique id of the timerbar    |                 |
| `progress`   | `Number`   | The progress amount in %     |                 |

# Example

Code used in the preview image:
```js
alt.emit("timerbars:create", "test1", "text", "Timer", { text: "0:23" });
alt.emit("timerbars:setTextColor", "test1", 6);
alt.emit("timerbars:setHighlightColor", "test1", 8);
alt.emit("timerbars:create", "test2", "player", "1st: LeonMrBonnie", { text: "5 Kills" });
alt.emit("timerbars:setColor", "test2", 109);
alt.emit("timerbars:create", "test3", "checkpoint", "Checkpoints", { checkpoints: 5 });
alt.emit("timerbars:setCheckpointState", "test3", 0, 0);
alt.emit("timerbars:setCheckpointState", "test3", 1, 0);
alt.emit("timerbars:setCheckpointState", "test3", 2, 1);
alt.emit("timerbars:setCheckpointState", "test3", 3, 1);
alt.emit("timerbars:setCheckpointState", "test3", 4, 2);
alt.emit("timerbars:create", "test4", "progress", "Progress", { progress: 35 });
```

# Credits

-   [rootcause](https://rage.mp/files/file/327-timer-bars-2/) - For giving inspiration and a great part of the code
-   [Alex Guirre](https://github.com/alexguirre) - For finding out the correct values for scale, color etc.

# Other alt:V Open Source Resources

-   [Authentication by Stuyk](https://github.com/Stuyk/altv-os-auth)
-   [Discord Authentication by Stuyk](https://github.com/Stuyk/altv-discord-auth)
-   [Global Blip Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-blip-manager)
-   [Global Marker Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-marker-manager)
-   [Chat by Dzeknjak](https://github.com/jovanivanovic/altv-os-chat)
-   [Nametags by Stuyk](https://github.com/Stuyk/altv-os-nametags)
-   [Entity Sync for JS by LeonMrBonnie](https://github.com/LeonMrBonnie/altv-os-js-entitysync)
-   [Context Menu by Stuyk](https://github.com/Stuyk/altv-os-context-menu)
-   [Global Textlabels by Stuyk](https://github.com/Stuyk/altv-os-global-textlabels)
-   [Interactions by LeonMrBonnie](https://github.com/LeonMrBonnie/altv-os-interactions)