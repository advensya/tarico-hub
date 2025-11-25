<script lang="ts" setup>
import type { IFlowNodeProps } from "../../interface";

const props = defineProps<IFlowNodeProps>();
const open = defineModel<boolean>("open");
</script>

<template>
  <UModal v-model:open="open" :title="$t('flow.actions.pending.upload.title')">
    <slot name="activator" />

    <template #body>
      <UFormField name="file">
        <UFileUpload
          :label="$t('flow.actions.pending.upload.file.label')"
          :multiple="true"
          class="w-full min-h-48"
        />
      </UFormField>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <u-button>
          {{ $t("flow.actions.pending.upload.submit") }}
        </u-button>
      </div>
    </template>
  </UModal>
</template>
