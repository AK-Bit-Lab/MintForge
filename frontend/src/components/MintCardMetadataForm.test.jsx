import { render, screen } from '@testing-library/react';
import React from 'react';
import MintCard from './MintCard';

// Mock the useIPFSUpload hook used inside MetadataForm to avoid real network calls
jest.mock('../hooks/useIPFSUpload', () => ({
  useIPFSUpload: () => ({
    upload: jest.fn().mockResolvedValue('ipfs://mockedCID'),
    status: 'idle',
    error: null,
  }),
}));

// Minimal required props for MintCard
const defaultProps = {
  contractInfo: { mintFee: 1000, totalSupply: 0, maxSupply: 10, walletMinted: 0, maxPerWallet: 2, isPaused: false },
  onMint: jest.fn().mockResolvedValue(null),
  isConnected: true,
  isConnecting: false,
  onConnect: jest.fn(),
  walletError: null,
  contractError: null,
};

test('renders MetadataForm when tokenURI is empty', () => {
  render(<MintCard {...defaultProps} />);
  // Expect MetadataForm fields to be present
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
});
