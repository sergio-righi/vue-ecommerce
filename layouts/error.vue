<template>
  <component :is="errorPage" :error="error" :bg="background" />
</template>

<script>
import { Error400, Error404, Error500 } from "@/components/error";
export default {
  layout: "empty",
  components: {
    Error400,
    Error404,
    Error500,
  },
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      colors: [
        "blue-gray-400",
        "brown-400",
        "gray-400",
        "green-400",
        "indigo-400",
        "pink-400",
        "purple-400",
        "teal-400",
      ],
    };
  },
  computed: {
    errorPage() {
      switch (this.error.statusCode) {
        case 400:
          return Error400;
        case 404:
          return Error404;
      }
      return Error500;
    },
    background() {
      return `bg-${
        this.colors[Math.floor(Math.random() * this.colors.length)]
      }`;
    },
  },
};
</script>
