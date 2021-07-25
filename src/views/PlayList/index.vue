<template>
  <div v-if="playlist.length !== 0">
    <div class="playlist-header">
      <el-image :src="playlist.coverImgUrl" fit="cover"></el-image>
      <div class="playlist-info">
        <h2 class="title">{{ playlist.name }}</h2>
        <div class="creator">
          <el-image
            class="avatar"
            :src="playlist.creator.avatarUrl"
            fit="cover"
          ></el-image>
          <p>
            <a
              target="=_blank"
              :href="
                `https://music.163.com/#/user/home?id=${playlist.creator.userId}`
              "
              >{{ playlist.creator.nickname }}</a
            >
          </p>
          <span>{{ formatTimestamp()(playlist.createTime) }} 创建</span>
        </div>
        <el-button size="small" type="danger" round>播放全部</el-button>
        <div class="description">
          {{ playlist.description }}
        </div>
      </div>
    </div>

    <div class="playlist-body">
      <song-list :tracks="playlist.tracks"></song-list>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
      playlist: [],
    };
  },
  methods: {
    ...mapState(["formatTimestamp"]),
    getPlayListInfo() {
      this.$http
        .get("/playlist/detail", { params: { id: this.id } })
        .then((res) => {
          const { data } = res;
          this.playlist = data.playlist;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.avatar {
  width: 30px !important;
  height: 30px !important;
}

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
