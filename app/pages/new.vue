<script lang="ts" setup>
import UiFlow from "~/components/flow/index.vue";
</script>

<template>
  <nuxt-layout>
    <ui-flow>
      <template #activator>
        <UButton label="Open" color="neutral" variant="subtle" />
      </template>
    </ui-flow>
  </nuxt-layout>
</template>
