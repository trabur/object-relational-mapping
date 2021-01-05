"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
// libraries
var uuid_1 = require("uuid");
var Counter = /** @class */ (function () {
    function Counter(channel) {
        this.channel = null;
        this.channel = channel;
        return this;
    }
    /******
     * trigger actions
     ******/
    Counter.prototype.listen = function (id, token, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:broadcast", {
            room: 'platforms:counter:listen',
            message: {
                payload: {
                    id: id,
                    token: token
                },
                output: outputRoom
            }
        });
    };
    Counter.prototype.put = function (id, data, token, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:broadcast", {
            room: 'platforms:counter:put',
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
    return Counter;
}());
exports.Counter = Counter;
//# sourceMappingURL=counter.js.map