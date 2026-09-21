(function () {
  function normalize(s) {
    return (s || '')
      .toString()
      .toLowerCase()
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ß/g, 'ss')
      .replace(/ë/g, 'e');
  }

  function scoreItem(item, terms) {
    var haystack = normalize(item.title + ' ' + (item.keywords || '') + ' ' + (item.subtitle || ''));
    for (var i = 0; i < terms.length; i++) {
      if (haystack.indexOf(terms[i]) === -1) {
        return -1;
      }
    }
    var titleNorm = normalize(item.title);
    var joined = terms.join(' ');
    var score = 10;
    if (titleNorm === joined) {
      score = 100;
    } else if (titleNorm.indexOf(joined) === 0) {
      score = 50;
    } else if (titleNorm.indexOf(joined) !== -1) {
      score = 30;
    }
    return score;
  }

  window.aksuSearch = function (query) {
    var index = window.AKSU_SEARCH_INDEX || [];
    var terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) {
      return [];
    }
    var results = [];
    for (var i = 0; i < index.length; i++) {
      var s = scoreItem(index[i], terms);
      if (s >= 0) {
        results.push({ item: index[i], score: s });
      }
    }
    results.sort(function (a, b) {
      return b.score - a.score;
    });
    return results.map(function (r) {
      return r.item;
    });
  };
})();
