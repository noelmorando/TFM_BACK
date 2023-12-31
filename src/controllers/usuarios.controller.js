const UsuarioModel = require('../models/usuario.model')
bcrypt = require('bcryptjs');
const { createToken } = require('../helpers/utils');
const nodemailer = require("nodemailer")
/**
 * Recupera todos los usuarios de la base de datos.
 * @param {any} req 
 * @param {any} res 
 */
const register = async (req, res) => {
    try {
        //Encriptamos la password
        const hashedPassword = bcrypt.hashSync(req.body.pass, 8);
        const {nombre, apellidos, mail,rol, foto, tel, pxh,experiencia,lat,lon} = req.body
        let result
        // Inserta el usuario en la base de datos
        if (rol=="prof"){
            [result] = await UsuarioModel.insertUsuario({ nombre, apellidos, mail, pass: hashedPassword,rol, foto, tel, pxh, experiencia, lat, lon })
        }else{
            [result] = await UsuarioModel.insertUsuario({ nombre, apellidos, mail, pass: hashedPassword,rol })
        }
        // Configurar nodemailer con las credenciales de Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unirunir22@gmail.com', 
                pass: 'vwdq swox luov icis' 
            }
        })
        if(rol!='admin'){
            // Opciones del correo electrónico
            const mailOptions = {
                from: 'unirunir22@gmail.com', 
                to: ['unirunir22@gmail.com', 'adrianvicaria@gmail.com', 'maraltaba@hotmail.com', 'apicosala@gmail.com','New-neko@hotmail.com'], 
                subject: 'Bienvenido a TeacherApp 😊',
                html: `<html>
                    <head>
                        <style>
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                            padding: 15px;
                        }
                        </style>
                    </head>
                    <body>
                    <div class="container">
                        <p>Estamos encantados de tenerte como ${rol == "prof" ? "profesor" : "alumno"}!</p>
                        <p>No olvides completar tus datos personales ${rol == "prof" ? "y profesionales para que tus futuros alumnos te encuentren más rápido." : "para que puedas encontrar a tu profesor ideal rápidamente."}</p>
                        <p>Éxitos en tus clases!</p>
                    </div>
                    </body>
                    <img style="width: 300px; height: 300px; float: right;" src="https://media.licdn.com/dms/image/C4D0BAQFnjt7j0rjCmg/company-logo_200_200/0/1631335908449?e=2147483647&v=beta&t=dUlVE-1rRwiQSRJt4Yvam1Eg9hK-OVJ7X07lMsfZzMU" alt="Logo" />
                    </html>`
            }
            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Correo electrónico enviado: ' + info.response);
            })
        }
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ fatal: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { mail, pass } = req.body;
        // Realiza una consulta para obtener el usuario por correo electrónico
        const query = 'SELECT * FROM usuarios WHERE mail = ?';
        const [rows, fields] = await db.query(query, [mail]);

        if (!rows || !rows.length) {
            return res.json({ fatal: 'Error en email y/o password' });
        }
        const usuario = rows[0];

        //¿Coincide la password de la BBDD con la del body(login)
        const equals = bcrypt.compareSync(pass, usuario.pass);
        if (!equals) {
            return res.json({ fatal: 'Error en email y/o password' });
        }
        res.status(200).json({
            success: 'Login correcto!!',
            token: createToken(usuario)
        });
        
    } catch (error) {
        res.status(500).json({ fatal: error.message });
    }
};

const insertFirstClase = async (req,res) => {
    const { profesorId } = req.params
    const profesor_id = parseInt(profesorId)
    const { alumno_id, especialidades_id } = req.body
    try {
        const [result] = await UsuarioModel.createConexion(profesor_id,{alumno_id,especialidades_id})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({fatal: error.message})
    }
}
/**
 * Recupera todos los usuarios.
 * @param {any} req 
 * @param {any} res 
 */
const getAllUsuarios = async (req, res) => {
    try {
        const [result] = await UsuarioModel.SelectAllUsuarios()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera todos los usuarios por página.
 * @param {any} req 
 * @param {any} res 
 */
const getAllUsuariosByPage = async (req, res) => {
    const {p = 1} = req.query;
    const {limit = 10} = req.query;

    try {
        const [result] = await UsuarioModel.SelectAllUsuarios(parseInt(p),parseInt(limit))
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * Recupera los datos de un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const getUsuarioById = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const usuario_id = parseInt(usuarioId)
        const [result] = await UsuarioModel.selectUsuarioById(usuario_id);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * trae los datos del profesor a traves de la tabla conexion.
 * @param {any} req 
 * @param {any} res 
 */
const getInfoProfesorByConexion = async (req,res) => {
    try {
        const {profesorId} = req.params
        const profesor_id = parseInt(profesorId)
        const [result] = await UsuarioModel.selectProfesorByConexion(profesor_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera las clases de un usuario (sea profesor o alumno), enviando como parámetros usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const getClasesByUsuarioId = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const usuario_id = parseInt(usuarioId)
        const [result] = await UsuarioModel.selectClasesByUsuarioId(usuario_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera las especialidades de un profesor cuyo Id es profesorId.
 * @param {any} req 
 * @param {any} res 
 */
const getEspecialidadByProfesorId = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const [result] = await UsuarioModel.selectEspecialidadesByProfesorId(profesor_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera el chat del profesor-alumno, pasandole como parámetro el Id del profesor y el Id del alumno, en ese orden.
 * @param {any} req 
 * @param {any} res 
 */
const getChatByUsuariosId = async (req, res) => {
    try {
        const { profesorId, alumnoId } = req.params
        const profesor_id = parseInt(profesorId)
        const alumno_id = parseInt(alumnoId)
        const [result] = await UsuarioModel.selectChatByUsuariosId(profesor_id, alumno_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera las puntuaciones de un profesor.
 * @param {any} req 
 * @param {any} res 
 */
const getPuntuacionesByProfesorId = async (req, res) => {
    try {
        const { profesorId,alumnoId } = req.params
        const profesor_id = parseInt(profesorId)
        const alumno_id = parseInt(alumnoId)
        const [result] = await UsuarioModel.selectPuntuacionesByprofesorId(profesor_id,alumno_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera las puntuaciones.
 * @param {any} req 
 * @param {any} res 
 */
const getPuntuaciones = async (req, res) => {
    try {
        const { profesorId,alumnoId } = req.params
        const profesor_id = parseInt(profesorId)
        const alumno_id = parseInt(alumnoId)
        const [result] = await UsuarioModel.selectPuntuaciones(profesor_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Recupera los alumnos de un profesor.
 * @param {any} req 
 * @param {any} res 
 */
const getAlumnosByProfesorId = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const [result] = await UsuarioModel.selectAlumnosByprofesorId(profesor_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * Recupera las clases entre un profesor y un alumno, enviando como parámetros profesorId y alumnoId, en ese orden. Especialidades_id se recupera desde el body
 * @param {any} req 
 * @param {any} res 
 */
const getClasesByUsuariosId = async (req, res) => {
    try {
        const { profesorId, alumnoId,especialidadId } = req.params
        const profesor_id = parseInt(profesorId)
        const alumno_id = parseInt(alumnoId)
        const especialidades_id = parseInt(especialidadId)
        const [result] = await UsuarioModel.selectClasesByUsuariosId(profesor_id, alumno_id, especialidades_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Crea una petición de solicitud para que el profesor acepte al alumno. 
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertAlumnoByProfesorId = async (req,res) => {
    try {
        const {profesorId,alumnoId, especialidadId} = req.params
        const profesor_id = parseInt(profesorId)
        const alumno_id = parseInt(alumnoId)
        const especialidad_id = parseInt(especialidadId)
        if(!alumno_id){
            return res.status(400).json({ fatal: "ID del alumno no proporcionado" })
        }
        const [result] = await UsuarioModel.insertAlumnosByProfesorId(profesor_id,alumno_id,especialidad_id)
        // Configurar nodemailer con las credenciales de Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unirunir22@gmail.com', 
                pass: 'vwdq swox luov icis' 
            }
        })
        // Opciones del correo electrónico
        const mailOptions = {
            from: 'unirunir22@gmail.com', 
            to: ['unirunir22@gmail.com', 'adrianvicaria@gmail.com', 'maraltaba@hotmail.com', 'apicosala@gmail.com','New-neko@hotmail.com'], 
            subject: 'Nueva solicitud de conexión.',
            html: `<html>
                    <head>
                        <style>
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                            padding: 15px;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <p>Hola!</p>
                        <p>Tienes una nueva solicitud de conexión.</p>
                        <p>Entra a la sección "Mis Alumnos" para aceptar o rechazar al alumno.</p>
                        </div>
                    </body>
                    <img style="width: 300px; height: 300px; float: right;" src="https://media.licdn.com/dms/image/C4D0BAQFnjt7j0rjCmg/company-logo_200_200/0/1631335908449?e=2147483647&v=beta&t=dUlVE-1rRwiQSRJt4Yvam1Eg9hK-OVJ7X07lMsfZzMU" alt="Logo" />
                    </html>`
        }
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo electrónico enviado: ' + info.response);
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * El profesor, cuyo Id es profesorId, tomado de la ruta, crea una nueva clase.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertClaseByProfesor = async (req, res) => {
    try {
        const { profesorId } = req.params
        const profesor_id = parseInt(profesorId)
        const { alumno_id, fecha,especialidades_id } = req.body
        if (!especialidades_id) {
            return res.status(400).json({ fatal: "especialidades_id proporcionado" })
        } else if (!alumno_id) {
            return res.status(400).json({ fatal: "alumno_id no proporcionado" })
        } else if (!fecha) {
            return res.status(400).json({ fatal: "fecha no proporcionada" })
        }
        const [result] = await UsuarioModel.insertClaseByProfesorId(profesor_id, req.body)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unirunir22@gmail.com', 
                pass: 'vwdq swox luov icis' 
            }
        })
        // Opciones del correo electrónico
        const mailOptions = {
            from: 'unirunir22@gmail.com', 
            to: ['unirunir22@gmail.com', 'adrianvicaria@gmail.com', 'maraltaba@hotmail.com', 'apicosala@gmail.com','New-neko@hotmail.com'], //al alumno
            subject: 'Nueva clase agendada.',
            html: `<html>
                    <head>
                        <style>
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                            padding: 15px;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <p>Hola!</p>
                        <p>Tienes una nueva clase pendiente.</p>
                        <p>Entra a la sección "Mis Clases" para ver la fecha de la clase.</p>
                        </div>
                    </body>
                    <img style="width: 300px; height: 300px; float: right;" src="https://media.licdn.com/dms/image/C4D0BAQFnjt7j0rjCmg/company-logo_200_200/0/1631335908449?e=2147483647&v=beta&t=dUlVE-1rRwiQSRJt4Yvam1Eg9hK-OVJ7X07lMsfZzMU" alt="Logo" />
                    </html>`
        }
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo electrónico enviado: ' + info.response);
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * Agrega un nuevo comentario al chat.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const insertChatByUsersId = async (req, res) => {
    try {
        const { profesorId,alumnoId } = req.params
        const profesor_id = parseInt(profesorId)
        const alumno_id = parseInt(alumnoId)
        const { comentarios } = req.body
        if (!alumnoId && !comentarios) {
            return res.status(400).json({ fatal: "alumno_id y comentarios no proporcionados" })
        } else if (!alumno_id) {
            return res.status(400).json({ fatal: "alumno_id no proporcionado" })
        } else if (!comentarios) {
            return res.status(400).json({ fatal: "comentarios no proporcionado" })
        }
        const [result] = await UsuarioModel.insertChatByUsersId(profesor_id,alumno_id, comentarios)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unirunir22@gmail.com', 
                pass: 'vwdq swox luov icis' 
            }
        })
        // Opciones del correo electrónico
        const mailOptions = {
            from: 'unirunir22@gmail.com', 
            to: ['unirunir22@gmail.com', 'adrianvicaria@gmail.com', 'maraltaba@hotmail.com', 'apicosala@gmail.com','New-neko@hotmail.com'], 
            subject: 'Nuevo mensaje en el foro.',
            html: `<html>
                    <head>
                        <style>
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                            padding: 15px;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <p>Hola!</p>
                        <p>Se ha agregado un nuevo mensaje en el foro.\nMensaje:${comentarios}</p>
                        </div>
                    </body>
                    <img style="width: 300px; height: 300px; float: right;" src="https://media.licdn.com/dms/image/C4D0BAQFnjt7j0rjCmg/company-logo_200_200/0/1631335908449?e=2147483647&v=beta&t=dUlVE-1rRwiQSRJt4Yvam1Eg9hK-OVJ7X07lMsfZzMU" alt="Logo" />
                    </html>`
        }
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo electrónico enviado: ' + info.response);
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Inserta una opinión con puntuación a un usuario
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const insertOpinionByUserId = async (req, res) => {
    try {
      const { profesor_id, alumno_id, puntuacion, comentarios } = req.body;
  
      // Validar que profesorId no sea null
      if (profesor_id === null || profesor_id === undefined) {
        return res.status(400).json({ error: 'profesorId no puede ser null' });
      }
  
      // Lógica para insertar en la base de datos
      const result = await UsuarioModel.insertRatingByAlumn(profesor_id, alumno_id, puntuacion, comentarios);

      // Enviar respuesta exitosa
      res.status(201).json({ message: 'Opinión insertada exitosamente', result });
    } catch (error) {
      console.error('Error al insertar opinión:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  
/**
 * Actualiza los datos de un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const updateUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const {activo} = req.body
        const usuario_id = parseInt(usuarioId)
        const [result] = await UsuarioModel.updateUsuarioById(usuario_id, req.body)
        // Configurar nodemailer con las credenciales de Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unirunir22@gmail.com', 
                pass: 'vwdq swox luov icis' 
            }
        })
        // Opciones del correo electrónico
        const mailOptions = {
            from: 'unirunir22@gmail.com', 
            to: ['unirunir22@gmail.com', 'adrianvicaria@gmail.com', 'maraltaba@hotmail.com', 'apicosala@gmail.com','New-neko@hotmail.com'], //al alumno
            subject: `${activo===false ? "Te vamos a extrañar 😔" : "Ya estás dado de alta!"}`,
            html: `<html>
                    <head>
                        <style>
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                            padding: 15px;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        ${activo===false ? "<p>Lamentamos que debas irte de nuestra página, pero siempre serás bienvenido.</p><p>Esperemos que no sea un adiós sino un hasta pronto!</p>" : "<p>Nuestros admins ya te han dado de alta para que puedas comenzar a dar clases.</p><p>Te deseamos muchos éxitos!</p>"}
                        </div>
                    </body>
                    <img style="width: 300px; height: 300px; float: right;" src="https://media.licdn.com/dms/image/C4D0BAQFnjt7j0rjCmg/company-logo_200_200/0/1631335908449?e=2147483647&v=beta&t=dUlVE-1rRwiQSRJt4Yvam1Eg9hK-OVJ7X07lMsfZzMU" alt="Logo" />
                    </html>`
        }
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo electrónico enviado: ' + info.response);
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
const updateUsuarioForm = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const {activo} = req.body
        const usuario_id = parseInt(usuarioId)
        updatedBody = req.body;           

        //¿Coincide la password de la BBDD con la del body(login)
        const query = 'SELECT pass FROM usuarios WHERE id = ?';
        const [pass] = await db.query(query, usuario_id);
               
        const equals = bcrypt.compareSync(updatedBody.pass, pass[0].pass);
        
        if (!equals) {
           return res.json({ fatal: 'Error en email y/o password' }); 
        } 

        if(updatedBody.newPass !==""){
            updatedBody.pass = bcrypt.hashSync(updatedBody.newPass, 8);
        }else {
            updatedBody.pass = bcrypt.hashSync(updatedBody.pass, 8);
        }
        
        const [result] = await UsuarioModel.updateUsuarioById(usuario_id, updatedBody)
        res.status(200).json({
            success: 'Update correcto'
        });
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * El profesor acepta la petición de conexión del alumno. El Id del alumno es proporcionado en el body, mientras que el Id del profesor es proporcionado en la ruta.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const updateAlumnoByProfesorId = async (req,res) => {
    try {
        const {profesorId,alumnoId, especialidadId} = req.params
        const profesor_id = parseInt(profesorId)
        if(!alumnoId){
            return res.status(400).json({ fatal: "ID del alumno no proporcionado." })
        }
        const alumno_id = parseInt(alumnoId)
        const esp_id = parseInt(especialidadId)
        const [result] = await UsuarioModel.updateAlumnosByProfesorId(profesor_id,alumno_id,esp_id)
        
        // Configurar nodemailer con las credenciales de Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unirunir22@gmail.com', 
                pass: 'vwdq swox luov icis' 
            }
        })
        // Opciones del correo electrónico
        const mailOptions = {
            from: 'unirunir22@gmail.com', 
            to: ['unirunir22@gmail.com', 'adrianvicaria@gmail.com', 'maraltaba@hotmail.com', 'apicosala@gmail.com','New-neko@hotmail.com'], //al alumno
            subject: 'Solicitud de conexión aceptada.',
            html: `<html>
                    <head>
                        <style>
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                            padding: 15px;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <p>Hola!</p>
                        <p>El profesor aceptó la solicitud!</p><p>Ya puedes coordinar una fecha para tu primera clase.</p>
                        </div>
                        <img style="width: 300px; height: 300px; float: right;" src="https://media.licdn.com/dms/image/C4D0BAQFnjt7j0rjCmg/company-logo_200_200/0/1631335908449?e=2147483647&v=beta&t=dUlVE-1rRwiQSRJt4Yvam1Eg9hK-OVJ7X07lMsfZzMU" alt="Logo" />
                        </html>`
        }
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo electrónico enviado: ' + info.response);
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Elimina un usuario cuyo Id es usuarioId.
 * @param {any} req 
 * @param {any} res 
 */
const deleteUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params
        const usuario_id = parseInt(usuarioId)
        const [result] = await UsuarioModel.deleteUsuarioById(usuario_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
/**
 * Elimina una especialidad de un profesor.
 * @param {any} req 
 * @param {any} res 
 */
const deleteEspecialidadByUsuario = async (req, res) => {
    try {
        const { profesorId, especialidadId } = req.params
        const profesor_id = parseInt(profesorId)
        const esp_id = parseInt(especialidadId)
        const [result] = await UsuarioModel.deleteEspecialidadByUsuarioById(profesor_id, esp_id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

/**
 * Elimina una clase de un profesor cuyo Id es profesorId, tomado de la ruta, cuyo Id del alumno es alumno_id
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const deleteClaseByProfesorId = async (req, res) => {
    try {
        const {id} = req.params
        console.log("controller")
        ID = parseInt(id)
        if (!id) {
            return res.status(400).json({ fatal: "id no proporcionado" })
        }         
        // Configurar nodemailer con las credenciales de Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unirunir22@gmail.com', 
                pass: 'vwdq swox luov icis' 
            }
        })
        // Opciones del correo electrónico
        const mailOptions = {
            from: 'unirunir22@gmail.com', 
            to: ['unirunir22@gmail.com', 'adrianvicaria@gmail.com', 'maraltaba@hotmail.com', 'apicosala@gmail.com','New-neko@hotmail.com'], //al alumno
            subject: 'Clase suspendida.',
            html: `<html>
                    <head>
                        <style>
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                            padding: 15px;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <p>Hola!</p>
                        <p>Se ha cancelado la clase agendada con el profesor.</p>
                        </div>
                        <img style="width: 300px; height: 300px; float: right;" src="<img style="width: 300px; height: 300px; float: right;" src="https://media.licdn.com/dms/image/C4D0BAQFnjt7j0rjCmg/company-logo_200_200/0/1631335908449?e=2147483647&v=beta&t=dUlVE-1rRwiQSRJt4Yvam1Eg9hK-OVJ7X07lMsfZzMU" alt="Logo" />" alt="Logo" />
                        </html>`
        }
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo electrónico enviado: ' + info.response);
        })
        const result = await UsuarioModel.deleteClaseByProfesorIdByClaseId(ID);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}
const sendRequest= async (req,res) => {
    try {
        const {usuarioId} = req.params
        const {nombre, apellidos, mail, activo} = req.body
        console.log(usuarioId)
        // Configurar nodemailer con las credenciales de Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unirunir22@gmail.com', 
                pass: 'vwdq swox luov icis' 
            }
        })
        // Opciones del correo electrónico
        const mailOptions = {
            from: 'unirunir22@gmail.com', 
            to: ['unirunir22@gmail.com', 'adrianvicaria@gmail.com', 'maraltaba@hotmail.com', 'apicosala@gmail.com','New-neko@hotmail.com'], //al alumno
            subject: activo === 0 ? 'Solicitud de Alta' : 'Solicitud de Baja',
            html: `<html>
                    <head>
                        <style>
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                            padding: 15px;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <p>Hola!</p>
                        ${activo === 0 ? 
                            `<p>El usuario ${nombre} ${apellidos} con mail: ${mail} y id: ${usuarioId} ha pedido el alta nuevamente.</p>` : 
                            `<p>El usuario ${nombre} ${apellidos} con mail: ${mail} y id: ${usuarioId} ha pedido la baja.</p>`}
                        </div>
                        <img style="width: 300px; height: 300px; float: right;" src="https://media.licdn.com/dms/image/C4D0BAQFnjt7j0rjCmg/company-logo_200_200/0/1631335908449?e=2147483647&v=beta&t=dUlVE-1rRwiQSRJt4Yvam1Eg9hK-OVJ7X07lMsfZzMU" alt="Logo" />
                        </html>`
        }
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo electrónico enviado: ' + info.response);
        })
    } catch (error) {
        console.log(error)
    }
}
/**
 * El profesor rechaza la solicitud de conexión del alumno. El Id del alumno es proporcionado en el cuerpo de la solicitud, mientras que el Id del profesor es proporcionado en la ruta.
 * @param {any} req 
 * @param {any} res 
 * @returns any
 */
const deleteAlumnoByProfesorId = async (req,res) => {
    try {
        const {profesorId,alumnoId,especialidadId} = req.params
        const profesor_id = parseInt(profesorId)
        if(!alumnoId || !especialidadId){
            return res.status(400).json({ fatal: "ID del alumno o ID de la especialidad no proporcionados" })
        }
        const alumno_id = parseInt(alumnoId)
        const especialidad_id = parseInt(especialidadId)
        const [result] = await UsuarioModel.deleteAlumnosByProfesorId(profesor_id,alumno_id,especialidad_id)
        
        // Configurar nodemailer con las credenciales de Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unirunir22@gmail.com', 
                pass: 'vwdq swox luov icis' 
            }
        })
        // Opciones del correo electrónico
        const mailOptions = {
            from: 'unirunir22@gmail.com', 
            to: ['unirunir22@gmail.com', 'adrianvicaria@gmail.com', 'maraltaba@hotmail.com', 'apicosala@gmail.com','New-neko@hotmail.com'], //al alumno
            subject: 'Solicitud de conexión rechazada.',
            html: `<html>
                    <head>
                        <style>
                        .container {
                            max-width: 1000px;
                            margin: 0 auto;
                            padding: 15px;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                        <p>Hola!</p>
                        <p>Lamentablemente el profesor rechazó tu solicitud de conexión. Pero no te preocupes! Puedes encontrar otros profesores cerca tuyo.</p><p>Ánimo!</p>
                        </div>
                        <img style="width: 300px; height: 300px; float: right;" src="https://media.licdn.com/dms/image/C4D0BAQFnjt7j0rjCmg/company-logo_200_200/0/1631335908449?e=2147483647&v=beta&t=dUlVE-1rRwiQSRJt4Yvam1Eg9hK-OVJ7X07lMsfZzMU" alt="Logo" />
                        </html>`
        }
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo electrónico enviado: ' + info.response);
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ fatal: error.message })
    }
}

module.exports = { getAllUsuarios, getAllUsuariosByPage, updateUsuario, updateUsuarioForm, deleteUsuario, getUsuarioById, getClasesByUsuarioId, getEspecialidadByProfesorId, getChatByUsuariosId, getPuntuacionesByProfesorId, getAlumnosByProfesorId, getClasesByUsuariosId, deleteEspecialidadByUsuario, deleteClaseByProfesorId, insertClaseByProfesor, insertChatByUsersId, login, register,insertAlumnoByProfesorId,updateAlumnoByProfesorId,deleteAlumnoByProfesorId,getInfoProfesorByConexion, insertOpinionByUserId,getPuntuaciones,sendRequest,insertFirstClase }