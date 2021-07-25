<template>
  <div>
    <!-- 顶部精品歌单 -->
    <div class="playlist-header" @click="gotoPlayList(highQuaPlaylist.id)">
      <el-image :src="`${highQuaPlaylist.coverImgUrl}?param=200y200`"></el-image>
      <div class="playlist-info">
        <span class="tag">精品歌单</span>
        <h2 class="title">{{ highQuaPlaylist.name }}</h2>
        <p class="description">{{ highQuaPlaylist.description }}</p>
      </div>
    </div>

    <!-- 歌曲分类tabs -->
    <div class="tabs">
      <span
        :class="{ 'tab-active': idx == tabActiveIndex }"
        @click="tabClickHandle(idx, item.playlistTag.name)"
        v-for="(item, idx) in tabs"
        :key="idx"
      >
        {{ item.playlistTag.name }}</span
      >
    </div>

    <!-- 歌单列表显示区域 -->
    <div class="playlist-body">
      <div
        @click="gotoPlayList(item.id)"
        class="playlist-item"
        v-for="(item, idx) in playlist"
        :key="idx"
      >
        <div class="playlist-desc nowrap-text">播放 {{ item.playCount }}</div>
        <el-image
          :src="`${item.coverImgUrl}?param=200y200`"
          fit="cover"
          class="playlist-cover"
          lazy
        ></el-image>
        <p class="playlist-name nowrap-text">{{ item.name }}</p>
      </div>
    </div>

    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total"
      hide-on-single-page
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  created() {
    this.getHighQuaPlaylist();
    this.getPlayList(1);
    this.getTabs();
  },
  data() {
    return {
      highQuaPlaylist: [],
      playlist: [],
      cat: "全部",
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tabs: [],
      tabActiveIndex: 0,
    };
  },
  methods: {
    handleCurrentChange(newPage) {
      this.getPlayList(parseInt(newPage));
    },
    tabClickHandle(idx, cat) {
      this.cat = cat;
      this.tabActiveIndex = idx;
      this.getPlayList(1);
      this.getHighQuaPlaylist();
    },
    getTabs() {
      this.$http.get("/playlist/hot").then((res) => {
        const { data } = res;
        this.tabs = data.tags;
        this.tabs.unshift({ playlistTag: { name: "全部" } }); // 全部选项不在接口返回值内，所以要单独添加
      });
    },
    gotoPlayList(id) {
      this.$router.push({ path: "/playlist", query: { id: id } });
    },
    getPlayList(pn) {
      this.$http
        .get("/top/playlist", {
          params: {
            offset: (pn - 1) * this.pageSize,
            limit: this.pageSize,
            cat: this.cat,
          },
        })
        .then((res) => {
          const { data } = res;
          this.playlist = data.playlists;
          this.total = data.total;
        });
    },
    getHighQuaPlaylist() {
      this.$http
        .get("/top/playlist/highquality", {
          params: { limit: 1, cat: this.cat },
        })
        .then((res) => {
          const { data } = res;
          this.highQuaPlaylist = data.playlists[0];
        });
    },
  },
};
</script>
<style lang="less" scoped>
.playlist-body {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.playlist-header {
  cursor: pointer;
  display: flex;
  margin-bottom: 20px;

  .title {
    color: white;
    font-size: 16px;
  }

  .el-image {
    height: 200px;
    width: 200px;
    flex-shrink: 0;
  }

  .playlist-info {
    margin-left: 20px;
    padding: 20px 0;
    width: calc(100% - 200px);
  }

  .description {
    color: #ccc;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    margin-bottom: 0;
  }

  .tag {
    padding: 5px 20px;
    border: 1px solid #e7aa5a;
    border-radius: 20px;
    color: #e7aa5a;
  }
}
</style>
