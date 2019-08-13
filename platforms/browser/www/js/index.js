var ojo = 0;
//localStorage.setItem("sesion",'not');
var codigo = localStorage.setItem("apps",'appmuestra011');
var dominio = localStorage.setItem('dominio','https://add.sakuraitachi.com/'); 
var vc = localStorage.setItem("vcompra",'1');
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
function inicio(){
    $('#THeader').css('display','block');;
    $('#text-1').css('padding-top','5px');
    $('#text-1').text('Iniciar sesión');
    $('#opc-2').load('opciones/nada.html');
    $('#opc-1').load('opciones/nada.html');
    $('#Publica').empty();
    $('#Publica').append(`<form method="get" id="IniciaSesion">
        <div class="username let-seg col-min" style="margin-top: 40px;">Seudónimo o correo</div>
        <input type="text" placeholder="Ingrese Seudónimo o correo" class="nick-u let-seg" id="AliasCor" name="namein" maxlength="50" onpaste="return false"  />
        <div id="InfoAliasCorre"></div>
        <div class="pass-u col-min">Contraseña</div>
        <input type="password" name="contra" placeholder="Ingrese contraseña" class="passk-u col-primary let-seg" id="ContraS" maxlength="15" onpaste="return false" />
        <i class="ico-pass" id="OjoPun"></i>
        <div id="InfoContras"></div>
        <div class="Olv let-seg" id="Olvidast">¿Olvidaste tu contraseña. ?</div>
         <div class="Aly let-seg" id="helpay">¿Necesitas ayuda. ?</div>
        <div class="Regis let-seg" id="registaho">Registrate ahora.</div>
        <button type="submit" class="ColorDominante" id="En-sub">
            <i class="ico-send"></i>
        </button>
    </form>`);
    
}
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
    localStorage.setItem("sesion", 'inicio');
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
    $('#THeader').css('display','none');
        $('#Publica').empty();
        $('#Publica').append(`<i class="IcoLogo"></i><div class="Top-text col-min full-primary" >Espere ...</div><div class="versi let-ter">Versión 1.0.0</div>
                               
                              <label class="contain" id="terminos">Aceptar terminos y condiciones.
                                  <input type="checkbox" value="1" checked>
                                  <span class="checkmark"></span>
                                </label>
                              </div>`);
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
            $('#Publica').empty();
            $('#Publica').append(`<i class="appfser"></i><div class="smservi col-min full-primary bg-blod">APP Fuera de servicio.</div>`);
        }
        else if(data == 'Mantenimiento'){
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
