<template>
  <div class="product-rating">
    <div v-if="short && review.ratio > 0" class="rating">
      <gv-icon value="heart" />
      <span>{{ review.ratio.toFixed(1) }}</span>
    </div>
    <template v-else-if="!short">
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
        >({{ count }} {{ $tc("label.review", count).toLowerCase() }})</small
      >
    </template>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    short: Boolean,
  },
  computed: {
    isAuthenticated() {
      return this.$service.session.isAuthenticated();
    },
    hasReview() {
      return !!this.review;
    },
    count() {
      return this.hasReview ? this.review.count : 0;
    },
    review() {
      return this.$service.book.review(this.item._id);
    },
    userReview() {
      return this.hasReview ? this.review.user ?? this.review.ratio : null;
    },
    titleReview() {
      return this.hasReview
        ? `${this.review.ratio}/5 ${this.$t("label.overall")}`
        : "";
    },
  },
  methods: {
    setReview: async function (item, value) {
      this.$nextTick(async () => {
        await this.$service.book.setReview(item._id, value);
      });
    },
  },
};
</script>
