import { Plugin } from 'vue';
import VueCookies from 'vue-cookies-ts';

const plugin: Plugin = {
  install(app) {
    app.config.globalProperties.$cookies = VueCookies;
  },
};

export default plugin;
