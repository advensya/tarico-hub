<script lang="ts" setup>
import type { IFlowNodeProps } from "../interface";

const props = defineProps<IFlowNodeProps>();
const open = defineModel<boolean>("open");
</script>

<template>
  <UModal v-model:open="open" :title="$t('flow.actions.approved.title')">
    <slot name="activator" />

    <template #body>
      <UFormField
        :label="$t('flow.actions.approved.comment.label')"
        name="comment"
      >
        <u-textarea class="w-full" :rows="8" />
      </UFormField>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton color="neutral" label="Dismiss" @click="open = false" />
        <UButton label="Success" />
      </div>
    </template>
  </UModal>
</template>
