<template>
    <section>
        <div class="home-slider">
            <div style="max-height: 350px; height: 30vw;">
                <div id="main-carousel" class="carousel slide" data-bs-ride="carousel"
                     style="width: 100%; height: 100%;">
                    <div class="carousel-inner" style="width: 100%; height: 100%;">
                        <div class="carousel-item caps-main caps-main-1 active"></div>
                        <div class="carousel-item caps-main caps-main-2">
                            <div class="carousel-caption d-md-block">
                                <h2>C.A.P.S Computer Aided Progressive Study</h2>
                                <p>since 1988</p>
                            </div>
                        </div>
                        <div class="carousel-item caps-main caps-main-3">
                            <div class="container">
                                <div class="carousel-caption text-center">
                                    <h2>동국대학교 최고의 학술 동아리!</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#main-carousel"
                            data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#main-carousel"
                            data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HomeSlider',
        props: {},
        computed: {
            /**
             * @return {number}
             */
            Height() {
                let h = window.innerWidth;
                h = Math.floor(h * 0.3);
                return Math.min(h, 350);
            }
        }
    };
</script>

<style>
    .caps-main {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        visibility: inherit;
        opacity: 1;
    }

    .caps-main-1 {
        background-image: url('~@/assets/caps_main_1.png');
    }

    .caps-main-2 {
        background-image: url('~@/assets/caps_main_2.png');
    }

    .caps-main-3 {
        background-image: url('~@/assets/caps_main_3.png');
        background-position: center top !important;
    }
</style>