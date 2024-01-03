<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md" @submit.prevent="action">
      <q-card>
        <q-card-section class="bg-green text-white">
          <div class="text-h6">Reporte Por Condicion de Unidad</div>
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
              v-model="model.condicion"
              hint="Condicion"
              style="width: 150px"
              :options="condicion"
              option-value="condicion"
              option-label="condicion"
              emit-value
              map-options
            />
            <q-select
              v-model="model.estado"
              hint="Estado"
              style="width: 150px"
              :options="estado"
              option-value="estado"
              option-label="estado"
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
//import { loadList } from "../../helper/list";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
//import apiAxios from "../../axios/index";

export default {
  setup() {
    const model = ref([]);
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    //const estado = ref([]);
    //const accessToken = store.getters.isGetter("isToken");

    const condicion = [
      {
        condicion: "Caucho",
      },
      {
        condicion: "Carroceria_General",
      },
      {
        condicion: "Faros_delantero",
      },
      {
        condicion: "Tapade_Combustible",
      },
      {
        condicion: "Luces_Transeras",
      },
      {
        condicion: "Extintor",
      },
      {
        condicion: "Triangulo",
      },
    ];

    const estado = [
      {
        estado: "B",
      },
      {
        estado: "M",
      },
      {
        estado: "R",
      },
    ];

    const action = async () => {
      console.log(model.value.status);

      if (model.value.estado && model.value.condicion) {
        let data = {};
        Object.assign(data, model.value);

        //let url = "/api/reportes/condicion";

        let obj = {
          url: "/api/reportes/condicion",
          options: {
            method: "POST",
            data,
          },
          tipoReporte: "cantidadPorFechaCondicion",
          tittle: "Reporte Cantidad Por Fecha de Condicion Entrada ",
          componente: "cantidadPVR",
        };

        let variable = { val: "isReport", valor: obj };
        store.dispatch("varMutuacion", variable);

        router.push("/reporteCondicionW");
      } else {
        $q.notify({
          type: "negative",
          message: "Debe Seleccionar Condicion y Estado",
        });
      }
    };
    return {
      action,
      model,
      required,
      estado,
      condicion,
      fechaMayor,
      requiredBoolean,
    };
  },
};
</script>
