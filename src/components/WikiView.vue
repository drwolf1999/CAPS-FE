<template>
    <div class="wiki container">
        <h3 class="text-center">
            CAPS 위키 : {{ wikiTitle }}
        </h3>
        <div v-if="Wiki && Wiki.wiki.wiki_title === wikiTitle">
            {{ Wiki.wiki.wiki_content }}
        </div>
        <div v-else>
            해당 게시물이 존재하지 않아 만들어 주세요
            <br>
            <a v-if="isLogined" href="javascript:void(0)" @click="ClickAddWiki(wikiTitle)">{{ wikiTitle }} 문서 추가하기</a>
        </div>
    </div>
</template>


<script>
    // import WikiService from '../service/wiki';

    export default {
        name: 'WikiView',
        data() {
            return {
                wikiTitle: this.$route.params.wikiTitle,
            };
        },
        mounted() {
            this.$store.dispatch('fetchWiki', this.wikiTitle);
        },
        computed: {
            Wiki() {
                return this.$store.getters.getWiki;
            }
        },
        methods: {
            isLogined() {
                return this.$store.getters.isLogined;
            },
            ClickAddWiki(Title) {
                let nextDestination = '/wiki/add/' + Title;
                if (!this.isLogined()) {
                    this.$notify({
                        title: '로그인 필요',
                        text: '위키를 추가하시려면 로그인이 필요합니다. 로그인해 주세요.',
                        type: 'warn'
                    });
                    this.$store.dispatch('setNextDestination', nextDestination).then(() => this.$router.push('/login'));

                    return;
                }
                this.$router.push(nextDestination);
            },
        },
    };
</script>