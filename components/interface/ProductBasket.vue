<template>
  <gv-tile>
    <template #content>
      <gv-tile-header>
        {{ item.name }}
      </gv-tile-header>
      <gv-tile-header>
        <gv-flexbox align="center">
          <gv-gap>
            <ProductCount
              :min="Math.min(1, item.inStock)"
              :max="item.inStock"
              :value="getCount(item._id)"
              @oninput="setCount(item, ...arguments)"
            />
            <ProductRating :item="item" :key="item._id" />
          </gv-gap>
        </gv-flexbox>
      </gv-tile-header>
    </template>
    <template #trailing>
      <gv-gap>
        <ProductDiscount
          :price="item.price"
          :discount="item.discount"
          :count="getCount(item._id)"
        />
        <gv-button
          v-if="inBasket(item._id)"
          sm
          error
          @onclick="removeItem(item)"
        >
          <gv-icon value="basket-remove" />
        </gv-button>
        <gv-button v-else primary @onclick="addItem(item)" sm>
          <gv-icon value="basket-plus" />
        </gv-button>
      </gv-gap>
    </template>
  </gv-tile>
</template>

<script>
import { default as ProductCount } from "./ProductCount.vue";
import { default as ProductDiscount } from "./ProductDiscount.vue";
import { default as ProductRating } from "./ProductRating.vue";

import { mapGetters } from "vuex";
export default {
  components: {
    ProductCount,
    ProductDiscount,
    ProductRating,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("book", ["book"]),
  },
  methods: {
    inBasket: function (id) {
      return this.$service.basket.exist(id);
    },
    addItem: async function (item) {
      const count = this.$service.session.count(item._id);
      await this.$service.basket.insert(item._id, count);
      this.$emit("onadd", item.name, count);
    },
    removeItem: async function (item) {
      this.$emit("onremove", item.name);
      await this.$service.basket.delete(item._id);
    },
    setCount: async function (item, count) {
      await this.$service.session.item(item._id, count);
      await this.$service.basket.set(item._id, count);
    },
    getCount: function (id) {
      return this.$service.basket.count(id);
    },
  },
};
</script>
