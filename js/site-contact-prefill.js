(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a[data-vehicle]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        var vehicle = this.getAttribute('data-vehicle');
        try {
          sessionStorage.setItem('aksuContactVehicle', vehicle);
        } catch (err) {}
      });
    }
  });
})();
