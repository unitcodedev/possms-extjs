/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.msgudang.GetMsGudang', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.msgudang.getmsgudang',
    itemId: 'getmsgudang',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Barang',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Gudang');
        Ext.applyIf(me, {
            tbar: [
            ],
            items: [
                {
                    xtype: 'fieldset',
                    region: 'center',
                    width: '100%',
                    border: false,
                    split: true,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    region: 'west',
                                    xtype: 'msgudang.msgudanggrid',
                                    width: 465,
                                    height: 450,
                                    title: 'Master Jenis Usaha',
                                    margin: '1 4 4 4',
                                    ui: 'blue-panel',
                                    split: true,
                                    border: true,
                                },
//                                                       
                            ]
                        }
                    ]
                },
//                {
//                    region: 'center',
//                    xtype: 'msgudang.msgudanggrid',
//                    layout: 'fit',
//                    title: 'Master Customer',
//                    minWidth: 400,
//                    height: 300,
//                    split: true,
//                },
//                {
//                    region: 'east',
////                    xtype: 'msgudang.msgudanggrid',
//                    layout: 'fit',
////                    title: 'Master Customer',
//                    minWidth: 400,
//                    height: 300,
//                    split: true,
//                },
            ]
        });

        me.callParent(arguments);
    }
});
/* End of file getReservasi.js */
/* Location: ./assets/js/app/view/reservasi/getResrevasi.js */