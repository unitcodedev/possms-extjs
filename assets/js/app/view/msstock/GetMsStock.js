Ext.define('SIForLaP.view.msstock.GetMsStock', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.msstock.getmsstock',
    itemId: 'getmsstock',
    bodyPadding: '2 0 0 0',
    border: false,
    layout: 'border',
    title: 'Master Stock',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        this.setTitle('Master Stock');
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
                                    xtype: 'msstock.msstockgrid',
                                    width: 1060,
                                    height: 585,
                                    title: 'Master Stock',
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
