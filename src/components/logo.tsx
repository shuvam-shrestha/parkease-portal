import { ParkingSquare } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="ParkEase Portal">
      <ParkingSquare className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
        ParkEase Portal
      </span>
    </div>
  );
}
