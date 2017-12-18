/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.pelunasan.GetPelunasan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pelunasan.getpelunasan',
    itemId: 'getpelunasan',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Laporan Penjualan',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Pelunasan');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'pelunasan.pelunasangrid',
                    layout: 'fit',
                    title: 'Pelunasan Piutang / Hutang Dagang',
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