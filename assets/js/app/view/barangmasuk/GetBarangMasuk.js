/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.barangmasuk.GetBarangMasuk', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.barangmasuk.getbarangmasuk',
    itemId: 'getbarangmasuk',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Input Barang Masuk',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Barang Masuk');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'barangmasuk.barangmasukgrid',
                    layout: 'fit',
                    title: 'Input Barang Masuk',
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