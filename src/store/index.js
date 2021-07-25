import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 初始值，防止界面因为没有初始值渲染不出来
  song_data: {
    al: {
      picUrl: 'http://p3.music.126.net/UeTuwE7pvjBpypWLudqukA==/3132508627578625.jpg?param=48y48'
    },
    name: '当前没有播放音乐~',
    id: -1,
    ar: [{
      name: '...'
    }]
  },
  route_path: [],
  formatTimestamp(time) {
    return new Date(time).toLocaleString();
  },
  playlist: {},
  currentPlayId: undefined,
}

export default new Vuex.Store({
  state,
  mutations: {
    setSongData(state, data) {
      state.song_data = data;
    },
    recordRoutePath(state, path) {
      state.route_path.push(path);
    },
    setRoutePath(state, new_route_path) {
      state.route_path = new_route_path;
    },
    setPlayList(state, playlist) {
      state.playlist = playlist;
    },
    setCurrentPlayId(state, id) {
      state.currentPlayId = id;
    }
  },
  actions: {},
  modules: {}
})