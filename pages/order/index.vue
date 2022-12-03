<template>
  <Page :title="title">
    <template #content v-if="$fetchState.pending">
      <PageLoading />
    </template>
    <template v-else-if="orders.length" #content>
      <gv-row>
        <gv-col>
          <gv-card>
            <template #content>
              <gv-tile v-for="order in orders" :key="order.id">
                <template #leading>
                  <gv-avatar sm bg="gray">
                    {{ order.books.reduce((a, b) => a + b.count, 0) }}x
                  </gv-avatar>
                </template>
                <template #content>
                  <gv-tile-header>
                    #{{ generateOrderId(order._id) }}
                  </gv-tile-header>
                  <gv-tile-header sub>
                    {{ order.placementDate | timestamp }}
                  </gv-tile-header>
                </template>
                <template #trailing>
                  <gv-chip sm>
                    <template #content>
                      {{ $t(`${$enum.mapper.status[order.status]}`) }}
                    </template>
                  </gv-chip>
                </template>
                <template #expandable>
                  <gv-divider />
                  <gv-tile v-for="book in order.books" :key="book.bookId._id">
                    <template #content>
                      <gv-tile-header>
                        {{ book.bookId.name }}
                      </gv-tile-header>
                      <gv-tile-header sub>
                        {{ book | basket($i18n) }}
                      </gv-tile-header>
                    </template>
                    <template #trailing>
                      <gv-image
                        width="40"
                        :src="$resolve.image.cover(book.bookId._id)"
                      />
                    </template>
                  </gv-tile>
                </template>
              </gv-tile>
            </template>
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
import { PageLoading } from "@/components/helper";
export default {
  components: {
    NoRecord,
    Page,
    PageLoading,
  },
  data: () => ({
    orders: [],
  }),
  async fetch() {
    const { $service, error } = this.$nuxt.context;
    try {
      const { _id } = $service.session.user();
      this.orders = await $service.order.allWithBooks(_id);
    } catch (err) {
      error({
        statusCode: 503,
        message: "Unable to find orders",
      });
    }
  },
  data() {
    return {
      title: this.$t("page.orders.title"),
    };
  },
  methods: {
    generateOrderId: function (id) {
      return id.replace(/\D/g, "");
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
