"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const test = async (req, res) => {
    const { body } = req;
    const ipPublica = req.headers["x-forwarded-for"] || req.ip;
    const register = await prisma.simulacion.create({
        data: {
            ...body,
            id_public_user: ipPublica,
        },
    });
    if (!register) {
        res.status(400).json({
            msg: "No se pudo guardar",
        });
        return;
    }
    res.status(200).send(`
<!DOCTYPE html> <html lang=""es""> <head>   <meta charset=""UTF-8"">   <title>Voto registrado</title>   <meta name=""viewport"" content=""width=device-width; initial-scale=1"">   <link href=""https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"" rel=""stylesheet"">   <style>     body {       background-color: #f4f6f9;       padding-top: 50px;     }     .card-confirmacion {       max-width: 700px;       margin: auto;       padding: 30px;       border-radius: 10px;       box-shadow: 0 0 12px rgba(0;0;0;0.08);       background-color: #fff;     }     .titulo {       color: #198754;       font-weight: bold;     }     .detalle {       font-size: 1.1rem;     }   </style> </head> <body>   <div class=""card card-confirmacion text-center"">     <h3 class=""titulo mb-4"">¡Tu voto ha sido registrado exitosamente!</h3>     <div class=""detalle text-start"">       <p><strong>Candidato elegido:</strong> Manfred Reyes Villa</p>       <p><strong>Ubicación:</strong> Potosí; Bolivia</p>     </div>     <hr class=""my-4"">     <p class=""text-muted"">Gracias por participar en las <strong>Elecciones Ciudadanas 2025</strong>.</p>     <p class=""text-muted"">Tu voz ha sido registrada y cuenta para el futuro democrático de Bolivia.</p>   </div> </body> </html>
`);
};
exports.test = test;
