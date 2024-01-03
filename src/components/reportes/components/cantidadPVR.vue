<template>
  <q-card-section>
    <div class="q-pa-md">
      <Table :col="reporteFecha" />
      <vue-excel-xlsx
        :data="dataExcel"
        :columns="colExcelField"
        :file-name="'filename'"
        :file-type="'xlsx'"
        :sheet-name="'sheetname'"
      >
        Descargar Excel
      </vue-excel-xlsx>
    </div>
  </q-card-section>
</template>
<script>
import { ref, watchEffect } from "vue";
//import apiAxios from "../../axios/index";
import { useStore } from "vuex";
import { fecha } from "../../../helper/validation";

import Table from "../../../components/table/indexReporte.vue";
import { reporteFecha } from "../../../components/table/column/index";
//import { useRouter } from "vue-router";
export default {
  components: { Table },
  setup() {
    const model = ref([]);
    const store = useStore();
    const dataExcel = ref([]);

    const colExcelField = ref([]);

    //const router = useRouter();
    //const accessToken = store.getters.isGetter("isToken");
    store.dispatch("resetState");

    watchEffect(() => {
      if (store.getters.isGetter("isList")) {
        // let variable = { val: "isLoading", valor: true };

        model.value = store.getters.isGetter("isList");

        // console.log(store.getters.isGetter("isList"));

        let resp = model.value.map(function (ele) {
          let status = ele.status;
          // horaEntrada,
          //     horaSalida;

          let pvr = ele.pvr;
          //let pvr = JSON.parse(ele.pvr);

          if (status === false) {
            status = "Cerrado";
          } else {
            status = "Abierto";
          }
          return {
            id: `0${ele.id}`,
            correlativo: `0${ele.id}`,
            pvr,
            unidad: ele.unidad,
            chofer: ele.chofer,
            placa: ele.placa,
            fecha: fecha(ele.fecha),
            status,
            horaEntrada: pvr.isVariableEntrada.horaEntrada,
            horaSalida: pvr.isVariableSalida.horaSalida,
            GasoilSalida: pvr.isVariableSalida.GsSalida,
            GasoilEntrada: pvr.isVariableEntrada.GsEntrada,
          };
        });
        let columnas = reporteFecha();

        Object.entries(columnas).forEach(([key, value]) => {
          //console.log(value.name);

          colExcelField.value.push({
            label: value.name,
            field: value.name,
          });
        });

        dataExcel.value = resp;

        let variable = { val: "isList", valor: resp };
        store.dispatch("varMutuacion", variable);
      }
    });

    return {
      model,
      dataExcel,
      reporteFecha,
      colExcelField,
    };
  },
};
</script>
