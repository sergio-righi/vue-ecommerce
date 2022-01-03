<template>
  <div class="login-content">
    <Feedback :message="feedback.message" error />
    <form @submit.prevent="login">
      <gv-input
        :label="$t('label.username')"
        v-model="user.username"
        v-validation.required
        autofocus
      />
      <gv-input
        :label="$t('label.password')"
        type="password"
        v-model="user.password"
        v-validation.required
      />
      <gv-space y lg>
        <gv-flexbox justify="space-evenly" align="center">
          <gv-input-box v-model="user.persist" checkbox>
            {{ $t("page.sign_in.remeber_me") }}
          </gv-input-box>
          <gv-link href="#" muted>
            {{ $t("page.sign_in.forgot_password") }}
          </gv-link>
        </gv-flexbox>
      </gv-space>
      <gv-flexbox>
        <gv-button submit primary stretch>
          {{ $t("page.sign_in.title") }}
        </gv-button>
        <gv-button :href="$resolve.subscribe()" secondary stretch>
          {{ $t("page.sign_up.title") }}
        </gv-button>
      </gv-flexbox>
    </form>
  </div>
</template>

<script>
import { Feedback } from "@/components/form";
import { mapState } from "vuex";
export default {
  layout: "login",
  name: "sign-in",
  components: {
    Feedback,
  },
  data() {
    return {
      feedback: {
        message: null,
      },
      user: {
        persist: false,
        username: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState("session", ["redirect"]),
  },
  methods: {
    async login() {
      try {
        const user = await this.$service.user.login(
          this.user.username,
          this.user.password
        );
        if (user) {
          this.$router.push({ path: this.redirect ?? this.$resolve.home() });
        } else {
          this.feedback.message = this.$t("message.feedback.user_not_found");
        }
      } catch (err) {
        this.feedback.message = this.$t("message.feedback.error");
      }
    },
  },
};
</script>
