<template>
  <div class="q-gutter-md row items-start">
    <q-select
      filled
      v-model="model"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="options"
      @filter="filterFn"
      hint="Indique Cedula del Chofer"
      style="width: 250px; padding-bottom: 32px"
      @update:model-value="showChannel"
      :rules="[required]"
    />
    <q-input
      v-model="model.nombreApellido"
      readonly="readonly"
      type="text"
      label="Nombre"
      style="width: 300px"
    />
    <q-input
      v-model="model.telefono"
      readonly="readonly"
      type="text"
      label="Telefono"
      style="width: 100px"
    />
    <q-input
      v-model="model.licencia"
      type="date"
      readonly="readonly"
      label="Fecha de licencia"
      style="width: 100"
      lazy-rules
      :rules="[(val) => vencimiento(val)]"
    />
    <q-input
      v-model="model.certificadoMedico"
      type="date"
      readonly="readonly"
      label="Fecha Certificado Medico"
      style="width: 100px"
      lazy-rules
      :rules="[(val) => vencimiento(val)]"
    />
  </div>
</template>
<script>
import { loadList } from "../../../helper/list";
import {
  required,
  vencimiento /*, contarObjeto*/,
} from "../../../helper/validation";
import { ref } from "vue";

import { useStore } from "vuex";
export default {
  setup() {
    const stringOptions = ref([]),
      store = useStore(),
      isDisable = ref(true),
      model = ref([]);

    if (store.getters.isAction.data) {
      model.value = store.getters.isGetter("isChofer");
    }

    loadList("/api/choferes/All", "POST").then(
      (datos) =>
        (stringOptions.value = datos.data.map(function (ele) {
          return {
            value: ele.cedula,
            label: `${ele.nombreApellido.toLowerCase()}`,
          };
        }))
    );
    const options = ref(stringOptions.value);

    const showChannel = async (val) => {
      console.log(val);

      await loadList(`/api/choferesCedula/${val.value}`, "GET").then(
        (datos) => {
          /*  model.value = datos.data[0];
          let variable = { val: "isChofer", valor: model.value };
          store.dispatch("varMutuacion", variable);*/

          Object.assign(model.value, datos.data[0]);

          let variable = { val: "isChofer", valor: model.value };
          store.dispatch("varMutuacion", variable);

          //   let variable = { isChofer: model.value };

          //store.dispatch("varMutuacionArray", variable);
        }
      );

      //  let variable = { val: "isChofer", valor: model.value };
      //store.dispatch("varMutuacion", variable);
    };

    return {
      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.value.filter(
            (v) => v.label.indexOf(needle) > -1
          );
        });
      },

      options,
      model,
      required,
      showChannel,
      isDisable,
      vencimiento,
    };
  },
};
</script>
