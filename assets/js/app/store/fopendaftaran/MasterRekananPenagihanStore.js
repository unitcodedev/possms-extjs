var MasterRekananPenagihan = Ext.define('SIForLaP.model.MasterRekananPenagihanModel', {
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


Ext.define('SIForLaP.store.fopendaftaran.MasterRekananPenagihanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.fopendaftaran.masterrekananpenagihanstore',
    model: MasterRekananPenagihan,
    storeId: 'masterrekananpenagihanstore',
    autoLoad: true,
//    pageSize: 10,
    remoteFilter: true,
    proxy: {
        success: true,
        type: 'ajax',
        url: BASE_PATH + 'pendaftaran/list_rekanan_penagihan',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});