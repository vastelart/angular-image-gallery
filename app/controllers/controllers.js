app.controller('galleryCtrl', function($scope) {
    $scope.imageStorage = 'img/';
    
    /* Set the full right-side image for the first gallery show up */
    $scope.fullImage = 0;
    
    /* We have not so many images and to keep it simple there is no reasons to use external files with $http.get or smth */
    $scope.images = [
        {thumb: $scope.imageStorage + 'thumb/1.jpg', src: $scope.imageStorage + '1.jpg', title: 'Hi there. I am Franko.'},
        {thumb: $scope.imageStorage + 'thumb/2.jpg', src: $scope.imageStorage + '2.jpg', title: 'I am an italian designer.'},
        {thumb: $scope.imageStorage + 'thumb/3.jpg', src: $scope.imageStorage + '3.jpg', title: 'Do you know what does it mean?'},
        {thumb: $scope.imageStorage + 'thumb/4.jpg', src: $scope.imageStorage + '4.jpg', title: 'Sure, you do.'},
        {thumb: $scope.imageStorage + 'thumb/5.jpg', src: $scope.imageStorage + '5.jpg', title: 'Good luck.'}
    ];
    
    /* Set full image by click on the preview */
    $scope.setFullImage = function(index) {
        $scope.fullImage = index;
    };
    
    /* Navigation */
    $scope.navSetImage = function(index, step) {
        switch(step) {
            case 'prev':
                index <= 0 ? $scope.fullImage = $scope.images.length - 1 : $scope.fullImage = index - 1;
                break;
            case 'next':
                index === $scope.images.length - 1 ? $scope.fullImage = 0 : $scope.fullImage = index + 1;
                break;
        }
    };
});