<script lang="ts" setup>
// import UiFlow from "~/components/flow/index.vue";
// import UiFlowAction from "~/components/flow/action/cancel.vue";
// import type { FlowData } from "./components/flow/interface";

// import flow from "~/components/flow/default";

// const data = ref<FlowData>({ state: "2" });

import * as v from "valibot";
import { build, type Schema } from "./components/form";

const schema = computed(() => {
  const defs: Schema[] = [
    {
      key: "url",
      schema: "string",
      message: "sdfsdfsdf fsdfsdf",
      undefinedable: true,

      rules: [
        { action: "url", messages: "Url invalide" },
        { action: "maxLength", messages: "length invalid", args: 30 },
      ],
    },
    {
      key: "password",
      schema: "string",
      message: "password is required",
      rules: [
        { action: "minLength", args: 8, messages: "password length error" },
      ],
    },
  ];

  const schemas = build(defs);

  console.log(schemas);

  return schemas;
});

const state = reactive<Record<string, any>>({});

function onSubmit() {}
</script>

<template>
  <nuxt-layout>
    <u-container>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="URL" name="url">
          <UInput v-model="state.url" type="url" />
        </UFormField>

        <!-- <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormField> -->

        <UButton type="submit"> Submit </UButton>
      </UForm>
    </u-container>

    <!-- <ui-flow :data :flow>
      <template #activator>
        <UButton label="Open" color="neutral" variant="subtle" />
      </template>
    </ui-flow> -->
  </nuxt-layout>
</template>
