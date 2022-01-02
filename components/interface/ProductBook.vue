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
          lazyload
          :src="$resolve.image.cover(item.id)"
          :href="$resolve.book(item.slug)"
        />
        <gv-inset v-if="isAuthenticated" top>
          <gv-icon
            value="bookmark"
            class="wishlist-icon"
            :color="inWishlist(item.id) ? 'red' : 'white'"
            @onclick="setWishlist(item.id)"
          />
        </gv-inset>
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
            v-if="inBasket(item.id)"
            sm
            error
            @onclick="removeItem(item)"
          >
            <gv-icon value="basket-remove" />
          </gv-button>
          <gv-button v-else primary sm @onclick="addItem(item)">
            <gv-icon value="basket-plus" />
          </gv-button>
        </div>
        <div v-else class="control">
          <gv-chip sm>
            <template #content>
              {{ $t("message.feedback.not_available") }}
            </template>
          </gv-chip>
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
    ...mapGetters("user", ["isAuthenticated"]),
  },
  methods: {
    inBasket: function (id) {
      return this.$service.basket.exist(id);
    },
    inWishlist: function (id) {
      return this.$service.user.inWishlist(id);
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
    setWishlist: async function (id) {
      await this.$service.user.manageWishlist(id);
    },
    getCount: function (id) {
      return this.$service.basket.count(id);
    },
  },
};
</script>
