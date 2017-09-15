// Setup express
var express     	    = require('express');
var app                 = express();
var config = require('config')
// Setup express here...


// Setup social-login
var socialLoginClass    = require("social-login");

// Init
var socialLogin			= new socialLoginClass({
    app:	app,    // ExpressJS instance
    url:	config.get('site.url'),  // Your root url
    onAuth:	function(req, type, uniqueProperty, accessToken, refreshToken, profile, done) {

        // This is the centralized method that is called when the user is logged in using any of the supported social site.
        // Setup once and you're done.

        findOrCreate({
            profile:	profile,        // Profile is the user's profile, already filtered to return only the parts that matter (no HTTP response code and that kind of useless data)
            property:	uniqueProperty, // What property in the data is unique: id, ID, name, ...
            type:		type            // What type of login that is: facebook, foursquare, google, ...
        }, function(user) {
            done(null, user);   // Return the user and continue
        });
    }
});


socialLogin.use({
    facebook:	{
        settings:	{
            clientID:		"YOUR_API_KEY",
            clientSecret: 	"YOUR_API_SECRET",
            authParameters:	{
                scope: 'read_stream,manage_pages'
            }
        },
        url:	{
            auth:		"/auth/facebook",           // The URL to use to login (<a href="/auth/facebook">Login with facebook</a>).
            callback: 	"/auth/facebook/callback",  // The Oauth callback url as specified in your facebook app's settings
            success:	'/',                        // Where to redirect the user once he's logged in
            fail:		'/auth/facebook/fail'       // Where to redirect the user if the login failed or was canceled.
        }
    }
    })
