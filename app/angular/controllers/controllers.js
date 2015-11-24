app.controller('galleryCtrl', function($scope, $http) {
    
    //Переменные среды
    //Индекс первого полного изображения (изначально скрыто) из списка
    $scope.fullImage = 0;

    //Загружаем данные картинок из файла в массив
    $http.get('./data.json').success(function (data) {
        $scope.images = data;
    });

    //Свитчер показать/скрыть темный фон, изображение, навигацию
    $scope.wrapperShow = true;
    
    //Устанавливаем полное изображение через вставку индекса из массива изображений
    //Вставка нужного индекса меняет атрибут ng-src и подгружает нужное изображение
    $scope.setFullImage = function(index) {
        //Устанавливаем нужный индекс
        $scope.fullImage = index;
        //Показываем темный фон и само изображение с навигацией
        $scope.wrapperShow = !$scope.wrapperShow;
    };

    //Навигация
    $scope.navSetImage = function(index, step) {
        switch(step) {
            case 'prev':
                //Если перешли к самому первому изображению, переключаемся на последнее
                index <= 0 ? $scope.fullImage = $scope.images.length - 1 : $scope.fullImage = index - 1;
                //Во время загрузки снижаем прозрачность изображения
                $scope.loading('#fullImg');
                break;
            case 'next':
                //Если перешли к самому последнему изображению, переключаемся на первое
                index === $scope.images.length - 1 ? $scope.fullImage = 0 : $scope.fullImage = index + 1;
                //Во время загрузки снижаем прозрачность изображения
                $scope.loading('#fullImg');
                break;
        }
    };

    //Функция снижения прозрачности при подгрузке изображения
    //Запускается каждый раз, когда меняется атрибут ng-src у основного (полного) изображения
    $scope.loading = function (imageId) {

        //Цепляем состояние DOM-элемента картинки
        $scope.mainImage = document.querySelector(imageId);
        //Устанавливаем слушатель
        $scope.$watch('mainImage', function () {

            //Снижаем прозрачность
            $scope.mainImage.style.opacity = '.1';
            
            //При полной загрузке возвращаем прозрачность к 100%
            $scope.mainImage.onload = function () {
                this.style.opacity = '1';
            }

        });

    }
});