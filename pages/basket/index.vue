<template>
  <Page :title="title">
    <template #content v-if="items.length">
      <gv-row>
        <gv-col md="8">
          <gv-card>
            <template #content>
              <ProductBasket
                v-for="item in items"
                :key="item.id"
                :item="item"
                @onremove="onRemove"
              />
            </template>
          </gv-card>
        </gv-col>
        <gv-col md="4">
          <gv-card>
            <template #content>
              <gv-tile>
                <template #content>
                  <gv-tile-header>{{ $tc("label.summary") }}</gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.check_detail") }}
                  </gv-tile-header>
                </template>
              </gv-tile>
              <gv-tile>
                <template #content>
                  <gv-tile-header>
                    {{ $tc("label.item", sum) }}
                  </gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.item_count") }}
                  </gv-tile-header>
                </template>
                <template #trailing> {{ sum }}x </template>
              </gv-tile>
              <gv-tile>
                <template #content>
                  <gv-tile-header>{{ $tc("label.subtotal") }}</gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.before_discount") }}
                  </gv-tile-header>
                </template>
                <template #trailing>
                  <small class="ws-nowrap">
                    {{ currency }} {{ subtotal | money }}
                  </small>
                </template>
              </gv-tile>
              <gv-tile>
                <template #content>
                  <gv-tile-header>{{ $tc("label.total") }}</gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.before_tax") }}
                  </gv-tile-header>
                </template>
                <template #trailing>
                  <small class="ws-nowrap">
                    {{ currency }} {{ total | money }}
                  </small>
                </template>
              </gv-tile>
              <gv-divider />
            </template>
            <template #footer>
              <gv-button primary fit :href="$resolve.checkout()">
                {{ $t("action.checkout") }}
              </gv-button>
            </template>
          </gv-card>
        </gv-col>
      </gv-row>
    </template>
    <template #content v-else>
      <NoRecord :message="$t('message.feedback.empty_basket')">
        <template #icon>
          <gv-icon value="basket-outline" />
        </template>
      </NoRecord>
    </template>
    <template #footer>
      <SnackbarUndo ref="recover" :message="recoverMessage" :on-undo="onUndo" />
    </template>
  </Page>
</template>

<script>
import { helpers } from "@/utils";
import { ProductBasket, ProductCount } from "@/components/interface";
import { SnackbarUndo } from "@/components/helper";
import { NoRecord, Page } from "@/components";

import { mapGetters } from "vuex";
export default {
  components: {
    NoRecord,
    ProductCount,
    ProductBasket,
    SnackbarUndo,
    Page,
  },
  async fetch() {
    const { $service, error } = this.$nuxt.context;
    try {
      await $service.basket.validate();
    } catch (err) {
      error({
        statusCode: 503,
        message: "Unable to validate",
      });
    }
  },
  computed: {
    ...mapGetters("basket", ["sum"]),
    recover() {
      return this.$refs.recover.reference();
    },
    items() {
      return this.$service.basket.list();
    },
    tax() {
      return this.$service.basket.tax();
    },
    currency() {
      return this.$t("locale.currency");
    },
    subtotal() {
      return this.$service.basket.subtotal();
    },
    total() {
      return this.$service.basket.total();
    },
    taxed() {
      return this.$service.basket.taxed();
    },
  },
  methods: {
    onRemove: function (name) {
      console.log(name);
      this.recoverMessage = helpers.format(
        this.$t("message.feedback.item_removed"),
        name
      );
      this.recover.show();
    },
    onUndo: async function () {
      await this.$service.basket.recover();
    },
  },
  data() {
    return {
      recoverMessage: "",
      title: this.$t("page.basket.title"),
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
