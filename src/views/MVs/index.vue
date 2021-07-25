<template>
  <div>
    <!-- mv类型tabs -->

    <div class="tabs">
      <span style="color: white">排序</span>
      <span
        :class="{ 'tab-active': orderActiveIndex == idx }"
        v-for="(item, idx) in orders"
        :key="idx"
        @click="changeOrderHandler(idx)"
      >
        {{ item }}</span
      >
    </div>

    <div class="tabs">
      <span style="color: white">地区</span>
      <span
        :class="{ 'tab-active': areaActiveIndex == idx }"
        v-for="(item, idx) in areas"
        :key="idx"
        @click="changeAreaHandler(idx)"
      >
        {{ item }}</span
      >
    </div>

    <div class="tabs">
      <span style="color: white">类型</span>
      <span
        :class="{ 'tab-active': typeActiveIndex == idx }"
        v-for="(item, idx) in types"
        :key="idx"
        @click="changeTypeHandler(idx)"
      >
        {{ item }}</span
      >
    </div>

    <MVList :mvList="mv_list"></MVList>
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
import MVList from "@/components/MVList";

export default {
  components: {
    MVList,
  },
  created() {
    this.getLatestMV();
  },
  data() {
    return {
      mv_list: [],
      pageSize: 8,
      currentPage: 1,
      total: 0,
      orderActiveIndex: 0,
      areaActiveIndex: 0,
      typeActiveIndex: 0,
    };
  },
  computed: {
    orders() {
      return ["上升最快", "最热", "最新"];
    },
    areas() {
      return ["全部", "内地", "港台", "欧美", "日本", "韩国"];
    },
    types() {
      return ["全部", "官方版", "原生", "现场版", "网易出品"];
    },
  },
  methods: {
    changeOrderHandler(idx) {
      this.orderActiveIndex = idx;
      this.getLatestMV();
    },
    changeTypeHandler(idx) {
      this.typeActiveIndex = idx;
      this.getLatestMV();
    },
    changeAreaHandler(idx) {
      this.areaActiveIndex = idx;
      this.getLatestMV();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.getLatestMV();
    },
    getLatestMV() {
      this.$http
        .get("/mv/all", {
          params: {
            limit: this.pageSize,
            offset: this.pageSize * (this.currentPage - 1),
            area: this.areas[this.areaActiveIndex],
            type: this.types[this.typeActiveIndex],
            order: this.orders[this.orderActiveIndex],
          },
        })
        .then(({ data }) => {
          this.mv_list = data.data;
          if (this.total === 0) {
            this.total = data.count;
          }
        });
    },
  },
};
</script>
<style lang="less">
.tabs {
  justify-content: flex-start;
}
</style>
