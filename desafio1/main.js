class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    };

    getFullName(){
        console.log(`Su nombre completo es ${this.nombre} ${this.apellido}`)
    };
    addMascota(nuevaMascota){
        this.mascotas.push(nuevaMascota)
    };
    countMascotas(){
        if(this.mascotas == 1){
            console.log(`Tiene ${this.mascotas.length} mascota`);
        } else{
            console.log(`Tiene ${this.mascotas.length} mascotas`);
        }
        
    };
    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor})
    };
    getBookNames(){
        const listadoLibros = this.libros.map(libro=>libro.nombre);
        console.log(listadoLibros)
    };
};

const nuevoUsuario = new Usuario('Nicolas', 'Clos', [{nombre: "LIBRO 1", autor: "AUTOR 1"},{nombre: 'LIBRO 2', autor: 'AUTOR 2'}], [])

console.log(nuevoUsuario)

nuevoUsuario.getFullName();

nuevoUsuario.addMascota("Rene Nicolas");

nuevoUsuario.countMascotas();

nuevoUsuario.addBook('¿Como criar mascotas que son tutores?','Nicolas Clos');

// ES CHISTE NO SE ME ENOJE :)

nuevoUsuario.getBookNames()
