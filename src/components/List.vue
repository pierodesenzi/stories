<template>
  <div id='list'>
    <h3>{{msg}}</h3>
    <ul>
      <li v-for="article in articles" v-bind:key="article.id" class="article">
        <h5>{{article.title}}</h5>
         <a>{{article.content}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'list',
  data () {
    return {
      msg: 'lista de artigos',
      articles: []
    }
  },
  created () {
    db.collection('articles').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'title': doc.data().title,
          'content': doc.data().content,
          'author_id': doc.data().author_id,
          'created_at': doc.data().created_at
        }
        this.articles.push(data)
      });
    })
  }
}
</script>

<!-- Add ascoped" attriaute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
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
a {
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
