<template>
    <div class="tag__main-container">
        <div :data-id="tag.id" class="tag__container">
            <span class="tag__name">
                {{ tag.name }}
            </span>            
        </div>
    </div>
</template>

<script>
export default {
    name: 'MarkdownTagSelection',
    props: ['tag'],
    data() {
        return {  
            id: this.tag.id
        };
    },
    methods: {
    }
};
</script>

<style scoped>
 
    .tag__main-container{
        margin: 5px;
        background: rgba(173, 173, 173, 0.1);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        cursor: pointer;
        overflow: hidden;
        padding: 0px 20px;        
    }

    .tag__container{
        padding: 2px;
        display: flex;     
        height: 100%;
        align-items: center;
        justify-content: center;
    }

    .tag__name{      
        display: flex; 
        justify-content: center;
        align-items: center;
        height: 100%;
        color:green; 
        text-transform: uppercase;
        font-size: var(--text_s);
        font-weight: 700;        
    } 
    @media screen and (min-width:325px) {
       
    }

    @media screen and (min-width:768px) {
    }

</style>