<template>
  <gv-input
    :error="validation"
    :label="$t('label.username')"
    :data-validation-message="$t('validation.duplicate')"
    v-model="username"
    v-mask="'a*'"
    v-validation.required="{ minLength: 5 }"
    @blur="checkUsername"
  />
</template>

<script>
export default {
  props: {
    id: String,
    value: String,
  },
  data() {
    return {
      validation: false,
      username: this.value,
    };
  },
  methods: {
    checkUsername: async function (event) {
      try {
        this.validation = await this.$repository.user.username(
          this.id,
          event.target.value
        );
      } catch {
        this.validation = false;
      }
    },
  },
  watch: {
    validation(val) {
      this.$emit("onchange", val);
    },
    username(val) {
      this.$emit("input", val);
    },
  },
};
</script>
