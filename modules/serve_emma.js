const EmmaServe = require("serve-me");

const serve_emma = EmmaServe({
    debug: true,
    log: true,
    home: "index.html",
    directory: "./public",
    error: {
        404: "404.html"
    },
    secure: false,
});

//Also you can add a callback to wait for the server to start.
serve_emma.start(process.env.PORT || 3000, function(){
    console.log("I'm alive!");
});

serve_emma.get("/", "/index.html");

// Get callback from TrueLayer
serve_emma.get("/callback/", function(req){
    return 'Got it';
	console.log(req.params)
});