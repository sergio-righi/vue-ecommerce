<template>
  <gv-input
    :label="$t('label.username')"
    v-model="username"
    v-mask="'a*'"
    v-validation.required="{
      minLength: 5,
      error: { value: this.validation, message: $t('validation.duplicate') },
    }"
    @input.native="checkUsername"
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
        this.validation = await this.$service.user.username(event.target.value);
      } catch {
        this.validation = false;
      }
    },
  },
  watch: {
    validation(val) {
      this.$emit("onerror", val);
    },
    username(val) {
      this.$emit("input", val);
    },
  },
};
</script>
