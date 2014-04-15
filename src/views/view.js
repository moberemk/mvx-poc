/**
 * Set up the View class
 * @param  {object} scope A scope to attach the base classes to
 * @return {undefined}
 */
(function(scope) {
	function View(model, options) {
		options = cw.extend({
			template: undefined
		}, options);

		// Need to SPECIFICALLY reference the parent constructor and not call supertype
		// as calling this.supertype will just cause an infinite loop in the parent constructor
		scope.Emitter.apply(this, arguments);

		if(options.template) {
			Object.defineProperty(this, 'template', {
				value: options.template,
				writeable: true,
				storeoptions: {
					constructor: scope.View
				}
			});
		}

		Object.defineProperties(this, {
			'model': {
				value: model,
				writeable: true
			},
			'children': {
				value: new scope.ViewStore(options.storeoptions),
				writeable: true
			}
		});

		this.domNode = undefined;

		if(model.on) {
			model.on('change', this.update, this);
		}

		return this;
	}

	View.prototype = cw.extend(Object.create(scope.Emitter.prototype), {
		render: function(tag) {
			tag = tag || document.createElement('div');
			tag.view = this;
			this.domNode = tag;

			for (var type in this.events) {
				tag.addEventListener(type, this.events[type]);
			}

			return tag;
		},
		update: function() {
			if(this.domNode) {
				var oldNode = this.domNode;
				this.domNode.parentNode.replaceChild(this.render(), oldNode);
			} else {
				console.warn('Undisposed view!', this);
			}
		},
		remove: function() {
			if(this.model.off) {
				this.model.off('change', this.update);
			}
			if(this.domNode) {
				this.domNode = this.domNode.parentNode.removeChild(this.domNode);
			}
			this.trigger('remove');
		},
		destroy: function() {
			this.trigger('destroy');
		}
	});

	Object.defineProperties(View.prototype, {
		'classname': {
			value: 'View'
		},
		'supertype': {
			value: scope.Emitter.prototype
		}
	});

	// Attach the generated objects to the system
	scope.View = View;
})(cw);
