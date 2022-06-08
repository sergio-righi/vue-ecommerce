<template>
  <Page :title="title">
    <template #header>
      <gv-breadcrumb :title="title">
        <gv-breadcrumb-item
          :label="$t('page.home.title')"
          :href="$resolve.home()"
        />
        <gv-breadcrumb-item
          :label="$t('page.authors.title')"
          :href="$resolve.authors()"
        />
      </gv-breadcrumb>
    </template>
    <template v-if="isUpdate" #action>
      <gv-button :href="$resolve.authors()" primary>
        {{ $t("action.create") }} <gv-icon value="plus" />
      </gv-button>
    </template>
    <template #content>
      <Feedback />
      <PageLoading v-if="$fetchState.pending" />
      <PageForm v-else :is-update="isUpdate" @onsubmit="onSubmit">
        <gv-row>
          <gv-col>
            <gv-input
              v-model="name"
              v-validation.required
              :label="$t('label.name')"
            />
          </gv-col>
          <gv-col>
            <gv-input
              multiline
              v-model="briefdescription"
              :label="$t('label.briefdescription')"
            />
          </gv-col>
        </gv-row>
      </PageForm>
    </template>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import { Page } from "@/components";
import { Dimension, Feedback, InputGroup } from "@/components/form";
import { PageForm, PageLoading } from "@/components/helper";
export default {
  components: {
    Dimension,
    Feedback,
    InputGroup,
    Page,
    PageForm,
    PageLoading,
  },
  middleware: ["auth", "admin"],
  async fetch() {
    const { error, params, $service } = this.$nuxt.context;
    try {
      if (params.id) {
        await $service.author.find(params.id);
      } else {
        $service.author.clear();
      }
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
    isUpdate() {
      return !!this.author._id;
    },
    title() {
      return this.isUpdate
        ? this.$t("page.authors.update")
        : this.$t("page.authors.create");
    },
    name: {
      set(name) {
        this.$service.author.set({ name });
      },
      get() {
        return this.author.name;
      },
    },
    briefdescription: {
      set(briefdescription) {
        this.$service.author.set({ briefdescription });
      },
      get() {
        return this.author.briefdescription;
      },
    },
  },
  beforeDestroy() {
    this.$service.author.clear();
  },
  methods: {
    onSubmit() {
      try {
        if (this.isUpdate) {
          this.$service.author.update(this.author);
        } else {
          this.$service.author.create(this.author);
        }
        this.$service.session.feedback(this.$t("message.feedback.success"));
      } catch (err) {
        this.$service.session.feedback(this.$t("message.feedback.error"), true);
      }
    },
  },
};
</script>
