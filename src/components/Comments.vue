<template>
    <div class="mt-3">
        <div class="d-flex flex-column" v-for="comment in comments" v-bind:key="comment._id">
            <Comment v-bind:comment="comment"></Comment>
            <div class="d-flex flex-column" v-for="c_comment in comment.child" v-bind:key="c_comment._id">
                <Comment v-bind:comment="c_comment"></Comment>
                <hr>
            </div>
            <comment-form v-bind:board-id="boardId" v-bind:parent-comment="comment._id" v-on:write="WriteComment"/>
            <hr>
        </div>
        <comment-form v-bind:board-id="boardId" v-on:write="WriteComment"/>
    </div>
</template>

<script>
    import CommentForm from '@/components/CommentForm';
    import Comment from '@/components/Comment';
    import BoardService from '@/service/board';

    export default {
        name: 'Comments',
        components: {CommentForm, Comment},
        data() {
            return {
                comments: [],
            };
        },
        props: {
            boardId: String,
        },
        mounted() {
            this.FetchComment();
        },
        methods: {
            FetchComment() {
                BoardService.getComments(this.boardId)
                    .then(response => {
                        if (Array.isArray(response.result))
                            this.comments = response.result;
                        else this.comments = [response.result];
                    })
                    .catch(error => console.log(error));
            },
            WriteComment(result, data) {
                if (result) {
                    console.log(data);
                    this.FetchComment();
                }
            }
        },
    };
</script>