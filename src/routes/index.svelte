<script>
  import Background from "../components/background.svelte";
  import Stepper from "../components/stepper.svelte";
  import WorkoutSelect from "../components/WorkoutSelect.svelte";
  import { exercises } from "../lib/exercises";
</script>

<Background>
  <Stepper />
  <WorkoutSelect />
</Background>
