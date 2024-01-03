<template>
  <q-menu>
    <div class="row no-wrap q-pa-md">
      <q-separator vertical inset class="q-mx-lg" />

      <div class="column items-center">
        <q-avatar size="72px">
          <img src="user.png" />
        </q-avatar>

        <div class="text-subtitle1 q-mt-md q-mb-xs">
          {{ accessToken.email }}
        </div>

        <q-btn
          color="green"
          @click="cerrar"
          label="Salir"
          push
          size="sm"
          v-close-popup
        />
      </div>
    </div>
  </q-menu>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const accessToken = store.getters.isGetter("isToken");

    const cerrar = () => {
      localStorage.clear();
      router.push("/login");
    };

    return {
      mobileData: ref(true),
      bluetooth: ref(false),
      accessToken,
      cerrar,
    };
  },
};
</script>
