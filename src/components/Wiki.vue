<template>
    <div class="wiki container mt-3" v-if="!isModifying">
        <h3 class="text-center">
            <span v-if="!wikiTitle">캡스 위키</span>
            <span v-else>캡스 위키 : {{ wikiTitle }}</span>
        </h3>
        <hr/>
        <div v-if="isSearching">
            <div class="align-content-center">
                로딩중...
            </div>
        </div>
        <div v-else>
            <section class="wiki-search">
                <div class="text-center">
                    <div class="input-group">
                        <input type="search" autocomplete="off" v-model="SearchQuery" class="form-control" @input="live_search" @focus="live_search" @blur="keys = []" @keypress.enter="search_wiki">
                        <button class="btn btn-success" @click="search_wiki">검색</button>
                        <button class="btn btn-success" @click="random_wiki">랜덤</button>
                    </div>
                </div>
                <div class="wiki-live-search-wallpaper">
                    <ul class="wiki-live-search">
                        <li v-for="name in keys" v-bind:key="name" class="wiki-live-search" :id="name">
                            <div class="wiki-live-search">{{ name }}</div>
                        </li>
                    </ul>
                </div>
            </section>
            <br>
            <div class="post-heading">
                <div class="row">
                    <div class="col-md-7 col-sm-12">
                        <h2 v-if="wikiTitle"> {{ wikiTitle }} </h2>
                        <h2 v-else>대문</h2>
                    </div>
                    <div v-if="wikiTitle && Wiki" class="col-md-5 d-inline mb-3 text-end"><h5><a href="javascript:void(0)" @click="ClickAddWiki(wikiTitle)">[[ 수정하기 ]]</a></h5>
                    </div>
                </div>
            </div>
            <div class="post-content">
                <div v-if="Wiki && (Wiki.wiki_title === wikiTitle || !wikiTitle)"  v-html="Wiki.wiki_content">
<!--                    <div></div>-->
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
    <WikiForm v-else v-bind:initialWikiContent="Wiki.wiki_content" v-on:finished="finishModifyWiki"></WikiForm>
</template>


<script>
    import WikiService from '../service/wiki.js';
    import WikiForm from './WikiForm.vue';
    import NCWIKI from '../library/ncwiki.js';

    export default {
        components: {WikiForm},
        data() {
            return {
                isModifying: false,
                SearchQuery: '',
                wikiTitle: this.$route.params.wikiTitle === undefined ? '대문' : this.$route.params.wikiTitle,
                Wiki: this.$store.getters.getWiki,
                isSearching: false,
                keys: [],
                liveSearchList: [],
            };
        },
        props: {
            // SearchQuery: String,
            // wikiTitle: String,
        },
        mounted() {
            this.fetch_wiki(this.wikiTitle === '' ? '대문' : this.wikiTitle);
            this.fetchLiveSearchList();
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
                WikiService.getRandomWiki()
                .then(response => {
                    this.set_wiki(response.data.wiki);
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
                });
            },
            ClickAddWiki(Title) {
                if (Title === '') Title = '대문';
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
                this.$router.push(nextDestination);
                this.fetch_wiki(this.SearchQuery);
                this.isSearching = false;
            },
            fetch_wiki(key) {
                WikiService.getWiki(key)
                    .then(async (response) => {
                        if (response.data.wiki !== null) {
                            this.set_wiki(response.data.wiki);
                        } else {
                            this.Wiki = null;
                        }
                        this.SearchQuery = '';
                    })
                    .catch(err => {
                        if (err) throw err;
                        console.log(err);
                    });
            },
            fetchLiveSearchList() {
                WikiService.getLiveSearchList()
                    .then(response => {
                        this.liveSearchList = response.data.list;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            live_search() {
                this.keys = [];
                if (this.SearchQuery !== '' && this.isSearchQueryValid) {
                    this.keys = this.liveSearchList.filter(m => m.indexOf(this.SearchQuery) === 0).slice(0, 5);
                }
            },
            async set_wiki(wiki) {
                if (this.Wiki === wiki) return;
                this.Wiki = wiki;
                this.wikiTitle = this.Wiki.wiki_title;
                this.Wiki.wiki_content = await NCWIKI.view(wiki.wiki_content);
            }
        },
    };
</script>
