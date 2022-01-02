<template>
  <gv-card>
    <template #header>
      <gv-tile>
        <template #content>
          <gv-tile-header>{{ $t("label.payment_method") }}</gv-tile-header>
        </template>
      </gv-tile>
    </template>
    <template #content v-if="hasPaymentMethod">
      <gv-tile v-for="(item, index) in items" :key="item.id" activable>
        <template #leading>
          <gv-input-box
            name="payment"
            :val="item.id"
            v-model="selected"
            @change="onChange(item, index)"
            radio
          />
        </template>
        <template #content>
          <gv-tile-header sub> {{ item.info.number | masked }} </gv-tile-header>
        </template>
        <template #trailing>
          <gv-button @onclick="onRequestConfirmation(index)" error sm>
            {{ $t("action.delete") }}
          </gv-button>
        </template>
      </gv-tile>
      <gv-tile :active="items.length === 0">
        <template #content>
          <gv-tile-header sub>
            {{ $t("message.checkout.add_payment") }}
          </gv-tile-header>
        </template>
        <template #expandable>
          <gv-space x>
            <form @submit.prevent="onSubmit">
              <gv-row>
                <gv-col sm="6">
                  <gv-input
                    v-model="payment.info.cardholder"
                    v-validation.required
                    :label="$t('label.cardholder')"
                  />
                </gv-col>
                <gv-col sm="6">
                  <gv-input
                    v-model="payment.info.number"
                    v-validation.required="{ minLength: 16 }"
                    :label="$t('label.number')"
                    v-mask="'################'"
                  />
                </gv-col>
                <gv-col sm="6">
                  <gv-picker
                    v-model="payment.info.expirationMonth"
                    is-month
                    v-validation.required
                    :locale="currentLocale"
                    :label="$t('label.expiration_month')"
                  />
                </gv-col>
                <gv-col sm="6">
                  <gv-picker
                    v-model="payment.info.expirationYear"
                    is-year
                    v-validation.required
                    :locale="currentLocale"
                    :label="$t('label.expiration_year')"
                  />
                </gv-col>
                <gv-col v-if="addresses.length">
                  <gv-form-group
                    :label="$t('label.billing_address')"
                    v-validation.group="[1]"
                  >
                    <gv-radio-group>
                      <gv-col v-for="item in addresses" :key="item.id">
                        <gv-input-box
                          :val="item"
                          v-model="payment.info.billingAddress"
                          radio
                        >
                          {{ item.number }} {{ item.street }} - {{ item.city }},
                          {{ item.country }} ({{ item.zipcode }})
                        </gv-input-box>
                      </gv-col>
                    </gv-radio-group>
                  </gv-form-group>
                </gv-col>
                <gv-col sm="2">
                  <gv-button submit primary fit lg>
                    {{ $t("action.create") }} <gv-icon value="plus" />
                  </gv-button>
                </gv-col>
              </gv-row>
              <br />
            </form>
          </gv-space>
        </template>
      </gv-tile>
      <DialogDelete ref="confirmation" :on-confirm="onDelete" />
    </template>
    <template #content v-else>
      <gv-alert>
        <gv-alert-item warning>
          <template #content>
            {{ $t("message.feedback.billing_address") }}
          </template>
        </gv-alert-item>
      </gv-alert>
    </template>
  </gv-card>
</template>

<script>
import { Payment } from "@/models";
import { DialogDelete } from "@/components/helper";
export default {
  components: {
    DialogDelete,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    addresses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      items: [],
      index: -1,
      selected: null,
      checkedIndex: -1,
      payment: new Payment(),
      componentKey: 0,
    };
  },
  mounted() {
    this.items = [...this.value];
  },
  computed: {
    hasPaymentMethod() {
      return this.addresses.length || this.value.length;
    },
    currentLocale() {
      return this.$i18n.locale;
    },
    element: function () {
      return this.$refs.element;
    },
    confirmation: function () {
      return this.$refs.confirmation.reference();
    },
  },
  methods: {
    onRequestConfirmation: function (index) {
      this.index = index;
      this.confirmation.open();
    },
    onChange: function (item, index) {
      this.$emit("onchange", item);
      this.checkedIndex = index;
    },
    onSubmit: function () {
      this.items.push(this.payment);
      this.reset();
      this.$emit("input", this.items);
    },
    onDelete: function () {
      if (this.index === this.checkedIndex) {
        this.$emit("onchange", null);
        this.checkedIndex = -1;
      }
      this.items.splice(this.index, 1);
      this.index = -1;
      this.selected = null;
      this.reset();
      this.$emit("input", this.items);
      this.confirmation.close();
    },
    reset: function () {
      this.payment = new Payment();
    },
  },
};
</script>
