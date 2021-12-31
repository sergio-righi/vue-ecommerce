<template>
  <Page :title="title">
    <template #content v-if="$fetchState.pending">
      <PageLoading />
    </template>
    <template v-else-if="orders.length" #content>
      <gv-row>
        <gv-col>
          <gv-collapse arrow>
            <gv-collapse-item v-for="order in orders" :key="order.id">
              <template #title>#{{ order.id }}</template>
              <template #subtitle>{{ order.placementDate | utc }}</template>
              <template #content>
                <gv-tile v-for="book in order.books" :key="book.id">
                  <template #trailing>
                    <gv-image :src="$resolve.image.cover(book.id)" />
                  </template>
                  <template #content>
                    <gv-tile-header>
                      {{ book.name }}
                    </gv-tile-header>
                    <gv-tile-header sub>
                      {{ book | basket($i18n) }}
                    </gv-tile-header>
                  </template>
                </gv-tile>
              </template>
              <template #trailing>
                <gv-chip :label="$t($enum.mapper.status[order.status])" />
              </template>
            </gv-collapse-item>
          </gv-collapse>
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
import { PageLoading } from "@/components/helper";

import { mapGetters } from "vuex";
export default {
  components: {
    NoRecord,
    Page,
    PageLoading,
  },
  // middleware: ["authorization"],
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

<style scoped>
.gv-tile .gv-trailing {
  height: 55px;
}
.gv-tile .gv-trailing .gv-image {
  height: 100%;
}
</style>
