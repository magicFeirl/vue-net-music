<template>
  <!-- 布局实现 -->
  <div class="container">
    <!-- sidebar 的 item 由父组件传入 -->
    <side-bar class="sidebar"></side-bar>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import SideBar from "@/components/SideBar";

export default {
  name: "PlayerBody",
  components: {
    SideBar,
  },
};
</script>
<style lang="less">
.container {
  display: flex;
  width: 100%;
  height: inherit;
}

.sidebar {
  flex-grow: 2;
  width: 0;
  border-right: 1px solid #444444;
}

.content {
  flex-grow: 10;
  width: 0;
  padding: 20px 30px;
  max-height: 100%;
  overflow: auto;
}
</style>
