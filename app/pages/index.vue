<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import { getLatestVersion } from "~/tools/flow";
import type { Flow } from "~/components/flow/interface";

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UPageLinks = resolveComponent("UPageLinks");

const {
  data: flows,
  pending: fetching,
  refresh,
} = await useFetch<Flow[]>("/api/flow", { method: "get" });

type DataTable = {
  id: string;
  name: string;
  version: number | undefined;
  lastUpdated: Date | undefined;
};

const data = computed(() => {
  if (!flows.value) return [];

  return flows.value.map((flow) => {
    const version = getLatestVersion(flow);
    return {
      id: flow.id,
      name: flow.name || "New Workflow",
      version: version?.version,
      lastUpdated: version?.createdAt,
    };
  });
});

const columns: TableColumn<DataTable>[] = [
  {
    accessorKey: "name",
    header: "Nom",

    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(UPageLinks, {
          links: [
            {
              label: row.getValue("name"),
              icon: "i-lucide-rocket",
              to: { name: "id", params: { id: data.value[row.index]?.id } },
            },
          ],
        })
      );
    },
  },

  {
    accessorKey: "version",
    header: () => h("div", { class: "" }, "Version"),
  },

  {
    accessorKey: "lastUpdated",
    header: "Dernier modification",
    cell: ({ row }) => {
      return new Date(row.getValue("lastUpdated")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },

  {
    id: "actions",
    header: () =>
      h("div", { class: "text-right" }, [
        h(UButton, {
          icon: "i-lucide-refresh-ccw",
          color: "neutral",
          variant: "soft",
          class: "ml-auto cursor-pointer",
          label: "Actualiser",
          loading: fetching.value,
          onClick: () => refresh(),
        }),
      ]),

    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            })
        )
      );
    },
  },
];

function getRowItems(row: Row<DataTable>) {
  return [
    {
      icon: "i-lucide-plus",
      label: "Démarer un flow",
      class: "cursor-pointer",
    },

    {
      icon: "i-lucide-list-tree",
      label: "Flows",
      class: "cursor-pointer",
    },

    {
      type: "separator",
    },

    {
      label: "Modifier",
      icon: "i-lucide-pen",
      class: "cursor-pointer",
    },
    {
      label: "Supprimer",
      icon: "i-lucide-trash-2",
      class: "cursor-pointer",
    },
  ];
}
</script>

<template>
  <UDashboardPanel :ui="{ body: 'p-0!' }" resizable>
    <template #header>
      <UDashboardNavbar class="h-[46px]">
        <template #leading> </template>

        <template #right>
          <u-button
            size="lg"
            color="neutral"
            variant="soft"
            icon="i-lucide-plus"
            class="cursor-pointer"
            label="Nouveau workflow"
          ></u-button>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <u-container>
        <UPageCard
          class="w-full mx-auto mt-36 rounded-2xl"
          :ui="{ container: 'p-0!' }"
        >
          <UTable
            :data="data"
            :columns="columns"
            :loading="fetching"
            class="flex-1"
          />
        </UPageCard>
      </u-container>
    </template>
  </UDashboardPanel>
</template>
