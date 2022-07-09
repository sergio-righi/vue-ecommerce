<template>
  <Page :title="title">
    <template #header>
      <gv-breadcrumb :title="title">
        <gv-breadcrumb-item
          :label="$t('page.home.title')"
          :href="$resolve.home()"
        />
        <gv-breadcrumb-item
          :label="$t('page.books.title')"
          :href="$resolve.books()"
        />
      </gv-breadcrumb>
    </template>
    <template v-if="isUpdate" #action>
      <gv-button :href="$resolve.books()" primary>
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
              minlength="5"
            />
          </gv-col>
          <gv-col sm="4">
            <gv-select
              v-model="rated"
              v-validation.required
              :label="$t('label.rated')"
              :items="ratedDropdown"
            />
          </gv-col>
          <gv-col sm="4">
            <gv-input
              v-model="language"
              v-validation.required
              :label="$t('label.language')"
            />
          </gv-col>
          <gv-col sm="4">
            <gv-select
              v-model="type"
              v-validation.required
              :label="$t('label.type')"
              :items="typeDropdown"
            />
          </gv-col>
          <gv-col sm="6">
            <gv-input
              v-model="price"
              v-validation.required
              :label="$t('label.price')"
            >
              <template #leading>
                <gv-icon value="cash" />
              </template>
            </gv-input>
          </gv-col>
          <gv-col sm="6">
            <gv-input v-model="discount" :label="$t('label.discount')" />
          </gv-col>
          <gv-col sm="6">
            <gv-input
              v-model="inStock"
              v-validation.required
              :label="$t('label.in_stock')"
            />
          </gv-col>
          <gv-col sm="6">
            <gv-input v-model="publisher" :label="$t('label.publisher')" />
          </gv-col>
          <gv-col sm="6">
            <gv-picker
              v-model="releaseDate"
              :label="$t('label.release_date')"
            />
          </gv-col>
          <gv-col sm="6">
            <gv-input
              v-model="isbn"
              v-validation.required
              :label="$t('label.isbn')"
              v-mask="'###-#-##-######-#'"
            />
          </gv-col>
          <gv-col>
            <Dimension v-model="dimension" :label="$t('label.dimension')" />
          </gv-col>
          <gv-col>
            <gv-input
              multiline
              v-model="description"
              v-validation.required
              :label="$t('label.description')"
            />
          </gv-col>
          <gv-col>
            <gv-select
              multiple
              v-model="authors"
              :label="$tc('label.author', 2)"
              :items="authorDropdown"
            />
          </gv-col>
          <gv-col>
            <gv-form-group :label="$tc('label.genre', 2)">
              <InputGroup v-model="genres" :items="genreDropdown" />
            </gv-form-group>
          </gv-col>
        </gv-row>
      </PageForm>
    </template>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import { helpers } from "@/utils";
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
  middleware: ["admin"],
  async fetch() {
    const { error, params, $service } = this.$nuxt.context;
    try {
      if (params.id) {
        await $service.book.find(params.id);
        await $service.author.all();
      } else {
        $service.book.clear();
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
    ...mapState("book", ["book"]),
    isUpdate() {
      return !!this.book._id;
    },
    title() {
      return this.isUpdate
        ? this.$t("page.books.update")
        : this.$t("page.books.create");
    },
    ratedDropdown() {
      return helpers.toDropdownList(this.$enum.mapper.rates, this.$i18n);
    },
    typeDropdown() {
      return helpers.toDropdownList(this.$enum.mapper.books, this.$i18n);
    },
    genreDropdown() {
      return helpers.toDropdownList(this.$enum.mapper.genres, this.$i18n);
    },
    authorDropdown() {
      const authors = [...this.$store.state.author.authors];
      return authors?.map((item) => ({
        value: item._id,
        text: item.name,
      }));
    },
    name: {
      set(name) {
        const slug = helpers.slug(name);
        this.$service.book.set({ name, slug });
      },
      get() {
        return this.book.name;
      },
    },
    description: {
      set(description) {
        this.$service.book.set({ description });
      },
      get() {
        return this.book.description;
      },
    },
    rated: {
      set(rated) {
        this.$service.book.set({ rated });
      },
      get() {
        return this.book.rated;
      },
    },
    language: {
      set(language) {
        this.$service.book.set({ language });
      },
      get() {
        return this.book.language;
      },
    },
    type: {
      set(type) {
        this.$service.book.set({ type });
      },
      get() {
        return this.book.type;
      },
    },
    price: {
      set(price) {
        this.$service.book.set({ price });
      },
      get() {
        return this.book.price;
      },
    },
    discount: {
      set(discount) {
        this.$service.book.set({ discount });
      },
      get() {
        return this.book.discount;
      },
    },
    inStock: {
      set(inStock) {
        this.$service.book.set({ inStock });
      },
      get() {
        return this.book.inStock;
      },
    },
    publisher: {
      set(publisher) {
        this.$service.book.set({ publisher });
      },
      get() {
        return this.book.publisher;
      },
    },
    releaseDate: {
      set(releaseDate) {
        this.$service.book.set({ releaseDate: releaseDate?.getTime() });
      },
      get() {
        return new Date(this.book.releaseDate);
      },
    },
    isbn: {
      set(isbn) {
        this.$service.book.set({ isbn });
      },
      get() {
        return this.book.isbn;
      },
    },
    dimension: {
      set(dimension) {
        this.$service.book.set({ dimension });
      },
      get() {
        return this.book.dimension;
      },
    },
    genres: {
      set(genres) {
        this.$service.book.set({ genres: [...genres] });
      },
      get() {
        return [...this.book.genres];
      },
    },
    authors: {
      set(authors) {
        this.$service.book.set({ authors: [...authors] });
      },
      get() {
        return [...this.book.authors];
      },
    },
  },
  beforeDestroy() {
    this.$service.book.clear();
  },
  methods: {
    onSubmit() {
      try {
        if (this.isUpdate) {
          this.$service.book.update(this.book);
        } else {
          this.$service.book.create(this.book);
        }
        this.$service.session.feedback(this.$t("message.feedback.success"));
      } catch (err) {
        this.$service.session.feedback(this.$t("message.feedback.error"), true);
      }
    },
  },
};
</script>
