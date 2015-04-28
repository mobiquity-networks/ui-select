uis.directive('uiSelectScroll',
  ['uiSelectConfig', 'uiSelectMinErr',
  function(uiSelectConfig, uiSelectMinErr) {

  return {
    restrict: 'EA',
    require: '^uiSelect',
    replace: true,
    transclude: true,
    templateUrl: function(tElement) {
      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
      return theme + '/choices.tpl.html';
    },

    compile: function(tElement, tAttrs) {
      if (!tAttrs.onScroll) {
        throw uiSelectMinErr('onScroll', "Expected 'onScroll' expression.");
      }

      return function link(scope, element, attrs, $select) {
        element.bind('scroll', function () {
          if (element[0].scrollTop + element[0].offsetHeight >= element[0].scrollHeight) {
            $select.onScroll(attrs.onScroll);
          }
        });
      };
    }
  };
}]);
