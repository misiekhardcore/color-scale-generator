import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@konopskidev/ui';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionProps {
  title: string;
  description?: string;
  /** Optional control rendered on the right side of the section header */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * A titled card used to group related controls.
 * Renders the title as a level-2 heading so the page keeps a document outline.
 */
export function Section({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: SectionProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle asChild>
          <h2>{title}</h2>
        </CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className={cn('stack', contentClassName)}>{children}</CardContent>
    </Card>
  );
}
