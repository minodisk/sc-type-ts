var sc;
(function (sc) {
    (function (type) {
        (function (utils) {
            (function (String) {
                function padLeft(value, pad, len) {
                    var str = '' + value;
                    while(str.length < len) {
                        str = pad + str;
                    }
                    return str;
                }
                String.padLeft = padLeft;
                function padRight(value, pad, len) {
                    var str = '' + value;
                    while(str.length < len) {
                        str += pad;
                    }
                    return str;
                }
                String.padRight = padRight;
            })(utils.String || (utils.String = {}));
            var String = utils.String;
        })(type.utils || (type.utils = {}));
        var utils = type.utils;
    })(sc.type || (sc.type = {}));
    var type = sc.type;
})(sc || (sc = {}));
//@ sourceMappingURL=sc.type.utils.js.map
