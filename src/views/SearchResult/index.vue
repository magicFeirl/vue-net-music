<template>
  <div>
    <h2 class="title">{{ keywords }} 的搜索结果 ({{ total }})</h2>

    <!-- 这里还可以加个 tab -->
    <song-list :tracks="songs.songs"></song-list>
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
import SongList from '@/components/SongList'

export default {
  props: {
    keywords: "",
  },
  components: {
    SongList
  },
  data() {
    return {
      songs: [],
      total: 0,
      currentPage: 1,
      pageSize: 30,
    };
  },
  created() {
    this.search();
  },
  watch: {
    keywords: function(newValue) {
      this.keywords = newValue;
      this.search();
    },
  },
  methods: {
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.search();
    },
    search() {
      this.$http
        .get("/cloudsearch", {
          params: {
            keywords: this.keywords,
            offset: (this.currentPage - 1) * this.pageSize,
          },
        })
        .then((res) => {
          const { data } = res;
          this.songs = data.result;
          this.total = data.result.songCount;
        });
    },
  },
};
</script>
<style lang="less"></style>
