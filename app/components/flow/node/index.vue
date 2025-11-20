<script lang="ts" setup>
import { Position } from "@vue-flow/core";
import type { IFlowNodeProps } from "../interface/index";

import UiHandle from "../handle.vue";
import UiOptions from "./options/index.vue";

const props = defineProps<IFlowNodeProps>();
const emit = defineEmits<{ (e: "addNode"): void }>();

// function isValidConnection(connection: Connection) {
//   if (connection.source === connection.target) return false;
//   return true;
// }

function addNode() {
  emit("addNode");
}
</script>

<template>
  <div
    class="ui-flow-node relative max-w-64 bg-default border p-3 rounded-lg"
    :class="{
      'rounded-l-4xl': data.type === 'initial',
      'rounded-r-4xl': data.type === 'final',
      'border-primary shadow-xl!': selected,
    }"
  >
    <template v-if="data.type !== 'initial'">
      <ui-handle
        v-for="i in 5"
        :key="i"
        :index="i"
        :is-valid-connection="isValidConnection"
        :position="Position.Left"
        :node-id="id"
        :edges
      />

      <!-- class="bg-transparent! border-transparent! w-2! h-2! [&.connecting]:bg-primary!" -->
    </template>

    <div class="absolute -top-3 right-1.5 z-20">
      <UiOptions v-bind="props" />
    </div>

    <div class="flex items-center gap-2">
      <!-- i-lucide-file-check-corner : aprpove -->
      <!-- i-lucide-check-check: approve -->
      <!-- : chargé -->

      <!-- i-lucide-file-pen-line: progress -->
      <!-- i-lucide-file-x: rejeté -->

      <u-icon
        v-if="data.state === 'draft'"
        name="i-lucide-squircle-dashed"
        size="36"
      />

      <u-icon
        v-else-if="data.state === 'close'"
        name="i-lucide-panel-top-close"
        size="36"
      />

      <u-icon
        v-else-if="data.state === 'cancel'"
        name="i-mdi-progress-close"
        size="36"
      />

      <u-icon
        v-else-if="data.state === 'pending'"
        name="i-lucide-file-pen-line"
        size="36"
      />

      <u-icon
        v-else-if="data.state === 'processed'"
        name="i-lucide-file-down"
        size="36"
      />

      <u-icon
        v-else-if="data.state === 'approved'"
        name="i-lucide-check-check"
        size="36"
      />

      <u-icon v-else name="i-lucide-file-x" size="36" />

      <div
        style="
          display: -webkit-box;
          -webkit-line-clamp: 1; /* Limite le texte à 5 lignes */
          line-clamp: 1; /* Limite le texte à 5 lignes */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        "
      >
        {{ props.data.label }}
      </div>
    </div>

    <!-- <slot /> -->

    <template v-if="data.type !== 'final'">
      <ui-handle
        v-for="i in 5"
        :key="i"
        :index="i"
        :is-valid-connection="isValidConnection"
        :position="Position.Right"
        :node-id="id"
        :connecting
        :edges
      />
      <!-- hover:border-current! hover:bg-default! -->
    </template>
  </div>
</template>
