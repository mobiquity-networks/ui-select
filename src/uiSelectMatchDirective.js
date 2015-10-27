uis.directive('uiSelectMatch', ['$parse', 'uiSelectConfig', function($parse, uiSelectConfig) {
  return {
    restrict: 'EA',
    require: '^uiSelect',
    replace: true,
    transclude: true,
    templateUrl: function(tElement) {
      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
      var multi = tElement.parent().attr('multiple');
      return theme + (multi ? '/match-multiple.tpl.html' : '/match.tpl.html');
    },
    link: function(scope, element, attrs, $select) {
      $select.lockChoiceExpression = attrs.uiLockChoice;
      attrs.$observe('placeholder', function(placeholder) {
        $select.placeholder = placeholder !== undefined ? placeholder : uiSelectConfig.placeholder;
      });
      attrs.$observe('placeholderaddmore', function (placeholderAddMore) {
        $select.placeholderAddMore = placeholderAddMore;
      });
      attrs.$observe('chickletsPlaceholder', function (chickletsPlaceholder) {
        $select.chickletsPlaceholder = chickletsPlaceholder;
      });
      attrs.$observe('chickletsDisplayTemplateUrl', function (chickletsDisplayTemplateUrl) {
        scope.chickletsDisplayTemplateUrl = chickletsDisplayTemplateUrl;
      });
      scope.displayMatchWhen = function () { return true; };
      attrs.$observe('displayMatchWhen', function (displayMatchWhen) {
        if (displayMatchWhen) {
          scope.displayMatchWhen = $parse(displayMatchWhen)(scope);
        }
      });




      function setAllowClear(allow) {
        $select.allowClear = (angular.isDefined(allow)) ? (allow === '') ? true : (allow.toLowerCase() === 'true') : false;
      }

      attrs.$observe('allowClear', setAllowClear);
      setAllowClear(attrs.allowClear);

      if($select.multiple){
        $select.sizeSearchInput();
      }

    }
  };
}]);
