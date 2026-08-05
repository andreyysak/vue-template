import { useId } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

export default {
  name: 'CoreInput',
  inheritAttrs: false,
  components: {
    InputText,
    Password
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
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
    id: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup() {
    return {
      generatedId: useId()
    };
  },
  computed: {
    inputId() {
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
