/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.fopendaftaran.GetFoPendaftaran', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.fopendaftaran.getfopendaftaran',
    itemId: 'getfopendaftaran',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'PENJUALAN',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Penjualan');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'fopendaftaran.fopendaftarangrid',
                    layout: 'fit',
                    title: 'Penjualan (Kasir)',
                    minWidth: 400,
//                    width: '60%',
                    split: true,
                },
//                {
//                    region: 'center',
//                    xtype: 'fopendaftaran.fopendaftaranform',
//                    split: true,
//                    width: '40%',
//                    ui: 'blue-panel',
//                    title: 'FORM PENDAFTARAN',
//                }
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */