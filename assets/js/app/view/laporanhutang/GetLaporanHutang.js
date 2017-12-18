/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.laporanhutang.GetLaporanHutang', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.laporanhutang.getlaporanhutang',
    itemId: 'getlaporanhutang',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Laporan Penjualan',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Laporan Hutang');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'laporanhutang.laporanhutanggrid',
                    layout: 'fit',
                    title: 'Laporan Hutang',
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