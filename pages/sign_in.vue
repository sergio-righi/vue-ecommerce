<template>
  <div class="login-content">
    <Feedback />
    <form @submit.prevent="signIn">
      <gv-input
        v-model="user.username"
        v-validation.required
        :label="$t('label.username')"
        autofocus
      />
      <gv-input
        v-model="user.password"
        v-validation.required
        :label="$t('label.password')"
        type="password"
      />
      <gv-flexbox>
        <gv-button submit primary stretch>
          {{ $t("page.authentication.sign_in") }}
        </gv-button>
        <gv-button :href="$resolve.subscribe()" stretch>
          {{ $t("page.authentication.sign_up") }}
        </gv-button>
      </gv-flexbox>
      <gv-space y sm>
        <gv-flexbox justify="center">
          <gv-link class="footnote" :href="$resolve.password()" muted>
            {{ $t("page.authentication.forget_password") }}
          </gv-link>
        </gv-flexbox>
      </gv-space>
    </form>
  </div>
</template>

<script>
import { Feedback } from "@/components/form";
export default {
  name: "SignIn",
  components: {
    Feedback,
  },
  layout: "login",
  data() {
    return {
      prevRoute: null,
      user: {
        username: null,
        password: null,
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  computed: {
    prevRoutePath() {
      return this.prevRoute ? this.prevRoute.path : this.$resolve.home();
    },
  },
  methods: {
    async signIn() {
      try {
        await this.$service.session.login(
          this.user.username,
          this.user.password
        );
        this.$router.push(this.prevRoutePath);
      } catch (err) {
        this.$service.session.feedback(
          this.$t(
            /401/.test(err)
              ? "message.feedback.user_not_found"
              : "message.feedback.error"
          ),
          true
        );
      }
    },
  },
};
</script>
