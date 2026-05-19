import type { MDXComponents } from 'mdx/types';
import type { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

function MDXAnchor({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <a {...rest}>{children}</a>;
  }
  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener" {...rest}>
      {children}
    </a>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: MDXAnchor,
  };
}
