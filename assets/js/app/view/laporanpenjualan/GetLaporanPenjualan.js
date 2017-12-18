/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.laporanpenjualan.GetLaporanPenjualan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.laporanpenjualan.getlaporanpenjualan',
    itemId: 'getlaporanpenjualan',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Laporan Penjualan',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Laporan Penjualan');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'laporanpenjualan.laporanpenjualangrid',
                    layout: 'fit',
                    title: 'Laporan Penjualan',
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