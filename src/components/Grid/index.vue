<template>
  <div class="grid" :style="{ '--col': col , '--gap': gap + 'px'}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Grid",
  props: {
    col: {
      type: [String, Number],
      require: true,
    },
    gap: {
        type: [String, Number],
        default: 0
    }
  },
};
</script>
<style lang="less" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(var(--col), 1fr);
  gap: var(--gap);
}
</style>
