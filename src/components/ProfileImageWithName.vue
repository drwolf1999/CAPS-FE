<template>
    <div style="height: 100px">
        <template v-if="index">{{ index }}. </template>
        <a class="float-start"><ProfileImage image-class="profile" :image-src="userImageUrl"/></a>
        <a href="javascript:void(0);" @click="clickProfile(userId)">{{ userName }}</a>
    </div>
</template>

<script>
import ProfileImage from '@/components/ProfileImage';

export default {
    name: 'ProfileImageWithName',
    props: {
        userId: String,
        userName: String,
        userImageUrl: String,
        index: [Number, Object]
    },
    components: {
        ProfileImage
    },
};
</script>

<style scoped>
.profile {
    width: 80px;
    height: 100%;
    padding-right: 10px;
}
</style>