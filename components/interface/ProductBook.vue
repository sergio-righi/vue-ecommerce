<template>
  <gv-card :title="item.name">
    <template #content>
      <gv-image
        :src="$resolve.image.cover(item.id)"
        :href="localePath($resolve.book(item.slug))"
      >
        <!-- <gv-inset top right>
          <gv-icon color="red" value="heart" v-if="isFavorite(item.id)" />
          <gv-icon v-else color="white" value="heart" />
        </gv-inset> -->
      </gv-image>
      <ProductDiscount
        :price="item.price"
        :discount="item.discount"
        :count="getCount(item.id)"
      />
      <gv-divider />
    </template>
    <template #footer>
      <ProductCount
        :max="item.inStock"
        :value="getCount(item.id)"
        @oninput="setCount(item, ...arguments)"
      />
      <gv-button error v-if="inBasket(item.id)" @onclick="removeItem(item)">
        <gv-icon value="basket-remove" />
      </gv-button>
      <gv-button primary v-else @onclick="addItem(item)">
        <gv-icon value="basket-plus" />
      </gv-button>
    </template>
  </gv-card>
</template>

<script>
import { default as ProductCount } from "./ProductCount.vue";
import { default as ProductDiscount } from "./ProductDiscount.vue";

import { mapGetters, mapState } from "vuex";
export default {
  components: {
    ProductCount,
    ProductDiscount,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("basket", ["basket"]),
    ...mapGetters("book", ["book", "books"]),
  },
  methods: {
    inBasket: function (id) {
      return this.basket.map((x) => x.bookId).indexOf(id) >= 0;
    },
    isFavorite: function (id) {
      return false;
    },
    addItem: async function (book) {
      const count = this.books.find((x) => x.id === book.id).count ?? 1;
      await this.$service.basket.insert(book.id, count);
      this.$emit("onadd", book.name, count);
    },
    removeItem: async function (book) {
      await this.$service.basket.delete(book.id);
      this.$emit("onremove", book.name);
    },
    setCount: async function (book, count) {
      await this.$service.book.set(book.id, { count: count });
      await this.$service.basket.set(book.id, count);
    },
    getCount: function (id) {
      return this.basket.find((x) => x.bookId === id)?.count ?? 1;
    },
  },
};
</script>
