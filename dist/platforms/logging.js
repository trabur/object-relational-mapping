"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging = void 0;
// libraries
var uuid_1 = require("uuid");
var Logging = /** @class */ (function () {
    function Logging(channel) {
        this.channel = null;
        this.channel = channel;
        return this;
    }
    /******
     * trigger actions
     ******/
    Logging.prototype.listen = function (id, token, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:secure", {
            vault: 'platforms:logging:listen',
            message: {
                payload: {
                    id: id,
                    token: token
                },
                output: outputRoom
            }
        });
    };
    Logging.prototype.put = function (id, data, token, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:secure", {
            vault: 'platforms:logging:put',
            message: {
                payload: {
                    id: id,
                    token: token,
                    data: data
                },
                output: outputRoom
            }
        });
    };
    return Logging;
}());
exports.Logging = Logging;
//# sourceMappingURL=logging.js.map