<template>
  <div class="login-content">
    <Feedback
      :message="feedback.message"
      :error="feedback.error"
      :success="!feedback.error"
    />
    <form @submit.prevent="forgot_password">
      <gv-row>
        <gv-col v-if="!isUpdate">
          <Email v-model="email" ignore />
        </gv-col>
        <gv-col v-if="isUpdate">
          <Password required v-model="password" @onerror="passwordValidation" />
        </gv-col>
        <gv-col v-if="isUpdate">
          {{ $t("message.footnote.password") }}
          <gv-ul>
            <li v-for="item in passwordPolicy" :key="item.id">{{ item }}</li>
          </gv-ul>
        </gv-col>
        <gv-col>
          <gv-button primary stretch :disabled="hasError">
            {{ $t("action.send") }}
          </gv-button>
        </gv-col>
        <gv-col class="justify-content-center">
          <span class="footnote">
            {{ $t("page.forgot_password.remember_it") }}
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
import { Email, Feedback, Password } from "@/components/form";
export default {
  layout: "login",
  name: "forgot-password",
  components: {
    Email,
    Feedback,
    Password,
  },
  // async fetch({ query, redirect }) {
  //   try {
  //     if ("token" in query) {
  //       const token = await this.$repository.token.findByToken(query.token);
  //       if (!token) {
  //         return redirect("/sign_in");
  //       }
  //     }
  //   } catch (err) {
  //     return redirect("/sign_in");
  //   }
  // },
  data() {
    return {
      feedback: {
        error: false,
        message: null,
      },
      email: null,
      password: null,
      invalidPassword: false,
    };
  },
  computed: {
    isUpdate: function () {
      return this.$route.query && this.$route.query.hasOwnProperty("token");
    },
    hasError: function () {
      return this.invalidPassword;
    },
    passwordPolicy: function () {
      return Object.values(this.$t("password_policy"));
    },
  },
  methods: {
    async forgot_password() {
      // try {
      //   if (this.isUpdate) {
      //     if (this.hasError) return;
      //     const token = await this.$repository.token.findByToken(
      //       this.$route.query.token
      //     );
      //     if (token) {
      //       const user = await this.$repository.user.find(token.user);
      //       if (user) {
      //         user.password = this.password;
      //         //  transaction
      //         this.$repository.token.done(token.id);
      //         this.$repository.user.update(user.id, user);
      //         // end transaction
      //         this.$router.push("/");
      //         // feedback message
      //       } else {
      //         this.feedback.error = true;
      //         this.feedback.message = this.$t("message.feedback.token");
      //       }
      //     } else {
      //       this.feedback.error = true;
      //       this.feedback.message = this.$t("message.feedback.token");
      //     }
      //   } else {
      //     const user = await this.$repository.user.findByEmail(this.email);
      //     if (user) {
      //       let token = await this.$repository.token.findByUser(user.id);
      //       if (token) {
      //         token.expires = Token.expireDate();
      //         await this.$repository.token.update(token.id, token);
      //       } else {
      //         token = new Token({
      //           user: user.id,
      //         });
      //         await this.$repository.token.insert(token);
      //       }
      //       /// must send the email
      //     }

      //     this.feedback.error = false;
      //     this.feedback.message = this.$t("message.feedback.email");
      //   }
      // } catch (err) {
      //   this.feedback.error = true;
      //   this.feedback.message = this.$t("message.feedback.error");
      // }
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
