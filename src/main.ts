import "@svgstore";
import { createApp } from "vue";
import { createRouter } from "vue-router";
import { App } from "./App";
import { routes } from "./config/routes";
import { history } from "./shared/history";
import { fetchMe, mePromise } from "./shared/me";

const router = createRouter({ history, routes });

fetchMe();

// const whiteList: Record<string, "exact" | "startsWith"> = {
//   "/": "exact",
//   "/start": "exact",
//   "/welcome": "startsWith",
//   "/sign_in": "startsWith",
// };

// router.beforeEach((to) => {
//   for (const key in whiteList) {
//     const value = whiteList[key];
//     if (value === "exact" && to.path === key) {
//       return true;
//     }
//     if (value === "startsWith" && to.path === key) {
//       return true;
//     }
//   }
//   return mePromise!.then(
//     () => true,
//     () => "/sign_in?return_to=" + to.path
//   );
// });

router.beforeEach(async (to, from) => {
  if (
    to.path === "/" ||
    to.path.startsWith("/welcome") ||
    to.path.startsWith("/sign_in") ||
    to.path === "/start"
  ) {
    return true;
  } else {
    return mePromise!.then(
      () => true,
      () => "/sign_in?return_to=" + to.path
    );
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
