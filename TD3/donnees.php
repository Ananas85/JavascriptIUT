<?php
// Faire un lien symbolique pour faire tourner en local
// ln -s donnees.php ~/Sites/donnees.php
$pdo = new PDO("mysql:host=plopix.net;port=18106;dbname=ANACHARDAN_CW;charset=utf8", 'ananas', 'an47@s35assB');
$query = $pdo->prepare("SELECT Nom_Musicien, Prénom_Musicien FROM Musicien WHERE Nom_Musicien LIKE :nom ORDER BY Nom_Musicien");
$init = $_GET['initiale'];
if (isset($_GET['json'])) {
    header('Content-Type: application/json');
    $query->bindValue(':nom', $init . '%');
    $query->execute();
    exit(json_encode($query->fetchAll(PDO::FETCH_ASSOC)));
}
$query->execute([':nom' => $init . '%']);
header('Content-Type: text/xml');
echo "<?xml version='1.0' encoding='UTF-8' ?>\r\n";
?>
    <MUSICIENS>
        <?php while ($row = $query->fetch()): ?>
            <Musicien>
                <Nom_Musicien><?php echo $row['Nom_Musicien']; ?></Nom_Musicien>
                <Prenom_Musicien><?php echo $row['Prénom_Musicien']; ?></Prenom_Musicien>
            </Musicien>
        <?php endwhile; ?>
    </MUSICIENS>
<?php $pdo = null; ?>