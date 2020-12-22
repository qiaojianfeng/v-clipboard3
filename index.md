# v-clipboard3

Easily copy to clipboard in Vue 3 (composition-api) using clipboard.js 📋

## Install

npm install --save v-clipboard3

## Usage

For vue-cli user:

```javascript
import { createApp } from 'vue';
// If the directive scheme is not used, no global registration is required
import Clipboard from 'v-clipboard3';
const app = createApp(App);
app.use(Clipboard);
```

For standalone usage:

```html
<script src="vue.min.js"></script>
<!-- must place this line after vue.js -->
<script src="dist/v-clipboard3.min.js"></script>
```

## Sample

```html
<div id="app"></div>

<template id="t">
  <div class="container">
    <input type="text" v-model="message" />
    <button type="button" v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">Copy!</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    setup() {
      const message = '8888';
      function onCopy(params: any) {
        console.log(params);
      }
      function onError(params: any) {
        console.log(params);
      }
      return { onCopy, onError, message };
    },
  });
</script>
```

## Sample 2

```html
<div id="app"></div>

<template id="t">
  <div class="container">
    <input type="text" v-model="message" />
    <button type="button" @click="handleCopy">Copy!</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useClipboard } from 'v-clipboard3';

  export default defineComponent({
    name: 'App',
    setup() {
      const message = '8888';
      async function handleCopy() {
        try {
          await useClipboard(message);
          alert('copy ok！');
        } catch (error) {
          console.log(error);
          alert('copy error!');
        }
      },
      return { handleCopy, message };
    },
  });
</script>
```

### Contribution

PRs welcome, and issues as well! If you want any feature that we don't have currently,
please fire an issue for a feature request.

### License

[MIT License](https://github.com/webweifeng/v-clipboard3/blob/main/LICENSE)
