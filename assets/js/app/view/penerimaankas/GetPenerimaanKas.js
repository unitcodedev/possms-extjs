/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.penerimaankas.GetPenerimaanKas', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.penerimaankas.getpenerimaankas',
    itemId: 'getpenerimaankas',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Laporan Penerimaan Kas',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Penerimaan Kas');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'penerimaankas.penerimaankasgrid',
                    layout: 'fit',
                    title: 'Data Penerimaan Kas Harian',
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