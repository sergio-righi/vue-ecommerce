<template>
  <div class="document-container">
    <form @submit.prevent="onSubmit">
      <gv-row>
        <gv-col sm="5">
          <gv-select
            :label="$tc('label.document', 1)"
            ref="element"
            v-model="document.document"
            :items="documentDropdown"
            v-validation.required
          />
        </gv-col>
        <gv-col sm="5">
          <gv-input
            :label="$t('label.number')"
            v-model="document.number"
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
          <gv-td>{{ item.document | documentName }}</gv-td>
          <gv-td>{{ item.number }}</gv-td>
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
import { helpers } from "utils";
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
      document: {
        number: null,
        document: null
      },
      componentKey: 0,
      columns: [
        { label: this.$tc("label.document", 1) },
        { label: this.$t("label.number") },
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
        this.items[this.index] = this.document;
        this.componentKey++;
        this.index = -1;
      } else {
        this.items.push(this.document);
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
      this.document = { ...this.items[index] };
      this.element.focus();
    },
    reset: function() {
      this.document = {
        number: null,
        document: null
      };
    }
  },
  filters: {
    documentName: function(key) {
      return this.$enum.mapper.documents.find(item => item.key === key)?.value;
    }
  },
  computed: {
    element: function() {
      return this.$refs.element;
    },
    isUpdate: function() {
      return this.index !== -1;
    },
    documentDropdown: function() {
      return [];
      // return helpers.toDropdownList(this.$enum.mapper.documents, this.$i18n);
    }
  }
};
</script>
