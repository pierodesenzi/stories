<template>
  <div id='lol'>
    <h3>{{currentProfile.name.first}} {{currentProfile.name.last}}</h3>
    <h5>{{currentProfile.biography}}</h5>
    <StoryList :articles="articles" :showAuthor="false"/>
  </div>
</template>

<script>
import StoryList from './StoryList'
import db from './firebaseInit'
export default {
  name: 'profile',
  components: {
    StoryList,
  },
  data () {
    return {
      articles: [],
      currentProfile: {
        name: {},
      },
    }
  },
  created () {
    let docRef = db.collection("profiles").doc(this.$route.params.username);



    docRef.get().then((doc) => {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            this.currentProfile = doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    console.log(this.currentProfile)

    docRef.collection('articles').get().then(querySnapshot => {
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
