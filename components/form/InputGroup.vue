<template>
  <gv-row>
    <gv-col :sm="6" :md="4" v-for="item in items" :key="item.id">
      <gv-input-box
        v-bind="$attrs"
        v-model="values"
        :label="item.text"
        :val="item.value"
        :checkbox="!radio"
      />
    </gv-col>
  </gv-row>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    value: Array,
    radio: Boolean
  },
  data() {
    return {
      values: [...this.value]
    };
  },
  watch: {
    values(val) {
      this.$emit("input", val);
    }
  }
};
</script>
