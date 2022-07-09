<template>
  <Page :title="title">
    <template #header>
      <gv-breadcrumb :title="title">
        <gv-breadcrumb-item
          :label="$t('page.home.title')"
          :href="$resolve.home()"
        />
      </gv-breadcrumb>
    </template>
    <template #action>
      <gv-button :href="$resolve.author()" primary>
        {{ $t("action.create") }} <gv-icon value="plus" />
      </gv-button>
    </template>
    <template #filter>
      <form @submit.prevent="onFilter">
        <gv-row>
          <gv-col>
            <gv-input
              v-model="form.term"
              name="term"
              :label="$t('label.filter')"
              :placeholder="$t('page.authors.filter')"
            >
              <template #trailing>
                <gv-button v-if="hasFilter" info sm @onclick="resetFilter">
                  {{ $t("action.clear") }} <gv-icon value="close" />
                </gv-button>
                <gv-button submit primary sm>
                  {{ $t("action.search") }} <gv-icon value="magnify" />
                </gv-button>
              </template>
            </gv-input>
          </gv-col>
        </gv-row>
      </form>
    </template>
    <template #content v-if="filtered.count > 0">
      <gv-table>
        <template #head>
          <gv-th v-for="item in columns" :key="item._id" v-bind="item" />
        </template>
        <template #body>
          <gv-tr v-for="item in filtered.list" :key="item._id">
            <gv-td>{{ item.name }}</gv-td>
            <gv-td fit>
              <gv-button-group sm>
                <gv-button :href="$resolve.author(item._id)" info>
                  {{ $t("action.update") }}
                </gv-button>
                <gv-button error @onclick="openConfirmation(item._id)">
                  {{ $t("action.delete") }}
                </gv-button>
              </gv-button-group>
            </gv-td>
          </gv-tr>
        </template>
      </gv-table>
      <br />
      <gv-pagination v-model="page" :total="total" center />
      <br />
    </template>
    <template #content v-else>
      <NoRecord many />
    </template>
    <template #footer>
      <DialogDelete ref="confirmation" :on-confirm="onConfirm" />
      <SnackbarUndo
        ref="restore"
        :message="author.name"
        :on-hide="onHide"
        :on-undo="onUndo"
      />
    </template>
  </Page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { config, helpers } from "@/utils";
import { NoRecord, Page } from "@/components";
import { DialogDelete, SnackbarUndo } from "@/components/helper";

export default {
  components: {
    NoRecord,
    Page,
    DialogDelete,
    SnackbarUndo,
  },
  middleware: ["admin"],
  data() {
    return {
      page: 1,
      form: {
        term: null,
      },
      filter: {},
      title: this.$t("page.authors.title"),
      columns: [{ label: this.$t("label.name") }, { fit: true }],
    };
  },
  async fetch() {
    const { $service, error } = this.$nuxt.context;
    try {
      await $service.author.all();
    } catch (err) {
      error({
        statusCode: 503,
        message: "Unable to fetch",
      });
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
  computed: {
    ...mapState("author", ["author"]),
    ...mapGetters("author", ["authors"]),
    confirmation() {
      return this.$refs.confirmation.reference;
    },
    restore() {
      return this.$refs.restore.reference;
    },
    filtered() {
      return this.$service.author.filtered(
        this.filter,
        this.page,
        config.pagination
      );
    },
    total() {
      return this.filtered.count > 0
        ? Math.ceil(this.filtered.count / config.pagination)
        : 1;
    },
    hasFilter() {
      return Object.keys(this.filter).length > 0;
    },
  },
  methods: {
    resetFilter() {
      this.filter = {};
      this.form.term = null;
    },
    onFilter(event) {
      this.page = 1;
      this.filter = helpers.toDictionary(event.target);
    },
    async openConfirmation(id) {
      this.restore.hide();
      await this.$service.author.find(id);
      this.confirmation.open();
    },
    async onConfirm() {
      await this.$service.author.delete();
      this.restore.show();
    },
    async onUndo() {
      await this.$service.author.restore();
    },
    async onHide() {
      await this.$service.author.clear();
    },
  },
};
</script>
