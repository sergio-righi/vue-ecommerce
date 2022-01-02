<template>
  <Page :title="book.name">
    <template #content v-if="$fetchState.pending">
      <PageLoading />
    </template>
    <template #content v-else-if="hasValue">
      <gv-row>
        <gv-col>
          <gv-card>
            <template #content>
              <ProductBasket :item="book" @onremove="onRemove" />
              <gv-divider />
              <p>
                {{ book.description }}
              </p>
              <gv-divider />
            </template>
            <template #footer>
              <gv-scroll>
                <ProductInfo v-if="book.age">
                  <template #icon>{{ book.age }}</template>
                  <template #title>
                    {{ $t("component.product.content_rating") }}
                  </template>
                  <template #footnote>
                    {{ $t("component.product.years_old") }}
                  </template>
                </ProductInfo>

                <ProductInfo v-if="'weight' in { ...book.dimension }">
                  <template #icon>
                    <gv-icon value="weight-kilogram" />
                  </template>
                  <template #title>
                    {{ $t("component.product.weight") }}
                  </template>
                  <template #footnote>
                    {{ book.dimension.weight }} kg
                  </template>
                </ProductInfo>

                <ProductInfo v-if="'length' in { ...book.dimension }">
                  <template #icon>
                    <gv-icon value="book-open-page-variant" />
                  </template>
                  <template #title>
                    {{ $tc("component.product.page", 1) }}
                  </template>
                  <template #footnote>{{ book.dimension.length }}</template>
                </ProductInfo>

                <ProductInfo v-if="book.publisher">
                  <template #icon>
                    <gv-icon value="printer" />
                  </template>
                  <template #title>
                    {{ $t("component.product.publisher") }}
                  </template>
                  <template #footnote>
                    {{ book.publisher }}
                  </template>
                </ProductInfo>

                <ProductInfo v-if="book.releaseDate">
                  <template #icon>
                    <gv-icon value="rocket" />
                  </template>
                  <template #title>
                    {{ $t("component.product.release_date") }}
                  </template>
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
                      v-else-if="
                        book.type === $enum.enumerable.EnumBook.digital
                      "
                    />
                  </template>
                  <template #title>
                    {{ $t("component.product.format") }}
                  </template>
                  <template #footnote>
                    {{ book.type | enumerable($enum.mapper.books, $i18n) }}
                  </template>
                </ProductInfo>

                <ProductInfo v-if="book.language">
                  <template #icon>
                    <gv-icon value="web" />
                  </template>
                  <template #title>
                    {{ $t("component.product.language") }}
                  </template>
                  <template #footnote>
                    {{ book.language }}
                  </template>
                </ProductInfo>

                <ProductInfo v-if="book.isbn">
                  <template #icon>
                    <gv-icon value="barcode" />
                  </template>
                  <template #title>
                    {{ $t("component.product.isbn") }}
                  </template>
                  <template #footnote>
                    {{ book.isbn }}
                  </template>
                </ProductInfo>

                <ProductInfo v-if="book.dimension">
                  <template #icon>
                    <gv-icon value="cube-outline" />
                  </template>
                  <template #title>
                    {{ $tc("component.product.dimension", 1) }}
                  </template>
                  <template #footnote>
                    {{ book.dimension.width }} x {{ book.dimension.height }} x
                    {{ book.dimension.depth }} cm
                  </template>
                </ProductInfo>
              </gv-scroll>
            </template>
          </gv-card>
        </gv-col>
      </gv-row>
      <SnackbarUndo ref="recover" :message="recoverMessage" :on-undo="onUndo" />
      <br />
    </template>
    <template #content v-else>
      <NoRecord />
    </template>
  </Page>
</template>

<script>
import { helpers } from "@/utils";
import { PageLoading, SnackbarUndo } from "@/components/helper";
import { ProductBasket, ProductInfo } from "@/components/interface";
import { NoRecord, Page } from "@/components";
export default {
  components: {
    NoRecord,
    Page,
    PageLoading,
    ProductBasket,
    ProductInfo,
    SnackbarUndo,
  },
  async fetch() {
    const { $service, error, params } = this.$nuxt.context;
    try {
      if (params.slug) {
        this.book = $service.book.find(params.slug);
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
  computed: {
    recover() {
      return this.$refs.recover.reference();
    },
    hasValue() {
      return this.book !== null && Object.keys(this.book).length > 0;
    },
  },
  data() {
    return {
      recoverMessage: "",
    };
  },
  methods: {
    onRemove: function (name) {
      this.recoverMessage = helpers.format(
        this.$t("message.feedback.item_removed"),
        name
      );
      this.recover.show();
    },
    onUndo: async function () {
      await this.$service.basket.recover();
    },
  },
  head() {
    return {
      title: this.book?.name,
    };
  },
};
</script>
