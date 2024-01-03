<template>
  <div class="q-pa-md">
    <q-table
      title=""
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="name"
    >
      <template v-slot:top-right>
        <q-input
          rounded
          filled
          clearable
          borderless
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
          bg-color="field"
        >
          <template v-slot:append
            ><q-icon name="search" color="blue"
          /></template>
        </q-input>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width> </q-td>

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="text-h6">
      Total de PVR: <b>{{ total }}</b>
    </div>
  </div>
</template>
<script>
import { ref, watchEffect } from "vue";

import { useStore } from "vuex";
export default {
  name: "Qtable",
  props: ["col"],

  setup(props) {
    const columns = ref(props.col()),
      rows = ref([]),
      store = useStore(),
      total = ref(""),
      filter = ref("");

    watchEffect(() => {
      if (store.getters.isGetter("isList")) {
        rows.value = store.getters.isGetter("isList");
        total.value = rows.value.length;
      }
    });

    return {
      columns,
      rows,
      total,

      filter,
    };
  },
};
</script>
