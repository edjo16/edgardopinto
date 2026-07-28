import { createContext } from 'react';

export type SoundName = 'hover' | 'click' | 'whoosh';
export type AudioCtxValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
};

export const AudioCtx = createContext<AudioCtxValue | null>(null);
