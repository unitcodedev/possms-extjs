/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.AbsenMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.absenmenu',
    ui: 'blue-panel',
    itemId: 'absenmenu',
    title: '<strong>ABSENSI</strong>',
    iconCls: 'icon-btn-absen',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.AbsenMenuStore',
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