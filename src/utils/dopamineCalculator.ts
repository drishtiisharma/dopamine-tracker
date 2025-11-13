import { Activity, DopamineDataPoint } from "@/types/activity";

const BASELINE_DOPAMINE = 50;
const RECOVERY_RATE = 0.5; // How fast dopamine recovers per minute
const SPIKE_MULTIPLIER = 30; // Multiplier for instant dopamine spikes
const DECAY_RATE = 0.3; // How fast high dopamine activities decay

export const calculateDopamineGraph = (activities: Activity[]): DopamineDataPoint[] => {
  const activeActivities = activities.filter(a => a.isActive && a.duration > 0);
  
  if (activeActivities.length === 0) {
    return [{ time: 0, level: BASELINE_DOPAMINE }];
  }

  const dataPoints: DopamineDataPoint[] = [];
  let currentTime = 0;
  let currentLevel = BASELINE_DOPAMINE;

  // Sort activities by their impact (negative first for proper loading)
  const sortedActivities = [...activeActivities].sort((a, b) => a.dopamineImpact - b.dopamineImpact);

  sortedActivities.forEach((activity) => {
    const startLevel = currentLevel;
    const impact = activity.dopamineImpact;
    
    // Add starting point
    dataPoints.push({ time: currentTime, level: currentLevel });

    if (impact < 0) {
      // Low dopamine activity - gradual decrease then recovery
      const lowPoint = Math.max(20, currentLevel + (impact * SPIKE_MULTIPLIER));
      
      // Decline phase (first 30% of duration)
      const declineTime = activity.duration * 0.3;
      for (let i = 1; i <= 5; i++) {
        const progress = i / 5;
        dataPoints.push({
          time: currentTime + (declineTime * progress),
          level: startLevel + ((lowPoint - startLevel) * progress)
        });
      }

      // Recovery phase (remaining 70% of duration)
      const recoveryStart = currentTime + declineTime;
      const recoveryDuration = activity.duration * 0.7;
      const recoveryTarget = Math.min(BASELINE_DOPAMINE + 10, lowPoint + (RECOVERY_RATE * recoveryDuration));
      
      for (let i = 1; i <= 7; i++) {
        const progress = i / 7;
        dataPoints.push({
          time: recoveryStart + (recoveryDuration * progress),
          level: lowPoint + ((recoveryTarget - lowPoint) * progress)
        });
      }

      currentLevel = recoveryTarget;
      currentTime += activity.duration;

    } else {
      // High dopamine activity - quick spike then decay
      const peakLevel = Math.min(100, currentLevel + (impact * SPIKE_MULTIPLIER));
      
      // Spike phase (first 20% of duration)
      const spikeTime = activity.duration * 0.2;
      for (let i = 1; i <= 3; i++) {
        const progress = i / 3;
        dataPoints.push({
          time: currentTime + (spikeTime * progress),
          level: startLevel + ((peakLevel - startLevel) * progress)
        });
      }

      // Decay phase (remaining 80% of duration)
      const decayStart = currentTime + spikeTime;
      const decayDuration = activity.duration * 0.8;
      const decayTarget = Math.max(30, peakLevel - (DECAY_RATE * decayDuration));
      
      for (let i = 1; i <= 8; i++) {
        const progress = i / 8;
        const easeOut = 1 - Math.pow(1 - progress, 2); // Ease out curve
        dataPoints.push({
          time: decayStart + (decayDuration * progress),
          level: peakLevel - ((peakLevel - decayTarget) * easeOut)
        });
      }

      currentLevel = decayTarget;
      currentTime += activity.duration;
    }
  });

  return dataPoints;
};
