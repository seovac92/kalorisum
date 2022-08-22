<template>
  <div class="wrapper">
    <main>
      <article class="introduction-wrapper first">
        <h2 class="title-h2">Namirnice</h2>
        <p>Namirnice su, kao sto znamo, izvor zivota jer sadrze neophodne elemente koji ucestvuju u izgradnji i odrzanju naseg organizma. Kako bismo odrzali balans tih elemenata, a samim tim i zdravlje, veoma je bitno da <span class="key-words">biramo namirnice</span> koje ce nam podrzavati taj balans. Sto znaci da namirnice treba koristiti iz sto veceg spektra vrsta kojima pripadaju, jer cemo na taj nacin znatno podici nivo naseh imunoloskog sistema i obezbediti kvalitetan zivot.</p>
        <p>Pred vama se nalazi baza sa mnogobrojnim <span class="key-words">namirnicama</span> od kojih mozete napraviti obroke, koje cete koristiti u <span class="key-words">svom dnevnom planu</span> zajedno sa aktivnostima, a na osnovu toga cete dobijati dnevni bilans kalorija.</p>
      </article>
      <TableNutritious @pickANutrition="handleANutrition"></TableNutritious>
      <div class="nutrition-quantity-wrapper" v-if="nutrition">
        <div class="btn-exit-wrapper">
            <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeTheWindow()"/>
        </div>
        <p class="nutrition-title">{{nutrition.ntr_name}} {{nutrition.ntr_kcal}}Kcal</p>
        <div class="input-wrapper">
          <label for="quantity" class="msg-instruction" v-show="quantity<100 || quantity>1000">Unesite vrednost izmedju 100 i 1000.</label>
          <input id="quantity" class="calculator-input" type="number" v-model="quantity" placeholder="Kolicina u g/ml" @keydown.enter="pushIntoPot()">
          <label for="quantity" class="msg-instruction">{{msg}}</label>
        </div>
        <div class="btn-wrapper">
          <button class="btn-registration confirm" @click="pushIntoPot()">Potvrdi</button>
        </div>  
      </div>
      <div class="meal-opener-wrapper" @click="openMealForm()">
        <font-awesome-icon class="icon" icon="fa-solid fa-bowl-food" />
        <div class="number-wrapper">
          <p class="number-nutrition">{{nutritions.length}}</p>
        </div>  
      </div>
      <div class="meal-form-wrapper" v-if="mealFormStatus">
        <div class="btn-exit-wrapper">
            <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeMealForm()"/>
        </div>
        <ul class="meal-form">
          <li class="msg-instruction nutrition" v-if="nutritions.length===0"><p>Broj dozvoljenih namirnica je 10.</p></li>
          <li class="nutrition" v-for="(nutrition,index) in nutritions" :key="nutrition.id">
            <p>{{nutrition.name}} | {{nutrition.quantity}}g(ml) | {{nutrition.kcalSum}}Kcal</p><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="removeNutrition(index)"/>
          </li>
          <li class="msg-instruction" v-if="nutritions.length>0"><p>Broj dozvoljenih namirnica {{10-nutritions.length}}</p></li>
          <li class="total"><p>{{mealSum}}Kcal</p></li>
          <li class="meal-name">
            <label for="name" class="msg-instruction" v-show="mealName.length<1 || mealName.length>15">Naziv mora imati izmedju 1 i 15 karaktera.</label>
            <input id="name" class="input" type="text" placeholder="Naziv obroka" v-model="mealName" >
            <label for="name" class="msg-instruction">{{msg}}</label>
          </li>
          <li>
            <div class="btn-wrapper">
              <button class="btn-registration confirm" @click="makeAMeal()">Potvrdi</button>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <aside>
      <article class="food-wrapper">
        <img class="img-article" src="../assets/food.jpg" alt="food">
        <p class="special-msg">Zdrava ishrana je stvar odluke!</p>
      </article>  
    </aside>  
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TableNutritious from '../components/TableNutritious.vue'
import axios from 'axios'
import checkSession from '../JS/checkSession.js'

class Nutrition{
  constructor(id,name,kcal,type,quantity){
    this.id=id
    this.name=name
    this.kcal=kcal
    this.type=type
    this.quantity=quantity
    this.kcalSum=Math.round(this.kcal/100*this.quantity)
  }
}
function checkId(obj,array){
  for(let i=0;i<array.length;i++){
    if(array[i].id===obj.ntr_id){
      return true
    }
  }
  return false
}

export default {
  //sve moze i gost...samo ne moze da konacno napravi jelo...dovrsiti pravljenje jela,napraviti api 
  //koji ce za tog korisnika da ubaci jelo u tabelu
  //eventualno dovrsiti stranu sa stilizacijom!!!
  components:{
    TableNutritious
  },
  data:function(){
    return{
      nutrition:null,
      quantity:null,
      nutritions:[],
      mealFormStatus:false,
      mealName:"",
      msg:""
    }
  },
  methods:{
    handleANutrition(one){
      this.nutrition=one
      this.mealFormStatus=false
    },
    closeTheWindow(){
      this.quantity=null
      this.nutrition=null
      this.msg=""
    },
    pushIntoPot(){
      this.msg=""
      if(this.quantity<100 || this.quantity>1000){
        return
      }
      let newNutrition=new Nutrition(this.nutrition.ntr_id,this.nutrition.ntr_name,this.nutrition.ntr_kcal,this.nutrition.ntt_name,this.quantity)
      if(this.nutritions.length===10){
        let result=checkId(this.nutrition,this.nutritions)
        if(!result){
          this.msg="Maksimalan broj namirnica u jelu je 10."
          return
        }
      }
      if(!this.nutritions){
        this.nutritions.push(newNutrition)
        this.quantity=null
        this.closeTheWindow()
        return
      }
      for(let i=0;i<this.nutritions.length;i++){
        if(this.nutritions[i].id===newNutrition.id){
          this.nutritions[i].quantity+=newNutrition.quantity
          this.nutritions[i].kcalSum=Math.round(this.nutritions[i].kcal/100*this.nutritions[i].quantity)
          this.quantity=null
          this.closeTheWindow()
          return
        }
      }
      this.nutritions.push(newNutrition)
      this.quantity=null
      this.closeTheWindow()
      this.setStoredNutritions()
    },
    openMealForm(){
      this.mealFormStatus=!this.mealFormStatus
      this.nutrition=null
    },
    closeMealForm(){
      this.mealName=""
      this.mealFormStatus=false
    },
    removeNutrition(nutritionIndex){
      this.nutritions.splice(nutritionIndex,1)
      this.setStoredNutritions()
    },
    async makeAMeal(){
      this.msg=""
      if(!this.userStatus){
        this.$emit("openLoginForm")
        return
      }
      if(!this.mealName || this.mealName.length>15){
        return
      }
      if(this.nutritions.length===0){
        this.msg="Morate dodati barem jednu namirnicu."
        return
      }
      let user=await checkSession()
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/meal/newMeal",{
          "user_id":user.data.res.id,
          "meal_name":this.mealName,
          "ingredients":this.nutritions
        })
        this.closeMealForm()
        this.nutritions=[]
        this.clearStoredNutritions()
      } catch (error) {
        this.msg=error.response.data.message
      }
    },
    getStoredNutritions(){
      let storedNutritions=sessionStorage.getItem("nutritions")
      if(storedNutritions){
        this.nutritions=JSON.parse(storedNutritions)
      }
    },
    setStoredNutritions(){
      let storedNutritions=sessionStorage.getItem("nutritions")
      if(!storedNutritions){
        sessionStorage.setItem("nutritions",JSON.stringify(this.nutritions))
        return
      }
      sessionStorage.removeItem("nutritions")
      sessionStorage.setItem("nutritions",JSON.stringify(this.nutritions))
    },
    clearStoredNutritions(){
      sessionStorage.removeItem("nutritions")
    }
  },
  computed:{
    ...mapState(["userStatus"]),
    mealSum(){
      let mealKcal=0
      if(this.nutritions){
        for(let i=0;i<this.nutritions.length;i++){
          mealKcal+=this.nutritions[i].kcalSum
        }
      }
      return mealKcal
    }
  },
  mounted(){
    this.getStoredNutritions()
  }
}
</script>

<style>
.introduction-wrapper{
  margin-bottom: 50px;
}
.nutrition-quantity-wrapper{
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
.nutrition-title{
  font-size: 2rem;
  font-weight: 600;
}
.input-wrapper{
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
}
.confirm{
  margin: 10px 0;
}
.meal-opener-wrapper{
  width: fit-content;
  position: fixed;
  top: 40vh;
  right: 0;
  padding: 10px;
  background-color: #212529;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  z-index: 0;
}
.number-wrapper{
  position: absolute;
  top: 50%;
  left: 0%;
  text-align: center;
  width: 100%;
}
.number-nutrition{
  margin: 0;
  font-weight: 700;
}
.meal-opener-wrapper:hover .icon{
  color: #c50000;
}
.icon{
  font-size: 45px;
  color: whitesmoke;
}
.meal-form-wrapper{
  width: 80vw;
  position: fixed;
  top: 10vh;
  left: 8vw;
  background-color: #eee;
  text-align: left;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  z-index: 1;
}
.meal-form{
  margin: 0;
  padding: 0;
  list-style: none;
}
.nutrition{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 10px;
}
.nutrition p{
  margin: 0;
}
.nutrition:hover{
  background-color: #ddd;
}
.nutrition:hover .remove-icon{
  color: #c50000;
}
.remove-icon{
  cursor: pointer;
}
.total{
  text-align: center;
  font-size: 1.5rem;
}
.total p{
  background-color: #212529;
  color: whitesmoke;
  margin: 0;
  padding: 10px;
}
.btn-wrapper{
  text-align: center;
}
.meal-name{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
}
.meal-name .input{
  width: 50%;
}
.meal-name .msg-instruction{
  margin-top: 15px;
}
.img-article{
  width: 90%;
}
@media screen and (min-width: 768px){
  .nutrition-quantity-wrapper{
    width: 50vw;
    left: 25vw;
  }
  .input-wrapper{
    width: 70%;
  }
  .meal-form-wrapper{
    width: 70vw;
    left: 15vw;
  }
  .meal-name .input{
    width: 40%;
  }
  .img-article{
    width: 60%;
  }
}
@media screen and (min-width: 992px){
  .nutrition-quantity-wrapper{
    width: 40vw;
    left: 30vw;
  }
  .input-wrapper{
    width: 60%;
  }
  .meal-form-wrapper{
    width: 60vw;
    left: 20vw;
  }
  .img-article{
    width: 45%;
  }
}
@media screen and (min-width: 1200px){
  .nutrition-quantity-wrapper{
    width: 30vw;
    left: 35vw;
  }
  .input-wrapper{
    width: 50%;
  }
  .meal-form-wrapper{
    width: 40vw;
    left: 30vw;
  }
}
</style>