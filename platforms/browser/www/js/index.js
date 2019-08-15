var ojo = 0;
//localStorage.setItem("sesion",'not');
var codigo = localStorage.setItem("apps",'appmuestra011');
var dominio = localStorage.setItem('dominio','https://add.sakuraitachi.com/'); 
var vc = localStorage.setItem("vcompra",'1');
var che = 1;
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
        checkConnection();
        welcome();
       Opcionper();
        document.addEventListener("backbutton", onBackKeyDown, false);
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
function onBackKeyDown(){
    navigator.notification.confirm(
                'Desea salir de la aplicación',  // message
                onConfirm,         // callback
                'Dsimple team',            // title
                ['OK','CANCELAR'] 
    );
}
function onConfirm(data) {

    if(data == 1){
        cordova.plugins.backgroundMode.isActive();
        var t = setTimeout(function(){
            navigator.app.exitApp();
        },1000);
    }
    
}
var menuopc = 1; var menu = 1;
function welcome(){
    var acceso = localStorage.getItem('sesion');
    if(acceso == 'yes'){
        Cliente();
    }
    else if(acceso == 'terminos'){
        terminos();  
    }
    else if(acceso == 'inicio'){
        inicio();
    }
    else if(acceso == 'guia'){
        Guia();
    }
    else if(acceso == 'restauracontra'){
        OlvidasteContra();  
    }
    else if(acceso == 'miayuda'){
        helpayuda();  
    }
    else if(acceso == 'registrame'){
        Registrate();  
    }
    else{
        $('#THeader').css('display','none');
        $('#Publica').empty();
        $('#Publica').append(`<i class="IcoLogo"></i><div class="Top-text col-min full-primary" >Bienvenidos</div><div class="versi let-ter">Versión 1.0.0</div>
                              <div class="btn btn-primary let-seg" id="Empezar">Aceptar</div>
                              <div class="pie-foo">    
                              <label class="contain" id="terminos">Aceptar terminos y condiciones.
                                  <input type="checkbox" value="1" checked>
                                  <span class="checkmark"></span>
                                </label>
                              </div>`);
    }
}
function Guia(){
    var h = new Date();
    var ho = h.getHours();
    var mens = '';
    if(ho < 12){
        mens = 'Buenos días';
    }
    else if(ho < 19){
        mens = 'Buenas tardes';
    }
    else if(ho < 24 ){
        mens = 'Buenas noches';
    }
    $('#THeader').css('display','none');
    $('#Publica').empty();
    $('#Publica').append(`<div class="btn-horario ColorDominante"><i class="ico-h"></i></div><div class="btn-coins ColorDominante"><i class="ico-d"></i></div> <div class="btn-infos ColorDominante"><i class="ico-inf"></i></div><div class="tit-sim col-min Jum-primary bg-bold">Tienda simple</div><i class="ini-wel"></i><div id="GuiaU"> <div class="boca-saluda"><div class="txt-ini col-min ">Hola `+mens+`</div> </div><div class="boca-ofrece"><div class="txt-ini col-min ">Te ofrecemos la posibilidad de automatizar tu negocio </div> </div></div>
     <div class="btn btn-primary continua" id="Ntipon">Siguiente</div>
     <div class="btn btn-light continua" id="Nomite">Omitir </div>`);
}
function inicio(){
    $('#THeader').css('display','block');
    $('#text-1').css('padding-top','5px');
    $('#text-1').text('Iniciar sesión');
    $('#opc-2').load('opciones/nada.html');
    $('#opc-1').load('menu-sin-acceso/menu.html');
    $('#Publica').empty();
    $('#Publica').append(`<form method="get" id="IniciaSesion">
        <div class="username let-primary col-min bg-bold" style="margin-top: 40px;">Seudónimo o correo</div>
        <input type="text" placeholder="Ingrese Seudónimo o correo" class="nick-u let-seg bord" id="AliasCor" name="namein" maxlength="50" onpaste="return false"  />
        <div id="InfoAliasCorre"></div>
        <div class="pass-u let-primary col-min bg-bold">Contraseña</div>
        <input type="password" name="contra" placeholder="Ingrese contraseña" class="passk-u col-primary let-seg bord" id="ContraS" maxlength="15" onpaste="return false" />
        <i class="ico-pass" id="OjoPun"></i>
        <div id="InfoContras"></div>
        <div class=" btn btn-light continuar-olv" id="Olvidast">¿Olvidaste tu contraseña. ?</div>
         <div class="btn btn-light continuar-al" id="helpay">¿Necesitas ayuda. ?</div>
        <div class="btn btn-light continuar" id="registaho">Registrate ahora.</div>
        <div class="btn btn-success continuar" id="ActGuia">Comprar ahora</div>
        <button type="submit" class="ColorDominante" id="En-sub">
            <i class="ico-send"></i>
        </button>
    </form>`);
    
}
$('#opc-1').on('click','#Menu-btn', function(){
    if(menu == 1){
        menu = 0;
        $('.Despl-menu').load('menu/sin-acceso.html');
        $('.Despl-menu').animate({left:'0%'},'show');
    }
    else{
        menu = 1;
        $('.Despl-menu').animate({left:'-80%'},'show');
    }
});
$('#Publica').on('click','#ActGuia', function(){
    localStorage.setItem("sesion", 'guia');
    welcome();
});
$('#Publica').on('click','#Ntipon', function(e){
    e.preventDefault();
    $('#GuiaU').empty();
    $('#GuiaU').append(`<div class="boca-saludas"><div class="txt-ini col-min bg-bold">Selecciona tu negocio</div></div>
                        <div style="margin-top:30px;">
                            <li class="list-me col-min" id="Vehicular"> Vehicular</li>
                            <li class="list-me col-min" id="tecnologia"> Tecnologia, accesorios, ropa, farmacéutica.</li>
                            <li class="list-me col-min" id="pedidos"> Automercado, panadería, Comida rápida.</li>
                        </div>`);
    $('#Ntipon').css('display','none');
    $('#Nomite').css('display','none');
});
$('#Publica').on('click','#Nomite', function(e){
    e.preventDefault();
    $('#Ntipon').css('display','none');
    $('#Nomite').css('display','none');
    localStorage.setItem("sesion", 'inicio');
    welcome();
});
$('#Publica').on('click','.list-me', function(e){
    e.preventDefault();
    var n = $(this).attr('id');
    localStorage.setItem("tipo", n);
    $('#GuiaU').empty();
    $('#GuiaU').append(`<div class="boca-saludas"><div class="txt-ini col-min bg-bold">Selecciona el tema</div></div>
                        <div style="margin-top:30px;">
                            <li class="list-met col-min" id="tradional"> Tradicional</li>
                            <li class="list-met col-min" id="moderno"> Moderno</li>
                        </div>`);
});
$('#Publica').on('click','.list-met', function(e){
    e.preventDefault();
     var n = $(this).attr('id');
    localStorage.setItem("tema", n);
    $('#GuiaU').empty();
    $('#GuiaU').append(`<div class="boca-cuenta"><div class="txt-ini col-min ">Tu negocio podrás gestionar tus clientes, inventario, ayudar a tus clientes así como también dar tu ubicación física, horario de atención y opciones como abrir o cerrar tu negocio. </div></div>
    <div class="btn btn-primary continua" id="AceptaCon">Continuar</div>`);
});
$('#Publica').on('click','#AceptaCon', function(e){
    e.preventDefault();
    $('#GuiaU').empty();
    $('#GuiaU').append(`<div class="boca-saludas"><div class="txt-ini col-min bg-bold">¿ Desea realizar la compra ahora. ? </div></div>
    <div class="btn btn-primary desicion" id="AceptaNot">No</div>
    <div class="btn btn-primary desicion" id="AceptaYes">Si</div>`);
});
$('#Publica').on('click','#AceptaNot', function(e){
    e.preventDefault();
    localStorage.setItem("sesion", 'inicio');
    welcome();
});
$('#Publica').on('click','#AceptaYes', function(e){
    e.preventDefault();
    $('#GuiaU').empty();
    $('#GuiaU').append(`<div class="boca-saludas"><div class="txt-ini col-min bg-bold">Complete el formulario </div></div>
    <div style="margin-top:30px;">
        <form method="get" id="ComprarApp">
        <div class="username let-primary col-min bg-bold" style="margin-top: 10px;margin-bottom:10px;">Nombre y apellido</div>
        <input type="text" placeholder="Ingrese nombre y apellido" class="nick-u let-seg bord" id="NombApell" name="nombre" maxlength="50" onpaste="return false"  />
        <div class="username let-primary col-min bg-bold" style="margin-top: 10px;">Telefono</div>
        <input type="tel" placeholder="Ingrese telefono" class="nick-u let-seg bord" id="Celular" name="telefono" maxlength="20" onpaste="return false"  />
        <div class="username let-primary col-min bg-bold" style="margin-top: 10px;">Correo electrónico</div>
        <input type="text" placeholder="Ingrese correo" class="nick-u let-seg bord" id="MiEmail" name="correo" maxlength="50" onpaste="return false"  />
        <div class="semana let-primary col-min bg-bold" style="margin-top: 15px;">Tu negocio atiende cuantos clientes a la semana. <div>
        <div class="radio">
          <label><input type="radio" name="optradio" value="1" id="clientes" checked>Quiero probar los 7 días gratis</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio" value="2" id="clientes">Menos de 50 clientes.</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio" value="3" id="clientes">100 clientes.</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio" value="4" id="clientes">200  clientes.</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio" value="5" id="clientes">más de un millar de clientes.</label>
        </div>

        <div class="let-primary col-min">Tu plan es:<i class="let-primary bg-bold col-min planess">gratis</i> </>
        <div class="let-primary col-min descriplan">Descripcion:500 clientes registrados y 50 articulos en inventario. </div>
         <button type="submit" class="ColorDominante" id="AceptaComple"> 
            <i class="ico-send"></i>
        </button>
        </form>
    </div>`);
});
$('#Publica').on('change','#clientes', function(e){
    e.preventDefault();
    var n = $(this).val();
    if(n == 1){
        $('.planess').text('Gratis');
        $('.descriplan').text('Descripcion:500 clientes registrados y 50 articulos en inventario.');
    }
    else if(n == 2){
        $('.planess').text('Emprendedor');
        $('.descriplan').text('Descripcion:10.000 clientes registrados y 100 articulos en inventario.');
    }
    else if(n == 3){
        $('.planess').text('Popular');
        $('.descriplan').text('Descripcion:30.000 clientes registrados y 200 articulos en inventario.');
    }
    else if(n == 4){
        $('.planess').text('Empresarial');
        $('.descriplan').text('Descripcion:50.000 clientes registrados y 50 articulos en inventario.');
    }
    else if(n == 5){
        $('.planess').text('Corporación');
        $('.descriplan').text('Descripcion:mas de 100.000 clientes registrados y 50 articulos en inventario.');
    }
});
$('#Publica').on('submit','#ComprarApp', function(e){
    e.preventDefault();
    navigator.vibrate(400);
    //tema, tipo, nombre, tlefono, correo, plan, dominio, codigo.
    var tema =localStorage.getItem('tema');
    var tipo =localStorage.getItem('tipo'); 
    var app = localStorage.getItem('apps');
    var dom = localStorage.getItem('dominio');
    var serealiza = $(this).serialize();
    var devi = device.platform;
    var nom = $('#NombApell').val();
    var tel = $('#Celular').val();
    var correo = $('#MiEmail').val();
    var plan = $('#clientes').val();
    var vcorreo = /gmail.com/.test(correo);
    if(nom.length == 0 & tel.length == 0 & correo.length == 0){
       $('#NombApell, #Celular, #MiEmail').css('box-shadow', '0 0 0 0.2rem rgba(255,9,9, 0.25)'); 
        var x = setTimeout(function(){
           $('#NombApell, #Celular, #MiEmail').css('box-shadow', 'none');
       },3000);
        $('footer').show();
        $('footer').empty();
        $('footer').css('background-color','#F4511E');
        $('footer').append(`<i class="appadv"></i><div class="smservis col-ter let-seg bg-bold">Complete el formulario</div>`);
        var ins = setTimeout(function(){
            $('footer').hide();
        },4000);
    }
    else if(nom.length < 5){
        $('#NombrApell').css('box-shadow', '0 0 0 0.2rem rgba(255,9,9, 0.25)'); 
        var x = setTimeout(function(){
           $('#NombrApell').css('box-shadow', 'none');
       },3000);
        $('footer').show();
        $('footer').empty();
        $('footer').css('background-color','#F4511E');
        $('footer').append(`<i class="appadv"></i><div class="smservis col-ter let-seg bg-bold">Ingrese nombre y apellido</div>`);
        var ins = setTimeout(function(){
            $('footer').hide();
        },4000);
    }
    else if(tel.length < 7){
        $('#Celular').css('box-shadow', '0 0 0 0.2rem rgba(255,9,9, 0.25)'); 
        var x = setTimeout(function(){
           $('#Celular').css('box-shadow', 'none');
       },3000);
        $('footer').show();
        $('footer').empty();
        $('footer').css('background-color','#F4511E');
        $('footer').append(`<i class="appadv"></i><div class="smservis col-ter let-seg bg-bold">Ingrese tu numero de telefono</div>`);
        var ins = setTimeout(function(){
            $('footer').hide();
        },4000);
    }
    else if(vcorreo == false){
        $('#Celular').css('box-shadow', '0 0 0 0.2rem rgba(255,9,9, 0.25)'); 
        var x = setTimeout(function(){
           $('#Celular').css('box-shadow', 'none');
       },3000);
        $('footer').show();
        $('footer').empty();
        $('footer').css('background-color','#F4511E');
        $('footer').append(`<i class="appadv"></i><div class="smservis col-ter let-seg bg-bold">Ingrese tu correo gmail.</div>`);
        var ins = setTimeout(function(){
            $('footer').hide();
        },4000);
    }
    else{
        if(navigator.onLine){
            $('#AceptaComple').attr("disabled", true);
            $.ajax({
                url:'https://add.sakuraitachi.com/guiacompra',
                data:serealiza+'&device='+devi+'&cod='+app+'&tema='+tema+'&dominio='+dom+'&negocio='+tipo,
                type:'GET',
                timeout:20000
            })
            .done(function(data){
                if(data == 'ok'){
                     document.getElementById('helpatencion').reset();
                    localStorage.setItem("sesion", 'inicio');
                    welcome();
                    $('footer').show();
                    $('footer').empty();
                    $('footer').css('background-color','#F4511E');
                    $('footer').append(`<i class="appacom"></i><div class="smservis col-ter let-seg bg-bold">Datos enviados. </div>`);
                    var ins = setTimeout(function(){
                        $('footer').hide();
                        var t = setTimeout(function(){
                            $('footer').show();
                            $('footer').empty();
                            $('footer').css('background-color','#F4511E');
                            $('footer').append(`<i class="appacom"></i><div class="smservis col-ter let-seg bg-bold">En breve sera atendido por nuestros asesores de ventas. </div>`);
                            var ins = setTimeout(function(){
                                $('footer').hide();
                            },4000);
                        },1000);
                    },4000);
                }else{
                    $('footer').show();
                    $('footer').empty();
                    $('footer').css('background-color','#F4511E');
                    $('footer').append(`<i class="appadv"></i><div class="smservis col-ter let-seg bg-bold">Error interno</div>`);
                    var ins = setTimeout(function(){
                        $('footer').hide();
                    },4000);
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
        }
        else{
            $('footer').show();
            $('footer').empty();
            $('footer').css('background-color','#F4511E');
            $('footer').append(`<i class="appadv"></i><div class="smservis col-ter let-seg bg-bold">No hay conexion a internet</div>`);
            var ins = setTimeout(function(){
                $('footer').hide();
            },4000);
        }
    }
});
$('#Publica').on('submit','#IniciaSesion', function(e){
    e.preventDefault();
    navigator.vibrate(400);
    var app = localStorage.getItem('apps');
    var nic = $('#AliasCor').val();
    var contra = $('#ContraS').val();
    var serealiza = $(this).serialize();
    var devi = device.platform;
    if(nic.length == 0 & contra.length == 0){
       $('#AliasCor').css('box-shadow', '0 0 0 0.2rem rgba(255,9,9, 0.25)'); 
       $('#ContraS').css('box-shadow', '0 0 0 0.2rem rgba(255,9,9, 0.25)');
        var x = setTimeout(function(){
           $('#AliasCor, #ContraS').css('box-shadow', 'none');
       },3000);
    }
    else if(nic.length < 7){
        $('#AliasCor').css('box-shadow', '0 0 0 0.2rem rgba(255,9,9, 0.25)'); 
        var x = setTimeout(function(){
           $('#AliasCor').css('box-shadow', 'none');
       },3000);
    }
    else if(contra.length < 7){
        $('#ContraS').css('box-shadow', '0 0 0 0.2rem rgba(255,9,9, 0.25)'); 
        var x = setTimeout(function(){
           $('#ContraS').css('box-shadow', 'none');
       },3000);
    }
    else{
        if(navigator.onLine){
            $('#En-sub').attr("disabled", true);
            $.ajax({
                url:'https://add.sakuraitachi.com/welcomein',
                data:serealiza+'&device='+devi+'&cod='+app,
                type:'GET',
                timeout:20000
            })
            .done(function(data){
                $('#En-sub').attr("disabled", false);
                if(data == 'primer'){
                   localStorage.setItem("nick",nic);
                    primer();
                }
                else if(data == 'ok'){
                    localStorage.setItem("nick",nic);
                    localStorage.setItem("sesion",'yes');
                    $('.Inestado').show();
                    $('.Inestado').text('Bienvenido');
                    welcome();
                    var ins = setTimeout(function(){
                        $('.Inestado').hide();
                    },4000);
                    cordova.plugins.backgroundMode.enable();
                }
                else{
                    $('.Inestado').show();
                    $('.Inestado').text(data);
                    var ins = setTimeout(function(){
                        $('.Inestado').hide();
                    },4000);
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
        }
        else{
            $('#NoHay').empty();
            $('#NoHay').append(`<div class="btn btn-primary" id="center-btn">No hay conexion de internet </div>`);
            var t = setTimeout(function(){
                $('#NoHay').empty();
            },5000)
        }
    }
});
$('#Publica').on('submit','#RegistroU', function(e){
    e.preventDefault();
    var data = $(this).serialize();
    var devic = device.platform;
    var seudo = $('#Alias').val(); var correo = $('#Correo').val(); var contra = $('#Contra').val();
    var textmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(correo);
    var textco = /(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,15}$/.test(correo);
    var textcon = /(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,15}$/.test(contra);
    var textali = /(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,15}$/.test(seudo);
    var noValido = /\s/;
    var vmail = /gmail.com/.test(correo); var seu = seudo.length ==0;  var cont = contra.lentgh == 0;
    if(navigator.onLine){
        if(vmail == false & seudo.length ==  0 & contra.length == 0){
            swal('Complete','Todos los campos son requeridos','error');
            $('#Alias, #Correo, #Contra').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
                   $('#Alias, #Correo, #Contra').css('box-shadow', 'none');
            },5000);
        }
        else if(seudo.length < 5 & textali == false & noValido.test(seudo)){
            $('#CorrM ').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
                   $('#CorrM').css('box-shadow', 'none');
            },5000);
            $('#InfoAlias').empty();
            $('#InfoAlias').show('blind',400);
            $('#InfoAlias').append(`<div class="alert alert-danger alert-dismissible" id="alertas">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Seudónimo:</strong> minimo 5 caracteres, solo letras, numeros y sin espacios.
                                  </div>`);
        }
        else if(vmail == false ){
            $('#CorrM ').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
                   $('#CorrM').css('box-shadow', 'none');
            },5000);
            $('#InfoContrar').empty();
            $('#InfoCorreo').show('blind',400);
            $('#InfoCorreo').append(`<div class="alert alert-danger alert-dismissible" id="alertas">
                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                <strong>Correo:</strong> solo gmail.com 
                              </div>`);
        }
        else if(textcon == false){
            $('#InfoContrar').empty();
            $('#Contra').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
                   $('#Contra').css('box-shadow', 'none');
            },5000);
            $('#InfoContrar').show('blind',400);
            $('#InfoContrar').append(`<div class="alert alert-danger alert-dismissible" id="alertas">
                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                La contraseña debe tener al entre 5 y 15 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
                              </div>`);
        }
        else{
            $.mobile.loading("show");
            $.ajax({
                url:'https://add.sakuraitachi.com/mregister',
                data:data+'&device='+devic,
                type:'GET',
                timeout:20000,
            })
            .done(function(data){
                $.mobile.loading("hide");
                if(data == 'ok'){
                    swal({ title:'Enhorabuena', text:'Se ha registrado correctamente', icon:'success', timer:5000});
                    document.getElementById('RegistroU').reset();
                }
                else{
                    swal({ title:'Disculpa', text:data, icon:'error', timer:5000});
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
        }   
    }
    
});
function OlvidasteContra(){
    $('#THeader').css('display','block');;
    $('#text-1').css('padding-top','5px');
    $('#text-1').text('Restaurar contraseña');
    $('#opc-2').load('opciones/nada.html');
    $('#opc-1').load('opciones/regresar-ini.html');
    $('#Publica').empty();
    $('#Publica').append(`<form id="RestaurarPass" autocomplete="off">
    <div class="username let-seg col-min">Seudónimo o correo</div>
    <input type="text" placeholder="Ingrese Seudónimo o correo" name="namein" class="nick-u let-seg" id="Olvid" maxlength="50" />
    <div id="InfoAliasCort"></div>
    <button type="submit" class="ColorDominante" id="En-sub">
        <i class="ico-send"></i>
    </button>
</form>`);
    
}
$('#Publica').on('submit','#RestaurarPass', function(e){
    e.preventDefault();
    var d = $('#Olvid').val();
    var se = $('#Olvid').serialize();
    var devi = device.platform;
    if(d.length < 4 ){
       $('.Inestado').show();
       $('.Inestado').text('Minimo 5 caracteres.');
        var ins = setTimeout(function(){
            $('.Inestado').hide();
        },6000);
    }
    else{
        $.ajax({
            url:'https://add.sakuraitachi.com/mrestaurar',
            data:se+'&device='+devi,
            type:'GET',
            timeout:20000,
            dataType: "json"
        })
        .done(function(data){
            $('.Inestado').show();
            $('.Inestado').text(data);
            var ins = setTimeout(function(){
                $('.Inestado').hide();
            },6000);
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
    }
});
function Registrate(){
    $('#THeader').css('display','block');;
    $('#text-1').css('padding-top','5px');
    $('#text-1').text('Registrate');
    $('#opc-2').load('opciones/nada.html');
    $('#opc-1').load('opciones/regresar-ini.html');
    $('#Publica').empty();
    $('#Publica').append(`<form autocomplete="off" id="RegistroU">
    <div class="username let-seg col-min">Seudónimo</div>
    <input type="text" placeholder="Ingrese seudónimo" class="nick-u let-seg" id="Alias" name="name" maxlength="15" onpaste="return false" />
    <div id="InfoAlias"></div>
    <div class="usernam let-seg col-min" style="margin-top:25px;">Correo electrónico</div>
    <input type="text" placeholder="Ingrese correo" class="mail-u let-seg" id="Correo" maxlength="50" name="correo" onpaste="return false" />
    <div id="InfoCorreo"></div>
    <div class="usernam let-seg col-min">Contraseña</div>
    <input type="password" placeholder="Ingrese contraseña" class="passk-u let-seg" id="ContraS" maxlength="15" name="passw" onpaste="return false" />
    <i class="ico-pass" id="OjoPun"></i>
    <div id="InfoContrar"></div>
    <button type="submit" class="ColorDominante" id="En-sub">
        <i class="ico-send"></i>
    </button>
</form>`);
    
}
function helpayuda(){
    $('#THeader').css('display','block');;
    $('#text-1').css('padding-top','5px');
    $('#text-1').text('Ayuda');
    $('#opc-2').load('opciones/nada.html');
    $('#opc-1').load('opciones/regresar-ini.html');
    $('#Publica').empty();
    $('#Publica').append(`<form id="helpatencion" autocomplete="off">
    <div class="username let-seg col-min">Correo electrónico</div>
    <input type="text" placeholder="Ingrese correo" name="name" class="mail-u let-seg" id="CorrM" maxlength="50" onpaste="return false" />
    <div id="InfoCorreo"></div>
    <div class="usernam let-seg col-min" style="padding-bottom: 10px;">Asunto</div>
    <input type="text" class="form-control asun let-seg" id="asuntos" name="asunto"  placeholder="Ingrese asunto" maxlength="25" onpaste="return false" />
    <div id="InfoAsunto"></div>
    <div class="usernam let-seg col-min">Descripción</div>
    <textarea maxlength="150" id="Coment" class="descric let-seg" name="descri" placeholder="Ingrese descripción" onpaste="return false"></textarea>
    <div id="InfoDescri"></div>
    <button type="submit" class="ColorDominante" id="En-sub">
        <i class="ico-send"></i>
    </button>
</form>`);
    
}
$('#Publica').on('submit','#helpatencion', function(e){
    e.preventDefault();
    var data = $(this).serialize();
    var devic = device.platform;
    var mail = $('#CorrM').val(); var asun = $('#asuntos').val(); var desc = $('#Coment').val();
    var vmail = /gmail.com/.test(mail); var vasun = asun.length ==0;  var vdes = desc.lentgh == 0;
    if(navigator.onLine){
        if(vmail == false & asun.length ==  0 & desc.length == 0){
            $('#CorrM, #asuntos, #Coment').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
                   $('#CorrM, #asuntos, #Coment').css('box-shadow', 'none');
            },5000);
        }
        else if(vmail == false){
            $('#CorrM ').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
                   $('#CorrM').css('box-shadow', 'none');
            },5000);
        }
        else if(asun.length ==  0 & asun.length <= 3 ){
            $('#asuntos ').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
                   $('#asuntos').css('box-shadow', 'none');
            },5000); 
        }
        else if(desc.length ==  0 & desc.length <= 10 ){
            $('#asuntos ').css('box-shadow', '0 0 0 0.2rem rgba(231,76,60, 0.25)');
            var s = setTimeout(function(){
                   $('#asuntos').css('box-shadow', 'none');
            },5000); 
        }
        else{
            $.ajax({
                url:'https://add.sakuraitachi.com/mhelpcliente',
                data:data+'&device='+devic,
                type:'GET',
                timeout:20000,
            })
            .done(function(data){
                if(data == 'ok'){
                    document.getElementById('helpatencion').reset();
                }
                else{
                    
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
        }   
    }
});
function terminos(){
    $('#THeader').css('display','block');
    $('#text-1').css('padding-top','5px');
    $('#text-1').text('Términos y condiciones');
    $('#opc-2').load('opciones/nada.html');
    $('#opc-1').load('opciones/regresar.html');
    $('#Publica').empty();
     var dom = localStorage.getItem('dominio');
    if(navigator.onLine){
    $.ajax({
        url:dom+'terminosin',
        type:'GET',
        dataType:'json',
        timeout:20000
    })
    .done(function(data){
        if(data == 0){
           datatermino();
        }else{
            cl = JSON.parse(JSON.stringify(data));
            $('#Publica').empty();
            let cli = $('#Publica');
            cli.html();
            cl.forEach(termino =>{
                cli.append(`<div class="csi col-seg let-seg">${termino.name}</div>`);
            });
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
    }
    else{
        $('#NoHay').empty();
        $('#NoHay').append(`<div class="btn btn-primary" id="center-btn">No hay conexion de internet </div>`);
        var t = setTimeout(function(){
            $('#NoHay').empty();
        },5000);
    }
}
function datatermino(){
    $('#Publica').empty();
    $('#Publica').append(`<div class="SinR">No hay  términos ni condiciones. </div>`);
}
$('#Publica').on('click','#Olvidast', function(){
    localStorage.setItem("sesion", 'restauracontra');
    welcome();
});
$('#Publica').on('click','#helpay', function(){
    localStorage.setItem("sesion", 'miayuda');
    welcome();
});
$('#Publica').on('click','#registaho', function(){
    localStorage.setItem("sesion", 'registrame');
    welcome();
});
$('#Publica').on('click','#Empezar', function(){
    localStorage.setItem("sesion", 'guia');
    welcome();
});
$('#Publica').on('click','#terminos', function(){
    localStorage.setItem("sesion", 'terminos');
    welcome();
});
$('#opc-1').on('click','#regresaini', function(){
    localStorage.setItem("sesion", 'acepta');
    welcome();
});
$('#opc-1').on('click','#regresainic', function(){
    localStorage.setItem("sesion", 'inicio');
    welcome();
});
function Opcionper(){
    
    var app = localStorage.getItem('apps');
    var dom = localStorage.getItem('dominio');
    if(navigator.onLine){
    $.ajax({
        url:dom+'comprobar/'+app,
        type:'GET',
        timeout:20000
    })
    .done(function(data){
        if(data == 'fuera'){
            $('#THeader').css('display','none');
            $('#Publica').empty();
            $('#Publica').append(`<i class="appfser"></i><div class="smservi col-min full-primary bg-blod">APP Fuera de servicio.</div>`);
        }
        else if(data == 'Mantenimiento'){
            $('#THeader').css('display','none');
            $('#Publica').empty();
            $('#Publica').append(`<i class="apprepara"></i><div class="smservi col-min full-primary bg-bold">APP en Mantenimiento.</div>`);
        }
        else if(data == 'tiendacerrada'){
             welcome();
            $('footer').show();
            $('footer').empty();
            $('footer').css('background-color','#F4511E');
            $('footer').append(`<i class="appadv"></i><div class="smservis col-ter let-seg bg-bold">tienda cerrada no podras realizar compras</div>`);
        var ins = setTimeout(function(){
                    $('footer').hide();
            },6000);
        }
        else{
             welcome();
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
    }
    else{
        $('#NoHay').empty();
        $('#NoHay').append(`<div class="btn btn-primary" id="center-btn">No hay conexion de internet </div>`);
        var t = setTimeout(function(){
            $('#NoHay').empty();
        },5000);
    }
    
}
$('#Publica').on('click', '#OjoPun', function(e){
    e.preventDefault();
    navigator.vibrate(400);
    if(ojo == 0){
        $('#ContraS').attr('type','text');  
        ojo =1;
    }
    else{
        $('#ContraS').attr('type','password'); 
        ojo =0;
    }
} );