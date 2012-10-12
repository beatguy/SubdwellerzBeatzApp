/*
 * JS for WACPaymentMain generated by Exadel Tiggzi
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
j_86_js = function(runBeforeShow) { /* Object & array with components "name-to-id" mapping */
    var n2id_buf = {
        'mobilelabel18': 'j_90',
        'mobilelist1': 'j_91',
        'mobilelistitem1': 'j_92',
        'mobilegrid4': 'j_93',
        'mobilegridcell20': 'j_94',
        'itemImage': 'j_95',
        'mobilegridcell12': 'j_96',
        'product_name': 'j_97',
        'product_id': 'j_98',
        'mobilegridcell13': 'j_99',
        'currency': 'j_100',
        'price': 'j_101'
    };
    if ("n2id" in window && window.n2id !== undefined) {
        $.extend(n2id, n2id_buf);
    } else {
        window.n2id = n2id_buf;
    }
    Tiggr.CurrentScreen = 'j_86';
    /*************************
     * NONVISUAL COMPONENTS  *
     *************************/
    var datasources = [];
    query_products = new Tiggr.DataSource(WACPaymentQueryProducts, {
        'onComplete': function(jqXHR, textStatus) {
            $t.refreshScreenFormElements("j_86");
        },
        'onSuccess': function(data) { // data variable contains response, which can be success as well as error
            if (data.error) {
                var errorString = data['error_description'] + ' Code: ' + data['error'];
                alert(errorString);
            }
            // if successful, data mapping is executed;
        },
        'onError': function(jqXHR, textStatus, errorThrown) {
            alert("Failed to get product list");
        },
        'responseMapping': [{
            'PATH': ['response', 'product', 'items'],
            'ID': 'mobilelistitem1',
            'TRANSFORMATION': function(value, element) {
                if (itemsFilter(value["item-id"])) {
                    element.show();
                } else {
                    element.hide();
                }
            },
            'SET': [{
                'PATH': ['currency'],
                'ID': 'currency',
                'ATTR': '@'
            }, {
                'PATH': ['item-id'],
                'ID': 'product_id',
                'ATTR': '@'
            }, {
                'PATH': ['item-id'],
                'ID': 'itemImage',
                'ATTR': 'src',
                'TRANSFORMATION': function(value, element) {
                    var url;
                    try {
                        url = itemMap[value].image;
                    } catch (err) {
                        url = "http://www.goldeneaglecoin.com/resource/image/no_image.gif";
                    }
                    return url;
                }
            }, {
                'PATH': ['item-id'],
                'ID': 'product_name',
                'ATTR': '@',
                'TRANSFORMATION': function(value, element) {
                    var item = itemMap[value];
                    return (item && item.hasOwnProperty("name")) ? item.name : "No name";
                }
            }, {
                'PATH': ['price'],
                'ID': 'price',
                'ATTR': '@',
                'TRANSFORMATION': function(value, element) {
                    value = value.toString();
                    if (value.indexOf('.') < 0) {
                        value += ".00";
                    }
                    var currencySign = element.siblings();
                    var margin = $(element).css('margin-top');
                    currencySign.css('display', 'inline-block').css('padding-right', 0).css('margin-top', margin);
                    element.parent().css('text-align', 'right');
                    element.css('display', 'inline-block').css('padding-left', 2);
                    return value;
                }
            }]
        }],
        'requestMapping': [{
            'PATH': ['client_id'],
            'ATTR': 'wac-a24874833b25ba2df799c0fe3bf49369a3f77d25',
            'TRANSFORMATION': function(value) {
                return WACPaymentSettings["client_id"];
            }
        }, {
            'PATH': ['timestamp'],
            'ID': '___local_storage___',
            'ATTR': 'WACPaymenttimestamp'
        }, {
            'PATH': ['Authorization'],
            'HEADER': true,
            'TRANSFORMATION': function(value) {
                return "Signature " + generateAuthorizationSignature(WACPaymentSettings["shared_secret"], WACPaymentSettings["application_id"], WACPaymentSettings["developer_name"], localStorage.getItem("WACPaymenttimestamp"));
            }
        }, {
            'PATH': ['product_uri'],
            'TRANSFORMATION': function(value) {
                return WACPaymentSettings["product_uri"];
            }
        }, {
            'PATH': ['Accept'],
            'HEADER': true,
            'ATTR': 'application/json'
        }, {
            'PATH': ['x-source-ip'],
            'HEADER': true,
            'ATTR': ' ',
            'TRANSFORMATION': function(value) {
                return WACPaymentSettings["spoof_ip"];
            }
        }, {
            'PATH': ['application_id'],
            'TRANSFORMATION': function(value) {
                return WACPaymentSettings["application_id"];
            }
        }]
    });
    datasources.push(query_products);
    products_properties = new Tiggr.DataSource(WACPaymentItemsProperties, {
        'onComplete': function(jqXHR, textStatus) {
            $t.refreshScreenFormElements("j_86");
        },
        'onSuccess': function(data) {
            $.each(data.results, function(index, item) {
                itemMap[item.id] = item;
            });
            try {
                query_products.execute({})
            } catch (ex) {
                console.log(ex.name + '  ' + ex.message);
                hideSpinner();
            };
        },
        'onError': function(jqXHR, textStatus, errorThrown) {},
        'responseMapping': [],
        'requestMapping': []
    });
    datasources.push(products_properties);
    /************************
     * EVENTS AND HANDLERS  *
     ************************/
    j_86_beforeshow = function() {
        Tiggr.CurrentScreen = 'j_86';
        for (var idx = 0; idx < datasources.length; idx++) {
            datasources[idx].__setupDisplay();
        }
    }
    // screen onload
    screen_A55B_onLoad = j_86_onLoad = function() {
        screen_A55B_elementsExtraJS();
        j_86_windowEvents();
        screen_A55B_elementsEvents();
    }
    // screen window events
    screen_A55B_windowEvents = j_86_windowEvents = function() {
        $('#j_86').bind('pageshow orientationchange', function() {
            adjustContentHeightWithPadding();
        });
        $('#j_86').bind({
            pageshow: function() {
                localStorage.setItem('WACPaymenttimestamp', '');
                localStorage.setItem("WACPaymenttimestamp", (new Date()).getTime());
                try {
                    products_properties.execute({})
                } catch (ex) {
                    console.log(ex.name + '  ' + ex.message);
                    hideSpinner();
                };
            },
        });
    }
    // screen elements extra js
    screen_A55B_elementsExtraJS = j_86_elementsExtraJS = function() {
        // screen (screen-A55B) extra code
        listView = $("#j_91");
        theme = listView.attr("data-theme");
        if (typeof theme !== 'undefined') {
            var themeClass = "ui-btn-up-" + theme;
            listItem = $("#j_91 .ui-li-static");
            $.each(listItem, function(index, value) {
                $(this).addClass(themeClass);
            });
        }
    }
    // screen elements handler
    screen_A55B_elementsEvents = j_86_elementsEvents = function() {
        $("a :input,a a,a fieldset label").live({
            click: function(event) {
                event.stopPropagation();
            }
        });
        $('#j_89 [name="mobilelistitem1"]').die().live({
            click: function() {
                if (!$(this).attr('disabled')) {
                    setVar_('WACPaymentitemId', 'j_98', 'text', '', this);
                    Tiggr.navigateTo('WACPaymentDetail', {
                        reverse: false
                    });
                }
            },
        });
    }
    $("#j_86").die("pagebeforeshow").live("pagebeforeshow", function(event, ui) {
        j_86_beforeshow();
    });
    if (runBeforeShow) {
        j_86_beforeshow();
    } else {
        j_86_onLoad();
    }
}
$("#j_86").die("pageinit").live("pageinit", function(event, ui) {
    j_86_js();
});