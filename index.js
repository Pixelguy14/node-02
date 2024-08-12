import express from "express"
import bodyParser from "body-parser"
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import serviceAccount from "./config/firebaseServiceAccount.json"

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

//Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Escuchando el puerto: ${PORT}`)
})