/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.LaboratMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.laboratmenu',
//    ui: 'blue-panel',
    itemId: 'laboratmenu',
    title: '<b>Laboratorium</b>',
    iconCls: 'icon-btn-laboratorium',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.LaboratMenuStore',
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