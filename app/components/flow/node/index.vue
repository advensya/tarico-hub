<script lang="ts" setup>
import { Position } from "@vue-flow/core";
import type { IFlowNodeProps } from "../interface/index";

import UiHandle from "../handle.vue";
import UiOptions from "./options/index.vue";

const props = defineProps<IFlowNodeProps>();
const emit = defineEmits<{ (e: "addNode"): void }>();

function addNode() {
  emit("addNode");
}
</script>

<template>
  <ui-options v-bind="props">
    <div
      class="ui-flow-node relative max-w-64 bg-default border p-3 rounded-lg"
      :class="{
        'rounded-l-4xl': data.type === 'initial',
        'rounded-r-4xl': data.type === 'final',
        'border-primary! shadow-xl!': selected,
        'border-warning border-dashed': flowData?.state === id,
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
          :edges="flow.edges"
        />

        <!-- class="bg-transparent! border-transparent! w-2! h-2! [&.connecting]:bg-primary!" -->
      </template>

      <div class="flex items-center gap-2">
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

        <UAvatarGroup :max="2" size="xs">
          <UAvatar
            src="https://github.com/benjamincanac.png"
            alt="Benjamin Canac"
          />
          <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
          <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
        </UAvatarGroup>
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
          :edges="flow.edges"
        />
        <!-- hover:border-current! hover:bg-default! -->
      </template>
    </div>
  </ui-options>
</template>
