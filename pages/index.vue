<template>
  <Page :title="title">
    <template #content v-if="$fetchState.pending">
      <PageLoading />
    </template>
    <template #content v-else-if="filtered.count">
      <gv-row>
        <gv-col
          v-for="item in filtered.list"
          :key="item.id"
          xs="6"
          sm="3"
          lg="2"
        >
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
      <NoRecord>
        <template #control>
          <gv-flexbox v-if="filter.term" justify="center">
            <gv-button @onclick="resetFilter" info sm>
              {{ $t("action.reset_filter") }}
            </gv-button>
          </gv-flexbox>
        </template>
      </NoRecord>
    </template>
    <template #action v-if="filtered.count">
      <form @submit.prevent="onFilter">
        <gv-input
          name="term"
          :label="$t('placeholder.search_by_name')"
          v-model="form.term"
        >
          <template #trailing>
            <gv-button sm primary submit>
              <gv-icon value="magnify" />
            </gv-button>
          </template>
        </gv-input>
      </form>
    </template>
    <template #footer>
      <gv-snackbar ref="snackbar" :message="snackbarMessage" left />
    </template>
  </Page>
</template>

<script>
import { config, helpers } from "@/utils";
import { NoRecord, Page } from "@/components";
import { PageLoading } from "@/components/helper";
import { ProductBook } from "@/components/interface";

import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    NoRecord,
    Page,
    PageLoading,
    ProductBook,
  },
  async fetch() {
    const { $service, error } = this.$nuxt.context;
    try {
      await $service.book.all();
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
    filtered() {
      return this.$service.book.filtered(
        this.filter,
        this.page,
        config.pagination
      );
    },
    total() {
      this.componentKey++;
      return this.filtered.count > 0
        ? Math.ceil(this.filtered.count / config.pagination)
        : 1;
    },
  },
  methods: {
    resetFilter: function (event) {
      this.filter = {};
      this.form.term = null;
    },
    onFilter: function (event) {
      this.page = 1;
      this.filter = helpers.toDictionary(event.target);
    },
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
  },
  data() {
    return {
      page: 1,
      form: {
        term: null,
      },
      filter: {},
      componentKey: 0,
      snackbarMessage: "",
      title: this.$t("page.books.title"),
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
