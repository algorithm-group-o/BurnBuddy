<script>
  import { Router, Route } from "svelte-routing";
  import Index from "./routes/index.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="/" component={Index} />
</Router>
