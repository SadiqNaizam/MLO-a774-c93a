import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LucideIcon } from 'lucide-react';

interface RecentActivityFeedItemProps {
  actorName?: string; // e.g., "Olivia Martin"
  actorAvatarUrl?: string;
  actionDescription: string; // e.g., "updated order #12345 to 'Shipped'"
  timestamp: string; // e.g., "5m ago" or a full date
  icon?: LucideIcon; // Optional icon to represent the activity type
  details?: React.ReactNode; // Optional further details or links
}

const RecentActivityFeedItem: React.FC<RecentActivityFeedItemProps> = ({
  actorName,
  actorAvatarUrl,
  actionDescription,
  timestamp,
  icon: IconComponent,
  details,
}) => {
  console.log("Rendering RecentActivityFeedItem:", actionDescription);

  return (
    <div className="flex items-start gap-4 py-3">
      {actorName && (
        <Avatar className="h-9 w-9">
          <AvatarImage src={actorAvatarUrl || "/placeholder.svg"} alt={actorName} />
          <AvatarFallback>
            {actorName
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase() || '??'}
          </AvatarFallback>
        </Avatar>
      )}
      {!actorName && IconComponent && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
          <IconComponent className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      <div className="grid gap-1 flex-1">
        <p className="text-sm font-medium leading-none">
          {actorName && <span className="font-semibold">{actorName}</span>}{' '}
          {actionDescription}
        </p>
        {details && <div className="text-sm text-muted-foreground">{details}</div>}
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
};

export default RecentActivityFeedItem;