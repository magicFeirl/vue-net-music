<!-- 歌曲列表组件 -->
<template>
  <el-table
    :data="tracks"
    style="width: 100%"
    @row-dblclick="handleRowdbClick"
    stripe
    highlight-current-row
  >
    <el-table-column prop="name" label="音乐标题">
      <template v-slot="data">
        <div @click="playSong(data.row)">{{ data.row.name }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
    <el-table-column prop="al.name" label="专辑">
      <template v-slot="data">
        <span
          @click="
            $router.push({ path: 'album', query: { id: data.row.al.id } })
          "
        >
          {{ data.row.al.name }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="dt" label="时长">
      <template v-slot="data">
        {{ timeFormat(parseInt(data.row.dt / 1000)) }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { timeFormat } from "@/utils/util.js";
import { mapMutations } from "vuex";

export default {
  props: {
    tracks: {},
  },
  watch: {
    // tracks() {
    //   this.setPlayList(this.tracks);
    // },
  },
  methods: {
    timeFormat,
    ...mapMutations(["setPlayList", "setSongData", "setCurrentPlayId"]),
    playSong(row) {
      this.setCurrentPlayId(row.id);
      this.setPlayList(this.tracks); // 播放音乐的时候更新歌单
      this.setSongData(row); // 设置要播放的音乐的数据
    },
    handleRowdbClick(row) {
      this.playSong(row);
    },
  },
};
</script>
<style lang="less"></style>
