function printDocument(element) {
    let ventana = window.open('', 'PRINT', 'height=400, width=600');
    ventana.document.write('<html><head><title>' + document.title + '</title>');
    ventana.document.write('<link rel="stylesheet" href="../styles/style.css">');
    ventana.document.write('<link rel="stylesheet" href="../styles/mediaQueri.css" media="(max-width: 800px)">');
    ventana.document.write('</head><body>');
    ventana.document.write(element.innerHTML);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    ventana.addEventListener('load',function() {
        ventana.print();
        ventana.close();
    });

    return true;
}