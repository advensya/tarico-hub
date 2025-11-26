<script lang="ts" setup>
import UiFlow from "~/components/flow/index.vue";
import type { Flow } from "~/components/flow/interface";
defineProps<{ flow: Flow }>();
</script>

<template>
  <div class="h-screen w-full">
    <ui-flow :flow> </ui-flow>
  </div>
</template>
