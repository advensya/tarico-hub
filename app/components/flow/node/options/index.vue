<script lang="ts" setup>
import { useVueFlow } from "@vue-flow/core";
import type { IFlowNodeProps } from "../../interface/index";
import { WorkflowParser } from "../../utils/parser";
import type { DropdownMenuItem } from "@nuxt/ui";
import { stateIcons } from "../../utils";

import UiOptionName from "./name.vue";
import UiOptionNext from "./next.vue";
import UiFlowActionPendingUpload from "../../action/pending/upload.vue";

const props = defineProps<IFlowNodeProps>();
const { removeNodes } = useVueFlow();

const isLabelEditOpen = ref(false);
const open = ref({
  next: { open: false, state: "" },

  action: {
    pendingUpload: false,
  },
});

const actions = computed(() => {
  const items: DropdownMenuItem[] = [];

  if (props.flowData?.state === props.id) {
    const parser = new WorkflowParser();
    const states = parser.parseVueFlow(props.flow);
    const state = states[props.flowData.state];
    const stateNode = props.flow.nodes.find((f) => f.id === state?.id);

    if (stateNode && state) {
      if (stateNode.data?.state === "pending") {
        items.push({
          label: "upload",
          icon: "i-lucide-upload",
          class: "cursor-pointer",
          onSelect: () => {
            open.value.action.pendingUpload = true;
          },
        });
      }

      for (const key of Object.keys(stateIcons)) {
        if (Object.keys(state.on).includes(key)) {
          items.push({
            label: key,
            icon: stateIcons[key as "pending"],
            class: "cursor-pointer",
            onSelect: () => {
              open.value.next = { open: true, state: state.on[key]! };
            },
          });
        }
      }
    }
  }

  return items;
});

const items = computed(() => {
  const items: DropdownMenuItem[][] = [[...actions.value]];

  if (!props.flowData) {
    items.push([
      {
        label: "label",
        icon: "i-lucide-pen",
        onSelect: () => {
          isLabelEditOpen.value = true;
        },
      },
      {
        label: "remove",
        icon: "i-lucide-trash-2",
        onSelect: () => {
          removeNodes([props.id]);
        },
      },
    ]);
  }

  return items.filter((i) => i.length);
});
</script>

<template>
  <UContextMenu :items="items">
    <template v-if="!items.length" #content-bottom>
      <div class="max-w-xs">
        <UEmpty description="Aucune option disponible">
          <template #leading>
            <u-icon
              name="i-material-symbols-light-page-menu-ios-outline"
              size="48"
            />
          </template>
        </UEmpty>
      </div>
    </template>
    <slot />
  </UContextMenu>

  <ui-option-next
    v-bind="props"
    :next-state="open.next.state"
    v-model:open="open.next.open"
  />

  <UiOptionName v-model="props.data.label" v-model:open="isLabelEditOpen">
  </UiOptionName>

  <ui-flow-action-pending-upload
    v-bind="props"
    v-model:open="open.action.pendingUpload"
  />
</template>
