<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-card-section class="bg-green text-white">
        <q-btn color="green" :icon="'arrow_back'" size="sm" to="/usuarios">
          <q-tooltip> Atras</q-tooltip></q-btn
        >Usuarios
      </q-card-section>
      <q-form ref="myForm" @submit.prevent="action">
        <q-card-actions>
          <div class="row">
            <div class="contenido">
              <q-input
                type="text"
                label="Nombre "
                :disable="isDisabled"
                v-model="model.firstname"
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
                type="text"
                label="Apellido "
                :disable="isDisabled"
                v-model="model.lastname"
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
                  (val) => search(val, '/api/usersCedula/', cedula),
                  required,
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="person_add" color="blue" />
                </template>
              </q-input>
            </div>

            <div class="contenido">
              <q-input
                type="text"
                label="Login"
                :disable="isDisabled"
                v-model="model.email"
                lazy-rules
                :rules="[
                  (val) => search(val, '/api/usersUser/', user),
                  required,
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="person_add" color="blue" />
                </template>
              </q-input>
            </div>
            <div class="contenido">
              <q-input
                type="password"
                label="Password"
                :disable="isDisabled"
                v-model="model.password"
                lazy-rules
                :rules="[required]"
              >
                <template v-slot:prepend>
                  <q-icon name="person_add" color="blue" />
                </template>
              </q-input>
            </div>
            <div class="contenido">
              <q-input
                label="Verificar Password"
                v-model="model.password"
                :type="isPwd ? 'password' : 'text'"
                hint="Ver Password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>

            <div class="contenido">
              <q-select
                v-model="model.tipoUsuario"
                :options="tipoUsuario"
                option-value="tipoUsuario"
                option-label="tipoUsuario"
                :disable="isDisabled"
                emit-value
                map-options
                label="Tipo de Usuario"
              />
            </div>
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
import { search, tipoUsuario } from "../../helper/list";
//import { unidades } from "../../helper/variables";
import { required /*, contarObjeto*/ } from "../../helper/validation";
import crud from "../../composables/index";
import Firma from "../../components/firma/index.vue";
import Img from "../../components/img/index.vue";
import { usuarios } from "../../helper/vars";
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
      urlServidor = axios.defaults.baseURL,
      buttonDisabled = ref(false),
      $q = useQuasar(),
      editFirma = ref(false),
      // store = useStore(),
      label = ref("Guardar"),
      cedula = ref(""),
      user = ref("");

    /****VARIABLE FIJA PARA EL BUSCADOR SEARCH* */

    if (store.getters.isAction.data) {
      Object.assign(myAction, store.getters.isAction);

      console.table(store.getters.isAction);

      model.value = myAction.data;

      model.value.password = "";
      label.value = myAction.label;
      cedula.value = myAction.data.cedula;
      user.value = myAction.data.email;

      if (label.value != "Eliminar") {
        buttonDisabled.value = myAction.disabled;
      }
      editFirma.value = true;
      let val = "firmaImg",
        valor = false;

      store.dispatch("varMutuacion", { val, valor });
      isDisabled.value = myAction.disabled;
    }
    const action = () => {
      let data = {};
      Object.assign(data, model.value, { idUsuario: "root" });
      //const { confirm } = crud();

      if (store.getters.isGetter("firmaImg") != null) {
        data.firmaImg = store.getters.isGetter("firmaImg");
        data.firma = `${model.value.cedula}.png`;
        Object.assign(data, model.value);
        const { confirm } = crud();

        //   action(data, myAction, unidades);

        $q.notify(confirm(data, myAction, usuarios));
      } else {
        $q.notify({
          type: "negative",
          message: "La seleccion de Firma No puede Estar Vacio",
        });
      }

      //   action(data, myAction, unidades);

      //$q.notify(confirm(data, myAction, usuarios));
    };

    return {
      model,
      search,
      action,
      tipoUsuario,
      myForm,
      isPwd: ref(true),
      isDisabled,
      buttonDisabled,
      required,
      cedula,
      user,
      label,
      editFirma,
      urlServidor,
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
