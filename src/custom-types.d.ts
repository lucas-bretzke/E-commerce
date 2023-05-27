declare module "vue-cookies-ts" {
    interface VueCookies {
      get(key: string): any;
      set(key: string, value: any, options?: any): void;
      remove(key: string, options?: any): void;
    }
  
    const VueCookies: VueCookies;
    export default VueCookies;
  }