import type { ReactNode } from 'react';

interface Props {
  viewBox: string;
  titleId: string;
  descId: string;
  title: string;
  desc: string;
  children: ReactNode;
  className?: string;
}

export function SvgWrapper({
  viewBox,
  titleId,
  descId,
  title,
  desc,
  children,
  className,
}: Props) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>
      {children}
    </svg>
  );
}
