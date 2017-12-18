/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListPasienWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.fopendaftaran.listpasienwin',
    itemId: 'listpasienwin',
    id: 'listpasienwin',
    ui: 'blue-window',
    title: 'FORM PENCARIAN PASIEN',
    width: 800,
    height: 400,
    modal: true,
    resizable: false,
    border: false,
    autoScroll: true,
    layout: 'fit',
    autoShow: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            {
                xtype: 'form',
                itemId:'formActionDokter',
                id:'formActionDokter',
                bodyPadding: 10,
                fieldDefaults: {
                    width: 300,
                    labelAlign: 'right',
                    labelWidth: 110,
                    msgTarget: 'side'
                },
                items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nama ',
                    name: 'nama_cari',
                    hidden: true
                },
                {
                    xtype: 'fopendaftaran.listpasiengrid',
                    width: 770,
                    height: 325,
                },
                ]
            }
                
            ],
            buttons: [
        //            {
        //                text: 'Simpan',
        //                scope: this,
        //                iconCls: 'icon-btn-save',
        //                itemId: 'listpasienwin_simpan'
        //            }
        ]
        });
        me.callParent(arguments);
    }
});
/* End of file memberWindow.js */
/* Location: ./assets/js/app/view/group/memberWindow.js */