"use strict";
// The MIT License (MIT)
//
// Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * List of login result types.
 */
var LoginResultType;
(function (LoginResultType) {
    /**
     * Success
     */
    LoginResultType[LoginResultType["Success"] = 0] = "Success";
    /**
     * "Unhandled" exception
     */
    LoginResultType[LoginResultType["Exception"] = -1] = "Exception";
    /**
     * Cancelled
     */
    LoginResultType[LoginResultType["Cancelled"] = 1] = "Cancelled";
    /**
     * Failed
     */
    LoginResultType[LoginResultType["Failed"] = -2] = "Failed";
})(LoginResultType = exports.LoginResultType || (exports.LoginResultType = {}));
var types_1 = require("tns-core-modules/utils/types");
var utils_1 = require("./utils");
exports.LOGTAG_INIT_ENV = "initEnvironment()";
exports.LOGTAG_LOGIN_WITH_FB = "loginWithFacebook()";
exports.LOGTAG_LOGIN_WITH_GOOGLE = "loginWithGoogle()";
exports.LOGTAG_LOGOUT = "logout()";
var Social = /** @class */ (function () {
    function Social() {
        this.defaultConfig = {
            activity: void 0,
            google: {
                initialize: true,
                isRequestAuthCode: false,
                serverClientId: void 0,
                shouldFetchBasicProfile: true,
                scopes: ["profile", "email"]
            },
            facebook: {
                initialize: true,
                clearSession: false,
                loginBehavior: void 0
            },
            twitter: {
                initialize: true,
                key: void 0,
                secret: void 0
            },
            onActivityResult: void 0
        };
    }
    Social.prototype.logMsg = function (msg, tag) {
        if (tag === void 0) { tag = ""; }
        try {
            var loggers = this._getLoggers();
            for (var i = 0; i < loggers.length; i++) {
                try {
                    loggers[i](msg, tag);
                }
                catch (e) {
                    console.log("[ERROR] nativescript-social-login >> logMsg() >> logger[" + i + "]: " + e);
                }
            }
        }
        catch (e) {
            console.log("[ERROR] nativescript-social-login >> logMsg(): " + e);
        }
    };
    Social.prototype.logResult = function (resultCtx, tag) {
        for (var p in resultCtx) {
            if (resultCtx.hasOwnProperty(p)) {
                this.logMsg("result. " + p + " = " + resultCtx[p], tag);
            }
        }
    };
    Social.prototype.initEnvironment = function (config, getLoggers) {
        if (config === void 0) { config = {}; }
        this._getLoggers = getLoggers;
        this.Config = utils_1.merge(this.defaultConfig, config);
        this.logMsg("initialize.google: " + this.Config.google.initialize, exports.LOGTAG_INIT_ENV);
        this.logMsg("initialize.facebook: " + this.Config.facebook.initialize, exports.LOGTAG_INIT_ENV);
        this.logMsg("initialize.twitter: " + this.Config.twitter.initialize, exports.LOGTAG_INIT_ENV);
        var result = this.init({
            facebook: {
                isInitialized: true
            },
            google: {
                isInitialized: true
            },
            twitter: {
                isInitialized: undefined
            }
        });
        this.logMsg("google.isInitialized: " + result.google.isInitialized, exports.LOGTAG_INIT_ENV);
        this.logMsg("facebook.isInitialized: " + result.facebook.isInitialized, exports.LOGTAG_INIT_ENV);
        this.logMsg("twitter.isInitialized: " + result.twitter.isInitialized, exports.LOGTAG_INIT_ENV);
        return result;
    };
    Social.prototype.loginWithProvider = function (provider, callback) {
        if (types_1.isNullOrUndefined(provider)) {
            provider = "";
        }
        provider = ("" + provider).toLowerCase().trim();
        this.logMsg("Provider: " + provider);
        switch (provider) {
            case "":
            case "google": {
                this.logMsg("Will use Google sign in...");
                this.loginWithGoogle(callback);
                break;
            }
            case "facebook":
            case "fb": {
                this.logMsg("Will use Facebook SDK...");
                this.loginWithFacebook(callback);
                break;
            }
            // TODO
            /* case "twitter":
                this.loginWithTwitter(callback);
                break; */
            default:
                throw "Provider '" + provider + "' is NOT supported!";
        }
    };
    return Social;
}());
exports.Social = Social;
