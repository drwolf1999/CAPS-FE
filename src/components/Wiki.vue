<template>


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
