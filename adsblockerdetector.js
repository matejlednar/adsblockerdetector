/* 
 * Ads Blocker Detector
 * 
 * Author: PhDr. Matej Lednár, PhD.
 * Website: work.mldgroup.com
 * GitHub: https://github.com/matejlednar/adsblockerdetector
 * Libraries required: jQuery
 */
// ads blocker detector
var _abd = {
    _timeout: false, // timeout checker
    _config: {
        messages: {
            "sk": "Prosím vypnite ads blocker v opačnom prípade nebude obsah stránky zobrazený.",
            "en": "Please disable your ads blocker or this content won't be visible."
        },
        language: "all", // String - language | all
        autoDetection: true, // Boolean - true | false
        removeContent: true, // Boolean - true | false
        callback: null, // Function - optional, only for detectBlocker() call
        css: "external", // String - inline | external
        timeout: 1000
    },

    /**
     * Creates message from configuration
     * 
     * @returns {String}
     */
    _createMessage: function () {
        var conf = this._config;
        var language = conf.language;
        var tableStyle = "";
        var tdStyle = "";
        var message = "";
        if (this._config.css == "inline") {
            tableStyle = "style='width:100%;height:100%;text-align:center'";
            tdStyle = "style='vertical-align:middle'";
        }
        message = "<table class='ads-blocker-detector' " + tableStyle + "><tr><td " + tdStyle + ">";
        if (language == "all") {
            for (var prop in conf.messages) {
                message += "<h1 class='abd-message'>" + conf.messages[prop] + "</h1>";
            }
        } else {
            message += "<h1>" + conf.messages[language] + "</h1>";
        }
        message += "</td></tr></table>";
        return message;
    },

    /**
     * Default action
     * 
     * If removeContent is true, remove displayed content.
     * 
     * User can override default action with callback definition
     * 
     * @returns {undefined}
     */
    _performAction: function () {
        var conf = this._config;
        var body = document.body;
        var html = document.getElementsByTagName("html")[0];
        var div = document.createElement("div");

        if (conf.removeContent) {
            body.innerHTML = "";
        }
        if (conf.css == "external") {
            html.classList.add("ads-blocker-detector");
            body.classList.add("ads-blocker-detector");
            div.classList.add("ads-blocker-detector");
        }
        if (conf.css == "inline") {
            div.style.position = "absolute";
            div.style.height = "100%";
            div.style.width = "100%";
            div.style.top = "0";
            div.style.left = "0";
            body.style.position = "relative";
            body.style.height = "100%";
            body.style.width = "100%";
            html.style.height = "100%";
            html.style.width = "100%";
            html.style.overflow = "hidden";
        }

        div.innerHTML = this._createMessage();
        body.appendChild(div);
    },
    /**
     * Core
     * 
     * Add blocker detection
     * 
     * @returns {Boolean}
     */
    _detectBlocker: function () {

        var ad = $(".adsbygoogle")[0];
        var detected = false;

        var height = getComputedStyle(ad.parentNode).height;
        if (parseInt(height) == 0) {
            detected = true;
        }
        height = getComputedStyle(ad).height;
        if (parseInt(height) == 0) {
            detected = true;
        }

        var display = getComputedStyle(ad).display;
        if (display == "none") {
            detected = true;
        }

        var visibility = getComputedStyle(ad).visibility;
        if (visibility == "hidden") {
            detected = true;
        }

        if (ad.innerHTML == "") {
            detected = true;
        }

        return detected;
    },
    /**
     * Set configuration property
     * 
     * @param {String} property
     * @param {String} value
     * @returns {undefined}
     */
    set: function (property, value) {
        this._config[property] = value;
    },
    /**
     * Get configuration property
     * 
     * @param {String} property
     * @returns {_abd._config}
     */
    get: function (property) {
        return this._config[property];
    },
    /**
     * Automatic start Ad Blocker detection
     * 
     * @returns {undefined}
     */
    start: function () {

        var detected = this._detectBlocker();

        if (this._config._timeout) {
            if (this._config.callback) {
                this._config.callback(detected);
                return;
            }

            if (detected) {
                this._performAction();
            }
        }
    },
    /**
     * Detection after timeout without action
     * Returns only true or false
     * 
     * @returns {Boolean}
     */
    detectBlocker: function () {
        if (this._config._timeout) {
            return this._detectBlocker();
        } else {
            console.warn("Wait for timeout please.")
        }
    }
};

$(document).ready(function () {
    setTimeout(function () {
        if (_abd._config.autoDetection) {
            _abd._config._timeout = true;
            _abd.start();
        }
    }, _abd._config.timeout);
});


