![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Change Case Inline Tool

Change Case Tool for the [Editor.js](https://editorjs.io).

![](assets/example.gif)

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev editorjs-change-case
```

Include module at your application

```javascript
import ChangeCase from 'editorjs-change-case';
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    ChangeCase: ChangeCase
  },
  
  ...
});
```