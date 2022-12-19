import s from "./welcome.module.scss";
import { FunctionalComponent } from "vue";
import chart from "../../assets/icons/bar-chart.svg";

export const Second: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <img src={chart} />
      <h2>
        每日提醒
        <br />
        不遗漏每一笔账单
      </h2>
    </div>
  );
};

Second.displayName = "Second";
