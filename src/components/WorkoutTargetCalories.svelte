<script>
  let targetCalories = "";
  let isValid = false;

  function validateInput(value) {
    const calories = parseInt(value);
    isValid = !isNaN(calories) && calories > 0 && calories <= 2000;
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
                Please enter a number between 1 and 2000
              </p>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="w-full pb-4 sticky bottom-0 bg-black">
    <button
      class="w-full text-white p-3 rounded-lg font-semibold text-lg {isValid
        ? 'bg-[#00C200] hover:bg-[#00B000]'
        : 'bg-gray-600 cursor-not-allowed'}"
      disabled={!isValid}
    >
      Continue
    </button>
  </div>
</section>
