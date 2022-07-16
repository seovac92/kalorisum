<template>
  <div class="wrapper">
    <div class="form-wrapper">
            <div class="btn-exit-wrapper">
                <p class="btn-exit">X</p>
            </div>
        <h2>Registracija</h2>  
        <input class="input" type="text" v-model="user.name" placeholder="Korisnicko ime">
        <input class="input" type="text" v-model="user.email" placeholder="Korisnicki email">
        <input class="input" type="text" v-model="user.password" placeholder="Korisnicka sifra">
        <input class="input" type="text" v-model="user.repeatPassword" placeholder="Ponovite sifru">
        <input class="input" type="text" v-model="user.birthday" placeholder="Datum rodjenja">
        <input class="input" type="text" v-model="user.weight" placeholder="Tezina">
        <input class="input" type="text" v-model="user.height" placeholder="Visina">
        <div class="activity-wrapper">
            <p>Izaberite nivo aktivnosti</p>    
            <select class="input" v-model="user.activityLevel">
                <option value="1">Minimalna aktivnost</option>
                <option value="2">Slaba aktivnost</option>
                <option value="3">Srednja aktivnost</option>
                <option value="4">Visoka aktivnost</option>
                <option value="5">Ekstra-visoka aktivnost</option>
            </select>
        </div>
        <div class="gender-wrapper">
            <p>Izaberite pol</p>
            <select class="input" v-model="user.gender">
                <option value="0">Muski</option>
                <option value="1">Zenski</option>
            </select>
        </div>    
    </div>
  </div>
</template>

<script>
export default {
    data:function(){
        return{
            user:{
                name:"",
                email:"",
                password:"",
                repeatPassword:"",
                birthday:"",
                activityLevel:null,
                weight:null,
                height:null,
                gender:null
            }
        }
    }
}
</script>

<style scoped>
.form-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 1px solid black;
}
.activity-wrapper,.gender-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.btn-exit-wrapper{
    width: 100%;
}
.input{
    width: 30%;
    height: 30px;
    border-radius: 30px;
    margin: 10px 0 0;
}
.btn-exit{
    display: inline;
    font-size: 15px;
    font-weight: 800;
    margin: 0;
    padding: 5px;
    border: 1px solid black;
}
</style>