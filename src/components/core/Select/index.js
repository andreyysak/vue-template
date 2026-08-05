import { useId } from 'vue';
import Select from 'primevue/select';

export default {
  name: 'CoreSelect',
  inheritAttrs: false,
  components: {
    Select
  },
  props: {
    modelValue: {
      type: [String, Number, Object, Array],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: String,
      default: 'value'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    fluid: {
      type: Boolean,
      default: true
    },
    filter: {
      type: Boolean,
      default: false
    },
    showClear: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue', 'change'],
  setup() {
    return {
      generatedId: useId()
    };
  },
  computed: {
    selectId() {
      return this.id || this.generatedId;
    },
    isInvalid() {
      return this.invalid || !!this.error;
    },
    localValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
};
