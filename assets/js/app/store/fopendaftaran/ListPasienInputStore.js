var ListPasienInput = Ext.define('SIForLaP.model.ListPasienInputModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'pasien_id', type: 'string'},
        {name: 'nama_pasien', type: 'string'},
        {name: 'jenis_kelamin', type: 'string'},
        {name: 'tgl_lahir', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'no_hp', type: 'string'},
        {name: 'no_tlfnrumah', type: 'string'},
        {name: 'alamat', type: 'string'},
        {name: 'kota', type: 'string'},
    ],
    idProperty: 'id'
});

Ext.define('SIForLaP.store.fopendaftaran.ListPasienInputStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.listpasieninputstore',
    model: ListPasienInput,
    storeId: 'PendaftaranListPasienInputStore',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/daftar',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});