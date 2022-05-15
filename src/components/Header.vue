<template>
<header class="navbar navbar-expand-md navbar-dark" :class="$route.path === '/' ? 'bg-dark' : 'bg-primary'">
    <div class="container">
        <router-link to="/" class="navbar-brand position-relative">CAPS<span style="font-size: 0.5em;" class="position-absolute top-0 start-100 badge rounded-pill bg-danger">Beta</span></router-link>

        <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-bar" aria-controls="nav-bar" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse justify-content-end" id="nav-bar">
            <ul class="navbar-nav">
<!--                <li class="nav-item dropdown">-->
<!--                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="about-menu" data-bs-toggle="dropdown" aria-expanded="false">ABOUT</a>-->
<!--                    <div class="dropdown-menu dropdown-menu-dark">-->
<!--                        <router-link to="/" class="nav-link">CAPS 소개</router-link>-->
<!--                        <router-link to="/" class="nav-link">CAPS 연혁</router-link>-->
<!--                        <router-link to="/" class="nav-link">CAPS 회칙</router-link>-->
<!--                        <router-link to="/" class="nav-link">CAPS 집행부 소개</router-link>-->
<!--                        <router-link to="/" class="nav-link">CAPS 홈페이지 정보</router-link>-->
<!--                    </div>-->
<!--                </li>-->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="study-menu" data-bs-toggle="dropdown" aria-expanded="false">STUDY</a>
                    <div class="dropdown-menu dropdown-menu-dark">
                        <router-link to="/study" class="nav-link">스터디</router-link>
                        <router-link to="/board?category=1000" class="nav-link">스터디 게시판</router-link>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="forum-menu" data-bs-toggle="dropdown" aria-expanded="false">FORUM</a>
                    <div class="dropdown-menu dropdown-menu-dark">
                        <router-link to="/board" class="nav-link">전체 글 보기</router-link>
                        <hr>
                        <router-link to="/board?category=1" class="nav-link">공지사항</router-link>
                        <router-link to="/board?category=2" class="nav-link">주저리</router-link>
                        <router-link to="/board?category=3" class="nav-link">건의 사항</router-link>
                        <router-link to="/board?category=4" class="nav-link">자료실</router-link>
                        <hr>
                        <router-link to="/board?category=10" class="nav-link">회의록</router-link>
                        <router-link to="/board?category=11" class="nav-link">장부</router-link>
                        <router-link to="/board?category=12" class="nav-link">전시회 회의록</router-link>
                    </div>
                </li>
                <li class="nav-item">
                    <router-link to="/gallery" class="nav-link">GALLERY</router-link>
                </li>
                <!-- Dropdown -->
                <li v-if="isLogined" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="utils-menu" data-bs-toggle="dropdown" aria-expanded="false">UTIL</a>
                    <div class="dropdown-menu dropdown-menu-dark">
                        <router-link to="/wiki" class="nav-link">CAPS 위키</router-link>
<!--                        <a href="http://caps.dongguk.edu:3000" class="nav-link">CAPS hub</a>-->
                    </div>
                </li>
                <!-- Dropdown -->
                <li v-if="isLogined" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="profile-menu" data-bs-toggle="dropdown" aria-expanded="false">안녕하세요 {{ getUserName }}님!</a>
                    <div class="dropdown-menu dropdown-menu-dark">
                        <router-link to="/notification" class="nav-link">알림</router-link>
                        <router-link to="/profile" class="nav-link">프로필</router-link>
                        <a href="javascript:void(0)" class="nav-link" @click="onClickLogout">로그아웃</a>
                    </div>
                </li>
                <li v-else class="nav-item">
                    <a href="javascript:void(0)" class="nav-link" @click="onClickLogin()">로그인</a>
                </li>
                <!-- Dropdown -->
                <li v-if="isLogined" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="admin_menu" data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
                    <div class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                        <router-link to="/admin/categories" class="nav-link">게시판 카테고리</router-link>
                        <router-link to="/admin/user" class="nav-link">사용자</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</header>
</template>

<script>
export default {
    name: 'Board',
    computed: {
        getUserName() {
            return this.$store.getters.getUserData.user_name;
        },
        isLogined() {
            return this.$store.getters.isLogined;
        }
    },
    methods: {
        onClickLogout() {
            // LOGOUT 변이 실행 후 리다이렉트 
            this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
        },
        onClickLogin() {
            // 특정 화면에서 로그인 누르는 것은 무시
            if(this.$router.history.current.path != '/login' && this.$router.history.current.path != '/noauth') {
                this.$store.dispatch('setNextDestination', this.$router.history.current.path).then(() => this.$router.push('/login'));
            }
        }
    }
};
</script>

<style>
header {
    /*margin-bottom: 30px;*/
}
</style>
