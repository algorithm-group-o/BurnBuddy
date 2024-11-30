<script>
  export let step;
  export let targetCalories;
  export let selectedWorkout;

  import { exercises } from "../lib/exercises";

  let isValid = false;

  $: {
    if (targetCalories) {
      validateInput(targetCalories);
    }
  }

  function validateInput(value) {
    const calories = parseInt(value);
    const workout = exercises.find((ex) => ex.name === selectedWorkout);

    if (workout) {
      isValid =
        !isNaN(calories) && calories >= workout.calories && calories <= 2000;
    } else {
      isValid = false;
    }
  }

  function handleInput(event) {
    const value = event.target.value.replace(/[^0-9]/g, "");
    targetCalories = value;
    validateInput(value);
  }
</script>

<section class="px-4 flex-1 flex flex-col justify-between h-[calc(100vh-86px)]">
  <div>
    <p class="font-bold text-xl">Enter your target calories to burn</p>
    <div class="mt-4">
      <div class="relative">
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          bind:value={targetCalories}
          on:input={handleInput}
          placeholder="e.g. 500"
          class="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-900 focus:border-white outline-none text-lg"
        />
        {#if targetCalories}
          <div class="mt-2 text-sm">
            {#if isValid}
              <p class="text-green-500">Valid calorie target</p>
            {:else}
              <p class="text-red-500">
                {#if selectedWorkout}
                  {#if exercises.find((ex) => ex.name === selectedWorkout)}
                    Please enter a number between {exercises.find(
                      (ex) => ex.name === selectedWorkout
                    ).calories} and 2000
                  {:else}
                    Please select a workout first
                  {/if}
                {:else}
                  Please select a workout first
                {/if}
              </p>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="w-full pb-4 sticky bottom-0 bg-black">
    <button
      class="w-full mb-4 flex items-center justify-center gap-2 text-sm"
      on:click={() => {
        step = 1;
      }}><i class="fa-light fa-chevron-left text-xs"></i>Previous Page</button
    >
    <button
      class="w-full text-white p-3 rounded-lg font-semibold text-lg {isValid
        ? 'bg-[#00C200] hover:bg-[#00B000]'
        : 'bg-gray-600 cursor-not-allowed'}"
      disabled={!isValid}
      on:click={() => {
        step = 3;
      }}
    >
      Continue
    </button>
  </div>
</section>
