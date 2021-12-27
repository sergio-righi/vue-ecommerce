<template>
  <gv-card>
    <template #header>
      <gv-tile>
        <template #content>
          <gv-tile-header>{{ $t("label.payment_method") }}</gv-tile-header>
        </template>
      </gv-tile>
    </template>
    <template #content v-if="addresses.length">
      <gv-tile v-for="(item, index) in items" :key="item.id" activable>
        <template #leading>
          <gv-input-box
            name="payment"
            :val="item.id"
            v-model="selected"
            radio
          />
        </template>
        <template #content>
          <gv-tile-header sub> {{ item.number | masked }} </gv-tile-header>
        </template>
        <template #trailing>
          <gv-button-group sm>
            <gv-button @onclick="onUpdate(index)" info>
              {{ $t("action.update") }}
            </gv-button>
            <gv-button @onclick="onDelete(index)" error>
              {{ $t("action.delete") }}
            </gv-button>
          </gv-button-group>
        </template>
      </gv-tile>
      <gv-divider />
      <form @submit.prevent="onSubmit">
        <gv-row>
          <gv-col sm="6">
            <gv-input
              v-model="payment.cardholder"
              v-validation.required
              :label="$t('label.cardholder')"
            />
          </gv-col>
          <gv-col sm="6">
            <gv-input
              v-model="payment.number"
              v-validation.required
              :label="$t('label.number')"
              v-mask="'#### #### #### ####'"
            />
          </gv-col>
          <gv-col sm="6">
            <gv-picker
              v-model="payment.expirationMonth"
              is-month
              v-validation.required
              :locale="currentLocale"
              :label="$t('label.expiration_month')"
            />
          </gv-col>
          <gv-col sm="6">
            <gv-picker
              v-model="payment.expirationYear"
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
                    :val="item.id"
                    v-model="payment.billingAddress"
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
            <gv-button submit primary fit lg v-if="isUpdate">
              {{ $t("action.update") }} <gv-icon value="pencil" />
            </gv-button>
            <gv-button submit primary fit lg v-else>
              {{ $t("action.create") }} <gv-icon value="plus" />
            </gv-button>
          </gv-col>
        </gv-row>
      </form>
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
export default {
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
      payment: new Payment(),
      componentKey: 0,
    };
  },
  mounted() {
    this.items = [...this.value];
  },
  methods: {
    onSubmit: function () {
      if (this.isUpdate) {
        this.items[this.index] = this.payment;
        this.componentKey++;
        this.index = -1;
      } else {
        this.items.push(this.payment);
      }
      this.reset();
      this.$emit("input", this.items);
    },
    onDelete: function (index) {
      this.items.splice(index, 1);
      this.index = -1;
      this.selected = null;
      this.reset();
      this.$emit("input", this.items);
    },
    onUpdate: function (index) {
      this.index = index;
      this.payment = { ...this.items[index] };
      this.element.focus();
    },
    reset: function () {
      this.payment = new Payment();
    },
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    element: function () {
      return this.$refs.element;
    },
    isUpdate: function () {
      return this.index !== -1;
    },
  },
};
</script>
