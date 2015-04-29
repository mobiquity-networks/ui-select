uis.directive('uiSelectScroll', [function() {
  return {
    restrict: 'EA',
    require: '^uiSelect',
    replace: true,
    transclude: true,
    compile: function() {
      return function link(scope, element, attrs, $select) {
        element.bind('scroll', function () {
          if (attrs.onScroll && element[0].scrollTop + element[0].offsetHeight >= element[0].scrollHeight) {
            $select.onScroll(attrs.onScroll);
          }
        });
      };
    }
  };
}]);
