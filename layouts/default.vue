<template>
  <div id="main">
    <div id="content">
      <Navbar />
      <gv-container>
        <gv-row>
          <Nuxt />
        </gv-row>
      </gv-container>
    </div>
    <div id="footer">
      <div class="content">
        <gv-container>
          <gv-flexbox align="center" justify="space-between" flex>
            <gv-flexbox align="center" inline>
              {{ $t("footer.powered_by") }}
              <gv-link href="http://gratervue.sergiorighi.com/" target="_blank" muted>
                GraterVue
              </gv-link>
            </gv-flexbox>
            <gv-flexbox align="center" inline>
              {{ $t("footer.available_at") }}
              <gv-link
                href="https://github.com/sergio-righi/vue-ecommerce"
                target="_blank"
              >
                <gv-icon value="github" size="1.5em" />
              </gv-link>
            </gv-flexbox>
          </gv-flexbox>
        </gv-container>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar } from "@/components";
export default {
  components: {
    Navbar,
  },
};
</script>