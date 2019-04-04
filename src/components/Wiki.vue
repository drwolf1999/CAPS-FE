<template>
<<<<<<< HEAD
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
    import WikiForm from "./WikiForm";

    export default {
        components: {WikiForm},
        data() {
            return {
                isModifying: false,
                SearchQuery: '',
                wikiTitle: this.$route.params.wikiTitle === undefined ? "" : this.$route.params.wikiTitle,
                Wiki: this.$store.getters.getWiki,
                isSearching: false,
            };
        },
        props: {
            // SearchQuery: String,
            // wikiTitle: String,
        },
        mounted() {
            this.fetch_wiki(this.wikiTitle === "" ? '대문' : this.wikiTitle);
            // this.$store.dispatch('fetchWiki', this.wikiTitle === "" ? '대문' : this.wikiTitle);
        },
        computed: {
            isSearchQueryValid() {
                return this.SearchQuery !== "";
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
                        this.$router.push(nextDestination);
                    })
                    .catch(err => {
                        if (err) throw err;
                        console.log(err);
                    });
            }
        }
    };
</script>
=======


<div class="container">
    <h1 class="wiki_title">
        대문
    </h1>
    <p class='wiki_content'><a class='wiki_link' href='/wiki/?s=CAPS+%EC%9C%84%ED%82%A4' title='CAPS 위키'>CAPS 위키</a>에 오신 것을 환영합니다!</p>
    <p class='wiki_content'><a class='wiki_link' href='/wiki/?s=CAPS' title='CAPS'>CAPS</a> 회원이라면 원하는 문서를 생성 및 편집할 수 있습니다.</p>
    <p class='wiki_content'>더 자세한 내용은 <a class='wiki_link' href='/wiki/?s=CAPS+%EC%9C%84%ED%82%A4' title='CAPS 위키'>CAPS 위키</a>, <a class='wiki_link' href='/wiki/?s=%EB%8F%84%EC%9B%80%EB%A7%90' title='도움말'>도움말</a>을 참고하시기 바랍니다.</p>
    <p class='wiki_content'></p>
</div>
</template>

<script>
export default {

};
</script>

<style>
.wiki_title {
    color: black;
    background: none;
    /* font-weight: normal; */
    /* margin: 0; */
    padding-top: .5em;
    padding-bottom: .17em;
    border-bottom: 1px solid #aaa;
}

.wiki-search {
    background: #2196F3;
    margin-top: -30px;
    padding-bottom: 20px;
}

.wiki_edit_section {
    float: right;
    font-size: 20px;
}

.wiki_redirect_section {
    font-size: 20px;
}

.wiki_link {
    color: #0275d8;
    /* font-weight: bold; */
}

.wiki_link_not_exists {
    color: red;
}

a.wiki-footnote {
    font-size: 0.8em;
    vertical-align: super;
}

/* live search */

.wiki_live_search_wrapper {
    width: 300px;
    margin: 0 auto;
}

div.wiki_live_search {
    width: 300px;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    top: 248px;
}

p.wiki_live_search {
    margin: 0px;
    padding: 5px 15px;
}

p.wiki_live_search-active {
    margin: 0px;
    padding: 5px 15px;
    background: lightblue;
}

p.wiki_live_search:hover {
    background-color: #ddd;
    cursor: pointer;
}

a.wiki_link:hover {
    color: #0275d8;
    text-decoration: underline;
}

a.wiki_link_not_exists:hover {
    color: red;
    text-decoration: underline;
}

h1.wiki_title {
    font-weight: bold;
}

h2.wiki_title {
    font-size: 32px;
}

p.wiki_content {
    /*text-indent: 15px;*/
    padding-bottom: 10px;
    margin-bottom: 0;
}

a.wiki_external_link {
    color: #090;
}

a.wiki_external_link:before {
    padding: 0px 0.15em;
    background: green;
    color: white;
    content: "\f1fe";
    font-family: "Ionicons" !important;
}

ul.wiki_list {
    padding-left: 40px;
}

li.wiki_list {
    padding-bottom: 10px;
    font-size: 16px;
    list-style-type: square;
}

img.wiki_image {
    max-width: 100%;
    max-height: 300px;
}
</style>
>>>>>>> bf3763981dff41df91ff7b8c76d22c51405f1ef4
