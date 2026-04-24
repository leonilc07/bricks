function gameOverAlert(tocke, cas) {
    Swal.fire({
        title: '<span style="color:#3ab8d4"> Konec igre</span>',
        html: 'Točke: <strong style="color:#7de8f5">' + tocke + '</strong><br>Čas: <strong style="color:#7de8f5">' + cas + '</strong>',
        icon: 'error',
        iconColor: '#3ab8d4',
        background: '#0b2e4a',
        color: '#cce9f5',
        confirmButtonText: 'Poskusi znova',
        confirmButtonColor: '#0a7a8a'
    }).then(function () {
        dodajRezultat(tocke, cas, imeIgralca);
        prikaziLestvico();
        clearInterval(intervalId);
        clearInterval(intTimer);
        predogled();
    });
}

function winAlert(tocke, cas) {
    Swal.fire({
        title: '<span style="color:#7de8f5">Našel si skrinjico</span>',
        html: 'Točke: <strong style="color:#7de8f5">' + tocke + '</strong><br>Čas: <strong style="color:#7de8f5">' + cas + '</strong>',
        icon: 'success',
        iconColor: '#3ab8d4',
        background: '#0b2e4a',
        color: '#cce9f5',
        confirmButtonText: '🏆 Igraj znova',
        confirmButtonColor: '#0a7a8a'
    }).then(function () {
        dodajRezultat(tocke, cas, imeIgralca);
        prikaziLestvico();
        clearInterval(intervalId);
        clearInterval(intTimer);
        predogled();
    });
}
