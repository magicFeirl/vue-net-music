<template>
  <div class="video-box">
    <video
      @timeupdate="timeUpdateHandler"
      @canplay="canPlayHandler"
      ref="video"
      :src="src"
    ></video>
    <div class="controls">
      <span class="play" @click="toggleVideo">
        <i
          class="iconfont"
          :class="isPlayed ? 'icon-zanting' : 'icon-bofang'"
        ></i>
      </span>
      <span class="volume" @click="muteHandler">
        <i class="iconfont" :class="!isMuted ? 'icon-yinliang' : 'icon-zuidayinliang'"></i>
      </span>
      <span>{{ currentDuration }} / {{ duration }}</span>
    </div>
  </div>
</template>
<script>
// import { timeFormat as VideoDuration } from '@/utils/util.js'

export default {
  props: {
    src: {
      type: String,
      require: true,
    },
  },
  computed: {
    video: function() {
      return this.$refs.video;
    },
  },
  data() {
    return {
      isPlayed: false,
      duration: "00:00",
      currentDuration: "00:00",
      isMuted: false
    };
  },
  methods: {
    muteHandler() {
      this.video.muted = this.isMuted;
      this.isMuted = !this.isMuted;
    },
    canPlayHandler() {
      console.log(this.video.duration);
      this.duration = this.videoDuration(parseInt(this.video.duration));
    },
    timeUpdateHandler() {
      this.currentDuration = this.videoDuration(
        parseInt(this.video.currentTime)
      );
    },
    toggleVideo() {
      if (!this.isPlayed) {
        this.video.play();
      } else {
        this.video.pause();
      }
      this.isPlayed = !this.isPlayed;
    },
    VideoDuration
  },
};
</script>
<style lang="less" scoped>
.video-box {
  @controls-height: 50px;
  line-height: 0;
  overflow: hidden;

  width: 100%;
  position: relative;

  video {
    width: inherit;
    height: 100%;
  }

  &:hover .controls {
    display: block;
  }

  span {
      margin: 0 10px;
  }

  .controls {
    display: flex;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    height: @controls-height;
    line-height: @controls-height;
    width: calc(100% + 20px);
    bottom: 0;
    padding: 0 10px;
    color: white;
    display: none;
    cursor: pointer;
  }
}
</style>
