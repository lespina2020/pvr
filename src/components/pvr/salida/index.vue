<template>
  <div>
    <Table
      :variables="Salida"
      :endPoint="endPoint"
      :method="method"
      :col="columnPvr"
    />
  </div>
</template>
<script>
//import { ref } from "vue";
import Table from "../../table/indexSalida.vue";
import { Salida, endPoint, method } from "../../../helper/vars";
import { columnPvr } from "../../table/column/index";
export default {
  components: {
    Table,
  },
  setup() {
    return { Salida, endPoint, method, columnPvr };
  },
};
</script>
