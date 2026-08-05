import { useAppStore } from '@/store/app.js';
import Spinner from '@/components/core/Spinner/index.vue';

export default {
  name: 'CoreLoader',
  components: {
    Spinner
  },
  props: {
    visible: {
      type: Boolean,
      default: null
    },
    fullscreen: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '3rem'
    }
  },
  setup() {
    return {
      appStore: useAppStore()
    };
  },
  computed: {
    isVisible() {
      return this.visible !== null ? this.visible : this.appStore.isLoader;
    }
  }
};
