<template>
    <div class="wiki container">
        <h3 class="text-center">CAPS 위키 수정 : {{ wiki_title }}</h3>
        <form v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <ul class="nav nav-tabs" data-bs-tabs="tabs">
                    <li class="nav-item">
                        <a href="#editor" data-target="#editor" data-bs-toggle="tab" class="nav-link active">에디터</a>
                    </li>
                    <li class="nav-item">
                        <a href="#preview" data-target="#preview" data-bs-toggle="tab" class="nav-link" @click="WIKI">미리보기</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="editor">
                        <label for="wiki_content">내용</label>
                        <textarea class="form-control" id="wiki_content" v-model="wiki_content" rows="10"></textarea>
                    </div>
                    <div class="tab-pane" id="preview">
                        <hr>
                        <div v-html="wiki_sample_content"></div>
                        <hr>
                    </div>
                </div>
            </div>
            <button type="submit" :disabled="isProcessing" class="btn btn-primary btn-block">
                <span v-if="isProcessing && isModifyMod()">수정 중</span>
                <span v-else-if="isProcessing">작성 중</span>
                <span v-else-if="isModifyMod()">수정</span>
                <span v-else>작성</span>
            </button>
        </form>
    </div>
</template>

<script>
    import WikiService from '../service/wiki';
    import NCWIKI from '../library/ncwiki';

    export default {
        name: 'WikiForm',
        data() {
            return {
                wiki_title: this.$route.params.wikiTitle === undefined ? '' : this.$route.params.wikiTitle,
                wiki_content: this.initialWikiContent === undefined ? '' : this.initialWikiContent,
                // wiki_content: this.initialWikiContent === undefined ? '' : this.initialWikiContent,
                // check valid
                isWikiTitleValid: true,
                // isWikiContentValid: this.initialWikiContent !== undefined,
                isWikiContentValid: true,
                // 진행 중
                isProcessing: false,
                wiki_sample_content: '',
            };
        },
        props: {
            // currentWikiContent: String,
            initialWikiContent: String,
        },
        mounted() {
            this.fetchWiki(this.wiki_title);
        },
        methods: {
            isModifyMod() {
                return this.initialWikiContent !== undefined;
            },
            onSubmit() {
                if (!this.isWikiTitleValid && !this.isWikiContentValid) {
                    this.$notify({
                        title: '올바르지 않는 입력이 있습니다.',
                        content: '다시 확인해 주세요',
                        type: 'warn',
                    });
                    return;
                }
                this.isProcessing = true;
                if (this.isModifyMod()) {
                    WikiService.writeWiki({
                        wiki_title: this.wiki_title,
                        wiki_content: this.wiki_content,
                    })
                        .then((responseData) => {
                            // 성공
                            this.$notify({
                                title: '위키 작성 성공!',
                                content: '위키 작성 성공적으로 이루어졌습니다.!',
                                type: 'success',
                            });
                            this.$router.push('/wiki/search/' + responseData.CreatedWiki.wiki_title);
                        })
                        .catch(error => {
                            console.log(error);
                            this.$notify({
                                title: '위키 작성 실패..',
                                content: '위키 작성에 실패하였습니다...',
                                type: 'error',
                            });
                            this.isProcessing = false;
                        });
                } else {
                    WikiService.writeWiki({
                        wiki_title: this.wiki_title,
                        wiki_content: this.wiki_content,
                    })
                        .then((responseData) => {
                            // 성공
                            this.$notify({
                                title: '위키 작성 성공!',
                                content: '위키 작성 성공적으로 이루어졌습니다.!',
                                type: 'success',
                            });
                            this.$router.push('/wiki/search/' + responseData.CreatedWiki.wiki_title);
                        })
                        .catch(error => {
                            console.log(error);
                            this.$notify({
                                title: '위키 작성 실패..',
                                content: '위키 작성에 실패하였습니다...',
                                type: 'error',
                            });
                            this.isProcessing = false;
                        });
                }
            },
            fetchWiki(Title) {
                WikiService.getWiki(Title)
                    .then((response) => {
                        this.wiki_content = response.data.wiki.wiki_content;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            async WIKI() {
                NCWIKI.view(this.wiki_content)
                .then(data => {
                    console.log(data);
                    this.wiki_sample_content = data;
                })
                .catch(error => {
                    console.log(error);
                });
            },
        },
        computed: {
        },
    };
</script>