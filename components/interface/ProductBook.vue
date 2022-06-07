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
          top
          lazyload
          :src="$resolve.image.cover(item._id)"
          :href="$resolve.book(item.slug)"
        >
          <gv-icon
            v-if="isAuthenticated"
            value="bookmark"
            class="wishlist-icon"
            :color="inWishlist(item._id)"
            @onclick="setWishlist(item._id)"
          />
          <ProductRating :item="item" :key="item._id" short />
        </gv-image>
      </div>
      <div class="footer">
        <div class="info">
          <div class="title">{{ item.name }}</div>
          <ProductDiscount
            :price="item.price"
            :discount="item.discount"
            :count="getCount(item._id)"
          />
        </div>
        <div v-if="item.inStock > 0" class="control">
          <gv-button
            v-if="inBasket(item._id)"
            sm
            error
            @onclick="removeItem(item)"
          >
            <gv-icon value="basket-remove" /> {{ $t("action.remove_basket") }}
          </gv-button>
          <gv-button v-else primary sm @onclick="addItem(item)">
            <gv-icon value="basket-plus" /> {{ $t("action.add_basket") }}
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
import { default as ProductCount } from "./ProductCount";
import { default as ProductRating } from "./ProductRating";
import { default as ProductDiscount } from "./ProductDiscount";

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
    isAuthenticated() {
      return this.$auth.loggedIn ?? false;
    },
  },
  methods: {
    inBasket: function (id) {
      return this.$service.basket.exist(id);
    },
    inWishlist: function (id) {
      return this.$service.user.inWishlist(id) ? "accent" : "white";
    },
    addItem: async function (item) {
      await this.$service.basket.insert(item._id, 1);
      this.$emit("onadd", item.name, 1);
    },
    removeItem: async function (item) {
      await this.$service.basket.delete(item._id);
      this.$emit("onremove", item.name);
    },
    setCount: async function (item, count) {
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
