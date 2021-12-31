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
  data: () => ({
    posts: [],
  }),
  async fetch() {
    // const { $service, error, params } = this.$nuxt.context;
    console.log(this.orders);
  },
  computed: {
    ...mapGetters("order", ["orders"]),
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
