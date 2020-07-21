System.register(["aurelia-path", "./deep-extend", "./window-info"], function (exports_1, context_1) {
    "use strict";
    var aurelia_path_1, deep_extend_1, window_info_1, AureliaConfigx;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_path_1_1) {
                aurelia_path_1 = aurelia_path_1_1;
            },
            function (deep_extend_1_1) {
                deep_extend_1 = deep_extend_1_1;
            },
            function (window_info_1_1) {
                window_info_1 = window_info_1_1;
            }
        ],
        execute: function () {
            AureliaConfigx = (function () {
                function AureliaConfigx() {
                    this.environment = 'default';
                    this.environments = null;
                    this.directory = 'config';
                    this.config_file = 'config.json';
                    this.cascade_mode = true;
                    this.base_path_mode = false;
                    this._config_object = {};
                    this._config_merge_object = {};
                    this.failOnLoadError = true;
                    this._loaded = false;
                    this._loadError = '';
                    this.window = new window_info_1.WindowInfo();
                    this.window.hostName = window.location.hostname;
                    this.window.port = window.location.port;
                    if (window.location.pathname && window.location.pathname.length > 1) {
                        this.window.pathName = window.location.pathname;
                    }
                }
                Object.defineProperty(AureliaConfigx.prototype, "loaded", {
                    get: function () { return this._loaded; },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(AureliaConfigx.prototype, "loadError", {
                    get: function () { return this._loadError; },
                    enumerable: false,
                    configurable: true
                });
                AureliaConfigx.prototype.setDirectory = function (path) {
                    this.directory = path;
                };
                AureliaConfigx.prototype.setConfig = function (name) {
                    this.config_file = name;
                };
                AureliaConfigx.prototype.setEnvironment = function (environment) {
                    this.environment = environment;
                };
                AureliaConfigx.prototype.setEnvironments = function (environments) {
                    if (environments === void 0) { environments = null; }
                    if (environments !== null) {
                        this.environments = environments;
                        this.check();
                    }
                };
                AureliaConfigx.prototype.setCascadeMode = function (bool) {
                    if (bool === void 0) { bool = true; }
                    this.cascade_mode = bool;
                };
                AureliaConfigx.prototype.setWindow = function (window) {
                    this.window = window;
                };
                AureliaConfigx.prototype.setBasePathMode = function (bool) {
                    if (bool === void 0) { bool = true; }
                    this.base_path_mode = bool;
                };
                Object.defineProperty(AureliaConfigx.prototype, "obj", {
                    get: function () {
                        return this._config_object;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(AureliaConfigx.prototype, "config", {
                    get: function () {
                        return this.config_file;
                    },
                    enumerable: false,
                    configurable: true
                });
                AureliaConfigx.prototype.is = function (environment) {
                    return (environment === this.environment);
                };
                AureliaConfigx.prototype.check = function () {
                    var hostname = this.window.hostName;
                    if (this.window.port != '')
                        hostname += ':' + this.window.port;
                    if (this.base_path_mode)
                        hostname += this.window.pathName;
                    if (this.environments) {
                        for (var env in this.environments) {
                            var hostnames = this.environments[env];
                            if (hostnames) {
                                for (var _i = 0, hostnames_1 = hostnames; _i < hostnames_1.length; _i++) {
                                    var host = hostnames_1[_i];
                                    if (hostname.search('(?:^|\W)' + host + '(?:$|\W)') !== -1) {
                                        this.setEnvironment(env);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                };
                AureliaConfigx.prototype.environmentEnabled = function () {
                    return (!(this.environment === 'default' || this.environment === '' || !this.environment));
                };
                AureliaConfigx.prototype.environmentExists = function () {
                    return this.environment in this.obj;
                };
                AureliaConfigx.prototype.getDictValue = function (baseObject, key) {
                    var splitKey = key.split('.');
                    var currentObject = baseObject;
                    splitKey.forEach(function (key) {
                        if (currentObject[key]) {
                            currentObject = currentObject[key];
                        }
                        else {
                            throw 'Key ' + key + ' not found';
                        }
                    });
                    return currentObject;
                };
                AureliaConfigx.prototype.get = function (key, defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    var returnVal = defaultValue;
                    if (key.indexOf('.') === -1) {
                        if (!this.environmentEnabled()) {
                            return this.obj[key] ? this.obj[key] : defaultValue;
                        }
                        if (this.environmentEnabled()) {
                            if (this.environmentExists() && this.obj[this.environment][key]) {
                                returnVal = this.obj[this.environment][key];
                            }
                            else if (this.cascade_mode && this.obj[key]) {
                                returnVal = this.obj[key];
                            }
                            return returnVal;
                        }
                    }
                    else {
                        if (this.environmentEnabled()) {
                            if (this.environmentExists()) {
                                try {
                                    return this.getDictValue(this.obj[this.environment], key);
                                }
                                catch (_a) {
                                    if (this.cascade_mode) {
                                        try {
                                            return this.getDictValue(this.obj, key);
                                        }
                                        catch (_b) { }
                                    }
                                }
                            }
                        }
                        else {
                            try {
                                return this.getDictValue(this.obj, key);
                            }
                            catch (_c) { }
                        }
                    }
                    return returnVal;
                };
                AureliaConfigx.prototype.set = function (key, val) {
                    if (key.indexOf('.') === -1) {
                        this.obj[key] = val;
                    }
                    else {
                        var splitKey = key.split('.');
                        var parent_1 = splitKey[0];
                        var child = splitKey[1];
                        if (this.obj[parent_1] === undefined) {
                            this.obj[parent_1] = {};
                        }
                        this.obj[parent_1][child] = val;
                    }
                };
                AureliaConfigx.prototype.merge = function (obj) {
                    var currentConfig = this._config_object;
                    this._config_object = deep_extend_1.default(currentConfig, obj);
                };
                AureliaConfigx.prototype.lazyMerge = function (obj) {
                    var currentMergeConfig = (this._config_merge_object || {});
                    this._config_merge_object = deep_extend_1.default(currentMergeConfig, obj);
                };
                AureliaConfigx.prototype.setAll = function (obj) {
                    this._config_object = obj;
                };
                AureliaConfigx.prototype.getAll = function () {
                    return this.obj;
                };
                AureliaConfigx.prototype.loadConfig = function () {
                    var _this = this;
                    return this.loadConfigFile(aurelia_path_1.join(this.directory, this.config), function (data) { return _this.setAll(data); })
                        .then(function () {
                        if (_this._config_merge_object) {
                            _this.merge(_this._config_merge_object);
                            _this._config_merge_object = null;
                        }
                        _this._loaded = true;
                    })
                        .catch(function (reason) {
                        if (_this.failOnLoadError) {
                            throw reason;
                        }
                        _this._loadError = typeof reason === 'string' ? reason : reason.message;
                    });
                };
                AureliaConfigx.prototype.loadConfigFile = function (path, action) {
                    return new Promise(function (resolve, reject) {
                        var pathClosure = path.toString();
                        var xhr = new XMLHttpRequest();
                        if (xhr.overrideMimeType) {
                            xhr.overrideMimeType('application/json');
                        }
                        xhr.open('GET', pathClosure, true);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                                try {
                                    var data = JSON.parse(this.responseText);
                                    action(data);
                                    resolve(data);
                                }
                                catch (exc) {
                                    var errMsg = 'Error loading configuration file: ' + exc;
                                    console.error("[AureliaConfigx] " + errMsg);
                                    reject(new Error(errMsg));
                                }
                            }
                        };
                        xhr.onloadend = function (ev) {
                            if (xhr.status == 404) {
                                var errMsg = 'Configuration file could not be found: ' + path;
                                console.error("[AureliaConfigx] " + errMsg);
                                reject(new Error(errMsg));
                            }
                        };
                        xhr.onerror = function (ev) {
                            var errMsg = "Configuration file could not be found or loaded: " + pathClosure;
                            console.error("[AureliaConfigx] " + errMsg);
                            reject(new Error(errMsg));
                        };
                        xhr.send(null);
                    });
                };
                AureliaConfigx.prototype.mergeConfigFile = function (path, optional) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        _this
                            .loadConfigFile(path, function (data) {
                            _this.lazyMerge(data);
                            resolve();
                        })
                            .catch(function (error) {
                            if (optional === true) {
                                resolve();
                            }
                            else {
                                reject(error);
                            }
                        });
                    });
                };
                return AureliaConfigx;
            }());
            exports_1("AureliaConfigx", AureliaConfigx);
        }
    };
});
//# sourceMappingURL=aurelia-configx.js.map