<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md" @submit.prevent="action">
      <q-card>
        <q-card-section class="bg-green text-white">
          <div class="text-h6">UNIDADES OPERATIVAS E INOPERATIVAS</div>
          <q-btn color="green" :icon="'arrow_back'" size="sm" to="/">
            <q-tooltip> Atras</q-tooltip></q-btn
          >
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-actions vertical align="center">
          <div v-if="operativo === true">
            <q-card>
              <div class="text-subtitle2">
                <b>Reporte Operatividad de las Unidades</b>
              </div>
              <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
            </q-card>
          </div>
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
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
//import { useRouter } from "vue-router";
//import { useQuasar } from "quasar";

export default {
  components: { Bar },
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
      labels: ["Operativas", "Inoperativa"],

      datasets: [
        {
          data: [0, 0],
          label: "Unidades Operativas",
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

      let url = "/api/reportes/operatividad";

      store.dispatch("varMutuacion", { val: "isLoading", valor: true });

      await apiAxios(url, accessToken, options)
        .then((res) => {
          //  let variable = { val: "isList", valor: res.data };

          Object.assign(model.value, res.data);

          operativas.value = res.data.operativas;
          inoperativas.value = res.data.inoperativa;

          console.log(info.value);

          chartData.value = {
            labels: ["Operativas", "Inoperativa"],

            datasets: [
              {
                data: [operativas.value, inoperativas.value],
                label: "Unidades Operativas",
              },
            ],
          };

          /* operativo.value = model.value.idEstado;
          total.value = res.data.length;

          /* for (let i in res.data) {
            salidas.push(JSON.parse(res.data[i].pvr));
          }

          for (let x in salidas) {
            // if (x === "isVariableCondicionSalida") {
            console.log(
              salidas[x].isVariableCondicionSalida.Carroceria_General,
              salidas[x].isUnidad
            );
            // }
          }*/
        })
        .catch((err) => {
          store.dispatch("varMutuacion", { val: "msg", valor: err.message });
        })
        .finally(() => {
          store.dispatch("varMutuacion", { val: "isLoading", valor: false });
        });
    };
    action();
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

      chartOptions: {
        backgroundColor: "green",
        responsive: true,
      },
    };
  },
};
</script>
