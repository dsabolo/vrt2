# vrt2
A helper for performing Visual Regression Test on multiple environments (local, dev, stage, prod, etc) using BackstopJS using just one config file.

## Install
Clone repo and run

    npm install

## Config File
Edit the config file config.json for declare pages and viewports.


 

## Usage
Run

       vrt2 <site_ref> <site_test>

If you want to use other config file, create the custom json file based on config.json and then run

        vrt2 -c /path/to/config_file.json  <site_ref> <site_test>
        
  





