import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import cloud from "../../assets/icons/cloud.svg";
import s from "./WelcomeLayout.module.scss";
import { WelcomeLayout } from "./WelcomeLayout";

export const Fourth = defineComponent({
  setup: (props, context) => {
    const slots = {
      icon: () => <img src={cloud}></img>,
      title: () => (
        <h2>
          云备份
          <br />
          不担心数据丢失
        </h2>
      ),
      buttons: () => (
        <>
          {" "}
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/start">完成</RouterLink>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
        </>
      ),
    };
    return () => <WelcomeLayout v-slots={slots}></WelcomeLayout>;
  },
});
