<script>
  import Lottie from "lottie-web";
  import { onMount } from "svelte";

  export let selectedWorkout;
  export let targetCalories;
  export let availableTime;

  import { exercises } from "../lib/exercises";

  let schedule = [];
  let totalBurnedCalories = 0;
  let remainingCalories = 0;
  let loadingStatus = "";
  let loading = false;

  let animationContainer;
  let animation;

  onMount(() => {
    animation = Lottie.loadAnimation({
      container: animationContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/BurnBuddy/src/assets/loading.json",
    });

    return () => {
      if (animation) animation.destroy();
    };
  });

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
    {#if loading}
      <p class="font-bold text-xl mb-3">Calculating...</p>
      <div class="flex flex-col items-center justify-center space-y-4">
        <p class="text-gray-400 text-left w-full mb-6">{loadingStatus}</p>
        <div class="overflow-hidden">
          <div bind:this={animationContainer} class="w-64 h-64 scale-150"></div>
        </div>
      </div>
    {:else if schedule.length > 0}
      <p class="font-bold text-xl mb-4">Your Workout Schedule</p>
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

      <div class="space-y-3 pb-3">
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

  {#if !loading && schedule.length > 0}
    <div class="w-full pb-4 sticky bottom-0 bg-black">
      <button
        class="w-full text-white p-3 rounded-lg font-semibold text-lg bg-[#00C200] hover:bg-[#00B000]"
        on:click={() => {
          location.reload();
        }}
      >
        Start Over
      </button>
    </div>
  {/if}
</section>
