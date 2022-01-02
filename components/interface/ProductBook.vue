<template>
  <gv-card
    :title="item.name"
    class="product-book"
    :class="{ 'sold-out': item.inStock <= 0 }"
    overflow
  >
    <template #content>
      <div class="thumbnail">
        <gv-image
          :src="$resolve.image.cover(item.id)"
          :href="$resolve.book(item.slug)"
        />
      </div>
      <div class="side">
        <div class="info">
          <div class="title">{{ item.name }}</div>
          <ProductDiscount
            :price="item.price"
            :discount="item.discount"
            :count="getCount(item.id)"
          />
        </div>
        <div v-if="item.inStock > 0" class="control">
          <ProductCount
            :min="Math.min(1, item.inStock)"
            :max="item.inStock"
            :value="getCount(item.id)"
            @oninput="setCount(item, ...arguments)"
          />
          <gv-button
            error
            v-if="inBasket(item.id)"
            @onclick="removeItem(item)"
            sm
          >
            <gv-icon value="basket-remove" />
          </gv-button>
          <gv-button primary v-else @onclick="addItem(item)" sm>
            <gv-icon value="basket-plus" />
          </gv-button>
        </div>
        <div v-else class="control">
          <gv-chip :label="$t('message.feedback.not_available')" sm />
        </div>
      </div>
    </template>
  </gv-card>
</template>

<script>
import { default as ProductCount } from "./ProductCount.vue";
import { default as ProductDiscount } from "./ProductDiscount.vue";

import { mapGetters } from "vuex";
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
    ...mapGetters("book", ["book"]),
  },
  methods: {
    inBasket: function (id) {
      return this.$service.basket.exist(id);
    },
    addItem: async function (item) {
      const count = this.$service.book.count(item.id);
      await this.$service.basket.insert(item.id, count);
      this.$emit("onadd", item.name, count);
    },
    removeItem: async function (item) {
      await this.$service.basket.delete(item.id);
      this.$emit("onremove", item.name);
    },
    setCount: async function (item, count) {
      await this.$service.book.set(item.id, { count: count });
      await this.$service.basket.set(item.id, count);
    },
    getCount: function (id) {
      return this.$service.basket.count(id);
    },
  },
};
</script>
