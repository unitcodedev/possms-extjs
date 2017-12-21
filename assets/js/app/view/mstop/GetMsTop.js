/**
 * Marz@2017
 **/

Ext.define('SIForLaP.view.mstop.GetMsTop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mstop.getmstop',
    itemId: 'getmstop',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master T.O.P',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master T.O.P');
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
                                    xtype: 'mstop.mstopgrid',
                                    width: 425,
                                    height: 450,
                                    title: 'Master T.O.P (Term Off Payment)',
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
//                    xtype: 'mstop.mstopgrid',
//                    layout: 'fit',
//                    title: 'Master Customer',
//                    minWidth: 400,
//                    height: 300,
//                    split: true,
//                },
//                {
//                    region: 'east',
////                    xtype: 'mstop.mstopgrid',
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