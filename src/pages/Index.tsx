import { useState, useEffect } from "react";
import { Activity, DopamineDataPoint } from "@/types/activity";
import { ActivityCard } from "@/components/ActivityCard";
import { DopamineGraph } from "@/components/DopamineGraph";
import { calculateDopamineGraph } from "@/utils/dopamineCalculator";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: "studying",
    name: "Studying",
    dopamineImpact: -0.6,
    icon: "📚",
    color: "hsl(var(--success))",
    duration: 60,
    isActive: false,
  },
  {
    id: "exercise",
    name: "Exercise",
    dopamineImpact: -0.4,
    icon: "🏃",
    color: "hsl(var(--secondary))",
    duration: 45,
    isActive: false,
  },
  {
    id: "reading",
    name: "Reading",
    dopamineImpact: -0.5,
    icon: "📖",
    color: "hsl(var(--success))",
    duration: 45,
    isActive: false,
  },
  {
    id: "cooking",
    name: "Cooking",
    dopamineImpact: -0.3,
    icon: "🍳",
    color: "hsl(var(--secondary))",
    duration: 30,
    isActive: false,
  },
  {
    id: "meditation",
    name: "Meditation",
    dopamineImpact: -0.7,
    icon: "🧘",
    color: "hsl(var(--success))",
    duration: 20,
    isActive: false,
  },
  {
    id: "gaming",
    name: "Gaming",
    dopamineImpact: 0.9,
    icon: "🎮",
    color: "hsl(var(--warning))",
    duration: 90,
    isActive: false,
  },
  {
    id: "social-media",
    name: "Social Media",
    dopamineImpact: 0.8,
    icon: "📱",
    color: "hsl(var(--warning))",
    duration: 60,
    isActive: false,
  },
  {
    id: "watching-tv",
    name: "Watching TV",
    dopamineImpact: 0.6,
    icon: "📺",
    color: "hsl(var(--warning))",
    duration: 120,
    isActive: false,
  },
  {
    id: "eating",
    name: "Eating",
    dopamineImpact: 0.4,
    icon: "🍽️",
    color: "hsl(var(--accent))",
    duration: 30,
    isActive: false,
  },
];

const Index = () => {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [dopamineData, setDopamineData] = useState<DopamineDataPoint[]>([
    { time: 0, level: 50 }
  ]);

  useEffect(() => {
    const data = calculateDopamineGraph(activities);
    setDopamineData(data);
  }, [activities]);

  const handleToggle = (id: string) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id ? { ...activity, isActive: !activity.isActive } : activity
      )
    );
  };

  const handleDurationChange = (id: string, duration: number) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id ? { ...activity, duration } : activity
      )
    );
  };

  const handleReset = () => {
    setActivities(INITIAL_ACTIVITIES);
  };

  const activeCount = activities.filter(a => a.isActive).length;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dopamine Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your daily activities and see how they affect your dopamine levels.
            Low dopamine activities build your baseline, while high dopamine activities create spikes that crash.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Activities Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Your Activities
                {activeCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({activeCount} active)
                  </span>
                )}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>

            <div className="grid gap-3">
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onToggle={handleToggle}
                  onDurationChange={handleDurationChange}
                />
              ))}
            </div>
          </div>

          {/* Graph Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <DopamineGraph data={dopamineData} />
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-muted/50 rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            💡 How Dopamine Loading Works
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Low dopamine activities</strong> (studying, exercise, meditation) 
              feel harder initially but gradually increase your baseline dopamine, making you more motivated and focused.
            </p>
            <p>
              <strong className="text-foreground">High dopamine activities</strong> (gaming, social media) 
              give instant gratification but spike your dopamine, leading to a crash that makes other activities feel less rewarding.
            </p>
            <p>
              <strong className="text-foreground">Strategy:</strong> Start your day with low dopamine activities 
              to build your baseline, then reward yourself with high dopamine activities later. This creates sustainable motivation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
