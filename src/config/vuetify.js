import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#943DEC',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        success: '#6CAF50',
        background: '#f5f5f5'
      },
      dark: {
        primary: '#943DEC',
        background: '#1a1a1a',
      },
    },
    dark: true,
  },
});
