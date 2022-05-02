<template>
    <div class="p-2">
        <div class="d-flex flex-row">
            <ProfileImage v-bind:image-class="'comment-profile'" v-bind:image-src="comment.user.user_image_url"/>
            <div class="d-flex flex-column justify-content-start ms-2">
                <span class="d-block text-info">{{ comment.user.user_name }}</span>
                <span class="text-black-50">{{ comment.created_at | dateFormat }}</span>
            </div>
            <div class="d-flex flex-column justify-content-center ms-5">
                <button class="btn btn-sm btn-outline-primary">답글 달기</button>
            </div>
        </div>
        <div class="mt-2">
            <p class="comment-text">{{ comment.comment_content }}</p>
        </div>
    </div>
</template>

<script>
    import ProfileImage from '@/components/ProfileImage.vue';
    import Utility from '@/library/utility.js';

    export default {
        name: 'Comment',
        components: {ProfileImage},
        data() {
            return {
            };
        },
        props: {
            comment: Object,
        },
        mounted() {
        },
        methods: {
            WriteComment(result, data) {
                if (result) {
                    console.log(data);
                }
            }
        },
        filters: {
            dateFormat(e) {
                return Utility.dateFormat(e);
            }
        }
    };
</script>