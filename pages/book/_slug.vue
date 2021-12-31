<template>
  <Page :title="title">
    <template #content v-if="$fetchState.pending">
      <PageLoading />
    </template>
    <template #content v-else-if="hasValue">
      <gv-row>
        <gv-col sm="4" md="2">
          <ProductBook :item="book" />
        </gv-col>
        <gv-col sm="8" md="10">
          <gv-flexbox direction="column" align="center" justify="space-between">
            <p>
              {{ book.description }}
            </p>
            <gv-scroll>
              <ProductInfo v-if="book.age">
                <template #icon>{{ book.age }}</template>
                <template #title>Content Rating</template>
                <template #footnote>years old</template>
              </ProductInfo>

              <ProductInfo v-if="'weight' in { ...book.dimension }">
                <template #icon>
                  <gv-icon value="weight-kilogram" />
                </template>
                <template #title> weight </template>
                <template #footnote> {{ book.dimension.weight }} kg </template>
              </ProductInfo>

              <ProductInfo v-if="'length' in { ...book.dimension }">
                <template #icon>
                  <gv-icon value="book-open-page-variant" />
                </template>
                <template #title> pages </template>
                <template #footnote>{{ book.dimension.length }}</template>
              </ProductInfo>

              <ProductInfo v-if="book.publisher">
                <template #icon>
                  <gv-icon value="printer" />
                </template>
                <template #title> publisher </template>
                <template #footnote>
                  {{ book.publisher }}
                </template>
              </ProductInfo>

              <ProductInfo v-if="book.releaseDate">
                <template #icon>
                  <gv-icon value="rocket" />
                </template>
                <template #title> release date </template>
                <template #footnote>
                  {{ book.releaseDate | timestamp }}
                </template>
              </ProductInfo>

              <ProductInfo v-if="book.type >= 0">
                <template #icon>
                  <gv-icon
                    value="book-open-variant"
                    v-if="book.type === $enum.enumerable.EnumBook.physical"
                  />
                  <gv-icon
                    value="cellphone-link"
                    v-else-if="book.type === $enum.enumerable.EnumBook.digital"
                  />
                </template>
                <template #title> format </template>
                <template #footnote>
                  {{ book.type | enumerable($enum.mapper.books, $i18n) }}
                </template>
              </ProductInfo>

              <ProductInfo v-if="book.language">
                <template #icon>
                  <gv-icon value="web" />
                </template>
                <template #title> language </template>
                <template #footnote>
                  {{ book.language }}
                </template>
              </ProductInfo>

              <ProductInfo v-if="book.isbn">
                <template #icon>
                  <gv-icon value="barcode" />
                </template>
                <template #title> ISBN </template>
                <template #footnote>
                  {{ book.isbn }}
                </template>
              </ProductInfo>

              <ProductInfo v-if="book.dimension">
                <template #icon>
                  <gv-icon value="cube-outline" />
                </template>
                <template #title> dimensions </template>
                <template #footnote>
                  {{ book.dimension.width }} x {{ book.dimension.height }} x
                  {{ book.dimension.depth }} cm
                </template>
              </ProductInfo>
            </gv-scroll>
          </gv-flexbox>
        </gv-col>
      </gv-row>
    </template>
    <template #content v-else>
      <NoRecord />
    </template>
  </Page>
</template>

<script>
import { PageLoading } from "@/components/helper";
import { ProductBook, ProductInfo } from "@/components/interface";
import { NoRecord, Page } from "@/components";
export default {
  components: {
    NoRecord,
    Page,
    PageLoading,
    ProductBook,
    ProductInfo,
  },
  async fetch() {
    const { $service, error, params } = this.$nuxt.context;
    try {
      if (params.slug) {
        this.book = await $service.book.find(params.slug);
      }
    } catch (err) {
      error({
        statusCode: 503,
        message: "Unable to fetch book " + params.slug,
      });
    }
  },
  data: () => ({
    book: null,
  }),
  beforeDestroy() {
    this.$service.book.clear();
  },
  computed: {
    hasValue() {
      return this.book !== null && Object.keys(this.book).length > 0;
    },
    title() {
      return this.book?.name;
    },
  },
  methods: {
    addItem: async function (id) {
      await this.$service.basket.insert(id);
    },
  },
  head() {
    return {
      title: this.title ?? this.$t("message.feedback.page_loading"),
    };
  },
};
</script>
