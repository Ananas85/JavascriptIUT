<?php
$pdo = new PDO("mysql:host=plopix.net;port=18106;dbname=ANACHARDAN_CW;charset=utf8", 'ananas', 'an47@s35assB');
$query = $pdo->prepare("SELECT Pochette FROM Album WHERE Code_Album = :code LIMIT 1");

header('Content-Type: image/jpeg');
header('Content-Transfer-Encoding: binary');
$query->execute([':code' => $_GET['code']]);
while ($row = $query->fetch())
    echo $row['Pochette'];
