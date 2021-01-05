"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishSubscribe = void 0;
// libraries
var uuid_1 = require("uuid");
var PublishSubscribe = /** @class */ (function () {
    function PublishSubscribe(channel) {
        this.channel = null;
        this.channel = channel;
        return this;
    }
    /******
     * trigger actions
     ******/
    PublishSubscribe.prototype.listen = function (id, token, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:broadcast", {
            room: 'platforms:publishSubscribe:listen',
            message: {
                payload: {
                    id: id,
                    token: token
                },
                output: outputRoom
            }
        });
    };
    PublishSubscribe.prototype.put = function (id, data, token, callback) {
        var outputRoom = uuid_1.v4();
        this.channel.on("room:" + outputRoom, callback);
        this.channel.push("room:broadcast", {
            room: 'platforms:publishSubscribe:put',
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
    return PublishSubscribe;
}());
exports.PublishSubscribe = PublishSubscribe;
//# sourceMappingURL=publishSubscribe.js.map