var MasterRekanan = Ext.define('SIForLaP.model.MasterRekananModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'kode_rekanan', type: 'string'},
        {name: 'nama_rekanan', type: 'string'},
        {name: 'alamat_rekanan', type: 'string'},   
        {name: 'kota_rekanan', type: 'string'},   
        {name: 'telf_rekanan', type: 'string'},   
        {name: 'cp_rekanan', type: 'string'},   
        {name: 'cp_telf', type: 'string'},     
    ],
    idProperty: 'id'
});


Ext.define('SIForLaP.store.fopendaftaran.MasterRekananStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.masterrekananstore',
    model: MasterRekanan,
    storeId: 'masterrekananstore',
//    autoLoad: true,
//    pageSize: 10,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_rekanan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});