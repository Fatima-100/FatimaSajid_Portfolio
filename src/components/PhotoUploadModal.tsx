import React, { useState, useRef } from 'react';
import { X, UploadCloud, Image as ImageIcon, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { useAvatar } from '../context/AvatarContext';

export const PhotoUploadModal: React.FC = () => {
  const { avatarUrl, setAvatarUrl, resetToDefault, isUploadModalOpen, setIsUploadModalOpen } = useAvatar();
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isUploadModalOpen) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleApply = () => {
    if (previewUrl) {
      setAvatarUrl(previewUrl);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsUploadModalOpen(false);
        setPreviewUrl(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    resetToDefault();
    setPreviewUrl(null);
    setIsUploadModalOpen(false);
  };

  return (
    <div
      id="photo-upload-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in"
      onClick={() => setIsUploadModalOpen(false)}
    >
      <div
        id="photo-upload-modal-dialog"
        className="bg-[#141122] rounded-3xl border border-[#dfb098]/40 shadow-2xl max-w-lg w-full p-6 text-[#f4f2f8] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#dfb098]/15 to-[#8c52ff]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#221a30] text-[#dfb098] border border-[#dfb098]/30 flex items-center justify-center shadow-md">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#f4f2f8]">
                Set Your Real Photo
              </h3>
              <p className="text-xs text-[#9e97af]">
                Use your actual WhatsApp or camera portrait across the site
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 relative z-10">
          {/* Active Preview */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#1b172d] border border-white/10 shadow-inner">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#dfb098]/50 shrink-0 shadow-lg bg-[#0e0c18] relative">
              <img
                src={previewUrl || avatarUrl}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs space-y-1">
              <span className="inline-block font-semibold text-[#dfb098] px-2 py-0.5 rounded-md bg-[#2d223a]">
                {previewUrl ? 'New Photo Selected' : 'Current Active Photo'}
              </span>
              <p className="text-[#b5adc9]">
                {previewUrl
                  ? 'Ready to apply across your hero card, about section, navbar, and CV modal.'
                  : 'Displays cleanly in your hero portrait without 3D floating distortion.'}
              </p>
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-[#dfb098] bg-[#dfb098]/10 scale-[0.99]'
                : 'border-white/15 hover:border-[#dfb098]/60 bg-[#161226]/80'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#241c33] text-[#dfb098] border border-[#dfb098]/30 flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#f4f2f8]">
              Click to select your photo or drag & drop here
            </p>
            <p className="text-xs text-[#9e97af] mt-1">
              Supports your WhatsApp photo (.jpeg, .png, .jpg)
            </p>
          </div>

          {/* Environment Note */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#1b172a] border border-white/10 text-[11px] text-[#c5bed5]">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#dfb098] mt-0.5" />
            <p>
              <strong>Direct File Option:</strong> You can also put your photo file directly inside the project's <code className="font-mono bg-[#0c0a15] px-1 py-0.5 rounded text-[#dfb098]">/public/avatar.jpg</code> folder in the code editor to make it permanent.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/10 relative z-10">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#9e97af] hover:text-[#f4f2f8] hover:bg-white/5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#c5bed5] hover:text-[#f4f2f8] hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApply}
              disabled={!previewUrl}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer ${
                previewUrl
                  ? 'bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] text-[#12101c] hover:brightness-110 hover:shadow-lg scale-100 hover:scale-[1.02]'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Applied!
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Apply Real Photo
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
