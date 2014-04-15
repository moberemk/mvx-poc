(function (scope) {
	function CategoryListView(model, options) {
		options = cw.extend({
			template: '<category-selector></category-selector>',
			storeoptions: {
				constructor: scope.Views.CategoryListOptionView
			}
		}, options);

		scope.View.call(this, model, options);

		return this;
	}

	CategoryListView.prototype = cw.extend(Object.create(scope.View.prototype), {
		render: function() {
			var tag = document.createElement('category-selector');
			this.model.forEach(function(category) {
				var child = this.children.get(category);
				// var child = new scope.Views.CategoryListOptionView(category);
				tag.appendChild(child.render());
			}, this);

			tag.view = this;
			this.domNode = tag;

			return tag;
		}
	});

	Object.defineProperties(CategoryListView.prototype, {
		'class': {
			value: 'CategoryListView'
		},
		'supertype': {
			value: scope.View.prototype
		},
		'children': {
			value: new scope.ViewStore({constructor: scope.Views.CategoryListOptionView}),
			writeable: true
		}
	});

	scope.Views.CategoryListView = CategoryListView;
})(cw);

(function (scope) {
	function CategoryListOptionView(model, options) {
		options = cw.extend({
			template: '<category-option></category-option>'
		}, options);

		scope.View.call(this, model, options);

		return this;
	}

	CategoryListOptionView.prototype = cw.extend(Object.create(scope.View.prototype), {
		render: function(tag) {
			tag = tag || document.createElement('category-option');
			tag.appendChild(document.createTextNode(this.model.name));
			tag.setAttribute('category-id', this.model.id);

			if(this.model.selected) {
				tag.setAttribute('selected',true);
			}
			if(this.model.disabled) {
				tag.setAttribute('disabled', true);
			}

			return this.supertype.render.call(this, tag);
		},
		events: {
			selected: function(e) {
				this.view.model.selected = true;
			},
			deselected: function(e) {
				this.view.model.selected = false;
			}
		}
	});

	Object.defineProperties(CategoryListOptionView.prototype, {
		'class': {
			value: 'CategoryListOptionView'
		},
		'supertype': {
			value: scope.View.prototype
		}
	});

	scope.Views.CategoryListOptionView = CategoryListOptionView;
})(cw);
