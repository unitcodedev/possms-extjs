/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.BackOfficeMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.backofficemenu',
//    ui: 'blue-panel',
    itemId: 'backofficemenu',
    title: '<b>Backoffice</b>',
    iconCls: 'icon-btn-financial',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.BackOfficeMenuStore',
    initComponent: function () {

        this.store = Ext.data.StoreManager.lookup(this.store);
        this.callParent(arguments);
    }
//    plugins: [
//        {ptype: 'dvp_nodedisabled'}
//    ]
});

/* End of file TreeMenu.js */
/* Location: ./assets/js/app/view/ui/TreeMenu.js */