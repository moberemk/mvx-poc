/**
 * Set up the Model class
 * @param  {object} scope A scope to attach the base classes to
 * @return {undefined}
 */
(function(scope) {
	var uid = 0;
	function Model(attributes, options) {
		scope.Emitter.apply(this, arguments);

		this.uid = uid++;

		// Attributes are here hidden within this function's closure. Woo encapsulation!
		// Extend the default attributes too to ensure that they are all properly set up
		// as properties on the object
		attributes = cw.extend(Object.create(this.defaults), attributes); // The Object.create is to ensure that this doesn't overwrite the prototype

		function setupAttribute(key, attributes) {
			this[key] = attributes[key]; // Default to the passed value

			Object.defineProperty(this, key, {
				enumerable: true, // Should show up in a for..in
				set: function(value) {
					if(this.setters[key]) {
						value = this.setters[key](value, attributes[key]);
					}

					if(attributes[key] !== value) {
						attributes[key] = value;
						this.trigger('change');
						this.trigger('change:' + key);
					}

					return attributes[key];
				},
				get: function(value) {
					return attributes[key];
				}
			});
		}

		for(var key in attributes) {
			setupAttribute.call(this, key, attributes);
		}

		return this;
	}

	// Models directly inherit from the Emitter type
	Model.prototype = cw.extend(Object.create(scope.Emitter.prototype), {
		setters: {
		},
		defaults: {
		},
		validation: function() {
			return;
		},
		sync: function() {

		}
	});

	// All other properties of a model should be defined here so as to avoid their being enumerable
	Object.defineProperties(Model.prototype, {
		'classname': {
			value: 'Model'
		},
		'supertype': {
			value: scope.Emitter.prototype
		},
		// The Sync function calls out a
		'sync': {
			enumerable: false
		},
		// Defaults object should be used to set up the default properties of any model
		'defaults': {
			enumerable: false
		},
		// Setters objects should contain keys which correspond to the keys on the model,
		// and can be used for data formatting or even change rejection. They are passed the
		// new value and the old value as parameters
		'setters': {
			enumerable: false
		},
		// Validation function can be used as a hook to validate model data;
		// should return undefined on valid data or an error array corresponding
		// to problematic keys on invalid data
		'validation': {
			enumerable: false
		}
	});

	// Attach the generated objects to the system
	scope.Model = Model;
})(cw);

(function(scope) {
	function Category(attributes, options) {
		return scope.Model.apply(this, arguments);
	}

	Category.prototype = cw.extend(Object.create(scope.Model.prototype), {
		defaults: {
			id: undefined,
			name: '',
			selected: false,
			disabled: false
		},
		setters: {
		}
	});

	Object.defineProperties(Category.prototype, {
		'classname': {
			value: 'Category'
		},
		'supertype': {
			value: scope.Model.prototype
		}
	});

	scope.Models.Category = Category;
})(cw);