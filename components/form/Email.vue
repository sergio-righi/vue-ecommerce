<template>
  <gv-input
    :error="validation"
    :label="$tc('label.email', 1)"
    v-model="email"
    v-validation.required.email="{
      error: { value: validation, message: $t('validation.duplicate') },
    }"
    @onblur="checkEmail"
  />
</template>

<script>
export default {
  props: {
    id: String,
    value: String,
    ignore: Boolean,
  },
  data() {
    return {
      validation: false,
      email: this.value,
    };
  },
  methods: {
    checkEmail: async function (event) {
      if (this.ignore) return;
      try {
        this.validation = await this.$repository.user.email(
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
    email(val) {
      this.$emit("input", val);
    },
  },
};
</script>
