import { describe, expect, it, vi } from 'vitest';
import { renderComponent, screen } from '@/test/render.js';
import CoreButton from './index.vue';

describe('CoreButton', () => {
  it('renders the label and handles clicks', async () => {
    const onClick = vi.fn();
    const { user } = await renderComponent(CoreButton, { props: { label: 'Save' }, attrs: { onClick } });

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders the default slot', async () => {
    await renderComponent(CoreButton, { slots: { default: 'Custom content' } });

    expect(screen.getByRole('button', { name: 'Custom content' })).toBeInTheDocument();
  });

  it('is disabled while loading', async () => {
    await renderComponent(CoreButton, { props: { label: 'Save', loading: true } });

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });

  it('submits forms when type is submit', async () => {
    await renderComponent(CoreButton, { props: { label: 'Send', type: 'submit' } });

    expect(screen.getByRole('button', { name: 'Send' })).toHaveAttribute('type', 'submit');
  });
});
