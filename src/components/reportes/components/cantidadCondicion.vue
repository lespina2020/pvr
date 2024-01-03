<template>
  <q-card-section>
    <div class="q-pa-md">
      <Table :col="reporteFechaCondicion" />
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

import Table from "../../table/indexReporte.vue";
import { reporteFechaCondicion } from "../../table/column/index";
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

        //console.log(store.getters.isGetter("isList"));

        model.value = store.getters.isGetter("isList");

        // console.log(store.getters.isGetter("isList"));

        let resp = model.value.map(function (ele) {
          // horaEntrada,
          //     horaSalida;

          return {
            unidad: ele.unidad,
            chofer: ele.chofer,
            placa: ele.placa,
            fechaEntrada: fecha(ele.pvr.isVariableEntrada.fechaEntrada),
            horaEntrada: ele.pvr.isVariableEntrada.horaEntrada,
            horaSalida: ele.pvr.isVariableSalida.horaSalida,
          };
        });
        let columnas = reporteFechaCondicion();

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
      reporteFechaCondicion,
      colExcelField,
    };
  },
};
</script>
