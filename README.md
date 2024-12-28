# node-selection

> Get current selected text by using system accessibility APIs.

This project is forked from [node-selection](https://github.com/lujjjh/node-selection)

**What is New**
- Enlarge the text selection range, no 256 characters limit.
- Support text selection in more scenarios such as eletcron, vscode, cursor, etc. You just need to run the program with administrator privileges.

## Installation

- npm
```sh
npm install @hollway/node-selection
```

- yarn 
```sh
yarn add @hollway/node-selection
```

## Usage

### Accessibility permissions

macOS requires accessibility permissions to be granted before a program
can control the Mac by using accessibility features.

#### `checkAccessibilityPermissions([options])`

- `options`: `<Object>`
  - `prompt`: `<boolean>` **Default:** `false`

Returns: `<Promise>` Fullfills upon success with a boolean indicating
whether accessibility permissions have been granted to this program.

If `prompt` is `true`, a prompt window will be shown when accessibility
permissions have not been granted.

If this method is invoked on non-macOS platform, it always returns `true`.

```js
import { checkAccessibilityPermissions } from '@hollway/node-selection';

if (!(await checkAccessibilityPermissions({ prompt: true }))) {
  console.log('grant accessibility permissions and restart this program');
  process.exit(1);
}
```

### Selection

#### `getSelection()`

Returns: `<Promise>` Fullfills upon success with an object with one property:

- `text`: `<string>` | `<undefined>` Current selected text.
- `process`: `Object` | `<undefined>`
  - `pid`: `<number>` | `<undefined>` The process ID.
  - `name`: `<string>` | `<undefined>` The filename of the process.
  - `bundleIdentifier`: `<string>` | `<undefined>` The bundle identifier of the process (macOS only).

```js
import { getSelection } from '@hollway/node-selection';

try {
  const { text, process } = await getSelection();
  console.log('current selection:', { text, process });
} catch (error) {
  // no valid selection
  console.error('error', error);
}
```

## Examples

- [Node](example/node-example)
- [Electron](example/electron-example)

# Development Guide

## Prerequisites
- For windows, open `Visual Studio Installer` and click `Modify` to install the C++ Desktop Development Kit: v143 C++ ATL(x86/x64)

## Rebuild C++ Module
C++ code is under `src/`, if you changed the code, use the following command to rebuild.
```sh
npm run build
```
