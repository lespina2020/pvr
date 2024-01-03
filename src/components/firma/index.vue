<template>
  <p>Firma:</p>
  <vue-drawing-canvas
    ref="VueCanvasDrawing"
    v-model:image="image"
    :width="200"
    :height="150"
    :stroke-type="strokeType"
    :line-cap="lineCap"
    :line-join="lineJoin"
    :fill-shape="fillShape"
    :eraser="eraser"
    :lineWidth="line"
    :color="color"
    :background-color="backgroundColor"
    :background-image="backgroundImage"
    :watermark="watermark"
    :initial-image="initialImage"
    saveAs="png"
    :styles="{
      border: 'solid 1px #000',
    }"
    :lock="disabled"
    @mousemove="getCoordinate($event)"
    :additional-images="additionalImages"
  />

  <q-card-actions vertical align="left">
    <q-btn
      size="sm"
      @click="guardar()"
      color="blue"
      type="button"
      label="Seleccione Firma"
    />
    <q-btn
      size="sm"
      @click.prevent="$refs.VueCanvasDrawing.reset()"
      color="blue"
      type="button"
      label="Limpiar"
    />
  </q-card-actions>
</template>
<script>
import VueDrawingCanvas from "vue-drawing-canvas";
import { ref } from "vue";
import { useStore } from "vuex";
import { fmBlanco } from "../firma/firmaBlanco.js";
import { useQuasar } from "quasar";

export default {
  name: "ServeDev",
  components: {
    VueDrawingCanvas,
  },

  setup() {
    let x = 0,
      val = "",
      valor = "",
      y = 0;
    const image = ref(""),
      $q = useQuasar(),
      eraser = false,
      disabled = false,
      store = useStore(),
      fillShape = false,
      line = 1,
      initialImage = [
        {
          type: "dash",
          from: {
            x: 262,
            y: 154,
          },
          coordinates: [],
          color: "#000000",
          width: 1,
          fill: false,
        },
      ],
      VueCanvasDrawing = ref(null);

    const getCoordinate = (event) => {
      let coordinates = VueCanvasDrawing.value.getCoordinates(event);
      x = coordinates.x;
      y = coordinates.y;
    };
    const guardar = () => {
      if (image.value != fmBlanco) {
        val = "firmaImg";
        valor = image.value;

        store.dispatch("varMutuacion", { val, valor });
      } else {
        val = "firmaImg";
        valor = null;
        console.log(image.value);

        store.dispatch("varMutuacion", { val, valor });
        $q.notify({
          type: "negative",
          message: "La seleccion de Firma No puede Estar Vacio",
        });
      }
    };

    return {
      image,
      VueCanvasDrawing,
      initialImage,
      x,
      y,
      guardar,
      getCoordinate,
      eraser,
      disabled,
      fillShape,
      line,
      color: "#000000",
      strokeType: "dash",
      lineCap: "square",
      lineJoin: "miter",
      backgroundColor: "#FFFFFF",
      backgroundImage: null,
      watermark: null,
      additionalImages: [],
    };
  },
};
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
}
.button-container {
  display: flex;
  flex-direction: row;
}
</style>
