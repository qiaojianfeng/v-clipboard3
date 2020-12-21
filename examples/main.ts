import { createApp } from 'vue';
import App from './App.vue';
import Clipboard from '../src/index';
const app = createApp(App);
app.use(Clipboard, { name: 'Test-name' }).mount('#app');
