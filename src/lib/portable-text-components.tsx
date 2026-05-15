import type { PortableTextBlock } from '@portabletext/types';
import type { PortableTextComponents } from '@portabletext/react';

function headingId(
  value: PortableTextBlock | undefined,
  headingIdByKey: Record<string, string> | undefined
): string | undefined {
  if (!value?._key || !headingIdByKey) return undefined;
  return headingIdByKey[value._key];
}

export function createPortableTextComponents(
  headingIdByKey?: Record<string, string>
): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="mt-4 text-base leading-relaxed text-neutral-700 first:mt-0 md:text-lg">
          {children}
        </p>
      ),
      h2: ({ children, value }) => {
        const id = headingId(value, headingIdByKey);
        return (
          <h3
            {...(id ? { id } : {})}
            className="mt-8 scroll-mt-28 text-2xl font-semibold tracking-tight text-foreground first:mt-0"
          >
            {children}
          </h3>
        );
      },
      h3: ({ children, value }) => {
        const id = headingId(value, headingIdByKey);
        return (
          <h4
            {...(id ? { id } : {})}
            className="mt-7 scroll-mt-28 text-xl font-semibold tracking-tight text-foreground first:mt-0"
          >
            {children}
          </h4>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="mt-6 border-l-2 border-border pl-4 text-neutral-700 italic">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-foreground">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className="underline decoration-border underline-offset-4 hover:text-foreground"
        >
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mt-4 list-disc space-y-2 pl-6 text-neutral-700 md:text-lg">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-neutral-700 md:text-lg">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    types: {
      horizontalRule: () => (
        <hr className="my-8 border-0 border-t border-dashed border-border" />
      ),
    },
  };
}

export const portableTextComponents = createPortableTextComponents();
