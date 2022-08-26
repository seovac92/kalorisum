<template>
  <div class="deleting-wrapper">
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
.deleting-wrapper{
    width: 60vw;
    position: fixed;
    top: 20vh;
    left: 20vw;
    padding: 10px;
    background-color: #eee;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    z-index: 1;
}
.deleting-wrapper .title{
    font-size: 2rem;
    margin: 0;
}
</style>