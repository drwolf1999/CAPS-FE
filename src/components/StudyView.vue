<template>
    <div class="container mt-3" v-if="study && study._id === parseInt(studyId)">
        <div v-if="!isModifying">
            <div class="post-heading">
                <div class="row">
                    <div class="col-md-7 col-sm-12">
                        <h2> {{ study.study_title }} </h2>
                    </div>
                    <div class="col-md-2 col-sm-6">
                        <p><span class="badge bg-primary">By</span>
                            <router-link :to="'/profile/' + study.tutor.user_id">{{ study.tutor.user_name }}</router-link>
                        </p>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <p><span class="badge bg-primary">At</span> <a href="#stay_here" data-toggle="tooltip" title="" data-original-title="">{{ study.updated_at }}</a></p>
                    </div>
                </div>
            </div>

            <div class="post-content">
                <h3>스터디 참여 인원</h3>
                <ProfileImageWithName v-for="(tutee, index) in study.tutee" v-bind:key="tutee._id"
                                      :index="index + 1" :user-id="tutee._id"
                                      :user-image-url="tutee.user_image_url" :user-name="tutee.user_name"
                />
            </div>

            <div class="post-content">
                <h3>스터디 게시판</h3>
            </div>

            <div class="post-content">
                {{ study.study_content }}
            </div>

            <div v-if="getUserId === study.tutor._id" class="post-buttons">
                <div class="row">
                    <div class="col-sm-2">
                        <button class="btn btn-warning btn-block" role="button" @click="modifyStudy">스터디 수정</button>
                    </div>
                    <div class="col-sm-8"></div>
                    <div class="col-sm-2">
                        <button class="btn btn-danger btn-block" data-toggle="modal" data-target="#confirmModal">스터디 삭제</button>
                    </div>
                </div>
            </div>

            <!--            <Comments v-bind:board-id="studyId"/>-->
        </div>

        <!--        <BoardForm v-else v-bind:currentBoardId="boardId" v-bind:initialBoardTitle="board.board_title"-->
        <!--                   v-bind:initialBoardCategory="board.board_category.toString()" v-bind:initialBoardContent="board.board_content"-->
        <!--                   v-on:finished="finishModifyBoard" />-->
        <ConfirmModal modalHead="삭제 확인" modalBody="정말 스터디를 삭제합니까?" v-on:confirm="deleteStudy()"/>
    </div>
</template>

<script>
import ConfirmModal from './common/ConfirmModal.vue';
import StudyService from '@/service/study.js';
import ProfileImageWithName from '@/components/ProfileImageWithName';
// import StudyForm from './StudyForm.vue';
// import Comments from '@/components/Comments.vue';

export default {
    name: 'StudyView',
    props: ['studyId'],
    data() {
        return {
            studyBoard: [],
            isModifying: false
        };
    },
    mounted() {
        this.$store.dispatch('fetchStudy', this.studyId);
    },
    methods: {
        modifyStudy() {
            this.isModifying = true;
        },
        finishModifyStudy() {
            this.isModifying = false;
            this.$store.dispatch('fetchBoard', this.studyId);
        },
        deleteStudy() {
            StudyService.deleteStudy(this.studyId)
                .then(() => {
                    this.$notify({
                        title: '스터디 삭제 성공!',
                        text: '스터디가 성공적으로 삭제 되었습니다!',
                        type: 'success'
                    });
                    this.$router.push('/board/');
                });
        },
    },
    computed: {
        getUserId() {
            return this.$store.getters.getUserData.user__id;
        },
        study() {
            return this.$store.getters.getStudy;
        }
    },
    components: {
        ProfileImageWithName,
        ConfirmModal,
        // StudyForm,
        // Comments,
    }
};
</script>

<style scoped>
.post-heading {
    border-bottom: 1px solid #cccccc;
}

.post-heading h2 {
    margin-top: 0px;
}

.post-content {
    border-bottom: 1px solid #cccccc;
    padding: 40px 0;
}

.post-buttons {
    padding-top: 20px;
}

.post-content > :where(h1, h2, h3, h4, h5) {
    color: rgb(255, 193, 7) !important;
}
</style>
