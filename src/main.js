import { createApp } from "vue";
import App from "./App.vue";
import { Quasar, Notify, Loading } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import VueExcelXlsx from "vue-excel-xlsx";

import createStrore from "./store/index";

///API
const urlApi = "http://10.168.0.190:4000/";
//const urlApi = "http://localhost:3000/";
//const urlApi = "http://192.168.137.1:3000/";
//const urlApi = "http://10.165.0.105:3000/";
//const urlApi = "http://192.168.1.105:3000/";

axios.defaults.baseURL = urlApi;

createApp(App)
  .use(VueAxios, axios)
  .use(createStrore)
  .use(router)
  .use(VueExcelXlsx)
  .use(Quasar, { plugins: { Notify, Loading } }, quasarUserOptions)
  .mount("#app");
