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
      <gv-tile v-for="(item, index) in items" :key="item.id" activable>
        <template #leading>
          <gv-input-box
            name="address"
            :val="item.id"
            v-model="selected"
            @change="onChange(item, index)"
            radio
          />
        </template>
        <template #content>
          <gv-tile-header sub>
            {{ item.number }} {{ item.street }} - {{ item.city }},
            {{ item.country }} ({{ item.zipcode }})
          </gv-tile-header>
        </template>
        <template #trailing>
          <gv-button-group sm>
            <gv-button @onclick="onUpdate(index)" info>
              {{ $t("action.update") }}
            </gv-button>
            <gv-button @onclick="onRequestConfirmation(index)" error>
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
          <gv-space x>
            <form @submit.prevent="onSubmit">
              <gv-row>
                <gv-col sm="4">
                  <gv-input
                    ref="element"
                    :label="$t('label.country')"
                    v-model="address.country"
                    v-validation.required.alpha
                  />
                </gv-col>
                <gv-col sm="4">
                  <gv-input
                    :label="$t('label.province')"
                    v-model="address.province"
                    v-mask="'A*'"
                  />
                </gv-col>
                <gv-col sm="4">
                  <gv-input
                    :label="$t('label.city')"
                    v-model="address.city"
                    v-validation.required.alpha
                  />
                </gv-col>
                <gv-col sm="4">
                  <gv-input
                    :label="$t('label.street')"
                    v-model="address.street"
                    v-validation.required.alpha
                    v-validation.required
                  />
                </gv-col>
                <gv-col sm="2">
                  <gv-input
                    :label="$t('label.zipcode')"
                    v-model="address.zipcode"
                    v-mask="['#####-###', 'XXX XXX']"
                    v-validation.required
                  />
                </gv-col>
                <gv-col sm="2">
                  <gv-input
                    :label="$t('label.number')"
                    v-model="address.number"
                    v-mask="'#*'"
                    v-validation.required
                  />
                </gv-col>
                <gv-col sm="2">
                  <gv-input
                    :label="$t('label.unit')"
                    v-model="address.unit"
                    v-mask="'#*'"
                  />
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
          </gv-space>
        </template>
      </gv-tile>
      <DialogDelete ref="confirmation" :on-confirm="onDelete" />
    </template>
  </gv-card>
</template>

<script>
import { Address } from "@/models";
import { helpers } from "@/utils";
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
  },
  data() {
    return {
      items: [],
      index: -1,
      selected: null,
      checkedIndex: -1,
      address: new Address(),
      componentKey: 0,
    };
  },
  mounted() {
    this.items = [...this.value];
  },
  computed: {
    element: function () {
      return this.$refs.element;
    },
    isUpdate: function () {
      return this.index !== -1;
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
      this.checkedIndex = index;
      this.$emit("onchange", item);
    },
    onSubmit: function () {
      if (this.isUpdate) {
        this.items[this.index] = this.address;
        this.componentKey++;
        this.index = -1;
      } else {
        this.address.cost = helpers.randomFloat(10, 40);
        this.items.push(this.address);
      }
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
    onUpdate: function (index) {
      this.index = index;
      this.address = { ...this.items[index] };
      this.element.focus();
    },
    reset: function () {
      this.address = new Address();
    },
  },
};
</script>
