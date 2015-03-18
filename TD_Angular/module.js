angular.module('initExemple', [])
    .controller('controleur', ['$scope', function ($scope) {
        $scope.personnes = 1;
        $scope.total = 0;
        $scope.list = [
            {
                nom: 'Farine',
                prix: 0.58,
                quantite: 375,
                unite: "g"
            },
            {
                nom: 'Sucre',
                prix: 1.20,
                quantite: 50,
                unite: "g"
            },
            {
                nom: 'Oeufs',
                prix: 0.15,
                quantite: 4,
                unite: ""
            },
            {
                nom: 'Lait',
                prix: 0.79,
                quantite: 50,
                unite: "cl"
            },
            {
                nom: 'Beurre',
                prix: 7.9,
                quantite: 20,
                unite: "g"
            }
        ];
        $scope.updateTotal = function() {
            $scope.total = 0;
            angular.forEach($scope.list, function(article, key) {
                if (article.unite == 'g')
                    $scope.total = $scope.total + (article.quantite * $scope.personnes / 1000) * article.prix;
                else if (article.unite = 'cl')
                    $scope.total = $scope.total + (article.quantite * $scope.personnes / 100) * article.prix;
                else
                    $scope.total = $scope.total + (article.quantite * $scope.personnes) * article.prix;
            });
        };
        $scope.create = function(nom, quantite, unite, prix) {
            $scope.list.push({
                nom: nom,
                prix: prix,
                unite: unite,
                quantite: quantite
            });
            $scope.updateTotal();
        };
    }]);