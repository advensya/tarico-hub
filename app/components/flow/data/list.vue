<script lang="ts" setup>
import type { FlowData } from "../interface";

const props = defineProps<{ flowId: string }>();
const searchTerm = ref("");

const { data: datas, status } = await useFetch(
  `/api/flow/${props.flowId}/datas`,
  {
    method: "get",
    transform: (result: FlowData[]) => {
      return (
        result?.map((dt) => ({
          id: dt.id,
          label: dt.name,
          icon: "i-lucide-git-merge",
          size: "lg",
          to: { name: "id-data", params: { data: dt.id } },
          // suffix: dt.flowID,
        })) || []
      );
    },
    lazy: true,
  }
);

const groups = computed(() => [
  {
    id: "users",
    items: datas.value || [],
    ignoreFilter: true,
  },
]);
</script>

<template>
  <u-modal title="Liste des process">
    <slot name="activator" />

    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        :ui="{
          item: 'p-3!',
          itemLabelSuffix: 'ml-auto!',
        }"
        placeholder="Rechercher un process..."
        class="h-80"
      />

      <!-- <template v-if="datas">
        <u-button
          v-for="(data, d) in datas"
          :key="d"
          variant="ghost"
          class="justify-start"
          size="lg"
          block
        >
          dfsdf
        </u-button>
      </template> -->
    </template>
  </u-modal>
</template>
