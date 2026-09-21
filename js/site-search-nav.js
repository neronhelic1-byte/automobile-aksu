(function () {
  function hijack(form) {
    if (!form || form.getAttribute('data-aksu-hijacked') === 'true') {
      return;
    }
    form.setAttribute('data-aksu-hijacked', 'true');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var input = form.querySelector('input[name="query"]');
      var q = input ? input.value.trim() : '';
      try {
        if (q) {
          sessionStorage.setItem('aksuSearchQuery', q);
        } else {
          sessionStorage.removeItem('aksuSearchQuery');
        }
      } catch (err) {}
      window.location.href = 'search.html';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('form[action="search.html"]');
    for (var i = 0; i < forms.length; i++) {
      hijack(forms[i]);
    }
  });
})();
