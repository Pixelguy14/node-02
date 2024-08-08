import express from "express"
import bodyParser from "body-parser"
import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
//import serviceAccount from "ruta"

const app = express()
const PORT = process.env.PORT || 3010

//Configuracion de Firebase

//Operaciones CRUD

//Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Escuchando el puerto: ${PORT}`)
})