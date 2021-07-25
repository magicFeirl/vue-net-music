<template>
  <div class="mv-grid">
    <div
      @click="playMV(item.id)"
      class="playlist-item"
      v-for="(item, idx) in mvList"
      :key="idx"
    >
      <div v-if="item.copywriter" class="playlist-desc nowrap-text">
        {{ item.copywriter }}
      </div>
      <el-image
        :src="mvCover(item)"
        fit="cover"
        class="playlist-cover"
        lazy
      ></el-image>
      <p class="playlist-name nowrap-text">
        {{ item.name }}<br /><span class="artist-name">{{
          item.artists[0].name
        }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "MVList",
  props: {
    mvList: [],
  },
  methods: {
    playMV(id) {
      this.$router.push({ path: "/mv", query: { id } });
    },
    mvCover(item){
        return (item.picUrl ? item.picUrl : item.cover) + '?param=255y143'
    }
  },
};
</script>
<style lang="less">
// 推荐MV
.mv-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;

  & > div {
    cursor: pointer;
  }

  .el-image {
    height: 143px;
  }
}
</style>
