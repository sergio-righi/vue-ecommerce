<template>
  <gv-alert v-if="s.message" v-bind="{ dismissible: b.dismissible }">
    <gv-alert-item v-bind="{ success: !b.error, error: b.error }">
      <template #content>
        {{ s.message }}
      </template>
    </gv-alert-item>
  </gv-alert>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    error: Boolean,
    message: String,
    dismissible: Boolean
  },
  data() {
    return {
      b: {
        error: this.error,
        dismissible: this.dismissible
      },
      s: {
        message: this.message
      }
    };
  },
  created() {
    this.setFeedback();
  },
  computed: {
    ...mapState("session", ["feedback"])
  },
  methods: {
    setFeedback() {
      if (this.feedback) {
        this.b.dismissible = true;
        this.s.message = this.feedback.message;
        this.b.error = this.feedback.error ?? false;
        this.$service.session.clear();
      }
    }
  },
  watch: {
    error(val) {
      this.b.error = val;
    },
    message(val) {
      this.s.message = val;
    },
    feedback() {
      this.setFeedback();
    }
  }
};
</script>
