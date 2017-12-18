var MasterSuplierModel = Ext.define('SIForLaP.model.MasterSuplierModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'kode_suplier', type: 'string'},
        {name: 'ms_nama', type: 'string'},
        {name: 'ms_alamat', type: 'string'},
        {name: 'ms_kota', type: 'string'},
        {name: 'ms_provinsi', type: 'string'},
        {name: 'ms_telp', type: 'string'},
        {name: 'ms_nama_person', type: 'string'},
        {name: 'ms_nohp_person', type: 'string'},
        {name: 'ms_jatuh_tempo', type: 'number'},
        {name: 'ms_aktif', type: 'bool'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.mastersuplier.MasterSuplierStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mastersuplier.mastersuplierStore',
    model: MasterSuplierModel,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'master_suplier/list_suplier',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});