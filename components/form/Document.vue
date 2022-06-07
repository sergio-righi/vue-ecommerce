<template>
  <div class="document-container">
    <form @submit.prevent="onSubmit">
      <gv-row>
        <gv-col sm="5">
          <gv-select
            ref="element"
            v-model="document.document"
            v-validation.required
            :label="$tc('label.document', 1)"
            :items="documentDropdown"
          />
        </gv-col>
        <gv-col sm="5">
          <gv-input
            v-model="document.number"
            v-validation.required
            :label="$t('label.number')"
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
    <gv-table v-if="items.length" :key="componentKey" style="margin-top: 16px">
      <template #head>
        <gv-th v-for="item in columns" :key="item._id" v-bind="item" />
      </template>
      <template #body>
        <gv-tr v-for="(item, index) in items" :key="item._id">
          <gv-td>{{ $t(`${$enum.mapper.documents[item.document]}`) }}</gv-td>
          <gv-td>{{ item.number }}</gv-td>
          <gv-td fit>
            <gv-button-group sm>
              <gv-button info @onclick="onUpdate(index)">
                {{ $t("action.update") }}
              </gv-button>
              <gv-button error @onclick="onDelete(index)">
                {{ $t("action.delete") }}
              </gv-button>
            </gv-button-group>
          </gv-td>
        </gv-tr>
      </template>
    </gv-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { helpers } from "@/utils";
import { DocumentType } from "@/interfaces";

@Component
export default class Document extends Vue {
  @Prop({ default: () => [] as Array<DocumentType> })
  value!: Array<DocumentType>;

  items: Array<DocumentType> = [];
  index: number = -1;
  document: DocumentType = {} as DocumentType;
  componentKey: number = 0;
  columns: any = [
    { label: this.$tc("label.document", 1) },
    { label: this.$t("label.number") },
    { fit: true },
  ];

  mounted() {
    this.items = [...this.value];
  }

  get element(): any {
    return this.$refs.element;
  }

  get isUpdate(): boolean {
    return this.index !== -1;
  }

  get documentDropdown() {
    return helpers.toDropdownList(this.$enum.mapper.documents, this.$i18n);
  }

  onSubmit() {
    if (this.isUpdate) {
      this.items[this.index] = { ...this.document };
      this.componentKey++;
      this.index = -1;
    } else {
      this.items.push(this.document);
    }
    this.document = {} as DocumentType;
    this.$emit("input", this.items);
  }

  onDelete(index: number) {
    this.items.splice(index, 1);
    this.index = -1;
    this.document = {} as DocumentType;
  }

  onUpdate(index: number) {
    this.index = index;
    this.document = { ...this.items[index] };
    this.element.focus();
  }
}
</script>
