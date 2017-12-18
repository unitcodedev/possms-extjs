var MasterCustomerModel = Ext.define('SIForLaP.model.MasterCustomerModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'kode_customer', type: 'string'},
        {name: 'mc_alamat', type: 'string'},
        {name: 'mc_kecamatan', type: 'string'},
        {name: 'mc_kabupaten', type: 'string'},
        {name: 'mc_provinsi', type: 'string'},
        {name: 'mc_nama', type: 'string'},
        {name: 'mc_telp', type: 'string'},
        {name: 'mc_nohp', type: 'string'},
        {name: 'mc_plafond', type: 'number'},
        {name: 'mc_jatuh_tempo', type: 'number'},
        {name: 'mc_aktif', type: 'bool'},
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.mastercustomer.MasterCustomerStore', {
    extend: 'Ext.data.Store',
    alias: 'store.mastercustomer.mastercustomerStore',
    model: MasterCustomerModel,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'master_customer/list_customer',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});