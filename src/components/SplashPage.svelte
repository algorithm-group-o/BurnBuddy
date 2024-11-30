<script>
  import BurnBuddy from "../assets/burnbuddy.png";
  import { slide } from "svelte/transition";
  import { backOut } from "svelte/easing";

  let modalOpen = true;

  export let step;
</script>

{#if modalOpen}
  <div class="fixed inset-0 w-full h-dvh z-[41]">
    <div class="relative min-w-full h-dvh">
      <div
        class="bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-full h-full z-[45] h-dvh"
      >
        <div class="px-4 h-full flex flex-col justify-between">
          <div
            class="flex-1 flex flex-col items-start justify-center space-y-6"
          >
            <img src={BurnBuddy} alt="BurnBuddy" class="h-12" />
            <div class="text-left">
              <h1 class="text-3xl font-bold mb-2">
                Your Path to Peak Performance
              </h1>
              <p class="text-gray-400">
                Your fitness companion powered by dynamic programming for
                intelligent, personalized training
              </p>
            </div>
          </div>
          <div class="w-full pb-4 bg-black">
            <button
              on:click={() => {
                step = 1;
              }}
              class="w-full text-white p-3 rounded-lg font-semibold text-lg bg-[#00C200] hover:bg-[#00B000]"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
