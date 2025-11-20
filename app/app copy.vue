<script lang="ts" setup>
const file = ref(null);

onMounted(() => {});

async function submit() {
  if (!file.value) return;

  const formData = new FormData();
  formData.append("file", file.value);

  const response = await $fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  console.log(response.url);
}
</script>

<template>
  <NuxtLayout>
    <!-- <UFileUpload v-model="file" @change="submit" class="w-96 min-h-48" /> -->
    <NuxtPage />
  </NuxtLayout>
</template>
