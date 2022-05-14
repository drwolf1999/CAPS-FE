<template>
    <div class="login container mt-3">
        <h3 class="text-center">
            <span v-if="isModifyMode()">스터디 수정</span>
            <span v-else>스터디 생성</span>
        </h3>
        <hr/>
        <form v-on:submit.prevent="onSubmit">
            <div class="form-group mb-3">
                <label for="study-title">제목</label>
                <input :placeholder="`빈칸 시 '${defaultTitle}' 로 설정`" type="text" class="form-control" id="study-title" v-model="study_title"/>
            </div>
            <SelectionForm v-bind:initialData="study_category" v-bind:selectList="getOptions(0)"
                           v-on:input="onStudyCategoryChange" name="카테고리"/>

            <div class="form-group mb-3">
                <label for="study-year">년도</label>
                <input type="number" class="form-control" id="study-year" v-model="study_year"/>
            </div>

            <SelectionForm v-bind:initialData="study_semester" v-bind:selectList="getOptions(1)"
                           v-on:input="(e) => {this.study_semester = e;}" name="학기"/>
            <SelectionForm v-bind:initialData="study_semester" v-bind:select-list="getOptions(2)"
                           v-on:input="(e) => {this.study_day = e;}" name="요일"/>


            <div class="form-group">
                <label for="study-content">소개</label>
                <textarea class="form-control" id="study-content" v-model="study_content" rows="3"></textarea>
            </div>
            <button type="submit" :disabled="isProcessing" class="btn btn-primary btn-block">
                <span v-if="isProcessing && isModifyMode()">수정 중...</span>
                <span v-else-if="isProcessing">작성 중...</span>
                <span v-else-if="isModifyMode()">수정</span>
                <span v-else>생성</span>
            </button>
        </form>
    </div>
</template>

<script>
import SelectionForm from './form/SelectionForm.vue';
import GlobalValue from '@/constants/GlobalValue.js';
import StudyService from '../service/study.js';

export default {
    name: 'StudyForm',
    mounted() {
    },
    data() {
        return {
            study_title: this.initialStudyTitle === undefined ? '' : this.initialStudyTitle,
            study_category: this.initialStudyCategory === undefined ? 0 : this.initialStudyCategory,
            study_content: this.initialStudyContent === undefined ? '' : this.initialStudyContent,

            study_year: this.initialStudyYear ? this.initialStudyYear : new Date().getFullYear(),
            study_semester: this.initialStudySemester ? this.initialStudySemester : 0,
            study_day: this.initialStudyDay ? this.initialStudyDay : 0,

            isStudyCategoryValid: true,
            // 진행 중
            isProcessing: false
        };
    },
    props: {
        currentStudyId: String,
        initialStudyTitle: String,
        initialStudyCategory: String,
        initialStudyContent: String,

        initialStudyYear: Number,
        initialStudySemester: Number,
        initialStudyDay: Number,
    },
    computed: {
        defaultTitle() {
            return `${this.study_year}년도 ${GlobalValue.G_SEMESTER[this.study_semester]} ${GlobalValue.G_STUDY_CATEGORY_ARRAY[this.study_category]}`;
        },
    },
    methods: {
        getOptions(v) {
            let categories = GlobalValue.G_STUDY_CATEGORY_ARRAY;
            if (v === 1) categories = GlobalValue.G_SEMESTER; // 학기
            else if (v === 2) categories = GlobalValue.G_DAY; // 요일
            return categories.map((e, index) => {
                return {
                    value: index,
                    text: e
                };
            });
        },
        // 수정 모드인가
        isModifyMode() {
            return this.currentBoardId !== undefined;
        },
        onStudyCategoryChange(value, valid) {
            this.study_category = value;
            this.isStudyCategoryValid = valid;
        },
        onSubmit() {
            // 전체 확인
            if (!this.isStudyCategoryValid) {
                this.$notify({
                    title: '올바르지 않은 입력이 있습니다.',
                    text: '다시 확인 후 입력해주세요.',
                    type: 'warn'
                });
                return;
            }

            this.isProcessing = true;

            // 수정 혹은 새로 작성
            if (this.isModifyMode()) {
                StudyService.modifyStudy(this.currentStudyId, {
                    study_title: this.study_title,
                    study_content: this.study_content,
                    study_category: this.study_category,
                    study_year: this.study_year,
                    study_semester: this.study_semester,
                    study_day: this.study_day,
                })
                    .then(() => {
                        // 성공
                        this.$notify({
                            title: '스터디 수정 성공!',
                            text: '스터디가 성공적으로 수정 되었습니다!',
                            type: 'success'
                        });
                        this.$emit('finished');
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            title: '스터디 수정 실패!',
                            text: '스터디 수정에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                            type: 'error'
                        });
                        this.isProcessing = false;
                    });
            } else {
                StudyService.createStudy({
                    study_title: this.study_title || this.defaultTitle,
                    study_content: this.study_content,
                    study_category: this.study_category,
                    study_year: this.study_year,
                    study_semester: this.study_semester,
                    study_day: this.study_day,
                })
                    .then((responseData) => {
                        // 성공
                        this.$notify({
                            title: '스터디 생성 성공!',
                            text: '스터디가 성공적으로 작성 되었습니다!',
                            type: 'success'
                        });
                        this.$router.push('/study/view/' + responseData.createdStudy._id);
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            title: '스터디 생성 실패!',
                            text: '스터디 생성에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
                            type: 'error'
                        });
                        this.isProcessing = false;
                    });
            }
        }
    },
    components: {
        SelectionForm
    }
};
</script>

<style>
</style>
