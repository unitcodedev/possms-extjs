/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.PelayananMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.pelayananmenu',
//    ui: 'blue-panel',
    itemId: 'pelayananmenu',
    title: '<b>Front Office</b>',
    iconCls: 'icon-btn-frontoffice',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.PelayananMenuStore',
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