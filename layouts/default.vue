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
    <div id="control">
      <gv-fab sm>
        <template #content>
          <gv-fab-item @onclick="onOpen">
            <gv-avatar bg="amber" color="black">
              <gv-icon
                value="alert-outline"
                v-tooltip="$t('disclaimer.title')"
              />
            </gv-avatar>
          </gv-fab-item>
        </template>
        <template #control>
          <gv-icon
            value="reload"
            v-tooltip="$t('tooltip.reset')"
            @onclick="onReset"
          />
        </template>
      </gv-fab>
      <gv-dialog ref="disclaimer">
        <gv-dialog-item required>
          <template #header>
            {{ $t("disclaimer.title") }}
          </template>
          <template #content>
            {{ $t("disclaimer.message") }}
          </template>
          <template #footer>
            <gv-button primary @onclick="onClose">
              {{ $t("action.agreed") }}
            </gv-button>
          </template>
        </gv-dialog-item>
      </gv-dialog>
    </div>
    <div id="footer">
      <div class="content">
        <gv-container>
          <gv-flexbox align="center" justify="space-between" flex>
            <gv-flexbox align="center" inline>
              {{ $t("footer.powered_by") }}
              <gv-link
                href="http://gratervue.sergiorighi.com/"
                target="_blank"
                muted
              >
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
  computed: {
    disclaimer() {
      return this.$refs.disclaimer;
    },
  },
  methods: {
    onOpen: function () {
      this.disclaimer.open();
    },
    onClose: function () {
      this.disclaimer.close();
    },
    onReset: async function () {
      this.$router.push(this.$resolve.home());
      await this.$service.book.reset();
      await this.$service.order.reset();
      await this.$service.basket.reset();
      setTimeout(async () => {
        await this.$service.book.all();
      }, 300);
    },
  },
};
</script>
