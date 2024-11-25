<script>
  let count = 0;

  const increment = () => {
    count += 1;
  };
</script>

<button on:click={increment}>
  // onclick을 on:click으로 수정 count is {count}
</button>
