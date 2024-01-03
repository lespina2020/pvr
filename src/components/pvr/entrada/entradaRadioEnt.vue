<template>
  <tbody>
    <tr>
      <th style="padding: 0px">{{ tittle }}</th>
      <td style="padding: 0px">
        <q-radio v-model="model" val="B" @update:model-value="save()" />
      </td>
      <td style="padding: 0px">
        <q-radio v-model="model" val="M" @update:model-value="save()" />
      </td>
      <td style="padding: 0px">
        <q-radio v-model="model" val="R" @update:model-value="save()" />
      </td>
      <td style="padding: 0px">
        <q-radio v-model="model" val="N/A" @update:model-value="save()" />
      </td>
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
//import SalidaRadioEnt from "../salida/salidaRadioEnt.vue";
export default {
  components: {
    //  TablaCondicion,
    // SalidaRadioEnt,
    //RadioEntrada,
  },
  props: ["tittle"],

  setup(props) {
    const model = ref("N/A"),
      tittleSalida = ref([props.tittle]),
      keys = ref(props.tittle),
      route = useRoute(),
      obj = ref([]),
      visibleEntrada = route.name,
      store = useStore();

    let variable = {
      val: "isVariableCondicionEntrada",
      valor: {
        Caucho: "N/A",
        Carroceria_General: "N/A",
        Faros_delantero: "N/A",
        parachoque: "N/A",
        Tapade_Combustible: "N/A",
        Espejos: "N/A",
        Luces_Transeras: "N/A",
        Extintor: "N/A",
        Triangulo: "N/A",
      },
    };

    store.dispatch("varMutuacion", variable);

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
