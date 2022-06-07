<template>
  <gv-card>
    <template #header>
      <gv-tile>
        <template #content>
          <gv-tile-header>{{ $t("label.shipping_address") }}</gv-tile-header>
        </template>
      </gv-tile>
    </template>
    <template #content>
      <gv-tile v-for="(item, index) in items" :key="item.id">
        <template #leading>
          <gv-input-box
            name="address"
            :val="index"
            v-model="selected"
            @change="onChange(item, index)"
            radio
          />
        </template>
        <template #content>
          <gv-tile-header sub>
            {{ item | address($i18n) }}
          </gv-tile-header>
        </template>
        <template #trailing>
          <gv-button-group sm>
            <gv-button @onclick="onUpdate(index)" info>
              {{ $t("action.update") }}
            </gv-button>
            <gv-button @onclick="onConfirm(index)" error>
              {{ $t("action.delete") }}
            </gv-button>
          </gv-button-group>
        </template>
      </gv-tile>
      <gv-divider />
      <gv-tile :active="items.length === 0">
        <template #content>
          <gv-tile-header sub>
            {{ $t("message.checkout.add_address") }}
          </gv-tile-header>
        </template>
        <template #expandable>
          <gv-space x y>
            <form @submit.prevent="onSubmit">
              <gv-row>
                <gv-col sm="4">
                  <gv-select
                    ref="element"
                    v-model="address.country"
                    v-validation.required
                    :label="$tc('label.address.country', 1)"
                    :items="countryDropdown"
                  />
                </gv-col>
                <gv-col sm="4">
                  <gv-input
                    v-model="address.province"
                    v-mask="'AA'"
                    :label="$t('label.address.province')"
                  />
                </gv-col>
                <gv-col sm="4">
                  <gv-input
                    v-model="address.city"
                    v-validation.required.alpha
                    :label="$t('label.address.city')"
                  />
                </gv-col>
                <gv-col sm="8">
                  <gv-input
                    v-model="address.street"
                    v-validation.required.alpha
                    v-validation.required
                    :label="$t('label.address.street')"
                  />
                </gv-col>
                <gv-col sm="4">
                  <gv-input
                    v-model="address.number"
                    v-mask="'#*'"
                    v-validation.required
                    :label="$t('label.address.number')"
                  />
                </gv-col>
                <gv-col sm="3">
                  <gv-input
                    v-model="address.unit"
                    :label="$t('label.address.unit')"
                  />
                </gv-col>
                <gv-col sm="3">
                  <gv-input
                    v-model="address.zipcode"
                    v-mask="['#####-###', 'XXX XXX']"
                    v-validation.required
                    :label="$t('label.address.zipcode')"
                  />
                </gv-col>
                <gv-col sm="4">
                  <gv-select
                    v-model="address.type"
                    v-validation.required
                    :label="$tc('label.address.type', 1)"
                    :items="addressesDropdown"
                  />
                </gv-col>
                <gv-col sm="2">
                  <gv-button v-if="isUpdate" submit primary stretch lg>
                    {{ $t("action.update") }} <gv-icon value="pencil" />
                  </gv-button>
                  <gv-button v-else submit primary stretch lg>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { helpers } from "@/utils";
import { AddressType } from "@/interfaces";
import { DialogDelete } from "@/components/helper";

@Component({
  components: {
    DialogDelete,
  },
})
export default class Address extends Vue {
  @Prop({ default: () => [] as Array<AddressType> })
  value!: Array<AddressType>;

  items: Array<AddressType> = [];
  index: number = -1;
  checkedIndex: number = -1;
  selected: number | null = null;
  address: AddressType = {} as AddressType;
  componentKey: number = 0;

  get element(): any {
    return this.$refs.element;
  }

  get isUpdate(): boolean {
    return this.index !== -1;
  }

  get confirmation(): any {
    return this.$refs.confirmation;
  }

  get countryDropdown() {
    return helpers.toDropdownList(this.$enum.mapper.countries, this.$i18n);
  }

  get addressesDropdown() {
    return helpers.toDropdownList(this.$enum.mapper.addresses, this.$i18n);
  }

  mounted() {
    this.items = [...this.value];
  }

  onSubmit() {
    if (this.isUpdate) {
      this.items[this.index] = { ...this.address };
      this.componentKey++;
      this.index = -1;
    } else {
      this.items.push(this.address);
    }
    this.address = {} as AddressType;
    this.$emit("input", this.items);
  }

  onConfirm(index: number) {
    this.index = index;
    this.confirmation.referece.open();
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

  onUpdate(index: number) {
    this.index = index;
    this.address = { ...this.items[index] };
    this.element.focus();
  }
}
</script>
