<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-green text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm"><Menu /></q-btn>
      <q-avatar square>
        <img src="fospuca.png" />
      </q-avatar>
      <q-toolbar-title>Sistemas de Registro y Control de PVR</q-toolbar-title>
      <q-btn dense flat round icon="menu"><MenuPerfil /></q-btn>
    </q-toolbar>
  </div>
</template>

<script>
import { watchEffect } from "vue";
//import MenuItem from "../header/menuItem";
//import Loader from "../loader/index.vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { messages } from "../../helper/validation.js";
import Menu from "../../components/menu/menuPrincipal.vue";
import MenuPerfil from "../../components/menu/menuPerfil.vue";

export default {
  name: "Top",
  components: {
    Menu,
    MenuPerfil,
  },

  setup() {
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();

    watchEffect(() => {
      console.log(store.getters.isGetter("isLoading"));
      if (store.getters.isGetter("msg") != null) {
        $q.notify(messages(store.getters.isMsg, "positive", "close", "normal"));

        console.log(store.getters.isGetter("msg"));
      }

      if (store.getters.isGetter("isConection") === false) {
        localStorage.clear();
        router.push("/login");
      }

      if (store.getters.isGetter("isLoading") === true) {
        $q.loading.show();
      } else {
        $q.loading.hide();
      }
    });
  },
};
</script>
