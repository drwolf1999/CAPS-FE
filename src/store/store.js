import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt from 'jsonwebtoken';

Vue.use(Vuex);

// 화면 갱신 시 로컬 스토리지에 저장된 토큰을 axios 헤더에 설정
const enhanceAccessToken = () => {
    const accessToken = localStorage.accessToken;
    if (!accessToken) {
        return;
    }

    // expired이면 제거
    var current_time = Date.now() / 1000;
    if (jwt.decode(accessToken).exp < current_time) {
        delete localStorage.accessToken;
        return;
    }

    axios.defaults.headers.common['Access-Token'] = accessToken;
};
enhanceAccessToken();

export default new Vuex.Store({
    state: {
        // 로그인 정보
        accessToken: axios.defaults.headers.common['Access-Token'],
        // 게시판 정보
        boards: [],
        // 현재 게시글 정보
        board: null
    },
    getters: {
        getBoards(state) {
            return state.boards;
        },
        getBoard(state) {
            return state.board;
        },
        isLogined(state) {
            return state.accessToken != null && state.accessToken != undefined;
        },
        getUserData(state) {
            return jwt.decode(state.accessToken);
        }
    },
    mutations: {
        fetchBoards(state, boardsData) {
            state.boards = boardsData;
        },
        fetchBoard(state, boardData) {
            state.board = boardData;
        },
        LOGIN(state, accessToken) {
            state.accessToken = accessToken;

            // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.   
            axios.defaults.headers.common['Access-Token'] = accessToken;

            // 토큰을 로컬 스토리지에 저장 
            localStorage.accessToken = accessToken;
        },
        LOGOUT(state) {
            // 토큰 정보 삭제  
            state.accessToken = null;
            delete localStorage.accessToken;
        }
    },
    actions: {
        fetchBoards(state) {
            axios.get('http://localhost:3000/boards')
                .then(response => {
                    state.commit('fetchBoards', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        fetchBoard(state, boardId) {
            axios.get('http://localhost:3000/boards/view/' + boardId)
                .then(response => {
                    state.commit('fetchBoard', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LOGIN(state, loginData) {
            return axios.post('http://localhost:3000/users/login', loginData)
                .then((response) => {
                    state.commit('LOGIN', response.headers['access-token']);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LOGOUT(state) {
            axios.defaults.headers.common['Access-Token'] = undefined;

            state.commit('LOGOUT');
        }
    }
});