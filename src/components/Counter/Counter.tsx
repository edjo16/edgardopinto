import { useCountUp } from '../../hooks/useCountUp';

type Props = { end: number; suffix?: string };

export function Counter({ end, suffix = '' }: Props) {
  const { ref, value } = useCountUp(end);
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {value}
      {suffix}
    </span>
  );
}
