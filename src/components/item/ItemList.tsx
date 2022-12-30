import { defineComponent, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { Time } from "../../shared/time";
import s from "./ItemList.module.scss";
import { ItemSummery } from "./ItemSummary";
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refSelected = ref("本月");
    const t = new Time(new Date(2000, 0, 31, 0, 0, 0));
    console.log(t.add(1, "month").getRaw());
    return () => (
      <MainLayout>
        {{
          title: () => "山竹记账",
          icon: () => <Icon name="menu" class={s.navIcon}></Icon>,
          default: () => (
            <Tabs classPrefix="customTabs" v-model:selected={refSelected.value}>
              <Tab name="本月">
                <ItemSummery />
              </Tab>
              <Tab name="上月">
                <ItemSummery />
              </Tab>
              <Tab name="今年">
                <ItemSummery />
              </Tab>
              <Tab name="自定义时间">
                <ItemSummery />
              </Tab>
            </Tabs>
          ),
        }}
      </MainLayout>
    );
  },
});
