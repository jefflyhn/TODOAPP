import { createApp } from 'vue'; // Import createApp from Vue 3
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add solid (free) icons to the library
library.add(fas);

// Create the Vuetify instance with components and directives
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App); // Create the Vue 3 app
app.use(vuetify); // Use Vuetify
app.component('font-awesome-icon', FontAwesomeIcon); // Register FontAwesomeIcon component globally
app.mount('#app'); // Mount your app
