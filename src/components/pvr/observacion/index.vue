<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-model="model"
      @update:model-value="save('isObservacion')"
      :definitions="{
        bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
      }"
    />
  </div>
</template>
<script>
import { ref } from "vue";

import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore(),
      disabled = ref(false),
      model = ref("");

    if (store.getters.isAction.data) {
      model.value = store.getters.isGetter("isObservacion");
      disabled.value = true;
    }

    const save = (isVar) => {
      //  let obj = {};

      console.log(isVar);

      console.log(model.value);

      //let radio = id;

      //obj[radio] = model.value;

      // obj = { ...model.value };

      // obj.id = radio;

      // console.log(obj);

      let variable = { val: isVar, valor: model.value };

      store.dispatch("varMutuacion", variable);
    };

    return {
      model,
      save,
      disabled,
    };
  },
};
</script>
