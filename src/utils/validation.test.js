import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { object, string } from 'yup';
import { validationMixin } from './validation.js';

const schema = object({
  email: string().required('Email is required').email('Invalid email'),
  password: string().required('Password is required')
});

const createForm = () => mount({ mixins: [validationMixin], template: '<div />' }).vm;

describe('validationMixin', () => {
  it('collects errors for all invalid fields', async () => {
    const form = createForm();

    expect(await form.validateForm(schema, { email: 'wrong' })).toBe(false);
    expect(form.getFieldError('email')).toBe('Invalid email');
    expect(form.getFieldError('password')).toBe('Password is required');
  });

  it('validates a single field and clears its error', async () => {
    const form = createForm();
    await form.validateForm(schema, {});

    expect(await form.validateField(schema, { email: 'a@b.com' }, 'email')).toBe(true);
    expect(form.getFieldError('email')).toBe('');
    expect(form.getFieldError('password')).toBe('Password is required');
  });

  it('sets server validation errors', () => {
    const form = createForm();

    form.setValidationErrors({ email: ['Already taken'] });

    expect(form.getFieldError('email')).toBe('Already taken');
  });
});
