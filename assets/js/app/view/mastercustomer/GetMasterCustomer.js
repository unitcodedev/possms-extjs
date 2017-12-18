/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.mastercustomer.GetMasterCustomer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mastercustomer.getmastercustomer',
    itemId: 'getmastercustomer',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Barang',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Customer');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'mastercustomer.mastercustomergrid',
                    layout: 'fit',
                    title: 'Master Customer',
                    minWidth: 400,
                    height: 300,
                    split: true,
                },
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */