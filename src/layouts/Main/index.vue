<template>
  <section class="main-layout">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </section>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
