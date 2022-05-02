<template>
<div id="app">
    <Header />
    <AlertMessage />
    <router-view />
    <Footer />
</div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import AlertMessage from './components/common/AlertMessage.vue';

export default {
    name: 'app',
    components: {
        Header,
        AlertMessage,
        Footer
    }
};
</script>


<style src="@/assets/styles/wiki.css"></style>
<style src="@/assets/styles/caps.css"></style>
<style src="@/assets/styles/comment.css"></style>
<style src="animate.css"></style>
<style>
    a {
        text-decoration: none;
    }
</style>