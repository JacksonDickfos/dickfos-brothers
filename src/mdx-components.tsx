import type { MDXComponents } from mdx/types;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-3xl md:text-4xl font-semibold" {...props} />,
    h2: (props) => <h2 className="text-2xl md:text-3xl font-semibold" {...props} />,
    p: (props) => <p className="text-muted-foreground" {...props} />,
    ...components,
  };
}
