<template>
  <Page :title="title">
    <template #content v-if="orders.length">
      <gv-row>
        <gv-col>
          <gv-card>
            <gv-tile v-for="item in orders" :key="item.id">
              <template #content>
                <gv-tile-header>{{ item.id }}</gv-tile-header>
              </template>
            </gv-tile>
          </gv-card>
        </gv-col>
      </gv-row>
    </template>
    <template v-else #content>
      <NoRecord :message="$t('message.feedback.no_record')">
        <template #icon>
          <gv-icon value="truck-fast-outline" />
        </template>
      </NoRecord>
    </template>
  </Page>
</template>

<script>
import { NoRecord, Page } from "@/components";

import { mapGetters } from "vuex";
export default {
  components: {
    NoRecord,
    Page,
  },
  middleware: ["authorization"],
  data: () => ({
    orders: [],
  }),
  async fetch() {
    const { $service, error } = this.$nuxt.context;
    try {
      this.orders = await $service.order.all();
    } catch (err) {
      error({
        statusCode: 503,
        message: "Unable to find orders",
      });
    }
  },
  data() {
    return {
      title: this.$t("page.order.title"),
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
