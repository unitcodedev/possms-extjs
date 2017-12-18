/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.appmenu.MarketingMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.appmenu.marketingmenu',
    itemId: 'marketingmenu',
    title: '<b>Kepegawaian</b>',
    iconCls: 'icon-btn-master',
    rootVisible: false,
    useArrows: true,
    border: false,
    bodyPadding: '5 0',
    store: 'appmenu.MarketingMenuStore',
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