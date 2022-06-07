<template>
  <Page :title="title">
    <template #content>
      <gv-row>
        <gv-col>
          <Feedback />
        </gv-col>
      </gv-row>
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
                  <gv-tile-header>{{ $tc("label.summary") }}</gv-tile-header>
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
                      <gv-tile-header> {{ item.name }} </gv-tile-header>
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
              <form v-if="canSubmit" @submit.prevent="onSubmit">
                <gv-button submit primary stretch>
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
import { calculation, helpers } from "@/utils";
import { Page } from "@/components";
import { Address, Feedback, Payment } from "@/components/form";
import { mapGetters } from "vuex";
export default {
  components: {
    Address,
    Feedback,
    Payment,
    Page,
  },
  middleware: ["auth", "authorization"],
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
    ...mapGetters("basket", ["sum"]),
    user() {
      return this.$auth.user;
    },
    canSubmit() {
      return this.shippingAddress && this.paymentMethod;
    },
    addresses: {
      set(addresses) {
        this.$service.user.updateDepth({
          addresses: [...addresses],
        });
      },
      get() {
        return this.user.addresses;
      },
    },
    payments: {
      set(payments) {
        this.$service.user.updateDepth({
          payments: [...payments],
        });
      },
      get() {
        return this.user.payments;
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
        ? helpers.randomFloat(5, 40) * calculation.exchangeRate(this.$i18n)
        : 0;
    },
  },
  methods: {
    onSubmit: async function () {
      if (this.canSubmit) {
        const isValid = await this.$service.basket.validate();
        if (isValid) {
          try {
            await this.$service.order.insert(
              this.shippingAddress,
              this.paymentMethod
            );
            this.$router.push({
              path: this.$resolve.home(),
            });
          } catch (err) {
            this.$service.session.feedback(
              this.$t("message.feedback.error"),
              true
            );
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
