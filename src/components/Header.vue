<template>
<header class="navbar navbar-expand-md navbar-dark" :class="$route.path === '/' ? 'bg-dark' : 'bg-primary'">
    <div class="container">
        <router-link to="/" class="navbar-brand">CAPS</router-link>

        <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-bar" aria-controls="nav-bar" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse justify-content-end" id="nav-bar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/board" class="nav-link">게시판</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/gallery" class="nav-link">갤러리</router-link>
                </li>
                <!-- Dropdown -->
                <li v-if="isLogined" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="utils_menu" data-bs-toggle="dropdown" aria-expanded="false">유틸</a>
                    <div class="dropdown-menu dropdown-menu-dark">
                        <router-link to="/wiki" class="nav-link">CAPS 위키</router-link>
                        <a href="http://caps.dongguk.edu:3000" class="nav-link">CAPS hub</a>
                    </div>
                </li>
                <!-- Dropdown -->
                <li v-if="isLogined" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="profile_menu" data-bs-toggle="dropdown" aria-expanded="false">안녕하세요 {{ getUserName }}님!</a>
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
