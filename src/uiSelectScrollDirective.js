uis.directive('uiSelectScroll', [function() {
  return {
    restrict: 'EA',
    require: '^uiSelect',
    link: function link(scope, element, attrs, $select) {
      element.bind('scroll', function () {
        if ($select.onScroll && element[0].scrollTop + element[0].offsetHeight >= element[0].scrollHeight) {
          $select.onScroll($select.onScroll);
        }
      });
    }
  };
}]);
