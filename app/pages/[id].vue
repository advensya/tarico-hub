<script lang="ts" setup>
import type { Flow } from "~/components/flow/interface";

const {
  data: flow,
  pending: fetching,
  refresh,
} = await useFetch<Flow>(`/api/flow/${Use.route.params.id}`, { method: "get" });
</script>

<template>
  <div
    v-if="fetching"
    class="w-screen h-screen flex items-center justify-center"
  >
    <u-icon name="i-line-md-loading-twotone-loop" size="42" />
  </div>

  <nuxt-page v-else-if="flow" :flow />
</template>
