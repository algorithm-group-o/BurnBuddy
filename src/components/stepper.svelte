<script>
  export let step = 1;
</script>

<div class="flex space-x-2 pt-2 pb-6 px-4">
  <!-- 첫 번째 스텝 -->
  <div class="flex-1 h-0.5 bg-gray-200 rounded-lg">
    <div
      class="h-0.5 bg-[#00B000] duration-200"
      style="width: {step > 1 ? '100%' : '0%'}"
    ></div>
  </div>

  <!-- 두 번째 스텝 -->
  <div class="flex-1 h-0.5 bg-gray-200 rounded-lg">
    <div
      class="h-0.5 bg-[#00B000] duration-200"
      style="width: {step > 2 ? '100%' : '0%'}"
    ></div>
  </div>

  <!-- 세 번째 스텝 -->
  <div class="flex-1 h-0.5 bg-gray-200 rounded-lg">
    <div
      class="h-0.5 bg-[#00B000] duration-200"
      style="width: {step > 3 ? '100%' : '0%'}"
    ></div>
  </div>
</div>
