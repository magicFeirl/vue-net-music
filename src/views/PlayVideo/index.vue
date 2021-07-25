<template>
  <div>
    <h2 class="title">播放器组件测试</h2>
    <video-box
      class="video-box"
      src="http://vodkgeyttp8.vod.126.net/cloudmusic/5569/core/a015/79464a96bab41d713d9db4bfafcb6e68.mp4?wsSecret=a0c4b6bffa11c6f525cdc3f9f24c7d11&wsTime=1625557181"
    ></video-box>
  </div>
</template>
<script>
import videoBox from "@/components/VideoBox";

export default {
  components: {
    videoBox,
  },
};
</script>
<style lang="less">
.video-box {
  width: 100%;
}
</style>
