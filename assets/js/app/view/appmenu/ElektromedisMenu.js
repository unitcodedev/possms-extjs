/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.ElektromedisMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.elektromedismenu',
//    ui: 'orange-panel',
    itemId: 'elektromedismenu',
    title: '<b>Elektromedis</b>',
    iconCls: 'icon-btn-permintaan',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.ElektromedisMenuStore',
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