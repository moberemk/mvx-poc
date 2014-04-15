/**
 * Stores should either build or retrieve objects
 * depending on whether or not they have already been
 * constructed by the store
 * @param  {[type]} scope [description]
 * @return {[type]}       [description]
 */
(function(scope) {
	function Store(options) {
		options = cw.extend({
			constructor: undefined
		}, options);

		scope.Emitter.apply(this, arguments);

		// Set up the default array collection
		this.collection = [];

		this.constructor = options.constructor;

		return this;
	}

	Store.prototype = cw.extend(Object.create(scope.Emitter.prototype), {
		// First param is object, second is constructor, third+ is arguments
		get: function (object) {
			return void  0;
		}
	});

	Object.defineProperties(Store.prototype, {
		'classname': {
			value: 'Store'
		},
		'supertype': {
			value: scope.Emitter.prototype
		}
	});


	// Attach the generated objects to the system
	scope.Store = Store;
})(cw);

(function(scope) {
	function ViewStore(options) {
		options = cw.extend({
			constructor: scope.View
		}, options);

		scope.Store.apply(this, arguments);

		return this;
	}

	ViewStore.prototype = cw.extend(Object.create(scope.Store.prototype), {
		get: function(model, options) {
			var found = this.collection.find(function(view) {
				return view.model === model;
			});

			if(!found) {
				found = new this.constructor(model, options);
			}
			return found;
		}
	});

	Object.defineProperties(ViewStore.prototype, {
		'classname': {
			value: 'ViewStore'
		},
		'supertype': {
			value: scope.Store.prototype
		}
	});

	scope.ViewStore = ViewStore;
})(cw);