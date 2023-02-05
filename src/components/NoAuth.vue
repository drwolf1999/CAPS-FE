<template>
<div class="page-not-found container jumbotron mt-3">
    <h1>권한이 없습니다. 로그인을 해주세요</h1>
    <router-link to="/" class="nav-link">홈으로 돌아가기</router-link>
</div>
</template>

<script>
export default {
    name: 'NoAuth'
};
</script>
