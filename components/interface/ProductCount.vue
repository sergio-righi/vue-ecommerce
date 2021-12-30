<template>
  <div class="product-count">
    <gv-icon
      value="minus-circle"
      @onclick="decrease"
      :class="{ disabled: isMin }"
    />
    <input
      type="number"
      :min="min"
      :max="max"
      step="1"
      v-model="input"
      @blur="onBlur"
      @focus="onFocus"
      :disabled="isMin && isMax"
    />
    <gv-icon
      value="plus-circle"
      @onclick="increase"
      :class="{ disabled: isMax }"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: [Number, String],
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      input: null,
    };
  },
  created() {
    this.config();
  },
  computed: {
    isMin() {
      return this.input === this.min;
    },
    isMax() {
      return this.input === this.max;
    },
  },
  methods: {
    onFocus: function (event) {
      event.target.select();
    },
    onBlur: function () {
      this.input = this.between(this.input);
    },
    increase: function () {
      this.input = this.input >= this.max ? this.max : this.input + 1;
    },
    decrease: function () {
      this.input = this.input <= this.min ? this.min : this.input - 1;
    },
    config: function () {
      this.input = this.between(Number(this.value), this.min, this.max);
    },
    between: function (val) {
      return val < this.min ? this.min : val > this.max ? this.max : val;
    },
  },
  watch: {
    value() {
      this.config();
    },
    input(val) {
      val = Number(val);
      if (val >= this.min && val <= this.max) {
        this.$emit("oninput", val);
      }
    },
  },
};
</script>
