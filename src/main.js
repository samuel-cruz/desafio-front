import { Login } from "./pages/login";
import { Home } from "./components/home";
new Login(() => {
  new Home();
});
