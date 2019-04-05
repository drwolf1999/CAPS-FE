<template>
    <div class="wiki container">
        <h3 class="text-center">
            <span v-if="!wikiTitle">캡스 위키</span>
            <span v-else>캡스 위키 : {{ wikiTitle }}</span>
        </h3>
        <hr/>
        <div v-if="isSearching">
            <center>
                로딩중...
            </center>
        </div>
        <div v-else>
            <center>
                <div class="col-sm-6 input-group inline-input-group">
                    <input type="search" v-model="SearchQuery" class="form-control">
                    <div class="input-group-append">
                        <button class="btn btn-success" @click="search_wiki()">검색</button>
                    </div>
                    <!--                    <div class="input-group-append">-->
                    <!--                        <button class="btn btn-info" @click="random_wiki()">랜덤</button>-->
                    <!--                    </div>-->
                </div>
            </center>
            <br>
            <div class="post-heading">
                <div class="row">
                    <div class="col-md-7 col-sm-12">
                        <h2 v-if="wikiTitle"> {{ wikiTitle }} </h2>
                        <h2 v-else>대문</h2>
                    </div>
                    <div class="col-md-5 inline-input-group mb-3 text-right">
                        <h5><a href="javascript:void(0)" @click="ClickAddWiki(wikiTitle)">[[ 수정하기 ]]</a></h5>
                    </div>
                </div>
            </div>
            <div class="post-content">
                <div v-bind:initialWikiContent="Wiki.wiki_content" v-if="Wiki && (Wiki.wiki_title === wikiTitle || !wikiTitle)">
                    {{ Wiki.wiki_content }}
                </div>
                <div v-else>
                    해당 위키가 존재하지 않아요....ㅠㅠ 만들어 주세요
                    <br>
                    <a v-if="isLogined" href="javascript:void(0)" @click="ClickAddWiki(wikiTitle)">{{ wikiTitle }}문서
                        추가하기</a>
                </div>
            </div>
        </div>
    </div>
    <!--    <WikiForm v-else v-bind:initialWikiContent="Wiki.wiki_content" v-on:finished="finishModifyWiki"></WikiForm>-->
</template>


<script>
    import WikiService from '../service/wiki';
    import WikiForm from './WikiForm';

    export default {
        components: {WikiForm},
        data() {
            return {
                isModifying: false,
                SearchQuery: '',
                wikiTitle: this.$route.params.wikiTitle === undefined ? '' : this.$route.params.wikiTitle,
                Wiki: this.$store.getters.getWiki,
                isSearching: false,
            };
        },
        props: {
            // SearchQuery: String,
            // wikiTitle: String,
        },
        mounted() {
            this.fetch_wiki(this.wikiTitle === '' ? '대문' : this.wikiTitle);
            // this.$store.dispatch('fetchWiki', this.wikiTitle === "" ? '대문' : this.wikiTitle);
        },
        computed: {
            isSearchQueryValid() {
                return this.SearchQuery !== '';
            },
        },
        methods: {
            isLogined() {
                return this.$store.getters.isLogined;
            },
            random_wiki() {
                this.Wiki = WikiService.getRandomWiki();
                let nextDestination = '/wiki/search/' + this.Wiki.wiki_title;
                if (!this.isLogined()) {
                    this.$notify({
                        title: '로그인 필요',
                        text: '위키를 보시려면 로그인이 필요합니다. 로그인해 주세요.',
                        type: 'warn'
                    });
                    this.$store.dispatch('setNextDestination', nextDestination).then(() => this.$router.push('/login'));

                    return;
                }
                this.$router.push(nextDestination);
            },
            ClickAddWiki(Title) {
                if(Title === '') Title = '대문';
                // this.isModifying = true;
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
            // finishModifyWiki() {
            //     this.isModifying = false;
            // },
            search_wiki() {
                if (!this.isSearchQueryValid) {
                    this.$notify({
                        title: '검색값이 잘못되었어요...' + this.SearchQuery,
                        content: '다시 입력해주세요',
                        type: 'warn',
                    });
                    return;
                }
                this.isSearching = true;
                let nextDestination = '/wiki/search/' + this.SearchQuery;
                if (!this.isLogined()) {
                    this.$notify({
                        title: '로그인 필요',
                        text: '위키를 보시려면 로그인이 필요합니다. 로그인해 주세요.',
                        type: 'warn'
                    });
                    this.$store.dispatch('setNextDestination', nextDestination).then(() => this.$router.push('/login'));
                    return;
                }
                this.wikiTitle = this.SearchQuery;
                this.Wiki = null;
                this.fetch_wiki(this.SearchQuery);
                this.isSearching = false;
            },
            fetch_wiki(key) {
                WikiService.getWiki(key)
                    .then((response) => {
                        this.Wiki = response.data.wiki;
                        this.SearchQuery = '';
                    })
                    .catch(err => {
                        if (err) throw err;
                        console.log(err);
                    });
            }
        }
    };
</script>
