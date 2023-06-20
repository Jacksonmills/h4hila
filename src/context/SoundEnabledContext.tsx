import { createContext, useContext, useState } from 'react';

interface SoundEnabledContextInterface {
  soundEnabled: boolean;
  toggleSoundEnabled: () => void;
}

const SoundEnabledContext = createContext<SoundEnabledContextInterface>({
  soundEnabled: true,
  toggleSoundEnabled: () => {
    throw new Error('toggleSoundEnabled() not implemented');
  },
});

export function useSoundEnabledContext() {
  return useContext(SoundEnabledContext);
}

export function SoundEnabledProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSoundEnabled = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <SoundEnabledContext.Provider value={{ soundEnabled, toggleSoundEnabled }}>
      {children}
    </SoundEnabledContext.Provider>
  );
}
