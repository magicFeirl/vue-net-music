<template>
  <div class="player-bar">
    <!-- 左侧歌曲信息区域 -->
    <div class="music-left nowrap-text">
      <el-image
        fit="cover"
        class="playlist-cover"
        :src="`${song_data.al.picUrl}?param=48y48`"
      ></el-image>
      <div class="info">
        <div class="title">
          {{ song_data.name }}
        </div>
        <div
          style="cursor:pointer;"
          @click="
            $router.push({ path: 'album', query: { id: song_data.al.id } })
          "
          class="second-text"
        >
          {{ song_data.ar[0].name }}
        </div>
      </div>
    </div>
    <!-- 中间的播放控制区域 -->
    <div class="controls">
      <div class="control">
        <i @click="prevSong" class="iconfont icon-shangyishouge"></i>
        <i
          @click="togglePlay"
          class="iconfont"
          :class="isPlaying ? 'icon-zanting' : 'icon-bofang'"
        ></i>
        <i @click="nextSong" class="iconfont icon-xiayishou"></i>
      </div>

      <div class="slider">
        <audio
          ref="audio"
          @loadedmetadata="loadedHandler"
          @timeupdate="updateHandler"
          :src="musicSrc"
          autoplay
        ></audio>
        <span class="second-text">
          {{ timeFormat(currentTime) }}
        </span>
        <vue-slider
          v-model="currentTime"
          :min="0"
          :max="duration"
          :interval="1"
          lazy
          :disabled="false"
          drag-on-click
          @drag-start="dragStartHandler"
          @dragging="valueChangeHandler"
          @drag-end="dragEndHandler"
          @change="valueChangeHandler"
          contained
        ></vue-slider>
        <span class="second-text">
          {{ timeFormat(duration) }}
        </span>
      </div>
    </div>

    <!-- 右侧音量控制区域 -->
    <div class="music-right">
      <i
        @click="downloadHandler"
        class="iconfont icon-cloud-download"
        style="margin-right: 10px;"
      ></i>
      <i
        @click="muteHandler"
        class="iconfont"
        :class="isMuted ? 'icon-guanbishengyin' : 'icon-zhongdengyinliang'"
        style="margin-right: 10px;"
      ></i>
      <vue-slider
        style="margin-right: 10px;"
        :disabled="false"
        lazy
        contained
        :min="0"
        :max="100"
        :interval="1"
        :value="volume"
        @change="changeVolumeHandler"
        @dragging="changeVolumeHandler"
      ></vue-slider>
      <i @click="showPlayList" class="iconfont icon-bofanggedan"></i>
    </div>
    <!-- 歌单列表抽屉 -->
    <el-drawer
      title="歌单列表"
      :visible.sync="isShowPlayList"
      direction="rtl"
      size="30%"
    >
      <song-list :tracks="playlist"></song-list>
    </el-drawer>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import SongList from "@/components/SongList";
import { timeFormat } from "@/utils/util.js";
import Storage from "@/utils/storage.js";

export default {
  components: {
    SongList,
  },
  computed: {
    audio() {
      return this.$refs.audio;
    },
    ...mapState(["song_data", "playlist"]),
    musicSrc() {
      return `https://music.163.com/song/media/outer/url?id=${this.song_data.id}.mp3`;
    },
  },
  data() {
    return {
      isShowPlayList: false,
      currentTime: 0,
      duration: 0,
      dragging: false,
      volume: Storage.getItem("volume") || 30,
      isPlaying: true,
      isMuted: false,
      currentPlayIdx: undefined,
      play_type: 0 // 0 => 单曲循环 1 =>  
    };
  },
  methods: {
    timeFormat,
    ...mapMutations(["setSongData"]),

    switchSong(type) {
      // type == 1，上一首; type == 0，下一首
      let song_data = null;
      const idx = this.getCurrentIndex();
      if (type === 1 && idx >= 1) {
        song_data = this.playlist[idx - 1];
      } else if (type === 0 && idx <= this.playlist.length - 1) {
        song_data = this.playlist[idx + 1];
      } else {
        return;
      }

      this.setSongData(song_data);
      this.currentPlayIdx = idx;
    },
    // 播放歌单中的下一首歌
    nextSong() {
      this.switchSong(0);
    },
    // 播放歌单中的上一首歌
    prevSong() {
      this.switchSong(1);
    },
    // 工具函数 获取当前播放歌曲的 index
    getCurrentIndex() {
      // 判断 idx 是否合法
      return this.getSongIndexFromSongData(this.song_data.id);
    },
    // 工具函数 把传入的歌曲 id 和 playlist 列表中的歌曲 id 对比，找到传入 id 的 index
    getSongIndexFromSongData(id) {
      for (let i = 0; i < this.playlist.length; i++) {
        if (id == this.playlist[i].id) {
          return i;
        }
      }
      return -1;
    },
    // 显示播放列表列表抽屉
    showPlayList() {
      this.isShowPlayList = true;
    },
    // 通知音乐播放
    togglePlay() {
      this.isPlaying ? this.audio.pause() : this.audio.play();
      this.isPlaying = !this.isPlaying;
    },
    // 下载音乐
    downloadHandler() {
      window.open(this.musicSrc);
    },
    // 静音逻辑
    muteHandler() {
      if (this.audio.volume === 0) {
        this.audio.volume = this.volume / 100;
      } else {
        this.audio.volume = 0;
      }
      this.isMuted = !this.isMuted;
    },
    // 改变音量
    changeVolumeHandler(value) {
      this.audio.volume = value / 100;
      this.isMuted = value === 0;

      Storage.setItem("volume", value);
    },
    valueChangeHandler(value) {
      this.audio.currentTime = value;
    },
    dragStartHandler() {
      this.dragging = true;
    },
    dragEndHandler() {
      this.dragging = false;
    },
    updateHandler() {
      if (!this.dragging) {
        this.currentTime = parseInt(this.audio.currentTime);
      }

      if (this.currentTime >= this.duration && this.duration !== 0) {
        // this.isPlaying = false;
        this.nextSong();
      }
    },
    loadedHandler() {
      // 初始化
      this.currentTime = 0;
      this.isPlaying = true;
      this.duration = parseInt(this.audio.duration);
      this.changeVolumeHandler(this.volume);
    },
  },
};
</script>
<style lang="less" scoped>
.player-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

/deep/ .el-drawer {
  background: #363636;
}

.iconfont {
  font-size: 24px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #c23a3b;
  }
}

.second-text:hover {
  color: white;
}

.music-left {
  display: flex;
  //   flex-grow: 1;
  //   width: 0;

  justify-content: flex-start;
  width: 260px;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-left: 10px;

    .title,
    .second-text {
      font-size: 16px;
    }
  }
}

.music-right {
  //   flex-grow: 1;
  //   width: 0;
  .vue-slider {
    width: 65px !important;
  }
  align-items: center;
  display: flex;
}

.controls {
  padding: 10px 0;
  //   flex-grow: 2;
  //   width: 0;
  .control {
    display: flex;
    justify-content: center;
    .iconfont {
      margin: 0 20px;
    }
  }

  .vue-slider {
    width: 380px !important;
    margin: 0px 10px 0 10px !important;
  }

  .slider {
    display: flex;
    align-items: center;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
