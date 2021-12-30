<template>
  <Page :title="title">
    <template #content v-if="filtered.length">
      <gv-row>
        <gv-col v-for="item in filtered" :key="item.id" xs="6" sm="4" md="2">
          <ProductBook :item="item" @onadd="onAdd" @onremove="onRemove" />
        </gv-col>
      </gv-row>
      <br />
      <gv-row>
        <gv-col>
          <gv-pagination
            v-model="page"
            :max="7"
            :total="total"
            center
            :key="componentKey"
          />
        </gv-col>
      </gv-row>
    </template>
    <template #content v-else>
      <NoRecord />
    </template>
    <template #footer>
      <!-- <gv-off-canvas ref="disclaimer" active locked required>
        <template #content>
          <gv-flexbox align="center">
            <gv-gap>
              <div>
                <h6>
                  <b>{{ $t("footer.disclaimer.title") }}</b>
                </h6>
                <p>{{ $t("footer.disclaimer.message") }}</p>
              </div>
              <gv-button primary @onclick="onDismiss">
                {{ $t("action.agreed") }}
              </gv-button>
            </gv-gap>
          </gv-flexbox>
        </template>
      </gv-off-canvas> -->
      <gv-snackbar ref="snackbar" :message="snackbarMessage" left />
    </template>
  </Page>
</template>

<script>
import { config, helpers } from "@/utils";
import { NoRecord, Page } from "@/components";
import { ProductBook } from "@/components/interface";

import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    NoRecord,
    Page,
    ProductBook,
  },
  async fetch({ $service, error }) {
    try {
      // await $service.book.all();
      // await $service.book.reset();
    } catch (err) {
      error({
        statusCode: 503,
        message: "Unable to fetch books",
      });
    }
  },
  computed: {
    ...mapGetters("basket", ["basket"]),
    ...mapGetters("book", ["book", "books"]),
    snackbar() {
      return this.$refs.snackbar;
    },
    disclaimer() {
      return this.$refs.disclaimer;
    },
    filtered() {
      return this.$service.book.filtered({}, this.page, config.pagination);
    },
    total() {
      if (this.books.length > 0) {
        this.componentKey++;
        return Math.ceil(this.books.length / config.pagination);
      }
    },
  },
  methods: {
    onAdd: function (name, count) {
      this.snackbarMessage = helpers.format(
        this.$t("message.feedback.item_added"),
        name,
        count
      );
      this.snackbar.show();
    },
    onRemove: function (name) {
      this.snackbarMessage = helpers.format(
        this.$t("message.feedback.item_removed"),
        name
      );
      this.snackbar.show();
    },
    onDismiss: function () {
      this.disclaimer.close();
    },
  },
  data() {
    return {
      page: 1,
      componentKey: 0,
      snackbarMessage: "",
      title: this.$t("page.book.title"),
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
