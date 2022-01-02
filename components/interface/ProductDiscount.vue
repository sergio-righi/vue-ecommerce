<template>
  <div class="product-discount">
    <span class="currency">{{ currency }}</span>
    <div class="wrapper">
      <span class="price" :class="{ crossed: hasDiscount }">
        {{ regularPrice | money }}
      </span>
      <span v-if="hasDiscount" class="discount">
        {{ reducedPrice | money }}
      </span>
    </div>
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
