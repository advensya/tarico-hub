<script lang="ts" setup>
import { computed } from "vue";
import type { EdgeProps } from "@vue-flow/core";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useVueFlow,
} from "@vue-flow/core";
import type { OneFlow, FlowData } from "./interface";

const props = defineProps<EdgeProps & { flow: OneFlow; flowData?: FlowData }>();

const { removeEdges } = useVueFlow();

const path = computed(() => getBezierPath(props));
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <BaseEdge :path="path[0]" marker-end="url(#arrow)" />

  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="nodrag nopan"
    >
      <u-button
        v-if="!flowData"
        size="xs"
        icon="i-lucide-trash-2"
        class="rounded-full cursor-pointer"
        color="error"
        @click="removeEdges(id)"
      >
      </u-button>
    </div>
  </EdgeLabelRenderer>
</template>

<style>
.edgebutton {
  border-radius: 999px;
  cursor: pointer;
}

.edgebutton:hover {
  box-shadow: 0 0 0 2px pink, 0 0 0 4px #f05f75;
}
</style>
