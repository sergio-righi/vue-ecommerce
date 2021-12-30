<template>
  <Page :title="title">
    <!-- <template #content v-if="items.length">
      <gv-row>
        <gv-col>
        </gv-col>
      </gv-row>
    </template> -->
    <template #content>
      <NoRecord :message="$t('message.feedback.no_record')">
        <template #icon>
          <gv-icon value="truck-fast-outline" />
        </template>
      </NoRecord>
    </template>
  </Page>
</template>

<script>
import { NoRecord, Page } from "@/components";

import { mapGetters } from "vuex";
export default {
  components: {
    NoRecord,
    Page,
  },
  computed: {
    ...mapGetters("book", ["books"]),
  },
  data() {
    return {
      title: this.$t("page.order.title"),
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>
