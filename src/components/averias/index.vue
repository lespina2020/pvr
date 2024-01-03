<template>
  <div>
    <Table
      :variables="averias"
      :endPoint="endPoint"
      :method="method"
      :col="columnAverias"
    />
  </div>
</template>
<script>
//import { ref } from "vue";
import Table from "../../components/table/index.vue";
import { averias, endPoint, method } from "../../helper/vars";
import { columnAverias } from "../table/column/index";
export default {
  components: {
    Table,
  },
  setup() {
    return { averias, endPoint, method, columnAverias };
  },
};
</script>
