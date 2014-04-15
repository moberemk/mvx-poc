mvx-poc
=======

A quick proof-of-concept I put together for work of Javascript object inheritance and the XTags library. Also doubles as an experiment in using defined properties to implement Backbone-like getters and setters without actually requiring the use of a get or set function in favour of defining model attributes only and hiding utility functions as non-enumerable properties.

I'm not sure if I'll push this any further, but the (heavily commented) code might be of use to someone out there.

Models
------

I'm not particularly sure that this system is more practical than Backbone. Disregarding the fact that this relies heavily on some bleeding-edge Javascript technologies and isn't practical except in environments that allow for some seriously stringent user requirements. Beyond that, the hiding of properties doesn't play with inheritance consistently, which is annoying to say the least.

That said, the actual inheritance mechanism works well and the core emitter component is straightforward and usable.

X-Tags
------

The other major purpose of this PoC was to test X-Tags (and by extension the concept of web components as a whole) and that much I like. Of note is the vanilla-category-selector.js file, which is a quick test of document.registerElement. The fact that it still doesn't work in IE makes it essentially useless for the time being, but xTags is a fantastic fill-in library until either Polymer becomes production-ready or web components become a widely usable standard.