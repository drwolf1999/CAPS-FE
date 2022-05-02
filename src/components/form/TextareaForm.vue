<template>
    <div class="wrapper">
        <textarea v-model="inputData" v-on:input="inputData=$event.target.value"
                  rows="4" :ref="name"
                  :class="isInit?'form-control':isValid?'is-valid':'is-invalid'" @keyup="onInput()"
                  :id="name" class="form-control grow-none" :placeholder="nameWithJosa + ' 입력하세요'"
        ></textarea>
        <div :style="CommentWrapperStyle" :ref="name + '-count-wrapper'" style="position: absolute; right: 10px; font-size: 10px;">
            <span>{{ inputData.length }}</span> / {{ maxLength }}
        </div>
        <div v-show="!isValid" :id="name + 'helpBlock'" class="invalid-feedback form-text text-danger">
            <ul>
                <li v-for="(message, index) in validCheckMessage" v-bind:key="index">
                    {{ message }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Josa from 'josa-js';

    export default {
        name: 'TextareaForm',
        data() {
            return {
                isMounted: false,
                inputData: this.initialData,
                validCheckMessage: [],

                nameWithJosa: this.name + Josa.c(this.name, '을')
            };
        },
        props: {
            initialData: String,
            name: String,
            maxLength: {type: Number, default: -1},
        },
        mounted() {
            this.isMounted = true;
        },
        computed: {
            isValid() {
                return this.validCheckMessage.length === 0;
            },
            isInit() {
                return this.validCheckMessage.length === 0 && this.inputData.length === 0;
            },
            CommentWrapperStyle() {
                if (!this.isMounted) return;
                return `top: ${this.$refs[this.name].clientHeight - 20}px;`;
            }
        },
        methods: {
            onInput() {
                // valid check
                this.validCheck();
                // emit this data to parent
                this.$emit('input', this.inputData, this.isValid);
            },
            validCheck() {
                this.validCheckMessage = [];
                if (this.inputData.length === 0) {
                    this.validCheckMessage.push(this.nameWithJosa + ' 입력하세요.');
                }

                if (this.maxLength !== -1 && this.inputData.length > this.maxLength) {
                    this.validCheckMessage.push('글자수 제한을 지켜주세요');
                }

                // more stuff
            }
        }
    };
</script>

<style>
    .wrapper {
        position: relative;
    }

    .grow-none {
        resize: none;
    }
</style>