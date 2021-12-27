<template>
  <Page :title="title">
    <template #content v-if="items.length">
      <gv-row>
        <gv-col md="8">
          <gv-card>
            <template #content>
              <gv-tile v-for="item in items" :key="item.id">
                <template #leading>
                  <gv-button sm @onclick="removeItem(item.book)">
                    <gv-icon class="c-pointer" value="basket-remove" />
                  </gv-button>
                </template>
                <template #content>
                  <gv-tile-header> {{ item.book.name }} </gv-tile-header>
                  <gv-tile-header sub>
                    {{ item | basket($i18n) }}
                  </gv-tile-header>
                </template>
                <template #trailing>
                  <ProductCount
                    :max="item.book.inStock"
                    :value="item.count"
                    @oninput="setCount(item.book, ...arguments)"
                  />
                </template>
              </gv-tile>
            </template>
          </gv-card>
        </gv-col>
        <gv-col md="4">
          <gv-card>
            <template #content>
              <gv-tile>
                <template #content>
                  <gv-tile-header>{{ $tc("label.resume") }}</gv-tile-header>
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
              <gv-tile>
                <template #content>
                  <gv-tile-header>
                    {{ $t("label.total") }} + {{ $t("label.tax") }} ({{ tax }})
                  </gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.sum_total") }}
                  </gv-tile-header>
                </template>
                <template #trailing>
                  <b class="ws-nowrap"> {{ currency }} {{ taxed | money }} </b>
                </template>
              </gv-tile>
              <gv-divider />
            </template>
            <template #footer>
              <gv-button primary fit>{{ $t("action.checkout") }}</gv-button>
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
      <gv-snackbar
        ref="snackbar"
        :timeout="0"
        :message="snackbarMessage"
        left
        :action="$t('action.undo')"
        @onclick="onUndo"
      />
    </template>
  </Page>
</template>

<script>
import { calculation, helpers } from "@/utils";
import { ProductCount } from "@/components/interface";
import { NoRecord, Page } from "@/components";

import { mapGetters, mapState } from "vuex";
export default {
  name: "home",
  components: {
    NoRecord,
    ProductCount,
    Page,
  },
  computed: {
    ...mapGetters("book", ["books"]),
    ...mapGetters("basket", ["sum", "basket"]),
    snackbar() {
      return this.$refs.snackbar;
    },
    items() {
      return this.basket.map((item) => {
        return { ...item, book: this.books.find((x) => x.id === item.bookId) };
      });
    },
    tax() {
      return `${calculation.HST * 100}%`;
    },
    currency() {
      return this.$t("locale.currency");
    },
    subtotal() {
      return this.items.reduce(
        (a, b) =>
          a + calculation.regularPrice(b.book.price, this.$i18n, b.count),
        0
      );
    },
    total() {
      return this.items.reduce(
        (a, b) =>
          a +
          calculation.reducedPrice(
            calculation.regularPrice(b.book.price, this.$i18n, b.count),
            b.book.discount
          ),
        0
      );
    },
    taxed() {
      return calculation.applyTax(this.total);
    },
  },
  methods: {
    onUndo: async function () {
      await this.$service.basket.recover();
    },
    removeItem: async function (book) {
      await this.$service.basket.delete(book.id);
      this.snackbarMessage = helpers.format(
        this.$t("message.feedback.item_removed"),
        book.name
      );
      this.snackbar.show();
    },
    setCount: async function (book, count) {
      await this.$service.book.set(book.id, { count: count });
      await this.$service.basket.set(book.id, count);
    },
  },
  data() {
    return {
      snackbarMessage: "",
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
