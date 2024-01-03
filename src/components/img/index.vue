<template>
  <q-img
    :src="`${url}${img}`"
    spinner-color="white"
    style="height: 140px; max-width: 150px"
  />
</template>

<script>
export default {
  props: ["url", "img"],
};
</script>
