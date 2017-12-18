/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function printsinglebcode(nolab, nama, bcd, jk, count, digitkanan) {
    nama = nama.substr(0, 15);
    bcd = bcd.toLowerCase();
    switch (bcd) {
        case "h":
            bcd = "Hema";
            break;
        case "k":
            bcd = "Kimia";
            break;
        case "i":
            bcd = "Imun"
            break;
        case "f":
            bcd = "Faeces";
            break;
        case "l":
            bcd = "Lain-lain"
            break;
        case "m":
            bcd = "Mikro";
            break;
        case "u":
            bcd = "Urine";
            break;
        case "c":
            bcd = "Citrat";
            break;
    }
    //document.app1.printbarcode(_port_bcd, nolab, nama, jk, bcd, count, digitkanan);
document.app1.printbarcode("/dev/lp0","110501235-2","Nama Pasien","L","HEMA","2","CM");
}

