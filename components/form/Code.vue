<template>
  <div class="code-container">
    <input
      v-for="(item, index) in Number(length)"
      :key="index"
      ref="elements"
      v-model="code[index]"
      @input="onInput($event, index)"
      @focus="onFocus"
      @keydown="onKeydown($event, index)"
      autocomplete="off"
      :autofocus="index === 0"
      required
    />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    length: {
      default: 6,
      type: [Number, String]
    }
  },
  data() {
    return {
      code: []
    };
  },
  created() {
    this.set(this.value);
  },
  computed: {
    isDone() {
      return (
        this.code.filter(x => /\S/.test(x)).join("").length ===
        Number(this.length)
      );
    },
    elements() {
      return this.$refs.elements;
    }
  },
  methods: {
    onInput: function(event, index) {
      const [first, ...rest] = event.target.value;
      this.code[index] = first ?? "";
      if (first && index !== this.elements.length - 1) {
        const element = this.elements[index + 1];
        element.focus();
        element.value = rest.join("");
        element.dispatchEvent(new Event("input"));
      } else if (first && index === this.elements.length - 1) {
        if (this.isDone) {
          this.elements[index].blur();
          this.$emit("ondone", this.code.join(""));
        }
      }
    },
    onKeydown: function(event, index) {
      if (event.keyCode === 8 && event.target.value === "") {
        this.elements[Math.max(0, index - 1)].focus();
      }
    },
    onFocus: function(event) {
      event.target.select();
    },
    set: function(value) {
      const code = value?.split("") ?? "";
      this.code =
        code.length === Number(this.length)
          ? code
          : Array.from({ length: Number(this.length) }, () => "");
    }
  },
  watch: {
    value(val) {
      this.set(val);
    }
  }
};
</script>

<!--<style lang="scss">
@import "scss/components/code.scss";
</style>-->
