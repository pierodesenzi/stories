<template>
  <div id='feed'>
    <h3>{{msg}}</h3>
    <StoryList id="feedStories" :articles="articles" :showAuthor="true"/>
    <h4 v-if="articles.length == 0">Não há histórias a serem mostradas</h4>
  </div>
</template>

<script>
import StoryList from './StoryList'
import db from './firebaseInit'
import firebase from 'firebase/app';

export default {
  name: 'myfeed',
  components: {
    StoryList,
  },
  data () {
    return {
      msg: 'Meu Feed',
      articles: [],
      my_groups: []
    }
  },
  created () {
    if(firebase.auth().currentUser){
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser;
        }

    db.collection('groups-profiles').where('user','==',this.currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'group': doc.data().group
        }
        this.my_groups.push(data.group)
      })
      db.collection('articles').where('group','in',this.my_groups).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'title': doc.data().title,
          'content': doc.data().content,
          'author_id': doc.data().author,
          'created_at': doc.data().created_at,
          'group': doc.data().group
        }
        this.articles.push(data)
      });
    });
    })
    .catch(error => {
      console.log("Erro ao carregar lista")
      console.log(error);
    })
  }
}

</script>

<!-- Add ascoped attriaute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
