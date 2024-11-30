<script>
  export let selectedWorkout;
  export let targetCalories;
  export let availableTime;

  import { exercises } from "../lib/exercises";

  let schedule = [];
  let totalBurnedCalories = 0;
  let remainingCalories = 0;
  let loadingStatus = "";
  let loading = false;

  $: if (selectedWorkout && targetCalories && availableTime) {
    loading = true;
    calculateSchedule().finally(() => {
      loading = false;
    });
  }

  async function calculateSchedule() {
    schedule = [];
    loading = true;
    loadingStatus = "Calculating number of sessions...";
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const maxSessions = Math.floor(availableTime / 30);
    let remainingTime = availableTime;
    remainingCalories = targetCalories;
    let lastIntensity = null;

    loadingStatus = "Finding your preferred exercise...";
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Find and add preferred exercise first
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

    loadingStatus = "Optimizing additional exercises using greedy algorithm...";
    await new Promise((resolve) => setTimeout(resolve, 4000));

    for (
      let session = 2;
      session <= maxSessions && remainingTime >= 30;
      session++
    ) {
      let bestExercise = null;
      let minRemainingCalories = remainingCalories;

      for (const exercise of exercises) {
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

    loadingStatus = "Schedule completed!";
    totalBurnedCalories = targetCalories - remainingCalories;
  }
</script>

<section class="px-4 flex-1 flex flex-col h-[calc(100vh-86px)]">
  <div class="flex-1 overflow-y-auto">
    <p class="font-bold text-xl mb-4">Your Workout Schedule</p>

    {#if loading}
      <div class="flex items-center justify-center space-x-2">
        <p class="text-gray-400 ml-2">{loadingStatus}</p>
      </div>
    {:else if schedule.length > 0}
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
    {/if}
  </div>
</section>
