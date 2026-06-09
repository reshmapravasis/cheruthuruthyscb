<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data
    $name = strip_tags(trim($_POST["name"]));
    $email = isset($_POST["email"]) ? strip_tags(trim($_POST["email"])) : "Not provided";
    $phone = strip_tags(trim($_POST["phone"]));
    $message = strip_tags(trim($_POST["message"]));

    $mail = new PHPMailer(true);

    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'sms.pravasisitsolutions@gmail.com';               // SMTP username
        $mail->Password   = 'ncrnjsrzafnogbsx';        // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('sms.pravasisitsolutions@gmail.com', 'Cheruthuruthy Service Co-operative Bank');
        $mail->addAddress('coopbank121@gmail.com');
        if ($email !== "Not provided") {
            $mail->addReplyTo($email, $name);
        }

        // Content
        $mail->isHTML(false);
        $mail->Subject = "New Inquiry from Website - $name";
        $formatted_phone = (strlen($phone) === 10) ? "+91 " . $phone : $phone;
        
        $mail_body = "You have received a new message from the contact form:\n\n";
        $mail_body .= "Name: $name\n";
        $mail_body .= "Email: $email\n";
        $mail_body .= "Phone: $formatted_phone\n\n";
        $mail_body .= "Message:\n$message";

        $mail->Body = $mail_body;

        $mail->send();
        
        // Success response
        echo json_encode(["status" => "success", "message" => "Your message was sent successfully. We will contact you shortly.\n\nനിങ്ങളുടെ സന്ദേശം വിജയകരമായി അയച്ചു. ഞങ്ങൾ ഉടൻ തന്നെ നിങ്ങളെ ബന്ധപ്പെടുന്നതാണ്."]);
        exit;
    } catch (Exception $e) {
        // Error response
        echo json_encode(["status" => "error", "message" => "Sorry, an error occurred while sending the message. Please try again later.\n\nക്ഷമിക്കണം, സന്ദേശം അയക്കുന്നതിൽ ഒരു പിശക് സംഭവിച്ചു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക."]);
        exit;
    }
} else {
    // Not a POST request
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    exit;
}
?>
