<template>
  <component :is="errorPage" :error="error" :bg="background" />
</template>

<script>
import { Error401, Error404, Error500 } from "@/components/error";
export default {
  layout: "empty",
  components: {
    Error401,
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
        "blue-gray",
        "brown",
        "gray",
        "green",
        "indigo",
        "pin",
        "purple",
        "teal",
      ],
    };
  },
  computed: {
    errorPage() {
      switch (this.error.statusCode) {
        case 401:
          return Error401;
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
