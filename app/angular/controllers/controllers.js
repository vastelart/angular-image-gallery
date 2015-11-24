app.controller('galleryCtrl', function($scope, $http) {
    
    //Переменные среды
    //Индекс первого полного изображения (изначально скрыто) из списка
    $scope.fullImage = 0;
    $scope.fullImagesBlock = document.querySelector('#toPlaceFullImages');

    //Загружаем данные картинок из файла в массив
    $http.get('./data.json').success(function (data) {

        //Переменные среды
        $scope.images = data;
        
    });

    //Свитчер показать/скрыть темный фон, изображение, навигацию
    $scope.wrapperShow = true;

    $scope.showBack = function () {
        $scope.wrapperShow = !$scope.wrapperShow;
    };
    
    $scope.setFullImage = function(index, step) {
        //Цепляем в массив подгруженные полные изображения
        $scope.fullImages = document.querySelectorAll('.image-gallery__full-image');

        //Цепляем текущее активное полное изображение
        $scope.activeImage = document.querySelector('.image-gallery__full-image.active');

        //Скрываем текущее активное полное изображение
        if($scope.activeImage) {
            $scope.activeImage.classList.remove('active');
        }

        //Заносим в переменную индекс текущего активного изображения
        $scope.fullImageIndex = index;
        $scope.fullImages[index].classList.add('active');

        //Если передан параметр перемещения с навигации
        if(step) {
            //Скрываем установленное ранее активное полное изображение
            $scope.fullImages[index].classList.remove('active');

            //Навигация
            switch(step) {
                //Предыдущее
                case 'prev':
                    //Если дошли до первого изображения, переключаемся на последнее
                    $scope.fullImageIndex <= 0 ? $scope.fullImageIndex = $scope.fullImages.length -1 : $scope.fullImageIndex--;
                    //console.log($scope.fullImageIndex);
                    //Показываем предыдущее изображение, делая его активным
                    $scope.fullImages[$scope.fullImageIndex].classList.add('active');
                    break;
                //Следующее
                case 'next':
                    //Если дошли до последнего изображения, возвращаемся к первому
                    $scope.fullImageIndex === $scope.fullImages.length - 1 ? $scope.fullImageIndex = 0 : $scope.fullImageIndex++;
                    
                    //console.log($scope.fullImageIndex);
                    //Показываем следующее изображение, делая его активным
                    $scope.fullImages[$scope.fullImageIndex].classList.add('active');
                    break;
            }
        }
    };

});