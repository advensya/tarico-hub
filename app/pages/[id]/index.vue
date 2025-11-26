<script lang="ts" setup>
import UiFlow from "~/components/flow/index.vue";
import type { Flow, FlowData } from "~/components/flow/interface";

const props = defineProps<{ flow: Flow }>();
const data = ref<FlowData>({ state: "2", version: 1 });
</script>

<template>
  <div class="h-screen">
    <ui-flow :flow>
      <template #activator>
        <UButton label="Open" color="neutral" variant="subtle" />
      </template>
    </ui-flow>
  </div>
</template>
