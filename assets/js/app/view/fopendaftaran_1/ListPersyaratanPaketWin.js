/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListPersyaratanPaketWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.listpersyaratanpaketwin',
    itemId: 'listpersyaratanpaketwin',
    ui: 'blue-window',
    title: 'PERSYARATAN MCU',
    width: 350,
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
                    itemId: 'formListPersyaratanPaket',
                    bodyPadding: 10,
                    fieldDefaults: {
                        width: 300,
                        labelAlign: 'right',
                        labelWidth: 110,
                        msgTarget: 'side'
                    },
                    items: [
                        {
                            xtype: 'fopendaftaran.listpersyaratanpaketgrid',
                            width: 320,
                            height: 320,
                        },
                    ]
                }

            ],
            buttons: [
            ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */