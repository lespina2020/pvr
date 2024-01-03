<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md" @submit.prevent="action">
      <q-card>
        <q-card-section class="bg-green text-white">
          <div class="text-h6">Entrada de Unidades (BUSCAR)</div>
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
              :options="optionStatus"
              option-value="status"
              option-label="label"
              emit-value
              map-options
            />
            <q-select
              v-model="models"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options"
              @filter="filterFn"
              hint="Indique Unidad"
              style="width: 200px; padding-bottom: 32px"
              :rules="[required]"
            />
          </div>
          <q-card-actions>
            <q-btn size="sm" label="Consultar" color="green" type="submit" />
          </q-card-actions>
        </q-card-actions>
        <Table
          :variables="Entrada"
          :endPoint="endPoint"
          :method="method"
          :col="columnPvr"
        />
      </q-card>
    </q-form>
  </div>
</template>
<script>
import { ref, watchEffect } from "vue";
//import apiAxios from "../../axios/index";
import {
  required,
  fechaMayor,
  requiredBoolean /*, contarObjeto*/,
} from "../../../helper/validation";
import { loadList } from "../../../helper/list";
import Table from "../../table/indexEntrada.vue";
import { Entrada, endPoint, method } from "../../../helper/vars";
import { columnPvr } from "../../table/column/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  components: {
    Table,
  },
  setup() {
    const model = ref([]);
    const models = ref([]);
    const store = useStore();
    const stringOptions = ref([]);
    const router = useRouter();
    const $q = useQuasar();
    const unidades = ref([]);
    //const accessToken = store.getters.isGetter("isToken");

    //new Date().toLocaleDateString("en-US")

    const optionStatus = [
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
        (stringOptions.value = datos.data.map(function (ele) {
          return {
            value: ele.id,
            label: `${ele.unidad}`,
          };
        }))
    );
    const options = ref(stringOptions.value);
    const action = async () => {
      console.log(models.value);
      model.value.unidad = models.value.label;

      if (model.value.status === false || model.value.status === true) {
        let data = {};
        Object.assign(data, model.value);

        let obj = {
          url: "/api/reportes/All",
          options: {
            method: "POST",
            data,
          },
        };

        //let variable = { val: "isReport", valor: obj };
        //store.dispatch("varMutuacion", variable);

        store.dispatch("loadList", obj);

        // router.push("/reporte");

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
      filterFn(val, update, abort) {
        if (val) {
          update(() => {
            const needle = val.toLowerCase();
            options.value = stringOptions.value.filter(
              (v) => v.label.indexOf(needle) > -1
            );
          });
        }
      },

      action,
      model,
      required,
      unidades,
      optionStatus,
      options,
      Entrada,
      endPoint,
      method,
      columnPvr,
      fechaMayor,
      models,
      requiredBoolean,
    };
  },
};
</script>
