<template>
    <img class="rounded-circle" :class="imageClass" :src="imageSrc" @error="notFound">
</template>

<script>
    import p55 from '@/assets/placeholer_500_500.png';
    export default {
        name: 'ProfileImage',
        data() {
            return {};
        },
        props: {
            imageSrc: String,
            onErrorImage: {type: String, default: p55},
            imageClass: String,
        },
        mounted() {
            console.log(this.imageSrc, this.onErrorImage, this.imageClass);
        },
        methods: {
            notFound(e) {
                e.target.src = this.onErrorImage;
            }
        }
    };
</script>