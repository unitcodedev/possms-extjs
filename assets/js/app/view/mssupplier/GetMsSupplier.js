Ext.define('SIForLaP.view.mssupplier.GetMsSupplier', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mssupplier.getmssupplier',
    itemId: 'getmssupplier',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Supplier',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Supplier');
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
                                    xtype: 'mssupplier.mssuppliergrid',
                                    width: 1100,
                                    height: 550,
                                    title: 'Master Supplier',
                                    margin: '1 4 4 4',
                                    ui: 'blue-panel',
                                    split: true,
                                    border: true,
                                },
                                                 
                            ]
                        }
                    ]
                },

            ]
        });

        me.callParent(arguments);
    }
});
