/**
 * IT Parahita@2015
 **/
Ext.define('SIForLaP.view.fopendaftaran.ListDataPasienSementaraGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.fopendaftaran.listdatapasiensementaragrid',
    itemId: 'listdatapasiensementaragrid',
    ui: 'black-panel',
    height: 450,
    autoScroll: true,
    layout: 'fit',
    store: 'fopendaftaran.ListDataPasienSementaraStore',
    columnLines: true,
    border: true,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Tidak ada data',
                deferEmptyText: false
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    text: 'Pas ID',
                    dataIndex: 'idtrx_pas',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    text: 'Pas ID',
                    dataIndex: 'pasien_id',
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    text: 'No Lab',
                    dataIndex: 'nolab',
                },
                {
                    xtype: 'gridcolumn',
                    width: 180,
                    text: 'Nama',
                    dataIndex: 'nama_pasien',
                },
                {
                    xtype: 'gridcolumn',
                    width: 60,
                    text: 'Jenis <br> Kelamin',
                    dataIndex: 'jenis_kelamin',
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    text: 'Tgl Lahir',
                    dataIndex: 'tgl_lahir',
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    text: 'Status',
                    dataIndex: 'status',
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    text: 'No HP',
                    dataIndex: 'no_hp',
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    text: 'No Telp',
                    dataIndex: 'no_tlfnrumah',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Alamat',
                    dataIndex: 'alamat',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kota',
                    dataIndex: 'kota',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Rekanan',
                    dataIndex: 'nama_rekanan',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kode Kontrak',
                    dataIndex: 'kode_kontrak',
                },
            ],
            tbar: [
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Cari Data di Pusat ',
                    name: 'pendaftarancari_datapusat',
                    width: 150,
                    inputValue: 1,
                    itemId: 'pendaftarancaripassementara_datapusat',
                },
                {
                    xtype: 'combobox',
                    displayField: 'type',
                    valueField: 'typeCode',
                    fieldLabel: '<b> Cari </b>',
                    queryMode: 'local',
                    margin: '10 5 10 5',
                    labelWidth: 50,
                    itemId: 'ListDataPasienSementara_Jenis',
                    allowBlank: true,
                    value: '3',
                    editable: false,
                    width: 150,
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            ['3', 'MCU'],
                            ['1', 'HS'],
//                            ['2', 'INDENT'],
                        ]
                    })
                },
                {
                    xtype: 'combobox',
                    displayField: 'type',
                    valueField: 'typeCode',
//                    fieldLabel: '<b> Cari </b>',
                    queryMode: 'local',
                    margin: '10 5 10 5',
//                    labelWidth: 50,
                    itemId: 'filterFoCariPasienSementara',
                    allowBlank: true,
                    editable: false,
                    value: 'pas_nama',
                    width: 150,
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
                            ['pas_tgllahir', 'Tgl Lahir'],
                            ['pas_alamat', 'Alamat'],
                            ['kode_pengirim', 'ID Rekanan'],
                        ]
                    })
                },
                {
                    xtype: 'textfield',
                    margin: '10 5 10 5',
                    allowBlank: false,
                    itemId: 'valueFoCariPasienSementara',
                    width: 175,
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    text: 'Cari',
                    margin: '0 0 0 5',
                    iconCls: 'icon-btn-search',
                    action: 'CariDataPasienSementara',
                },
            ],
        });

        me.callParent(arguments);
    }
});