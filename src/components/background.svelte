<script>
  import BurnBuddy from "../assets/burnbuddy.png";
</script>

<main class="container">
  <article class="content">
    <nav>
      <div class="p-3">
        <img src={BurnBuddy} alt="BurnBuddy" class="h-7" />
      </div>
    </nav>
    <slot />
  </article>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #1e1e1e;
    color: #fff;
    min-height: 100vh;
  }

  .container {
    max-width: 100%;
    margin: 0 auto;
    height: 100vh;
  }

  .content {
    height: 100vh;
    background-color: #000;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(255, 255, 255, 0.01);
  }

  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }
</style>
