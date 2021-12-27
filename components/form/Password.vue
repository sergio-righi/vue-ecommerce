<template>
  <gv-row>
    <gv-col sm="6">
      <gv-input
        id="password"
        :label="$t('label.password')"
        :type="inputType"
        v-model="password"
        v-validation="{ required: required }"
      >
      </gv-input>
    </gv-col>
    <gv-col sm="6">
      <gv-input
        :label="$t('label.password')"
        type="password"
        v-model="confirmation"
        v-validation.match="'#password'"
      />
    </gv-col>
  </gv-row>
</template>

<script>
import { crypto } from "utils";
export default {
  props: {
    value: String,
    required: Boolean,
  },
  data() {
    return {
      visible: false,
      confirmation: null,
      password: this.value,
    };
  },
  computed: {
    isSuccess() {
      return this.hasValue && this.match;
    },
    isError() {
      return this.hasValue && !this.match;
    },
    hasValue() {
      return this.confirmation && this.password;
    },
    match() {
      return this.password === this.confirmation;
    },
    inputType() {
      return this.visible ? "text" : "password";
    },
  },
  watch: {
    match(val) {
      if (this.hasValue) {
        this.$emit("onerror", !val);
      }
    },
    password(val) {
      this.$emit("input", crypto.encrypt(val));
    },
  },
};
</script>
