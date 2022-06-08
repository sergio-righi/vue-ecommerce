<template>
  <gv-row>
    <gv-col sm="4" md="2">
      <gv-input
        v-model="dimension.width"
        v-validation.required
        :label="$t('label.dimension.width')"
      />
    </gv-col>
    <gv-col sm="4" md="2">
      <gv-input
        v-model="dimension.height"
        v-validation.required
        :label="$t('label.dimension.height')"
      />
    </gv-col>
    <gv-col sm="4" md="2">
      <gv-input
        v-model="dimension.depth"
        v-validation.required
        :label="$t('label.dimension.depth')"
      />
    </gv-col>
    <gv-col sm="6" md="3">
      <gv-input
        v-model="dimension.weight"
        v-validation.required
        :label="$t('label.dimension.weight')"
      />
    </gv-col>
    <gv-col sm="6" md="3">
      <gv-input
        v-model="dimension.length"
        v-validation.required
        :label="$t('label.dimension.length')"
      />
    </gv-col>
  </gv-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { DimensionType } from "@/interfaces";

@Component
export default class Dimension extends Vue {
  @Prop({ default: () => <DimensionType>{} }) value!: DimensionType;

  dimension: DimensionType = this.value;

  @Watch("dimension")
  onDimensionChanged(value: string) {
    this.$emit("input", value);
  }
}
</script>
