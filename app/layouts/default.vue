<script setup>
import { getLangItems } from "~/tools/lang";
import { getThemeItems } from "~/tools/theme";
import ULayout from "~/components/layout.vue";

const route = useRoute();
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Body>
      <u-layout>
        <template #header>
          <slot name="header" />
        </template>

        <slot />
      </u-layout>
      <!-- <UApp>
        <UMain>
          <slot />
        </UMain>

        <div
          v-if="!Store.auth.auth"
          class="fixed bottom-10 left-10 z-50 hidden"
        >
          <UDropdownMenu
            :items="[[...getThemeItems(), getLangItems()]]"
            :content="{ align: 'start', collisionPadding: 12 }"
          >
            <UButton
              icon="i-lucide-swatch-book"
              color="primary"
              variant="soft"
              size="xl"
              square
              aria-label="Color picker"
              class="cursor-pointer"
            />

            <template #chip-leading="{ item }">
              <div
                class="inline-flex items-center justify-center shrink-0 size-5"
              >
                <span
                  class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2"
                  :style="{
                    '--chip-light': `var(--color-${item.chip}-500)`,
                    '--chip-dark': `var(--color-${item.chip}-400)`,
                  }"
                />
              </div>
            </template>
          </UDropdownMenu>
        </div>
      </UApp> -->
    </Body>
  </Html>
</template>
