<template>
  <tbody>
    <tr>
      <th>{{ tittle }}</th>
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
        <q-radio
          v-model="model"
          val="N/A"
          @update:model-value="save()"
          disable
        />
      </td>
      <Entrada :tittle="tittle" />
    </tr>
  </tbody>
</template>

<script>
import { ref } from "vue";
//import TablaCondicion from "./tablaCondicion.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { required /*, contarObjeto*/ } from "../../../helper/validation";
//import RadioEntrada from "../../pvr/salida/salidaRadioEnt.vue";
import Entrada from "../entrada/entradaRadioEntPvr.vue";
export default {
  components: {
    //  TablaCondicion,
    // SalidaRadioEnt,
    //RadioEntrada,
    Entrada,
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
      model.value = store.getters.isGetter("isVariableCondicionSalida")[
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
        val: "isVariableCondicionSalida",
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
