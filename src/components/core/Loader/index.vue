<template>
  <Transition name="fade">
    <div v-if="isVisible" class="core-loader" :class="{ 'core-loader--fullscreen': fullscreen }">
      <Spinner :size="size" />
    </div>
  </Transition>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
