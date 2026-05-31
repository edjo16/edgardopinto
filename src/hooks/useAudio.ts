import { useContext } from 'react';
import { AudioCtx } from '../providers/audio-context';

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
