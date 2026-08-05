export const validationMixin = {
  data() {
    return {
      validationErrors: {}
    };
  },
  methods: {
    getFieldErrors(field, rules) {
      const errors = [];
      if (!this.v$.formPayload[field].$dirty) return errors;

      rules.map((rule) => {
        if (typeof rule === 'string') {
          if (this.v$.formPayload[field][rule].$invalid) {
            errors.push(this.$t(`validation.${rule}`));
          }
        } else {
          if (this.v$.formPayload[field][rule.rule].$invalid) {
            errors.push(rule.message);
          }
        }
      });

      if (this.validationErrors[field]) {
        errors.push(...this.validationErrors[field]);
      }

      return errors;
    },
    removeError(field) {
      delete this.validationErrors[field];
    }
  }
};
