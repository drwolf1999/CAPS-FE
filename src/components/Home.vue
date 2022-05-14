<template>
    <section id="feature">
        <HomeSlider/>
        <div class="container">
            <div class="row my-5" v-for="i in 2" v-bind:key="i">
                <div class="col-md-4 col-lg-4 col-sm-12 " v-for="j in 3" v-bind:key="`${i}-${j}`"
                     :set="ij = (i - 1) * 3 + j - 1">
                    <div class="card border-0 animate__animated" :class="card_class[ij]">
                        <div class="card-body">
                            <h4 class="card-title">
                                <a :class="i + j === 2 ? 'text-warning' : 'text-primary'"
                                   href="javascript:void(0);">{{ preview_category[ij] }}</a>
                            </h4>
                            <div class="card-text" v-if="Array.isArray(preview[ij])">
                                <template v-if="preview[ij].length > 0">
                                    <a v-for="(e, idx) in preview[ij]" v-bind:key="`e-${idx}`"
                                       class="text-black preview-a"
                                       :href="e.url"><strong>{{ e.name }}</strong></a>
                                </template>
                                <div v-else class="">내용이 없습니다.</div>
                            </div>
                            <div v-else class="text-center">
                                <div class="spinner-border text-dark" role="status"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section id="contact-us">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="block">
                            <h2 class="animate__animated animate__fadeInDown">Contact Us!!</h2>
                            <p class="animate__animated animate__fadeInDown">
                                Address : <a style="color: white;" href="https://goo.gl/maps/GoZJcj5GNa5x4sfC6" target="_blank">Dongguk University E365. Seoul. South Korea</a> <br>
                                <a style="color: white;" href="https://www.facebook.com/groups/116440828416478/" target="_blank">
                                    <i class="fa-brands fa-facebook-f"></i>
                                    동국대학교 C.A.P.S Facebook </a>
                                <br>
                                <template v-if="president !== null">
                                    {{ president.user_grade }}기 회장 {{ president.user_name }} <a style="color: white;" :href="`mailto:${president.user_email}`">{{ president.user_email }}</a>
                                </template>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import HomeSlider from '@/components/HomeSlider.vue';
import BoardService from '@/service/board';
import StudyService from '@/service/study';
import UserService from '@/service/user';
import GlobalValue from '@/constants/GlobalValue';

export default {
    name: 'Home',
    components: {HomeSlider},
    props: {},
    data() {
        return {
            preview_category: ['공지사항', '주저리', '스터디 게시판', '스터디', '갤러리', '활동 랭킹'],
            card_class: ['animate__bounceInLeft', 'animate__zoomIn', 'animate__bounceInRight', 'animate__bounceInLeft', 'animate__zoomIn', 'animate__bounceInRight'],
            preview: new Array(6),
            president: null,
        };
    },
    mounted() {
        this.fetchBoards(0, 1);
        this.fetchBoards(1, 2);
        this.fetchStudies();
        this.fetchBoards(3, GlobalValue.G_STUDY_CATEGORY);
        this.fetchGallery();
        this.fetchUsers();
        this.fetchPresident();
    },
    methods: {
        fetchBoards(idx, category) {
            BoardService.getBoards({category: category})
                .then(response => {
                    const r_ds = response.data.result.filter((e, i) => i < 3);
                    let p_ds = [];
                    const r_ds_length = r_ds.length;
                    for (let i = 0; i < r_ds_length; i++) {
                        p_ds.push({
                            name: r_ds[i].board_title,
                            url: `/board/view/${r_ds[i]._id}`,
                        });
                    }
                    this.preview.splice(idx, 1, p_ds);
                })
                .catch(() => {
                });
        },
        fetchStudies() {
            StudyService.getStudies({})
                .then(response => {
                    const r_ds = response.data.result.filter((e, i) => i < 3);
                    let p_ds = [];
                    const r_ds_length = r_ds.length;
                    for (let i = 0; i < r_ds_length; i++) {
                        p_ds.push({
                            name: r_ds[i].study_title,
                            url: `/study/view/${r_ds[i]._id}`,
                        });
                    }
                    this.preview.splice(2, 1, p_ds);
                });
        },
        fetchGallery() {
            this.$store.dispatch('fetchGallery').then(() => {
                const r_ds = this.$store.getters.getGallery.filter((e, i) => i < 3);
                let p_ds = [];
                const r_ds_length = r_ds.length;
                for (let i = 0; i < r_ds_length; i++) {
                    p_ds.push({
                        name: r_ds[i].album_title,
                        url: `/gallery?albumId=${r_ds[i]._id}`,
                    });
                }
                this.preview.splice(4, 1, p_ds);
            });
        },
        fetchUsers() {
            UserService.getUserByQuery({})
                .then(response => {
                    const r_ds = response.data.filter((e, i) => i < 3);
                    let p_ds = [];
                    const r_ds_length = r_ds.length;
                    for (let i = 0; i < r_ds_length; i++) {
                        p_ds.push({
                            name: r_ds[i].user_name,
                            url: `/profile/${r_ds[i].user_id}`,
                        });
                    }
                    this.preview.splice(5, 1, p_ds);
                })
                .catch(() => {
                });
        },
        fetchPresident() {
            UserService.getUserByQuery({
                user_permission: 6,
                user_grade: new Date().getFullYear() - 1987,
            })
                .then(response => {
                    const r = response.data;
                    if (Array.isArray(r) && r.length > 0) {
                        this.president = r[0];
                    }
                })
                .catch(() => {
                });
        },
    }
};
</script>

<style scoped>
a:hover {
    text-decoration: underline;
}

#feature > a {
    line-height: 25px;
}

#feature > a:hover {
    color: rgb(255, 193, 7) !important;
    text-decoration: underline;
}

.preview-a::after {
    content: '\a';
    white-space: pre;
}

#contact-us {
    background-size: cover;
    background: #C5C5C5 fixed;
    padding: 80px;
    text-align: center;
    position: relative;
}

#contact-us .block {
    position: relative;
    color: white;
}
</style>