<template>
    <div id="write" class="box">
        <div class="row">
            <form @submit.prevent="saveArticle" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" required v-model="title">
                        <label for="">Title</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea type="text" required v-model="content" rows="50"></textarea>
                        <label for="">Your story</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <button type="submit" class="btn">Save</button>
                    </div>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from './firebaseInit'
export default {
    name: 'write',
    data () {
        return {
            title: null,
            content: null
        }
    },
    methods: {
        saveArticle () {
            db.collection('articles').add({
                title: this.title,
                content: this.content,
                author: firebase.auth().currentUser.email
            }).then(DocRef => this.$router.push('/feed'))
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
    height: 1000px;
    resize: none;
}
</style>