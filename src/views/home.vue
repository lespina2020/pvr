<template>
  <Top />
  <div v-if="r.path === '/'">
    <div class="q-pa-md row items-start justify-center q-gutter-md">
      <q-card>
        <q-card class="my-card" flat bordered>
          <q-img src="f1.png" />

          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">
              Bienvenidos al Sistema de Registro y Control PVR
            </div>
            <div class="text-caption justify-center text-grey">
              El sistema tendra como objetivo Principal del Registras todos los
              Datos de las Planillas de la PVR llevando un mejor Control de las
              Mismas.
            </div>
          </q-card-section>
        </q-card>
      </q-card>
      <q-card>
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">
              <b>Cantidad de Unidades</b>: {{ model.unidades }}
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs">
              <b>Total de PVR Realizados </b>: {{ model.pvr }}
            </div>
          </q-card-section>
        </q-card>
      </q-card>
    </div>
  </div>

  <router-view></router-view>
</template>

<script>
//import api from "../composable/crud";
//import { watchEffect } from "vue";
import Top from "../components/header/top";
import apiAxios from "../axios/index.js";

import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Top,
  },
  setup() {
    const r = ref(useRoute());
    const router = useRouter();
    const store = useStore();
    const model = ref([]);
    const accessToken = store.getters.isGetter("isToken").accessToken;

    //router.go();
    let data = undefined;
    let options = {
      method: "POST",
      data,
    };

    watchEffect(() => {
      if (store.getters.isGetter("isPvrS").length === 0) {
        let valores = [
          {
            url: "/api/vehiculo/All",
            variable: "unidades",
          },
          {
            url: "/api/salidas/All",
            variable: "pvr",
          },
        ];

        for (let i in valores) {
          // salidas.push(JSON.parse(res.data[i].pvr));
          //entrada.push(JSON.parse(resp[i].dataValues));

          //let url = `${valores[i].url}`;
          buscador(valores[i].url, valores[i].variable);
        }
      }
    });

    async function buscador(url, variable) {
      store.dispatch("varMutuacion", { val: "isLoading", valor: true });

      await apiAxios(url, accessToken, options)
        .then((res) => {
          // model.value[variable] = res.data.length;

          model.value[variable] = res.data.length;

          store.dispatch("varMutuacion", {
            val: "isPvrS",
            valor: res.data.length,
          });
        })
        .catch((err) => {
          //console.log(err.response.status);

          store.dispatch("varMutuacion", { val: "msg", valor: err.message });

          if (err.response.status === 401) {
            store.dispatch("varMutuacion", {
              val: "msg",
              valor: "Token Vencido",
            });
            localStorage.clear();
            store.commit("setReset");

            router.push("/login");
          }
        })
        .finally(() => {
          store.dispatch("varMutuacion", { val: "isLoading", valor: false });
        });
    }

    /*    const { install } = api();
    let url = "/api/empresa/registro",
      options = {
        method: "POST",
      };
    install(url, options);*/

    return {
      r,
      model,
    };
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 380px
</style>
