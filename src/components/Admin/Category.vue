<template>
    <div class="container table-responsive">
        <table class="table">
            <thead>
            <tr>
                <th>#</th>
                <th>이름</th>
                <th>권한</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(c, i) in Categories" v-bind:key="i">
                <td>{{ i }}</td>
                <td>{{ c.category_name }}</td>
                <td>{{ c.category_permission }}</td>
                <td>삭제</td>
            </tr>
            <tr>
                <td></td>
                <td><input type="text" v-model="category_name" class="form-control"/></td>
                <td><input type="number" v-model="category_permission" class="form-control"/></td>
                <td><a class="btn btn-success" href="javascript:void(0);" @click="AddCategory">추가</a></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'Category',
        mounted() {
            this.$store.dispatch('fetchBoardCategories');
        },
        data() {
            return {
                category_name: '',
                category_permission: '0',
            };
        },
        methods: {
            // Check Validation
            ValidName() {
                return this.category_name !== '';
            },
            ValidPermission() {
                return !isNaN(this.category_permission);
            },

            // Do Something
            AddCategory() {
                if (!this.ValidName || !this.ValidPermission) {
                    return;
                }
                const c_permission = parseInt(this.category_permission);
                this.$store.dispatch('addBoardCategory', {
                    category_name: this.category_name,
                    category_permission: c_permission,
                });
            },
            DeleteCategory() {
                //
            },
            ModifyCategory() {
                //
            }
        },
        computed: {
            Categories() {
                let ret = [];
                let categories = this.$store.getters.getBoardCategories;
                let cl = categories.length;
                for (let i = 0; i < cl; i++) {
                    ret.push({
                        category_name: categories[i].category_name,
                        category_permission: categories[i].category_permission,
                    });
                }
                return ret;
            }
        }
    };
</script>