<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const navbarItems: NavigationMenuItem[][] = [
  [
    {
      label: "Home",
      icon: "i-fluent-layout-column-two-split-right-16-regular",
      active: true,
    },
    {
      label: "Jobs",
      icon: "i-material-symbols-work-outline",
    },
    {
      label: "Inbox",
      icon: "i-lucide-mail",
      badge: "4",
    },

    {
      label: "Users",
      icon: "i-lucide-users",
    },
  ],
  [
    {
      label: "Add user",
      icon: "i-lucide-user-round-plus",
    },
  ],
];

const isCollapse = ref(true);
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      v-if="Store.auth.auth"
      v-model:collapsed="isCollapse"
      :default-size="20"
      :ui="{ footer: 'border-t border-default' }"
      collapsible
    >
      <template #header="{ collapsed }">
        <UIcon name="i-tarico-logo" size="32" color="primary" />
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="navbarItems[0]"
          orientation="vertical"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="navbarItems[1]"
          orientation="vertical"
          class="mt-auto"
        />

        <WkUserMenu :collapsed="collapsed" />

        <div>
          <UDashboardSidebarCollapse />
        </div>
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
