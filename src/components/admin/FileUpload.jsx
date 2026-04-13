import { useState, useRef } from 'react';
import { Upload, FileText, X, Loader2, ExternalLink } from 'lucide-react';
import { uploadFile } from '../../services/api';

export default function FileUpload({ value, onChange, label = "Document", accept = ".pdf,.doc,.docx" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setError('File too large (max 25MB)');
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const res = await uploadFile(file);
      onChange(res.url);
      setFileName(file.name);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const getDisplayName = () => {
    if (fileName) return fileName;
    if (!value || value === '#') return null;
    try {
      const url = new URL(value);
      return url.pathname.split('/').pop() || 'Document';
    } catch {
      return value.split('/').pop() || 'Document';
    }
  };

  const displayName = getDisplayName();
  const hasFile = value && value !== '#';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</label>
        {hasFile && (
          <button
            type="button"
            onClick={() => { onChange(''); setFileName(null); }}
            className="text-[10px] font-bold text-red-400 hover:text-red-600 flex items-center gap-1"
          >
            <X size={10} /> Remove
          </button>
        )}
      </div>

      <div className="relative group">
        {hasFile ? (
          <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                <FileText size={22} className="text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-700 truncate">{displayName}</p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <ExternalLink size={10} /> Open File
                </a>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-100 flex items-center gap-1.5 transition-all shrink-0"
              >
                <Upload size={12} /> Replace
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full py-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-500 group"
          >
            {uploading ? (
              <Loader2 size={24} className="animate-spin text-blue-500" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Upload size={20} />
                </div>
                <div className="text-center px-4">
                  <p className="text-xs font-bold">Click to upload document</p>
                  <p className="text-[9px] font-medium opacity-60">PDF, DOC or DOCX (Max 25MB)</p>
                </div>
              </>
            )}
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept={accept}
          className="hidden"
        />
      </div>

      {/* Manual URL fallback */}
      <div className="mt-2">
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder="URL: https://... (or upload above)"
          className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-500"
        />
      </div>

      {error && <p className="text-[10px] font-bold text-red-500">{error}</p>}
    </div>
  );
}
