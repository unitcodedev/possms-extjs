/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.mastersuplier.GetMasterSuplier', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mastersuplier.getmastersuplier',
    itemId: 'getmastersuplier',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Barang',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Suplier');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    region: 'center',
                    xtype: 'mastersuplier.mastersupliergrid',
                    layout: 'fit',
                    title: 'Master Suplier',
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