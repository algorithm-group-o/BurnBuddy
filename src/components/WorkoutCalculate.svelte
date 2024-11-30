<script>
  export let selectedWorkout;
  export let targetCalories;
  export let availableTime;

  import { exercises } from "../lib/exercises";

  let schedule = [];
  let totalBurnedCalories = 0;
  let remainingCalories = 0;

  $: if (selectedWorkout && targetCalories && availableTime) {
    calculateSchedule();
  }

  function calculateSchedule() {
    schedule = [];
    const maxSessions = Math.floor(availableTime / 30);
    let remainingTime = availableTime;
    remainingCalories = targetCalories;
    let lastIntensity = null;

    // 선호하는 운동으로 시작
    const preferredExercise = exercises.find(
      (ex) => ex.name === selectedWorkout
    );
    if (preferredExercise) {
      schedule.push({
        name: preferredExercise.name,
        calories: preferredExercise.calories,
        intensity: preferredExercise.intensity,
      });
      remainingCalories -= preferredExercise.calories;
      remainingTime -= 30;
      lastIntensity = preferredExercise.intensity;
    }

    // 나머지 세션 계산
    for (
      let session = 2;
      session <= maxSessions && remainingTime >= 30;
      session++
    ) {
      let bestExercise = null;
      let minRemainingCalories = remainingCalories;

      for (const exercise of exercises) {
        // 이미 사용된 운동이나 연속된 고강도 운동 제외
        if (exercise.intensity === "H" && lastIntensity === "H") continue;
        if (remainingCalories >= exercise.calories) {
          const newRemainingCalories = remainingCalories - exercise.calories;
          if (newRemainingCalories < minRemainingCalories) {
            bestExercise = exercise;
            minRemainingCalories = newRemainingCalories;
          }
        }
      }

      if (!bestExercise) break;

      schedule.push({
        name: bestExercise.name,
        calories: bestExercise.calories,
        intensity: bestExercise.intensity,
      });
      remainingCalories = minRemainingCalories;
      remainingTime -= 30;
      lastIntensity = bestExercise.intensity;
    }

    totalBurnedCalories = targetCalories - remainingCalories;
  }
</script>

<section class="px-4 flex-1 flex flex-col h-[calc(100vh-86px)]">
  <div class="flex-1 overflow-y-auto">
    <p class="font-bold text-xl mb-4">Your Workout Schedule</p>

    {#if schedule.length > 0}
      <div class="mb-6 p-3 bg-gray-800 rounded-lg border border-gray-700">
        <p class="font-bold text-lg mb-2">Workout Summary</p>
        <div class="space-y-2">
          <div class="bg-gray-900 p-3 rounded-lg">
            <p class="text-gray-400 text-sm">Total Calories Burned</p>
            <p class="font-semibold text-lg">
              {totalBurnedCalories}
            </p>
          </div>
          <div class="bg-gray-900 p-3 rounded-lg">
            <p class="text-gray-400 text-sm">Remaining Calories</p>
            <p class="font-semibold text-lg">{remainingCalories}</p>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        {#each schedule as exercise, i}
          <div class="bg-gray-900 p-3 rounded-lg">
            <p class="font-semibold">Session {i + 1}: {exercise.name}</p>
            <div class="text-sm text-gray-400 mt-1">
              <p>Calories: {exercise.calories}</p>
              <p>Intensity: {exercise.intensity}</p>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-gray-400">Calculating your workout schedule...</p>
    {/if}
  </div>
</section>
