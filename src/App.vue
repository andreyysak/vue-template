<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>

  <CoreToast />
  <CoreLoader />
</template>

<script setup>
import CoreToast from '@/components/core/Toast/index.vue';
import CoreLoader from '@/components/core/Loader/index.vue';

defineOptions({ name: 'App' });
</script>
