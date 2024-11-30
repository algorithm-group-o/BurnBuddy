<script>
  import Background from "../components/background.svelte";
  import Stepper from "../components/stepper.svelte";
  import WorkoutAbleTime from "../components/WorkoutAbleTime.svelte";
  import WorkoutSelect from "../components/WorkoutSelect.svelte";
  import WorkoutTargetCalories from "../components/WorkoutTargetCalories.svelte";
  import WorkoutCalculate from "../components/WorkoutCalculate.svelte";
  import { exercises } from "../lib/exercises";
  import SplashPage from "../components/SplashPage.svelte";

  let selectedWorkout;
  let step = 0;
  let targetCalories;
  let availableTime;
</script>

<Background>
  {#if step == 0}
    <SplashPage bind:step />
  {/if}
  <Stepper {step} />
  {#if step == 1}
    <WorkoutSelect bind:step bind:selectedWorkout />
  {:else if step == 2}
    <WorkoutTargetCalories bind:step bind:targetCalories {selectedWorkout} />
  {:else if step == 3}
    <WorkoutAbleTime bind:step bind:availableTime />
  {:else if step == 4}
    <WorkoutCalculate {selectedWorkout} {targetCalories} {availableTime} />
  {/if}
</Background>
