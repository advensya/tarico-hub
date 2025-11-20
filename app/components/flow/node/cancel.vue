<script lang="ts" setup>
import UiNode from "./index.vue";
import type { IFlowNodeProps } from "../interface/index";

const props = defineProps<IFlowNodeProps>();
</script>

<template>
  <ui-node v-bind="props"> </ui-node>
</template>
