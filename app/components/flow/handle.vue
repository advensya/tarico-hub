<script lang="ts" setup>
import {
  Handle,
  Position,
  type Edge,
  type ValidConnectionFunc,
} from "@vue-flow/core";
import type { IFlowConnecting } from "./interface";

const props = defineProps({
  isValidConnection: {
    type: Function as PropType<ValidConnectionFunc>,
    required: true,
  },
  connecting: { type: Object as PropType<IFlowConnecting> },
  nodeId: { type: String, required: true },
  index: { type: Number, required: true },
  position: { type: String as PropType<Position>, required: true },
  edges: { type: Array as PropType<Edge[]>, required: true },
});

const emit = defineEmits<{ (e: "addNode"): void }>();

const id = computed(() => {
  return `${props.nodeId}-handle-${props.position}-${props.index}`;
});

const isLink = computed(() => {
  return !!props.edges.find((e) =>
    [e.sourceHandle, e.targetHandle].includes(id.value)
  );
});
</script>

<template>
  <Handle
    :id
    :is-valid-connection="isValidConnection"
    :style="{ top: `${index * (100 / 6)}%` }"
    :position
    :connectable="!isLink"
    :class="[
      isLink || connecting?.start.handleId === id
        ? 'bg-primary!'
        : 'bg-transparent! hover:bg-primary-50!',
    ]"
    class="border-transparent! w-2! h-2!"
  >
  </Handle>
</template>
