
/**
 * Re-use the new WebSockets deployment if available.  If not, fallback on the Oracle deployment
 */
window["deployQZ"] = typeof (deployQZ) == "function" ? deployQZ : deployQZApplet;

function deployQZApplet() {
    console.log('Starting deploy of qz applet');

    var attributes = {id: "qz", code: 'qz.PrintApplet.class',
        archive: '../qz-print.jar', width: 1, height: 1};
    var parameters = {jnlp_href: '../qz-print_jnlp.jnlp',
        cache_option: 'plugin', disable_logging: 'false',
        initial_focus: 'false', separate_jvm: 'true'};
    if (deployJava.versionCheck("1.7+") == true) {
    }
    else if (deployJava.versionCheck("1.6.0_45+") == true) {
    }
    else if (deployJava.versionCheck("1.6+") == true) {
        delete parameters['jnlp_href'];
    }
    deployJava.runApplet(attributes, parameters, '1.6');
}

/**
 * Deploy tray version of QZ, or
 * Optionally used to deploy multiple versions of the applet for mixed
 * environments.  Oracle uses document.write(), which puts the applet at the
 * top of the page, bumping all HTML content down.
 */
deployQZ();

function getCertificate(callback) {
    /*
     $.ajax({
     method: 'GET',
     url: 'assets/auth/public-key.txt',
     async: false,
     success: callback // Data returned from ajax call should be the site certificate
     });
     */

    //Non-ajax method, only include public key and intermediate key
    callback("-----BEGIN CERTIFICATE-----\n" +
            "MIIFAzCCAuugAwIBAgICEAIwDQYJKoZIhvcNAQEFBQAwgZgxCzAJBgNVBAYTAlVT\n" +
            "MQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0cmllcywgTExDMRswGQYD\n" +
            "VQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMMEHF6aW5kdXN0cmllcy5j\n" +
            "b20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1c3RyaWVzLmNvbTAeFw0x\n" +
            "NTAzMTkwMjM4NDVaFw0yNTAzMTkwMjM4NDVaMHMxCzAJBgNVBAYTAkFBMRMwEQYD\n" +
            "VQQIDApTb21lIFN0YXRlMQ0wCwYDVQQKDAREZW1vMQ0wCwYDVQQLDAREZW1vMRIw\n" +
            "EAYDVQQDDAlsb2NhbGhvc3QxHTAbBgkqhkiG9w0BCQEWDnJvb3RAbG9jYWxob3N0\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtFzbBDRTDHHmlSVQLqjY\n" +
            "aoGax7ql3XgRGdhZlNEJPZDs5482ty34J4sI2ZK2yC8YkZ/x+WCSveUgDQIVJ8oK\n" +
            "D4jtAPxqHnfSr9RAbvB1GQoiYLxhfxEp/+zfB9dBKDTRZR2nJm/mMsavY2DnSzLp\n" +
            "t7PJOjt3BdtISRtGMRsWmRHRfy882msBxsYug22odnT1OdaJQ54bWJT5iJnceBV2\n" +
            "1oOqWSg5hU1MupZRxxHbzI61EpTLlxXJQ7YNSwwiDzjaxGrufxc4eZnzGQ1A8h1u\n" +
            "jTaG84S1MWvG7BfcPLW+sya+PkrQWMOCIgXrQnAsUgqQrgxQ8Ocq3G4X9UvBy5VR\n" +
            "CwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdl\n" +
            "bmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUpG420UhvfwAFMr+8vf3pJunQ\n" +
            "gH4wHwYDVR0jBBgwFoAUkKZQt4TUuepf8gWEE3hF6Kl1VFwwDQYJKoZIhvcNAQEF\n" +
            "BQADggIBAFXr6G1g7yYVHg6uGfh1nK2jhpKBAOA+OtZQLNHYlBgoAuRRNWdE9/v4\n" +
            "J/3Jeid2DAyihm2j92qsQJXkyxBgdTLG+ncILlRElXvG7IrOh3tq/TttdzLcMjaR\n" +
            "8w/AkVDLNL0z35shNXih2F9JlbNRGqbVhC7qZl+V1BITfx6mGc4ayke7C9Hm57X0\n" +
            "ak/NerAC/QXNs/bF17b+zsUt2ja5NVS8dDSC4JAkM1dD64Y26leYbPybB+FgOxFu\n" +
            "wou9gFxzwbdGLCGboi0lNLjEysHJBi90KjPUETbzMmoilHNJXw7egIo8yS5eq8RH\n" +
            "i2lS0GsQjYFMvplNVMATDXUPm9MKpCbZ7IlJ5eekhWqvErddcHbzCuUBkDZ7wX/j\n" +
            "unk/3DyXdTsSGuZk3/fLEsc4/YTujpAjVXiA1LCooQJ7SmNOpUa66TPz9O7Ufkng\n" +
            "+CoTSACmnlHdP7U9WLr5TYnmL9eoHwtb0hwENe1oFC5zClJoSX/7DRexSJfB7YBf\n" +
            "vn6JA2xy4C6PqximyCPisErNp85GUcZfo33Np1aywFv9H+a83rSUcV6kpE/jAZio\n" +
            "5qLpgIOisArj1HTM6goDWzKhLiR/AeG3IJvgbpr9Gr7uZmfFyQzUjvkJ9cybZRd+\n" +
            "G8azmpBBotmKsbtbAU/I/LVk8saeXznshOVVpDRYtVnjZeAneso7\n" +
            "-----END CERTIFICATE-----\n" +
            "--START INTERMEDIATE CERT--\n" +
            "-----BEGIN CERTIFICATE-----\n" +
            "MIIFEjCCA/qgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgawxCzAJBgNVBAYTAlVT\n" +
            "MQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYDVQQKDBJRWiBJ\n" +
            "bmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMsIExMQzEZMBcG\n" +
            "A1UEAwwQcXppbmR1c3RyaWVzLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydEBx\n" +
            "emluZHVzdHJpZXMuY29tMB4XDTE1MDMwMjAwNTAxOFoXDTM1MDMwMjAwNTAxOFow\n" +
            "gZgxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0\n" +
            "cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMM\n" +
            "EHF6aW5kdXN0cmllcy5jb20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1\n" +
            "c3RyaWVzLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANTDgNLU\n" +
            "iohl/rQoZ2bTMHVEk1mA020LYhgfWjO0+GsLlbg5SvWVFWkv4ZgffuVRXLHrwz1H\n" +
            "YpMyo+Zh8ksJF9ssJWCwQGO5ciM6dmoryyB0VZHGY1blewdMuxieXP7Kr6XD3GRM\n" +
            "GAhEwTxjUzI3ksuRunX4IcnRXKYkg5pjs4nLEhXtIZWDLiXPUsyUAEq1U1qdL1AH\n" +
            "EtdK/L3zLATnhPB6ZiM+HzNG4aAPynSA38fpeeZ4R0tINMpFThwNgGUsxYKsP9kh\n" +
            "0gxGl8YHL6ZzC7BC8FXIB/0Wteng0+XLAVto56Pyxt7BdxtNVuVNNXgkCi9tMqVX\n" +
            "xOk3oIvODDt0UoQUZ/umUuoMuOLekYUpZVk4utCqXXlB4mVfS5/zWB6nVxFX8Io1\n" +
            "9FOiDLTwZVtBmzmeikzb6o1QLp9F2TAvlf8+DIGDOo0DpPQUtOUyLPCh5hBaDGFE\n" +
            "ZhE56qPCBiQIc4T2klWX/80C5NZnd/tJNxjyUyk7bjdDzhzT10CGRAsqxAnsjvMD\n" +
            "2KcMf3oXN4PNgyfpbfq2ipxJ1u777Gpbzyf0xoKwH9FYigmqfRH2N2pEdiYawKrX\n" +
            "6pyXzGM4cvQ5X1Yxf2x/+xdTLdVaLnZgwrdqwFYmDejGAldXlYDl3jbBHVM1v+uY\n" +
            "5ItGTjk+3vLrxmvGy5XFVG+8fF/xaVfo5TW5AgMBAAGjUDBOMB0GA1UdDgQWBBSQ\n" +
            "plC3hNS56l/yBYQTeEXoqXVUXDAfBgNVHSMEGDAWgBQDRcZNwPqOqQvagw9BpW0S\n" +
            "BkOpXjAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAJIO8SiNr9jpLQ\n" +
            "eUsFUmbueoxyI5L+P5eV92ceVOJ2tAlBA13vzF1NWlpSlrMmQcVUE/K4D01qtr0k\n" +
            "gDs6LUHvj2XXLpyEogitbBgipkQpwCTJVfC9bWYBwEotC7Y8mVjjEV7uXAT71GKT\n" +
            "x8XlB9maf+BTZGgyoulA5pTYJ++7s/xX9gzSWCa+eXGcjguBtYYXaAjjAqFGRAvu\n" +
            "pz1yrDWcA6H94HeErJKUXBakS0Jm/V33JDuVXY+aZ8EQi2kV82aZbNdXll/R6iGw\n" +
            "2ur4rDErnHsiphBgZB71C5FD4cdfSONTsYxmPmyUb5T+KLUouxZ9B0Wh28ucc1Lp\n" +
            "rbO7BnjW\n" +
            "-----END CERTIFICATE-----\n");
}

function signRequest(toSign, callback) {
    /*
     $.ajax({
     method: 'GET',
     contentType: "text/plain",
     url: '/secure/url/for/sign-message.php?request=' + toSign,
     async: false,
     success: callback // Data returned from ajax call should be the signature
     });
     */

    //Send unsigned messages to socket - users will then have to Allow/Deny each print request
    callback();
}
/**
 * Automatically gets called when applet has loaded.
 */
function qzReady() {
    // If the qz object hasn't been created, fallback on the <applet> tags
    if (!qz) {
        window["qz"] = document.getElementById('qz');
    }
//                var title = document.getElementById("title");
    if (qz) {
//        debugger;
        try {
//            title.innerHTML = title.innerHTML + " " + qz.getVersion();
//            document.getElementById("qz-status").style.background = "#F0F0F0";
        } catch (err) { // LiveConnect error, display a detailed message
//            document.getElementById("qz-status").style.background = "#F5A9A9";
            alert("ERROR:  \nThe applet did not load correctly.  Communication to the " +
                    "applet has failed, likely caused by Java Security Settings.  \n\n" +
                    "CAUSE:  \nJava 7 update 25 and higher block LiveConnect calls " +
                    "once Oracle has marked that version as outdated, which " +
                    "is likely the cause.  \n\nSOLUTION:  \n  1. Update Java to the latest " +
                    "Java version \n          (or)\n  2. Lower the security " +
                    "settings from the Java Control Panel.");
        }
    }
}

/**
 * Automatically gets called when "qz.print()" is finished.
 */
function qzDonePrinting() {
    // Alert error, if any
    if (qz.getException()) {
        alert('Error printing:\n\n\t' + qz.getException().getLocalizedMessage());
        qz.clearException();
        return;
    }

    // Alert success message
//    alert('Nomor barcode sukses dikirim ke printer "' + qz.getPrinter() + '".');
}

/**
 * Returns is the applet is not loaded properly
 */
function isLoaded() {
    if (!qz) {
        alert('Error:\n\n\tPrint plugin is NOT loaded!');
        return false;
    } else {
        try {
            if (!qz.isActive()) {
                alert('Error:\n\n\tPrint plugin is loaded but NOT active!');
                return false;
            }
        } catch (err) {
            alert('Error:\n\n\tPrint plugin is NOT loaded properly!');
            return false;
        }
    }
    return true;
}

/***************************************************************************
 * Prototype function for printing raw ZPL commands
 * Usage:
 *    qz.append('^XA\n^FO50,50^ADN,36,20^FDHello World!\n^FS\n^XZ\n');
 *    qz.print();
 ***************************************************************************/
function printZPL(printerName, nolab, stringKiri, stringBawah, stringKanan) {
//                if (notReady()) {
//                    return;
//                }

    if (isLoaded()) {
        if (!printerName) {
            printerName = "zebra";
        }
        qz.findPrinter(printerName);

        // Automatically gets called when "qz.findPrinter()" is finished.
        window['qzDoneFinding'] = function() {
//                        var p = document.getElementById('printer');
            var printer = qz.getPrinter();
            if (printer == null) {
                alert("Printer " + printerName + " tidak ditemukan");
                window['qzDoneFinding'] = null;
                return;
            }

            window['qzDoneFinding'] = null;
        };
    }
    if (!nolab) {
        nolab = "1234567890123";
    }
    if (!stringKiri) {
        stringKiri = "kiri/NOLAB";
    }
    if (!stringBawah) {
        stringBawah = "string bawah/pasien";
    }
    if (!stringKanan) {
        stringKanan = "Kanan/PX";
    }

    // Send characters/raw commands to qz using "append"
    // This example is for ZPL.  Please adapt to your printer language
    // Hint:  Carriage Return = \r, New Line = \n, Escape Double Quotes= \"

    qz.append('~SD24\n');
    qz.append('^MD1\n');
    qz.append('^XA\n');
    qz.append('^LH32,28^FS\n');
    qz.append('^FO90,0^A0B,20,22,^CI13^FD' + stringKiri + '^FS\n');
    qz.append('^LH96,24^FS\n');
    qz.append('^BY2,3.0^FO70,0^BCN,100,N,N,N,A^FD' + nolab + '^FS\n');
    qz.append('^LH60,24^FS\n');
    qz.append('^FO110,112^A0N,20^FD' + stringBawah + '^FS\n');
    qz.append('^LH358,22^FS\n');
    qz.append('^FO110,0^A0B,24,24,^CI13^FD' + stringKanan + '^FS\n');
    qz.append('^XZ\n');
    qz.append('^FX End of job\n');
    qz.append('^XA\n');
    qz.append('^IDR:ID*.*\n');
    qz.append('^XZ\n');
    qz.print();
    window['qzDoneAppending'] = null;

}

