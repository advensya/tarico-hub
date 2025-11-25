<script lang="ts" setup>
import type { IFlowNodeProps } from "../../interface";
import { stateIcons } from "../../utils";

const props = defineProps<IFlowNodeProps & { nextState: string }>();
const open = defineModel<boolean>("open");

const nextState = computed(() => {
  return props.flow.nodes.find((f) => f.id === props.nextState);
});
</script>

<template>
  <UModal v-model:open="open">
    <template v-if="nextState" #title>
      <div class="flex gap-2">
        <u-icon
          v-if="nextState.data?.state"
          :name="stateIcons[nextState.data.state as 'pending']"
          size="24"
        />

        {{ $t(`flow.options.next.${nextState.data?.state}.title`) }}
      </div>
    </template>

    <slot name="activator" />

    <template #body>
      <UFormField :label="$t('flow.options.next.comment.label')" name="comment">
        <u-textarea class="w-full" :rows="6" />
      </UFormField>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <u-button>
          {{ $t(`flow.options.next.${nextState?.data?.state}.submit`) }}
        </u-button>
      </div>
    </template>
  </UModal>
</template>
