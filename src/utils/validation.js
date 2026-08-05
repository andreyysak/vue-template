import { ValidationError } from 'yup';

// Usage:
//   mixins: [validationMixin],
//   async submit() {
//     if (!(await this.validateForm(schema, this.formPayload))) return;
//     try { ... } catch (errors) { this.setValidationErrors(errors); }
//   }
//   <CoreInput :error="getFieldError('email')" @blur="validateField(schema, formPayload, 'email')" />
export const validationMixin = {
  data() {
    return {
      validationErrors: {}
    };
  },
  methods: {
    async validateForm(schema, payload) {
      try {
        await schema.validate(payload, { abortEarly: false });
        this.validationErrors = {};
        return true;
      } catch (e) {
        if (!(e instanceof ValidationError)) throw e;
        this.validationErrors = e.inner.reduce((errors, error) => {
          (errors[error.path] ??= []).push(error.message);
          return errors;
        }, {});
        return false;
      }
    },
    async validateField(schema, payload, field) {
      try {
        await schema.validateAt(field, payload);
        this.removeError(field);
        return true;
      } catch (e) {
        if (!(e instanceof ValidationError)) throw e;
        this.validationErrors[field] = e.errors;
        return false;
      }
    },
    // Server errors in { field: ['message'] } format (what getRequestError returns for 422)
    setValidationErrors(errors) {
      this.validationErrors = errors && typeof errors === 'object' ? { ...errors } : {};
    },
    getFieldError(field) {
      return this.validationErrors[field]?.[0] ?? '';
    },
    removeError(field) {
      delete this.validationErrors[field];
    }
  }
};
