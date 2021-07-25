<template>
  <div>
    <!-- 这上面有个 tabs -->

    <!-- banner -->
    <el-carousel trigger="click" type="card" height="200px">
      <el-carousel-item v-for="(item, idx) in bannerInfo" :key="idx">
        <el-image
          style="width: 100%; height: 100%; border-radius: 10px;"
          :src="`${item.imageUrl}?param=541y200`"
          fit="cover"
        ></el-image>
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div class="rec-playlist">
      <h2 @click="$router.replace('/playlists')" class="title">
        推荐歌单 <i class="iconfont icon-right"></i>
      </h2>
      <div class="playlist-grid">
        <div
          class="playlist-item"
          v-for="(item, idx) in recommendPlayList"
          :key="idx"
          @click="gotoPlayList(item.id)"
        >
          <div class="playlist-desc nowrap-text">
            {{ item.copywriter }}
          </div>
          <el-image
            :src="`${item.picUrl}?param=255y255`"
            fit="cover"
            class="playlist-cover"
            lazy
          ></el-image>
          <p class="playlist-name nowrap-text">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- 独家放送 -->
    <div class="private-content">
      <h2 class="title">独家放送</h2>
      <div class="content-grid">
        <div v-for="(item, idx) in privateContent" :key="idx">
          <el-image
            :src="`${item.picUrl}?param=347y128`"
            fit="cover"
            class="playlist-cover"
            lazy
          ></el-image>
          <p class="playlist-name nowrap-text">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="new-song">
      <h2 class="title">最新音乐</h2>
      <div class="song-grid">
        <div
          @click="playSong(item)"
          v-for="(item, idx) in newSongList"
          :key="idx"
        >
          <el-image
            :src="`${item.picUrl}?param=50y50`"
            fit="cover"
            class="playlist-cover"
            lazy
          ></el-image>
          <div class="song-info">
            <p class="playlist-name nowrap-text">
              {{ item.name }}
              <span>{{
                item.song.alias.length ? `(${item.song.alias[0]})` : ""
              }}</span>
            </p>
            <p class="artist-name">{{ item.song.artists[0].name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐MV -->
    <h2 class="title" @click="$router.replace('/mvs')">
      推荐MV <i class="iconfont icon-right"></i>
    </h2>
    <MVList :mvList="mvList"></MVList>
  </div>
</template>
<script>
import MVList from "@/components/MVList";

export default {
  components: {
    MVList,
  },
  created() {
    this.getBannerInfo();
    this.getRecommendPlayList();
    this.getPrivateContent();
    this.getNewSong();
    this.getRecommendMV();
  },
  data() {
    return {
      bannerInfo: [],
      recommendPlayList: [],
      privateContent: [],
      newSongList: [],
      mvList: [],
    };
  },
  methods: {
    playSong(song) {
      this.$store.commit("setSongData", {
        al: {
          id: song.song.album.id,
          picUrl: song.picUrl,
        },
        name: song.name,
        id: song.id,
        ar: [
          {
            name: song.song.album.name,
          },
        ],
      });
    },
    gotoPlayList(id) {
      this.$router.push({ path: "/playlist", query: { id: id } });
    },
    getRecommendMV() {
      this.$http.get("/personalized/mv").then((res) => {
        const { data } = res;
        this.mvList = data.result;
      });
    },
    getNewSong() {
      this.$http
        .get("/personalized/newsong", { params: { limit: 12 } })
        .then((res) => {
          const { data } = res;
          this.newSongList = data.result;
        });
    },
    getPrivateContent() {
      this.$http.get("/personalized/privatecontent").then((res) => {
        const { data } = res;
        this.privateContent = data.result;
      });
    },
    getRecommendPlayList() {
      this.$http.get("/personalized", { params: { limit: 8 } }).then((res) => {
        const { data } = res;
        this.recommendPlayList = data.result;
      });
    },
    getBannerInfo() {
      this.$http.get("/banner").then((res) => {
        const { data } = res;
        this.bannerInfo = data.banners;
      });
    },
  },
};
</script>
<style lang="less" scoped>
// 推荐歌单
.playlist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

// 独家放送
.content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  & > div {
    width: 347px;
  }
}

.song-grid {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  row-gap: 20px;

  & > div {
    margin-right: 10px;
    display: flex;
    cursor: pointer;
    &:hover {
      background-color: #3b3b3b;
    }
  }

  p {
    margin: 0;
  }

  .song-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0 5px 5px;
    height: 50px;
    width: calc(100% - 50px);
    p {
      font-size: 14px;
    }
  }

  .el-image {
    width: 50px;
    height: 50px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
