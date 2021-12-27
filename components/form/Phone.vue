<template>
  <div class="phone-container">
    <form @submit.prevent="onSubmit">
      <gv-row>
        <gv-col sm="10">
          <gv-input
            ref="element"
            :label="$tc('label.phone', 1)"
            v-model="phone"
            v-mask="['+# (###) ### ####', '+## (##) # #### ####']"
            v-validation.required
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
          <gv-td>{{ item }}</gv-td>
          <gv-td fit>
            <gv-button-group sm>
              <gv-button @onclick="onUpdate(index)" button info>
                {{ $t("action.update") }}
              </gv-button>
              <gv-button @onclick="onDelete(index)" button error>
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
      phone: null,
      componentKey: 0,
      columns: [{ label: this.$t("label.number") }, { fit: true }]
    };
  },
  mounted() {
    this.items = [...this.value];
  },
  methods: {
    onSubmit: function() {
      if (this.isUpdate) {
        this.items[this.index] = this.phone;
        this.componentKey++;
        this.index = -1;
      } else {
        this.items.push(this.phone);
      }
      this.phone = null;
      this.$emit("input", this.items);
    },
    onDelete: function(index) {
      this.items.splice(index, 1);
      this.index = -1;
      this.phone = null;
    },
    onUpdate: function(index) {
      this.index = index;
      this.phone = this.items[index];
      this.element.focus();
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
