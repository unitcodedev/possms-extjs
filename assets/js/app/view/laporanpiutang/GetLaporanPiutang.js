/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.laporanpiutang.GetLaporanPiutang', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.laporanpiutang.getlaporanpiutang',
    itemId: 'getlaporanpiutang',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Laporan Penjualan',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Laporan Piutang');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'laporanpiutang.laporanpiutanggrid',
                    layout: 'fit',
                    title: 'Laporan Piutang',
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