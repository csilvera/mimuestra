function checkConnection() {
    var networkState = navigator.connection.type;
    var type = undefined;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    console.log('Connection type: ' + states[networkState]);
    
     type = states[networkState];
    
    return type;
}
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        menuins();
        checkConnection();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
app.initialize();
function menuins(){
    var acceso = localStorage.getItem('sesion');
    if(acceso == 'menu'){
       $('#text-1').css('padding-top','5px');
        $('#text-1').text('Menu');
        $('#opc-2').load('../opciones/nada.html');
        $('#Publica').empty();
        $('#Publica').append(`<ul>
                    <li class="btn-inmenu col-min" id="welcomeni">Inicio</li>
                    <li class="btn-inmenu col-min">Categoria</li>
                    <li class="btn-inmenu col-min">Notificación  <i class="not-f col-primary">+10</i></li>
                    <li class="btn-inmenu col-min">Favoritos</li>
                    <li class="btn-inmenu col-min">Ayuda</li>
                    <li class="btn-inmenu col-min">Ubicación</li>
                    <li class="btn-inmenu col-min">Ajuste</li>
                    <li class="btn-inmenur ColorDominante col-ter">Comprar ahora</li>
                   <li class="btn-inmenu col-min" id="Salir">Salir</li>
                </ul>`);
    }
    else{
       window.location = "../index.html";
    }
}
$('#Publica').on('click','#Salir', function(){
    navigator.vibrate(200);
    var m = localStorage.getItem('nick');
    $.ajax({
        url:'https://add.sakuraitachi.com/csesion/'+m,
        type:'GET',
        timeout:20000
    })
    .done(function(data){
        if(data == 'ok'){
            localStorage.setItem("sesion", 'inicio');
            localStorage.setItem("nick",'');
            window.location = "../index.html";
        }   
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
            if (jqXHR.status == 500) {
                console.log('Internal Server Error [500].');
                $('.Inestado').show();
                $('.Inestado').text('Servidor colapsado.');
                var ins = setTimeout(function(){
                    $('.Inestado').hide();
                    $('.Inestado').show();
                    $('.Inestado').text('Reintente luego.');
                    var y = setTimeout(function(){
                        $('.Inestado').hide();
                        console.clear();
                    },3000)
                },3000);
            }
            else if (textStatus === 'timeout') {
                console.log('Time out error.');
                $('.Inestado').show();
                $('.Inestado').text('Reintentar');
                var ins = setTimeout(function(){
                    $('.Inestado').hide();
                    console.clear();
                },3000);
            }
            else if (textStatus === 'abort') {
                console.log('Ajax request aborted.');
                $('.Inestado').show();
                $('.Inestado').text('Conexión abortada');
                var ins = setTimeout(function(){
                    $('.Inestado').hide();
                    console.clear();
                },3000);
            }
        });
});