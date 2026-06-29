/**
 * MetadataForm – Collect NFT metadata and upload to Pinata.
 * Returns the generated `ipfs://<CID>` via the `onMetadataReady` callback.
 */
import { useState } from 'react';
import PropTypes from 'prop-types';
import './MetadataForm.css';
import { useIPFSUpload } from '../hooks/useIPFSUpload';

export function MetadataForm({ onMetadataReady }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { upload, status, error: uploadError } = useIPFSUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    if (!name || !description || !imageFile) {
      setError('All fields are required');
      return;
    }
    setUploading(true);
    const uri = await upload({ name, description, imageFile });
    setUploading(false);
    if (uri) {
      onMetadataReady(uri);
    } else {
      setError(uploadError || 'Upload failed');
    }
  };

  return (
    <div className="metadata-form">
      <div className="form-group">
        <label htmlFor="metadata-name" className="form-label">Name</label>
        <input
          id="metadata-name"
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="metadata-description" className="form-label">Description</label>
        <textarea
          id="metadata-description"
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="metadata-image" className="form-label">Image</label>
        <input
          id="metadata-image"
          type="file"
          accept="image/*"
          className="form-input"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="button" className="metadata-form__btn" onClick={handleSubmit} disabled={uploading}>
        {uploading ? 'Uploading…' : 'Generate CID'}
      </button>
    </div>
  );
}

MetadataForm.propTypes = {
  /** Called with the generated ipfs:// CID when upload succeeds */
  onMetadataReady: PropTypes.func.isRequired,
};

export default MetadataForm;
