import PrimeButton from 'primevue/button';
import Spinner from '@primevue/icons/spinner';

export default {
  name: 'CoreButton',
  components: {
    Button: PrimeButton,
    Spinner
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: [Object, Function],
      default: null
    },
    severity: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    rounded: {
      type: Boolean,
      default: false
    },
    raised: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    }
  }
};
