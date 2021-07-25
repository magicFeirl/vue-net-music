<template>
  <div class="header">
    <h2 class="title" @click="$router.replace('/')">仿网易云音乐</h2>
    <!-- 面包屑导航 -->
    <!-- <div>
      <router-link :to="item" v-for="(item, idx) in route_path" :key="idx">{{
        item + "   "
      }}</router-link>
    </div> -->
    <div class="search-container">
      <div class="goback">
        <span title="回到上页" @click="goback(-1)">&lt;</span>
        <span title="回到下页" @click="goback(1)">&gt;</span>
      </div>
      <div class="search">
        <input
          @keyup.enter="search($event.target.value)"
          type="text"
          placeholder="搜索"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "NavHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState(["route_path"]),
  },
  methods: {
    goback(delta) {
      this.$router.go(delta);
    },
    search(query) {
      this.$router.push({
        path: "/search",
        query: { keywords: query, ts: new Date().getTime() },
      });
    },
  },
};
</script>
<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  h2 {
    margin: 0;
  }

  .search-container {
    display: flex;
  }

  .search {
    input {
      border: none;
      outline: none;
      width: 240px;
      padding: 5px 10px;
    }
  }

  .goback {
    span {
      display: inline-block;
      color: white;
      font-size: 18px;
      border-radius: 50%;
      background-color: #1f1f22;
      width: 28px;
      height: 28px;
      line-height: 30px;
      text-align: center;
      margin: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
