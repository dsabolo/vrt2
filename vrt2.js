#!/usr/bin/env node

var program = require('commander');
var config  = './config.json';
var fs = require('fs');
const backstop = require('backstopjs');
var config_data;

program
    .version('0.0.1-alpha')
    .arguments('<reference_url>')
    .arguments('<test_url>')
    .option('-c, --config <config_file>', 'Configuration File (Default is config.json)')
    .action(function (reference_url, test_url) {
            console.log(reference_url);
            console.log(test_url);
            if(reference_url &&  test_url) {
                if (program.config) config = program.config;
                try {
                    config_data = require(config);
                }
                catch (e) {
                    console.error("Cant open " + config + " file. Please include the full path.");
                    return false;
                }

                // Generate the backstop config object and run the test.
                var pages = config_data.pages;
                var viewports = config_data.viewports;
                var backstop_config = {
                    "id": "vrt2_default",
                    'viewports' : viewports,
                    "onBeforeScript": "puppet/onBefore.js",
                    "onReadyScript": "puppet/onReady.js",
                    "scenarios": getScenarios(pages, test_url, reference_url),
                    "paths": {
                        "bitmaps_reference": "backstop_data/bitmaps_reference",
                        "bitmaps_test": "backstop_data/bitmaps_test",
                        "engine_scripts": "backstop_data/engine_scripts",
                        "html_report": "backstop_data/html_report",
                        "ci_report": "backstop_data/ci_report"
                    },
                    "report": ["browser"],
                    "engine": "puppeteer",
                    "engineOptions": {
                        "args": ["--no-sandbox"]
                    },
                    "asyncCaptureLimit": 5,
                    "asyncCompareLimit": 50,
                    "debug": false,
                    "debugWindow": false

                }

                var json = JSON.stringify(backstop_config);
                fs.writeFile('backstop.json', json,  function(err) {
                    if (err) throw err;
                    console.log('Backstop.js file generated');
                    // Run the test.
                    backstop('reference');
                    backstop('test');
                });

            }
        }
    )
    .parse(process.argv);


function getScenarios(pages, test_url, reference_url) {
    var scenarios = [];
    for (var i = 0, len = pages.length; i < len; i++) {
        scenarios.push(
            {
                "label": pages[i],
                "cookiePath": "backstop_data/engine_scripts/cookies.json",
                "url": test_url + pages[i],
                "referenceUrl": reference_url + pages[i],
                "readyEvent": "",
                "readySelector": "",
                "delay": 1000,
                "hideSelectors": [],
                "removeSelectors": [],
                "hoverSelector": "",
                "clickSelector": "",
                "postInteractionWait": 0,
                "selectors": [],
                "selectorExpansion": true,
                "expect": 0,
                "misMatchThreshold": 0.1,
                "requireSameDimensions": true
            }
        );
    }
    return scenarios;
}


