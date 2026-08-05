<template>
  <Button
    :severity="severity"
    :size="size"
    :variant="variant"
    :rounded="rounded"
    :raised="raised"
    :text="text"
    :outlined="outlined"
    :fluid="fluid"
    :disabled="disabled || loading"
    :type="type"
  >
    <slot>
      <template v-if="loading">
        <Spinner spin />
      </template>
      <template v-else>
        <component :is="icon" v-if="icon" />
        <span v-if="label">{{ label }}</span>
      </template>
    </slot>
  </Button>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
