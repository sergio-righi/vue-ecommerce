<template>
  <gv-navbar center fixed>
    <template #brand>
      <gv-link :href="$resolve.home()">TheBookStore</gv-link>
    </template>
    <template #control>
      <gv-navbar-item @onclick="setTheme(!dark)">
        <gv-icon v-if="dark" value="brightness-6" />
        <gv-icon v-else value="brightness-2" />
      </gv-navbar-item>
      <gv-navbar-item
        class="a-center"
        @onclick="setLocale(availableLocale[0].iso)"
      >
        <span class="locale-icon">
          {{ availableLocale[0].iso.split("-")[0] }}
        </span>
      </gv-navbar-item>
      <gv-navbar-item :href="$resolve.basket()">
        <gv-badge :value="count">
          <gv-icon value="basket" />
        </gv-badge>
      </gv-navbar-item>
      <gv-navbar-item v-if="isAuthenticated">
        <gv-dropdown left>
          <template #trigger>
            <gv-flexbox align="center" justify="center" flex>
              <gv-avatar bg="white" color="black" sm>
                {{ letter }}
              </gv-avatar>
            </gv-flexbox>
          </template>
          <template #content>
            <gv-dropdown-item :href="$resolve.order()">
              {{ $t("page.order.title") }}
            </gv-dropdown-item>
            <gv-dropdown-item @onclick="signOut">
              {{ $t("navbar.sign_out") }}
            </gv-dropdown-item>
          </template>
        </gv-dropdown>
      </gv-navbar-item>
      <gv-navbar-item @onclick="signIn" v-else>
        <gv-icon value="account-circle" />
      </gv-navbar-item>
    </template>
  </gv-navbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dark: false,
    };
  },
  computed: {
    ...mapGetters("basket", ["count", "basket"]),
    ...mapGetters("session", ["isAuthenticated", "user"]),
    letter() {
      return this.user?.name ? this.user.name[0] : "?";
    },
    availableLocale() {
      return this.$i18n.locales.filter(
        (item) => item.iso !== this.$i18n.locale
      );
    },
    locale() {
      return this.$i18n.locales[0].iso;
    },
    selectedLocale() {
      return (
        this.$i18n.locales.find((item) => item.iso === this.$i18n.locale).iso ||
        this.locale
      ).split("-")[0];
    },
  },
  beforeMount() {
    this.setTheme(this.theme);
    this.setLocale(this.locale);
  },
  methods: {
    async signOut() {
      await this.$service.session.logout();
      this.$router.push({ path: this.$resolve.home() });
    },
    async signIn() {
      this.$router.push({ path: this.$resolve.login() });
    },
    isActive(url) {
      return new RegExp(url).test(this.$route.path);
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.$router.push({ path: this.switchLocalePath(locale) });
    },
    setTheme(theme) {
      this.dark = theme;
      document.documentElement.setAttribute(
        "theme",
        this.dark ? "dark" : "light"
      );
    },
  },
};
</script>

<style scoped>
.locale-icon {
  font-size: 2em;
  font-weight: 300;
  text-transform: uppercase;
}
</style>
