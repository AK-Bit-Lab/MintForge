import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi, test, expect, afterEach } from 'vitest';
import MetadataForm from './MetadataForm';

afterEach(() => {
  cleanup();
});

// Mock the useIPFSUpload hook to avoid real network calls
vi.mock('../hooks/useIPFSUpload', () => ({
  useIPFSUpload: () => ({
    upload: vi.fn().mockResolvedValue('ipfs://bafytestmetadata'),
    status: 'idle',
    error: null,
  }),
}));

test('renders metadata form fields', () => {
  const onMetadataReady = vi.fn();
  render(<MetadataForm onMetadataReady={onMetadataReady} />);

  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
});

test('calls onMetadataReady with generated CID after submit', async () => {
  const onMetadataReady = vi.fn();
  render(<MetadataForm onMetadataReady={onMetadataReady} />);

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test NFT' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test description' } });
  const file = new File(['dummy'], 'test.png', { type: 'image/png' });
  fireEvent.change(screen.getByLabelText(/Image/i), { target: { files: [file] } });

  fireEvent.click(screen.getByRole('button', { name: /Generate CID/i }));

  // Wait for async upload to resolve
  await new Promise((r) => setTimeout(r, 0));
  expect(onMetadataReady).toHaveBeenCalledWith('ipfs://bafytestmetadata');
});
