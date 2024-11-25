<script>
  import { Router, Route } from "svelte-routing";
  import Index from "./routes/index.svelte";
  import { onMount } from "svelte";

  export let url = "";
</script>

<Router {url} basepath="/BurnBuddy">
  <Route path="/" component={Index} />
</Router>
