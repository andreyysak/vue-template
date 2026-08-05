<template>
  <div class="core-select">
    <label v-if="label" :for="selectId" class="core-select__label">{{ label }}</label>

    <Select
      :id="selectId"
      v-model="localValue"
      v-bind="$attrs"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :invalid="isInvalid"
      :size="size"
      :variant="variant"
      :fluid="fluid"
      :filter="filter"
      :show-clear="showClear"
      :multiple="multiple"
      :loading="loading"
      @change="$emit('change', $event)"
    />

    <small v-if="error" class="core-select__error">{{ error }}</small>
    <small v-else-if="hint" class="core-select__hint">{{ hint }}</small>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
