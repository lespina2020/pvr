<template>
  <td style="padding: 0px">
    <q-radio v-model="model" val="B" @update:model-value="save()" disable />
  </td>
  <td style="padding: 0px">
    <q-radio v-model="model" val="M" @update:model-value="save()" disable />
  </td>
  <td style="padding: 0px">
    <q-radio v-model="model" val="R" @update:model-value="save()" disable />
  </td>
  <td style="padding: 0px">
    <q-radio v-model="model" val="N/A" @update:model-value="save()" disable />
  </td>
</template>

<script>
import { ref } from "vue";
//import TablaCondicion from "./tablaCondicion.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { required /*, contarObjeto*/ } from "../../../helper/validation";
//import RadioEntrada from "../../pvr/salida/salidaRadioEnt.vue";
//import SalidaRadioEnt from "../salida/salidaRadioEnt.vue";
export default {
  components: {
    //  TablaCondicion,
    // SalidaRadioEnt,
    //RadioEntrada,
  },
  props: ["tittle"],

  setup(props) {
    const model = ref([]),
      tittleSalida = ref([props.tittle]),
      keys = ref(props.tittle),
      route = useRoute(),
      visibleEntrada = route.name,
      store = useStore();

    if (store.getters.isAction.data) {
      model.value = store.getters.isGetter("isVariableCondicionEntrada")[
        keys.value
      ];

      /* console.log(
        store.getters.isGetter("isVariableCondicionSalida").map(function (ele) {
          return {
            [keys.value]: ele[0],
          };
        })
      );*/

      // console.log(obj.value);
    }

    const save = () => {
      let obj = {};

      let radio = props.tittle;

      obj[radio] = model.value;

      //isPvrS;

      //obj = { ...obj };

      let variable = {
        val: "isVariableCondicionEntrada",
        valor: obj,
        key: radio,
      };

      store.dispatch("varMutuacionArray", variable);

      //console.log(store.getters.isGetter("isVariableCondicionSalida"));
    };

    return {
      model,

      save,
      required,

      tittleSalida,
      visibleEntrada,
    };
  },
};
</script>
