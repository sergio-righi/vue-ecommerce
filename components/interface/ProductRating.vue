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
    <small>({{ count }} {{ $tc("label.review", count).toLowerCase() }})</small>
  </div>
</template>

<script>
export default {
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
