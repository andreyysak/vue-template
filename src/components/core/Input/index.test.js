import { describe, expect, it } from 'vitest';
import { renderComponent, screen } from '@/test/render.js';
import CoreInput from './index.vue';

describe('CoreInput', () => {
  it('links the label to the input and emits v-model updates', async () => {
    const { user, emitted } = await renderComponent(CoreInput, { props: { label: 'Email' } });

    await user.type(screen.getByLabelText('Email'), 'a');

    expect(emitted()['update:modelValue']).toEqual([['a']]);
  });

  it('shows the error instead of the hint and marks the input invalid', async () => {
    await renderComponent(CoreInput, { props: { label: 'Email', hint: 'Work email', error: 'Required' } });

    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.queryByText('Work email')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders a password field', async () => {
    await renderComponent(CoreInput, { props: { label: 'Password', type: 'password', modelValue: 'secret' } });

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });
});
