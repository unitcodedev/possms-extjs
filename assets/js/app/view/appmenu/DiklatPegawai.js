/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.DiklatPegawai', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.diklatpegawai',
    ui: 'orange-panel',
    itemId: 'diklatpegawai',
    title: '<b>DIKLAT</b>',
    iconCls: 'icon-btn-permintaan',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.DiklatPegawaiStore',
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