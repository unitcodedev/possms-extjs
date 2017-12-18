/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.PemeriksaanLainMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.pemeriksaanlainmenu',
//    ui: 'green-panel',
    itemId: 'pemeriksaanlainmenu',
    title: '<b>Pemeriksaan Lain</b>',
    iconCls: 'icon-btn-permintaan',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.PemeriksaanLainMenuStore',
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