import ProgressSpinner from 'primevue/progressspinner';

export default {
  name: 'CoreSpinner',
  components: {
    ProgressSpinner
  },
  props: {
    size: {
      type: String,
      default: '2rem'
    },
    strokeWidth: {
      type: [String, Number],
      default: 4
    },
    animationDuration: {
      type: String,
      default: '1s'
    }
  }
};
