import { Badge } from "@/components/ui/badge";

interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground border-0"
    >
      {name}
    </Badge>
  );
}
