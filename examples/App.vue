<template>
  <div>
    <h1>v-clipboard3</h1>
    <img alt="Vue logo"
         src="./assets/logo.png">
    <button v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">复制</button>
    <button @click="handleCopy">复制2</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useClipboard } from '../src/index';

export default defineComponent({
  name: 'App',
  setup() {
    const message = '8888';
    function onCopy(params: string) {
      console.log(params);
    }
    function onError(params: string) {
      console.log(params);
    }
    return { onCopy, onError, message };
  },
  methods: {
    async handleCopy() {
      try {
        await useClipboard('test23132');
        alert('copy ok！');
      } catch (error) {
        console.log(error);
        alert('copy error!');
      }
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
