<?php
// Faire un lien symbolique pour faire tourner en local
// ln -s donnees.php ~/Sites/donnees.php
$pdo = new PDO("mysql:host=plopix.net;port=18106;dbname=ANACHARDAN_CW;charset=utf8", 'ananas', 'an47@s35assB');
$query = $pdo->prepare("SELECT Code_Album, Titre_Album, Année_Album FROM Album ORDER BY RAND() LIMIT 10");
header('Content-Type: application/json');
$query->execute();
echo json_encode($query->fetchAll(PDO::FETCH_ASSOC));
?>