<template>
  <div class="page-section">
    <h2 class="title">{{ title }}</h2>
    <el-row :gutter="gutter">
      <el-col
        class="playlist-item"
        :span="6"
        v-for="(item, idx) in data"
        :key="idx"
      >
        <div class="playlist-desc nowrap-text">
          {{ item.copywriter }}
        </div>
        <el-image
          :src="item.picUrl"
          fit="cover"
          class="playlist-cover"
        ></el-image>
        <p class="playlist-name nowrap-text">{{ item.name }}</p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "PageSection",
};
</script>
<style lang="less" scoped></style>
