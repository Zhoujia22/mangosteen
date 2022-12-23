import { defineComponent, PropType } from "vue";
import s from "./Center.module.scss";

const directionMap = {
  "|": "vertical",
  "-": "horizontal",
  vertical: "vertical",
  horizontal: "horizontal",
};
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<"|" | "-" | "vertical" | "horizontal">,
      default: "horizontal",
    },
  },
  setup: (props, context) => {
    const extraClass = directionMap[props.direction];
    return () => (
      <div class={[s.center, extraClass]}>{context.slots.default?.()}</div>
    );
  },
});
