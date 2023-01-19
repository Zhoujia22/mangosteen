import { defineComponent, PropType } from 'vue';
import { Center } from './Center';
import s from './ComingSoon.module.scss';
import { Icon } from './Icon';
export const ComingSoon = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <Center class={s.build_wrapper}>
          <Icon name="build" class={s.build} />
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    );
  },
});
