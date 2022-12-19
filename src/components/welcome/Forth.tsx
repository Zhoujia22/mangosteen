import s from "./welcome.module.scss";
import { FunctionalComponent } from "vue";
import clock from "../../assets/icons/clock.svg";

export const Forth: FunctionalComponent = () => (
  <div class={s.card}>
    <img src={clock} />
    <h2>
      每日提醒
      <br />
      不遗漏每一笔账单
    </h2>
  </div>
);

Forth.displayName = "Forth";
