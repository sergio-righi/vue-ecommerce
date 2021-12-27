<template>
  <Page :title="title">
    <template #content>
      <gv-row>
        <gv-col md="8">
          <gv-row>
            <gv-col>
              <Address v-model="addresses" />
            </gv-col>
          </gv-row>
          <gv-row>
            <gv-col>
              <Payment v-model="payments" :addresses="addresses" />
            </gv-col>
          </gv-row>
        </gv-col>
        <gv-col md="4"> Resume </gv-col>
      </gv-row>
    </template>
  </Page>
</template>

<script>
import { Page } from "@/components";
import { Address, Payment } from "@/components/form";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    Address,
    Payment,
    Page,
  },
  middleware: ["authorization"],
  data() {
    return {
      title: this.$t("page.checkout.title"),
    };
  },
  computed: {
    ...mapGetters("basket", ["basket"]),
    ...mapGetters("book", ["book", "books"]),
    ...mapGetters("user", ["user", "users"]),
    addresses: {
      set(addresses) {
        this.$service.user.update({
          person: { addresses: [...addresses] },
        });
      },
      get() {
        return this.user.person.addresses;
      },
    },
    payments: {
      set(payments) {
        this.$service.user.update({
          person: { payments: [...payments] },
        });
      },
      get() {
        return this.user.person.payments;
      },
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
