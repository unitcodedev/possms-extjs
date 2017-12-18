/**
 * @author Parahita2015
 **/

Ext.define('SIForLaP.store.appmenu.ElektromedisMenuStore', {
    extend: 'Ext.data.TreeStore',
    model: 'SIForLaP.model.appmenu.MenuModel',
    requires: 'SIForLaP.model.appmenu.MenuModel',
    root: {
        text: 'root',
        id: '0',
        expanded: true
    },
    proxy: {
        type: 'ajax',
        url: BASE_PATH + 'apps/app_menu/4',
        actionMethods: 'POST',
        reader: {
            type: 'json'
        }
    }
});
/* End of file TreeMenu.js */
/* Location: ./assets/js/app/store/TreeMenu.js */