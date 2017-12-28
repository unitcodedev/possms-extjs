/**
 * Marz@2017
 **/

Ext.define('SIForLaP.view.trxpembelian.GetTrxPembelian', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.trxpembelian.gettrxpembelian',
    itemId: 'gettrxpembelian',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Input Pembelian',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Pembelian');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'trxpembelian.trxpembeliangrid',
                    layout: 'fit',
                    title: 'Input Pembelian',
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