// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index'; // Asegúrate de que esta ruta sea correcta

import './assets/main.css'; // Importación de main.css

// Crea la aplicación y usa el router
createApp(App).use(router).mount('#app');


