<template>
  <div class="wrapper">
    <div class="user-bio-wrapper">
      <div class="bio-wrapper">
        <h1 class="title-h2">{{user.name}}</h1>
        <p>Datum rodjenja {{user.birthday}}</p>
        <p>Visina {{user.height}}cm</p>
        <p>Tezina {{user.weight}}kg</p>
      </div>  
      <ChartWeight class="chart"></ChartWeight>
    </div>
    <div class="day-plan">
      <DayPlan></DayPlan>
    </div>
  </div>
</template>

<script>
import ChartWeight from '../components/ChartWeight.vue'
import DayPlan from '../components/DayPlan.vue'
import checkSession from '../JS/checkSession.js'
import axios from 'axios'

export default {
  components:{
    ChartWeight,
    DayPlan
  },
  //ZA USERA!!!
  //napraviti izmenjivu tezinu(jednom u 7 dana minimum!),plan za svaki dan posebno,kartice za dodavanje jela u dan i treninge,proracuni za svaki dan...jela i treninzi su gotovi,samo bira u koji dan ih smesta...to su dva nova prozora koji se otvaraju preko kartica sa strane nan kojima bira jelo/trening i dan//API radi INSERT novog jela/treninga u taj dan za tog korisnika,radi brisanje jela/treninga i radi SELECT za tog korisnika za taj dan!!!
  data:function(){
    return{
      user:{
        name:"",
        birthday:null,
        height:null,
        weight:null,
      },
      weights:[],
      dishs:[]
    }
  },
  methods:{
    async checkUser(){
      let userDetail=await checkSession()
      if(userDetail){
        this.user.name=userDetail.data.res.username
        let userBio= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/user/bio",{
          "usr_id":userDetail.data.res.id
        })
        this.user.birthday=userBio.data.userBio.usr_birthday
        this.user.weight=userBio.data.userBio.usr_current_weight
        this.user.height=userBio.data.userBio.usr_height
        this.weights=JSON.parse(userBio.data.userBio.weight)
        this.dishs=JSON.parse(userBio.data.userBio.dishs)
      }
    }
  },
  mounted(){
    this.checkUser()
  }
}
</script>

<style>
.user-bio-wrapper{
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding: 20px 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  border-radius: 0 0 10px 10px;
}
.bio-wrapper p{
  font-size: 1.3rem;
  margin: 0;
  padding: 10px;
}
.bio-wrapper p:hover{
  background-color: #eee;
}
@media screen and (min-width: 768px) {
  .user-bio-wrapper{
    flex-direction: row;
    justify-content: space-around;
  }
  .bio-wrapper{
    flex-basis: 30%;
  }
}
</style>