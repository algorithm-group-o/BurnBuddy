<script>
  export let step;
  let availableTime = "";
  let isValid = false;

  function validateInput(value) {
    const minutes = parseInt(value);
    isValid = !isNaN(minutes) && minutes >= 30 && minutes <= 180;
  }

  function handleInput(event) {
    const value = event.target.value.replace(/[^0-9]/g, "");
    availableTime = value;
    validateInput(value);
  }
</script>

<section class="px-4 flex-1 flex flex-col justify-between h-[calc(100vh-86px)]">
  <div>
    <p class="font-bold text-xl">Enter your available time (in minutes)</p>
    <div class="mt-4">
      <div class="relative">
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          bind:value={availableTime}
          on:input={handleInput}
          placeholder="e.g. 60"
          class="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-900 focus:border-white outline-none text-lg"
        />
        {#if availableTime}
          <div class="mt-2 text-sm">
            {#if isValid}
              <p class="text-green-500">Valid time duration</p>
            {:else}
              <p class="text-red-500">
                Please enter a time between 30 and 180 minutes
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
        step = 2;
      }}><i class="fa-light fa-chevron-left text-xs"></i>Previous Page</button
    >
    <button
      class="w-full text-white p-3 rounded-lg font-semibold text-lg {isValid
        ? 'bg-[#00C200] hover:bg-[#00B000]'
        : 'bg-gray-600 cursor-not-allowed'}"
      disabled={!isValid}
    >
      Complete
    </button>
  </div>
</section>
