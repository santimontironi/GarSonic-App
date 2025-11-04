import multer from "multer"; // Importa la librería multer, que sirve para manejar archivos subidos en peticiones HTTP.
import path from "path";

const storage = multer.diskStorage({
  // Define la carpeta donde se guardarán los archivos subidos ("uploads/").
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  }, 

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
  // Genera un nombre único para cada archivo usando la fecha y un número aleatorio y le añade la extensión original del archivo.
});

export const upload = multer({ storage: storage });