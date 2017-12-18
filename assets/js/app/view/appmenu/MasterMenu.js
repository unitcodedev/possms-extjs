/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.MasterMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.mastermenu',
//    ui: 'blue-panel',
    itemId: 'mastermenu',
    title: '<b>Master</b>',
    iconCls: 'icon-btn-master',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.MasterMenuStore',
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