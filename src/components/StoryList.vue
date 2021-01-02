<template>
    <ul>
        <li v-for="article in articles" v-bind:key="article.id" class="article">
            <h5>{{article.title}}</h5>
            <span>{{article.content}}</span>
            <hr v-if="showAuthor">
            <span v-if="showAuthor">{{article.author_id}}</span>
            <span v-if="article.group">@ {{article.group}}</span>
        </li>
    </ul>
</template>

<script>
// import firebase from 'firebase/app';

export default {
    props: ['articles', 'showAuthor'],
    name: 'StoryList',
    data() {
        return {}
    },
    created() {
        console.log(this.articles)
    },
}
</script>

<style scoped>

h5 {
  color: #2b2b2b;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
span {
  color: #2b2b2b;
}
.article{
  position: relative;
    border: 3px solid rgb(179, 179, 179);
    border-radius: 10px 10px;
    margin: 0 0 3px 0;
    width: 60%;
    height: 80%;
    overflow-wrap: break-word;
    bottom: 7px;
}

</style>
