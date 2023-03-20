import { defineEmits } from "vue";

const emit = defineEmits(["ready"]);

export const useAsyncDataStatus = () => {
  const isReady = ref(false);

  const finish = () => {
    isReady.value = true;
    emit("ready");
  };

  return {
    isReady,
    finish,
  };
};

export default useAsyncDataStatus;
