import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router'; // Adjust the path as needed
import './style.css';

/**
 * Initializes and mounts the Vue.js application.
 * 
 * @module main
 */

// Create a new Vue application instance
const app = createApp(App);

// Install Pinia for state management
app.use(createPinia());

// Install the router for navigating between views
app.use(router); // Ensure the router is installed before mounting the app

// Mount the Vue application to the DOM element with id 'app'
app.mount('#app');
