import React, { createContext, useContext, useState, useEffect } from 'react';

interface AvatarContextType {
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  resetToDefault: () => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
}

const DEFAULT_AVATAR = '/avatar.jpg';
const STORAGE_KEY = 'fatima_portfolio_avatar';

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatarUrl, setAvatarUrlState] = useState<string>(DEFAULT_AVATAR);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAvatarUrlState(saved);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const setAvatarUrl = (newUrl: string) => {
    setAvatarUrlState(newUrl);
    try {
      localStorage.setItem(STORAGE_KEY, newUrl);
    } catch {
      // Storage could be full for large base64
    }
  };

  const resetToDefault = () => {
    setAvatarUrlState(DEFAULT_AVATAR);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      //
    }
  };

  return (
    <AvatarContext.Provider
      value={{
        avatarUrl,
        setAvatarUrl,
        resetToDefault,
        isUploadModalOpen,
        setIsUploadModalOpen,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};
