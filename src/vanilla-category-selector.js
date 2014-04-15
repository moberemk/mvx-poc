(function(){
    document.registerElement('category-selector', {
        prototype: Object.create(cw.extend(HTMLElement.prototype, {
        createdCallback: function() {
            if(this.tagName == 'CATEGORY-SELECTOR') {
                console.log('Hi I\'m a selector!');
            } else {
                console.log("I'm something else", this);
            }
        },
        selected: function() {
            var categories = [];
            this.children.filter(function(element){return element.tagName.toLowerCase() == 'category-option';}).forEach(function(option) {
                if(option.getAttribute('selected') === '') {
                    categories.push(option.getAttribute('category-id'));
                }
            });
            return categories;
        }
    }))
    });

    document.registerElement('category-option', {
        prototype: Object.create(cw.extend(HTMLElement.prototype, {
            createdCallback: function() {
                if(this.tagName == 'CATEGORY-SELECTOR') {
                    console.log('Hi I\'m a selector!');
                } else {
                    console.log("I'm something else", this);
                }
            }
        }))
    });

    document.addEventListener('DOMContentLoaded', function() {
        var element = document.querySelector('category-selector');
        console.log(element.selected());
    });
})();