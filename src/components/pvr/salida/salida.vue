<template>
  <div class="q-gutter-md row items-start">
    <q-markup-table :separator="'cell'" flat bordered>
      <thead>
        <tr>
          <th class="text-left"><b>CONDICIONES EN QUE</b></th>
          <th class="text-center"><b>SALE</b></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">FECHA</td>
          <td class="text-center">
            <q-input
              type="date"
              v-model="model.fechaSalida"
              style="width: 100px; padding: 0px"
              @update:model-value="save('isVariableSalida')"
              :rules="[required]"
            />
          </td>
          <td class="text-center"></td>
        </tr>
        <tr>
          <td class="text-left">HORA</td>
          <td class="text-center">
            <q-input
              type="time"
              v-model="model.horaSalida"
              style="width: 100px; padding: 0px"
              @update:model-value="save('isVariableSalida')"
              :rules="[required]"
            />
          </td>
          <td class="text-center"></td>
        </tr>
        <tr>
          <td class="text-left">KILOMETRAJE</td>
          <td class="text-right">
            <q-input
              type="number"
              style="width: 150px; padding: 0px"
              v-model="model.kmSalida"
              @update:model-value="save('isVariableSalida')"
              :rules="[required]"
            >
            </q-input>
          </td>
          <td class="text-right"></td>
        </tr>
        <tr>
          <td class="text-left">GASOLINA/GASOIL</td>
          <td class="text-right">
            <q-input
              v-model="model.GsSalida"
              @update:model-value="save('isVariableSalida')"
              style="width: 150px; padding: 0px"
              :rules="[required]"
            >
            </q-input>
          </td>
          <td class="text-right"></td>
        </tr>
        <tr>
          <td class="text-left">ACEITE MOTOR</td>
          <td class="text-right">
            <q-input
              style="width: 150px; padding: 0px"
              v-model="model.aceiteMotorSalida"
              @update:model-value="save('isVariableSalida')"
              :rules="[required]"
            >
            </q-input>
          </td>
          <td class="text-right"></td>
        </tr>
        <tr>
          <td class="text-left">ACEITE HIDDRAULICO</td>
          <td class="text-right">
            <q-input
              style="width: 150px; padding: 15px"
              v-model="model.aceiteHidraSalida"
              @update:model-value="save('isVariableSalida')"
              :rules="[required]"
            >
            </q-input>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-separator />

    <q-markup-table :separator="'cell'" flat bordered>
      <thead>
        <tr>
          <th></th>

          <th colspan="4"><b>SALE</b></th>
        </tr>

        <tr>
          <th scope="col">Seleccione</th>

          <th>B</th>
          <th>M</th>
          <th>R</th>
          <th>N/A</th>
        </tr>
      </thead>
      <CAUCHO :tittle="'Caucho'" />
      <CAUCHO :tittle="'Carroceria_General'" />
      <CAUCHO :tittle="'Faros_delantero'" />
      <CAUCHO :tittle="'parachoque'" />
      <CAUCHO :tittle="'Tapade_Combustible'" />
      <CAUCHO :tittle="'Espejos'" />
      <CAUCHO :tittle="'Luces_Transeras'" />
      <CAUCHO :tittle="'Extintor'" />
      <CAUCHO :tittle="'Triangulo'" />
    </q-markup-table>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
//import TablaCondicion from "./tablaCondicion.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { required /*, contarObjeto*/ } from "../../../helper/validation";
import CAUCHO from "../salida/salidaRadioSal.vue";
//import FIRMA from "../../../components/firma/index.vue";
export default {
  components: {
    //  TablaCondicion,
    CAUCHO,
  },
  props: ["modelVariables", "modelCondicion", "validacion"],

  setup(props) {
    const model = ref([]),
      route = useRoute(),
      visibleEntrada = route.name,
      store = useStore();

    let value = props.modelVariables,
      valueCondicion = props.modelCondicion,
      valida = props.validacion;

    watchEffect(() => {
      if (store.getters.isAction.data) {
        model.value = store.getters.isGetter(value);
      }
    });

    const save = (isVar) => {
      let obj = {};

      //let radio = id;

      //obj[radio] = model.value;

      obj = { ...model.value };

      // obj.id = radio;

      // console.log(obj);

      let variable = { val: isVar, valor: obj };

      store.dispatch("varMutuacion", variable);
    };

    return {
      model,
      shepe: ref("N/A"),
      save,
      required,
      valida,
      visibleEntrada,
      valueCondicion,
    };
  },
};
</script>
