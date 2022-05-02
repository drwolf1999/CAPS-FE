<template>
    <section id="feature">
        <HomeSlider/>
        <div class="container">
            <div class="row my-5" v-for="i in 2" :key="i">
                <div class="col-md-4 col-lg-4 col-sm-12" v-for="j in 3" :key="`${i}-${j}`">
                    <div class="card border-0">
                        <div class="card-body">
                            <h4 class="card-title"><a :class="i + j === 2 ? 'text-warning' : 'text-primary'" href="javascript:void(0);">공지사항</a></h4>
                            <div class="card-text">
                                <a class="text-black" href="javascript:void(0);">라이엇게임즈 코리아에서 신입/경력 엔지니어 외 다양한 직군을 채용합니다.</a>
                                <br>
                                <a class="text-black" href="javascript:void(0);">test2</a>
                                <br>
                                <a class="text-black" href="javascript:void(0);">test3</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import HomeSlider from '@/components/HomeSlider';

    export default {
        name: 'Home',
        components: {HomeSlider},
        props: {},

    };
</script>

<style scoped>
    #feature a {
        line-height: 25px;
    }

    a:hover {
        color: rgb(255, 193, 7)!important;
        text-decoration: underline;
    }
</style>