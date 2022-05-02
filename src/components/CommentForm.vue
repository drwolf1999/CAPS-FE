<template>
    <form v-on:submit.prevent="OnSubmit">
        <div class="card card-body border-light">
            <div class="d-flex">
                <div class="p-2 flex-shrink-0">
                    <ProfileImage v-bind:image-class="'comment-profile'" v-bind:image-src="ProfileUrl"/>
                </div>
                <div class="p-2 flex-grow-1" ref="content">
                    <textarea-form v-bind:initial-data="commentContent" name="댓글" v-on:input="OnChangeCommentContent"
                                   :max-length="140"></textarea-form>
                </div>
                <div class="p-2 d-grid text-center" :style="'max-height: ' + maxHeightSubmitGroup + 'px;'">
                    <button class="btn btn-primary btn-sm shadow-none"
                            style="height: 100%; width: 100%; line-height: 100%;">
                        <span v-if="isProcessing && IsModifyMode">수정 중...</span>
                        <span v-else-if="isProcessing">작성 중...</span>
                        <span v-else-if="IsModifyMode">수정</span>
                        <span v-else>작성</span>
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    import TextareaForm from '@/components/form/TextareaForm';
    import ProfileImage from '@/components/ProfileImage';
    import BoardService from '@/service/board';

    export default {
        name: 'CommentForm',
        components: {TextareaForm, ProfileImage},
        data() {
            return {
                commentContent: this.initialCommentContent || '',
                commentValid: true,
                maxHeightSubmitGroup: 0,
                isProcessing: false,
            };
        },
        props: {
            boardId: String,
            commentId: {type: String, required: false},
            parentComment: {type: String, default: null, required: false},
            initialCommentContent: String,
        },
        computed: {
            ProfileUrl() {
                return this.$store.getters.getUserData.user_image_url;
            },
            IsModifyMode() {
                return this.commentId !== undefined;
            },
        },
        methods: {
            OnChangeCommentContent(data, valid) {
                this.commentContent = data;
                this.commentValid = valid;
            },
            OnSubmit() {
                if (!this.commentValid) {
                    this.$notify({
                        title: '댓글 내용을 다시 확인해주세요',
                        type: 'warn',
                    });
                }
                if (this.IsModifyMode) {
                    // TODO: implement patch comment
                } else {
                    BoardService.writeComment(this.boardId, {
                        comment_content: this.commentContent,
                        parent_comment: this.parentComment,
                    })
                    .then(response => {
                        console.log(response);
                        this.$emit('write', true, response.createdComment);
                    })
                    .catch(error => console.log(error));
                }
            },
        },
        mounted() {
            this.maxHeightSubmitGroup = this.$refs.content.clientHeight;
        }
    };
</script>