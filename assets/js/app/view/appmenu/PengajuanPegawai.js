/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.PengajuanPegawai', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.pengajuanpegawai',
    ui: 'orange-panel',
    itemId: 'pengajuanpegawai',
    title: '<b>PENGAJUAN</b>',
    iconCls: 'icon-btn-permintaan',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.PengajuanPegawaiStore',
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