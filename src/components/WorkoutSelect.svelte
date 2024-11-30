<script>
  import { exercises } from "../lib/exercises";
  import { onMount } from "svelte";

  let selectedWorkout;
  let scrollContainer;
  let showScrollIndicator = false;

  onMount(() => {
    checkScroll();
    scrollContainer.addEventListener("scroll", checkScroll);
    return () => scrollContainer.removeEventListener("scroll", checkScroll);
  });

  function checkScroll() {
    if (!scrollContainer) return;
    const { scrollHeight, clientHeight, scrollTop } = scrollContainer;
    showScrollIndicator =
      scrollHeight > clientHeight &&
      scrollTop < scrollHeight - clientHeight - 20;
  }
</script>

<!-- Start of Selection -->
<section class="px-4 flex-1 flex flex-col justify-between h-[calc(100vh-52px)]">
  <div>
    <p class="font-bold text-xl">Choose your favorite workout</p>
    <div class="relative">
      <div
        class="space-y-2 mt-4 h-full overflow-y-auto max-h-[calc(100vh-52px-8rem)]"
        bind:this={scrollContainer}
      >
        {#each exercises as item}
          <button
            class="px-3 py-2 rounded-lg bg-gray-900 w-full text-left border {selectedWorkout ==
            item.name
              ? 'border-white'
              : 'border-gray-900'}"
            on:click={() => {
              selectedWorkout = item.name;
            }}
          >
            <p class="text-lg font-semibold">
              {item.name}
            </p>
            <div class="grid grid-cols-2 mt-1">
              <div class="flex items-center gap-2">
                <span class="text-gray-400">Calories burned:</span>
                <span class="font-medium">
                  {item.calories}
                </span>
              </div>

              <div class="flex items-center gap-2">
                <span class="text-gray-400">Intensity:</span>
                <span class="font-medium">
                  {item.intensity}
                </span>
              </div>
            </div>
          </button>
        {/each}
      </div>

      {#if showScrollIndicator}
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce">
          <i class="fa-regular fa-chevron-down"></i>
        </div>
      {/if}
    </div>
  </div>
  <div class="w-full pb-4 sticky bottom-0 bg-black">
    <button
      class="w-full text-white p-3 rounded-lg font-semibold text-lg {selectedWorkout
        ? 'bg-[#00C200] hover:bg-[#00B000]'
        : 'bg-gray-600 cursor-not-allowed'}"
      disabled={!selectedWorkout}
    >
      Selection Complete
    </button>
  </div>
</section>
