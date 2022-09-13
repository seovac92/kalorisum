<template>
  <div class="wrapper">
    <div class="hero-wrapper">
      <div class="hero-1">
        <div class="img-wrapper">
          <img src="../assets/hero-home1.jpg" alt="voce">
          <p class="img-text"><span class="key-words">ZDRAVA</span><br>ISHRANA</p>
        </div>
        <p class="hero-text">Tablica ishrane ce vam pomoci pri sastavljanju obroka</p>
        <!--prostor za ikonice -->
      </div>
      <div class="hero-bottom-text">
        <p><span class="key-words">Pravilna ishrana</span> je kljuc zdravlja.</p>
        <p>Saznajte koliko kalorija sadrze namirnice.</p>
        <p>Napravite svoja jela.</p>
      </div>
      <div class="hero-2">
        <div class="img-wrapper">
          <img src="../assets/hero-home.jpg" alt="tegovi">
          <p class="img-text"><span class="key-words">REDOVAN</span><br>TRENING</p>
        </div>
          <p class="hero-text">Napravite svoj nedeljni plan aktivnosti</p>
          <!--prostor za ikonice -->  
      </div>
      <div class="hero-bottom-text">
        <p>Svakim <span class="key-words">treningom</span> postajete bolji.</p>
        <p>Svaka aktivnost trazi odredjenu kolicinu energije.</p>
        <p>Dnevni i nedeljni kalorijski bilans</p>
      </div>
    </div>
    <main>
      <article class="first">
        <h2 class="title-h2">Saznajte</h2>
          <p><span class="key-words">BMR (Basal metabolic rate)</span>  je minimalna dnevna količina energije koja je potrebna za obavljanje vitalnih funkcija organizma u stanju mirovanja.</p>
          
        <p><span class="key-words">TDEE (Total daily energy expenditure)</span> je količina kalorija koja je potrebna za obavljanje svakodnevnih aktivnosti.</p>
      </article>  
    </main>
    <aside>
      <article class="bmr-calculator">
        <BMRCalculator></BMRCalculator>
      </article>
      <article class="tdee-calculator">
        <TDEECalculator></TDEECalculator>
      </article>
      <article class="first">
        <h2 class="title-h2">Cilj</h2>
        <p>Na osnovu proracuna kalkulatora ste saznali koliko je vasem organizmu potrebno kalorija kako bi na dnevnom nivou funkcionisao i odrzao istu telesnu masu.</p>
        <p>Ukoliko je vas cilj <span class="key-words">mrsavljenje</span>,najbezbedniji nacin je da smanjite dnevni unos kalorija za 250Kcal i za isto toliko povecate potrosnju kalorija kroz aktivnosti, sto bi vas dovelo do nedeljnog gubitka 0,5kg</p>
        <p>Napravite svoj <span class="key-words interactive-word" @click="openLoginForm()">nalog</span> i pravite sami svoje <span class="key-words">obroke</span> koje cete zajedno sa mnogobrojnim aktivnostima koristiti u vasem <span class="key-words">nedeljnom planu.</span></p>
        <p class="special-msg">Uz dobar plan sve je mnogo lakse!</p>
      </article>
    </aside>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BMRCalculator from '../components/BMRCalculator.vue'
import TDEECalculator from '../components/TDEECalculator.vue'
export default {
  components:{
    BMRCalculator,
    TDEECalculator
  },
  methods:{
    openLoginForm(){
      if(!this.userStatus){
        this.$emit("openLoginForm")
      }  
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
    this.goToTop()
  }
}
</script>

<style>
.hero-1,.hero-2{
  position: relative;
  z-index: 0;
  background-color: #eee;
}
.hero-wrapper img{
  display: block;
  width: 100%;
  max-height: 80vh;
}
.hero-1 .img-text{
  margin: 0;
  position: absolute;
  top: 10%;
  right: 10%;
  font-size: 2rem;
  font-weight: 600;
  z-index: 0;
}
.hero-2 .img-text{
  margin: 0;
  position: absolute;
  top: 10%;
  left: 10%;
  font-size: 2rem;
  font-weight: 600;
  z-index: 0;
}
.hero-text{
  margin: 0;
  padding: 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
}
.hero-bottom-text{
  padding: 10px;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: lightsteelblue;
}
.key-words{
  font-size: 1.3rem;
  color: #5B5BE4;
}
.first{
  font-weight: 600;
  text-align: left;
  font-size: 1.1rem;
}
.title-h2{
  font-size: 1.4rem;
  padding: 10px;
  margin: 0;
  background-color: #212529;
  color: whitesmoke;
}
.first p{
  padding: 0 10px;
}
.special-msg{
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 0;
  font-weight: 600;
}
.interactive-word{
  cursor: pointer;
}
@media screen and (min-width:992px){
  .wrapper{
    width: 90vw;
    margin: 0 auto;
    box-shadow: 0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);
  }
  .hero-1,
  .hero-2{
    display: flex;
    background-color: white;
  }
  .hero-1 .img-wrapper,
  .hero-2 .img-wrapper{
    flex-basis: 70%;
  }
  .hero-2{
    flex-direction: row-reverse;
  }
  .hero-1 .img-text{
    right: 40%;
  }
  .hero-2 .img-text{
    left: 40%;
  }
  .hero-text{
    display: none;
  }
  .hero-bottom-text{
    background-color: lightsteelblue;
  }
}
</style>