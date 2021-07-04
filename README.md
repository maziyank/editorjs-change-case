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

OR 


```shell
yarn add editorjs-change-case
```

Include module at your application

```javascript
import ChangeCase from 'editorjs-change-case';
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.
The locale parameter used to convert according to locale-specific case mappings.

```javascript
var editor = EditorJS({  
  tools: {
    changeCase: {
      class: ChangeCase,
      config: {
        showLocaleOption: true, // enable locale case options
        locale: 'tr' // or ['tr', 'TR', 'tr-TR']
      }
    }
  }
});
```