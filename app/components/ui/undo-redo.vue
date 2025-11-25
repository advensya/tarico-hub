<script lang="ts" setup>
import * as _ from "lodash";

const props = defineProps({
  compare: {
    type: Function as PropType<(oldData: any, newData: any) => boolean>,
  },
});

const data = defineModel<Record<string, any>>({ default: {} });
const delay = 500;
let planning: NodeJS.Timeout | null = null;
const position = ref(0);
const history = ref([_.cloneDeep(data.value)]);

watch(
  () => data.value,
  () => {
    if (!planning) {
      planning = setTimeout(() => onChange(), delay);
    }
  },
  { deep: true }
);

function onChange() {
  if (planning) {
    clearTimeout(planning);
    planning = null;
  }

  let is = false;

  if (props.compare) {
    is = props.compare(history.value[position.value], data.value);
  } else is = _.isEqual(data.value, history.value[position.value]);

  if (!is) {
    if (position.value < history.value.length - 1) {
      history.value.splice(position.value + 1);
    }

    position.value = history.value.push(_.cloneDeep(data.value)) - 1;
  }
}

function undo() {
  if (position.value > 0) {
    position.value--;
    data.value = _.cloneDeep(history.value[position.value]) || data.value;
  }
}

function redo() {
  if (position.value < history.value.length - 1) {
    position.value++;
    data.value = _.cloneDeep(history.value[position.value]) || data.value;
  }
}

const canUndo = computed(() => {
  return position.value > 0;
});
const canRedo = computed(() => {
  return position.value < history.value.length - 1;
});
</script>

<template>
  <slot :position :canUndo :canRedo :redo :undo />
</template>
