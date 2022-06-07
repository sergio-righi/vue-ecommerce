<template>
  <div class="login-content">
    <Feedback />
    <form @submit.prevent="authorization">
      <gv-row>
        <gv-col>
          <gv-verification-code
            v-model="code"
            autofocus
            @ondone="verificationCallback"
          />
        </gv-col>
        <gv-col>
          <gv-button primary stretch>
            {{ $t("action.continue") }}
          </gv-button>
        </gv-col>
        <gv-col>
          <gv-flexbox justify="center">
            <span class="footnote">
              {{ $t("message.footnote.try_again") }}
              <gv-button inline @onclick="resendEmail">
                {{ $t("action.resend") }}
              </gv-button>
            </span>
          </gv-flexbox>
        </gv-col>
      </gv-row>
    </form>
  </div>
</template>

<script>
import { Feedback } from "@/components/form";

export default {
  name: "Authorization",
  components: {
    Feedback,
  },
  layout: "login",
  middleware: "authorization",
  data() {
    return { code: null };
  },
  methods: {
    async authorization() {
      try {
        const token = await this.$service.token.findByCode(
          this.$auth.user._id,
          this.code
        );
        if (token) {
          await this.$service.token.done(token._id);
          await this.$service.session.fetch();
          this.$router.go(0);
        } else {
          this.code = null;
          this.$service.session.feedback(
            this.$t("message.feedback.code"),
            true
          );
        }
      } catch (err) {
        this.$service.session.feedback(this.$t("message.feedback.error"), true);
      }
    },
    async resendEmail() {
      this.code = null;
      const token = await this.$service.token.findByUser(
        this.$auth.user._id,
        true
      );
      if (token) {
        this.$service.mail.verificationCode(token.code);
        this.$service.session.feedback(
          this.$t("message.feedback.email"),
          false
        );
      }
    },
    verificationCallback(code) {
      this.code = code;
      this.authorization();
    },
  },
};
</script>
