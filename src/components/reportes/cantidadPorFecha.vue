<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md" @submit.prevent="action">
      <q-card>
        <q-card-section class="bg-green text-white">
          <div class="text-h6">
            Reporte Por Fecha de PVR Por dia de Registro
          </div>
          <q-btn color="green" :icon="'arrow_back'" size="sm" to="/">
            <q-tooltip> Atras</q-tooltip></q-btn
          >
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-actions vertical align="center">
          <div class="q-gutter-md row items-start">
            <q-input
              v-model="model.fechaInicio"
              type="date"
              hint="Fecha desde"
              style="width: 150px"
              :rules="[required, (val) => fechaMayor(val, model.fechaFinal)]"
            />
            <q-input
              v-model="model.fechaFinal"
              type="date"
              hint="Fecha desde"
              style="width: 150px"
              :rules="[required, (val) => fechaMayor(model.fechaInicio, val)]"
            />

            <q-select
              v-model="model.status"
              hint="Status del PVR"
              style="width: 150px"
              :options="options"
              option-value="status"
              option-label="label"
              emit-value
              map-options
            />
            <q-select
              v-model="model.unidad"
              hint="Unidad"
              style="width: 150px"
              :options="unidades"
              option-value="unidad"
              option-label="unidad"
              emit-value
              map-options
            />
          </div>
          <q-card-actions>
            <q-btn size="sm" label="Consultar" color="green" type="submit" />
          </q-card-actions>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
<script>
import { ref } from "vue";
//import apiAxios from "../../axios/index";
import {
  required,
  fechaMayor,
  requiredBoolean /*, contarObjeto*/,
} from "../../helper/validation";
import { loadList } from "../../helper/list";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const model = ref([]);
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    const unidades = ref([]);
    //const accessToken = store.getters.isGetter("isToken");

    const options = [
      {
        status: false,
        label: "Cerrado",
      },
      {
        status: true,
        label: "Abierto",
      },
    ];

    loadList("/api/vehiculo/All", "POST").then(
      (datos) =>
        (unidades.value = datos.data.map(function (ele) {
          return {
            unidad: ele.unidad,
          };
        }))
    );

    const action = async () => {
      console.log(model.value.status);

      if (model.value.status === false || model.value.status === true) {
        let data = {};
        Object.assign(data, model.value);

        let obj = {
          url: "/api/reportes/All",
          options: {
            method: "POST",
            data,
          },
          tipoReporte: "cantidadPorFecha",
          tittle: "Reporte Cantidad Por Fecha de PVR ",
          componente: "cantidadPVR",
        };

        let variable = { val: "isReport", valor: obj };
        store.dispatch("varMutuacion", variable);

        router.push("/reporte");

        /* await apiAxios(url, accessToken, options).then((respo) => {
        console.log(respo);
      });*/
      } else {
        $q.notify({
          type: "negative",
          message: "Debe Seleccionar Condicion del PVR",
        });
      }
    };
    return {
      action,
      model,
      required,
      unidades,
      options,
      fechaMayor,
      requiredBoolean,
    };
  },
};
</script>
