<template>
  <div class="product-rating">
    <gv-rating
      decimal
      icon="heart"
      :title="titleReview"
      :value="userReview"
      :readonly="!isAuthenticated"
      @input="setReview(item, ...arguments)"
      color="pink"
    />
    <small
      >({{ review.count }}
      {{ $tc("label.review", review.count).toLowerCase() }})</small
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("user", ["isAuthenticated"]),
    review() {
      return this.$service.book.review(this.item.id);
    },
    userReview() {
      return this.review.user ?? this.review.ratio;
    },
    titleReview() {
      return `${this.review.ratio}/5 ${this.$t("label.overall")}`;
    },
  },
  methods: {
    setReview: async function (item, value) {
      this.$nextTick(async () => {
        await this.$service.book.setReview(item.id, value);
      });
    }
  },
};
</script>
