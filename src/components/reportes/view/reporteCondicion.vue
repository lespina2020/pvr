<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-card>
        <q-card-section class="bg-green text-white">
          <div class="text-h6">
            {{ tittles }}
          </div>
          <q-btn
            color="green"
            :icon="'arrow_back'"
            size="sm"
            to="/reporteCondicion"
          >
            <q-tooltip> Atras</q-tooltip></q-btn
          >
        </q-card-section>
      </q-card>
      <q-separator />

      <q-card>
        <div class="text-subtitle2">
          <b> {{ tittles }} </b>- Fecha Desde:
          {{ fecha(fechas.fechaInicio) }} Hasta
          {{ fecha(fechas.fechaFinal) }}
          <q-btn size="15px" round dense flat color="black" icon="eject" />
        </div>
        <CantidadReporte />
      </q-card>
      <q-separator />
    </q-form>
  </div>
</template>
<script>
import { ref } from "vue";
import apiAxios from "../../../axios/index";
import CantidadReporte from "../components/cantidadCondicion.vue";
import { useStore } from "vuex";
import { fecha } from "../../../helper/validation";
import { useRouter } from "vue-router";
export default {
  components: {
    CantidadReporte,
  },
  setup() {
    const model = ref([]),
      store = useStore(),
      msg = ref(null),
      tittles = ref(""),
      fechas = ref({}),
      router = useRouter();

    const accessToken = store.getters.isGetter("isToken");

    const actionBd = (url, options) => {
      //"setLoading", false
      // store.dispatch("setLoading", true);

      // let variable = { val: "isLoading", valor: true };

      //store.dispatch("varMutuacion", variable);

      setTimeout(async () => {
        //let variable = { val: "isLoading", valor: true };

        store.dispatch("varMutuacion", { val: "isLoading", valor: true });

        await apiAxios(url, accessToken, options)
          .then((res) => {
            //  let variable = { val: "isList", valor: res.data };
            store.dispatch("varMutuacion", { val: "isList", valor: res.data });
          })
          .catch((err) => {
            store.dispatch("varMutuacion", { val: "msg", valor: err.message });
          })
          .finally(() => {
            store.dispatch("varMutuacion", { val: "isLoading", valor: false });
          });
      }, 1000);
    };

    if (Object.keys(store.getters.isGetter("isReport")).length > 0) {
      let { url, options, tittle } = store.getters.isGetter("isReport");

      tittles.value = tittle;
      fechas.value = options.data;

      actionBd(url, options);
    } else {
      router.push("/");
    }

    return {
      model,
      msg,
      fecha,
      tittles,
      fechas,
    };
  },
};
</script>
