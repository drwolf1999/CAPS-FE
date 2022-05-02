<template>
    <div v-if="getUserId && user" class="mt-3">
        <div class="container">
            <div class="row my-2">
                <div class="col-8 order-lg-2">
                    <ul class="nav nav-tabs" data-bs-tabs="tabs">
                        <li class="nav-item">
                            <a href="#profile" data-target="#profile" data-bs-toggle="tab" class="nav-link active">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a href="#messages" data-target="#messages" data-bs-toggle="tab"
                               class="nav-link">Messages</a>
                        </li>
                        <li class="nav-item">
                            <a v-if="!(userId && getUserId != userId)" href="#edit" data-target="#edit"
                               data-bs-toggle="tab" class="nav-link">Edit</a>
                        </li>
                    </ul>
                    <div class="tab-content py-4">
                        <div class="tab-pane active" id="profile">
                            <h5 class="mb-3">{{ user.user_email }}</h5>
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>About</h6>
                                    <p>
                                        Web Designer, UI/UX Engineer
                                    </p>
                                    <h6>Hobbies</h6>
                                    <p>
                                        Indie music, skiing and hiking. I love the great outdoors.
                                    </p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Skill Set</h6>
                                    <template v-if="getBadgeList.length === 0">
                                        Empty Set
                                    </template>
                                    <template v-else>
                                        <span v-for="(b, i) in getBadgeList" v-bind:key="i"
                                              class="badge bg-dark rounded-pill">{{ b }}</span>
                                    </template>
                                    <hr>
                                    <span class="badge bg-primary"><i class="fa fa-user"></i> 900 Followers</span>
                                    <span class="badge bg-success"><i class="fa fa-cog"></i> 43 Forks</span>
                                    <span class="badge bg-danger"><i class="fa fa-eye"></i> 245 Views</span>
                                </div>
                                <div class="col-md-12">
                                    <h5 class="mt-2"><span class="fa fa-clock-o ion-clock float-right"></span> Recent
                                        Activity</h5>
                                    <table class="table table-sm table-hover table-striped">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Gary</strong> deleted My Board1 in
                                                <strong>`Discussions`</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Kensington</strong> deleted MyBoard3 in
                                                <strong>`Discussions`</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>John</strong> deleted My Board1 in
                                                <strong>`Discussions`</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Skell</strong> deleted his post Look at Why this is.. in
                                                <strong>`Discussions`</strong>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!--/row-->
                        </div>
                        <div class="tab-pane" id="messages">
                            <div class="alert alert-info alert-dismissable">
                                <a class="panel-close close" data-dismiss="alert">×</a> This is an
                                <strong>.alert</strong>. Use this to show important messages to the user.
                            </div>
                            <table class="table table-hover table-striped">
                                <tbody>
                                <tr>
                                    <td>
                                        <span class="float-right font-weight-bold">3 hrs ago</span> Here is your a link
                                        to the latest summary report from the..
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="float-right font-weight-bold">Yesterday</span> There has been a
                                        request on your account since that was..
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices
                                        quis, dapibus id dolor. Morbi venenatis lacinia rhoncus.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="float-right font-weight-bold">9/4</span> Vestibulum tincidunt
                                        ullamcorper eros eget luctus.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span class="float-right font-weight-bold">9/4</span> Maxamillion ais the fix
                                        for tibulum tincidunt ullamcorper eros.
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane" id="edit">
                            <ProfileForm v-bind:initialUserComment="user.user_comment"/>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 order-lg-1 text-center">
                    <ProfileImage :image-src="getUserPhoto(user.user_id)"
                                  class="mx-auto img-fluid d-block img-250"
                                  @click="isModifying ? $refs.profileImage.click() : void 0"/>
                    <label class="custom-file d-none">
                        <input type="file" id="file" class="custom-file-input" ref="profileImage"
                               accept="image/jpeg, image/png" v-on:change="SetProfileImage">
                        <span class="custom-file-control">Choose file</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProfileForm from './ProfileForm.vue';
    import UserService from '../service/user.js';
    import RestAPI from '../constants/RestAPI.js';
    import ProfileImage from '@/components/ProfileImage.vue';

    export default {
        data() {
            return {
                user: null,
                userProfileImage: null,
                isModifying: true,
            };
        },
        props: ['userId'],
        computed: {
            getUserId() {
                return this.$store.getters.getUserData.user_id;
            },
            getBadgeList() {
                if (this.user === null || this.user.user_skill_set === '') return [];
                let ret = [];
                let uss = this.user.user_skill_set.split(',');
                let size = uss.length;
                for (let i = 0; i < size; i++) {
                    ret.push(uss[i].trim());
                }
                return ret;
            },
        },
        mounted() {
            // 사용자 가져옴
            if (this.userId) {
                UserService.getUserData(this.userId).then(res => {
                    this.user = res.data;
                });
            } else {
                UserService.getUserData(this.getUserId).then(res => {
                    this.user = res.data;
                });
            }
        },
        methods: {
            getUserPhoto(id) {
                if (this.userProfileImage !== null && this.isModifying) {
                    return URL.createObjectURL(this.userProfileImage);
                }
                return RestAPI.SERVER_DOMAIN + 'users/photo/' + id;
            },
            replaceUserPhoto(e) {
                // console.log(e);
                e.target.src = '';
            },
            SetProfileImage(e) {
                if (e.target.files.length === 0) this.userProfileImage = null;
                else
                    this.userProfileImage = e.target.files[0];
            },
            updateUserProfile() {
                let formData = new FormData();
                formData.append('image', this.userProfileImage);
                UserService.editUserData(formData)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        components: {
            ProfileImage,
            ProfileForm
        }
    };
</script>

<style>
</style>
