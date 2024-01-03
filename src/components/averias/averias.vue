<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-card-section class="bg-green text-white">
        <q-btn color="green" :icon="'arrow_back'" size="sm" to="/averias">
          <q-tooltip> Atras</q-tooltip></q-btn
        >Averias
      </q-card-section>
      <q-form ref="myForm" @submit.prevent="action">
        <q-card-actions>
          <div class="row">
            <div class="contenido">
              <q-select
                v-model="model.unidad"
                hint="Unidad"
                style="width: 150px"
                :options="unidades"
                option-value="unidad"
                option-label="unidad"
                emit-value
                map-options
              />
            </div>

            <div class="contenido">
              <q-select
                v-model="model.chofer"
                hint="Chofer"
                style="width: 150px"
                :options="choferes"
                option-value="chofer"
                option-label="chofer"
                emit-value
                map-options
              />
            </div>
            <div class="contenido">
              <q-select
                v-model="model.averia"
                hint="Averia"
                style="width: 150px"
                :options="av"
                option-value="averia"
                option-label="averia"
                emit-value
                map-options
              />
            </div>
            <div class="contenido">
              <q-input
                type="time"
                v-model="model.hora"
                style="width: 120px"
                :rules="[required]"
              />
            </div>
            <div class="contenido">
              <q-input
                type="date"
                v-model="model.fecha"
                style="width: 120px"
                :rules="[required]"
              />
            </div>

            <div class="q-pa-md q-gutter-sm">
              <b>Observacion </b>
              <q-editor
                v-model="model.observacion"
                :definitions="{
                  bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
                }"
              />
            </div>

            <q-toggle
              name="fueraServicio"
              v-model="idEstado"
              color="red"
              label="En Servicio"
              :disable="isDisabled"
            />
          </div>
        </q-card-actions>
        <q-separator />
        <!-- <Buttons :lbl="labelButon" @click="datos()"   @click="stepFunction()" /> -->
        <q-card-actions>
          <q-btn
            size="sm"
            color="red"
            :disable="buttonDisabled"
            type="submit"
            :label="label"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import { ref } from "vue";
import { search } from "../../helper/list";
//import { unidades } from "../../helper/variables";
import { required /*, contarObjeto*/ } from "../../helper/validation";
import crud from "../../composables/index";
import { averias } from "../../helper/vars";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { loadList } from "../../helper/list";
export default {
  setup() {
    const model = ref([]);
    const store = useStore();
    const myForm = ref(null);
    const myAction = {};
    const isDisabled = ref(false),
      idEstado = ref(false),
      unidades = ref([]),
      choferes = ref([]),
      //stringOptions = ref([]),
      buttonDisabled = ref(false),
      $q = useQuasar(),
      // store = useStore(),
      label = ref("Guardar"),
      cedula = ref("");

    // let idUsuario = store.getters.isGetter("isToken").email;

    /****VARIABLE FIJA PARA EL BUSCADOR SEARCH* */

    loadList("/api/vehiculo/All", "POST").then(
      (datos) =>
        (unidades.value = datos.data.map(function (ele) {
          return {
            unidad: `${ele.unidad}`,
          };
        }))
    );
    loadList("/api/choferes/All", "POST").then(
      (datos) =>
        (choferes.value = datos.data.map(function (ele) {
          return {
            chofer: `${ele.nombreApellido}`,
          };
        }))
    );

    const av = [
      {
        averia: "Sistema de Motor",
      },
      {
        averia: "Sistema de Neumatico",
      },
      {
        averia: "Sistema Hidraulico",
      },
      {
        averia: "Carroceria",
      },
    ];

    if (store.getters.isGetter("isAction").data) {
      Object.assign(myAction, store.getters.isGetter("isAction"));

      console.log(store.getters.isGetter("isAction").data);

      model.value = myAction.data[0];
      label.value = myAction.label;
      idEstado.value = model.value.idEstado;

      console.log(model.value.idEstado);

      if (label.value != "Eliminar") {
        buttonDisabled.value = myAction.disabled;
      }
      isDisabled.value = myAction.disabled;
    }
    const action = () => {
      let data = {};
      model.value.idEstado = idEstado.value;

      console.log(data.idEstado);

      Object.assign(data, model.value);
      const { confirm } = crud();

      //   action(data, myAction, unidades);

      console.log(data);

      $q.notify(confirm(data, myAction, averias));
    };

    return {
      model,
      search,
      action,
      myForm,
      isDisabled,
      buttonDisabled,
      required,
      cedula,
      label,
      unidades,
      idEstado,
      choferes,
      av,
    };
  },
};
</script>
<style>
.contenido {
  padding: 1% 1px 12px 25px;
  width: 200px;
}
</style>
