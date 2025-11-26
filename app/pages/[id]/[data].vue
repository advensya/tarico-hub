<script lang="ts" setup>
import type { FlowData, Flow } from "~/components/flow/interface";
import UiFlow from "~/components/flow/index.vue";

defineProps<{ flow: Flow }>();

const {
  data,
  pending: fetching,
  refresh,
} = await useFetch<FlowData>(`/api/data/${Use.route.params.data}`, {
  method: "get",
});
</script>

<template>
  <div
    v-if="fetching"
    class="w-screen h-screen flex items-center justify-center"
  >
    <u-icon name="i-line-md-loading-twotone-loop" size="42" />
  </div>

  <ui-flow v-else-if="data" :flow :data> </ui-flow>
</template>
