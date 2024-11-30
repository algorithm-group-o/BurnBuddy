<script>
  import Background from "../components/background.svelte";
  import Stepper from "../components/stepper.svelte";
  import WorkoutAbleTime from "../components/WorkoutAbleTime.svelte";
  import WorkoutSelect from "../components/WorkoutSelect.svelte";
  import WorkoutTargetCalories from "../components/WorkoutTargetCalories.svelte";
  import { exercises } from "../lib/exercises";

  let selectedWorkout;
  let step = 1;
</script>

<Background>
  <Stepper {step} />
  {#if step == 1}
    <WorkoutSelect bind:selectedWorkout bind:step />
  {:else if step == 2}
    <WorkoutTargetCalories bind:step />
  {:else if step == 3}
    <WorkoutAbleTime bind:step />
  {/if}
</Background>
