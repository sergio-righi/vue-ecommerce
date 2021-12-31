<template>
  <Page :title="title">
    <template #content>
      <gv-row>
        <gv-col md="8">
          <gv-row>
            <gv-col>
              <Address v-model="addresses" @onchange="onChangeAddress" />
            </gv-col>
          </gv-row>
          <gv-row>
            <gv-col>
              <Payment
                v-model="payments"
                :addresses="addresses"
                @onchange="onChangePayment"
              />
            </gv-col>
          </gv-row>
        </gv-col>
        <gv-col md="4">
          <gv-card>
            <template #content>
              <gv-tile>
                <template #content>
                  <gv-tile-header>{{ $tc("label.resume") }}</gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.check_detail") }}
                  </gv-tile-header>
                </template>
              </gv-tile>
              <gv-tile>
                <template #content>
                  <gv-tile-header>
                    {{ $tc("label.item", sum) }}
                  </gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.item_count") }}
                  </gv-tile-header>
                </template>
                <template #trailing> {{ sum }}x </template>
                <template #expandable>
                  <gv-divider />
                  <gv-tile v-for="item in items" :key="item.id">
                    <template #content>
                      <gv-tile-header> {{ item.book.name }} </gv-tile-header>
                      <gv-tile-header sub>
                        {{ item | basket($i18n) }}
                      </gv-tile-header>
                    </template>
                  </gv-tile>
                </template>
              </gv-tile>
              <gv-tile>
                <template #content>
                  <gv-tile-header>{{ $tc("label.subtotal") }}</gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.before_discount") }}
                  </gv-tile-header>
                </template>
                <template #trailing>
                  <small class="ws-nowrap">
                    {{ currency }} {{ subtotal | money }}
                  </small>
                </template>
              </gv-tile>
              <gv-tile>
                <template #content>
                  <gv-tile-header>{{ $tc("label.total") }}</gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.before_tax") }}
                  </gv-tile-header>
                </template>
                <template #trailing>
                  <small class="ws-nowrap">
                    {{ currency }} {{ total | money }}
                  </small>
                </template>
              </gv-tile>
              <gv-tile v-if="shippingAddress">
                <template #content>
                  <gv-tile-header>{{ $t("label.shipping") }}</gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.checkout.shipping_cost") }}
                  </gv-tile-header>
                </template>
                <template #trailing>
                  <small class="ws-nowrap">
                    {{ currency }} {{ shippingCost | money }}
                  </small>
                </template>
              </gv-tile>
              <gv-tile v-if="shippingAddress">
                <template #content>
                  <gv-tile-header>
                    {{ $t("label.total") }} + {{ tax }} +
                    {{ $t("label.shipping") }}
                  </gv-tile-header>
                  <gv-tile-header sub>
                    {{ $t("message.basket.sum_total") }}
                  </gv-tile-header>
                </template>
                <template #trailing>
                  <b class="ws-nowrap">
                    {{ currency }} {{ (taxed + shippingCost) | money }}
                  </b>
                </template>
              </gv-tile>
              <gv-divider />
            </template>
            <template #footer>
              <form @submit.prevent="onSubmit" v-if="canSubmit">
                <gv-button submit primary fit>
                  {{ $t("action.order") }}
                </gv-button>
              </form>
              <gv-alert v-else>
                <gv-alert-item warning>
                  <template #content>
                    {{ $t("message.feedback.checkout") }}
                  </template>
                </gv-alert-item>
              </gv-alert>
            </template>
          </gv-card>
        </gv-col>
      </gv-row>
    </template>
  </Page>
</template>

<script>
import { calculation } from "@/utils";
import { Page } from "@/components";
import { Address, Payment } from "@/components/form";
import { mapGetters } from "vuex";
export default {
  components: {
    Address,
    Payment,
    Page,
  },
  middleware: ["authorization"],
  async fetch() {
    const { $service, error } = this.$nuxt.context;
    try {
      await $service.basket.validate();
    } catch (err) {
      error({
        statusCode: 503,
        message: "Unable to validate",
      });
    }
  },
  data() {
    return {
      paymentMethod: null,
      shippingAddress: null,
      title: this.$t("page.checkout.title"),
    };
  },
  computed: {
    ...mapGetters("book", ["book", "books"]),
    ...mapGetters("user", ["user", "users"]),
    ...mapGetters("basket", ["sum", "basket"]),
    canSubmit() {
      return this.shippingAddress && this.paymentMethod;
    },
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
    items() {
      return this.$service.basket.list();
    },
    tax() {
      return this.$service.basket.tax();
    },
    currency() {
      return this.$t("locale.currency");
    },
    subtotal() {
      return this.$service.basket.subtotal();
    },
    total() {
      return this.$service.basket.total();
    },
    taxed() {
      return this.$service.basket.taxed();
    },
    shippingCost() {
      return this.shippingAddress
        ? this.shippingAddress.cost * calculation.exchangeRate(this.$i18n)
        : 0;
    },
  },
  methods: {
    onSubmit: async function () {
      if (this.canSubmit) {
        const isValid = await this.$service.basket.validate();
        if (isValid) {
          try {
            await this.$service.order.order(
              this.shippingAddress,
              this.paymentMethod
            );
            this.$router.push({
              path: this.localePath({ path: this.$resolve.home() }),
            });
          } catch (err) {
            console.log(err);
            // this.feedback.error = true;
            // this.feedback.message = this.$t("message.feedback.error");
          }
        }
      }
    },
    onChangeAddress: function (item) {
      this.shippingAddress = item;
    },
    onChangePayment: function (item) {
      this.paymentMethod = item;
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
