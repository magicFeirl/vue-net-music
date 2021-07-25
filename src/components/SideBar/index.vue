<template>
  <div>
    <ul>
      <router-link to="/"><li>发现音乐</li></router-link>
      <router-link to="/playlists"><li>推荐歌单</li></router-link>
      <router-link to="/mvs"><li>最新MV</li></router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  methods: {},
};
</script>
<style lang="less" scoped>
li {
  margin: 10px;
  padding: 10px;
  color: #999;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #333333;
  }
}
</style>
