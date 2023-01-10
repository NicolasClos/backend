const socket = io.connect();

const d = document;

const form = d.getElementById('form');
const username = d.getElementById('username');
const password = d.getElementById('password');

form.addEventListener('submit', e=>{
    e.preventDefault();
    
    const objeto = {
        username: username.value,
        password: password.value
    }

    console.log(objeto);

    socket.emit('nombreEvento', objeto);

    console.log('ENVIADO!');

    username.value = '';
    password.value = '';
})