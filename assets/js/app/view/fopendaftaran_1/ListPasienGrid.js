/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListPasienGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fopendaftaran.listpasiengrid',
    itemId: 'listpasiengrid',
    id: 'listpasiengrid',
    ui: 'black-panel',
    autoScroll: true,
//    title: 'CARI PASIEN',
    forceFit: true,
    store: 'fopendaftaran.MasterPasienStore',
    columnLines: true,
    flex: 1,
    border: true,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data',
                deferEmptyText: false
            },
            tbar: [
                {
                    xtype: 'checkbox',
                    fieldLabel: '<b>Data Pusat</b> ',
                    labelWidth: 70,
                    name: 'pendaftarancari_datapusat',
                    width: 80,
                    inputValue: 1,
                    id: 'pendaftarancari_datapusat',
                },
                {
                    xtype: 'combobox',
                    displayField: 'type',
                    valueField: 'typeCode',
                    fieldLabel: '<b> Cari </b>',
                    queryMode: 'local',
                    margin: '10 5 10 5',
                    labelWidth: 50,
                    itemId: 'typeCariPaseien',
                    id: 'typeCariPasien',
                    name: 'typeCariPasien',
                    allowBlank: true,
                    editable: false,
                    width: 250,
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            ['pas_id', 'Pas ID'],
                            ['pas_nama', 'Nama'],
                            ['pas_hp', 'No Hp'],
                            ['pas_tgllahir', 'Tgl Lahir (Tgl/Bln/Thn)'],
                            ['pas_alamat', 'Alamat'],
//                            ['idrekanan', 'ID Rekanan'],
//                            ['iddokter', 'ID Dokter'],
                        ]
                    })
                },
                {
                    xtype: 'textfield',
                    margin: '10 5 10 5',
                    allowBlank: false,
                    itemId: 'textCariPasien',
                    id: 'textCariPasien',
                    width: 175,
                    //                    readOnly: true
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: '<b>Pasien Indent</b> ',
                    name: 'pendaftarancari_dataindent',
                    labelWidth: 80,
                    hidden : true,
                    width: 110,
                    inputValue: 1,
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Cari',
                    iconCls: 'icon-btn-search',
                    action: 'CariPasien'
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Tambah',
                    iconCls: 'icon-btn-add',
                    action: 'TambahPasien'
                },
//            {
//                xtype: 'button',
//                ui: 'blue-button',
//                text: 'Edit',
//                iconCls: 'icon-btn-update',
//                action: 'EditPasien'
//            },
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    xtype: 'gridcolumn',
                    width: 140,
                    text: 'ID',
                    dataIndex: 'id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kode',
                    dataIndex: 'pas_id',
                    renderer: 'uppercase'
                },
                {
                    xtype: 'gridcolumn',
                    width: 180,
                    text: 'Nama',
                    dataIndex: 'pas_nama',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'NO HP',
                    dataIndex: 'pas_hp',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Tgl Lahir',
                    dataIndex: 'pas_tgllahir',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Alamat',
                    dataIndex: 'pas_alamat',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kota',
                    dataIndex: 'pas_kota',
                    renderer: 'uppercase'
                },
            ],
//            bbar: {
//                xtype: 'pagingtoolbar',
//                store: 'fopendaftaran.MasterPasienStore',
//                displayInfo: true,
//                displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
//                emptyMsg: "No records to display&nbsp;"
//            }
        });

        me.callParent(arguments);
        //        me.loadPage(1);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */