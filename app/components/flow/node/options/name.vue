<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{ (e: "submit", value: string): void }>();

const { $i18n } = useNuxtApp();
const schema = v.object({
  name: v.pipe(
    v.string($i18n.t("flow.options.name")),
    v.minLength(1, $i18n.t("flow.errors.fieldRequired")),
    v.maxLength(50, $i18n.t("flow.options.name.errors.maxLength", 50))
  ),
});

type Schema = v.InferOutput<typeof schema>;

const isOpen = defineModel<boolean>("open");
const value = defineModel({ type: String });

const state = ref({ name: value.value });

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // emit("submit", event.data.name);
  value.value = event.data.name;
  isOpen.value = false;
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="$t('flow.option.name.label')"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
  >
    <slot name="activator" />

    <template #body>
      <div class="p-5">
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField name="name">
            <UInput v-model="state.name" class="w-full" size="xl" />
          </UFormField>

          <UButton type="submit" size="xl" class="cursor-pointer" block>
            {{ $t("flow.options.name.submit") }}
          </UButton>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
