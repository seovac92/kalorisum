<template>
  <div class="deleting-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeTheWindow()"/>
    </div>
    <p class="title">Brisanje</p>
    <slot></slot>
    <div class="btn-wrapper">
        <button class="btn-registration confirm" @click="allowDeleting()">Potvrdi</button>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        closeTheWindow(){
            this.$emit("closeTheWindow")
        },
        allowDeleting(){
            this.$emit("allowDeleting")
        }
    }
}
</script>

<style>
.deleting-wrapper .title{
    font-size: 2rem;
    margin: 0;
}
@media screen  and (min-width: 768px){
    .deleting-wrapper{
        width: 50vw;
        left: 25vw;
    }
}
@media screen  and (min-width: 992px){
    .deleting-wrapper{
        width: 40vw;
        left: 30vw;
    }
}
@media screen  and (min-width: 1200px){
    .deleting-wrapper{
        width: 30vw;
        left: 35vw;
    }
}
</style>