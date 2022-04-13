<template>
<!-- image des media avec animation roatation -->
    <div class="image__rotate-container">
        <!-- image de face -->
        <div class="image__inner">
            <section class="image__front">     
                <div class="image__container">
                    <!-- image  -->
                    <div v-if="imageUrl" class="image__front-container">             
                        <img :src="imageUrl" class="image"/>
                    </div>               
                </div>
            </section>
            <!-- imge de derriere -->
            <section class="image__back">
                <div class="image__presentation-back">
                   <div v-if="imageUrl" class="image__back-container">     
                        <!-- image -->
                        <img :src="imageUrl" class="image"/>
                    </div> 
                </div>
            </section>              
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'imageRotate',    
    props: ['imageUrl']
};
</script>

<style scoped>
.image__rotate-container{ 
    perspective: 1000px;  
    height: 150px;    

}

.image__inner{
    position: relative;
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
    justify-content: center;
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

.image{
    width: 120px
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