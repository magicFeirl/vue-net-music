<template>
  <div v-if="!!album_data">
    <div class="playlist-header">
      <el-image :src="album.blurPicUrl" fit="cover"></el-image>
      <div class="playlist-info">
        <h2 class="title">{{ album.name }}</h2>
        <el-button size="small" type="danger" round>播放全部</el-button>
        <div class="description">
          {{ album.description }}
        </div>
      </div>
    </div>

    <div class="playlist-body">
      <song-list :tracks="album_data.songs"></song-list>
    </div>
  </div>
</template>
<script>
import SongList from "@/components/SongList";

export default {
  props: {
    id: [String, Number],
  },
  components: {
    SongList,
  },
  created() {
    this.getPlayListInfo();
  },
  data() {
    return {
      album_data: [],
    };
  },
  computed: {
    album() {
      return this.album_data.album || {};
    },
  },
  methods: {
    getPlayListInfo() {
      this.$http.get("/album", { params: { id: this.id } }).then(({ data }) => {
        this.album_data = data;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.playlist-header {
  display: flex;
  height: 200px;

  .playlist-info {
    margin-left: 20px;
  }

  .el-button {
    margin: 10px 0 10px 10px;
  }

  .el-image {
    width: 200px;
    height: 200px;
    flex-shrink: 0;
  }

  .title {
    color: #d0d0d0;
    margin: 0 0 10px 0;
  }

  .description {
    color: #ababab;
    margin-left: 10px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin-bottom: 0;
  }

  .creator {
    display: flex;
    align-items: center;
    & > p {
      margin: 0 8px 0 10px;
    }

    span {
      color: #3b3b3b;
    }
  }
}
</style>
