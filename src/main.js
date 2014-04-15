if(!Array.prototype.find) {
	Object.defineProperty(Array.prototype, 'find', {
		enumerable: false,
		configurable: false,
		writeable: false,
		value: function (predicate) {
			for (var i = 0; i < this.length; i++) {
				if(predicate(this[i], i, this)) {
					return this[i];
				}
			}
			return void 0;
		}
	});
}

// Extend collections with array convenience methods because WHY ARE THEY NOT ALREADY LIKE THIS
Object.getOwnPropertyNames( Array.prototype ).forEach(function( methodName ) {
    NodeList.prototype[methodName] = Array.prototype[methodName];
    HTMLCollection.prototype[methodName] = Array.prototype[methodName];
});

// CustomEvent polyfill for IE
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.CustomEvent.prototype;

  window.CustomEvent = CustomEvent;
})();

var cw = {
	/**
	 * Merge objects together and return the result
	 * @return {[type]} [description]
	 */
	extend: function(){
		for(var i=1; i<arguments.length; i++) {
			for(var key in arguments[i]) {
				if(arguments[i].hasOwnProperty(key) && arguments[i][key] !== undefined) {
					arguments[0][key] = arguments[i][key];
				}
			}
		}
		return arguments[0];
	},
	Views: {

	},
	Models: {

	}
};

/**
 * Set up the base class
 * @param  {object} scope A scope to attach the base classes to
 * @return {undefined}
 */
(function(scope) {
	function LocalObject() {
		return this;
	}

	// Attach the generated objects to the system
	scope.Object = LocalObject;
})(cw);

/**
 * Set up the Emitter class
 * @param  {object} scope A scope to attach the base classes to
 * @return {undefined}
 */
(function(scope) {
	/**
	 * Define the Emitter class
	 */
	function Emitter() {
		Object.defineProperties(this, {
			'listeners': {
				configurable: true,
				enumerable: false,
				value: {'change': []},
				writeable: true
			}
		});
		return this;
	}

	// Set up the prototype for the Emitter class
	Emitter.prototype = cw.extend(Object.create(scope.Object.prototype), {
		/**
		 * Binds a callback function to trigger upon an event being fired
		 * @param  {string}   event    The name of the event to watch for
		 * @param  {Function} callback The callback function to call when this event is fired
		 * @return {this}              Returns a chainable version of this object
		 */
		on: function(event, callback, binding) {
			var queue = this.listeners[event];
			if(!Array.isArray(queue)) {
				queue = [];
			}
			callback = (binding ? callback.bind(binding) : callback);
			queue.push(callback);
			return this;
		},
		/**
		 * Unbind a listener from an event
		 * @param  {string}   event    The name of the event to unbind from
		 * @param  {Function} callback The callback function being unbound
		 * @return {this}              Return a chainable version of this object
		 */
		off: function(event, callback) {
			var queue = this.listeners[event];
			if(!Array.isArray(queue)) {
				queue = [];
			}
			queue.slice(queue.indexOf(callback), 1);
			return this;
		},
		/**
		 * Binds a callback function to trigger upon an event being fired
		 * @param  {string}   event    The name of the event to watch for
		 * @param  {Function} callback The callback function to call when this event is fired
		 * @return {this}              Returns a chainable version of this object
		 */
		once: function(event, callback) {
			return this.on(event, callback);
		},
		/**
		 * Triggers an event of the passed type on this emitter
		 * @param  {string} event   The type of event to trigger
		 * @param  {object} options A set of custom properties to pass to the event object
		 * @return {this}           Returns a chainable version of this object
		 */
		trigger: function(event, options) {
			var queue = this.listeners[event], eventObj = cw.extend({
				calledOn: this,
				type: event,
				timestamp: Date.now()
			}, options);
			if(!Array.isArray(queue)) {
				queue = [];
				this.listeners[event] = queue;
			}
			queue.forEach(function(callback) {
				callback.call(this, eventObj);
			}, this);
			return this;
		}
	});

	// Define any properties the Emitter class needs to have (at minimum should have the classname and supertype reference)
	Object.defineProperties(Emitter.prototype, {
		'classname': {
			value: 'Emitter'
		},
		'supertype': {
			value: scope.Object.prototype
		},
		// Hide the emitter properties but allow them to be overriden as needed
		'on': {
			enumerable: false,
			writeable: true
		},
		'off': {
			enumerable: false,
			writeable: true
		},
		'once': {
			enumerable: false,
			writeable: true
		},
		'trigger': {
			enumerable: false,
			writeable: true
		}
	});

	// Attach the generated objects to the system
	scope.Emitter = Emitter;
})(cw);

document.addEventListener('DOMContentLoaded', function() {
	window.categories = [];
	window.categories[0] = new cw.Models.Category({
		id: 0,
		name: 'Category A',
		selected: true
	});
	window.categories[1] = new cw.Models.Category({
		id: 1,
		name: 'Category B'
	});
	window.categories[2] = new cw.Models.Category({
		id: 2,
		name: 'Category C',
		disabled: true
	});
	window.categories[3] = new cw.Models.Category({
		id: 3,
		name: 'Category D'
	});

	var v = new cw.Views.CategoryListView(window.categories);
	var v2 = new cw.Views.CategoryListView(window.categories);

	document.querySelector('#content').appendChild(v.render());
	document.querySelector('#content').appendChild(v2.render());

	v.remove();
	v.destroy();
});