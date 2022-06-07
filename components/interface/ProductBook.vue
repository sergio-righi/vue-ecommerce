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
          :src="$resolve.image.cover(item._id)"
          :href="$resolve.book(item.slug)"
        />
        <gv-position v-if="isAuthenticated" top>
          <gv-icon
            value="bookmark"
            class="wishlist-icon"
            :color="inWishlist(item._id)"
            @onclick="setWishlist(item._id)"
          />
        </gv-position>
      </div>
      <div class="side">
        <div class="info">
          <div class="title">{{ item.name }}</div>
          <ProductDiscount
            :price="item.price"
            :discount="item.discount"
            :count="getCount(item._id)"
          />
        </div>
        <div v-if="item.inStock > 0" class="control">
          <ProductCount
            :min="Math.min(1, item.inStock)"
            :max="item.inStock"
            :value="getCount(item._id)"
            @oninput="setCount(item, ...arguments)"
          />
          <gv-button
            v-if="inBasket(item._id)"
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
    isAuthenticated() {
      return this.$auth.loggedIn ?? false;
    },
  },
  methods: {
    inBasket: function (id) {
      return this.$service.basket.exist(id);
    },
    inWishlist: function (id) {
      return this.$service.user.inWishlist(id) ? "red" : "white";
    },
    addItem: async function (item) {
      const count = this.$service.session.count(item._id);
      await this.$service.basket.insert(item._id, count);
      this.$emit("onadd", item.name, count);
    },
    removeItem: async function (item) {
      await this.$service.basket.delete(item._id);
      this.$emit("onremove", item.name);
    },
    setCount: async function (item, count) {
      await this.$service.session.item(item._id, count);
      await this.$service.basket.set(item._id, count);
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
