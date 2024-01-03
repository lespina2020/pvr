<template>
  <div class="q-gutter-md row items-start">
    <q-input
      v-model="model.correlativo"
      type="number"
      label="Numero de Planilla"
      style="width: 150px"
      @update:model-value="showChannel"
    />
  </div>
</template>
<script>
//import { loadList } from "../../../helper/list";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { required /*, contarObjeto*/ } from "../../../helper/validation";
export default {
  setup() {
    /*  () => {
          done1 = true;
          step = 2;
        }*/
    const store = useStore(),
      model = ref([]);

    //model.value.correlativo = Date.now();

    store.dispatch("varMutuacion", {
      val: "correlativo",
      valor: model.value.correlativo,
    });

    watchEffect(() => {
      //    let variable = { val: "isUnidad", valor: model.value };
      //store.dispatch("varMutuacion", variable);

      if (store.getters.isAction.data) {
        // console.log(store.getters.isAction.data.correlativo);

        model.value.correlativo = store.getters.isAction.data.correlativo;

        store.dispatch("varMutuacion", {
          val: "correlativo",
          valor: store.getters.isAction.data.correlativo,
        });
      }
    });

    const showChannel = async (v) => {
      // let row = { val: "isCorrelativo", valor: model.value };

      store.dispatch("varMutuacion", {
        val: "correlativo",
        valor: model.value.correlativo,
      });
    };

    return {
      model,
      required,
      showChannel,
    };
  },
};
</script>
