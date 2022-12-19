import { computed, onMounted, ref, Ref } from "vue";

type Point = { x: number; y: number };

export const useSwipe = (element: Ref<HTMLElement | null>) => {
  const start = ref<Point>();
  const end = ref<Point>();
  const swiping = ref(false);
  const distance = computed(() => {
    if (!end.value || !start.value) {
      return "";
    } else
      return {
        x: end.value.x - start.value.x,
        y: end.value.y - start.value.y,
      };
  });
  const direction = computed(() => {
    if (!swiping) {
      return "";
    }
    if (!distance.value) {
      return "";
    }
    const { x, y } = distance.value;
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? "right" : "left";
    } else {
      return y > 0 ? "down" : "up";
    }
  });
  onMounted(() => {
    element.value?.addEventListener("touchstart", (e) => {
      start.value = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      end.value = {
        x: 0,
        y: 0,
      };
      swiping.value = true;
    });
    element.value?.addEventListener("touchmove", (e) => {
      end.value = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    });
    element.value?.addEventListener("touchend", (e) => {
      swiping.value = false;
<<<<<<< HEAD
=======
      (end.value = undefined), (start.value = undefined);
>>>>>>> 67fff9e (添加useSwipe)
    });
  });
  return { direction, distance, swiping, start, end };
};
