<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-card-section class="bg-green text-white">
        <q-btn color="green" :icon="'arrow_back'" size="sm" to="/verificadores">
          <q-tooltip> Atras</q-tooltip></q-btn
        >Verificadores
      </q-card-section>
      <q-form ref="myForm" @submit.prevent="action">
        <q-card-actions>
          <div class="row">
            <div class="contenido">
              <q-input
                type="text"
                label="Nombre y Apellido"
                :disable="isDisabled"
                v-model="model.nombreApellido"
                lazy-rules
                :rules="[required]"
              >
                <!---       @update:model-value="verificar(requeridLetter(model.nombreCurso))"
                required-->
                <template v-slot:prepend>
                  <q-icon name="card_membership" color="blue" />
                </template>
              </q-input>
            </div>

            <div class="contenido">
              <q-input
                type="number"
                label="Cedula"
                :disable="isDisabled"
                v-model="model.cedula"
                lazy-rules
                :rules="[
                  (val) => search(val, '/api/verificadoresCedula/', cedula),
                  required,
                ]"
              >
                <!---       @update:model-value="verificar(requeridLetter(model.nombreCurso))"
                required-->
                <template v-slot:prepend>
                  <q-icon name="person_add" color="blue" />
                </template>
              </q-input>
            </div>
            <div class="contenido">
              <q-input
                type="text"
                label="Telefono"
                :disable="isDisabled"
                v-model="model.telefono"
              >
                <!---       @update:model-value="verificar(requeridLetter(model.nombreCurso))"
                required-->
                <template v-slot:prepend>
                  <q-icon name="phone" color="blue" />
                </template>
              </q-input>
            </div>
            <div class="contenido"></div>
          </div>
        </q-card-actions>
        <q-separator />
        <Img v-if="editFirma === true" :url="urlServidor" :img="model.firma" />

        <Firma />
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
import { search, modelos, categorias } from "../../helper/list";
//import { unidades } from "../../helper/variables";
import { required /*, contarObjeto*/ } from "../../helper/validation";
import Firma from "../../components/firma/index.vue";
import Img from "../../components/img/index.vue";
import crud from "../../composables/index";
import { verificadores } from "../../helper/vars";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import axios from "axios";
export default {
  components: {
    //  TablaCondicion,

    Firma,
    Img,
  },
  setup() {
    const model = ref([]);
    const store = useStore();
    const myForm = ref(null);
    const myAction = {};
    const isDisabled = ref(false),
      buttonDisabled = ref(false),
      editFirma = ref(false),
      urlServidor = axios.defaults.baseURL,
      $q = useQuasar(),
      // store = useStore(),
      label = ref("Guardar"),
      cedula = ref("");

    /****VARIABLE FIJA PARA EL BUSCADOR SEARCH* */

    // let idUsuario = store.getters.isGetter("isToken").email;

    /****VARIABLE FIJA PARA EL BUSCADOR SEARCH* */

    if (store.getters.isGetter("isAction").data) {
      Object.assign(myAction, store.getters.isGetter("isAction"));
      model.value = myAction.data;
      label.value = myAction.label;
      cedula.value = myAction.data.cedula;

      if (label.value != "Eliminar") {
        buttonDisabled.value = myAction.disabled;
      }
      isDisabled.value = myAction.disabled;
      editFirma.value = true;
      let val = "firmaImg",
        valor = false;

      store.dispatch("varMutuacion", { val, valor });
    }
    const action = () => {
      console.log(store.getters.isAction);

      let data = {};
      Object.assign(data, model.value);

      if (store.getters.isGetter("firmaImg") != null) {
        data.firmaImg = store.getters.isGetter("firmaImg");
        data.firma = `${model.value.cedula}.png`;
        Object.assign(data, model.value);
        const { confirm } = crud();

        //   action(data, myAction, unidades);

        $q.notify(confirm(data, myAction, verificadores));
      } else {
        $q.notify({
          type: "negative",
          message: "La seleccion de Firma No puede Estar Vacio",
        });
      }

      //   action(data, myAction, unidades);

      //
    };

    return {
      categorias,
      modelos,
      model,
      search,
      action,
      myForm,
      isDisabled,
      buttonDisabled,
      required,
      cedula,
      urlServidor,
      editFirma,
      label,
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
