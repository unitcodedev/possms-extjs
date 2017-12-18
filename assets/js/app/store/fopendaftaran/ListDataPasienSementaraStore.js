var ListDataPasienSementaraModel = Ext.define('SIForLaP.model.ListDataPasienSementaraModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idtrx_pas', type: 'string'},
        {name: 'pasien_id', type: 'string'},
        {name: 'nolab', type: 'string'},
        {name: 'nama_pasien', type: 'string'},
        {name: 'jenis_kelamin', type: 'string'},
        {name: 'tgl_lahir', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'no_hp', type: 'string'},
        {name: 'no_tlfnrumah', type: 'string'},
        {name: 'alamat', type: 'string'},
        {name: 'kota', type: 'string'},
        {name: 'id_rekanan', type: 'string'},
        {name: 'nama_rekanan', type: 'string'},
        {name: 'kode_kontrak', type: 'string'},
        {name: 'nik', type: 'string'},
        {name: 'divisi', type: 'string'},
        {name: 'subdivisi', type: 'string'},
        {name: 'jabatan', type: 'string'},
        {name: 'departemen', type: 'string'},
        {name: 'subdepartemen', type: 'string'},
        {name: 'subdepartemen', type: 'string'},
        {name: 'titip_uang', type: 'string'},
    ],
    idProperty: 'idtrx_pas'
});


Ext.define('SIForLaP.store.fopendaftaran.ListDataPasienSementaraStore', {
    extend: 'Ext.data.Store',
    alias: 'store.importdatapasien.listdatapasiensementarastore',
    model: ListDataPasienSementaraModel,
    storeId: 'fopendaftaranListDataPasienSementaraStore',
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_pasien_sementara',
        reader: {
            type: 'json',
            root: 'data',
        }
    }
});