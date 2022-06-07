<template>
  <div class="login-content">
    <Feedback />
    <form @submit.prevent="forgetPassword">
      <gv-row>
        <gv-col v-if="!isUpdate">
          <Email v-model="email" ignore />
        </gv-col>
        <gv-col v-if="isUpdate">
          <Password v-model="password" required @onerror="passwordValidation" />
        </gv-col>
        <gv-col v-if="isUpdate">
          {{ $t("message.footnote.password") }}
          <gv-list>
            <li v-for="item in passwordPolicy" :key="item.id">{{ item }}</li>
          </gv-list>
        </gv-col>
        <gv-col>
          <gv-button submit primary stretch :disabled="hasError">
            {{ $t("action.send") }}
          </gv-button>
        </gv-col>
        <gv-col>
          <gv-flexbox justify="center">
            <span class="footnote">
              {{ $t("page.authentication.remember_it") }}
              <gv-link :href="$resolve.login()" muted>
                {{ $t("page.authentication.sign_in") }}
              </gv-link>
            </span>
          </gv-flexbox>
        </gv-col>
      </gv-row>
    </form>
  </div>
</template>

<script>
import { Email, Feedback, Password } from "@/components/form";

import { TokenModel } from "@/models";
export default {
  name: "ForgotPassword",
  auth: "guest",
  components: {
    Email,
    Feedback,
    Password,
  },
  layout: "login",
  data() {
    return {
      email: null,
      password: null,
      invalidPassword: false,
    };
  },
  async fetch() {
    const { error, query, $service, $resolve, redirect } = this.$nuxt.context;
    try {
      if ("token" in query) {
        const token = await $service.token.findByToken(query.token);
        if (!token) {
          return redirect($resolve.login());
        }
      }
    } catch {
      error({
        statusCode: 503,
        message: "Unable to fetch",
      });
    }
  },
  computed: {
    isUpdate() {
      return this.$route.query && "token" in this.$route.query;
    },
    hasError() {
      return this.invalidPassword;
    },
    passwordPolicy() {
      return Object.values(this.$t("password_policy"));
    },
  },
  methods: {
    async forgetPassword() {
      try {
        if (this.isUpdate) {
          if (this.hasError) return;
          const token = await this.$service.token.findByToken(
            this.$route.query.token
          );

          if (token) {
            this.$service.token.reset(token._id, { password: this.password });
            this.$router.push(this.$resolve.login());
          } else {
            this.$service.session.feedback(
              this.$t("message.feedback.token"),
              true
            );
          }
        } else {
          const user = await this.$service.user.findByEmail(this.email);

          if (user) {
            let token = await this.$service.token.findByUser(user._id);

            if (token) {
              token.expires = TokenModel.expireDate();
              await this.$service.token.update(token);
            } else {
              token = new TokenModel({ user: user._id });
              await this.$service.token.insertWithToken(token);
            }

            this.$service.mail.forgetPassword(user.person.email, token.number);
          }

          this.$router.push(this.$resolve.login());
          this.$service.session.feedback(
            this.$t("message.feedback.email"),
            false
          );
        }
      } catch (err) {
        this.$service.session.feedback(this.$t("message.feedback.error"), true);
      }
    },
    passwordValidation(error) {
      this.invalidPassword = error;
    },
  },
};
</script>
