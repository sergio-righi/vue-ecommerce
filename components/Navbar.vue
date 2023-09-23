<template>
  <gv-navbar center fixed>
    <template #brand>
      <gv-link :href="$resolve.home()">TheBookStore</gv-link>
    </template>
    <template #control>
      <gv-navbar-item @onclick="setTheme(!theme)">
        <gv-icon v-if="theme" value="brightness-6" />
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
            <gv-dropdown-item v-if="isAdmin" :href="$resolve.authors()">
              {{ $t("page.authors.title") }}
            </gv-dropdown-item>
            <gv-dropdown-item v-if="isAdmin" :href="$resolve.books()">
              {{ $t("page.books.title") }}
            </gv-dropdown-item>
            <gv-dropdown-item :href="$resolve.order()">
              {{ $t("page.orders.title") }}
            </gv-dropdown-item>
            <gv-dropdown-item @onclick="signOut">
              {{ $t("navbar.sign_out") }}
            </gv-dropdown-item>
          </template>
        </gv-dropdown>
      </gv-navbar-item>
      <!-- <gv-navbar-item v-else @onclick="signIn">
        <gv-icon value="account-circle" />
      </gv-navbar-item> -->
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
  mounted() {
    this.setTheme(this.theme);
    this.setLocale(this.locale);
  },
  computed: {
    ...mapGetters("basket", ["count", "basket"]),
    theme: {
      set(theme) {
        this.isAuthenticated
          ? this.theme !== theme
            ? this.$service.user.updateDepth({ theme })
            : null
          : (this.dark = theme);
      },
      get() {
        return this.isAuthenticated
          ? this.$service.user.user().theme ?? false
          : this.dark;
      },
    },
    locale: {
      set(locale) {
        this.isAuthenticated
          ? this.locale !== locale
            ? this.$service.user.updateDepth({ locale })
            : null
          : (this.$i18n.locale = locale);
      },
      get() {
        return this.isAutheticated
          ? this.$service.user.user().locale ?? this.$i18n.locale
          : this.$i18n.locale;
      },
    },
    letter() {
      if (this.isAuthenticated) {
        const user = this.$service.session.user();
        return user.name?.slice(0, 1);
      }
      return "";
    },
    isAuthenticated() {
      return this.$service.session.isAuthenticated();
    },
    isAdmin() {
      return this.$service.user.isAdmin();
    },
    availableLocale() {
      return this.$i18n.locales.filter((item) => item.iso !== this.locale);
    },
    selectedLocale() {
      return this.$i18n.locales
        .find((item) => item.iso === this.locale)
        .iso.split("-")[0];
    },
  },
  methods: {
    signIn() {
      window.location.href = this.$resolve.login(window.location.href);
    },
    signOut() {
      window.location.href = this.$resolve.logout(window.location.href);
    },
    setLocale(locale) {
      this.locale = locale;
      this.$router.push({ path: this.switchLocalePath(locale) });
    },
    setTheme(theme) {
      this.theme = theme;
      document.documentElement.setAttribute(
        "theme",
        this.theme ? "dark" : "light"
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
