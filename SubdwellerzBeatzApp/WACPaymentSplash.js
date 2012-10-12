/*
 * JS for WACPaymentSplash generated by Exadel Tiggzi
 *
 * Created on: Thursday, October 11, 2012, 07:08:19 PM (PDT)
 */
/************************************
 * JS API provided by Exadel Tiggzi  *
 ************************************/
/* Setting project environment indicator */
Tiggr.env = "bundle";
Tiggr.getProjectGUID = function() {
    return '72bec4fc-27f6-4fca-9f3d-8ce445f38f34';
}
Tiggr.getTargetPlatform = function() {
    return '0';
}

function navigateTo(outcome, useAjax) {
    Tiggr.navigateTo(outcome, useAjax);
}

function adjustContentHeight() {
    Tiggr.adjustContentHeight();
}

function adjustContentHeightWithPadding() {
    Tiggr.adjustContentHeightWithPadding();
}

function setDetailContent(pageUrl) {
    Tiggr.setDetailContent(pageUrl);
}
/**********************
 * SECURITY CONTEXTS  *
 **********************/
var WACPaymentOAuth2Context = new WACPaymentO2SecurityContext({
    'api_key': ''
});
/*******************************
 *      SERVICE SETTINGS        *
 ********************************/
var WACPaymentSettings = {
    "application_id": "wac-2e77619a-ccd3-44f7-b9c4-2baaea7d948e",
    "client_id": "wac-a24874833b25ba2df799c0fe3bf49369a3f77d25",
    "shared_secret": "9ac9beb46a9df8c96567eaf48f44e97ccd8aedbd",
    "redirect_uri": "https://gateway.wacapps.net/redirect/2b3b38c5-6877-48c0-9802-21f4279e17a1",
    "developer_name": "Omar Daniels",
    "authorize_uri": "https://api.wacapps.net//2/oauth/authorize",
    "product_uri": "https://api.wacapps.net/products",
    "spoof_ip": ""
}
/*************************
 *      SERVICES          *
 *************************/
var WACPaymentQueryProducts = new Tiggr.RestService({
    'url': '{product_uri}/{application_id}/{item_id}',
    'dataType': 'json',
    'type': 'get',
});
var WACPaymentCharge = new Tiggr.RestService({
    'url': 'https://api.wacapps.net//2/payment/acr:Authorization/transactions/amount',
    'dataType': 'json',
    'type': 'post',
    'contentType': 'application/x-www-form-urlencoded',
    'securityContext': WACPaymentOAuth2Context
});
var WACPaymentItemsProperties = new Tiggr.RestService({
    'url': 'http://tiggzi.com',
    'dataType': 'json',
    'type': 'get',
    'echo': {
        "results": [{
            "id": "wac-a0552795-c384-4005-92ea-4ceacdee0e03",
            "image": "https://wacoperatorimages.s3.amazonaws.com/b2c6647a021118685634262b6eb78e08",
            "name": "Audio Cambridge"
        }, {
            "id": "wac-c422851b-0140-47da-8079-27d382898428",
            "image": "https://wacoperatorimages.s3.amazonaws.com/49fb4f030abb3f598866898cc56ade74",
            "name": "Catalan Dictionary"
        }, {
            "id": "wac-09838a8d-eba5-49d9-a999-38ac9612046e",
            "image": "https://wacoperatorimages.s3.amazonaws.com/89cfffeff2b4111fdec193aab7f938c0",
            "name": "Russian Dictionary"
        }, {
            "id": "wac-5b89df28-aaf1-4b47-9142-c4731ea2525e",
            "image": "https://wacoperatorimages.s3.amazonaws.com/0ed759e1d1c2d3c2eac8dd46198cdfb1",
            "name": "Merriam-Webster"
        }]
    }
});
createSpinner("files/resources/lib/jquerymobile/images/ajax-loader.gif");
Tiggr.AppPages = [{
    "name": "FreeBeats",
    "location": "FreeBeats.html"
}, {
    "name": "WACPaymentSplash",
    "location": "WACPaymentSplash.html"
}, {
    "name": "WACPaymentAuthorization",
    "location": "WACPaymentAuthorization.html"
}, {
    "name": "WACPaymentDetail",
    "location": "WACPaymentDetail.html"
}, {
    "name": "WACPaymentMain",
    "location": "WACPaymentMain.html"
}, {
    "name": "Home",
    "location": "Home.html"
}, {
    "name": "Beatsforsale",
    "location": "Beatsforsale.html"
}];
j_0_js = function(runBeforeShow) { /* Object & array with components "name-to-id" mapping */
    var n2id_buf = {
        'splashImage': 'j_4'
    };
    if ("n2id" in window && window.n2id !== undefined) {
        $.extend(n2id, n2id_buf);
    } else {
        window.n2id = n2id_buf;
    }
    Tiggr.CurrentScreen = 'j_0';
    /*************************
     * NONVISUAL COMPONENTS  *
     *************************/
    var datasources = [];
    /************************
     * EVENTS AND HANDLERS  *
     ************************/
    j_0_beforeshow = function() {
        Tiggr.CurrentScreen = 'j_0';
        for (var idx = 0; idx < datasources.length; idx++) {
            datasources[idx].__setupDisplay();
        }
    }
    // screen onload
    screen_F990_onLoad = j_0_onLoad = function() {
        screen_F990_elementsExtraJS();
        j_0_windowEvents();
        screen_F990_elementsEvents();
    }
    // screen window events
    screen_F990_windowEvents = j_0_windowEvents = function() {
        $('#j_0').bind('pageshow orientationchange', function() {
            adjustContentHeightWithPadding();
        });
        $('#j_0').bind({
            pageshow: function() {
                $('[data-role=content]').css('overflow-y', 'hidden');
                $('.ui-mobile').css('overflow-y', 'hidden');
                setTimeout(function() {
                    Tiggzi("splashImage").click();
                    //Tiggr.navigateTo("main", {});
                }, 4000);
            },
        });
    }
    // screen elements extra js
    screen_F990_elementsExtraJS = j_0_elementsExtraJS = function() {
        // screen (screen-F990) extra code
    }
    // screen elements handler
    screen_F990_elementsEvents = j_0_elementsEvents = function() {
        $("a :input,a a,a fieldset label").live({
            click: function(event) {
                event.stopPropagation();
            }
        });
        $('#j_3 [name="splashImage"]').die().live({
            click: function() {
                if (!$(this).attr('disabled')) {
                    Tiggr.navigateTo('WACPaymentMain', {
                        reverse: false
                    });
                }
            },
        });
    }
    $("#j_0").die("pagebeforeshow").live("pagebeforeshow", function(event, ui) {
        j_0_beforeshow();
    });
    if (runBeforeShow) {
        j_0_beforeshow();
    } else {
        j_0_onLoad();
    }
}
$("#j_0").die("pageinit").live("pageinit", function(event, ui) {
    j_0_js();
});