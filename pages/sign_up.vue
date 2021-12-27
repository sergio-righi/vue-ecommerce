<template>
  <div class="login-content">
    <Feedback :message="feedback.message" error />
    <form @submit.prevent="sign_up">
      <gv-row>
        <gv-col>
          <gv-input
            :label="$t('label.name')"
            v-model="user.person.name"
            v-validation.required
            autofocus
          />
        </gv-col>
        <gv-col>
          <Username
            v-model="user.username"
            @onerror="usernameValidation"
            v-validation.required
          />
        </gv-col>
        <gv-col>
          <Password
            required
            v-model="user.password"
            @onerror="passwordValidation"
          />
        </gv-col>
        <gv-col>
          <Email v-model="user.email" />
        </gv-col>
        <gv-col>
          <gv-button submit primary fit :disabled="hasError">
            {{ $t("page.sign_up.title") }}
          </gv-button>
        </gv-col>
        <gv-col>
          <span class="footnote">
            {{ $t("page.sign_up.has_account") }}
            <gv-link href="/sign_in" muted>{{
              $t("page.sign_in.title")
            }}</gv-link>
          </span>
        </gv-col>
      </gv-row>
    </form>
  </div>
</template>

<script>
import { Email, Feedback, Username, Password } from "@/components/form";

import { User, Token } from "~/models";
export default {
  layout: "login",
  name: "sign-up",
  components: {
    Email,
    Feedback,
    Username,
    Password,
  },
  data() {
    return {
      feedback: {
        message: null,
      },
      user: new User(),
      invalidUsername: false,
      invalidPassword: false,
    };
  },
  computed: {
    hasError: function () {
      return this.invalidUsername || this.invalidPassword;
    },
  },
  methods: {
    async sign_up() {
      if (this.hasError) return;
      try {
        const user = await this.$repository.user.insert(this.user);
        if (user) {
          await this.$repository.token.insert(new Token({ user: user.id }));
          this.$service.session.login({
            id: user.id,
            name: user.person.name,
            username: user.username,
            locked: true,
          });
          this.$router.go();
        } else {
          this.feedback.message = this.$t("message.feedback.error");
        }
      } catch (err) {
        this.feedback.message = this.$t("message.feedback.error");
      }
    },
    usernameValidation: function (error) {
      this.invalidUsername = error;
    },
    passwordValidation: function (error) {
      this.invalidPassword = error;
    },
  },
};
</script>

<!--<style lang="scss">
@import "scss/pages/login.scss";
</style>-->
