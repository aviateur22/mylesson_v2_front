import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/css/reset.css';
import './assets/css/main.css';
// import './assets/css/github-markdown-default.css';
import './assets/css/github-markdown-light.css';
// import './assets/css/github-markdown-dark.css';

createApp(App).use(store).use(router).mount('#app');
