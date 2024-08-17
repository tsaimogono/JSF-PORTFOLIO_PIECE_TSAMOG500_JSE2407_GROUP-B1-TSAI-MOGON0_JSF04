import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router'; // Adjust the path as needed
import './style.css';

const app = createApp(App);
app.use(createPinia());
app.use(router); // Make sure to use router before mounting the app

app.mount('#app');
