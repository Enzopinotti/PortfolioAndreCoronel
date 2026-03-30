<?php
// -----------------------------------------------------------------------
// contact.php – Manejador de formulario de contacto
// Hosting DonWeb – correo de destino: info@andrecovar.com
// -----------------------------------------------------------------------

// Configura aquí el correo de destino
define('DEST_EMAIL', 'info@andrecovar.com');
define('SITE_NAME',  'André Covar Portfolio');

// Cabeceras CORS: permite peticiones desde el dominio del portfolio.
// Si el dominio es otro, cambiarlo aquí.
$allowed_origins = [
    'https://andrecovar.com',
    'https://www.andrecovar.com',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    // En desarrollo local aceptamos cualquier origen (quitar en producción si se desea)
    header('Access-Control-Allow-Origin: *');
}

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Respondemos al preflight OPTIONS de CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Solo aceptamos POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Método no permitido.']);
    exit;
}

// Leer body JSON
$body = file_get_contents('php://input');
$data = json_decode($body, true);

// Sanitizar y validar
$nombre  = trim(strip_tags($data['nombre']  ?? ''));
$email   = trim(strip_tags($data['email']   ?? ''));
$mensaje = trim(strip_tags($data['mensaje'] ?? ''));

$errors = [];
if ($nombre === '')                     $errors[] = 'El nombre es obligatorio.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'El email no es válido.';
if (strlen($mensaje) < 10)             $errors[] = 'El mensaje debe tener al menos 10 caracteres.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// Construir el email
$to      = DEST_EMAIL;
$subject = '=?UTF-8?B?' . base64_encode('[' . SITE_NAME . '] Nuevo mensaje de ' . $nombre) . '?=';

$body_text  = "Nuevo mensaje desde el formulario de contacto del portfolio.\n\n";
$body_text .= "Nombre:  $nombre\n";
$body_text .= "Email:   $email\n\n";
$body_text .= "Mensaje:\n$mensaje\n";

$headers  = "From: " . SITE_NAME . " <noreply@andrecovar.com>\r\n";
$headers .= "Reply-To: $nombre <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$sent = mail($to, $subject, $body_text, $headers);

if ($sent) {
    echo json_encode(['ok' => true, 'message' => '¡Mensaje enviado! Me pondré en contacto pronto.']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Error al enviar el mensaje. Por favor intentá de nuevo o escribime directamente a info@andrecovar.com.']);
}
