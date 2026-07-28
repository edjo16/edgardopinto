import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AudioCtx, type SoundName } from './audio-context';

/**
 * Optional UI sound effects — DISABLED by default.
 * Sounds are synthesized with the Web Audio API so no asset files are needed.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new Ctor();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      const ctx = getCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const presets: Record<
        SoundName,
        { freq: number; type: OscillatorType; dur: number; vol: number }
      > = {
        hover: { freq: 880, type: 'sine', dur: 0.06, vol: 0.04 },
        click: { freq: 1320, type: 'triangle', dur: 0.09, vol: 0.06 },
        whoosh: { freq: 220, type: 'sawtooth', dur: 0.25, vol: 0.05 },
      };
      const p = presets[name];
      osc.type = p.type;
      osc.frequency.setValueAtTime(p.freq, now);
      if (name === 'whoosh')
        osc.frequency.exponentialRampToValueAtTime(p.freq * 3, now + p.dur);
      gain.gain.setValueAtTime(p.vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.dur);
      osc.start(now);
      osc.stop(now + p.dur);
    },
    [enabled, getCtx]
  );

  const toggle = useCallback(() => setEnabled((e) => !e), []);

  const value = useMemo(
    () => ({ enabled, toggle, play }),
    [enabled, toggle, play]
  );
  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}
