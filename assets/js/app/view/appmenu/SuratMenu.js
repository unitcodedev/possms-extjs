/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.SuratMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.suratmenu',
    ui: 'blue-panel',
    itemId: 'suratmenu',
    title: '<b>SURAT</b>',
    iconCls: 'icon-btn-surat',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.SuratMenuStore',
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