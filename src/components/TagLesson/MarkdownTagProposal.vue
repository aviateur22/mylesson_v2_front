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
    name: 'MarkdownTagProposal',
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
        margin: 2px;
        background: rgba(173, 173, 173, 0.1);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        cursor: pointer;   
        width:calc(50% - 10px);     
        height: 40px;     
    }
    
    .tag__container{
        padding: 5px;
        display: flex;        
        align-items: center;
        justify-content: center;
    }

    .tag__name{
        display: flex;
        align-items: center;
        justify-content: center;
        color:red; 
        text-transform: uppercase;
        font-size: var(--text_s);
        font-weight: 700;
        padding: 5px;
    } 

    @media screen and (min-width:325px) {
        .tag__main-container{        
           height: auto;   
        }
    }

    @media screen and (min-width:768px) {
        .tag__main-container{        
           width:auto; 
        }
    }

</style>