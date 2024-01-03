<template>
  <td>
    <q-radio v-model="model" val="B" @update:model-value="save()" />
  </td>
  <td>
    <q-radio v-model="model" val="M" @update:model-value="save()" />
  </td>
  <td>
    <q-radio v-model="model" val="R" @update:model-value="save()" />
  </td>
  <td>
    <q-radio v-model="model" val="N/A" @update:model-value="save()" />
  </td>
</template>

<script>
import { ref } from "vue";
//import TablaCondicion from "./tablaCondicion.vue";
import { useStore } from "vuex";

//import SalidaRadioEnt from "../salida/salidaRadioEnt.vue";
export default {
  components: {
    //  TablaCondicion,
    // SalidaRadioEnt,
  },
  props: ["tittle"],

  setup(props) {
    const model = ref([]),
      keys = ref(props.tittle),
      store = useStore();

    if (store.getters.isAction.data) {
      model.value = store.getters.isGetter("isVariableCondicionEntrada")[0][
        keys.value
      ];

      console.log(store.getters.isGetter("isVariableCondicionEntrada"));
    }

    const save = () => {
      let obj = {};

      let radio = props.tittle;

      obj[radio] = model.value;

      //isPvrS;

      obj.id = radio;

      //obj = { ...obj };

      let variable = {
        val: "isVariableCondicionEntrada",
        valor: obj,
        key: radio,
      };

      console.log(variable);

      store.dispatch("varMutuacionArray", variable);
    };

    return {
      model,

      save,
    };
  },
};
</script>
