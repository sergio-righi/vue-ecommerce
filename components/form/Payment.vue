<template>
  <gv-card>
    <template #header>
      <gv-tile>
        <template #content>
          <gv-tile-header>{{ $t("label.payment_method") }}</gv-tile-header>
        </template>
      </gv-tile>
    </template>
    <template #content>
      <gv-tile v-for="(item, index) in items" :key="item.id">
        <template #leading>
          <gv-input-box
            name="payment"
            :val="index"
            v-model="selected"
            @change="onChange(item, index)"
            radio
          />
        </template>
        <template #content>
          <gv-tile-header sub>
            {{ getNumber(item.number) | masked }}
          </gv-tile-header>
        </template>
        <template #trailing>
          <gv-button @onclick="onConfirm(index)" error sm>
            {{ $t("action.delete") }}
          </gv-button>
        </template>
      </gv-tile>
      <gv-divider />
      <gv-tile :active="items.length === 0">
        <template #content>
          <gv-tile-header sub>
            {{ $t("message.checkout.add_payment") }}
          </gv-tile-header>
        </template>
        <template #expandable>
          <gv-space x y>
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
                    v-validation.required="{ minLength: 16 }"
                    :label="$t('label.number')"
                    v-mask="'################'"
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
                <gv-col sm="8">
                  <gv-select
                    v-model="payment.billingAddress"
                    v-validation.required
                    :label="$tc('label.billing_address', 1)"
                    :items="addressesDropdown"
                  />
                </gv-col>
                <gv-col sm="4">
                  <gv-input
                    v-model="payment.cvv"
                    v-validation.required="{ minLength: 3 }"
                    :label="$t('label.cvv')"
                    v-mask="'###'"
                  />
                </gv-col>
                <gv-col sm="2">
                  <gv-button submit primary>
                    {{ $t("action.create") }} <gv-icon value="plus" />
                  </gv-button>
                </gv-col>
              </gv-row>
            </form>
          </gv-space>
        </template>
      </gv-tile>
      <DialogDelete ref="confirmation" :on-confirm="onDelete" />
    </template>
  </gv-card>
</template>

<script lang="ts">
import { crypto } from "@/utils";
import { Component, Prop, Vue } from "vue-property-decorator";
import { AddressType, CardType } from "@/interfaces";
import { DialogDelete } from "@/components/helper";

@Component({
  components: {
    DialogDelete,
  },
})
export default class Payment extends Vue {
  @Prop({ default: () => [] as Array<CardType> }) value!: Array<CardType>;
  @Prop({ default: () => [] as Array<AddressType> })
  addresses!: Array<AddressType>;

  items: Array<CardType> = [];
  index: number = -1;
  checkedIndex: number = -1;
  selected: number | null = null;
  payment: CardType = {} as CardType;
  componentKey: number = 0;

  get element(): any {
    return this.$refs.element;
  }

  get confirmation(): any {
    return this.$refs.confirmation;
  }

  get currentLocale(): any {
    return this.$i18n.locale;
  }

  get addressesDropdown() {
    return this.addresses.map((item) => ({
      value: item,
      text: this.$options.filters?.address(item, this.$i18n) ?? "",
    }));
  }

  mounted() {
    this.items = [...this.value];
  }

  onSubmit() {
    this.payment.number = crypto.encrypt(this.payment.number as string);
    this.items.push(this.payment);
    this.payment = {} as CardType;
    this.$emit("input", this.items);
  }

  onConfirm(index: number) {
    this.index = index;
    this.confirmation.reference.open();
  }

  onDelete() {
    if (this.index === this.checkedIndex) {
      this.$emit("onchange", null);
      this.checkedIndex = -1;
    }
    this.items.splice(this.index, 1);
    this.index = -1;
    this.selected = null;
    this.$emit("input", this.items);
    this.confirmation.reference.close();
  }

  onChange(item: any, index: number) {
    this.checkedIndex = index;
    this.$emit("onchange", item);
  }

  getNumber(number: string) {
    return crypto.decrypt(number);
  }
}
</script>
