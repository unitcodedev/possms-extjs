/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.PenilaianMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.penilaianmenu',
    ui: 'blue-panel',
    itemId: 'penilaianmenu',
    title: '<b>PENILAIAN</b>',
    iconCls: 'icon-btn-nilai',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.PenilaianMenuStore',
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