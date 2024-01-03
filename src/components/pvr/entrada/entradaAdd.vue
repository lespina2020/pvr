<template>
  <div class="q-pa-md">
    <q-form class="q-gutter-md" @submit.prevent="guardar">
      <q-card>
        <q-card-section class="bg-green text-white">
          <div class="text-h6">
            Registro de Planilla de Prevencion Vehicular **ENTRADA***
          </div>
          <q-btn color="green" :icon="'arrow_back'" size="sm" to="/salida">
            <q-tooltip> Atras</q-tooltip></q-btn
          >
        </q-card-section>
      </q-card>
      <q-separator />

      <q-card>
        <div class="text-subtitle2">
          <b>PVR</b>
          <Iscorrelativo />
          <q-btn size="15px" round dense flat color="black" icon="note" />
        </div>

        <q-separator />
      </q-card>

      <q-card>
        <div class="text-subtitle2">
          <b>UNIDAD</b>
          <q-btn
            size="15px"
            round
            dense
            flat
            color="black"
            icon="add_shopping_cart"
          />
        </div>

        <Unidades />
        <q-separator />
      </q-card>
      <q-card>
        <b> CHOFER</b>
        <q-btn size="15px" round dense flat color="black" icon="drive_eta" />

        <Choferes />
        <q-separator />
      </q-card>
      <q-card><VerificadoresSalida /></q-card>
      <q-card>
        <div class="text-subtitle2">
          <b>Acompañantes o Ayudantes</b>
          <q-btn size="15px" round dense flat color="black" icon="eject" />
        </div>
      </q-card>
      <q-separator />
      <q-card>
        <div class="text-subtitle2">
          <b>RUTAS</b>
          <q-btn size="15px" round dense flat color="black" icon="map" />
        </div>

        <Rutas />
      </q-card>
      <q-card><Verificadores /></q-card>
      <q-separator />
      <q-card>
        <div class="text-subtitle2">
          <b>SALIDA </b>
          <q-card class="my-card" flat bordered>
            <Salidas
              :modelVariables="'isVariableSalida'"
              :modelCondicion="'isVariableCondicionSalida'"
            />
          </q-card>
        </div>
        <div class="text-subtitle2">
          <b>ENTRADA </b>
          <q-card class="my-card" flat bordered>
            <Entrada
              :modelVariables="'isVariableEntrada'"
              :modelCondicion="'isVariableCondicionEntrada'"
            />
          </q-card>
        </div>
      </q-card>
      <q-separator />
      <q-card>
        <div class="text-subtitle2">
          <b>Observacion </b>
          <q-card class="my-card" flat bordered> <Observacion /></q-card>
        </div>
      </q-card>

      <q-card-actions vertical align="center">
        <q-btn
          size="sm"
          color="red"
          type="submit"
          :label="label"
          :disable="buttonDisabled"
        />
      </q-card-actions>
    </q-form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";
import Salidas from "../../pvr/salida/salida.vue";
import Entrada from "../../pvr/entrada/entrada.vue";
import Observacion from "../../pvr/observacion/index.vue";
import Choferes from "../../pvr/choferes/index.vue";
import Unidades from "../../pvr/unidades/index.vue";
//import Ayudantes from "../../pvr/ayudantes/index.vue";
import Iscorrelativo from "../../pvr/salida/correlativo.vue";
import Rutas from "../../pvr/rutas/index.vue";
import Verificadores from "../verificadores/index.vue";
import VerificadoresSalida from "../verificadores/verificadorSalida.vue";
import crud from "../../../composables/index";
import { Salida } from "../../../helper/vars";
import { loadList } from "../../../helper/list";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

/*
// Alternativa 1: Pasar a JSON
variable = JSON.parse(JSON.stringify(variable))

// Alternativa 2: Crear una copia usando el operador spread
variable = { ...variable }

// Alternativa 3: Crear una copia usando Object.assign
variable = Object.assign({}, variable)
*/

//import { useStore } from "vuex";
//import { ref } from "vue";

export default {
  components: {
    Choferes,
    Unidades,
    // Ayudantes,
    Verificadores,
    VerificadoresSalida,
    Rutas,
    Salidas,
    Entrada,
    Iscorrelativo,
    Observacion,
  },

  setup() {
    const store = useStore(),
      $q = useQuasar(),
      isDisabled = ref(false),
      label = ref("Guardar"),
      // router = useRouter(),
      route = useRoute(),
      visibleEntrada = route.name,
      unidades = ref(false),
      buttonDisabled = ref(false),
      //model = ref([]),
      myAction = {};

    let val = "status",
      valor = true;

    if (store.getters.isAction.data) {
      Object.assign(myAction, store.getters.isAction);
      let objs = { ...store.getters.isAction.data };

      let { pvr } = objs;
      //    pvr = JSON.parse(pvr);
      if (label.value != "Eliminar") {
        buttonDisabled.value = myAction.disabled;
        label.value = myAction.label;
      }
      isDisabled.value = myAction.disabled;

      Object.entries(pvr).forEach(([val, valor]) => {
        store.dispatch("varMutuacion", { val, valor });
      });
      if (route.name === "entradaAdd") {
        label.value = "Cerrar PVR";
        valor = false;
      }
    }

    const guardar = async () => {
      let unidad = store.getters.isGetter("isUnidad").unidad;
      if (!store.getters.isAction.data) {
        await loadList(`/api/salidas/pvrStatus/${unidad}`, "GET").then(
          (res) => {
            unidades.value = res.data;
          }
        );
      }

      if (unidades.value === true) {
        $q.notify({
          type: "negative",
          message: "La unidad Tiene un PVR Abierto.",
        });
      } else {
        store.dispatch("varMutuacion", { val, valor });

        //  let pvrCondicion = JSON.parse(store.getters.isData().pvr);

        const { confirm } = crud();

        let objeto = {};
        let data = {};

        let { pvr } = store.getters.isData();

        let {
          isVariableCondicionEntrada,
          isVariableCondicionSalida,
          isVariableEntrada,
          isVariableSalida,
          isObservacion,
          isUsuarioSalida,
          isUsuario,
          isListAyudante,
        } = pvr;

        //console.log(store.getters.isGetter("isVariableCondicionSalida"));

        //console.log();

        objeto = {
          marca: pvr.isUnidad.marca,
          isChofer: {
            nombreApellido: pvr.isChofer.nombreApellido,
            cedula: pvr.isChofer.cedula,
            firma: `${pvr.isChofer.cedula}.png`,
          },
          isRuta: {
            codRuta: pvr.isRuta.codRuta,
            idSupervisor: pvr.isRuta.idSupervisor,
          },

          isVerificadorSalida: {
            nombreApellido: pvr.isVerificadorSalida.nombreApellido,
            cedula: pvr.isVerificadorSalida.cedula,
            firma: `${pvr.isVerificadorSalida.cedula}.png`,
          },
          isVerificadorEntrada: {
            nombreApellido: pvr.isVerificador.nombreApellido,
            cedula: pvr.isVerificador.cedula,
            firma: `${pvr.isVerificador.cedula}.png`,
          },
          isUsuarioSalida,
          isUsuario,
          isVariableCondicionEntrada,
          isVariableCondicionSalida,
          isVariableEntrada,
          isVariableSalida,
          isObservacion,
          isListAyudante,
        };

        //Object.assign(objeto, store.getters.isData().pvr.isUnidad.marca);

        //console.log(store.getters.isData());

        Object.assign(data, store.getters.isData());

        //console.log(store.getters.isData());

        data.pvr = objeto;

        //console.log(store.getters.isGetter("isVariableSalida"));

        /****comparacion de fecha *****/

        let fechaSalida =
          store.getters.isGetter("isVariableSalida").fechaSalida;

        let fechaEntrada =
          store.getters.isGetter("isVariableEntrada").fechaEntrada;

        let horaSalida = store.getters.isGetter("isVariableSalida").horaSalida;
        let horaEntrada =
          store.getters.isGetter("isVariableEntrada").horaEntrada;
        let kmSalida = store.getters.isGetter("isVariableSalida").kmSalida;
        let kmEntrada = undefined;

        watchEffect(() => {
          if (kmSalida) {
            kmEntrada = store.getters.isGetter("isVariableEntrada").kmEntrada;
          }
        });

        // console.log(kmSalida, kmEntrada);

        /****************** */
        //    $q.notify(confirm(store.getters.isData(), myAction, Salida));

        /*if (pvrCondicion.isVariableCondicionSalida.length === 0) {
          $q.notify({
            type: "negative",
            message: "Falto el Ingrese la Condicion de la Salida.",
          });
        } else {
          $q.notify(confirm(store.getters.isData(), myAction, Salida));
        }
      }*/

        if (fechaEntrada < fechaSalida) {
          $q.notify({
            type: "negative",
            message:
              "La Fecha de la Entrada tiene que ser mayor que la Fecha de la Salida ",
          });
          if (horaEntrada < horaSalida) {
            $q.notify({
              type: "negative",
              message:
                "La hora de la Entrada tiene que ser mayor que la hora de la Salida ",
            });
          }
        } else if (kmSalida > kmEntrada) {
          $q.notify({
            type: "negative",
            message:
              "La Kilometraje de la Entrada tiene que ser mayor al KM de la Salida ",
          });
        } else {
          $q.notify(confirm(data, myAction, Salida));
        }
      }
    };

    return {
      guardar,
      label,
      visibleEntrada,
      buttonDisabled,
    };
  },
};
</script>
<style>
.my-card {
  width: 100%;
  max-width: 900px;
}
</style>
