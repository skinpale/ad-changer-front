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
        success: '#41cf51',
        background: '#efefef'
      },
      dark: {
        primary: '#943DEC',
        background: '#2a2a2a',
      },
    },
    dark: true,
  },
});
