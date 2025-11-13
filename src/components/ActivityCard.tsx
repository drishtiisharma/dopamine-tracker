import { Activity } from "@/types/activity";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  activity: Activity;
  onToggle: (id: string) => void;
  onDurationChange: (id: string, duration: number) => void;
}

export const ActivityCard = ({ activity, onToggle, onDurationChange }: ActivityCardProps) => {
  return (
    <Card
      className={cn(
        "p-4 transition-all duration-300 border-2",
        activity.isActive
          ? "border-primary shadow-lg scale-[1.02]"
          : "border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          id={activity.id}
          checked={activity.isActive}
          onCheckedChange={() => onToggle(activity.id)}
          className="mt-1"
        />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={activity.name}>
              {activity.icon}
            </span>
            <label
              htmlFor={activity.id}
              className="font-semibold text-foreground cursor-pointer select-none"
            >
              {activity.name}
            </label>
          </div>

          {activity.isActive && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold text-foreground">
                  {activity.duration} min
                </span>
              </div>
              <Slider
                value={[activity.duration]}
                onValueChange={(value) => onDurationChange(activity.id, value[0])}
                max={240}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5 min</span>
                <span>240 min</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
