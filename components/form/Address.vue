<template>
  <div class="address-container">
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
    <gv-table :key="componentKey" v-if="items.length" style="margin-top: 16px">
      <template #head>
        <gv-th v-for="item in columns" :key="item.id" v-bind="item" />
      </template>
      <template #body>
        <gv-tr v-for="(item, index) in items" :key="item.id">
          <gv-td>{{ item.number }} {{ item.street }}</gv-td>
          <gv-td>{{ item.city }} - {{ item.country }}</gv-td>
          <gv-td>{{ item.zipcode }}</gv-td>
          <gv-td fit>
            <gv-button-group sm>
              <gv-button @onclick="onUpdate(index)" info>
                {{ $t("action.update") }}
              </gv-button>
              <gv-button @onclick="onDelete(index)" error>
                {{ $t("action.delete") }}
              </gv-button>
            </gv-button-group>
          </gv-td>
        </gv-tr>
      </template>
    </gv-table>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      items: [],
      index: -1,
      address: {
        unit: null,
        city: null,
        street: null,
        number: null,
        country: null,
        zipcode: null,
        province: null
      },
      componentKey: 0,
      columns: [
        { label: this.$t("label.street") },
        { label: this.$t("label.city") },
        { label: this.$t("label.zipcode") },
        { fit: true }
      ]
    };
  },
  mounted() {
    this.items = [...this.value];
  },
  methods: {
    onSubmit: function() {
      if (this.isUpdate) {
        this.items[this.index] = this.address;
        this.componentKey++;
        this.index = -1;
      } else {
        this.items.push(this.address);
      }
      this.reset();
      this.$emit("input", this.items);
    },
    onDelete: function(index) {
      this.items.splice(index, 1);
      this.index = -1;
      this.reset();
    },
    onUpdate: function(index) {
      this.index = index;
      this.address = { ...this.items[index] };
      this.element.focus();
    },
    reset: function() {
      this.address = {
        unit: null,
        city: null,
        street: null,
        number: null,
        country: null,
        zipcode: null,
        province: null
      };
    }
  },
  computed: {
    element: function() {
      return this.$refs.element;
    },
    isUpdate: function() {
      return this.index !== -1;
    }
  }
};
</script>
