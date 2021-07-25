<template>
  <div id="app">
    <nav-header class="nav-header"></nav-header>
    <player-body class="player-body"></player-body>
    <player-bar class="playbar"></player-bar>
  </div>
</template>

<script>
import PlayerBody from "@/components/PlayerBody";
import NavHeader from "@/components/NavHeader";
import PlayerBar from "@/components/PlayerBar";

export default {
  name: "app",
  components: {
    NavHeader,
    PlayerBody,
    PlayerBar,
  },
};
</script>

<style scoped lang="less">
@header-height: 60px;
@playbar-height: 75px;

#app {
  height: 100%;
}

.nav-header {
  height: @header-height;
  background-color: #232326;
  border-bottom: 2px solid #b62424;
}

.player-body {
  height: calc(100% - @header-height - @playbar-height);
  background-color: #2b2b2b;
}

.playbar {
  height: @playbar-height;
  border-top: 1px solid #333;
  background-color: #232326;
  position: relative;
}
</style>
