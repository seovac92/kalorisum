<template>
  <div class="wrapper">
    <main>
      <article class="introduction-wrapper first">
        <h2 class="title-h2">Namirnice</h2>
        <p>Namirnice su, kao sto znamo, izvor zivota jer sadrze neophodne elemente koji ucestvuju u izgradnji i odrzanju naseg organizma. Kako bismo odrzali balans tih elemenata, a samim tim i zdravlje, veoma je bitno da <span class="key-words">biramo namirnice</span> koje ce nam podrzavati taj balans. Sto znaci da namirnice treba koristiti iz sto veceg spektra vrsta kojima pripadaju, jer cemo na taj nacin znatno podici nivo naseh imunoloskog sistema i obezbediti kvalitetan zivot.</p>
        <p>Pred vama se nalazi baza sa mnogobrojnim <span class="key-words">namirnicama</span> od kojih mozete napraviti obroke, koje cete koristiti u <span class="key-words">svom dnevnom planu</span> zajedno sa aktivnostima, a na osnovu toga cete dobijati dnevni bilans kalorija.</p>
      </article>
      <TableNutritious @pickANutrition="handleANutrition"></TableNutritious>
      <transition name="form">
      <QuantityForm :nutrition="nutrition" :msg="msg" @closeTheWindow="handleCloseTheWindow" @sendToBasket="handleSendToBasket" v-if="nutrition"><template #nutrition><p class="title-h2">{{nutrition.name}} {{nutrition.kcal}}Kcal</p></template></QuantityForm>
      </transition>
      <div class="meal-opener-wrapper" @click="openMealForm()">
        <font-awesome-icon class="icon" icon="fa-solid fa-bowl-food" />
        <div class="number-wrapper">
          <p class="number-nutrition">{{nutritions.length}}</p>
        </div>  
      </div>
      <transition name="form">
      <BasketForm :nutritions="nutritions" :msg="msg" @closeBasketForm="handleCloseBasketForm" @removeNutrition="handleRemoveNutrition" @makeUserItem="handleMakeUserItem" v-if="mealFormStatus"></BasketForm>
      </transition>
      <transition name="success">
        <SuccessWindow v-if="successStatus"></SuccessWindow>
      </transition>
    </main>
    <aside>
      <article class="food-hero-wrapper">
        <p class="special-msg">Zdrava ishrana je stvar odluke!</p>
      </article>  
    </aside>  
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import TableNutritious from '../components/TableNutritious.vue'
import SuccessWindow from '../components/SuccessWindow.vue'
import QuantityForm from '../components/QuantityForm.vue'
import BasketForm from '../components/BasketForm.vue'
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
    if(array[i].id===obj.id){
      return true
    }
  }
  return false
}

export default {
  components:{
    TableNutritious,
    SuccessWindow,
    QuantityForm,
    BasketForm
  },
  data:function(){
    return{
      nutrition:null,
      nutritions:[],
      mealFormStatus:false,
      msg:"",
      successStatus:false
    }
  },
  methods:{
    ...mapActions(["setUserStatus"]),
    handleANutrition(one){
      if(this.successStatus){
        this.successStatus=false
      }
      this.nutrition=one
      this.mealFormStatus=false
    },
    handleCloseTheWindow(){
      this.quantity=null
      this.nutrition=null
      this.msg=""
    },
    handleSendToBasket(quantity){
      this.msg=""
      if(quantity<5 || quantity>1000){
        return
      }
      let newNutrition=new Nutrition(this.nutrition.id,this.nutrition.name,this.nutrition.kcal,this.nutrition.ntt_name,quantity)
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
        this.handleCloseTheWindow()
        this.showSuccessWindow()
        return
      }
      for(let i=0;i<this.nutritions.length;i++){
        if(this.nutritions[i].id===newNutrition.id){
          this.nutritions[i].quantity+=newNutrition.quantity
          this.nutritions[i].kcalSum=Math.round(this.nutritions[i].kcal/100*this.nutritions[i].quantity)
          this.quantity=null
          this.handleCloseTheWindow()
          this.showSuccessWindow()
          return
        }
      }
      this.nutritions.push(newNutrition)
      this.quantity=null
      this.handleCloseTheWindow()
      this.setStoredNutritions()
      this.showSuccessWindow()
    },
    openMealForm(){
      this.mealFormStatus=!this.mealFormStatus
      this.nutrition=null
    },
    handleCloseBasketForm(){
      this.mealName=""
      this.mealFormStatus=false
    },
    handleRemoveNutrition(nutritionIndex){
      this.nutritions.splice(nutritionIndex,1)
      this.setStoredNutritions()
    },
    async handleMakeUserItem(mealName,mealSum){
      let user=await checkSession()
      if(!user){
        this.setUserStatus(false)
      }
      this.msg=""
      if(!this.userStatus){
        this.$emit("openLoginForm")
        return
      }
      if(!mealName || mealName.length>15){
        return
      }
      if(this.nutritions.length===0){
        this.msg="Morate dodati barem jednu namirnicu."
        return
      }
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/dish/newDish",{
          "user_id":user.data.res.id,
          "meal_name":mealName,
          "meal_sum":mealSum,
          "ingredients":this.nutritions
        })
        this.handleCloseBasketForm()
        this.nutritions=[]
        this.clearStoredNutritions()
        this.showSuccessWindow()
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
    },
    showSuccessWindow(){
      this.successStatus=true
      setTimeout(()=>{
        this.successStatus=false
      },1300)
    },
    goToTop(){
        window.scroll({
          top: 0
        })
      }
  },
  computed:{
    ...mapState(["userStatus"])
  },
  mounted(){
    this.getStoredNutritions()
    this.goToTop()
  },
  watch:{
    userStatus(newStatus){
      if(!newStatus){
        this.nutritions=[]
      }
    }
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
  padding: 10px 0;
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
  margin: 10px auto 0;
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
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  cursor: pointer;
  z-index: 1;
  opacity: 0.8;
  transition: 0.3s all ease;
}
.meal-opener-wrapper:hover{
  opacity: 1;
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
  top: 2vh;
  left: 10vw;
  background-color: #eee;
  text-align: left;
  border-radius: 20px;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  z-index: 1;
}
/*form window transition */
.form-enter-from{
  opacity: 0;
}
.form-enter-to{
  opacity: 1;
}
.form-enter-active{
  transition: all 0.3s ease;
}
.form-leave-from{
  opacity: 1;
}
.form-leave-to{
  opacity: 0;
}
.form-leave-active{
  transition: all 0.3s ease;
}
/*form window transition */
/*success window transition */
.success-enter-from{
  opacity: 0;
}
.success-enter-to{
  opacity: 1;
}
.success-enter-active{
  transition: all 1s ease;
}
.success-leave-from{
  opacity: 1;
}
.success-leave-to{
  opacity: 0;
}
.success-leave-active{
  transition: all 1s ease;
}
/*success window transition */
.meal-form{
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 400px;
  overflow-y: scroll;
}
.meal-form::-webkit-scrollbar{
    width: 7px;
}
.meal-form::-webkit-scrollbar-track{
    background-color: rgb(0, 0, 0);
    border-radius: 5px;
}
.meal-form::-webkit-scrollbar-thumb{
    background: linear-gradient(transparent, lightsteelblue);
    border-radius: 5px;
}
.meal-form::-webkit-scrollbar-thumb:hover{
    background: linear-gradient(transparent, #5B5BE4);
}
.meal-info{
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
.msg-instruction{
  padding-left: 10px;
}
.food-hero-wrapper{
  background: url("../assets/food2.jpg");
  background-size: cover;
  width: 100%;
  height: 814px;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  z-index: 0;
  border-top: 3px solid #ccc;
  margin-top: 20px;
}
.food-hero-wrapper .special-msg{
  position: absolute;
  font-size: 3rem;
  opacity: 0.3;
  font-style: italic;
  font-weight: 600;
  transition: 1s all ease;
}
.food-hero-wrapper:hover .special-msg{
  opacity: 0.8;
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
    top: 7vh;
    left: 15vw;
  }
  .meal-name .input{
    width: 40%;
  }
  .img-article{
    width: 60%;
  }
  .food-hero-wrapper .special-msg{
    top: 10%;
    left: 10%;
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
  .food-hero-wrapper .special-msg{
    left: 15%;
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