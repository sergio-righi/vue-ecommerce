<template>
  <gv-alert
    v-if="message"
    v-bind="{ dismissible: dismissible }"
    style="margin-bottom: 16px"
  >
    <gv-alert-item v-bind="{ success: !error, error: error }">
      <template #content>
        {{ message }}
      </template>
    </gv-alert-item>
  </gv-alert>
</template>

<script lang="ts">
import { State } from "vuex-class";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { FeedbackType } from "@/interfaces";

@Component
export default class Feedback extends Vue {
  @Prop({ default: false }) dismissible!: boolean;
  @State("feedback", { namespace: "session" }) feedback!: FeedbackType;

  error: boolean = false;
  message: string | null = null;

  @Watch("feedback")
  onFeedbackChanged(value: FeedbackType) {
    if (Object.keys(value).length === 0) return;
    ({ error: this.error, message: this.message } = value);
    this.$service.session.clear();
  }
}
</script>
