<template>
    <div id="write" class="box">
        <div class="row">
            <select name="cars" id="cars" style="display: block">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
            <ValidationObserver ref="form">
                <form @submit.prevent="saveArticle" class="col s12">
                    <div class="row">
                        <ValidationProvider rules="title-required" v-slot="{ errors }">
                            <div class="input-field col s12">
                                <input type="text" id="title" v-model="title">
                                <label for="title">Title</label>
                                <span>{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="row">
                        <ValidationProvider rules="content-required" v-slot="{ errors }">
                            <div class="input-field col s12">
                                <textarea type="text" id="content" v-model="content" rows="20"></textarea>
                                <label for="content">Your story</label>
                                <span>{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <button type="submit" id="submitStory" class="btn">Save</button>
                        </div>
                    </div>

                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import db from './firebaseInit'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules.umd.js';

extend('content-required', {
  ...required,
  message: 'The content of your story is required'
});

extend('title-required', {
  ...required,
  message: 'A title for your story is required'
});


export default {
    components: {
      ValidationProvider,
      ValidationObserver
    },
    name: 'write',
    data () {
        return {
            title: null,
            content: null,
            my_groups: []
        }
    },
    methods: {
        saveArticle () {
            this.$refs.form.validate().then(success => {
                if(success){
                    let currentUsername = firebase.auth().currentUser.displayName;
                    let article = {
                        title: this.title,
                        content: this.content,
                        author: currentUsername
                    };
                    db.collection('articles').add(article)
                        .then(DocRef => db.collection('profiles').doc(currentUsername).collection('articles').add(article))
                        .then(DocRef => this.$router.push('/feed'))
                }
            })
            .catch(error => {
                //Deleta o usuário caso ocorra um erro ao criar o perfil
                console.log("Erro ao criar perfil")
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>
.box {
    display: inline-block;
    margin: 0 10px;
    position: relative;
    width: 60%;
    height: 80%;
    overflow-wrap: break-word;
    bottom: 7px;
}

textarea {
    width: 100%;
    height: 50%;
    resize: none;
}
</style>
