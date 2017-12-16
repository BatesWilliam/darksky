(function() {

    angular
        .module('darkSkyApp')
        .controller('weatherCtrl', weatherCtrl);

    weatherCtrl.$inject = ['$scope', 'SelectedData', 'DarkskyWeather'];

    function weatherCtrl($scope, SelectedData, DarkskyWeather) {

        var vm = this;
        console.log(window.location);

        vm.content = "Weather";

        vm.selectedDepartureICAO = "";
        vm.selectedArrivalICAO = "";
        vm.selectedWeight = "";

        //check selected Departure
        if (SelectedData.selectedDepartureICAO !== null) {
            vm.selectedDepartureICAO = SelectedData.selectedDepartureICAO;
        }
        
        //check selected Arrival
        if (SelectedData.selectedArrivalICAO !== null) {
            vm.selectedArrivalICAO = SelectedData.selectedArrivalICAO;
        }

        //check selected weight
        if (SelectedData.selectedWeight !== null) {
            vm.selectedWeight = SelectedData.selectedWeight;
        }

        //refactored for Angular 1.6 - removed success/error, used Promises...
        vm.getDepartureWeather = function() {
            
            var lat = 35.2072;
            console.log(lat);
            var lon = -101.8388;
            console.log(lon);
            vm.lat = lat;
            vm.lon = lon;
            vm.locationName = "The Chase Tower";
            vm.locationAddress = "600 S. Tyler Street";
            vm.city = "Amarillo";
            vm.state = "Texas";

            DarkskyWeather.getWeather(lat, lon)
                .then(function(response) {
                    vm.departureWeather = response.data;
                    console.log(vm.departureWeather);
                })
                .catch(function(e) {
                    console.log(e);
                });
                
                return lat;
                
        }

        //refactored for Angular 1.6 - removed success/error, used Promises...        
        vm.getArrivalWeather = function() {
            
            var lat = 35.2072;
            var lon = -101.8388;

            //refactored for Angular 1.6 - removed success/error, used Promises...
            DarkskyWeather.getWeather(lat, lon)
                .then(function(response) {
                    vm.arrivalWeather = response.data;
                    console.log(vm.arrivalWeather);
                })
                .catch(function(e) {
                    console.log(e);
                });
        }
        
        //call services
        vm.getDepartureWeather();
        vm.getArrivalWeather();

    }

})();