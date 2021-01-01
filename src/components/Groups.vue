<template>
  <div id='feed'>
    <h3>Groups</h3>
    <ul>
      <li v-for="group in all_groups" v-bind:key="group.id" v-bind:class="{isin: group.isin}" class="group">
        <h4>{{group.name}}</h4>
        <h6>{{group.description}}</h6>
        <button v-if=group.isin v-on:click="optout(group.name)" class="btn leave">Sair deste grupo</button>
        <button v-else v-on:click="optin(group.name)" class="btn">Entrar neste grupo</button>
      </li>
    </ul>
  </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase/app';

export default {
  name: 'groups',
  components: {
  },
  data () {
    return {
      msg: 'Groups',
      all_groups: [],
      my_groups: [],
      isLoggedIn: false,
      currentUser: false
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
      db.collection('groups').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id,
            'name': doc.data().name,
            'description': doc.data().description,
            'isin': false,
          }
          if(this.my_groups.includes(data.name)){
            data.isin = true

          }
          this.all_groups.push(data)
        });
      });
    })
    .catch(error => {
      console.log("Erro ao carregar lista")
      console.log(error);
    })
  },
  methods: {
    optout: function (name) {
      db.collection('groups-profiles').where('user','==',this.currentUser.uid)
      .where('group','==',name).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.id)
        db.collection('groups-profiles').doc(doc.id).delete()
      });
  })
       .then(DocRef => this.$router.push('/feed'))
  },
    optin: function (name) {
      db.collection('groups-profiles').add({
        group: name,
        user: this.currentUser.uid
      })
      .then(DocRef => this.$router.go())
    }
  }
}
</script>

<!-- Add ascoped" attriaute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.group{ 
  position: relative;
    border: 3px solid rgb(179, 179, 179);
    border-radius: 10px 10px;
    margin: 0 0 3px 0;
    width: 60%;
    height: 80%;
    overflow-wrap: break-word;
    bottom: 7px;
}

.isin {
  background-color: #e6f5d2;
}

.leave {
  background-color: brown;
}

</style>
