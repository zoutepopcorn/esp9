var proc;

define(function(require, exports, module) {
    main.consumes = [
        "Plugin", "ui", "commands", "menus", "preferences", "settings", "dialog.alert", "dialog.notification", "proc"
    ];
    main.provides = ["myplugin"];
    return main;

    function main(options, imports, register) {
        var alert = imports["dialog.alert"].show;
        //alert("Success!");
        var Plugin = imports.Plugin;
        var ui = imports.ui;
        var menus = imports.menus;
        var commands = imports.commands;
        var settings = imports.settings;
        var prefs = imports.preferences;
        proc = imports.proc;
        
        /***** Initialization *****/
        
        var plugin = new Plugin("Ajax.org", main.consumes);
        var emit = plugin.getEmitter();
        
        var showing;
        function load() {
            setTimeout(function() {
                      var notify = imports["dialog.notification"].show;
                      var showCloseButton = false;
                      notify(`<style>    
                              .mijn {
                                    background: #577DDB;
                                    height: 32px;
                                    --border-bottom: 1px solid rgba(0, 0, 0, 0.61);
                                    text-shadow: 0px 1px rgba(0, 0, 0, 0.25);
                                    box-sizing: border-box;
                                    padding: 7px 8px 8px 36px;
                                    font-size: 13px;
                                    font-family: Tahoma;
                                    font-weight: bold;
                                    color: #f1f1f1;
                                    letter-spacing: 0.4px;
                                    cursor: pointer;
                                    position: relative;
                                    cursor:default;
                                }
                                </style><div class='mijn'>ESP8266 
                                <input class=".ace_text-input"></input>
                                <select id="sdk">
                                  <option value="volvo">1.5.2</option>
                                  <option value="saab">1.5.3</option>
                                  <option value="mercedes">1.5.4</option>
                                  <option value="audi">1.5.5</option>
                                </select>
                                example
                                <select id="usbport">
                                  

                                </select>
                                <button type="button">Burn</button>
                                <button type="button">Flash</button>
                                </div>
                                `, showCloseButton);
                         },200) ;
                
            setTimeout(function() {
                    //ls /dev/ttyUSB*
                    console.log(" ---------------------------- ");
                    console.log(" ---------------------------- ");
                    hoi();
                    proc.execFile("pwd", { 
                        args: ["."],
                        cwd: "/"
                    }, function(err, stdout, stderr) {
                        if (err) return console.error(err);
                    
                        //console.log(stderr, stdout);
                        console.log(stderr, stdout);
                    });
            }, 700);
            
            settings.on("read", function(e){
                settings.setDefaults("user/my-plugin", [
                    ["first", "1"],
                    ["second", "all"]
                ]);
            });
            
            prefs.add({
                "Example" : {
                    position: 450,
                    "My Plugin???" : {
                        position: 100,
                        "First Setting": {
                            type: "checkbox",
                            setting: "user/my-plugin/@first",
                            position: 100
                        },
                        "Second Setting": {
                            type: "dropdown",
                            setting: "user/my-plugin/@second",
                            width: "185",
                            position: 200,
                            items: [
                                { value: "you", caption: "You" },
                                { value: "me", caption: "Me" },
                                { value: "all", caption: "All" }
                            ]
                        }
                    }
                }
            }, plugin);
        }
        
        /***** Lifecycle *****/
        
        

        plugin.on("load", function() {
            load();
        });
        plugin.on("unload", function() {
        });
        
        register(null, {
            "myplugin": plugin
        });
    }
});

function burn() {
    proc.execFile("ls", { 
                        args: ["/dev/"],
                        cwd: "/"
                    }, function(err, stdout, stderr) {
                        if (err) return console.error(err);
                    
                        // console.log(stderr, stdout);
                        var arr = stdout.split('\n');
                        console.log(arr.length);
                        for(i=0; i < arr.length; i++) {
                            // 	console.log(arr[i]);
                            
                        	if(arr[i].startsWith("ttyUSB")) {
                        	    var port = "/dev/" + arr[i];
                        	    console.log(port);
                        	    var x = document.getElementById("usbport");
                                var option = document.createElement("option");
                                option.text = port;
                                x.add(option);
                        	}
                        }
                        
                    });
}

function hoi() {
    var e = document.getElementById("sdk");
    var sdk = e.options[e.selectedIndex].text;
    //console.log(sdk);
    proc.execFile("ls", { 
                        args: ["/dev/"],
                        cwd: "/"
                    }, function(err, stdout, stderr) {
                        if (err) return console.error(err);
                    
                        // console.log(stderr, stdout);
                        var arr = stdout.split('\n');
                        console.log(arr.length);
                        for(i=0; i < arr.length; i++) {
                            // 	console.log(arr[i]);
                            
                        	if(arr[i].startsWith("ttyUSB")) {
                        	    var port = "/dev/" + arr[i];
                        	    console.log(port);
                        	    var x = document.getElementById("usbport");
                                var option = document.createElement("option");
                                option.text = port;
                                x.add(option);
                        	}
                        }
                        
                    });
}