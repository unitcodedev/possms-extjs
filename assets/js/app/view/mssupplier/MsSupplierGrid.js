/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.mastersuplier.MasterSuplierGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mastersuplier.mastersupliergrid',
    itemId: 'mastersupliergrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'mastersuplier.MasterSuplierStore',
    columnLines: true,
//    forceFit: true,
    renderTo: document.body,
    border: true,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                emptyText: 'Data Kosong',
                deferEmptyText: false,
                enableTextSelection: true,
                stripeRows: false,
                getRowClass: function (record, index) {
//                    return 'css-penjualan';
                },
            },
            tbar: [
                {
                    xtype: 'combobox',
                    displayField: 'type',
                    valueField: 'typeCode',
                    queryMode: 'local',
                    itemId: 'FilterMasterSuplier',
                    allowBlank: true,
                    margin: '0 0 2 10',
                    editable: false,
                    value: 'ms_nama',
                    fieldLabel: '<b>Filter </b>',
                    labelWidth: 50,
                    width: 195,
                    store: new Ext.data.SimpleStore({
                        id: 0,
                        fields: [
                            'typeCode', //numeric value is the key
                            'type' //the text value is the value
                        ],
                        data: [
                            ['ms_nama', 'Nama Suplier'],
                            ['kode_suplier', 'Kode Suplier'],
                            ['ms_alamat', 'Alamat'],
                            ['ms_kota', 'Kota'],
                            ['ms_provinsi', 'Provinsi'],
                            ['ms_nama_person', 'Cp. Nama'],
                            ['ms_nohp_person', 'Cp. NoHp'],
                        ]
                    })
                },
                {
                    xtype: 'textfield',
                    width: 200,
                    margin: '0 0 2 10',
                    itemId: 'MasterSuplierCariNama',
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    margin: '0 0 2 10',
                    text: '  Cari Data  ',
                    width: 120,
                    iconCls: 'icon-btn-search',
                    handler: function () {
                        var grid = me,
                                store = grid.getStore(),
                                filterCollection = [];
                        var statusFilter = new Ext.util.Filter({
                            property: 'filter_barang',
                            value: grid.down('#FilterMasterSuplier').getValue() + '#-#' + grid.down('#MasterSuplierCariNama').getValue()
                        });
                        filterCollection.push(statusFilter);
                        store.clearFilter(true);
                        store.filter(filterCollection);
                    }
                },
                {
                    xtype: 'button',
                    ui: 'blue-button',
                    align: 'center',
                    width: 120,
                    margin: '0 0 2 10',
                    text: '  Tambah Baru   ',
                    iconCls: 'icon-btn-add',
                    handler: function () {
                        var win = Ext.widget('mastersuplier.mastersuplieraddwin');
                    }
                },
            ],
            bbar: [
            ],
            columns: [
                Ext.create('Ext.grid.RowNumberer', {resizable: true, align: 'center'}),
                {
                    xtype: 'checkcolumn',
                    header: 'Aktif',
                    dataIndex: 'ms_aktif',
                    width: 55,
                    listeners: {
                        checkchange: function (cc, ix, isChecked) {
                            var view = me.getView();
                            var record = view.getRecord(view.getNode(ix));
                            Ext.Ajax.request({
                                url: BASE_PATH + 'master_suplier/update_aktif',
                                method: 'POST',
                                params: {
                                    id: record.get('id'),
                                    aktif: isChecked,
                                },
                                scope: this,
                                callback: function (options, success, response) {
                                    var resp = Ext.decode(response.responseText);
                                    if (resp.success === 'true') {
                                    } else {
                                    }
                                }
                            });

                        }
                    }
                },
                {
                    xtype: 'actioncolumn',
                    width: 55,
                    align: 'center',
                    text: 'Edit',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                            iconCls: 'icon-btn-update',
                            tooltip: 'Edit Data',
                            handler: function (grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                var win = Ext.widget('mastersuplier.mastersuplieraddwin');
                                var form = win.down('#FormMasterSuplierAddWin').getForm();
                                form.findField('id').setValue(rec.get('id'));
                                form.findField('kode_suplier').setValue(rec.get('kode_suplier'));
//                                form.findField('kode_barang').setValue(rec.get('kode_barang'));
                                form.findField('ms_nama').setValue(rec.get('ms_nama'));
                                form.findField('ms_alamat').setValue(rec.get('ms_alamat'));
                                form.findField('ms_kota').setValue(rec.get('ms_kota'));
                                form.findField('ms_provinsi').setValue(rec.get('ms_provinsi'));
                                form.findField('ms_telp').setValue(rec.get('ms_telp'));
                                form.findField('ms_nama_person').setValue(rec.get('ms_nama_person'));
                                form.findField('ms_nohp_person').setValue(rec.get('ms_nohp_person'));
                                form.findField('ms_jatuh_tempo').setValue(rec.get('ms_jatuh_tempo'));
                                form.findField('ms_aktif').setValue(rec.get('ms_aktif'));
                            }
                            //                    }
                        }]
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Kode Suplier',
                    align: 'left',
                    dataIndex: 'kode_suplier',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Nama Suplier',
                    dataIndex: 'ms_nama',
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    text: 'Alamat',
                    dataIndex: 'ms_alamat',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kota',
                    dataIndex: 'ms_kota',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Provinsi',
                    dataIndex: 'ms_provinsi',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'No. Telp',
                    dataIndex: 'ms_telp',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'No. Telp',
                    dataIndex: 'mc_telp',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Cp Nama',
                    dataIndex: 'ms_nama_person',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Cp No. Hp',
                    dataIndex: 'ms_nohp_person',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Jatuh Tempo <br> Hari',
                    align: 'center',
                    dataIndex: 'ms_jatuh_tempo',
                },
            ],
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    listeners: {
                        beforeedit: function (editor, e, eOpts) {
                            var form = Ext.getCmp('mastersuplierform').getForm();
                            var jenis_discount = form.findField('jenis_discount').getValue();
                            var persetujuan = form.findField('idpersetujuandisc').getValue();
                            var record = e.record;
                            if (record.get('id_type') === 6) {
                                return false;
                            }
                            if (jenis_discount === 'hut' || jenis_discount === 'hkn') {
                                return true;
                            } else {
                                if (persetujuan > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        },
                        'edit': function (editor, e, opt) {
                            if (e.record.dirty) {

                                e.record.commit();

                            }
                        }
                    }
                }
            ],
        });

        me.callParent(arguments);
    }
});
/* End of file reservasiGrid.js */
/* Location: ./assets/js/app/view/reservasi/reservasiGrid.js */
