<template>
  <div id='feed'>
    <h3>{{msg}}</h3>
    <StoryList id="feedStories" :articles="articles" :showAuthor="true"/>
  </div>
</template>

<script>
import StoryList from './StoryList'
import db from './firebaseInit'

export default {
  name: 'feed',
  components: {
    StoryList,
  },
  data () {
    return {
      msg: 'Feed de artigos',
      articles: []
    }
  },
  created () {
    db.collection('articles').where('group','==',this.$route.params.group).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'title': doc.data().title,
          'content': doc.data().content,
          'author_id': doc.data().author,
          'created_at': doc.data().created_at
        }
        this.articles.push(data)
      });
    })
    .catch(error => {
      console.log("Erro ao carregar lista")
      console.log(error);
    })
  }
}
</script>

<!-- Add ascoped" attriaute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
