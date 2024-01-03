<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md" @submit.prevent="action">
      <q-card>
        <q-card-section class="bg-green text-white">
          <div class="text-h6">REPORTE HISTORICO DE AVERIAS</div>
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
          </div>
          <q-card-actions>
            <q-btn size="sm" label="Consultar" color="green" type="submit" />
          </q-card-actions>

          <q-card>
            <div class="text-subtitle2">
              <b> </b>
            </div>
            <Doughnut :data="chartData" :options="options" />
          </q-card>
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
import apiAxios from "../../axios/index";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);
//import { useRouter } from "vue-router";
//import { useQuasar } from "quasar";

export default {
  components: { Doughnut },
  setup() {
    const model = ref([]);
    const store = useStore();
    const total = ref();
    //const router = useRouter();
    //const $q = useQuasar();
    const unidades = ref([]);
    const operativo = ref(false);
    const info = ref([]);
    const operativas = ref(0);
    const inoperativas = ref(0);
    const accessToken = store.getters.isGetter("isToken");

    const chartData = ref({});

    chartData.value = {
      labels: [
        "Sistema de Motor",
        "Sistema de Neumatico",
        "Sistema Hidraulico",
        "Carroceria",
      ],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: [0, 0, 0, 0],
        },
      ],
    };

    // let salidas = [];

    const action = async () => {
      // console.log(model.value.status);

      console.log("ss");

      operativo.value = true;

      let data = {};
      Object.assign(data, model.value);

      let options = {
        method: "POST",
        data,
      };

      let url = "/api/reportes/averia";

      store.dispatch("varMutuacion", { val: "isLoading", valor: true });

      await apiAxios(url, accessToken, options)
        .then((res) => {
          //  let variable = { val: "isList", valor: res.data };

          Object.assign(model.value, res.data);

          console.log(model.value);

          chartData.value = {
            labels: [
              "Sistema de Motor",
              "Sistema de Neumatico",
              "Sistema Hidraulico",
              "Carroceria",
            ],
            datasets: [
              {
                backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                data: [
                  model.value.sistemaMotor,
                  model.value.sistemaNeumatico,
                  model.value.sistemaHidraulico,
                  model.value.Carroceria,
                ],
              },
            ],
          };
        })
        .catch((err) => {
          store.dispatch("varMutuacion", { val: "msg", valor: err.message });
        })
        .finally(() => {
          store.dispatch("varMutuacion", { val: "isLoading", valor: false });
        });
    };

    return {
      action,
      model,
      required,
      operativas,
      inoperativas,
      chartData,
      unidades,
      total,

      operativo,
      fechaMayor,
      requiredBoolean,

      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
