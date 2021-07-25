<template>
  <div class="mv-container" v-if="mv_data.length !== 0">
    <!-- 播放区域 -->
    <div class="mv-area">
      <h2 class="title">MV详情</h2>
      <video :src="mv_url" controls></video>
      <div class="artist">
        <el-image class="avatar" :src="mv_data.cover"></el-image>
        <a target="_blank" :href="`https://music.163.com/#/artist?id=${mv_data.artistId}`">{{ mv_data.artistName }}</a>
      </div>
      <div class="mv-info">
        <h3 class="title">{{ mv_data.name }}</h3>
        <div class="second-text">
          发布: {{ mv_data.publishTime }} 播放: {{ mv_data.playCount }}次
        </div>
      </div>

      <!-- 评论区域 -->
      <div class="comment">
        <h2 class="title">评论({{ total }})</h2>
        <div class="comment-section" v-for="(item, idx) in comments" :key="idx">
          <el-image
            class="avatar"
            fit="cover"
            :src="item.user.avatarUrl"
          ></el-image>
          <div class="comment-content">
            <a
              target="_blank"
              :href="`https://music.163.com/#/user/home?id=${item.user.userId}`"
            >
              {{ item.user.nickname }}:
            </a>
            <span class="second-text">{{ item.content }}</span>

            <!-- 回复 -->
            <div class="reply" v-if="item.beReplied.length !== 0">
              <a
                target="_blank"
                :href="
                  `https://music.163.com/#/user/home?id=${item.beReplied[0].user.userId}`
                "
                >{{ item.beReplied[0].user.nickname }}: </a
              ><span class="second-text">{{ item.beReplied[0].content }}</span>
            </div>

            <div class="second-text" style="margin-top: 5px; font-size: 10px;">
              {{ formatTimestamp()(item.time) }}
            </div>
          </div>
        </div>
      </div>

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

    <!-- 相关推荐 -->
    <div class="mv-relation">
      <h2 class="title">相关推荐</h2>
      <div
        class="relation"
        v-for="(item, idx) in simi_mv"
        :key="idx"
        @click="playMV(item.id)"
      >
        <el-image
          class="playlist-cover"
          :src="`${item.cover}?param=140y80`"
          fit="cover"
        ></el-image>
        <div>
          <span>{{ item.name }}</span>
          <span class="second-text">by {{ item.artistName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: {
    id: [Number, String],
  },
  data() {
    return {
      mv_data: {},
      mv_url: "",
      simi_mv: [],
      comments: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
    };
  },
  created() {
    this.init();
  },
  watch: {
    id: function() {
      this.init();
    },
  },
  methods: {
    ...mapState(['formatTimestamp']),
    handleCurrentChange(newPage) {
      this.getMVComments(parseInt(newPage));
    },
    init() {
      this.getMVPlayUrl();
      this.getMVInfo();
      this.getSimiMV();
      this.getMVComments(1);
    },
    playMV(id) {
      this.$router.push({ path: "/mv", query: { id } });
    },
    getMVComments(pn) {
      this.$http
        .get("/comment/mv", {
          params: { id: this.id, offset: (pn - 1) * this.pageSize },
        })
        .then((res) => {
          const { data } = res;
          this.comments = data.comments;
          this.total = data.total;
        });
    },
    getSimiMV() {
      this.$http.get("/simi/mv", { params: { mvid: this.id } }).then((res) => {
        const { data } = res;
        this.simi_mv = data.mvs;
      });
    },
    getMVPlayUrl() {
      this.$http.get("/mv/url", { params: { id: this.id } }).then((res) => {
        const { data } = res;
        this.mv_url = data.data.url;
      });
    },
    getMVInfo() {
      this.$http
        .get("/mv/detail", { params: { mvid: this.id } })
        .then((res) => {
          const { data } = res;
          this.mv_data = data.data;
        });
    },
  },
};
</script>
<style lang="less">
.avatar {
  height: 48px;
  width: 48px;
  margin-right: 5px;
  flex-shrink: 0;
}

.comment-section {
  display: flex;
  min-height: 70px;

  .second-text {
    font-size: inherit;
  }

  .comment-content {
    flex-grow: 1;
  }

  .reply {
    background-color: #333333;
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    width: 100%;
  }

  .avatar {
    width: 36px;
    height: 36px;
  }

  padding: 10px 0;
  border-bottom: 1px solid #333;
}

.mv-container {
  display: flex;
  justify-content: space-between;
  @mv-area-width: 700px;

  .mv-area {
    width: @mv-area-width - 20px;

    video {
      width: 100%;
      height: 390px;
      background-color: black;
    }

    .artist {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
  }

  .mv-relation {
    width: calc(100% - @mv-area-width);

    .relation {
      display: flex;
      cursor: pointer;
      height: 85px;
      margin-bottom: 15px;

      .el-image {
        flex-shrink: 0;
        margin-right: 10px;
      }

      & > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: rgb(222, 222, 222);
      }
    }
  }
}
</style>
