import express from "express"
import bodyParser from "body-parser"
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import serviceAccount from "./config/firebaseServiceAccount.json" with {type: 'json'}

const app = express()
const PORT = process.env.PORT || 3010

//Configuracion de Firebase
initializeApp({
    credential: cert(serviceAccount)
})
const db = getFirestore()
const usuariosCollection = db.collection("usuarios")

app.use(bodyParser.json())

//Operaciones CRUD
//Post
app.post('/usuarios', async (req,res) => {
    try{
        const newUser = req.body
        const userRef = await usuariosCollection.add(newUser)
        res.status(201).json({
            id: userRef.id,
            ...newUser
        })
    }catch(error){
        res.status(400).json({
            error: 'No se pudo crear el usuario'
        })
    }
})
//get
app.get('/usuarios', async (req,res) => {
    try{
        const colUsuarios = await usuariosCollection.get()
        const usuarios = colUsuarios.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }))
        res.status(200).json(usuarios)
    }catch(error){
        res.status(400).json({
            error: 'No se pudieron leer los usuarios'
        })
    }
})
//get by id
app.get('/usuarios/:id', async (req,res) => {
    try{
        const UserId = req.params.id
        const userDoc = await usuariosCollection.doc(UserId).get()
        if(!userDoc.exists){
            res.status(400).json({
                error: 'No se pudo encontrar el usuario'
            })  
        }
        else{
            res.status(200).json({
                id: userDoc.id,
                ...userDoc.data()
            })
        }
    }catch(error){
        res.status(400).json({
            error: 'No se pudo leer el usuario mediante el Id'
        })
    }
})
//delete by id
app.delete('/usuarios/:id', async (req,res) => {
    try{
        const userId = req.params.id
        await usuariosCollection.doc(UserId).delete()
        res.status(200).json({
            message: 'El usuario fue borrado exitosamente'
        })
    }catch(error){
        res.status(400).json({
            error: 'No se pudo borrar el usuario mediante el Id'
        })
    }
})
//alter by id
app.put('/usuarios/:id', async (req,res) => {
    try{
        const userId = req.params.id
        const updateUser = req.body
        await usuariosCollection.doc(userId).set(updateUser, {
            merge: true
        })
        res.status(200).json({
            id: userId,
            ...updateUser
        })
    }catch(error){
        res.status(400).json({
            error: 'No se pudo modificar el usuario mediante el Id'
        })
    }
})

//Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Escuchando el puerto: ${PORT}`)
})