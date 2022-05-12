/**
 * Renvoies les type de role disponible dans l'application
 */
const userRole = {
    user: { roleId: 1, name: 'utilisateur'},
    editor: { roleId: 2, name: 'éditeur' },
    super_editor: { roleId: 3, name: 'supeur-éditeur'},
    admin: { roleId: 3, name: 'administrateur' },
    super_admin: { roleId: 4, name: 'super-administrateur'}
};
export default userRole;