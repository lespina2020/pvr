<template>
  <div class="q-pa-md">
    <div class="text-h6 text-center">Planilla de Prevencion Vehicular</div>
    <div class="text-h8 text-center">
      <b>PLANILLA N° DE OPERACIONES:0{{ model.correlativo }}</b>
    </div>
  </div>

  <div class="q-pa-md row items-start justify-center q-gutter-md">
    <q-card flat bordered class="my-card">
      <q-card-section class="q-pt-none">
        <q-markup-table>
          <tbody>
            <tr>
              <td><b>Unidad:</b>{{ model.unidad }}</td>
              <td><b>Placa:</b>{{ model.placa }}</td>
              <td><b>Tipo de Unidad:</b>{{ model.tipoUnidad }}</td>
            </tr>
            <tr>
              <td><b>Modelo:</b>{{ model.marca }}</td>
              <td><b>Chofer:</b>{{ chofer.nombreApellido }}</td>
              <td><b>Cedula:</b>{{ chofer.cedula }}</td>
            </tr>
            <tr>
              <td><b>Telefono Chofer:</b>{{ chofer.telefono }}</td>
              <td><b>Cod-Ruta:</b>{{ ruta.codRuta }}</td>
              <td><b>Superv. Ruta:</b>{{ ruta.idSupervisor }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="4" nowrap></th>
            </tr>
          </tfoot>
        </q-markup-table>
        <q-separator inset />
        <q-card>
          <q-markup-table :separator="'cell'" flat bordered>
            <thead>
              <tr>
                <th class="text-left"><b>CONDICIONES EN QUE</b></th>
                <th class="text-center"><b>SALE</b></th>
                <th class="text-center">
                  <b>ENTRA</b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">FECHA</td>
                <td class="text-center">
                  <q-input
                    type="date"
                    v-model="isSalida.fechaSalida"
                    style="width: 120px"
                    readonly
                  />
                </td>
                <td class="text-center">
                  <q-input
                    type="date"
                    v-model="isEntrada.fechaEntrada"
                    style="width: 120px"
                    readonly
                  />
                </td>
              </tr>
              <tr>
                <td class="text-left">HORA</td>
                <td class="text-center">
                  {{ isSalida.horaSalida }}
                </td>
                <td class="text-center">
                  {{ isEntrada.horaEntrada }}
                </td>
              </tr>
              <tr>
                <td class="text-left">KILOMETRAJE</td>
                <td class="text-center">
                  {{ isSalida.kmSalida }}
                </td>
                <td class="text-center">
                  {{ isEntrada.kmEntrada }}
                </td>
              </tr>
              <tr>
                <td class="text-left">GASOLINA/GASOIL</td>
                <td class="text-center">
                  {{ isSalida.GsSalida }}
                </td>
                <td class="text-center">
                  {{ isEntrada.GsEntrada }}
                </td>
              </tr>
              <tr>
                <td class="text-left">ACEITE MOTOR</td>
                <td class="text-center">
                  {{ isSalida.aceiteMotorSalida }}
                </td>
                <td class="text-center">
                  {{ isEntrada.aceiteMotorEntrada }}
                </td>
              </tr>
              <tr>
                <td class="text-left">ACEITE HIDDRAULICO</td>
                <td class="text-center">
                  {{ isSalida.aceiteHidraSalida }}
                </td>
                <td class="text-center">
                  {{ isEntrada.aceiteHidraEntrada }}
                </td>
              </tr>
            </tbody>
          </q-markup-table></q-card
        >

        <q-separator inset />
      </q-card-section>
      <q-card-section>
        <q-markup-table :separator="'cell'" style="padding: 2px" flat bordered>
          <thead>
            <tr>
              <th></th>

              <th style="padding: 0px" colspan="4"><b>SALE</b></th>

              <th colspan="4" style="padding: 0px"><b>ENTRA</b></th>
            </tr>
            <tr>
              <th HEIGHT="2" style="padding: 0px">Seleccione</th>
              <th>B</th>
              <th>M</th>
              <th>R</th>
              <th>N/A</th>
              <th>B</th>
              <th>M</th>
              <th>R</th>
              <th>N/A</th>
            </tr>
          </thead>

          <Salida :tittle="'Caucho'" />
          <Salida :tittle="'Carroceria_General'" />
          <Salida :tittle="'Faros_delantero'" />
          <Salida :tittle="'parachoque'" />
          <Salida :tittle="'Tapade_Combustible'" />
          <Salida :tittle="'Espejos'" />
          <Salida :tittle="'Luces_Transeras'" />
          <Salida :tittle="'Extintor'" />
          <Salida :tittle="'Triangulo'" />
        </q-markup-table>
      </q-card-section>

      <q-card>
        <div class="text-subtitle2">
          <b>Observacion </b>
          <q-card class="my-card" flat bordered> <Observacion /></q-card>
        </div>
      </q-card>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-center">
              <b>CHOFER:{{ chofer.nombreApellido }}</b>
            </th>
            <th class="text-left">
              <b>SEGURIDAD:</b>
            </th>
            <th class="text-left">
              <b>Coord Verificador{{ verificador.nombreApellido }} </b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">
              <Img :url="urlServidor" :img="firmaChofer" />
            </td>
            <td class="text-left">
              <Img :url="urlServidor" :img="operador.firma" />
            </td>
            <td class="text-left">
              <Img :url="urlServidor" :img="firmaOperador" />
            </td>
          </tr></tbody
      ></q-markup-table>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-center">
              <b>CHOFER:{{ chofer.nombreApellido }}</b>
            </th>
            <th class="text-left">
              <b
                >SEGURIDAD:{{ operadorSalida.lastname }} :{{
                  operadorSalida.firstname
                }}</b
              >
            </th>
            <th class="text-left">
              <b>Coord Verificador{{ verificadorSalida.nombreApellido }} </b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center">
              <Img :url="urlServidor" :img="firmaChofer" />
            </td>
            <td class="text-left">
              <Img :url="urlServidor" :img="operadorSalida.firma" />
            </td>
            <td class="text-left">
              <Img :url="urlServidor" :img="firmaVerificadorSalida" />
            </td>
          </tr></tbody
      ></q-markup-table>
      <q-separator inset />

      <q-card-actions vertical align="center"> </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
//import RADIO from "./entradaRadioEnt copys.vue";
import Salida from "../salida/salidaRadioSalPvr.vue";
import Observacion from "../../pvr/observacion/index.vue";
import Img from "../../../components/img/index.vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  components: {
    //  RADIO,
    Salida,
    Observacion,
    Img,
  },

  setup() {
    const store = useStore(),
      label = ref("Guardar"),
      buttonDisabled = ref(false),
      //model = ref([]),
      isSalida = ref([]),
      model = ref([]),
      isEntrada = ref([]),
      modelo = ref([]),
      chofer = ref([]),
      ruta = ref([]),
      router = useRouter(),
      operador = ref([]),
      operadorSalida = ref([]),
      firmaVerificadorSalida = ref([]),
      verificador = ref([]),
      verificadorSalida = ref([]),
      urlServidor = axios.defaults.baseURL,
      firmaChofer = ref(""),
      firmaOperador = ref(""),
      myAction = {};

    if (store.getters.isAction.data) {
      Object.assign(myAction, store.getters.isAction);
      let objs = { ...store.getters.isAction.data };
      let { pvr } = objs;
      //pvr = JSON.parse(pvr);

      Object.entries(pvr).forEach(([val, valor]) => {
        store.dispatch("varMutuacion", { val, valor });
      });

      model.value = objs;
      model.value.marca = objs.pvr.marca;
      modelo.value = pvr.isUnidad;
      chofer.value = pvr.isChofer;
      ruta.value = pvr.isRuta;
      operador.value = pvr.isUsuario;
      operadorSalida.value = pvr.isUsuarioSalida;

      verificador.value = pvr.isVerificadorEntrada;
      verificadorSalida.value = pvr.isVerificadorSalida;

      isSalida.value = pvr.isVariableSalida;
      isEntrada.value = pvr.isVariableEntrada;

      firmaChofer.value = chofer.value.firma;
      firmaOperador.value = verificador.value.firma;
      firmaVerificadorSalida.value = verificadorSalida.value.firma;
    } else {
      router.push("/entrada");
    }

    return {
      label,
      buttonDisabled,
      isSalida,
      isEntrada,
      model,
      modelo,
      chofer,
      verificador,
      ruta,
      firmaChofer,
      firmaOperador,
      operador,
      urlServidor,
      verificadorSalida,
      operadorSalida,
      firmaVerificadorSalida,
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 800px
</style>
