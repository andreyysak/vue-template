import { mapState } from 'pinia';
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
  computed: {
    ...mapState(useAppStore, ['isLoader']),
    isVisible() {
      return this.visible !== null ? this.visible : this.isLoader;
    }
  }
};
