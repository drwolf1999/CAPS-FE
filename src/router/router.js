import Vue from 'vue';
import Router from 'vue-router';

// All
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Board from '../components/Board.vue';
import BoardView from '../components/BoardView.vue';
import BoardForm from '../components/BoardForm.vue';
import Study from '../components/Study.vue';
import StudyView from '../components/StudyView.vue';
import StudyForm from '../components/StudyForm.vue';
import Profile from '../components/Profile.vue';
import Gallery from '../components/Gallery.vue';
import AlbumForm from '../components/AlbumForm.vue';
import Wiki from '../components/Wiki.vue';
import WikiForm from '../components/WikiForm.vue';
import ComingSoon from '../components/ComingSoon.vue';

// Admin
import Category from '../components/Admin/Category.vue';

// ETC...
import NoAuth from '../components/NoAuth.vue';
import PageNotFound from '../components/PageNotFound.vue';

import store from '../store/store';

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
    if (store.getters.isLogined) return next(); // isAuth === true면 페이지 이동
    next('/noauth'); // isAuth === false면 다시 로그인 화면으로 이동
};

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'CAPS',
            component: Home
        },
        {
            path: '/login',
            name: 'CAPS 로그인',
            component: Login
        },
        {
            path: '/register',
            name: 'CAPS 회원 가입',
            component: Register
        },
        {
            path: '/board',
            name: '게시판',
            component: Board
        },
        {
            path: '/board/view/:boardId',
            name: '게시글 보기',
            component: BoardView,
            beforeEnter: requireAuth(),
            props: true
        },
        {
            path: '/board/write',
            name: '글 쓰기',
            component: BoardForm,
            beforeEnter: requireAuth(),
            props: true
        },
        {
            path: '/study',
            name: '스터디',
            component: Study,
        },
        {
            path: '/study/view/:studyId',
            name: '스터디 보기',
            component: StudyView,
            beforeEnter: requireAuth(),
            props: true
        },
        {
            path: '/study/write',
            name: '스터디 생성',
            component: StudyForm,
            beforeEnter: requireAuth(),
            props: true
        },
        {
            path: '/profile',
            name: '내 프로필',
            component: Profile,
            beforeEnter: requireAuth(),
        },
        {
            path: '/profile/:userId',
            name: '프로필',
            component: Profile,
            beforeEnter: requireAuth(),
            props: true
        },
        {
            path: '/gallery',
            name: '갤러리',
            component: Gallery
        },
        {
            path: '/gallery/upload',
            name: '앨범 만들기',
            component: AlbumForm,
            beforeEnter: requireAuth(),
            props: true
        },
        {
            path: '/wiki',
            name: '위키',
            component: Wiki
        },
        {
            path: '/wiki/search/:wikiTitle',
            name: '위키',
            component: Wiki
        },
        {
            path: '/wiki/add/:wikiTitle',
            name: '위키',
            component: WikiForm,
            beforeEnter: requireAuth(),
        },
        {
            path: '/notification',
            name: '알림',
            component: ComingSoon
        },
        {
            path: '/admin/user',
            name: '사용자',
            component: ComingSoon
        },
        {
            path: '/admin/categories',
            name: '카테고리',
            component: Category,
        },
        {
            path: '/noauth',
            name: '권한 필요!',
            component: NoAuth
        },
        {
            path: '*',
            name: '404 Not Found',
            component: PageNotFound
        },
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

const oPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return oPush.call(this, location).catch(err => {
        if (err.name !== 'NavigationDuplicated') throw err;
    });
};

export default router;