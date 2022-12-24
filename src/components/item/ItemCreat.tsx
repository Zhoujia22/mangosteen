import { defineComponent, PropType } from 'vue';
import s from './ItemCreat.module.scss';
export const ItemCreat = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}></div>
    )
  }
})