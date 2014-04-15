(function(xtag){
  xtag.register('category-selector', {
    lifecycle: {
      created: function() {
        var buttons = '<div class="buttons">'+
                        '<button class="get-selected">Selected</button>' +
                        '<button class="select-all">Select All</button>' +
                        '<button class="deselect-all">Deselect All</button>' +
                      '</div>';
        xtag.innerHTML(this, buttons + this.innerHTML);
      },
      inserted: function() {

      },
      removed: function() {

      },
      attributeChanged: function() {

      }
    },
    events: {
      'click:delegate(.get-selected)': function(e) {
        var container = this.parentNode.parentNode;
        console.log(container.selected());
      },
      'click:delegate(.deselect-all)': function(e) {
        var container = this.parentNode.parentNode;
        container.getCategoryElements().forEach(function(element) {
            element.removeAttribute('selected');
        });
      },
      'click:delegate(.select-all)': function(e) {
        var container = this.parentNode.parentNode;
        container.getCategoryElements().forEach(function(element) {
          if(!element.getAttribute('disabled')) {
            element.setAttribute('selected', true);
          }
        });
      }
    },
    accessors: {

    },
    methods: {
      selected: function() {
        var categories = [];
        this.getCategoryElements().forEach(function(option) {
          if(option.getAttribute('selected') === '') {
            categories.push(option.getAttribute('category-id'));
          }
        });
        return categories;
      },
      getCategoryElements: function() {
        return this.children.filter(function(element){return element.tagName.toLowerCase() == 'category-option';});
      }
    }
  });

  xtag.register('category-option', {
    lifecycle: {
      attributeChanged: function(attribute) {
        if(attribute == 'selected') {
          if(this.getAttribute('selected') !== null) {
            this.dispatchEvent(new CustomEvent('selected'));
          } else {
            this.dispatchEvent(new CustomEvent('deselected'));
          }
        }
      }
    },
    events: {
      click: function(e) {
        if(this.getAttribute('disabled') === null) {
          if(this.getAttribute('selected') === null) {
            this.setAttribute('selected', true);
          } else {
            this.removeAttribute('selected');
          }
        }
      }
    },
    accessors: {
      'selected': {
        attribute: {boolean: true}
      },
      'disabled': {
        attribute: {boolean: false}
      },
      'category-id': {
      }
    }
  });
})(xtag);