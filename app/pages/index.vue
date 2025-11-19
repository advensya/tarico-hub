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
      collapsible
      v-model:collapsed="isCollapse"
      :default-size="20"
      :ui="{ footer: 'border-t border-default' }"
    >
      <template #header="{ collapsed }"> </template>

      <template #default="{ collapsed }">
        <UButton
          v-bind="{
            label: collapsed ? undefined : Store.auth.auth?.company?.name,
            trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
          }"
          color="neutral"
          :variant="collapsed ? 'ghost' : 'outline'"
          :size="'xl'"
          block
          :square="collapsed"
          class="data-[state=open]:bg-elevated"
          :ui="{
            trailingIcon: 'text-dimmed rounded',
          }"
        >
          <template #leading>
            <UAvatar
              class="rounded-lg"
              :src="
                Store.auth.auth?.company?.logo
                  ? Store.auth.auth?.company?.logo
                  : undefined
              "
              :alt="
                Store.auth.auth?.company?.name
                  ? Store.auth.auth?.company?.name
                  : undefined
              "
            />
          </template>
        </UButton>

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
      </template>
    </UDashboardSidebar>

    <UDashboardPanel resizable>
      <template #header>
        <UDashboardNavbar>
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
            <UButton
              size="lg"
              color="neutral"
              variant="ghost"
              icon="i-lucide-bell"
            ></UButton>

            <UButton
              size="lg"
              color="neutral"
              variant="ghost"
              icon="i-octicon-megaphone-24"
            ></UButton>

            <UButton
              size="lg"
              color="neutral"
              variant="ghost"
              icon="i-lucide-circle-question-mark"
            ></UButton>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <UEmpty
          variant="naked"
          icon="i-mdi-inbox-multiple"
          size="xl"
          class="mt-20"
          :description="$t('dashboard.empty')"
        />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
