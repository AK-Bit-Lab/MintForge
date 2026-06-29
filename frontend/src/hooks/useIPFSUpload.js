/**
 * Hook to upload NFT image and metadata to Pinata using the JWT from environment.
 * Returns a function `upload` that resolves to an `ipfs://<CID>` URI for the metadata JSON.
 * No additional dependencies are required – uses the native fetch API.
 */
import { useState, useCallback } from 'react';
import { PINATA_JWT } from '../utils/constants';

/**
 * @typedef {Object} UploadParams
 * @property {string} name - NFT name
 * @property {string} description - NFT description
 * @property {File} imageFile - Image file to upload
 * @property {Array<Object>} [attributes] - Optional array of attribute objects
 * @property {string} [external_url] - Optional external URL for the NFT
 */

export function useIPFSUpload() {
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [error, setError] = useState(null);
  const [metadataCID, setMetadataCID] = useState(null);

  const upload = useCallback(
    /** @type {(params: UploadParams) => Promise<string|null>} */
    async ({ name, description, imageFile, attributes = [], external_url }) => {
      setStatus('uploading');
      setError(null);
      setMetadataCID(null);

      if (!PINATA_JWT) {
        const msg = 'Pinata JWT not configured. Set VITE_PINATA_JWT in .env.';
        setError(msg);
        setStatus('error');
        return null;
      }

      try {
        // 1️⃣ Upload image file to Pinata
        const imageForm = new FormData();
        imageForm.append('file', imageFile);
        const imageRes = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${PINATA_JWT}`,
          },
          body: imageForm,
        });
        if (!imageRes.ok) {
          const txt = await imageRes.text();
          throw new Error(`Image upload failed: ${txt}`);
        }
        const imageData = await imageRes.json();
        const imageCID = imageData.IpfsHash;

        // 2️⃣ Build metadata JSON according to the protocol schema
        const metadata = {
          name,
          description,
          image: `ipfs://${imageCID}`,
          attributes,
          external_url,
          version: 1,
        };

        // 3️⃣ Upload metadata JSON to Pinata
        const metaRes = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${PINATA_JWT}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metadata),
        });
        if (!metaRes.ok) {
          const txt = await metaRes.text();
          throw new Error(`Metadata upload failed: ${txt}`);
        }
        const metaData = await metaRes.json();
        const metaCID = metaData.IpfsHash;

        setMetadataCID(metaCID);
        setStatus('success');
        return `ipfs://${metaCID}`;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
        setStatus('error');
        return null;
      }
    },
    []
  );

  return { upload, status, error, metadataCID };
}

export default useIPFSUpload;
