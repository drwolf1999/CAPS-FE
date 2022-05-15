<template>
    <section id="feature">
        <HomeSlider/>
        <div class="container">
            <div class="row my-5" v-for="i in 2" v-bind:key="i">
                <div class="col-md-4 col-lg-4 col-sm-12 " v-for="j in 3" v-bind:key="`${i}-${j}`"
                     :set="ij = (i - 1) * 3 + j - 1">
                    <div class="card border-0 animate__animated" :class="isMobile ? '' : card_class[ij]">
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

        <div class="modal" tabindex="-1" id="alert-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">알림</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        2022년도 6월 내로 리모델링 작업이 마무리될 예정입니다.
                        현 사이트는 2022/5/8 데이터를 기준으로 일부 동기화가 되어있습니다.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <button style="display: none;" ref="btn-modal" type="button" data-bs-toggle="modal" data-bs-target="#alert-modal"></button>
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
        this.$refs['btn-modal'].click();
        this.fetchBoards(0, 1);
        this.fetchBoards(1, 2);
        this.fetchStudies();
        this.fetchBoards(3, GlobalValue.G_STUDY_CATEGORY);
        this.fetchGallery();
        this.fetchUsers();
        this.fetchPresident();
    },
    computed: {
        isMobile() {
            let check = false;
            // eslint-disable-next-line
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        }
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