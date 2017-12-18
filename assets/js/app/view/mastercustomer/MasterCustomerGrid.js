/**
 * IT Parahita@2015
 **/

Ext.define('SIForLaP.view.mastercustomer.MasterCustomerGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mastercustomer.mastercustomergrid',
    itemId: 'mastercustomergrid',
    ui: 'blue-panel',
    autoScroll: true,
    cls: 'grid_penjualan',
    store: 'mastercustomer.MasterCustomerStore',
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
                    itemId: 'FilterMasterCustomer',
                    allowBlank: true,
                    margin: '0 0 2 10',
                    editable: false,
                    value: 'mc_nama',
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
                            ['mc_nama', 'Nama Customer'],
                            ['kode_customer', 'Kode Customer'],
                            ['mc_alamat', 'Alamat'],
                            ['mc_kecamatan', 'Kecamatan'],
                            ['mc_kabupaten', 'Kota'],
                            ['mc_provinsi', 'Provinsi'],
                            ['mc_telp', 'No. Telp'],
                            ['mc_nohp', 'No. Hp'],
                        ]
                    })
                },
                {
                    xtype: 'textfield',
                    width: 200,
                    margin: '0 0 2 10',
                    itemId: 'MasterCustomerCariNama',
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
                            value: grid.down('#FilterMasterCustomer').getValue() + '#-#' + grid.down('#MasterCustomerCariNama').getValue()
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
                        var win = Ext.widget('mastercustomer.mastercustomeraddwin');
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
                    dataIndex: 'mc_aktif',
                    width: 55,
                    listeners: {
                        checkchange: function (cc, ix, isChecked) {
                            var view = me.getView();
                            var record = view.getRecord(view.getNode(ix));
                            Ext.Ajax.request({
                                url: BASE_PATH + 'master_customer/update_aktif',
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
                                var win = Ext.widget('mastercustomer.mastercustomeraddwin');
                                var form = win.down('#FormMasterCustomerAddWin').getForm();
                                form.findField('id').setValue(rec.get('id'));
                                form.findField('kode_customer').setValue(rec.get('kode_customer'));
//                                form.findField('kode_barang').setValue(rec.get('kode_barang'));
                                form.findField('mc_alamat').setValue(rec.get('mc_alamat'));
                                form.findField('mc_kecamatan').setValue(rec.get('mc_kecamatan'));
                                form.findField('mc_kabupaten').setValue(rec.get('mc_kabupaten'));
                                form.findField('mc_provinsi').setValue(rec.get('mc_provinsi'));
                                form.findField('mc_nama').setValue(rec.get('mc_nama'));
                                form.findField('mc_telp').setValue(rec.get('mc_telp'));
                                form.findField('mc_nohp').setValue(rec.get('mc_nohp'));
                                form.findField('mc_plafond').setValue(rec.get('mc_plafond'));
                                form.findField('mc_jatuh_tempo').setValue(rec.get('mc_jatuh_tempo'));
                                form.findField('mc_aktif').setValue(rec.get('mc_aktif'));
                            }
                            //                    }
                        }]
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Kode Customer',
                    align: 'left',
                    dataIndex: 'kode_customer',
                },
                {
                    xtype: 'gridcolumn',
                    width: 260,
                    text: 'Nama Customer',
                    dataIndex: 'mc_nama',
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    text: 'Alamat',
                    dataIndex: 'mc_alamat',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Kecamatan',
                    dataIndex: 'mc_kecamatan',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Kota',
                    dataIndex: 'mc_kabupaten',
                },
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    text: 'Provinsi',
                    dataIndex: 'mc_provinsi',
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
                    text: 'No. HP',
                    dataIndex: 'mc_nohp',
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Plafond',
                    dataIndex: 'mc_plafond',
                    renderer: Ext.util.Format.numberRenderer('0,000'),
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    text: 'Jatuh Tempo <br> Hari',
                    align: 'center',
                    dataIndex: 'mc_jatuh_tempo',
                },
            ],
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    listeners: {
                        beforeedit: function (editor, e, eOpts) {
                            var form = Ext.getCmp('mastercustomerform').getForm();
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