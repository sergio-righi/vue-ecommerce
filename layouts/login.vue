<template>
  <div id="login">
    <div class="login-container">
      <div class="login-header">
        <gv-image
          class="brand"
          :src="$resolve.image.root('logo_horizontal.png')"
        />
        <!-- <div class="title">{{ $t("page.sign_in.title") }}</div> -->
        <!-- <div class="message">{{ new Date() | greeting($i18n) }}</div> -->
      </div>
      <Nuxt />
      <div class="login-footer">
        <div class="message">
          {{ $t("message.footnote.login") }}
          <gv-link href="#" muted>{{
            $t("agreement.terms_of_service")
          }}</gv-link
          >,
          <gv-link href="#" muted>{{ $t("agreement.privacy_policy") }}</gv-link>
          {{ $t("linking_word.and") }}
          <gv-link href="#" muted>{{ $t("agreement.cookie_policy") }}</gv-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.setTheme();
    this.setLocale();
  },
  methods: {
    setLocale() {
      this.$router.push({ path: this.switchLocalePath(this.$i18n.locale) });
    },
    setTheme() {
      document.documentElement.setAttribute("theme", "light");
    },
  },
};
</script>

<!--<style scoped lang="scss">
@import "scss/layouts/login.scss";
</style>-->
