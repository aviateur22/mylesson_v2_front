<template>
    <div class="main__container">
        <div class="container">
            <section class="title__section">
                <h3> envie de vous deconnecter? </h3>
            </section>
            <section class="button__container-section">
                <button @click="logoutAction" class="button__logout">se deconnecter</button>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Lougout',
    data(){
        return {
        };
    },
    methods: {
        /*
         * Deconnexion du client
         */
        async logoutAction() {   
            this.$store.dispatch('logoutAction', this.$router);
        },
    }
};
</script>

<style scoped>
    .main__container{
        width:100%
    }

    .container{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .button__container-section{
       width:100%
    }

    .title__section{
        text-transform: uppercase;
        font-size: var(--text_s);
        font-weight: 900;
        padding: 40px 0px 10px 0px;
    }

    .button__logout{
        width: 90%;
        border:.5px solid var(--main_color); 
        text-decoration: none;
        border-radius: 10px;
        color: white;
        text-transform: uppercase;
        background: transparent;        
        padding: 20px 0px;
        margin-bottom: 10px;
        font-weight: 800;
        background: var(--main_color);        
    }

    @media screen and (min-width:768px) {
        
    }
</style>