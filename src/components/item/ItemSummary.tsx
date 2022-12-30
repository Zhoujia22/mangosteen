import { defineComponent, PropType } from "vue";
export const ItemSummery = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div></div>;
  },
});
