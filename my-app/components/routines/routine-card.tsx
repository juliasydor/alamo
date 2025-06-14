"use client";

import { Clock, Beaker } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import type { Routine } from "@/types/routine";

interface RoutineCardProps {
  routine: Routine;
  onClick?: () => void;
}

export function RoutineCard({ routine, onClick }: RoutineCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {formatTime(routine.time)}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {routine.unit}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg leading-tight">{routine.name}</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Beaker className="h-3 w-3" />
            <span>Procedure Details</span>
          </div>
          <ul className="space-y-1 text-sm">
            {routine.details.map((detail, index) => (
              <li key={index} className="text-muted-foreground">
                • {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex gap-4 text-xs">
            <span className="text-muted-foreground">
              CHO:{" "}
              <span className="font-medium text-foreground">
                {routine.nutrients.CHO}
              </span>
            </span>
            <span className="text-muted-foreground">
              PTN:{" "}
              <span className="font-medium text-foreground">
                {routine.nutrients.PTN}
              </span>
            </span>
            <span className="text-muted-foreground">
              LIP:{" "}
              <span className="font-medium text-foreground">
                {routine.nutrients.LIP}
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
