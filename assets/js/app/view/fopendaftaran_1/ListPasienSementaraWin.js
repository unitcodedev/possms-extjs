/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListPasienSementaraWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.listpasiensementarawin',
    itemId: 'listpasiensementarawin',
    id: 'listpasiensementarawin',
    ui: 'blue-window',
    title: 'PENCARIAN DATA PASIEN SEMENTARA',
    width: 800,
    height: 400,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'formList',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 300,
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'fopendaftaran.listdatapasiensementaragrid',
                            width: 770,
                            height: 320,
                        },
                    ]
                }

            ],
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */