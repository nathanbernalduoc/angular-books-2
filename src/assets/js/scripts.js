function clienteRegistrar() {

    console.log(document.getElementById('contrasena1').value.length);

    if (
        document.getElementById('usuario').value.trim() == '' ||
        document.getElementById('contrasena1').value.trim() == '' ||
        document.getElementById('contrasena2').value.trim() == '' ||
        document.getElementById('nombre').value.trim() == '' ||
        document.getElementById('fecha').value.trim() == ''
    ) {

        document.getElementById('check_msg').innerHTML = '<h3>Todos los campos son obligatorios</h3>';
        setTimeout("document.getElementById('check_msg').innerHTML = '';", 3000);
        return false;

    } else if (document.getElementById('contrasena1').value.length < 6 || document.getElementById('contrasena1').value.length > 18) {

        document.getElementById('check_pass').innerHTML = '<h3>La contrase&ntilde;a debe tener como m&iacute;nimo 6 caracteres y un m&aacute;ximo de 18 caracteres.</h3>';
        setTimeout("document.getElementById('check_pass').innerHTML = '';", 3000);
        return false;

    } else if (document.getElementById('contrasena1').value != document.getElementById('contrasena2').value != '') {

        document.getElementById('check_pass').innerHTML = '<h3>Las contrase&ntilde;as no coinciden.</h3>';
        setTimeout("document.getElementById('check_pass').innerHTML = '';", 3000);
        return false;

    } else if (!buscarMayuscula(document.getElementById('contrasena1').value)) {

        document.getElementById('check_pass').innerHTML = '<h3>La contraseña debe contener una letra.</h3>';
        setTimeout("document.getElementById('check_pass').innerHTML = '';", 3000);
        return false;

    }

    var edad = checkEdad(document.getElementById('fecha').value);
    console.log("Edad "+edad);
    if (edad < 13) {

        document.getElementById('check_edad').innerHTML = '<h3>El nuevo cliente no puede tener menos de 13 a&ntilde;os.</h3>';
        setTimeout("document.getElementById('check_edad').innerHTML = '';", 3000);
        return false;

    }

    alert('Nuevo cliente registrado!');

    clienteLimpiar();

}

function buscarMayuscula(s) {

    var pattern1 = new RegExp(/[0-9]/);
    var pattern2 = new RegExp(/[A-Z]/);
    return (pattern1.test(s) && pattern2.test(s));
    
}

function formularioLimpiar() {

    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('publicacion').value = '';
    document.getElementById('categoria').value = '';

}

