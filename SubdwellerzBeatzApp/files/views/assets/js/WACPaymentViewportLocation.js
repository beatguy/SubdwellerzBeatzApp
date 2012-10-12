$(document).ready(function () {
    if (Tiggzi.env == "web") {
        var redirectUri = WACPaymentSettings.redirect_uri;

        var locationAssignment = "location";
        if (!is_mobile_browser()) {
            locationAssignment = "(top.iframe_viewport || top.frames[0]).location";
        }
        var scriptBody =
            'function checkWACPaymentRedirect() {\
          var currentLocation= ' + locationAssignment + ';\
         var href = currentLocation.href;\
         var path = currentLocation.pathname;\
         var hash = currentLocation.hash;\
         var baseUrl = location.protocol + "//" + location.hostname + (location.port == "" ? "" : (":" + location.port)) + path;\
         if (baseUrl == "' + redirectUri + '") {\
                if (hash.length > 0) {\
                    if (hash.charAt(0) == "#"){\
                        hash = hash.substr(1);\
                    }\
                    var newUrl = baseUrl + "?" + hash;\
                    currentLocation.href = newUrl;\
                }\
                return true;\
            }\
            return false;\
         }';

        var scriptToEmbed = document.createElement("script");
        scriptToEmbed.type = "text/javascript";
        scriptToEmbed.innerHTML = scriptBody;

        if (!is_mobile_browser()) {
            var viewport = $("#viewport", parent.document);
            var loadScript = viewport.attr("onload") || "";
            viewport.attr("onload", scriptBody + "if (!checkWACPaymentRedirect()) {" + loadScript + "}");
        } else {
            $("body").append('<script type="text/javascript">' + scriptBody + '</script>');
            checkWACPaymentRedirect();
        }
    }
});