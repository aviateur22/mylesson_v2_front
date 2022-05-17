<template>
<!-- contient les module d'administration de la lecon -->
  <div v-if="this.$store.getters.getUserIdent.userAuthenticated && this.$store.getters.getUserIdent.login != this.$store.getters.getLessonEditor.autor" class="admin__main-container"> 
        <div class="admin__container">
            <!--demande l'admin  -->
            <section v-if="this.$store.getters.getUserIdent.roleId >= userLevel" class="admin__section">
                <AdminRequestComponent :token=this.token />
            </section>
            
            <!-- correction de la lecon -->
            <section v-if="this.$store.getters.getUserIdent.roleId >= superEditorLevel" class="admin__section">
                <CorverLessonComponent/>
            </section>

            <!-- suppression de la lecon -->
            <section v-if="this.$store.getters.getUserIdent.roleId >= adminLevel" class="admin__section">
                <DeleteLessonComponent :token=this.token />
            </section>

            <!-- enlever les droit éditeur -->
            <section v-if="this.$store.getters.getUserIdent.roleId >= adminLevel" class="admin__section">
                <RemoveUserPrivilegeComponent :token=this.token />
            </section>

            <!-- supprimer l'utilisateur -->
            <section v-if="this.$store.getters.getUserIdent.roleId >= adminLevel" class="admin__section">
                <DeleteUserComponent :token=this.token />
            </section>
        </div>         
  </div>
</template>

<script>
/**composants du panel  */
import AdminRequestComponent from './RequestAdminCheck.vue';
import CorverLessonComponent from './LessonCorverContent.vue';
import DeleteLessonComponent from './DeleteLesson.vue';
import DeleteUserComponent from './DeleteUser.vue';
import RemoveUserPrivilegeComponent from './RemoveUserPrivilege.vue';
/**récupération des roles utilisateurs */
import userRole from '../../../helper/userRole';

export default {
    name: 'containerPanel', 
    components: {
        AdminRequestComponent,
        CorverLessonComponent,
        DeleteLessonComponent,
        DeleteUserComponent,
        RemoveUserPrivilegeComponent
    },
    data(){
        return {
            adminLevel: userRole.admin.roleId,
            superEditorLevel: userRole.super_editor.roleId,
            userLevel: userRole.user.roleId,
            token: undefined,
        };
    },
    methods: {
        /** recupération d'un token pour la soumission de la demande */
        async getToken(){
            /** genération token si utilisateur authentifié */
            if(this.$store.getters.getUserIdent.userAuthenticated){
                const token = await this.$store.dispatch('actionHandler', {action: 'getTokenForm'});     
                this.token = token.token;                   
            }            
        }
    },
    created(){
        /**récupération token pour soumission requete */
        this.getToken();
    }

};
</script>

<style scoped>
    .admin__main-container{
        background: rgb(243, 243, 243);
        padding: 2em;
    }

    .admin__container{
        width:100%;
        display: flex;        
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .admin__section{
        width: 100%
    }
</style>