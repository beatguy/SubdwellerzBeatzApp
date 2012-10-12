var WACPaymentO2SecurityContext = $t.createClass(SecurityContext, {

    strLocation:"",
    authResult:"",
    service:"",
    serviceSettings:"",

    unAuthorize:function () {
        localStorage.removeItem("WACPaymentaccess_token");
    },


    getToken:function () {
        var accessToken = this.__getUrlVar("access_token");
        if (accessToken) {
            return {
                accessToken:accessToken
            };
        }
        return null;
    },

    __getAuthorizationURL:function (url, scope) {
        var res = url + '?' +
            'client_id=' + WACPaymentSettings.client_id +
            '&response_type=token' +
            '&scope=' + encodeURIComponent(scope) +
            '&redirect_uri=' + encodeURIComponent(WACPaymentSettings.redirect_uri);
        return res;
    },

    __getUrlVars:function () {
        var vars = [],
            hash;
        var pos = this.authResult.indexOf('#');
        if (pos < 0) {
            pos = this.authResult.indexOf('?');
        }
        var hashes = this.authResult.slice(pos + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },

    __getUrlVar:function (name) {
        return this.__getUrlVars()[name];
    },

    __test:function() {
        return "tzd";
    },

    __obtainAuthorization:function () {
        var thisReference = this;

        var newURL = this.__getAuthorizationURL(WACPaymentSettings.authorize_uri, 'GET,POST-/payment/acr:Authorization/transactions/amount?code='
            + localStorage.getItem('WACPaymentitemId'));
        if (Tiggzi.env == "web") {
            window.location.href = newURL;
        } else {
            if (window.plugins && window.plugins.childBrowser) {
                window.plugins.childBrowser.showWebPage(newURL, { showLocationBar: false });
                window.plugins.childBrowser.onLocationChange = function(newLocation) {
                    thisReference.__childBrowserLocationChanged(newLocation, thisReference);
                };
            } else {
                alert("Child browser PhoneGAP plugin is not available");
            }
        }
    },

    __childBrowserLocationChanged:function (newLocation, self) {
        self.strLocation = newLocation;

        if (self.strLocation.indexOf(WACPaymentSettings.redirect_uri) >= 0 && self.strLocation.indexOf('app=wacdemo') < 0) {
            if (window.plugins && window.plugins.childBrowser) {
                window.plugins.childBrowser.close();
            } else {
                alert("Child browser PhoneGAP plugin is not available");
            }
            self.authResult = self.strLocation;
            localStorage.setItem("WACPaymentauthResult", self.authResult);
            var t = self.getToken();
            if (t) {
                localStorage.setItem("WACPaymentaccess_token", t.accessToken);
                self.serviceSettings.data.serverReferenceCode = self.__getUrlVar('server_reference_code');
                self.__authorizationSuccess();
            } else if (self.__getUrlVar('error')) {
                var desc = self.__getUrlVar('error_description');
                self.__authorizationError(desc);
            }
        }
    },

    __authorizationError:function (description) {
        description = decodeURIComponent(description);

        if (description == 'over operator spend limits') {
            description = " You have reached your operator spend limit. Please contact your operator for help";
        } else if (description == 'reserve funds error') {
            description = "Payment failed, please try again later. You will not be charged for this transaction. ";
        } else if (description == 'user cancelled purchase') {
            description = "Purchase canceled by user";
        } else {

        }

        Tiggr('waitLabel').hide();
        Tiggr('resultGrid').hide();
        if (Tiggr('failLabel')) {
            Tiggr('failLabel').text(description);
            Tiggr('failLabel').show();
        } else {
            alert('Error: ' + desc);
        }
    },

    __authorizationSuccess:function () {
        Tiggr('waitLabel').hide();
        Tiggr('successLabel').show();

        var authorizationHeader = 'BEARER ' + localStorage.getItem("WACPaymentaccess_token");
        this.serviceSettings.headers = jQuery.extend({}, this.serviceSettings.headers || {}, {Authorization:authorizationHeader});
        WACPaymentO2SecurityContext.$super.invoke.call(this, this.service, this.serviceSettings);
        this.unAuthorize();
    },

    invoke:function (service, settings) {
        this.service = service;
        this.serviceSettings = settings;

        var url = window.location.href;

        if (url.indexOf('server_reference_code') > 0 || url.indexOf('error') > 0) {
            this.authResult = url;
            var t = this.getToken();
            if (t) {
                localStorage.setItem("WACPaymentaccess_token", t.accessToken);
                this.serviceSettings.data.serverReferenceCode = this.__getUrlVar('server_reference_code');
                this.__authorizationSuccess();
            } else if (this.__getUrlVar('error')) {
                var desc = this.__getUrlVar('error_description');
                this.__authorizationError(desc);
            }
        } else {
            this.__obtainAuthorization(service, settings || {});
        }
    }
});