<template>
  <div class="wrapper">
    <div class="hero-wrapper">
      <div class="hero-1">
        <div class="img-wrapper">
          <img src="../assets/hero-home2.jpg" alt="voce">
          <p class="img-text">ISHRANA</p>
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
          <p class="img-text">TRENING</p>
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
        <h2>Sta nudimo?</h2>
        <p>Za pocetak se upoznajte sa pojmovima poput BMR-a i TDEE-a, saznajte nesto vise o nacinu funkcionisanja ljudskog organizma, odakle dolaze kalorije koje su izvor energije koja pokrece ceo organizam i sve njegove funkcije.</p>
        <p>BMR (Basal metabolic rate)  je minimalna dnevna količina energije koja je potrebna za obavljanje vitalnih funkcija organizma u stanju mirovanja.</p>
        <p>TDEE (Total daily energy expenditure) je količina kalorija koja je potrebna za obavljanje svakodnevnih aktivnosti.</p>
        <p>Kalorije, koje nose energiju neophodnu za odrzanje i normalno funkcionisanje organizma, </p>
      </article>  
    </main>
  </div>
</template>

<script>
export default {
  //ZA GOSTA I ZA USERA
  //objasnjenje o potrosnji kalorija, objasnjenje o radu sajta i njegovim mogucnostima
}
</script>

<style>
.hero-1{
  background-color: lightsteelblue;
}
.hero-2{
  background-color: #ddd;
}
.hero-1,.hero-2{
  position: relative;
  z-index: 0;
}
.hero-wrapper img{
  display: block;
  width: 100%;
}
.hero-1 .img-text{
  position: absolute;
  top: 0%;
  left: 50%;
  font-size: 2.5rem;
  font-weight: 600;
  z-index: 0;
}
.hero-2 .img-text{
  position: absolute;
  top: 55%;
  left: 10%;
  font-size: 2.5rem;
  font-weight: 600;
  z-index: 0;
}
.hero-text{
  margin: 0;
  padding: 10px 0;
  font-size: 1.4rem;
  font-weight: 600;
}
.hero-bottom-text{
  padding: 10px;
  text-align: left;
  font-size: 1.3rem;
  font-weight: 600;
}
.key-words{
  font-size: 1.5rem;
  color: #5B5BE4;
}
@media screen and (min-width:992px){
  .wrapper{
    width: 90vw;
    margin: 0 auto;
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
    left: 40%;
  }
  .hero-2 .img-text{
    left: 35%;
  }
  .hero-text{
    display: none;
  }
  .hero-bottom-text{
    background-color: rgb(245,245,245,0.8);
  }
}
</style>