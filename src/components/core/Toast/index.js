import PrimeToast from 'primevue/toast';

export default {
  name: 'CoreToast',
  components: {
    Toast: PrimeToast
  },
  props: {
    position: {
      type: String,
      default: 'top-right'
    },
    group: {
      type: String,
      default: null
    }
  }
};
