<template>
  <div class="product-discount">
    <span class="currency">{{ currency }}</span>
    <span class="price" :class="{ crossed: hasDiscount }">
      {{ regularPrice | money }}
    </span>
    <span class="discount" v-if="hasDiscount">
      {{ reducedPrice | money }}
    </span>
  </div>
</template>

<script>
import { calculation } from "@/utils";
export default {
  props: {
    price: Number,
    count: Number,
    discount: Number,
  },
  computed: {
    hasDiscount() {
      return this.discount > 0;
    },
    currency() {
      return this.$t("locale.currency");
    },
    exchangeRate() {
      return calculation.exchangeRate(this.$i18n);
    },
    regularPrice() {
      return calculation.regularPrice(this.price, this.$i18n, this.count);
    },
    reducedPrice() {
      return calculation.reducedPrice(this.regularPrice, this.discount);
    },
  },
};
</script>
