<template>
  <div class="login-container">
    <div class="login-header">
      <gv-image class="brand" src="logo_horizontal.png" />
      <div class="title">
        {{ $t("page.authorization.title") }}
      </div>
    </div>
    <div class="login-content">
      <Feedback :message="feedback.message" />
      <form @submit.prevent="authorization">
        <gv-row>
          <gv-col>
            <Code v-model="code" @ondone="verificationCallback" />
          </gv-col>
          <gv-col>
            <gv-button primary fit>
              {{ $t("action.continue") }}
            </gv-button>
          </gv-col>
          <gv-col class="justify-content-center">
            <span class="footnote">
              {{ $t("page.authorization.try_again") }}
              <gv-link href="#" muted>{{ $t("action.resend") }}</gv-link>
              {{ $t("linking_word.or") }}
              <gv-link href="/sign_in" muted>
                {{ $t("page.sign_in.title") }}
              </gv-link>
            </span>
          </gv-col>
        </gv-row>
      </form>
    </div>
  </div>
</template>

<script>
import { Code, Feedback } from "@/components/form";

import { mapState } from "vuex";
export default {
  layout: "login",
  name: "authorization",
  components: {
    Code,
    Feedback,
  },
  data() {
    return {
      feedback: {
        message: null,
      },
      code: null,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    async authorization() {
      try {
        const token = await this.$repository.token.findByCode(this.code);
        if (token && token.user === this.user.id) {
          //  transaction
          await this.$service.session.release();
          await this.$repository.token.done(token.id);
          // end transaction
          this.$router.go();
        } else {
          this.code = null;
          this.feedback.message = this.$t("message.feedback.code");
        }
      } catch (err) {
        this.feedback.message = this.$t("message.feedback.error");
      }
    },
    verificationCallback: function (code) {
      this.code = code;
      this.authorization();
    },
  },
};
</script>

<!--<style lang="scss">
@import "scss/pages/login.scss";
</style>-->
