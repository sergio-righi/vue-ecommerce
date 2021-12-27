<template>
  <div id="main">
    <Navbar />
    <gv-container id="container">
      <gv-row id="content">
        <Nuxt />
      </gv-row>
    </gv-container>
  </div>
</template>

<script>
import { Navbar } from "@/components";
export default {
  components: {
    Navbar,
  },
  // beforeMount() {
  //   document.documentElement.setAttribute("theme", "dark");
  // },
};
</script>

<!--<style scoped lang="scss">
@import "scss/layouts/default.scss";
</style>-->
