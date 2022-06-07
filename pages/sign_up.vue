<template>
  <div class="login-content">
    <Feedback />
    <form @submit.prevent="signUp">
      <gv-row>
        <gv-col>
          <gv-input
            v-model="user.person.name"
            v-validation.required
            :label="$t('label.name')"
            autofocus
          />
        </gv-col>
        <gv-col>
          <Username
            v-model="user.username"
            required
            @onerror="usernameValidation"
          />
        </gv-col>
        <gv-col>
          <Password
            v-model="user.password"
            required
            @onerror="passwordValidation"
          />
        </gv-col>
        <gv-col>
          <Email v-model="user.person.email" required />
        </gv-col>
        <gv-col>
          <gv-button submit primary stretch :disabled="hasError">
            {{ $t("page.authentication.sign_up") }}
          </gv-button>
        </gv-col>
        <gv-col class="justify-content-center">
          <gv-space y md bottom>
            <gv-flexbox align="center" justify="space-evenly">
              <span class="footnote">
                {{ $t("page.authentication.has_account") }}
                <gv-link :href="$resolve.login()" muted>
                  {{ $t("page.authentication.sign_in") }}
                </gv-link>
              </span>
            </gv-flexbox>
          </gv-space>
        </gv-col>
      </gv-row>
    </form>
  </div>
</template>

<script>
import { Email, Feedback, Username, Password } from "@/components/form";
import { UserModel, TokenModel } from "@/models";

export default {
  name: "SignUp",
  auth: "guest",
  components: {
    Email,
    Feedback,
    Username,
    Password,
  },
  layout: "login",
  data() {
    return {
      user: new UserModel(),
      invalidUsername: false,
      invalidPassword: false,
    };
  },
  computed: {
    hasError() {
      return this.invalidUsername || this.invalidPassword;
    },
  },
  methods: {
    async signUp() {
      if (this.hasError) return;
      try {
        const user = await this.$service.user.create(this.user);
        if (user) {
          const token = new TokenModel({ user: user._id });
          await this.$service.session.login(
            user.username,
            user.password,
            false
          );
          await this.$service.token.insertWithCode(token);
          await this.$service.mail.verificationCode(token.code);
        } else {
          this.$service.session.feedback(
            this.$t("message.feedback.error"),
            true
          );
        }
      } catch (err) {
        this.$service.session.feedback(this.$t("message.feedback.error"), true);
      }
    },
    usernameValidation(error) {
      this.invalidUsername = error;
    },
    passwordValidation(error) {
      this.invalidPassword = error;
    },
  },
};
</script>
