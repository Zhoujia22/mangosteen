import { defineComponent, PropType } from "vue";
import { RouterLink } from "vue-router";
import { Button } from "../shared/Button";
import { Center } from "../shared/Center";
import { FloatButton } from "../shared/FloatButton";
import { Icon } from "../shared/Icon";
import { Navbar } from "../shared/Navbar";
import { Overlay } from "../shared/Overlay";
import s from "./MainLayout.module.scss";
export const MainLayout = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <Navbar>
          {{
            default: () => context.slots.title?.(),

            icon: () => context.slots.icon?.(),
          }}
        </Navbar>
        {context.slots.default?.()}
      </div>
    );
  },
});
