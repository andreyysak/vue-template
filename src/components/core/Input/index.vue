<template>
  <div class="core-input">
    <label v-if="label" :for="inputId" class="core-input__label">{{ label }}</label>

    <Password
      v-if="type === 'password'"
      :id="inputId"
      v-model="localValue"
      v-bind="$attrs"
      :placeholder="placeholder"
      :disabled="disabled"
      :invalid="isInvalid"
      :size="size"
      :variant="variant"
      :fluid="fluid"
      toggle-mask
      :feedback="false"
    />
    <InputText
      v-else
      :id="inputId"
      v-model="localValue"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :invalid="isInvalid"
      :size="size"
      :variant="variant"
      :fluid="fluid"
    />

    <small v-if="error" class="core-input__error">{{ error }}</small>
    <small v-else-if="hint" class="core-input__hint">{{ hint }}</small>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
