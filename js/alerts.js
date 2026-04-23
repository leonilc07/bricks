//ko pirde do tli
function gameOverAlert(tocke, cas) {
    Swal.fire({
        title: 'Konec igre!',
        html: 'Točke: <strong>' + tocke + '</strong><br>Čas: <strong>' + cas + '</strong>',
        icon: 'error',
        confirmButtonText: 'Poskusi znova',
        confirmButtonColor: '#0d4f6e'
    }).then(function () {
        clearInterval(intervalId);
        clearInterval(intTimer);
        predogled();
    });
}

// ko pobere skrinjo
function winAlert(tocke, cas) {
    Swal.fire({
        title: 'Našel si skrinjico!',
        html: '<br>Točke: <strong>' + tocke + '</strong><br>Čas: <strong>' + cas + '</strong>',
        icon: 'success',
        confirmButtonText: '🏆 Igraj znova',
        confirmButtonColor: '#0d4f6e'
    }).then(function () {
        clearInterval(intervalId);
        clearInterval(intTimer);
        predogled();
    });
}
