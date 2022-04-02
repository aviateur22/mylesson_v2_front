<template>
<!-- image des media avec animation roatation -->
    <div class="image">
        <div class="image__inner">
            <section class="image__front">     
                <div class="image__container">
                    <div v-if="imageMedia" class="media__image-container">             
                        <img :src="imageMedia" class="media__image"/>
                    </div>               
                </div>
            </section>
            <section class="image__back">
                <div class="image__presentation-back">
                   <div v-if="imageMedia" class="media__image-container">             
                        <img :src="imageMedia" class="media__image"/>
                    </div> 
                </div>
            </section>              
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'mediaIcone',
    props: ['imageMedia']
};
</script>

<style scoped>
.image{    
    perspective: 1000px;  
    padding: 10px;
    height: 80px;    
}

.image__inner{
    position: relative;
    cursor: pointer;
    transition: transform 10s;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;    
    animation: rotateIcone 3s infinite linear;
}

.image__front , .image__back {
    position: absolute;
    display: flex;    
    flex-direction: column;
    height: 100%;
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;    
   
}

.image__back{
    transform: rotateY(180deg);    
    overflow: hidden;
}

.image__presentation-back{
    position: relative;
    
}

@keyframes rotateIcone {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(180deg);
  }
}

</style>