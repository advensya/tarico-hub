<script lang="ts" setup>
import * as _ from "lodash";
import type { IFlowNodeProps } from "../../interface";
import { stateIcons } from "../../utils";

const props = defineProps<IFlowNodeProps & { nextState: string }>();
const open = defineModel<boolean>("open");

const nextState = computed(() => {
  return props.flow.nodes.find((f) => f.id === props.nextState);
});

const submiting = ref(false);
async function onSubmit() {
  if (!props.flowData) return;
  submiting.value = true;

  try {
    const data = _.cloneDeep(props.flowData);
    data.state = props.nextState;

    const result = await $fetch("/api/data", { method: "post", body: data });
    Utils.event.emit("data:update", result);

    open.value = false;
  } catch (error) {
  } finally {
    submiting.value = false;
  }
}
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

        <!-- {{ $t(`flow.options.next.${nextState.data?.state}.title`) }} -->
      </div>
    </template>

    <slot name="activator" />

    <template #body>
      <UFormField label="Commentaire" name="comment">
        <!-- :label="$t('flow.options.next.comment.label')" -->
        <u-textarea class="w-full" :rows="6" />
      </UFormField>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <u-button class="cursor-pointer" :loading="submiting" @click="onSubmit">
          Enregistrer
          <!-- {{ $t(`flow.options.next.${nextState?.data?.state}.submit`) }} -->
        </u-button>
      </div>
    </template>
  </UModal>
</template>
