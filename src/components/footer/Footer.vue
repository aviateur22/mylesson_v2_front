<template>
  <div class="footer__main-container">
      <div class="footer__container">
          <section class="thematic">
              <div class="thematic__container">
                  <div class="thematic__title-container">
                      <h3 class="thematic__title">a propos</h3>
                  </div>
                  <div class="thematic__body">
                      <span class="thematic__item">qui je suis</span>
                      <span class="thematic__item">contenu des leçons</span>
                  </div>
              </div>
          </section>
          <section class="thematic">
              <div class="thematic__container">
                  <div class="thematic__title-container">
                      <h3 class="thematic__title">markdwon</h3>
                  </div>
                  <div class="thematic__body">
                      <span class="thematic__item">qu'est ce que le markdown</span>
                      <span class="thematic__item">liens utiles markdown</span>                      
                  </div>
              </div>
          </section>
           <section class="thematic">
              <div class="thematic__container">
                  <div class="thematic__title-container">
                      <h3 class="thematic__title">informations légales</h3>
                  </div>
                  <div class="thematic__body">
                      <span class="thematic__item">cookie</span>
                      <span class="thematic__item">CGU</span>                      
                  </div>
              </div>
          </section>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer__main-container{
    margin-top: 10px;
    padding: 20px 10px;
    display: flex;
    width: 100%;
    background: rgb(99, 99, 99)
}

.footer__container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items:stretch ;
}

.thematic{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.thematic__title-container{
    display: flex;
    justify-content: flex-start;

}

.thematic__title{
    padding: 10px 0px;
    font-size: var(--text_button_size);
    text-transform: uppercase;
    text-decoration: underline;
    font-weight: 700;
    color: white;
}
.thematic__body{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.thematic__item{
    padding: 5px 0px;
    text-transform: uppercase;
    color: white;
    font-size: var(--text_s);
    font-weight: 700;
    cursor: pointer;
   
}

</style>