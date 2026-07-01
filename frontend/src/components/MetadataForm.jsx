/**
 * MetadataForm – Collect NFT metadata and upload to Pinata.
 * Returns the generated `ipfs://<CID>` via the `onMetadataReady` callback.
 * Stays mounted after CID generation so form data is never lost.
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
  const [generatedURI, setGeneratedURI] = useState('');

  const { upload, error: uploadError } = useIPFSUpload();

  const handleSubmit = async () => {
    setError(null);
    if (!name || !description || !imageFile) {
      setError('All fields are required');
      return;
    }
    setUploading(true);
    const uri = await upload({ name, description, imageFile });
    setUploading(false);
    if (uri) {
      setGeneratedURI(uri);
      onMetadataReady(uri);
    } else {
      setError(uploadError || 'Upload failed');
    }
  };

  const handleClearCID = () => {
    setGeneratedURI('');
    onMetadataReady('');
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
          disabled={uploading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="metadata-description" className="form-label">Description</label>
        <textarea
          id="metadata-description"
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={uploading}
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
          disabled={uploading}
        />
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      {generatedURI ? (
        <div className="metadata-form__cid-result">
          <p className="metadata-form__cid-label">Generated Token URI:</p>
          <p className="metadata-form__cid-value" title={generatedURI}>{generatedURI}</p>
          <button type="button" className="metadata-form__btn metadata-form__btn--secondary" onClick={handleClearCID}>
            Clear CID & Edit
          </button>
        </div>
      ) : (
        <button type="button" className="metadata-form__btn" onClick={handleSubmit} disabled={uploading}>
          {uploading ? 'Uploading…' : 'Generate CID'}
        </button>
      )}
    </div>
  );
}

MetadataForm.propTypes = {
  /** Called with the generated ipfs:// CID when upload succeeds */
  onMetadataReady: PropTypes.func.isRequired,
};

export default MetadataForm;
