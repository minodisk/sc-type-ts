var sc;
(function (sc) {
    (function (type) {
        (function (core) {
            var Class = (function () {
                function Class() {
                    var _this = this;
                    var ctor = (this).constructor;
                    var prop;
                    if(ctor.__fn__ == null) {
                        ctor.__fn__ = {
                        };
                        for(prop in this) {
                            var fn = this[prop];
                            if(typeof fn === 'function') {
                                ctor.__fn__[prop] = fn;
                            }
                        }
                    }
                    for(prop in ctor.__fn__) {
                        (function (prop, fn) {
                            (_this)[prop] = function () {
                                return fn.apply(_this, Array.prototype.slice.call(arguments));
                            };
                        })(prop, ctor.__fn__[prop]);
                    }
                }
                return Class;
            })();
            core.Class = Class;            
        })(type.core || (type.core = {}));
        var core = type.core;
    })(sc.type || (sc.type = {}));
    var type = sc.type;
})(sc || (sc = {}));
//@ sourceMappingURL=sc.type.core.js.map
