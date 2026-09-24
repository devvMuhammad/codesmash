import React from 'react';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  className?: string;
  children?: React.ReactNode;
}

// Heading Components
export function H1({ className, children }: MarkdownProps) {
  return (
    <h1 className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      "border-b border-border pb-2 mb-6",
      "text-foreground",
      className
    )}>
      {children}
    </h1>
  );
}

export function H2({ className, children }: MarkdownProps) {
  return (
    <h2 className={cn(
      "scroll-m-20 text-3xl font-semibold tracking-tight",
      "border-b border-border pb-2 mt-2 mb-4",
      "text-foreground",
      className
    )}>
      {children}
    </h2>
  );
}

export function H3({ className, children }: MarkdownProps) {
  return (
    <h3 className={cn(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      "mt-2 mb-3",
      "text-foreground",
      className
    )}>
      {children}
    </h3>
  );
}

export function H4({ className, children }: MarkdownProps) {
  return (
    <h4 className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      "mt-4 mb-2",
      "text-foreground",
      className
    )}>
      {children}
    </h4>
  );
}

export function H5({ className, children }: MarkdownProps) {
  return (
    <h5 className={cn(
      "scroll-m-20 text-lg font-semibold tracking-tight",
      "mt-3 mb-2",
      "text-foreground",
      className
    )}>
      {children}
    </h5>
  );
}

export function H6({ className, children }: MarkdownProps) {
  return (
    <h6 className={cn(
      "scroll-m-20 text-base font-semibold tracking-tight",
      "mt-2 mb-1",
      "text-foreground",
      className
    )}>
      {children}
    </h6>
  );
}

// Paragraph Component
export function Paragraph({ className, children }: MarkdownProps) {
  return (
    <p className={cn(
      "leading-7 mb-4",
      "text-foreground",
      "[&:not(:first-child)]:mt-4",
      className
    )}>
      {children}
    </p>
  );
}

// Text Formatting Components
interface TextProps {
  className?: string;
  children?: React.ReactNode;
}

export function Strong({ className, children }: TextProps) {
  return (
    <strong className={cn("font-semibold text-foreground", className)}>
      {children}
    </strong>
  );
}

export function Emphasis({ className, children }: TextProps) {
  return (
    <em className={cn("italic text-foreground", className)}>
      {children}
    </em>
  );
}

export function Strikethrough({ className, children }: TextProps) {
  return (
    <del className={cn("line-through text-muted-foreground", className)}>
      {children}
    </del>
  );
}

// Code Components
interface CodeProps {
  className?: string;
  children?: React.ReactNode;
  language?: string;
}

export function InlineCode({ className, children }: CodeProps) {
  return (
    <code className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem]",
      "font-mono text-sm font-medium",
      "text-foreground",
      "before:content-['`'] after:content-['`']",
      "before:text-muted-foreground after:text-muted-foreground",
      className
    )}>
      {children}
    </code>
  );
}

export function CodeBlock({ className, children, language }: CodeProps) {
  return (
    <div className="my-6 overflow-hidden rounded-md border border-border">
      {language && (
        <div className="flex h-10 items-center bg-muted px-4">
          <span className="text-sm font-medium text-muted-foreground">
            {language}
          </span>
        </div>
      )}
      <pre className={cn(
        "overflow-x-auto p-4",
        "bg-card text-card-foreground",
        "font-mono text-sm",
        className
      )}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

// List Components
export function OrderedList({ className, children }: MarkdownProps) {
  return (
    <ol className={cn(
      "my-6 ml-6 list-decimal space-y-2",
      "text-foreground",
      "[&>li]:mt-2",
      className
    )}>
      {children}
    </ol>
  );
}

export function UnorderedList({ className, children }: MarkdownProps) {
  return (
    <ul className={cn(
      "my-6 ml-6 list-disc space-y-2",
      "text-foreground",
      "[&>li]:mt-2",
      className
    )}>
      {children}
    </ul>
  );
}

export function ListItem({ className, children }: MarkdownProps) {
  return (
    <li className={cn("leading-7 text-foreground", className)}>
      {children}
    </li>
  );
}

// Blockquote Component
export function Blockquote({ className, children }: MarkdownProps) {
  return (
    <blockquote className={cn(
      "mt-6 border-l-4 border-border pl-6 italic",
      "text-muted-foreground",
      "bg-muted/50 py-2 pr-4 rounded-r-md",
      className
    )}>
      {children}
    </blockquote>
  );
}

// Table Components
export function Table({ className, children }: MarkdownProps) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn(
        "w-full border-collapse border border-border",
        "text-sm",
        className
      )}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className, children }: MarkdownProps) {
  return (
    <thead className={cn("bg-muted", className)}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children }: MarkdownProps) {
  return (
    <tbody className={cn("bg-card", className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ className, children }: MarkdownProps) {
  return (
    <tr className={cn(
      "border-b border-border",
      "hover:bg-muted/50 transition-colors",
      className
    )}>
      {children}
    </tr>
  );
}

export function TableHeaderCell({ className, children }: MarkdownProps) {
  return (
    <th className={cn(
      "border border-border px-4 py-2 text-left font-bold",
      "bg-muted text-muted-foreground",
      className
    )}>
      {children}
    </th>
  );
}

export function TableCell({ className, children }: MarkdownProps) {
  return (
    <td className={cn(
      "border border-border px-4 py-2",
      "text-foreground",
      className
    )}>
      {children}
    </td>
  );
}

// Link Component
interface LinkProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Link({ href, className, children }: LinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "font-medium text-primary underline underline-offset-4",
        "hover:text-primary/80 transition-colors",
        "break-words",
        className
      )}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

// Image Component
interface ImageProps {
  src?: string | Blob;
  alt?: string;
  className?: string;
  title?: string;
}

export function Image({ src, alt, className, title }: ImageProps) {
  return (
    <div className="my-6">
      <img
        src={typeof src === 'string' ? src : src ? URL.createObjectURL(src) : undefined}
        alt={alt}
        title={title}
        className={cn(
          "max-w-full h-auto rounded-md border border-border",
          "shadow-sm",
          className
        )}
      />
      {alt && (
        <p className="mt-2 text-center text-sm text-muted-foreground italic">
          {alt}
        </p>
      )}
    </div>
  );
}

// Horizontal Rule Component
export function HorizontalRule({ className }: { className?: string }) {
  return (
    <hr className={cn(
      "my-2 border-none h-px bg-border",
      className
    )} />
  );
}

// Task List Components
interface TaskListItemProps {
  checked?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function TaskListItem({ checked, className, children }: TaskListItemProps) {
  return (
    <li className={cn(
      "flex items-start gap-2 leading-7",
      "text-foreground",
      className
    )}>
      <input
        type="checkbox"
        checked={checked}
        disabled
        className="mt-1 h-4 w-4 rounded border-border"
      />
      <span className={checked ? "line-through text-muted-foreground" : ""}>
        {children}
      </span>
    </li>
  );
}

// Alert/Callout Components (GitHub-style)
interface AlertProps {
  type?: 'note' | 'tip' | 'important' | 'warning' | 'caution';
  className?: string;
  children?: React.ReactNode;
}

export function Alert({ type = 'note', className, children }: AlertProps) {
  const alertStyles = {
    note: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
    tip: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-200',
    important: 'border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-200',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
    caution: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
  };

  const icons = {
    note: '💡',
    tip: '💡',
    important: '❗',
    warning: '⚠️',
    caution: '🚨',
  };

  return (
    <div className={cn(
      "my-6 rounded-md border p-4",
      alertStyles[type],
      className
    )}>
      <div className="flex items-start gap-2">
        <span className="text-lg">{icons[type]}</span>
        <div className="flex-1 space-y-2">
          <div className="font-semibold capitalize">{type}</div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

// Details/Summary Component (GitHub collapsible sections)
interface DetailsProps {
  summary?: string;
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
}

export function Details({ summary, className, children, open }: DetailsProps) {
  return (
    <details className={cn("my-4", className)} open={open}>
      <summary className="cursor-pointer font-semibold text-foreground hover:text-primary transition-colors mb-2">
        {summary}
      </summary>
      <div className="pl-4 border-l-2 border-border">
        {children}
      </div>
    </details>
  );
}

// Main Markdown Container
export function MarkdownContainer({ className, children }: MarkdownProps) {
  return (
    <div className={cn(
      "prose prose-slate max-w-none",
      "dark:prose-invert",
      "prose-headings:text-foreground",
      "prose-p:text-foreground",
      "prose-strong:text-foreground",
      "prose-code:text-foreground",
      "prose-pre:bg-card prose-pre:text-card-foreground",
      "prose-blockquote:text-muted-foreground",
      "prose-th:text-muted-foreground",
      "prose-td:text-foreground",
      className
    )}>
      {children}
    </div>
  );
}

// Markdown Components Object
export const markdownComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  strong: Strong,
  em: Emphasis,
  del: Strikethrough,
  code: InlineCode,
  pre: CodeBlock,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  blockquote: Blockquote,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeaderCell,
  td: TableCell,
  a: Link,
  img: Image,
  hr: HorizontalRule,
  'task-list-item': TaskListItem,
  alert: Alert,
  details: Details,
  // Additional components for GitHub-style markdown
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
  Strong,
  Emphasis,
  Strikethrough,
  InlineCode,
  CodeBlock,
  OrderedList,
  UnorderedList,
  ListItem,
  Blockquote,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  Link,
  Image,
  HorizontalRule,
  TaskListItem,
  Alert,
  Details,
  MarkdownContainer,
};

export default markdownComponents;