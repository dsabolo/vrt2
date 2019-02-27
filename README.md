# vrt2
A helper for performing Visual Regression Test on multiple environments (local, dev, stage, prod, etc) using [BackstopJS](https://garris.github.io/BackstopJS/) using just one config file.

## Install
Clone repo and run

    npm install -g
    
for install it globally.

If you prefer just be installed in your project,  run

    npm install
    

## Config File
Edit the config file config.json for declare pages and viewports.


 

## Usage
Run

       vrt2 <site_ref> <site_test>
       
if you have not installed globally run

       ./vrt2.js <site_ref> <site_test>


## Multiple test config

You can use others config files (useful for creating a variety of test), create the custom json file based on config.json and then run

        vrt2 -c /path/to/config_file.json  <site_ref> <site_test>
        
  





