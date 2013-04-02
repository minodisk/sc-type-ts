var sc;
(function (sc) {
    (function (type) {
        (function (events) {
            var Event = (function () {
                function Event(type, data) {
                    this.type = type;
                    this.data = data;
                    this._isPropagationStopped = false;
                    this._isPropagationStoppedImmediately = false;
                    this._isDefaultPrevented = false;
                }
                Event.prototype.formatToString = function () {
                    var props = {
                        type: this.type
                    }, key, tmp = [];
                    for(key in props) {
                        tmp.push(key + ': ' + props[key]);
                    }
                    return '[Event ' + tmp.join(' ') + ']';
                };
                Event.prototype.stopPropagation = function () {
                    this._isPropagationStopped = true;
                };
                Event.prototype.stopImmediatePropagation = function () {
                    this._isPropagationStopped = true;
                    this._isPropagationStoppedImmediately = true;
                };
                Event.prototype.preventDefault = function () {
                    this._isDefaultPrevented = true;
                };
                return Event;
            })();
            events.Event = Event;            
            var EventEmitter = (function () {
                function EventEmitter() {
                    this._receivers = {
                    };
                }
                EventEmitter.prototype.on = function (type, listener, useCapture, priority) {
                    if (typeof useCapture === "undefined") { useCapture = false; }
                    if (typeof priority === "undefined") { priority = 0; }
                    if(this._receivers[type] == null) {
                        this._receivers[type] = [];
                    }
                    this._receivers[type].push({
                        listener: listener,
                        useCapture: useCapture,
                        priority: priority,
                        caller: this.on.caller
                    });
                    this._receivers[type].sort(function (a, b) {
                        return b.priority - a.priority;
                    });
                    return this;
                };
                EventEmitter.prototype.off = function (type, listener) {
                    var i, receivers;
                    if(receivers = this._receivers[type]) {
                        i = receivers.length;
                        while(i--) {
                            if(receivers[i].listener === listener) {
                                receivers.splice(i, 1);
                            }
                        }
                        if(receivers.length === 0) {
                            delete this._receivers[type];
                        }
                    }
                    return this;
                };
                EventEmitter.prototype.emit = function (event) {
                    var receivers = this._receivers[event.type], receiver, i, l;
                    event.currentTarget = this;
                    if(receivers == null || receivers.length === 0) {
                        return this;
                    }
                    for(i = 0 , l = receivers.length; i < l; i++) {
                        receiver = receivers[i];
                        (function (receiver) {
                            setTimeout(function () {
                                if(event._isPropagationStoppedImmediately) {
                                    return;
                                }
                                receiver.listener.call(receiver.caller, event);
                            }, 0);
                        })(receiver);
                    }
                    return this;
                };
                return EventEmitter;
            })();
            events.EventEmitter = EventEmitter;            
        })(type.events || (type.events = {}));
        var events = type.events;
    })(sc.type || (sc.type = {}));
    var type = sc.type;
})(sc || (sc = {}));
//@ sourceMappingURL=sc.type.events.js.map
