'use strict';

const $  = global.jQuery;

class Search {

  constructor() {
    $('#search-input').on('keyup blur change', function() {
      search(
        $('.Navigation ul')[0], 
        this.value.toUpperCase()
      );
    });
  }

  search(list, key) {
    var i, li = $(list).children('li');
    var match = false;
    for (i = 0; i < li.length; i++) {
      var $li = $(li[i]);
      var childTree = $(li[i]).children('ul');

      if ($li.parents('.Tree-collection').find('> .Tree-collectionLabel').text().toUpperCase().indexOf(key) !== -1 || 
          $li.text().toUpperCase().indexOf(key) !== -1 || 
          $li.find('[data-tags]').attr('data-tags').toUpperCase().indexOf(key) !== -1
      ) {
        match = true;
        $li.parents('.Tree-collection').removeClass('is-closed');
        $li.show();
        search(childTree, key);
      } else {
        match = false;
        $li.hide();
      }
    }
    return match;
  }
}

module.exports = Search;