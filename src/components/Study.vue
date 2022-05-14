<template>
    <div class="board mt-3 container table-responsive">
        <h3 class="text-center">
            <span>전체 스터디</span>
        </h3>
        <hr/>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>No.</th>
                <th>제목</th>
                <th>스터디 강사</th>
                <th>요일</th>
                <th>댓글 수</th>
                <th>참여 인원</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="isFetching">
                <td colspan="6" class="text-center">데이터를 불러오는 중입니다.</td>
            </tr>
            <tr v-else-if="studies.length === 0">
                <td colspan="6" class="text-center">해당하는 게시글이 없습니다.</td>
            </tr>
            <tr else v-for="(study, index) in studies" v-bind:key="study._id">
                <td>{{ totalCount - (pageQuery - 1) * pageLimit - index }}</td>
                <td>
                    <a href="javascript:void(0)" @click="studyClick(study._id)">{{ study.study_title }}</a>
                </td>
                <td>
                    <a href="javascript:void(0)" @click="profileClick(study.tutor.user_id)">{{ study.tutor.user_name }}</a>
                </td>
                <td>
                    {{ study.study_day }}
                </td>
                <td></td>
                <td>{{ study.tutee.length }}</td>
            </tr>
            </tbody>
        </table>
        <div class="bottom-buttons d-flex justify-content-between align-items-baseline row">
            <div class="col-sm-3">
                <router-link v-if="isLogined()" :to="'/study/write'" class="btn btn-outline-primary">글쓰기</router-link>
            </div>
            <div class="col-sm-6">
                <ul class="pagination justify-content-center">
                    <li v-for="page in totalPages" :key="page" :class="page === pageQuery ? 'active' : ''" class="page-item">
                        <a class="page-link" href="javascript:void(0);" @click="pageClick(page)">{{ page }}</a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-3 input-group inline-input-group mb-3 float-right">
                <input type="search" class="form-control" placeholder="검색"
                       @keyup.enter="searchClick()" v-model="searchQuery"/>
                <div class="input-group-append">
                    <button class="btn btn-success" @click="searchClick()">검색</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StudyService from '../service/study.js';

export default {
    name: 'Study',
    mounted() {
        this.fetchStudies();
    },
    data() {
        return {
            studies: [],
            isFetching: true,
            searchQuery: '',
            categoryQuery: '',
            pageQuery: 1,

            totalPages: 0,
            totalCount: 0,
            pageLimit: 0
        };
    },
    methods: {
        isLogined() {
            return this.$store.getters.isLogined;
        },
        // 쿼리 생성
        generateQuery() {
            // 쿼리 생성
            this.$router.push({
                query: {
                    category: this.categoryQuery,
                    search: this.searchQuery,
                    page: this.pageQuery
                }
            });
        },
        categoryClick(categoryId) {
            this.pageQuery = 1;
            this.categoryQuery = categoryId;
            this.generateQuery();
            this.fetchStudies();
        },
        searchClick() {
            this.pageQuery = 1;
            this.generateQuery();
            this.fetchStudies();
        },
        pageClick(pageNum) {
            if (pageNum != this.pageQuery) {
                this.pageQuery = pageNum;
                this.generateQuery();
                this.fetchBoards();
            }
        },
        fetchStudies() {
            this.isFetching = true;
            // 가져오기
            StudyService.getStudies({
                // category: this.$route.query.category,
                search: this.$route.query.search,
                page: this.$route.query.page
            }).then((response) => {
                this.studies = response.data.result;
                console.log(this.studies);
                this.totalPages = response.data.pages;
                this.totalCount = response.data.count;
                this.pageLimit = response.data.limit;
                this.isFetching = false;
            });
        },
        studyClick(studyId) {
            let nextDestination = '/study/view/' + studyId;
            // 로그인 체크
            if (!this.isLogined()) {
                this.$notify({
                    title: '로그인 필요',
                    text: '게시글을 보시려면 로그인이 필요합니다. 로그인해 주세요.',
                    type: 'warn'
                });
                this.$store.dispatch('setNextDestination', nextDestination).then(() => this.$router.push('/login'));

                return;
            }
            this.$router.push(nextDestination);
        },
        profileClick(userId) {
            let nextDestination = '/profile/' + userId;
            // 로그인 체크
            if (!this.isLogined()) {
                this.$notify({
                    title: '로그인 필요',
                    text: '프로필을 보시려면 로그인이 필요합니다. 로그인해 주세요.',
                    type: 'warn'
                });
                this.$store.dispatch('setNextDestination', nextDestination).then(() => this.$router.push('/login'));

                return;
            }
            this.$router.push(nextDestination);
        }
    },
    watch: {
        '$route.query'() {
            this.fetchStudies();
        }
    }
};
</script>

<style>
.bottom-buttons {
    border-top: 1px solid #cccccc;
    padding-top: 20px;
}

.inline-input-group {
    width: auto;
}
</style>
