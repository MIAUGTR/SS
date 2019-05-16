//CONEXIÓN A LA BBDD DE COUCHDB
const _ = require('lodash');
const couchDb = require('node-couchdb');
const couch = new couchDb({
	auth : {
		user: 'MIAUGTR',
		password: '123456'
	}
});

const usuarios = 'users';
const listarUsuarios = '_design/all_users/_view/listUsers';

exports.getUsers = _ =>
	couch.get(usuarios, listarUsuarios);

exports.addUser = data => {
    return couch.uniqid().then(function (ids) {
        const id = ids[0];
        return couch.insert('users', {
            _id: id,
            givenName: data.givenName,
            familyName: data.familyName,
            email: data.email
        });
    });
};

exports.getUser = id =>
	couch.get(usuarios, id);

exports.updateUser = (id, data) =>
	couch.update(usuarios, {
		_id: id,
		_rev: data.rev,
		givenName: data.name,
		familyName: "miau",
		telephone: data.telephone,
		email: data.email
	});


exports.deleteUser = (id, rev) =>
	couch.del(usuarios, id, rev);





//Lista las Bases de datos
/*couch.listDatabases().then(function(dbs){
	console.log(dbs);
});*/

/*exports.principal = _ => {
	return couch.get(dbName, viewUrl).then(function (data, header, status) {
		express.static('public', {usuarios: data.data.rows});
	}, function(err){
		res.send(err);
	});
};*/

/*couch.get(dbName, viewUrl).then(function(data, headers, status){

	console.log(data.data.rows);
}, function(err){
	res.send(err);
});*/


//ESTA PARTE SOLO SE USA PARA CREAR DOCUMENTOS EN LA BBDD
/*let idDocument = "Users"; //Indica el ID del documento. En este caso es Users porque creamos ese documento
let user = {
    userId: 1,
    givenName: "Marius",
    familyName: "Mladinovici Danaila",
    gender: "Male"
};

db.saveDoc(idDocument, user, function(err, doc){
    if(err){
        console.log(JSON.stringify((err)))
    }else{
        console.log('Saved user name');
    }
});*/

//LECTURA DATOS DE LA BBDD
//Usuarios
/*
db.getDoc('Users', function(err, doc){
	if(err){
		console.log((JSON.stringify(err)))
	}else{
		console.log(doc);
	}
});

//Personal médico
db.getDoc('Doctors', function(err, doc){
	if(err){
		console.log((JSON.stringify(err)))
	}else{
		console.log(doc);
	}
});

//Pacientes
db.getDoc('Patients', function(err, doc){
	if(err){
		console.log((JSON.stringify(err)))
	}else{
		console.log(doc);
	}
});

//Informes
db.getDoc('Reports', function(err, doc){
	if(err){
		console.log((JSON.stringify(err)))
	}else{
		console.log(doc);
	}
});

//MODIFICACION DATOS DE LA BBDD
//Usuarios
db.getDoc('Users', function(err, doc){
	if(err){
		console.log((JSON.stringify(err)))
	}else{
		doc.insert()
		doc.givenName = "Marius";
		doc.familyName = "Mladinovici Danaila";
		doc.telephone = "642818720";
		doc.email = "al315550@uji.es";
		db.saveDoc('Users', doc);

		//Comprobamos que se ha modificado con éxito
		db.getDoc('Users', function(err, doc){
			console.log(doc);
		});
	}
});*/

// const _ = require('lodash');
//
// //DATABASE
// //User   {id: int, name: String , email: String}
// //Reports   {id: int, information: String , author: User.id}
// //ReportsUser  {'userId':{'report1': .., 'report2': ...}}
//
// let Users = {};
// let Doctors = {};
// let Patients = {};
// let Reports = {};
//
// //Funcionalidad añadir
// exports.createUser = data =>
// 	new Promise((accept, reject) => {
// 		//check if user data is right
// 		if (Users[data.userId] === data) {
// 			reject("Ya existe un usuario con los mismos datos")
// 		}
// 		if (data !== '') {
// 			Users[data.userId] = data;
// 			accept(data)
// 		} else {
// 			accept(false)
// 		}
// 	});
//
// //Funcionalidad listar
// //Usuarios normales
// exports.getUsers = _ => {
// 	return new Promise((accept, reject) => {
// 		let data = Object.keys(Users).map(k => {
// 			return {
// 				userId: Users[k].userId,
// 				givenName: Users[k].givenName,
// 				familyName: Users[k].familyName,
// 				gender: Users[k].gender
// 			}
// 		});
// 		accept(data)
// 	});
// };
//
// exports.getUser = id => {
// 	if (Users[id]) return [Users[id]];
// 	else return []
// };
//
// //Funcionalidad modificar
// exports.updateUser = (userId, data) => new Promise((accept, reject) => {
// 	if (Users[userId]) {
// 		Users[userId] = data;
// 		accept(true);
// 	} else {
// 		reject("No existe el usuario");
// 	}
// });
//
// //Funcionalidad borrar
// exports.deleteUser = userId => {
// 	return new Promise((accept, reject) => {
// 		if (Users[userId]) {
// 			delete (Users[userId]);
// 			accept("La eliminación del usuario tuvo éxito");
// 		} else {
// 			reject("El usuario que desea eliminar no existe en la BBDD");
// 		}
// 	});
// };

