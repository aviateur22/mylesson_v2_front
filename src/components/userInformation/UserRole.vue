<template>
<!-- titre de la partie -->
    <section class="information__title-container">
        <h2 class="information__title">Votre position </h2>
    </section>
    <!-- utilisateur -->
    <section class="role__container">
        <div class="role__text-container">
            <span class="role__text">vous êtes un <strong class="role__text-strong">{{userRole}}</strong></span>
        </div>        
    </section>
</template>

<script>
export default {
    name: 'userRole',
    computed: {
        /** role utilisateur */
        // eslint-disable-next-line vue/return-in-computed-property
        userRole(){
            const roleId = this.$store.getters.getUserIdent.roleId;
            switch (roleId){
            case 1: return 'utilisateur';
            case 2: return 'compositeur';
            case 3: return 'admin';
            case 4: return 'superAdmin';
            default: return 'utilisateur';
            }
        }
    }
};
</script>

<style scoped>
    .information__title-container{  
        padding-top: 20px;      
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .information__title{
        padding: 10px;
        font-size: var(--form_title_size);
        text-transform: uppercase;
    }

    .role__container{      
        display: flex;
        align-items: center;
        justify-content: center; 
        width: 100%; 
        padding: 0px 20px;
        padding-bottom: 40px;
        border-bottom: 0.1px solid gray;
    }

    .role__text-container{
        display: flex;
        align-items: center;
        justify-content: center;       
        border:0.5px solid var(--main_color); 
        border-radius: 10px;
        width: 100%;
        padding: 20px 0px;
    }

    .role__text{
        text-transform: uppercase;
        font-size: var(--text_button_size);
    }

    .role__text-strong{
        font-weight: 700;
    }

</style>