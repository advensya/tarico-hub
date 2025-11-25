<script lang="ts" setup>
import UiFlow from "~/components/flow/index.vue";
import type { FlowData } from "./components/flow/interface";

import flow from "~/components/flow/default";

const data = ref<FlowData>({ state: "2" });

function onSubmit() {}
</script>

<template>
  <nuxt-layout>
    <ui-flow :data :flow>
      <template #activator>
        <UButton label="Open" color="neutral" variant="subtle" />
      </template>
    </ui-flow>
  </nuxt-layout>
</template>
