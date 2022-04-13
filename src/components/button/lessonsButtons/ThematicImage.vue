<template>
    <div class="thematic__container">   
        <div class="thematic__image-container">
            <ImageRotateComponent :imageUrl="thematicImageUrl"/>
        </div>                     
    </div>   
</template>

<script>
import utils from '../../../helper/utils';
import ImageRotateComponent from './ImageRotate.vue';
export default {
    name: 'thematicImage',
    components: {
        ImageRotateComponent
    },
    props: ['data'],
    data(){
        return {
            thematicImageUrl: utils.baseUri + this.data.thematicImageUrl
        };
    }

};
</script>

<style scoped>

    .thematic__container{        
        width: 100%;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;

    }

    .thematic__image-container{
        width: 100%;
    }
    
    .thematic__image{
        width: 100%;
        object-fit:fill;
        image-rendering: optimizeQuality;
    }

</style>