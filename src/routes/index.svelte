<script>
  import Background from "../components/background.svelte";
  import Stepper from "../components/stepper.svelte";
  import WorkoutSelect from "../components/WorkoutSelect.svelte";
  import WorkoutTargetCalories from "../components/WorkoutTargetCalories.svelte";
  import { exercises } from "../lib/exercises";

  let selectedWorkout;
  let step = 2;
</script>

<Background>
  <Stepper {step} />
  {#if step == 1}
    <WorkoutSelect bind:selectedWorkout />
  {:else if step == 2}
    <WorkoutTargetCalories />
  {/if}
</Background>
