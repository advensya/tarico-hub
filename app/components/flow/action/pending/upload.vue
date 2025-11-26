<script lang="ts" setup>
import * as _ from "lodash";
import type { IFlowNodeProps } from "../../interface";

const props = defineProps<IFlowNodeProps>();
const open = defineModel<boolean>("open");
const files = ref<File[]>([]);
const submiting = ref(false);

async function onSubmit() {
  if (!props.flowData) return;
  submiting.value = true;

  try {
    const formData = new FormData();

    for (const value of files.value) {
      formData.append(
        Math.random().toString().substring(2, 50).toString(),
        value
      );
    }

    const urls = await $fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = _.cloneDeep(props.flowData);

    data.files.push(
      ...urls.map((url, i) => {
        return {
          name: files.value[i]?.name,
          type: files.value[i]?.type,
          size: files.value[i]?.size,
          state: props.flowData?.state,
          url,
        };
      })
    );

    const result = await $fetch("/api/data", { method: "post", body: data });
    Utils.event.emit("data:update", result);

    open.value = false;
    files.value = [];
  } catch (error) {
  } finally {
    submiting.value = false;
  }
}
</script>

<template>
  <UModal v-model:open="open" :title="$t('flow.actions.pending.upload.title')">
    <slot name="activator" />

    <template #body>
      <UFormField name="file">
        <UFileUpload
          :label="$t('flow.actions.pending.upload.file.label')"
          :multiple="true"
          v-model="files"
          class="w-full min-h-48"
        />
      </UFormField>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <u-button class="cursor-pointer" :loading="submiting" @click="onSubmit">
          Enregistrer
          <!-- {{ $t("flow.actions.pending.upload.submit") }} -->
        </u-button>
      </div>
    </template>
  </UModal>
</template>
