(function () {
	"use strict";
	angular.module("swarmApp", ["ngAnimate", "ngCookies", "ngResource", "ngRoute", "ngSanitize", "ngTouch", "swarmEnv", "swarmSpreadsheetPreload", "angulartics", "angulartics.google.analytics", "googlechart"]),
	angular.module("swarmApp").config(["version", "env", function (a, b) {
				var c;
				return !b.sentryDSN || b.isDebugEnabled && Raven.isSetup() ? void 0 : (c = [/Permission denied to access property ['\"]toString/], Raven.config(b.sentryDSN, {
						release : a,
						maxMessageLength : 200,
						shouldSendCallback : function (a) {
							var d,
							e,
							f;
							for (e = 0, f = c.length; f > e; e++)
								if (d = c[e], d.test(a.message))
									return;
							return Math.random() < b.sentrySampleRate
						}
					}).install())
			}
		]),
	angular.module("swarmApp").config(["$routeProvider", "env", function (a, b) {
				return b.isOffline ? a.when("/debug", {
					templateUrl : "views/debug.html",
					controller : "DebugCtrl"
				}).when("/changelog", {
					templateUrl : "views/changelog.html",
					controller : "ChangelogCtrl"
				}).when("/contact", {
					templateUrl : "views/contact.html",
					controller : "ContactCtrl"
				}).when("/cleartheme", {
					templateUrl : "views/cleartheme.html",
					controller : "ClearthemeCtrl"
				}).when("/importsplash", {
					templateUrl : "views/importsplash.html",
					controller : "ImportsplashCtrl"
				}).otherwise({
					redirectTo : "/"
				}) : a.when("/debug", {
					templateUrl : "views/debug.html",
					controller : "DebugCtrl"
				}).when("/options", {
					templateUrl : "views/options.html",
					controller : "OptionsCtrl"
				}).when("/changelog", {
					templateUrl : "views/changelog.html",
					controller : "ChangelogCtrl"
				}).when("/statistics", {
					templateUrl : "views/statistics.html",
					controller : "StatisticsCtrl"
				}).when("/achievements", {
					templateUrl : "views/achievements.html",
					controller : "AchievementsCtrl"
				}).when("/", {
					templateUrl : "views/main.html",
					controller : "MainCtrl"
				}).when("/tab/:tab/unit/:unit", {
					templateUrl : "views/unit.html",
					controller : "MainCtrl"
				}).when("/unit/:unit", {
					templateUrl : "views/unit.html",
					controller : "MainCtrl"
				}).when("/tab/:tab", {
					templateUrl : "views/main.html",
					controller : "MainCtrl"
				}).when("/contact", {
					templateUrl : "views/contact.html",
					controller : "ContactCtrl"
				}).when("/cleartheme", {
					templateUrl : "views/cleartheme.html",
					controller : "ClearthemeCtrl"
				}).when("/login", b.isServerFrontendEnabled ? {
					templateUrl : "views/login.html",
					controller : "LoginCtrl"
				}
					 : {
					redirectTo : "/"
				}).when("/debug/api", b.isServerBackendEnabled ? {
					templateUrl : "views/debugapi.html",
					controller : "DebugApiCtrl"
				}
					 : {
					redirectTo : "/"
				}).when("/decimallegend", {
					templateUrl : "views/decimallegend.html",
					controller : "DecimallegendCtrl"
				}).otherwise({
					redirectTo : "/"
				})
			}
		]),
	angular.module("swarmApp").config(["env", "$logProvider", function (a, b) {
				return b.debugEnabled(a.isDebugLogged)
			}
		]),
	angular.module("swarmApp").run(["env", "$location", "$log", function (a, b, c) {
				var d,
				e,
				f,
				g;
				return e = {
					0 : !1,
					"" : !1,
					"false" : !1
				},
				d = null != (f = b.search().allowinsecure) ? f : a.httpsAllowInsecure,
				d = null != (g = e[d]) ? g : !0,
				c.debug("protocol check", d, b.protocol()),
				"http" !== b.protocol() || d ? void 0 : (window.location.protocol = "https", c.debug("window.location.protocol = 'https:'"))
			}
		]),
	angular.module("swarmApp").run(["$location", "isKongregate", function (a, b) {
				return "swarmsim.com" !== window.location.host && "www.swarmsim.com" !== window.location.host || a.search().noredirect || b() ? void 0 : window.location.host = "swarmsim.github.io"
			}
		]),
	angular.module("swarmApp").config(["env", "version", function (a) {
				var b,
				c,
				d,
				e;
				if (a.gaTrackingID && null != window.ga && !a.isOffline) {
					window.ga("create", a.gaTrackingID, "auto");
					try {
						if (window.parent !== window && null != (c = "undefined" != typeof window && null !== window && null != (d = window.parent) && null != (e = d.document) ? e.referrer : void 0))
							return window.ga("set", "referrer", c)
					} catch (f) {
						b = f
					}
				}
			}
		]),
	angular.module("swarmApp").run(["$rootScope", function (a) {
				return a.floor = function (a) {
					return Math.floor(a)
				}
			}
		]),
	angular.module("swarmApp").run(["$rootScope", function () {
				return window.module && window.module.exports && !window.Decimal && window.module.exports.random ? (window.Decimal = window.module.exports, delete window.module.exports) : void 0
			}
		]),
	angular.module("swarmApp").value("UNIT_LIMIT", "1e100000"),
	angular.module("swarmApp").run(["$rootScope", "env", function (a, b) {
				return b.isAppcacheEnabled && (appCacheNanny.set("loaderPath", "/views/appcache-loader.html"), b.isDebugEnabled) ? appCacheNanny.start({
					checkInterval : 6e4
				}) : void 0
			}
		])
}).call(this), angular.module("swarmEnv", []).constant("version", "1.0.59").constant("env", {
	name : "prod",
	isDebugEnabled : !1,
	isDebugLogged : !1,
	httpsAllowInsecure : !1,
	showSkipped : !1,
	spreadsheetKey : "v0.2",
	saveId : "v0.2",
	dropboxAppKey : "n2mff9wz6bv0f91",
	isDropboxEnabled : !0,
	saveServerUrl : "https://api.swarmsim.com",
	isKongregateSyncEnabled : !0,
	autopushIntervalMs : 9e5,
	googleApiKey : "AIzaSyCS8nqXFvhdr0AR-ox-9n_wKP2std_fHHs",
	isAppcacheEnabled : !1,
	sentryDSN : "https://5b47c35e40a34619954d42f17712eb5f@app.getsentry.com/39331",
	sentrySampleRate : .001,
	isServerBackendEnabled : !1,
	isServerFrontendEnabled : !1,
	gaTrackingID : "UA-53523462-1"
});
try {
	angular.module("swarmSpreadsheetPreload")
} catch (e) {
	angular.module("swarmSpreadsheetPreload", [])
}
angular.module("swarmSpreadsheetPreload").value("spreadsheetPreload-v0.2", {
	achievements : {
		column_names : ["name", "label", "description", "longdesc", "requires.event", "requires.unittype", "requires.upgradetype", "requires.val", "points", "visible.unittype", "visible.upgradetype", "visible.val"],
		elements : [{
				description : "Finish the tutorial",
				label : "tutorial complete",
				longdesc : "",
				name : "tutorial",
				points : 50,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "expansion",
				"requires.val" : 5,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Create your first expansion",
				label : "two base play",
				longdesc : "",
				name : "expansion1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "expansion",
				"requires.val" : 1,
				"visible.unittype" : "territory",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Have $REQUIRED expansions at once",
				label : "vast expanse",
				longdesc : "",
				name : "expansion2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "expansion",
				"requires.val" : 20,
				"visible.unittype" : "",
				"visible.upgradetype" : "expansion",
				"visible.val" : 1
			}, {
				description : "Have $REQUIRED expansions at once",
				label : "infestation",
				longdesc : "",
				name : "expansion3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "expansion",
				"requires.val" : 50,
				"visible.unittype" : "",
				"visible.upgradetype" : "expansion",
				"visible.val" : 5
			}, {
				description : "Have $REQUIRED expansions at once",
				label : "creepy",
				longdesc : "",
				name : "expansion4",
				points : 40,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "expansion",
				"requires.val" : 100,
				"visible.unittype" : "",
				"visible.upgradetype" : "expansion",
				"visible.val" : 20
			}, {
				description : "Have $REQUIRED expansions at once",
				label : "no vacancy",
				longdesc : "",
				name : "expansion5",
				points : 50,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "expansion",
				"requires.val" : 200,
				"visible.unittype" : "",
				"visible.upgradetype" : "expansion",
				"visible.val" : 50
			}, {
				description : "Have $REQUIRED expansions at once",
				label : "diminishing returns",
				longdesc : "",
				name : "expansion6",
				points : 60,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "expansion",
				"requires.val" : 500,
				"visible.unittype" : "",
				"visible.upgradetype" : "expansion",
				"visible.val" : 100
			}, {
				description : "Hatch your first drone",
				label : "a good start",
				longdesc : "",
				name : "drone1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "drone",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED drones",
				label : "supply limit exceeded",
				longdesc : "Drones hatched by queens don't count.",
				name : "drone2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "drone",
				"requires.upgradetype" : "",
				"requires.val" : 201,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED drones",
				label : '"exponential" growth',
				longdesc : "Drones hatched by queens don't count.",
				name : "drone3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "drone",
				"requires.upgradetype" : "",
				"requires.val" : 1e4,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch your first queen",
				label : "queen me",
				longdesc : "",
				name : "queen1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED queens",
				label : "is this the real life?",
				longdesc : "Queens hatched by nests don't count.",
				name : "queen2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 1e3,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED queens",
				label : "don't stop me now",
				longdesc : "Queens hatched by nests don't count.",
				name : "queen3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Create your first nest",
				label : "I wanna be the very nest",
				longdesc : "",
				name : "nest1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "nest",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "queen",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Create $REQUIRED nests",
				label : "to hatch them is my real test",
				longdesc : "",
				name : "nest2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "nest",
				"requires.upgradetype" : "",
				"requires.val" : 1e4,
				"visible.unittype" : "nest",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create $REQUIRED  nests",
				label : "final nesting place",
				longdesc : "",
				name : "nest3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "nest",
				"requires.upgradetype" : "",
				"requires.val" : 1e8,
				"visible.unittype" : "nest",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch your first greater queen",
				label : "some are born great",
				longdesc : "",
				name : "greaterqueen1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "greaterqueen",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "nest",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Hatch $REQUIRED greater queens",
				label : "catherine",
				longdesc : "",
				name : "greaterqueen2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "greaterqueen",
				"requires.upgradetype" : "",
				"requires.val" : 1e5,
				"visible.unittype" : "greaterqueen",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED greater queens",
				label : "greater and greater",
				longdesc : "",
				name : "greaterqueen3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "greaterqueen",
				"requires.upgradetype" : "",
				"requires.val" : 1e10,
				"visible.unittype" : "greaterqueen",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Build your first hive",
				label : "we'll do it hive",
				longdesc : "",
				name : "hive1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "hive",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "greaterqueen",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Build $REQUIRED hives",
				label : "breaking out",
				longdesc : "",
				name : "hive2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "hive",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "hive",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Build $REQUIRED hives",
				label : "hive mind",
				longdesc : "",
				name : "hive3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "hive",
				"requires.upgradetype" : "",
				"requires.val" : 1e12,
				"visible.unittype" : "hive",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch your first hive queen",
				label : "too many kinds of queens",
				longdesc : "",
				name : "hivequeen1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "hivequeen",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "hive",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Hatch $REQUIRED hive queens",
				label : "or just too many queens",
				longdesc : "",
				name : "hivequeen2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "hivequeen",
				"requires.upgradetype" : "",
				"requires.val" : 1e7,
				"visible.unittype" : "hivequeen",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED hive queens",
				label : "no more queens, honest",
				longdesc : "",
				name : "hivequeen3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "hivequeen",
				"requires.upgradetype" : "",
				"requires.val" : 1e14,
				"visible.unittype" : "hivequeen",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Grow your first hive empress",
				label : "queen of queens",
				longdesc : "",
				name : "empress1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "empress",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "hivequeen",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Grow $REQUIRED hive empresses",
				label : "wu zetian",
				longdesc : "",
				name : "empress2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "empress",
				"requires.upgradetype" : "",
				"requires.val" : 1e8,
				"visible.unittype" : "empress",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Grow $REQUIRED hive empresses",
				label : "matriarchy",
				longdesc : "",
				name : "empress3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "empress",
				"requires.upgradetype" : "",
				"requires.val" : 1e16,
				"visible.unittype" : "empress",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create your first neuroprophet",
				label : "1. collect larvae",
				longdesc : "",
				name : "prophet1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "prophet",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "empress",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Grow $REQUIRED neuroprophets",
				label : "2. ?",
				longdesc : "",
				name : "prophet2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "prophet",
				"requires.upgradetype" : "",
				"requires.val" : 1e9,
				"visible.unittype" : "prophet",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Grow $REQUIRED neuroprophets",
				label : "3. prophet",
				longdesc : "",
				name : "prophet3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "prophet",
				"requires.upgradetype" : "",
				"requires.val" : 1e18,
				"visible.unittype" : "prophet",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create your first hive neuron",
				label : "neurogenesis",
				longdesc : "",
				name : "goddess1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "goddess",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "prophet",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Create $REQUIRED hive neurons",
				label : "new neurons",
				longdesc : "",
				name : "goddess2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "goddess",
				"requires.upgradetype" : "",
				"requires.val" : 1e10,
				"visible.unittype" : "goddess",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create $REQUIRED hive neurons",
				label : "neuronerd",
				longdesc : "",
				name : "goddess3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "goddess",
				"requires.upgradetype" : "",
				"requires.val" : 1e20,
				"visible.unittype" : "goddess",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create your first neural cluster",
				label : "nucleus",
				longdesc : "",
				name : "pantheon1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "pantheon",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "goddess",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Create $REQUIRED neural clusters",
				label : "ganglion",
				longdesc : "",
				name : "pantheon2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "pantheon",
				"requires.upgradetype" : "",
				"requires.val" : 1e11,
				"visible.unittype" : "pantheon",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create $REQUIRED neural clusters",
				label : "cluster-something",
				longdesc : "",
				name : "pantheon3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "pantheon",
				"requires.upgradetype" : "",
				"requires.val" : 1e22,
				"visible.unittype" : "pantheon",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create your first hive network",
				label : "arpanet",
				longdesc : "",
				name : "pantheon21",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "pantheon2",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "pantheon",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Create $REQUIRED hive networks",
				label : "backpropagation",
				longdesc : "",
				name : "pantheon22",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "pantheon2",
				"requires.upgradetype" : "",
				"requires.val" : 1e12,
				"visible.unittype" : "pantheon2",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create $REQUIRED hive networks",
				label : "nydus",
				longdesc : "",
				name : "pantheon23",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "pantheon2",
				"requires.upgradetype" : "",
				"requires.val" : 1e24,
				"visible.unittype" : "pantheon2",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create your first lesser hive mind",
				label : "do you mind?",
				longdesc : "",
				name : "pantheon31",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "pantheon3",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "pantheon2",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Create $REQUIRED lesser hive minds",
				label : "lesser is morer",
				longdesc : "",
				name : "pantheon32",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "pantheon3",
				"requires.upgradetype" : "",
				"requires.val" : 1e13,
				"visible.unittype" : "pantheon3",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create $REQUIRED lesser hive minds",
				label : "lord have mercy",
				longdesc : "",
				name : "pantheon33",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "pantheon3",
				"requires.upgradetype" : "",
				"requires.val" : 1e26,
				"visible.unittype" : "pantheon3",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create your first hive mind",
				label : "one of us",
				longdesc : "",
				name : "pantheon41",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "pantheon4",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "pantheon3",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Create $REQUIRED hive minds",
				label : "groupthink",
				longdesc : "",
				name : "pantheon42",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "pantheon4",
				"requires.upgradetype" : "",
				"requires.val" : 1e14,
				"visible.unittype" : "pantheon4",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create $REQUIRED hive minds",
				label : "swarm intelligence",
				longdesc : "",
				name : "pantheon43",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "pantheon4",
				"requires.upgradetype" : "",
				"requires.val" : 1e28,
				"visible.unittype" : "pantheon4",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create your first arch-mind",
				label : "ante meridiem",
				longdesc : "",
				name : "pantheon51",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "pantheon5",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "pantheon4",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Create $REQUIRED arch-minds",
				label : "archery",
				longdesc : "",
				name : "pantheon52",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "pantheon5",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "pantheon5",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create $REQUIRED arch-minds",
				label : "cerebration time",
				longdesc : "",
				name : "pantheon53",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "pantheon5",
				"requires.upgradetype" : "",
				"requires.val" : 1e30,
				"visible.unittype" : "pantheon5",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create your first overmind",
				label : "awaken, my child",
				longdesc : "",
				name : "overmind1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "overmind",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "pantheon5",
				"visible.upgradetype" : "",
				"visible.val" : 5
			}, {
				description : "Create $REQUIRED overminds",
				label : "how ya like my groove?",
				longdesc : "",
				name : "overmind2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "overmind",
				"requires.upgradetype" : "",
				"requires.val" : 1e16,
				"visible.unittype" : "overmind",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Create $REQUIRED overminds",
				label : "well done!",
				longdesc : "",
				name : "overmind3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "overmind",
				"requires.upgradetype" : "",
				"requires.val" : 1e32,
				"visible.unittype" : "overmind",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Ascend once",
				label : "betcha can't beat just one",
				longdesc : "",
				name : "ascension1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "ascension",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				"visible.unittype" : "",
				"visible.upgradetype" : "expansion",
				"visible.val" : 40
			}, {
				description : "Ascend $REQUIRED times",
				label : "interplanetary infestation",
				longdesc : "",
				name : "ascension2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "ascension",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				"visible.unittype" : "ascension",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Ascend $REQUIRED times",
				label : "prestigious",
				longdesc : "",
				name : "ascension3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "ascension",
				"requires.upgradetype" : "",
				"requires.val" : 20,
				"visible.unittype" : "ascension",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Unlock your first mutation",
				label : "cowabunga!",
				longdesc : "",
				name : "mutation1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatehidden",
				"requires.val" : 1,
				"visible.unittype" : "ascension",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Unlock $REQUIRED mutations",
				label : "intelligent design",
				longdesc : "",
				name : "mutation2",
				points : 20,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatehidden",
				"requires.val" : 3,
				"visible.unittype" : "",
				"visible.upgradetype" : "mutatehidden",
				"visible.val" : 1
			}, {
				description : "Unlock $REQUIRED mutations",
				label : "unnatural selection",
				longdesc : "",
				name : "mutation3",
				points : 30,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatehidden",
				"requires.val" : 6,
				"visible.unittype" : "",
				"visible.upgradetype" : "mutatehidden",
				"visible.val" : 1
			}, {
				description : "Unlock $REQUIRED mutations",
				label : "a bath, ur",
				longdesc : "",
				name : "mutation4",
				points : 40,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatehidden",
				"requires.val" : 10,
				"visible.unittype" : "",
				"visible.upgradetype" : "mutatehidden",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED swarmlings",
				label : "rush",
				longdesc : "",
				name : "swarmling1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "swarmling",
				"requires.upgradetype" : "",
				"requires.val" : 6,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED swarmlings",
				label : "metabolic boost",
				longdesc : "",
				name : "swarmling2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "swarmling",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED swarmlings",
				label : "adrenal glands",
				longdesc : "",
				name : "swarmling3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "swarmling",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED stingers",
				label : "beekeeper",
				longdesc : "",
				name : "stinger1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "stinger",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED stingers",
				label : "to bee or not to bee",
				longdesc : "",
				name : "stinger2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "stinger",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED stingers",
				label : "waxing poetic",
				longdesc : "",
				name : "stinger3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "stinger",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Hatch $REQUIRED arachnomorphs",
				label : "with great power",
				longdesc : "",
				name : "spider1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "spider",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "spider",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED arachnomorphs",
				label : "the amazing spider",
				longdesc : "",
				name : "spider2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "spider",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "spider",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED arachnomorphs",
				label : "how do i shot web",
				longdesc : "",
				name : "spider3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "spider",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "spider",
				"visible.upgradetype" : "",
				"visible.val" : 100
			}, {
				description : "Hatch $REQUIRED culicimorphs",
				label : "sparkly",
				longdesc : "",
				name : "mosquito1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "mosquito",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "mosquito",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED culicimorphs",
				label : "west nile",
				longdesc : "",
				name : "mosquito2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "mosquito",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "mosquito",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED culicimorphs",
				label : "this achievement sucks",
				longdesc : "",
				name : "mosquito3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "mosquito",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "mosquito",
				"visible.upgradetype" : "",
				"visible.val" : 100
			}, {
				description : "Hatch $REQUIRED locusts",
				label : "shadow over egypt",
				longdesc : "",
				name : "locust1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "locust",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "locust",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED locusts",
				label : "stalemate",
				longdesc : "",
				name : "locust2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "locust",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "locust",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED locusts",
				label : "trypophobia",
				longdesc : "",
				name : "locust3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "locust",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "locust",
				"visible.upgradetype" : "",
				"visible.val" : 100
			}, {
				description : "Hatch $REQUIRED roaches",
				label : "roach coach",
				longdesc : "",
				name : "roach1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "roach",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "roach",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED roaches",
				label : "roach clips",
				longdesc : "",
				name : "roach2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "roach",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "roach",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED roaches",
				label : "papa",
				longdesc : "",
				name : "roach3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "roach",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "roach",
				"visible.upgradetype" : "",
				"visible.val" : 100
			}, {
				description : "Hatch $REQUIRED giant arachnomorphs",
				label : "with greater power",
				longdesc : "",
				name : "giantspider1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "giantspider",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "giantspider",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED giant arachnomorphs",
				label : "whatever a spider can",
				longdesc : "",
				name : "giantspider2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "giantspider",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "giantspider",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED giant arachnomorphs",
				label : "and I'm just sitting here",
				longdesc : "",
				name : "giantspider3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "giantspider",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "giantspider",
				"visible.upgradetype" : "",
				"visible.val" : 100
			}, {
				description : "Hatch $REQUIRED chilopodomorphs",
				label : "centipede",
				longdesc : "",
				name : "centipede1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "centipede",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "centipede",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED chilopodomorphs",
				label : "millipede",
				longdesc : "",
				name : "centipede2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "centipede",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "centipede",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED chilopodomorphs",
				label : "missile command",
				longdesc : "",
				name : "centipede3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "centipede",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "centipede",
				"visible.upgradetype" : "",
				"visible.val" : 100
			}, {
				description : "Hatch $REQUIRED wasps",
				label : "aldrin",
				longdesc : "",
				name : "wasp1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "wasp",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "wasp",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED wasps",
				label : "lightyear",
				longdesc : "",
				name : "wasp2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "wasp",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "wasp",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED wasps",
				label : "kill",
				longdesc : "",
				name : "wasp3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "wasp",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "wasp",
				"visible.upgradetype" : "",
				"visible.val" : 100
			}, {
				description : "Hatch $REQUIRED devourers",
				label : "these things fly, right?",
				longdesc : "",
				name : "devourer1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "devourer",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "devourer",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED devourers",
				label : "or do they burrow?",
				longdesc : "",
				name : "devourer2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "devourer",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "devourer",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED devourers",
				label : "sometimes they drain energy",
				longdesc : "",
				name : "devourer3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "devourer",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "devourer",
				"visible.upgradetype" : "",
				"visible.val" : 100
			}, {
				description : "Hatch $REQUIRED goons",
				label : "new year's",
				longdesc : "",
				name : "goon1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "goon",
				"requires.upgradetype" : "",
				"requires.val" : 100,
				"visible.unittype" : "goon",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED goons",
				label : "adam and",
				longdesc : "",
				name : "goon2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "goon",
				"requires.upgradetype" : "",
				"requires.val" : 1e6,
				"visible.unittype" : "goon",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Hatch $REQUIRED goons",
				label : "all hallows'",
				longdesc : "",
				name : "goon3",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "goon",
				"requires.upgradetype" : "",
				"requires.val" : 1e15,
				"visible.unittype" : "goon",
				"visible.upgradetype" : "",
				"visible.val" : 100
			}, {
				description : "Build $REQUIRED nexus",
				label : "phenomenal cosmic power",
				longdesc : "",
				name : "nexus1",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "nexus1",
				"requires.val" : 1,
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 33333333333
			}, {
				description : "Build 5 nexus",
				label : "power overwhelming",
				longdesc : "",
				name : "nexus2",
				points : 10,
				"requires.event" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "nexus5",
				"requires.val" : 1,
				"visible.unittype" : "nexus",
				"visible.upgradetype" : "",
				"visible.val" : 1
			}, {
				description : "Find the Patch Notes",
				label : "patchy knowledge",
				longdesc : "Don't take any books, please.",
				name : "changelog",
				points : 10,
				"requires.event" : "changelog",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				"visible.unittype" : "meat",
				"visible.upgradetype" : "",
				"visible.val" : 0
			}, {
				description : "Import your saved game",
				label : "portable swarm",
				longdesc : "",
				name : "import",
				points : 10,
				"requires.event" : "import",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : '{"success":true}',
				"visible.unittype" : "",
				"visible.upgradetype" : "",
				"visible.val" : ""
			}, {
				description : "Click this achievement's slot",
				label : "since you asked nicely",
				longdesc : "",
				name : "clickme",
				points : 30,
				"requires.event" : "achieveclick",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : '{"name":"clickme"}',
				"visible.unittype" : "",
				"visible.upgradetype" : "",
				"visible.val" : ""
			}, {
				description : "Enter the Konami Code",
				label : "l33t h4x",
				longdesc : "",
				name : "konami",
				points : 30,
				"requires.event" : "konami",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				"visible.unittype" : "",
				"visible.upgradetype" : "",
				"visible.val" : ""
			}, {
				description : "Find the debug page",
				label : "even de bugs have bugs",
				longdesc : "",
				name : "debug",
				points : 30,
				"requires.event" : "debugPage",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				"visible.unittype" : "",
				"visible.upgradetype" : "",
				"visible.val" : ""
			}, {
				description : "Help test Swarm Simulator v1.0.",
				label : "public test v1.0",
				longdesc : "Thank you for your help!",
				name : "publictest1",
				points : 0,
				"requires.event" : "achieve-publictest1",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				"visible.unittype" : "",
				"visible.upgradetype" : "",
				"visible.val" : ""
			}
		],
		name : "achievements"
	},
	unittypes : {
		column_names : ["name", "label", "plural", "verb", "verbone", "verbing", "column", "tab", "init", "description", "lol", "disabled", "unbuyable", "tier", "cost.unittype", "cost.val", "prod.unittype", "prod.val", "showparent", "warnfirst.unittype", "warnfirst.val", "warnfirst.text", "requires.unittype", "requires.upgradetype", "requires.val", "requires.op", "effect.type", "effect.unittype", "effect.val", "effect.stat", "effect.val2", "effect.unittype2", "effect.val3"],
		elements : [{
				column : 0,
				"cost.unittype" : "",
				"cost.val" : "",
				description : "Main source of larvae. Everyone starts with one, and no one can buy more. No one knows they have it, because it's invisible.",
				disabled : "TRUE",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : 1,
				label : "invisible hatchery",
				lol : "Stop digging around in the source code, you dirty cheater.",
				name : "invisiblehatchery",
				plural : "invisible hatcherytachi",
				"prod.unittype" : "larva",
				"prod.val" : 1,
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "TRUE",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 0,
				"cost.unittype" : "",
				"cost.val" : "",
				description : "Meat is delicious. All of your swarm's creatures eat meat.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : 35,
				label : "meat",
				lol : "Some kingdoms use meat to craft paste or cars. Meat, meat, it can't be beat~",
				name : "meat",
				plural : "meat",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 0,
				showparent : "",
				tab : "meat",
				tier : 0,
				unbuyable : "TRUE",
				verb : "gather",
				verbing : "gathering",
				verbone : "gathers",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 0,
				"cost.unittype" : "cocoon",
				"cost.val" : 1,
				description : "The children of your swarm. These young creatures morph into other adult units.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : 10,
				label : "larva",
				lol : 'Why not "larvas", English?',
				name : "larva",
				plural : "larvae",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 0,
				showparent : "invisiblehatchery",
				tab : "larva",
				tier : "",
				unbuyable : "",
				verb : "uncocoon",
				verbing : "uncocooning",
				verbone : "uncocoons",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 0,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "cocoon",
				lol : "Enemy COCOON used HARDEN!",
				name : "cocoon",
				plural : "cocoons",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "cocooning",
				"requires.val" : 1,
				showparent : "",
				tab : "larva",
				tier : "",
				unbuyable : "",
				verb : "cocoon",
				verbing : "cocooning",
				verbone : "cocoons",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 0,
				"cost.unittype" : "",
				"cost.val" : "",
				description : "-",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "territory",
				lol : "",
				name : "territory",
				plural : "territory",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "territory",
				tier : "",
				unbuyable : "TRUE",
				verb : "capture",
				verbing : "capturing",
				verbone : "captures",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 0,
				"cost.unittype" : "",
				"cost.val" : "",
				description : "Energy is consumed to use special abilities.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "energy",
				lol : "Coffee is consumed to restore energy.",
				name : "energy",
				plural : "energy",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "nexus",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "energy",
				tier : "",
				unbuyable : "TRUE",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "energy",
				"cost.val" : -1,
				description : "spent-energy consumed for respecs. affects ascension cost.",
				disabled : "TRUE",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "respecEnergy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "energy",
				tier : "",
				unbuyable : "TRUE",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "-",
				disabled : "",
				"effect.stat" : "capBase",
				"effect.type" : "addStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : 1e4,
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "nexus",
				lol : "There was a lot more to magic, as Hairy quickly found out, than waving your antennae and saying a few funny words.",
				name : "nexus",
				plural : "nexus",
				"prod.unittype" : "energy",
				"prod.val" : .1,
				"requires.op" : "",
				"requires.unittype" : "nexus",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "energy",
				tier : "",
				unbuyable : "TRUE",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "-",
				disabled : "TRUE",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "crystal",
				lol : "",
				name : "crystal",
				plural : "crystals",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "nexus",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "energy",
				tier : "",
				unbuyable : "TRUE",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "-",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "mutagen",
				lol : "",
				name : "mutagen",
				plural : "mutagen",
				"prod.unittype" : "larva",
				"prod.val" : .1,
				"requires.op" : "OR",
				"requires.unittype" : "mutagen",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "TRUE",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "mutagen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "OR",
				"requires.unittype" : "premutagen",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "mutagen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "OR",
				"requires.unittype" : "ascension",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "mutagen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "always false, hack to make OR work",
				"requires.unittype" : "invisiblehatchery",
				"requires.upgradetype" : "",
				"requires.val" : 2,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "-",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "mutagen (inactive)",
				lol : "Near comatose, no exercise / Don't tag my toe, I'm still alive",
				name : "premutagen",
				plural : "mutagen (inactive)",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "OR",
				"requires.unittype" : "mutagen",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "TRUE",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "premutagen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "OR",
				"requires.unittype" : "premutagen",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "premutagen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "OR",
				"requires.unittype" : "ascension",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "premutagen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "always false, hack to make OR work",
				"requires.unittype" : "invisiblehatchery",
				"requires.upgradetype" : "",
				"requires.val" : 2,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "total ascensions",
				disabled : "TRUE",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "ascension",
				lol : "",
				name : "ascension",
				plural : "ascensions",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "TRUE",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "TRUE",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : 4,
				label : "",
				lol : "",
				name : "freeRespec",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "TRUE",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 10,
				description : "Drones are the lowest class of worker in your swarm. They continuously gather meat to feed your swarm.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "drone",
				lol : "Not to be confused with probes or mules.",
				name : "drone",
				plural : "drones",
				"prod.unittype" : "meat",
				"prod.val" : 999999,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 0,
				showparent : "",
				tab : "meat",
				tier : 1,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "drone",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 810,
				description : "Queens rule over your swarm's workers.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "queen",
				lol : "I want to ride my bicycle / I want to ride my bike / I want to ride my bicycle / I want to ride it where I like",
				name : "queen",
				plural : "queens",
				"prod.unittype" : "drone",
				"prod.val" : 2,
				"requires.op" : "OR",
				"requires.unittype" : "ascension",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 2,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "drone",
				"cost.val" : 100,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "queen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "drone",
				"requires.upgradetype" : "",
				"requires.val" : 10,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "queen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 72900,
				description : "Nests provide space and support for your swarm's queens.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "nest",
				lol : "They also have fancy temperature controls.",
				name : "nest",
				plural : "nests",
				"prod.unittype" : "queen",
				"prod.val" : 999999999,
				"requires.op" : "OR",
				"requires.unittype" : "ascension",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 3,
				unbuyable : "",
				verb : "build",
				verbing : "building",
				verbone : "builds",
				"warnfirst.text" : "Your first nest will take a long time to regenerate the queens sacrificed to build it. Consider hatching more queens first.",
				"warnfirst.unittype" : "queen",
				"warnfirst.val" : 2e3
			}, {
				column : "",
				"cost.unittype" : "queen",
				"cost.val" : 1e3,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "nest",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "nest",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "territory",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 6561e3,
				description : "Greater queens rule over the lesser queens of very large swarms.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "greater queen",
				lol : 'Can\'t think of a name? Pick another creature and slap "greater" in front of it!',
				name : "greaterqueen",
				plural : "greater queens",
				"prod.unittype" : "nest",
				"prod.val" : 4,
				"requires.op" : "",
				"requires.unittype" : "nest",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 4,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "Your first few greater queens will take a long time to regenerate the nests sacrificed to build them. Consider building more nests first.",
				"warnfirst.unittype" : "nest",
				"warnfirst.val" : 4e4
			}, {
				column : "",
				"cost.unittype" : "nest",
				"cost.val" : 1e4,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "greaterqueen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "greaterqueen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 59049e4,
				description : "Hives are huge structures crafted from meat and the bodies of thousands of queens. They allow your swarm to grow even faster.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "hive",
				lol : "Serve the hive. Feel the groove. I control the way you move.",
				name : "hive",
				plural : "hives",
				"prod.unittype" : "greaterqueen",
				"prod.val" : 5,
				"requires.op" : "",
				"requires.unittype" : "greaterqueen",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 5,
				unbuyable : "",
				verb : "build",
				verbing : "building",
				verbone : "builds",
				"warnfirst.text" : "Your first few hives will take a long time to regenerate the greater queens sacrificed to build them. Consider hatching more greater queens first.",
				"warnfirst.unittype" : "greaterqueen",
				"warnfirst.val" : 8e5
			}, {
				column : "",
				"cost.unittype" : "greaterqueen",
				"cost.val" : 1e5,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "hive",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "hive",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 531441e5,
				description : "Hive queens oversee the production of hives in the largest swarms.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "hive queen",
				lol : "Managers managing managers managing managers.",
				name : "hivequeen",
				plural : "hive queens",
				"prod.unittype" : "hive",
				"prod.val" : 6,
				"requires.op" : "",
				"requires.unittype" : "hive",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 6,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "Your first few hive queens will take a long time to regenerate the hives sacrificed to build them. Consider building more hives first.",
				"warnfirst.unittype" : "hive",
				"warnfirst.val" : 4e6
			}, {
				column : "",
				"cost.unittype" : "hive",
				"cost.val" : 1e6,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "hivequeen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "hivequeen",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 4782969e6,
				description : "The mightiest creature to rule over your swarm so far.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "hive empress",
				lol : "On her thorax and on her forewing she has this name written: queen of queens and lady of ladies.",
				name : "empress",
				plural : "hive empresses",
				"prod.unittype" : "hivequeen",
				"prod.val" : 7,
				"requires.op" : "",
				"requires.unittype" : "hivequeen",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 7,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "hivequeen",
				"cost.val" : 1e7,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "empress",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "empress",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 43046721e7,
				description : "Your prophets foresee the guidance of a higher power, a greater being - yet, the heavens have fallen silent.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "neuroprophet",
				lol : "Heavens and goddesses and pantheons never really made much sense for a swarm, did they?",
				name : "prophet",
				plural : "neuroprophets",
				"prod.unittype" : "empress",
				"prod.val" : 8,
				"requires.op" : "",
				"requires.unittype" : "empress",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 8,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "empress",
				"cost.val" : 1e8,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "prophet",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "prophet",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 38742e12,
				description : "Neurons are the building blocks of a greater hive intelligence.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "hive neuron",
				lol : "Thanks, Neuronerd. Miss you.",
				name : "goddess",
				plural : "hive neurons",
				"prod.unittype" : "prophet",
				"prod.val" : 9,
				"requires.op" : "",
				"requires.unittype" : "prophet",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 9,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "prophet",
				"cost.val" : 1e9,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "goddess",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "goddess",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 348678e13,
				description : "Groups of neurons begin to exert mild psychic powers, influencing the minds of lesser creatures in your swarm.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "neural cluster",
				lol : "Their trick for avoiding cluster headaches is to avoid having a head.",
				name : "pantheon",
				plural : "neural clusters",
				"prod.unittype" : "goddess",
				"prod.val" : 10,
				"requires.op" : "",
				"requires.unittype" : "goddess",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 10,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "goddess",
				"cost.val" : 1e10,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 313811e15,
				description : "Networking your hive's neurons allows them to coordinate their actions, much as a single entity would.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "hive network",
				lol : "Networks also allow them to play games and watch videos of ...uh, cats.",
				name : "pantheon2",
				plural : "hive networks",
				"prod.unittype" : "pantheon",
				"prod.val" : 11,
				"requires.op" : "",
				"requires.unittype" : "pantheon",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 11,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "pantheon",
				"cost.val" : 1e12,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon2",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon2",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 2.8243e22,
				description : "Your neural networks have finally formed a single greater intelligence, primitive though it may be. The psychic powers of lesser hive minds are great enough to directly control several hundred lesser members of your swarm.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "lesser hive mind",
				lol : 'Hey, "lesser" works just as well as "greater" for naming things!',
				name : "pantheon3",
				plural : "lesser hive minds",
				"prod.unittype" : "pantheon2",
				"prod.val" : 12,
				"requires.op" : "",
				"requires.unittype" : "pantheon2",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 12,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "pantheon2",
				"cost.val" : 1e14,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon3",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon3",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 2.54187e24,
				description : "Mature hive minds control thousands of lesser members of your swarm, and their capacity for intelligent planning is dramatically improved.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "hive mind",
				lol : "Do hive minds have hives on their minds? Sounds painful.",
				name : "pantheon4",
				plural : "hive minds",
				"prod.unittype" : "pantheon3",
				"prod.val" : 13,
				"requires.op" : "",
				"requires.unittype" : "pantheon3",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 13,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "pantheon3",
				"cost.val" : 1e16,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon4",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon4",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 2.28768e26,
				description : "Multiple hive minds merge their collective consciousness into a single greater being.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "arch-mind",
				lol : "By your powers combined...",
				name : "pantheon5",
				plural : "arch-minds",
				"prod.unittype" : "pantheon4",
				"prod.val" : 14,
				"requires.op" : "",
				"requires.unittype" : "pantheon4",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 14,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "pantheon4",
				"cost.val" : 1e19,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon5",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "pantheon5",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 2.05891e28,
				description : "The Overmind psychically controls the actions of every member of your swarm, including all of the lesser hive minds. Building more physical manifestations of the Overmind merely increases its influence; all belong to the same being, the same greater intelligence. Your swarm now exists to serve the will of its Overmind.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "overmind",
				lol : "SO much cooler than that infested human, even if she did win.",
				name : "overmind",
				plural : "overminds",
				"prod.unittype" : "pantheon5",
				"prod.val" : 15,
				"requires.op" : "",
				"requires.unittype" : "pantheon5",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 15,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "pantheon5",
				"cost.val" : 1e23,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 1.85302e30,
				description : "Eternity lies ahead of us, and behind. Have you drunk your fill?",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "overmind II",
				lol : "And here's where I ran out of ideas.",
				name : "overmind2",
				plural : "overmind IIs",
				"prod.unittype" : "overmind",
				"prod.val" : 16,
				"requires.op" : "",
				"requires.unittype" : "overmind",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 16,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "overmind",
				"cost.val" : 1e28,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind2",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind2",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 1.66772e32,
				description : "Eternity lies ahead of us, and behind. Have you drunk your fill?",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "overmind III",
				lol : "And here's where I ran out of ideas.",
				name : "overmind3",
				plural : "overmind IIIs",
				"prod.unittype" : "overmind2",
				"prod.val" : 17,
				"requires.op" : "",
				"requires.unittype" : "overmind2",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 17,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "overmind2",
				"cost.val" : 1e34,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind3",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind3",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 1.50095e34,
				description : "Eternity lies ahead of us, and behind. Have you drunk your fill?",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "overmind IV",
				lol : "And here's where I ran out of ideas.",
				name : "overmind4",
				plural : "overmind IVs",
				"prod.unittype" : "overmind3",
				"prod.val" : 18,
				"requires.op" : "",
				"requires.unittype" : "overmind3",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 18,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "overmind3",
				"cost.val" : 1e41,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind4",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind4",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 1.35085e36,
				description : "Eternity lies ahead of us, and behind. Have you drunk your fill?",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "overmind V",
				lol : "And here's where I ran out of ideas.",
				name : "overmind5",
				plural : "overmind Vs",
				"prod.unittype" : "overmind4",
				"prod.val" : 19,
				"requires.op" : "",
				"requires.unittype" : "overmind4",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 19,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "overmind4",
				"cost.val" : 1e49,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind5",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind5",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 1,
				"cost.unittype" : "meat",
				"cost.val" : 1.21577e38,
				description : "Eternity lies ahead of us, and behind. Have you drunk your fill?",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "overmind VI",
				lol : "And here's where I ran out of ideas.",
				name : "overmind6",
				plural : "overmind VIs",
				"prod.unittype" : "overmind5",
				"prod.val" : 20,
				"requires.op" : "",
				"requires.unittype" : "overmind5",
				"requires.upgradetype" : "",
				"requires.val" : 1,
				showparent : "",
				tab : "meat",
				tier : 20,
				unbuyable : "",
				verb : "grow",
				verbing : "growing",
				verbone : "grows",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "overmind5",
				"cost.val" : 1e58,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind6",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "overmind6",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 750,
				description : "Your swarm's smallest and weakest warriors. They use their teeth and claws to attack foes, and can be vicious in large numbers.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "swarmling",
				lol : "Groups of six at the wrong time are pretty vicious too.",
				name : "swarmling",
				plural : "swarmlings",
				"prod.unittype" : "territory",
				"prod.val" : 99999,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 225,
				showparent : "",
				tab : "territory",
				tier : 1,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "swarmling",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 337500,
				description : "Weak flying warriors. They roam in packs, attacking any threats with venomous stingers.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "stinger",
				lol : "Reasonably smart critters - they consistently earn a 3.0 GPA.",
				name : "stinger",
				plural : "stingers",
				"prod.unittype" : "territory",
				"prod.val" : 3.15,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 101250,
				showparent : "",
				tab : "territory",
				tier : 2,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "stinger",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 151875e3,
				description : "Terrifying eight-legged beasts who leap upon their prey, ensnare it in sticky traps, and finally liquify it into a delicious beverage.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "arachnomorph",
				lol : "Four legs good. Eight legs better.",
				name : "spider",
				plural : "arachnomorphs",
				"prod.unittype" : "territory",
				"prod.val" : 141.75,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 45562500,
				showparent : "",
				tab : "territory",
				tier : 3,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "spider",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 6834375e4,
				description : "These hated creatures feast on the blood of their victims, and spread disease to larger prey they cannot kill outright.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "culicimorph",
				lol : "These guys really suck.",
				name : "mosquito",
				plural : "culicimorphs",
				"prod.unittype" : "territory",
				"prod.val" : 6378.75,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 20503125e3,
				showparent : "",
				tab : "territory",
				tier : 4,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "mosquito",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 307546875e5,
				description : "Groups of hungry locusts devour any creature that makes the mistake of standing in their way.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "locust",
				lol : "Preceded by fiery hail, followed by darkness.",
				name : "locust",
				plural : "locusts",
				"prod.unittype" : "territory",
				"prod.val" : 287043.75,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 922640625e4,
				showparent : "",
				tab : "territory",
				tier : 5,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "locust",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 138396e11,
				description : "The hard shell of the roach makes it a fearsome opponent; it is nearly impossible to kill.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "roach",
				lol : "ROOSTERS.",
				name : "roach",
				plural : "roaches",
				"prod.unittype" : "territory",
				"prod.val" : 12916968.75,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 415188e10,
				showparent : "",
				tab : "territory",
				tier : 6,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "roach",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 622782e13,
				description : "The larger, and more fearsome, cousin of the arachnomorph.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "giant arachnomorph",
				lol : "Rest assured that you do not swallow eight of these per year while sleeping.",
				name : "giantspider",
				plural : "giant arachnomorphs",
				"prod.unittype" : "territory",
				"prod.val" : 581263593.8,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 186835e13,
				showparent : "",
				tab : "territory",
				tier : 7,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "giantspider",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 2.80252e21,
				description : "Swift wormlike creatures with hundreds of legs and an extremely venomous bite.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "chilopodomorph",
				lol : "Hi Mom!",
				name : "centipede",
				plural : "chilopodomorphs",
				"prod.unittype" : "territory",
				"prod.val" : 26156861719,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 840756e15,
				showparent : "",
				tab : "territory",
				tier : 8,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "centipede",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 1.26113e24,
				description : "An advanced cousin of the stinger, wasps are far more aggressive and much better hunters.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "wasp",
				lol : "I can't beelieve you're actually reading this.",
				name : "wasp",
				plural : "wasps",
				"prod.unittype" : "territory",
				"prod.val" : 1177058777344,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 3.7834e23,
				showparent : "",
				tab : "territory",
				tier : 9,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "wasp",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 5.6751e26,
				description : "Huge burrowing worms, devourers appear from beneath the earth to swallow their prey before it can react.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "devourer",
				lol : "Extra fun in hardcore leagues and fractured maps.",
				name : "devourer",
				plural : "devourers",
				"prod.unittype" : "territory",
				"prod.val" : 52967644980469,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 1.70253e26,
				showparent : "",
				tab : "territory",
				tier : 10,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "devourer",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : 2,
				"cost.unittype" : "meat",
				"cost.val" : 2.5538e29,
				description : "Goons cannot fly on their own, but instead use metal to construct powerful flying exoskeletons that rule the skies.",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "goon",
				lol : "They like spreadsheets too.",
				name : "goon",
				plural : "goons",
				"prod.unittype" : "territory",
				"prod.val" : 238354e10,
				"requires.op" : "",
				"requires.unittype" : "meat",
				"requires.upgradetype" : "",
				"requires.val" : 7.66139e28,
				showparent : "",
				tab : "territory",
				tier : 11,
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "goon",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "queen",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "energy",
				"cost.val" : 10,
				description : "-",
				disabled : "",
				"effect.stat" : "capMult",
				"effect.type" : "asympStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : 6,
				"effect.val2" : .001,
				"effect.val3" : "",
				init : "",
				label : "nightbug",
				lol : "Often seen in the company of an ice fairy, a singing sparrow, and a ball of darkness.",
				name : "nightbug",
				plural : "nightbugs",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "nexus",
				"requires.upgradetype" : "",
				"requires.val" : 3,
				showparent : "",
				tab : "energy",
				tier : "",
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "nightbug",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "energy",
				"cost.val" : 10,
				description : "-",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "asympStat",
				"effect.unittype" : "nexus",
				"effect.unittype2" : "",
				"effect.val" : 2,
				"effect.val2" : .001,
				"effect.val3" : "",
				init : "",
				label : "lepidoptera",
				lol : "on the one ton temple bell / a moon-moth, folded into sleep, / sits still.",
				name : "moth",
				plural : "lepidoptera",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "nexus",
				"requires.upgradetype" : "",
				"requires.val" : 4,
				showparent : "",
				tab : "energy",
				tier : "",
				unbuyable : "",
				verb : "hatch",
				verbing : "hatching",
				verbone : "hatches",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "moth",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "energy",
				"cost.val" : 100,
				description : "-",
				disabled : "",
				"effect.stat" : "power",
				"effect.type" : "asympStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : 1.6,
				"effect.val2" : .001,
				"effect.val3" : "",
				init : "",
				label : "bat",
				lol : '"Bats aren\'t bugs!!" "Look, who\'s giving this report? You chowderheads... or me?!"',
				name : "bat",
				plural : "bats",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "nexus",
				"requires.upgradetype" : "",
				"requires.val" : 5,
				showparent : "",
				tab : "energy",
				tier : "",
				unbuyable : "",
				verb : "raise",
				verbing : "raising",
				verbone : "raises",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				disabled : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.val" : "",
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "bat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "invisiblehatchery",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 1,
				init : "",
				label : "hatchery mutation",
				lol : "",
				name : "mutanthatchery",
				plural : "hatchery mutations",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatehatchery",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "power",
				"effect.type" : "logStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : 1,
				init : "",
				label : "bat mutation",
				lol : "",
				name : "mutantbat",
				plural : "bat mutations",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatebat",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "power.clonelarvae",
				"effect.type" : "logStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 1.5,
				init : "",
				label : "clone mutation",
				lol : "",
				name : "mutantclone",
				plural : "clone mutations",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutateclone",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "power.swarmwarp",
				"effect.type" : "logStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 2,
				init : "",
				label : "warp mutation",
				lol : "",
				name : "mutantswarmwarp",
				plural : "warp mutations",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutateswarmwarp",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "power.larvarush",
				"effect.type" : "logStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 3,
				init : "",
				label : "rush mutation",
				lol : "",
				name : "mutantrush",
				plural : "rush mutations",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutaterush",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "power.meatrush",
				"effect.type" : "logStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 13,
				init : "",
				label : "",
				lol : "",
				name : "mutantrush",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "power.territoryrush",
				"effect.type" : "logStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 13,
				init : "",
				label : "",
				lol : "",
				name : "mutantrush",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "random.each",
				"effect.type" : "logStat",
				"effect.unittype" : "invisiblehatchery",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .5,
				init : "",
				label : "meta-mutation",
				lol : "",
				name : "mutanteach",
				plural : "meta-mutations",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutateeach",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "random.minlevel.hatchery",
				"effect.type" : "initStat",
				"effect.unittype" : "invisiblehatchery",
				"effect.unittype2" : "",
				"effect.val" : 40,
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "mutanteach",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "random.minlevel.expansion",
				"effect.type" : "initStat",
				"effect.unittype" : "invisiblehatchery",
				"effect.unittype2" : "",
				"effect.val" : 80,
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "mutanteach",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "random.freq",
				"effect.type" : "asympStat",
				"effect.unittype" : "invisiblehatchery",
				"effect.unittype2" : "",
				"effect.val" : 3,
				"effect.val2" : .001,
				"effect.val3" : 5,
				init : "",
				label : "mutation frequency",
				lol : "Savescumming won't work, by the way.",
				name : "mutantfreq",
				plural : "mutation frequency",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatefreq",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "random.freq",
				"effect.type" : "initStat",
				"effect.unittype" : "invisiblehatchery",
				"effect.unittype2" : "",
				"effect.val" : .2,
				"effect.val2" : "",
				"effect.val3" : "",
				init : "",
				label : "",
				lol : "",
				name : "mutantfreq",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "asympStat",
				"effect.unittype" : "nexus",
				"effect.unittype2" : "",
				"effect.val" : 2,
				"effect.val2" : 5e-4,
				"effect.val3" : 5,
				init : "",
				label : "lepidoptera mutation",
				lol : "",
				name : "mutantnexus",
				plural : "lepidoptera mutations",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatenexus",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "capMult",
				"effect.type" : "asympStat",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.val" : 2,
				"effect.val2" : 5e-4,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantnexus",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "ascendCost",
				"effect.type" : "asympStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.val" : 1.6,
				"effect.val2" : 5e-4,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantnexus",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "swarmling",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "territory mutation",
				lol : "",
				name : "mutantarmy",
				plural : "territory mutations",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatearmy",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "stinger",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "spider",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "mosquito",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "locust",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "roach",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "giantspider",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "centipede",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "wasp",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "devourer",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "goon",
				"effect.unittype2" : "",
				"effect.val" : 1,
				"effect.val2" : 10,
				"effect.val3" : 5,
				init : "",
				label : "",
				lol : "",
				name : "mutantarmy",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "-",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "drone",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .48,
				init : "",
				label : "meat mutation",
				lol : "",
				name : "mutantmeat",
				plural : "meat mutations",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "mutatemeat",
				"requires.val" : 1,
				showparent : "",
				tab : "mutagen",
				tier : "",
				unbuyable : "",
				verb : "mutate",
				verbing : "mutating",
				verbone : "mutates",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "queen",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .408,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "nest",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .3468,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "greaterqueen",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .29478,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "hive",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .250563,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "hivequeen",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .21297855,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "empress",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .1810317675,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "prophet",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .1538770024,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "goddess",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .130795452,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "pantheon",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .1111761342,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "pantheon2",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .09449971408,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "pantheon3",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .08032475697,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "pantheon4",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .06827604343,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "pantheon5",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .05803463691,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "overmind",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .04932944137,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "overmind2",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .04193002517,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "overmind3",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .03564052139,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "overmind4",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .03029444318,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "overmind5",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .02575027671,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}, {
				column : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				disabled : "",
				"effect.stat" : "prod",
				"effect.type" : "logStat",
				"effect.unittype" : "overmind6",
				"effect.unittype2" : "",
				"effect.val" : .1,
				"effect.val2" : 10,
				"effect.val3" : .0218877352,
				init : "",
				label : "",
				lol : "",
				name : "mutantmeat",
				plural : "",
				"prod.unittype" : "",
				"prod.val" : "",
				"requires.op" : "",
				"requires.unittype" : "",
				"requires.upgradetype" : "",
				"requires.val" : "",
				showparent : "",
				tab : "",
				tier : "",
				unbuyable : "",
				verb : "",
				verbing : "",
				verbone : "",
				"warnfirst.text" : "",
				"warnfirst.unittype" : "",
				"warnfirst.val" : ""
			}
		],
		name : "unittypes"
	},
	upgrades : {
		column_names : ["name", "label", "description", "lol", "maxlevel", "class", "unittype", "requires.unittype", "requires.val", "cost.unittype", "cost.val", "cost.factor", "effect.type", "effect.unittype", "effect.upgradetype", "effect.val", "effect.stat", "effect.val2", "effect.unittype2"],
		elements : [{
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "meat",
				"cost.val" : 300,
				description : "-",
				"effect.stat" : "base",
				"effect.type" : "addStat",
				"effect.unittype" : "invisiblehatchery",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "hatchery",
				lol : "",
				maxlevel : "",
				name : "hatchery",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "invisiblehatchery"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnitRand",
				"effect.unittype" : "premutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.2544,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "hatchery",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 2.45,
				"cost.unittype" : "territory",
				"cost.val" : 10,
				description : "-",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "invisiblehatchery",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.1,
				"effect.val2" : "",
				label : "expansion",
				lol : "",
				maxlevel : "",
				name : "expansion",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "invisiblehatchery"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnitRand",
				"effect.unittype" : "premutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.12,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "expansion",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1e4,
				"cost.unittype" : "meat",
				"cost.val" : 5e6,
				description : "-",
				"effect.stat" : "prod",
				"effect.type" : "multStatPerAchievementPoint",
				"effect.unittype" : "larva",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : .001,
				"effect.val2" : "",
				label : "accomplished ancestry",
				lol : "",
				maxlevel : 5,
				name : "achievementbonus",
				"requires.unittype" : "meat",
				"requires.val" : 5e4,
				unittype : "invisiblehatchery"
			}, {
				"class" : "",
				"cost.factor" : 1e4,
				"cost.unittype" : "territory",
				"cost.val" : 500,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "achievementbonus",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : "",
				"cost.unittype" : "meat",
				"cost.val" : 3.33333e21,
				description : "Allows your larvae to encase themselves within cocoons. Cocooned larvae cannot mutate into other units, and can still be cloned by Clone Larvae. You may cocoon and uncocoon your larvae whenever you wish.",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "cocooning",
				lol : "",
				maxlevel : 1,
				name : "cocooning",
				"requires.unittype" : "nexus",
				"requires.val" : 4,
				unittype : "invisiblehatchery"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "drone",
				"cost.val" : 66,
				description : "Drones gather more meat.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "drone",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster drones",
				lol : "",
				maxlevel : "",
				name : "droneprod",
				"requires.unittype" : "drone",
				"requires.val" : 67,
				unittype : "drone"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "queen",
				"cost.val" : 66,
				description : "Queens produce more drones.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "queen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster queens",
				lol : "",
				maxlevel : "",
				name : "queenprod",
				"requires.unittype" : "queen",
				"requires.val" : 67,
				unittype : "queen"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "nest",
				"cost.val" : 66,
				description : "Nests produce more queens.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "nest",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster nests",
				lol : "",
				maxlevel : "",
				name : "nestprod",
				"requires.unittype" : "nest",
				"requires.val" : 67,
				unittype : "nest"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "greaterqueen",
				"cost.val" : 66,
				description : "Greater queens produce more nests.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "greaterqueen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster greater queens",
				lol : "",
				maxlevel : "",
				name : "greaterqueenprod",
				"requires.unittype" : "greaterqueen",
				"requires.val" : 67,
				unittype : "greaterqueen"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "hive",
				"cost.val" : 66,
				description : "Hives produce more greater queens.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "hive",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster hives",
				lol : "",
				maxlevel : "",
				name : "hiveprod",
				"requires.unittype" : "hive",
				"requires.val" : 67,
				unittype : "hive"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "hivequeen",
				"cost.val" : 66,
				description : "Hive queens produce more hives.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "hivequeen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster hive queens",
				lol : "",
				maxlevel : "",
				name : "hivequeenprod",
				"requires.unittype" : "hivequeen",
				"requires.val" : 67,
				unittype : "hivequeen"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "empress",
				"cost.val" : 66,
				description : "Hive empresses produce more hive queens.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "empress",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster hive empresses",
				lol : "",
				maxlevel : "",
				name : "empressprod",
				"requires.unittype" : "empress",
				"requires.val" : 67,
				unittype : "empress"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "prophet",
				"cost.val" : 66,
				description : "Neuroprophets produce more hive empresses.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "prophet",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster neuroprophets",
				lol : "",
				maxlevel : "",
				name : "prophetprod",
				"requires.unittype" : "prophet",
				"requires.val" : 67,
				unittype : "prophet"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "goddess",
				"cost.val" : 66,
				description : "Hive neurons produce more neuroprophets.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "goddess",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster hive neurons",
				lol : "",
				maxlevel : "",
				name : "goddessprod",
				"requires.unittype" : "goddess",
				"requires.val" : 67,
				unittype : "goddess"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "pantheon",
				"cost.val" : 66,
				description : "Neural clusters produce more hive neurons.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster neural clusters",
				lol : "",
				maxlevel : "",
				name : "pantheonprod",
				"requires.unittype" : "pantheon",
				"requires.val" : 67,
				unittype : "pantheon"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "pantheon2",
				"cost.val" : 66,
				description : "Hive networks produce more neural clusters.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon2",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster hive networks",
				lol : "",
				maxlevel : "",
				name : "pantheon2prod",
				"requires.unittype" : "pantheon2",
				"requires.val" : 67,
				unittype : "pantheon2"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "pantheon3",
				"cost.val" : 66,
				description : "Lesser hive minds produce more hive networks.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon3",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster lesser hive minds",
				lol : "",
				maxlevel : "",
				name : "pantheon3prod",
				"requires.unittype" : "pantheon3",
				"requires.val" : 67,
				unittype : "pantheon3"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "pantheon4",
				"cost.val" : 66,
				description : "Hive minds produce more lesser hive minds.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon4",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster hive minds",
				lol : "",
				maxlevel : "",
				name : "pantheon4prod",
				"requires.unittype" : "pantheon4",
				"requires.val" : 67,
				unittype : "pantheon4"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "pantheon5",
				"cost.val" : 66,
				description : "Arch-minds produce more hive minds.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon5",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster arch-minds",
				lol : "",
				maxlevel : "",
				name : "pantheon5prod",
				"requires.unittype" : "pantheon5",
				"requires.val" : 67,
				unittype : "pantheon5"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "overmind",
				"cost.val" : 66,
				description : "Overminds produce more arch-minds.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster overminds",
				lol : "",
				maxlevel : "",
				name : "overmindprod",
				"requires.unittype" : "overmind",
				"requires.val" : 67,
				unittype : "overmind"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "overmind2",
				"cost.val" : 66,
				description : "Overmind IIs produce more overminds.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind2",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster overmind IIs",
				lol : "",
				maxlevel : "",
				name : "overmind2prod",
				"requires.unittype" : "overmind2",
				"requires.val" : 67,
				unittype : "overmind2"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "overmind3",
				"cost.val" : 66,
				description : "Overmind IIIs produce more overmind IIs.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind3",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster overmind IIIs",
				lol : "",
				maxlevel : "",
				name : "overmind3prod",
				"requires.unittype" : "overmind3",
				"requires.val" : 67,
				unittype : "overmind3"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "overmind4",
				"cost.val" : 66,
				description : "Overmind IVs produce more overmind IIIs.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind4",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster overmind IVs",
				lol : "",
				maxlevel : "",
				name : "overmind4prod",
				"requires.unittype" : "overmind4",
				"requires.val" : 67,
				unittype : "overmind4"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "overmind5",
				"cost.val" : 66,
				description : "Overmind Vs produce more overmind IVs.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind5",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster overmind Vs",
				lol : "",
				maxlevel : "",
				name : "overmind5prod",
				"requires.unittype" : "overmind5",
				"requires.val" : 67,
				unittype : "overmind5"
			}, {
				"class" : "upgrade",
				"cost.factor" : 666,
				"cost.unittype" : "overmind6",
				"cost.val" : 66,
				description : "Overmind VIs produce more overmind Vs.",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind6",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "faster overmind VIs",
				lol : "",
				maxlevel : "",
				name : "overmind6prod",
				"requires.unittype" : "overmind6",
				"requires.val" : 67,
				unittype : "overmind6"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "queen",
				"cost.val" : 1,
				description : "Multiple drones hatch from each larva. (This does not affect queen production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "drone",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin drones",
				lol : "",
				maxlevel : "",
				name : "dronetwin",
				"requires.unittype" : "queen",
				"requires.val" : 1,
				unittype : "drone"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "nest",
				"cost.val" : 1,
				description : "Multiple queens hatch from each larva. (This does not affect nest production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "queen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin queens",
				lol : "",
				maxlevel : "",
				name : "queentwin",
				"requires.unittype" : "nest",
				"requires.val" : 1,
				unittype : "queen"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "greaterqueen",
				"cost.val" : 1,
				description : "Multiple nests are constructed from each larva. (This does not affect greater queen production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "nest",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin nests",
				lol : "",
				maxlevel : "",
				name : "nesttwin",
				"requires.unittype" : "greaterqueen",
				"requires.val" : 1,
				unittype : "nest"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "hive",
				"cost.val" : 1,
				description : "Multiple greater queens hatch from each larva. (This does not affect hive production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "greaterqueen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin greater queens",
				lol : "",
				maxlevel : "",
				name : "greaterqueentwin",
				"requires.unittype" : "hive",
				"requires.val" : 1,
				unittype : "greaterqueen"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "hivequeen",
				"cost.val" : 1,
				description : "Multiple hives are constructed from each larva. (This does not affect hive queen production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "hive",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin hives",
				lol : "",
				maxlevel : "",
				name : "hivetwin",
				"requires.unittype" : "hivequeen",
				"requires.val" : 1,
				unittype : "hive"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "empress",
				"cost.val" : 1,
				description : "Multiple hive queens hatch from each larva. (This does not affect hive empress production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "hivequeen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin hive queens",
				lol : "",
				maxlevel : "",
				name : "hivequeentwin",
				"requires.unittype" : "empress",
				"requires.val" : 1,
				unittype : "hivequeen"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "prophet",
				"cost.val" : 1,
				description : "Multiple hive empresses hatch from each larva. (This does not affect neuroprophet production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "empress",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin hive empresses",
				lol : "",
				maxlevel : "",
				name : "empresstwin",
				"requires.unittype" : "prophet",
				"requires.val" : 1,
				unittype : "empress"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "goddess",
				"cost.val" : 1,
				description : "Multiple neuroprophets hatch from each larva. (This does not affect hive neuron production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "prophet",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin neuroprophets",
				lol : "",
				maxlevel : "",
				name : "prophettwin",
				"requires.unittype" : "goddess",
				"requires.val" : 1,
				unittype : "prophet"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "pantheon",
				"cost.val" : 1,
				description : "Multiple hive neurons are created from each larva. (This does not affect neural cluster production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "goddess",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin hive neurons",
				lol : "",
				maxlevel : "",
				name : "goddesstwin",
				"requires.unittype" : "pantheon",
				"requires.val" : 1,
				unittype : "goddess"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "pantheon2",
				"cost.val" : 1,
				description : "Multiple neural clusters are created from each larva. (This does not affect hive network production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin neural clusters",
				lol : "",
				maxlevel : "",
				name : "pantheontwin",
				"requires.unittype" : "pantheon2",
				"requires.val" : 1,
				unittype : "pantheon"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "pantheon3",
				"cost.val" : 1,
				description : "Multiple hive networks are created from each larva. (This does not affect lesser hive mind production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon2",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin hive networks",
				lol : "",
				maxlevel : "",
				name : "pantheon2twin",
				"requires.unittype" : "pantheon3",
				"requires.val" : 1,
				unittype : "pantheon2"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "pantheon4",
				"cost.val" : 1,
				description : "Multiple lesser hive minds are created from each larva. (This does not affect hive mind production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon3",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin lesser hive minds",
				lol : "",
				maxlevel : "",
				name : "pantheon3twin",
				"requires.unittype" : "pantheon4",
				"requires.val" : 1,
				unittype : "pantheon3"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "pantheon5",
				"cost.val" : 1,
				description : "Multiple hive minds are created from each larva. (This does not affect arch-mind production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon4",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin hive minds",
				lol : "",
				maxlevel : "",
				name : "pantheon4twin",
				"requires.unittype" : "pantheon5",
				"requires.val" : 1,
				unittype : "pantheon4"
			}, {
				"class" : "upgrade",
				"cost.factor" : 10,
				"cost.unittype" : "overmind",
				"cost.val" : 1,
				description : "Multiple arch-minds are created from each larva. (This does not affect overmind production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "pantheon5",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin arch-minds",
				lol : "",
				maxlevel : "",
				name : "pantheon5twin",
				"requires.unittype" : "overmind",
				"requires.val" : 1,
				unittype : "pantheon5"
			}, {
				"class" : "upgrade",
				"cost.factor" : 12,
				"cost.unittype" : "overmind2",
				"cost.val" : 1,
				description : "Multiple overminds are created from each larva. (This does not affect overmind II production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin overminds",
				lol : "",
				maxlevel : "",
				name : "overmindtwin",
				"requires.unittype" : "overmind2",
				"requires.val" : 1,
				unittype : "overmind"
			}, {
				"class" : "upgrade",
				"cost.factor" : 14,
				"cost.unittype" : "overmind3",
				"cost.val" : 1,
				description : "Multiple overmind IIs are created from each larva. (This does not affect overmind III production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind2",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin overmind IIs",
				lol : "",
				maxlevel : "",
				name : "overmind2twin",
				"requires.unittype" : "overmind3",
				"requires.val" : 1,
				unittype : "overmind2"
			}, {
				"class" : "upgrade",
				"cost.factor" : 16,
				"cost.unittype" : "overmind4",
				"cost.val" : 1,
				description : "Multiple overmind IIIs are created from each larva. (This does not affect overmind IV production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind3",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin overmind IIIs",
				lol : "",
				maxlevel : "",
				name : "overmind3twin",
				"requires.unittype" : "overmind4",
				"requires.val" : 1,
				unittype : "overmind3"
			}, {
				"class" : "upgrade",
				"cost.factor" : 18,
				"cost.unittype" : "overmind5",
				"cost.val" : 1,
				description : "Multiple overmind IVs are created from each larva. (This does not affect overmind V production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind4",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin overmind IVs",
				lol : "",
				maxlevel : "",
				name : "overmind4twin",
				"requires.unittype" : "overmind5",
				"requires.val" : 1,
				unittype : "overmind4"
			}, {
				"class" : "upgrade",
				"cost.factor" : 20,
				"cost.unittype" : "overmind6",
				"cost.val" : 1,
				description : "Multiple overmind Vs are created from each larva. (This does not affect overmind VI production.)",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "overmind5",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin overmind Vs",
				lol : "",
				maxlevel : "",
				name : "overmind5twin",
				"requires.unittype" : "overmind6",
				"requires.val" : 1,
				unittype : "overmind5"
			}, {
				"class" : "upgrade",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "Multiple overmind VIs are created from each larva.",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "twin overmind VIs",
				lol : "",
				maxlevel : "",
				name : "overmind6twin",
				"requires.unittype" : "invisiblehatchery",
				"requires.val" : 2,
				unittype : "overmind6"
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple swarmlings hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "swarmling",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin swarmlings",
				lol : "",
				maxlevel : "",
				name : "swarmlingtwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "swarmling"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "swarmlingtwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple stingers hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "stinger",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin stingers",
				lol : "",
				maxlevel : "",
				name : "stingertwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "stinger"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "stingertwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple arachnomorphs hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "spider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin arachnomorphs",
				lol : "",
				maxlevel : "",
				name : "spidertwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "spider"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "spidertwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple culicimorphs hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "mosquito",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin culicimorphs",
				lol : "",
				maxlevel : "",
				name : "mosquitotwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "mosquito"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mosquitotwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple locusts hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "locust",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin locusts",
				lol : "",
				maxlevel : "",
				name : "locusttwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "locust"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "locusttwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple roaches hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "roach",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin roaches",
				lol : "",
				maxlevel : "",
				name : "roachtwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "roach"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "roachtwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple giant arachnomorphs hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "giantspider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin giant arachnomorphs",
				lol : "",
				maxlevel : "",
				name : "giantspidertwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "giantspider"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "giantspidertwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple chilopodomorphs hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "centipede",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin chilopodomorphs",
				lol : "",
				maxlevel : "",
				name : "centipedetwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "centipede"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "centipedetwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple wasps hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "wasp",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin wasps",
				lol : "",
				maxlevel : "",
				name : "wasptwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "wasp"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "wasptwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple devourers hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "devourer",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin devourers",
				lol : "",
				maxlevel : "",
				name : "devourertwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "devourer"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "devourertwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 500,
				"cost.unittype" : "meat",
				"cost.val" : 100,
				description : "Multiple goons hatch from each larva.",
				"effect.stat" : "twin",
				"effect.type" : "multStat",
				"effect.unittype" : "goon",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : "",
				label : "twin goons",
				lol : "",
				maxlevel : "",
				name : "goontwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : "goon"
			}, {
				"class" : "",
				"cost.factor" : 50,
				"cost.unittype" : "larva",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "goontwin",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 1.14921e32,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "swarmling",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower swarmlings",
				lol : "",
				maxlevel : "",
				name : "swarmlingempower",
				"requires.unittype" : "meat",
				"requires.val" : 2.5538e29,
				unittype : "swarmling"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "swarmling",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "swarmlingempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "swarmling",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "swarmlingempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "swarmling",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "swarmlingempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 5.17144e34,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "stinger",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower stingers",
				lol : "",
				maxlevel : "",
				name : "stingerempower",
				"requires.unittype" : "meat",
				"requires.val" : 1.14921e32,
				unittype : "stinger"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "stinger",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "stingerempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "stinger",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "stingerempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "stinger",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "stingerempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 2.32715e37,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "spider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower arachnomorphs",
				lol : "",
				maxlevel : "",
				name : "spiderempower",
				"requires.unittype" : "meat",
				"requires.val" : 5.17144e34,
				unittype : "spider"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "spider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "spiderempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "spider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "spiderempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "spider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "spiderempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 1.04722e40,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "mosquito",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower culicimorphs",
				lol : "",
				maxlevel : "",
				name : "mosquitoempower",
				"requires.unittype" : "meat",
				"requires.val" : 2.32715e37,
				unittype : "mosquito"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "mosquito",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mosquitoempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "mosquito",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mosquitoempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "mosquito",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mosquitoempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 4.71247e42,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "locust",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower locusts",
				lol : "",
				maxlevel : "",
				name : "locustempower",
				"requires.unittype" : "meat",
				"requires.val" : 1.04722e40,
				unittype : "locust"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "locust",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "locustempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "locust",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "locustempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "locust",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "locustempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 2.12061e45,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "roach",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower roaches",
				lol : "",
				maxlevel : "",
				name : "roachempower",
				"requires.unittype" : "meat",
				"requires.val" : 4.71247e42,
				unittype : "roach"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "roach",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "roachempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "roach",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "roachempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "roach",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "roachempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 9.54276e47,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "giantspider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower giant arachnomorphs",
				lol : "",
				maxlevel : "",
				name : "giantspiderempower",
				"requires.unittype" : "meat",
				"requires.val" : 2.12061e45,
				unittype : "giantspider"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "giantspider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "giantspiderempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "giantspider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "giantspiderempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "giantspider",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "giantspiderempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 4.29424e50,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "centipede",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower chilopodomorphs",
				lol : "",
				maxlevel : "",
				name : "centipedeempower",
				"requires.unittype" : "meat",
				"requires.val" : 9.54276e47,
				unittype : "centipede"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "centipede",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "centipedeempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "centipede",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "centipedeempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "centipede",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "centipedeempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 1.93241e53,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "wasp",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower wasps",
				lol : "",
				maxlevel : "",
				name : "waspempower",
				"requires.unittype" : "meat",
				"requires.val" : 4.29424e50,
				unittype : "wasp"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "wasp",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "waspempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "wasp",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "waspempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "wasp",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "waspempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 8.69584e55,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "devourer",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower devourers",
				lol : "hey, that rhymes",
				maxlevel : "",
				name : "devourerempower",
				"requires.unittype" : "meat",
				"requires.val" : 1.93241e53,
				unittype : "devourer"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "devourer",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "devourerempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "devourer",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "devourerempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "devourer",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "devourerempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 1.53228e29,
				"cost.unittype" : "meat",
				"cost.val" : 3.91313e58,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "goon",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 0,
				"effect.val2" : "",
				label : "empower goons",
				lol : "",
				maxlevel : "",
				name : "goonempower",
				"requires.unittype" : "meat",
				"requires.val" : 8.69584e55,
				unittype : "goon"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "prod",
				"effect.type" : "multStat",
				"effect.unittype" : "goon",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 153228e13,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "goonempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "cost.meat",
				"effect.type" : "multStat",
				"effect.unittype" : "goon",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1.53228e29,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "goonempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "suffix",
				"effect.unittype" : "goon",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "goonempower",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : "",
				"cost.unittype" : "meat",
				"cost.val" : 3333333333333,
				description : "Build your first nexus, which generates energy and allows you to cast basic spells.",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "nexus",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "construct nexus",
				lol : "",
				maxlevel : 1,
				name : "nexus1",
				"requires.unittype" : "meat",
				"requires.val" : 333333333333,
				unittype : "meat"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2e3,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "nexus1",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : "",
				"cost.unittype" : "meat",
				"cost.val" : 333333e10,
				description : "Build your second nexus, which generates more energy and unlocks several more special abilities.",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "nexus",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "construct nexus",
				lol : "",
				maxlevel : 1,
				name : "nexus2",
				"requires.unittype" : "meat",
				"requires.val" : 0,
				unittype : "nexus"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "energy",
				"cost.val" : 625,
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 4e3,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "nexus2",
				"requires.unittype" : "nexus",
				"requires.val" : 1,
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : "",
				"cost.unittype" : "meat",
				"cost.val" : 333333e13,
				description : "Build your third nexus, generating even more energy and unlocking more advanced spells.",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "nexus",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "construct nexus",
				lol : "",
				maxlevel : 1,
				name : "nexus3",
				"requires.unittype" : "meat",
				"requires.val" : 0,
				unittype : "nexus"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "energy",
				"cost.val" : 2500,
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 6e3,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "nexus3",
				"requires.unittype" : "nexus",
				"requires.val" : 2,
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "larva",
				"cost.val" : 3333333,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "nexus3",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : "",
				"cost.unittype" : "meat",
				"cost.val" : 3.33333e21,
				description : "Build your fourth nexus, generating even more energy and unlocking some of the most advanced spells available to your swarm.",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "nexus",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "construct nexus",
				lol : "",
				maxlevel : 1,
				name : "nexus4",
				"requires.unittype" : "meat",
				"requires.val" : 0,
				unittype : "nexus"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "energy",
				"cost.val" : 1e4,
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 8e3,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "nexus4",
				"requires.unittype" : "nexus",
				"requires.val" : 3,
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "larva",
				"cost.val" : 33333330,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "nexus4",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : "",
				"cost.unittype" : "meat",
				"cost.val" : 3.33333e24,
				description : "Build your fifth and final nexus. All spells and abilities are unlocked. Your spellcasters cannot channel energy from more than five nexus; this is the limit of their power.",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "nexus",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "construct nexus",
				lol : "",
				maxlevel : 1,
				name : "nexus5",
				"requires.unittype" : "meat",
				"requires.val" : 0,
				unittype : "nexus"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "energy",
				"cost.val" : 36e3,
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1e4,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "nexus5",
				"requires.unittype" : "nexus",
				"requires.val" : 4,
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "larva",
				"cost.val" : 3333333e3,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "nexus5",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "ability",
				"cost.factor" : 1,
				"cost.unittype" : "energy",
				"cost.val" : 1600,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "addUnitByVelocity",
				"effect.unittype" : "larva",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 2400,
				"effect.val2" : "",
				label : "larva rush",
				lol : "",
				maxlevel : "",
				name : "larvarush",
				"requires.unittype" : "nexus",
				"requires.val" : 1,
				unittype : "energy"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "larva",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1e5,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "larvarush",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "ability",
				"cost.factor" : 1,
				"cost.unittype" : "energy",
				"cost.val" : 2e3,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "skipTime",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 900,
				"effect.val2" : "",
				label : "swarmwarp",
				lol : "",
				maxlevel : "",
				name : "swarmwarp",
				"requires.unittype" : "nexus",
				"requires.val" : 1,
				unittype : "energy"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnitByVelocity",
				"effect.unittype" : "energy",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : -900,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "swarmwarp",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "ability",
				"cost.factor" : 1,
				"cost.unittype" : "energy",
				"cost.val" : 1600,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "addUnitByVelocity",
				"effect.unittype" : "meat",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 7200,
				"effect.val2" : "",
				label : "meat rush",
				lol : "",
				maxlevel : "",
				name : "meatrush",
				"requires.unittype" : "nexus",
				"requires.val" : 2,
				unittype : "energy"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "meat",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1e11,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "meatrush",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "ability",
				"cost.factor" : 1,
				"cost.unittype" : "energy",
				"cost.val" : 1600,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "addUnitByVelocity",
				"effect.unittype" : "territory",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 7200,
				"effect.val2" : "",
				label : "territory rush",
				lol : "",
				maxlevel : "",
				name : "territoryrush",
				"requires.unittype" : "nexus",
				"requires.val" : 3,
				unittype : "energy"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "territory",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1e9,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "territoryrush",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "ability",
				"cost.factor" : 1,
				"cost.unittype" : "energy",
				"cost.val" : 12e3,
				description : "-",
				"effect.stat" : "",
				"effect.type" : "compoundUnit",
				"effect.unittype" : "larva",
				"effect.unittype2" : "cocoon",
				"effect.upgradetype" : "",
				"effect.val" : 2,
				"effect.val2" : 1e5,
				label : "clone larvae",
				lol : "",
				maxlevel : "",
				name : "clonelarvae",
				"requires.unittype" : "nexus",
				"requires.val" : 4,
				unittype : "energy"
			}, {
				"class" : "ability",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "",
				"effect.type" : "",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : "",
				"effect.val2" : "",
				label : "hidden mutation cost tracker",
				lol : "",
				maxlevel : "",
				name : "mutatehidden",
				"requires.unittype" : "invisiblehatchery",
				"requires.val" : 2,
				unittype : "ascension"
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "mutate hatcheries",
				lol : "",
				maxlevel : 1,
				name : "mutatehatchery",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatehatchery",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutanthatchery",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatehatchery",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "mutate bats",
				lol : "",
				maxlevel : 1,
				name : "mutatebat",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatebat",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutantbat",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatebat",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "mutate clones",
				lol : "",
				maxlevel : 1,
				name : "mutateclone",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutateclone",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutantclone",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutateclone",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "mutate swarmwarps",
				lol : "",
				maxlevel : 1,
				name : "mutateswarmwarp",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutateswarmwarp",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutantswarmwarp",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutateswarmwarp",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "mutate rushes",
				lol : "",
				maxlevel : 1,
				name : "mutaterush",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutaterush",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutantrush",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutaterush",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "meta-mutation",
				lol : "",
				maxlevel : 1,
				name : "mutateeach",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutateeach",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutanteach",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutateeach",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "mutate frequency",
				lol : "",
				maxlevel : 1,
				name : "mutatefreq",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatefreq",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutantfreq",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatefreq",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "mutate lepidoptera",
				lol : "",
				maxlevel : 1,
				name : "mutatenexus",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatenexus",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutantnexus",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatenexus",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "mutate territory",
				lol : "",
				maxlevel : 1,
				name : "mutatearmy",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatearmy",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutantarmy",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatearmy",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "upgrade",
				"cost.factor" : 15625,
				"cost.unittype" : "mutagen",
				"cost.val" : 1,
				description : "",
				"effect.stat" : "upgradecost",
				"effect.type" : "addStat",
				"effect.unittype" : "mutagen",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "mutate meat",
				lol : "",
				maxlevel : 1,
				name : "mutatemeat",
				"requires.unittype" : "ascension",
				"requires.val" : 0,
				unittype : "mutagen"
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUpgrade",
				"effect.unittype" : "",
				"effect.unittype2" : "",
				"effect.upgradetype" : "mutatehidden",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatemeat",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}, {
				"class" : "",
				"cost.factor" : "",
				"cost.unittype" : "",
				"cost.val" : "",
				description : "",
				"effect.stat" : "",
				"effect.type" : "addUnit",
				"effect.unittype" : "mutantmeat",
				"effect.unittype2" : "",
				"effect.upgradetype" : "",
				"effect.val" : 1,
				"effect.val2" : "",
				label : "",
				lol : "",
				maxlevel : "",
				name : "mutatemeat",
				"requires.unittype" : "",
				"requires.val" : "",
				unittype : ""
			}
		],
		name : "upgrades"
	}
}), function () {
	"use strict";
	angular.module("swarmApp").factory("saveId", ["env", "isKongregate", function (a, b) {
				var c;
				return c = b() ? "-kongregate" : "",
				"" + a.saveId + c
			}
		]),
	angular.module("swarmApp").factory("session", ["storage", "$rootScope", "$log", "util", "version", "env", "saveId", "isKongregate", function (a, b, c, d, e, f, g, h) {
				var i,
				j,
				k;
				return i = btoa("Cheater :(\n\n"),
				k = "|",
				new(j = function () {
					function j() {
						this.reset(),
						c.debug("save id", this.id),
						d.assert(this.id, "no save id defined")
					}
					return j.prototype.reset = function () {
						var a;
						return a = new Date,
						this.id = g,
						this.heartbeatId = this.id + ":heartbeat",
						this.state = {
							unittypes : {},
							date : {
								started : a,
								restarted : a,
								saved : a,
								loaded : a,
								reified : a,
								closed : a
							},
							options : {},
							upgrades : {},
							statistics : {},
							achievements : {},
							watched : {},
							skippedMillis : 0,
							version : {
								started : e,
								saved : e
							}
						},
						h() && (this.state.kongregate = !0),
						b.$broadcast("reset", {
							session : this
						})
					},
					j.prototype._saves = function (a, b) {
						var c,
						d;
						return null == a && (a = this.state),
						null == b && (b = !0),
						b && (a.date.saved = new Date, delete a.date.loaded, null != (c = a.version) && (c.saved = e)),
						d = JSON.stringify(a),
						d = LZString.compressToBase64(d),
						d = i + d,
						d = "" + btoa(e) + k + d
					},
					j.prototype._hasVersionHeader = function (a) {
						return a.indexOf(k) >= 0
					},
					j.prototype._splitVersionHeader = function (a) {
						var b,
						c;
						return this._hasVersionHeader(a) && (b = a.split(k), c = b[0], a = b[1]),
						[c, a]
					},
					j.prototype._validateSaveVersion = function (a, b) {
						var c,
						d,
						f,
						g,
						h,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p;
						if (null == a && (a = "0.1.0"), null == b && (b = e), k = a.split(".").map(function (a) {
									return parseInt(a)
								}), n = k[0], o = k[1], p = k[2], l = b.split(".").map(function (a) {
									return parseInt(a)
								}), f = l[0], g = l[1], h = l[2], n === f && 0 === f && o !== g)
							throw new Error("Beta save from different minor version");
						if (n > 0 && 0 === f)
							throw new Error("1.0 save in 0.x game");
						if (f > 0 && 0 === n && 2 > o)
							throw new Error("nice try, no 0.1.x saves");
						if (d = [/^1\.0\.0-publictest/], a !== b) {
							for (m = [], i = 0, j = d.length; j > i; i++) {
								if (c = d[i], c.test(a))
									throw new Error("blacklisted save version");
								m.push(void 0)
							}
							return m
						}
					},
					j.prototype._validateFormatVersion = function (a, b) {
						var c,
						d,
						f,
						g,
						h;
						if (null == b && (b = e), d = [/^1\.0\.0-publictest/], a !== b) {
							for (h = [], f = 0, g = d.length; g > f; f++) {
								if (c = d[f], c.test(a))
									throw new Error("blacklisted save version");
								h.push(void 0)
							}
							return h
						}
					},
					j.prototype._loads = function (a) {
						var b,
						d,
						e,
						f,
						g,
						h,
						j,
						k,
						l,
						m,
						n;
						a = a.replace(/\s+/g, ""),
						c.debug("decoding imported game. len", null != a ? a.length : void 0),
						g = this._splitVersionHeader(a),
						m = g[0],
						a = g[1],
						a = a.substring(i.length),
						a = LZString.decompressFromBase64(a),
						c.debug("decompressed imported game successfully", [a]),
						l = JSON.parse(a),
						c.debug("parsed imported game successfully", l),
						h = l.date;
						for (d in h)
							n = h[d], l.date[d] = new Date(n);
						for (l.date.loaded = new Date, this._validateSaveVersion(null != (j = l.version) ? j.started : void 0), m && this._validateFormatVersion(atob(m)), k = [l.unittypes, l.upgrades], b = 0, e = k.length; e > b; b++) {
							f = k[b];
							for (d in f)
								n = f[d], _.isNumber(n) && (n = n.toPrecision(15)), f[d] = new Decimal(n)
						}
						return l
					},
					j.prototype.exportSave = function () {
						return null == this._exportCache && (this._exportCache = this._saves(void 0, !1)),
						this._exportCache
					},
					j.prototype.exportJson = function () {
						return JSON.stringify(this.state)
					},
					j.prototype.importSave = function (a, b) {
						return null == b && (b = !0),
						this.state = this._loads(a),
						this._exportCache = a,
						b ? void 0 : this._write()
					},
					j.prototype._write = function () {
						var d,
						e;
						try {
							a.setItem(this.id, this._exportCache),
							e = !0
						} catch (f) {
							d = f,
							c.error("failed to save game", d),
							b.$broadcast("save:failed", {
								error : d,
								session : this
							})
						}
						return e ? b.$broadcast("save", this) : void 0
					},
					j.prototype.save = function () {
						return f.isOffline && c.warn("cannot save, game is offline"),
						delete this._exportCache,
						this._exportCache = this._saves(),
						this._write(),
						c.debug("saving game (fresh export)")
					},
					j.prototype._setItem = function (b, c) {
						return a.setItem(b, c)
					},
					j.prototype.getStoredSaveData = function (b) {
						return null == b && (b = this.id),
						a.getItem(b)
					},
					j.prototype.load = function (a) {
						return this.importSave(this.getStoredSaveData(a))
					},
					j.prototype.onClose = function () {
						return this.onHeartbeat()
					},
					j.prototype.onHeartbeat = function () {
						var a;
						if (f.isOffline)
							return !1;
						try {
							return this._setItem(this.heartbeatId, new Date)
						} catch (b) {
							return a = b,
							c.warn("couldn't write heartbeat")
						}
					},
					j.prototype._getHeartbeatDate = function () {
						var b,
						d;
						try {
							if (d = a.getItem(this.heartbeatId))
								return new Date(d)
						} catch (e) {
							return b = e,
							c.debug("Couldn't load heartbeat time to determine game-closed time. No biggie, continuing.", b)
						}
					},
					j.prototype.dateClosed = function (a) {
						var b,
						d,
						e,
						f,
						g;
						null == a && (a = !1),
						b = 0,
						!a && (e = this._getHeartbeatDate()) && (b = Math.max(b, e.getTime())),
						g = this.state.date;
						for (f in g)
							d = g[f], "loaded" !== f && "saved" !== f && (b = Math.max(b, d.getTime()));
						return c.debug("dateclosed final", b, f, (new Date).getTime() - b),
						new Date(b)
					},
					j.prototype.millisSinceClosed = function (a, b) {
						var c,
						d;
						return null == a && (a = new Date),
						c = this.dateClosed(b),
						d = a.getTime() - c.getTime()
					},
					j.prototype.durationSinceClosed = function (a, b) {
						var c;
						return c = this.millisSinceClosed(a, b),
						moment.duration(c, "milliseconds")
					},
					j
				}
					())
			}
		]),
	angular.module("swarmApp").factory("remoteSession", ["storage", "$rootScope", "$log", "util", "version", "env", "saveId", "isKongregate", function () {}

		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("DebugCtrl", ["$scope", "session", "game", "spreadsheet", "env", "unittypes", "flashqueue", "$timeout", "$log", "util", function (a, b, c, d, e, f, g, h, i, j) {
				return a.$emit("debugPage"),
				e.isDebugEnabled ? (a.dumps = [{
							title : "env",
							data : e
						}, {
							title : "game",
							data : !!c
						}, {
							title : "session",
							data : b
						}, {
							title : "unittypes",
							data : !!f
						}, {
							title : "spreadsheet",
							data : d
						}
					], a.notify = g, a.achieve = function () {
					return a.notify.push({
						type : {
							label : "fake achievement",
							longdesc : "yay"
						},
						pointsEarned : function () {
							return 42
						},
						description : function () {
							return "wee"
						}
					})
				}, a.throwUp = function () {
					throw new Error("throwing up (test exception)")
				}, a.assertFail = function () {
					return j.assert(!1, "throwing up (test assertion failure)")
				}, a.error = function () {
					return j.error("throwing up (test util.error)")
				}, a.form = {}, a.session = b, a.$watch("form.session", function (b, c) {
						return b !== c ? (i.debug("formsession update", b, a.session._saves(b, !1)), a.session.importSave(a.session._saves(JSON.parse(b), !1))) : i.debug("formsession equal")
					}), a.$watch("session", function () {
						return i.debug("session update"),
						a.form.sessionExport = a.session.exportSave(),
						a.form.session = JSON.stringify(a.session._loads(a.form.sessionExport), void 0, 2)
					}
						()), a.game = c, a.env = e, a.confirmReset = function () {
					return confirm("You will lose everything and restart the game. You sure?") ? c.reset() : void 0
				}) : void 0
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("spreadsheet", ["$log", "$injector", "env", function (a, b, c) {
				var d;
				return d = b.get("spreadsheetPreload-" + c.spreadsheetKey),
				a.debug("loaded spreadsheet", c.spreadsheetKey, d), {
					data : d
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("bignumFormatter", ["options", function (a) {
				return function (b, c) {
					var d;
					return null == c && (c = {}),
					null == c.sigfigs && (c.sigfigs = 3),
					null == c.minsuffix && (c.minsuffix = 1e5),
					d = function (a, b) {
						return b ? a + "" : a.toPrecision(c.sigfigs, Decimal.ROUND_FLOOR)
					},
					function (e, f, g) {
						var h,
						i,
						j,
						k;
						if (null == f && (f = 0), null == g && (g = !1), k = b, !e)
							return e;
						if (e = new Decimal(e + ""), e.isZero())
							return e + "";
						if (e.lessThan(f))
							return d(e, g).replace(/\.?0+$/, "");
						if (e = e.floor(), e.lessThan(c.minsuffix))
							return numeral(e.toNumber()).format("0,0");
						if (h = Math.floor(e.e / 3), "hybrid" === a.notation() && (k = k.slice(0, 12)), "engineering" === a.notation())
							j = "E" + 3 * h;
						else {
							if ("scientific-e" === a.notation() || h >= k.length)
								return i = c.sigfigs - 1, g && (i = void 0), e.toExponential(i, Decimal.ROUND_FLOOR).replace("e+", "e");
							j = k[h]
						}
						return e = e.dividedBy(Decimal.pow(1e3, h)),
						"" + d(e, g) + j
					}
				}
			}
		]),
	angular.module("swarmApp").filter("bignum", ["bignumFormatter", "numberSuffixesShort", function (a, b) {
				return a(b)
			}
		]),
	angular.module("swarmApp").filter("longnum", ["bignumFormatter", "numberSuffixesLong", function (a, b) {
				return a(b, {
					sigfigs : 6,
					minsuffix : 1e6
				})
			}
		]),
	angular.module("swarmApp").filter("ceil", function () {
		return function (a) {
			return Math.ceil(a)
		}
	}),
	angular.module("swarmApp").filter("percent", ["$filter", function (a) {
				return function (b, c) {
					var d;
					return null == c && (c = {}),
					_.isNumber(c) && (c = {
							places : c
						}),
					null == c.places && (c.places = 0),
					d = new Decimal(b + ""),
					c.plusOne && (d = d.minus(1)),
					d = d.times(100),
					c.floor && (d = d.floor()),
					d = c.longnum ? a("longnum")(d) : a("number")(d.toNumber(), c.places),
					d + "%";

				}
			}
		]),
	angular.module("swarmApp").constant("numberSuffixesShort", ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "UDc", "DDc", "TDc", "QaDc", "QiDc", "SxDc", "SpDc", "ODc", "NDc", "Vi", "UVi", "DVi", "TVi", "QaVi", "QiVi", "SxVi", "SpVi", "OVi", "NVi", "Tg", "UTg", "DTg", "TTg", "QaTg", "QiTg", "SxTg", "SpTg", "OTg", "NTg", "Qd", "UQd", "DQd", "TQd", "QaQd", "QiQd", "SxQd", "SpQd", "OQd", "NQd", "Qq", "UQq", "DQq", "TQq", "QaQq", "QiQq", "SxQq", "SpQq", "OQq", "NQq", "Sg", "USg", "DSg", "TSg", "QaSg", "QiSg", "SxSg", "SpSg", "OSg", "NSg", "St", "USt", "DSt", "TSt", "QaSt", "QiSt", "SxSt", "SpSt", "OSt", "NSt", "Og", "UOg", "DOg", "TOg", "QaOg", "QiOg", "SxOg", "SpOg", "OOg", "NOg"]),
	angular.module("swarmApp").constant("numberSuffixesLong", ["", " thousand", " million", " billion", " trillion", " quadrillion", " quintillion", " sextillion", " septillion", " octillion", " nonillion", " decillion", " undecillion", " duodecillion", " tredecillion", " quattuordecillion", " quinquadecillion", " sedecillion", " septendecillion", " octodecillion", " novendecillion", " vigintillion", " unvigintillion", " duovigintillion", " tresvigintillion", " quattuorvigintillion", " quinquavigintillion", " sesvigintillion", " septemvigintillion", " octovigintillion", " novemvigintillion", " trigintillion", " untrigintillion", " duotrigintillion", " trestrigintillion", " quattuortrigintillion", " quinquatrigintillion", " sestrigintillion", " septentrigintillion", " octotrigintillion", " noventrigintillion", " quadragintillion", " unquadragintillion", " duoquadragintillion", " tresquadragintillion", " quattuorquadragintillion", " quinquaquadragintillion", " sesquadragintillion", " septenquadragintillion", " octoquadragintillion", " novenquadragintillion", " quinquagintillion", " unquinquagintillion", " duoquinquagintillion", " tresquinquagintillion", " quattuorquinquagintillion", " quinquaquinquagintillion", " sesquinquagintillion", " septenquinquagintillion", " octoquinquagintillion", " novenquinquagintillion", " sexagintillion", " unsexagintillion", " duosexagintillion", " tresexagintillion", " quattuorsexagintillion", " quinquasexagintillion", " sesexagintillion", " septensexagintillion", " octosexagintillion", " novensexagintillion", " septuagintillion", " unseptuagintillion", " duoseptuagintillion", " treseptuagintillion", " quattuorseptuagintillion", " quinquaseptuagintillion", " seseptuagintillion", " septenseptuagintillion", " octoseptuagintillion", " novenseptuagintillion", " octogintillion", " unoctogintillion", " duooctogintillion"])
}
.call(this), function () {
	"use strict";
	var a = [].slice;
	angular.module("swarmApp").factory("spreadsheetUtil", ["util", function (b) {
				var c;
				return new(c = function () {
					function c() {}

					return c.prototype.defaultFilter = function (a) {
						return !!a || _.isNumber(a)
					},
					c.prototype.setNested = function (b, c, d) {
						var e,
						f,
						g,
						h,
						i,
						j,
						k;
						for (k = c, c = 2 <= k.length ? a.call(k, 0, f = k.length - 1) : (f = 0, []), h = k[f++], e = b, g = 0, i = c.length; i > g; g++)
							j = c[g], null == e[j] && (e[j] = {}), e = e[j];
						return e[h] = d,
						b
					},
					c.prototype.getNested = function (a, b) {
						var c,
						d,
						e,
						f;
						for (c = a, d = 0, e = b.length; e > d; d++)
							f = b[d], c = c[f];
						return c
					},
					c.prototype.normalizeRow = function (a, b) {
						var c,
						d,
						e,
						f;
						null == b && (b = this.defaultFilter),
						e = {};
						for (c in a)
							f = a[c], b(f) && (d = c.split("."), this.setNested(e, d, f));
						return e
					},
					c.prototype.normalizeRows = function (a, b) {
						var c,
						d,
						e,
						f;
						for (null == b && (b = this.defaultFilter), e = [], c = 0, d = a.length; d > c; c++)
							f = a[c], e.push(this.normalizeRow(f, b));
						return e
					},
					c.prototype.groupRows = function (a, b, c) {
						var d,
						e,
						f,
						g,
						h,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p,
						q;
						null == c && (c = this.defaultFilter),
						q = [];
						for (h in a) {
							if (m = a[h], e = _.groupBy(b, h), p = _.uniq(_.map(b, h)), _.isString(m) && (m = [m]), !_.isArray(m))
								throw new Error("groupRows: nested groupings not supported yet");
							for (f = 0, j = p.length; j > f; f++)
								for (i = p[f], d = e[i], q.push(o = _.clone(d[0])), g = 0, k = m.length; k > g; g++)
									l = m[g], n = _.pluck(d, l), o[l] = _.filter(n, c)
						}
						return q
					},
					c.prototype.parseRows = function (a, b, c) {
						var d;
						return null == c && (c = this.defaultFilter),
						d = this.normalizeRows(b, c),
						this.groupRows(a, d, c)
					},
					c.prototype.resolveList = function (a, c, d, e) {
						var f,
						g,
						h,
						i,
						j;
						for (null == e && (e = {}), null == e.required && (e.required = !0), j = [], f = 0, g = a.length; g > f; f++)
							i = a[f], h = i[c], i[c] = d[h], j.push(b.assert(i[c] || !e.required, "couldn't resolve ref: " + i + "." + c + "=" + h, i, c, h, d[h], a));
						return j
					},
					c
				}
					())
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").config(["$provide", function (a) {
				return a.decorator("$exceptionHandler", ["$delegate", "$injector", function (a, b) {
							var c;
							return c = null,
							function (d, e) {
								return a(d, e),
								null == c && (c = b.get("$rootScope")),
								c.$emit("unhandledException", {
									exception : d,
									cause : e
								})
							}
						}
					])
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("ProducerPath", ["$log", "UNIT_LIMIT", function (a, b) {
				var c;
				return c = function () {
					function a(a, b) {
						var c;
						this.unit = a,
						this.path = b,
						c = _.map(this.path, function () {
								return function (a) {
									return a.parent.name
								}
							}
								(this)).join(">"),
						this.name = this.unit.name + ":" + c + ">" + this.unit.name
					}
					return a.prototype.first = function () {
						return this.path[0]
					},
					a.prototype.isZero = function () {
						return this.first().parent.count().isZero()
					},
					a.prototype.degree = function () {
						return this.path.length
					},
					a.prototype.degreeOrZero = function () {
						return this.isZero() ? 0 : this.degree()
					},
					a.prototype.prodEach = function () {
						var a,
						c;
						return null != (a = this.unit.game.cache.producerPathProdEach)[c = this.name] ? a[c] : a[c] = function (a) {
							return function () {
								var c,
								d,
								e,
								f,
								g,
								h;
								for (g = new Decimal(1), f = a.path, d = 0, e = f.length; e > d; d++)
									c = f[d], h = new Decimal(c.prod.val).plus(c.parent.stat("base", 0)), g = g.times(h), g = g.times(c.parent.stat("prod", 1)), g = Decimal.min(g, b);
								return g
							}
						}
						(this)()
					},
					a.prototype.coefficient = function (a) {
						return null == a && (a = this.first().parent.rawCount()),
						a.floor().times(this.prodEach())
					},
					a.prototype.coefficientNow = function () {
						return this.coefficient(this.first().parent.count())
					},
					a.prototype.count = function (a) {
						var b,
						c;
						return c = this.degree(),
						b = this.coefficient(),
						b.times(Decimal.pow(a, c)).dividedBy(math.factorial(c))
					},
					a
				}
				()
			}
		]),
	angular.module("swarmApp").factory("ProducerPaths", ["$log", "ProducerPath", function (a, b) {
				var c;
				return c = function () {
					function a(a, c) {
						this.unit = a,
						this.raw = c,
						this.list = _.map(this.raw, function (a) {
								return function (c) {
									var d;
									return d = c.concat([a.unit]),
									new b(a.unit, _.map(c, function (a, b) {
											var c,
											e;
											return c = d[b + 1],
											e = a.prodByName[c.name], {
												parent : a,
												child : c,
												prod : e
											}
										}))
								}
							}
								(this)),
						this.byDegree = _.groupBy(this.list, function (a) {
								return a.degree()
							})
					}
					return a.prototype.getDegreeCoefficient = function (a, b) {
						var c,
						d,
						e,
						f,
						g,
						h;
						for (null == b && (b = !1), h = new Decimal(0), g = null != (f = this.byDegree[a]) ? f : [], c = 0, d = g.length; d > c; c++)
							e = g[c], h = h.plus(b ? e.coefficientNow() : e.coefficient());
						return h
					},
					a.prototype.getMaxDegree = function () {
						return this.getCoefficients().length - 1
					},
					a.prototype.getCoefficients = function () {
						var a,
						b;
						return null != (a = this.unit.game.cache.producerPathCoefficients)[b = this.unit.name] ? a[b] : a[b] = this._getCoefficients()
					},
					a.prototype._getCoefficients = function (a) {
						var b,
						c,
						d,
						e,
						f,
						g,
						h,
						i,
						j,
						k,
						l;
						for (null == a && (a = !1), l = [a ? this.unit.count() : this.unit.rawCount()], j = this.list, e = 0, g = j.length; g > e; e++)
							i = j[e], d = i.degree(), c = a ? i.coefficientNow() : i.coefficient(), c.isZero() || (l[d] = (null != (k = l[d]) ? k : new Decimal(0)).plus(c));
						for (d = f = 0, h = l.length; h > f; d = ++f)
							b = l[d], null == b && (l[d] = new Decimal(0));
						return l
					},
					a.prototype.getCoefficientsNow = function () {
						return this._getCoefficients(!0)
					},
					a.prototype.count = function (a) {
						var b,
						c,
						d,
						e,
						f,
						g;
						for (g = new Decimal(0), f = this.getCoefficients(), c = d = 0, e = f.length; e > d; c = ++d)
							b = f[c], g = g.plus(b.times(Decimal.pow(a, c)).dividedBy(math.factorial(c)));
						return g
					},
					a
				}
				()
			}
		]),
	angular.module("swarmApp").factory("Unit", ["util", "$log", "Effect", "ProducerPaths", "UNIT_LIMIT", function (a, b, c, d, e) {
				var f;
				return f = function () {
					function f(a, b) {
						this.game = a,
						this.unittype = b,
						this.name = this.unittype.name,
						this.suffix = "",
						this.affectedBy = [],
						this.type = this.unittype
					}
					return f.prototype._init = function () {
						var b;
						return this.prod = _.map(this.unittype.prod, function (a) {
								return function (b) {
									var c;
									return c = _.clone(b),
									c.unit = a.game.unit(b.unittype),
									c.val = new Decimal(c.val),
									c
								}
							}
								(this)),
						this.prodByName = _.indexBy(this.prod, function (a) {
								return a.unit.name
							}),
						this.cost = _.map(this.unittype.cost, function (a) {
								return function (b) {
									var c;
									return c = _.clone(b),
									c.unit = a.game.unit(b.unittype),
									c.val = new Decimal(c.val),
									c
								}
							}
								(this)),
						this.costByName = _.indexBy(this.cost, function (a) {
								return a.unit.name
							}),
						this.warnfirst = _.map(this.unittype.warnfirst, function (a) {
								return function (b) {
									var c;
									return c = _.clone(b),
									c.unit = a.game.unit(b.unittype),
									c
								}
							}
								(this)),
						this.showparent = this.game.unit(this.unittype.showparent),
						this.upgrades = {
							list : function () {
								var a,
								c,
								d,
								e,
								f;
								for (d = this.game.upgradelist(), f = [], a = 0, c = d.length; c > a; a++)
									b = d[a], (this.unittype === b.type.unittype || (null != (e = this.showparent) ? e.unittype : void 0) === b.type.unittype) && f.push(b);
								return f
							}
							.call(this)
						},
						this.upgrades.byName = _.indexBy(this.upgrades.list, "name"),
						this.upgrades.byClass = _.groupBy(this.upgrades.list, function (a) {
								return a.type["class"]
							}),
						this.requires = _.map(this.unittype.requires, function (b) {
								return function (c) {
									var d;
									return a.assert(c.unittype || c.upgradetype, "unit require without a unittype or upgradetype", b.name, name, c),
									a.assert(!(c.unittype && c.upgradetype), "unit require with both unittype and upgradetype", b.name, name, c),
									d = _.clone(c),
									d.val = new Decimal(d.val),
									null != c.unittype && (d.resource = d.unit = a.assert(b.game.unit(c.unittype))),
									null != c.upgradetype && (d.resource = d.upgrade = a.assert(b.game.upgrade(c.upgradetype))),
									d
								}
							}
								(this)),
						this.cap = _.map(this.unittype.cap, function (a) {
								return function (b) {
									var c;
									return c = _.clone(b),
									c.unit = a.game.unit(c.unittype),
									c.val = new Decimal(c.val),
									c
								}
							}
								(this)),
						this.effect = _.map(this.unittype.effect, function (a) {
								return function (b) {
									var d;
									return d = new c(a.game, a, b),
									d.unit.affectedBy.push(d),
									d
								}
							}
								(this)),
						this.tab = this.game.tabs.byName[this.unittype.tab],
						this.tab ? (this.next = this.tab.next(this), this.prev = this.tab.prev(this)) : void 0
					},
					f.prototype._init2 = function () {
						return this._producerPath = new d(this, _.map(this.unittype.producerPathList, function (b) {
									return function (c) {
										return _.map(c, function (c) {
											var d;
											return d = b.game.unit(c),
											a.assert(d),
											d
										})
									}
								}
									(this)))
					},
					f.prototype.isCountInitialized = function () {
						return null != this.game.session.state.unittypes[this.name]
					},
					f.prototype.rawCount = function () {
						var b,
						c;
						return null != (b = this.game.cache.unitRawCount)[c = this.name] ? b[c] : b[c] = function (b) {
							return function () {
								var c,
								d;
								return d = null != (c = b.game.session.state.unittypes[b.name]) ? c : 0,
								_.isNaN(d) && (a.error("NaN count. oops.", b.name, d), d = 0),
								_.isNumber(d) && (d = d.toPrecision(15)),
								new Decimal(d)
							}
						}
						(this)()
					},
					f.prototype._setCount = function (a) {
						return this.game.session.state.unittypes[this.name] = new Decimal(a),
						this.game.cache.onUpdate()
					},
					f.prototype._addCount = function (a) {
						return this._setCount(this.rawCount().plus(a))
					},
					f.prototype._subtractCount = function (a) {
						return this._addCount(new Decimal(a).times(-1))
					},
					f.prototype._parents = function () {
						var a,
						b,
						c,
						d,
						e;
						for (d = this._producerPath.list, e = [], a = 0, b = d.length; b > a; a++)
							c = d[a], c.first().parent.prodByName[this.name] && e.push(c.first().parent);
						return e
					},
					f.prototype._getCap = function () {
						var a,
						b;
						return null != (a = this.game.cache.unitCap)[b = this.name] ? a[b] : a[b] = function (a) {
							return function () {
								var b;
								return a.hasStat("capBase") ? (b = a.stat("capBase"), b = b.times(a.stat("capMult", 1))) : void 0
							}
						}
						(this)()
					},
					f.prototype.capValue = function (a) {
						var b;
						return b = this._getCap(),
						null == b ? null == a ? a : Decimal.min(a, e) : null == a ? b : Decimal.min(a, b)
					},
					f.prototype.capPercent = function () {
						var a;
						return null != (a = this.capValue()) ? this.count().dividedBy(a) : void 0
					},
					f.prototype.capDurationSeconds = function () {
						var a,
						b,
						c;
						return null != (b = this.capValue()) ? null != (c = "function" == typeof(a = this.estimateSecsUntilEarned(b)).toNumber ? a.toNumber() : void 0) ? c : 0 : void 0
					},
					f.prototype.capDurationMoment = function () {
						var a;
						return null != (a = this.capDurationSeconds()) ? moment.duration(a, "seconds") : void 0
					},
					f.ESTIMATE_BISECTION = !0,
					f.prototype.isEstimateExact = function () {
						return this._producerPath.getMaxDegree() <= 2 || this.constructor.ESTIMATE_BISECTION
					},
					f.prototype.isEstimateCacheable = function () {
						return this._producerPath.getMaxDegree() <= 2 || this.constructor.ESTIMATE_BISECTION
					},
					f.prototype.estimateSecsUntilEarned = function (a) {
						var b,
						c,
						d,
						e,
						f,
						g,
						h,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p,
						q,
						r,
						s;
						if (h = this.count(), a = new Decimal(a), r = a.minus(h), r.lessThanOrEqualTo(0))
							return 0;
						if (j = this._producerPath.getMaxDegree(), g = this._producerPath.getCoefficientsNow(), s = new Decimal(1 / 0), j > 0 && (g[1].isZero() || (n = s = Decimal.min(s, r.dividedBy(g[1]))), j > 1 && (b = g[0], d = g[1], c = g[2], c.isZero() || (e = r.negated(), c = c.dividedBy(2), k = d.times(d).minus(c.times(e).times(4)).sqrt(), p = s = Decimal.min(s, d.negated().plus(k).dividedBy(c.times(2)))), j > 2)))
							if (this.constructor.ESTIMATE_BISECTION)
								o = null != n ? n : r.dividedBy(this._countInSecsFromNow(Decimal.ONE).minus(h)), s = o.greaterThan(0) ? this.estimateSecsUntilEarnedBisection(a, o) : Decimal.ONE;
							else
								for (q = g.slice(3), i = l = 0, m = q.length; m > l; i = ++l)
									f = q[i], f.isZero() || (i += 3, s = Decimal.min(s, r.dividedBy(f).times(math.factorial(i)).pow(Decimal.ONE.dividedBy(i))));
						return s
					},
					f.prototype.estimateSecsUntilEarnedBisection = function (a, c) {
						var d,
						e,
						f,
						g,
						h,
						i,
						j,
						k,
						l,
						m,
						n,
						o;
						for (b.debug("bisecting"), e = function (b) {
							return function (c) {
								return a.minus(b._countInSecsFromNow(c))
							}
						}
							(this), f = function (a, b) {
							var c;
							return c = new Decimal(.2),
							b.minus(a).dividedBy(2).lessThan(c)
						}, l = new Decimal(0), h = c, m = e(l), i = e(h), g = 0, n = (new Date).getTime(), d = !1; 50 > g && !d; )
							g += 1, j = h.plus(l).dividedBy(2), k = e(j), k.isZero() || f(l, h) ? d = !0 : k.isNegative() === m.isNegative() ? (l = j, m = e(l)) : (h = j, i = e(h));
						return o = (new Date).getTime() - n,
						b.debug(d ? "bisection estimate for " + this.name + " finished in " + g + " iterations. original range: " + c + ", estimate is " + j + " - plus game.difftime of " + this.game.diffSeconds() + ", that's " + j.plus(this.game.diffSeconds()) + " - this shouldn't change much over multiple iterations. time: " + o : "bisection estimate for " + this.name + " took more than " + g + " iterations; quitting. precision: " + h.minus(l).dividedBy(2) + " (down from " + c + "). time: " + o),
						j
					},
					f.prototype.count = function () {
						var a,
						b;
						return null != (a = this.game.cache.unitCount)[b = this.name] ? a[b] : a[b] = this._countInSecsFromNow()
					},
					f.prototype._countInSecsFromNow = function (a) {
						return null == a && (a = new Decimal(0)),
						this._countInSecsFromReified(a.plus(this.game.diffSeconds()))
					},
					f.prototype._countInSecsFromReified = function (a) {
						return null == a && (a = 0),
						this.capValue(this._producerPath.count(a))
					},
					f.prototype.spentResources = function () {
						var a,
						b,
						c,
						d,
						e;
						for (c = [].concat(this.game.unitlist(), this.game.upgradelist()), d = [], a = 0, b = c.length; b > a; a++)
							e = c[a], null != e.costByName[this.name] && d.push(e);
						return d
					},
					f.prototype.spent = function (a) {
						var b,
						c,
						d,
						e,
						f,
						g,
						h,
						i,
						j,
						k,
						l,
						m,
						n,
						o;
						for (null == a && (a = {}), n = new Decimal(0), i = this.game.unitlist(), e = 0, g = i.length; g > e; e++)
							o = i[e], c = null != (j = null != (k = o.costByName[this.name]) ? k.val : void 0) ? j : 0, n = n.plus(o.count().times(c));
						for (l = this.game.upgradelist(), f = 0, h = l.length; h > f; f++)
							o = l[f], o.costByName[this.name] && null == a[o.name] && (d = o.sumCost(o.count(), 0), b = _.find(d, function (a) {
										return function (b) {
											return b.unit.name === a.name
										}
									}
										(this)), n = n.plus(null != (m = null != b ? b.val : void 0) ? m : 0));
						return n
					},
					f.prototype._costMetPercent = function () {
						var a,
						b,
						c,
						d,
						e;
						for (d = new Decimal(1 / 0), e = this.eachCost(), b = 0, c = e.length; c > b; b++)
							a = e[b], a.val.greaterThan(0) && (d = Decimal.min(d, a.unit.count().dividedBy(a.val)));
						return d
					},
					f.prototype._costMetPercentOfVelocity = function () {
						var a,
						b,
						c,
						d,
						e;
						for (d = new Decimal(1 / 0), e = this.eachCost(), b = 0, c = e.length; c > b; b++)
							a = e[b], a.val.greaterThan(0) && (d = Decimal.min(d, a.unit.velocity().dividedBy(a.val)));
						return d
					},
					f.prototype.isVisible = function () {
						return this.unittype.disabled ? !1 : this.game.cache.unitVisible[this.name] ? !0 : this.game.cache.unitVisible[this.name] = this._isVisible()
					},
					f.prototype._isVisible = function () {
						var b,
						c,
						d,
						e;
						if (this.count().greaterThan(0))
							return !0;
						for (a.assert(this.requires.length > 0, "unit without visibility requirements", this.name), d = this.requires, b = 0, c = d.length; c > b; b++)
							if (e = d[b], e.val.greaterThan(e.resource.count())) {
								if ("OR" !== e.op)
									return !1
							} else if ("OR" === e.op)
								return !0;
						return !0
					},
					f.prototype.isBuyButtonVisible = function () {
						var a,
						b,
						c,
						d;
						if (b = this.eachCost(), this.unittype.unbuyable || 0 === b.length)
							return !1;
						for (c = 0, d = b.length; d > c; c++)
							if (a = b[c], !a.unit.isVisible())
								return !1;
						return !0
					},
					f.prototype.maxCostMet = function (a) {
						var b,
						c;
						return null == a && (a = 1),
						null != (b = this.game.cache.unitMaxCostMet)[c = this.name + ":" + a] ? b[c] : b[c] = function (b) {
							return function () {
								return b._costMetPercent().times(a).floor()
							}
						}
						(this)()
					},
					f.prototype.maxCostMetOfVelocity = function () {
						var a,
						b;
						return null != (a = this.game.cache.unitMaxCostMetOfVelocity)[b = "" + this.name] ? a[b] : a[b] = function (a) {
							return function () {
								return a._costMetPercentOfVelocity()
							}
						}
						(this)()
					},
					f.prototype.maxCostMetOfVelocityReciprocal = function () {
						return new Decimal(1).dividedBy(this.maxCostMetOfVelocity())
					},
					f.prototype.isCostMet = function () {
						return this.maxCostMet().greaterThan(0)
					},
					f.prototype.isBuyable = function (a) {
						return null == a && (a = !1),
						(this.isCostMet() || a) && this.isVisible() && !this.unittype.unbuyable
					},
					f.prototype.buyMax = function (a) {
						return this.buy(this.maxCostMet(a))
					},
					f.prototype.twinMult = function () {
						var a;
						return a = new Decimal(1),
						a = a.plus(this.stat("twinbase", 0)),
						a = a.times(this.stat("twin", 1))
					},
					f.prototype.buy = function (a) {
						if (null == a && (a = 1), !this.isCostMet())
							throw new Error("We require more resources");
						if (!this.isBuyable())
							throw new Error("Cannot buy that unit");
						return a = Decimal.min(a, this.maxCostMet()),
						this.game.withSave(function (b) {
							return function () {
								var c,
								d,
								e,
								f,
								g;
								for (f = b.eachCost(), d = 0, e = f.length; e > d; d++)
									c = f[d], c.unit._subtractCount(c.val.times(a));
								return g = a.times(b.twinMult()),
								b._addCount(g), {
									num : a,
									twinnum : g
								}
							}
						}
							(this))
					},
					f.prototype.isNewlyUpgradable = function () {
						var a,
						b,
						c,
						d;
						return d = null != (a = null != (b = this.showparent) && null != (c = b.upgrades) ? c.list : void 0) ? a : this.upgrades.list,
						_.some(d, function (a) {
							return a.isVisible() && a.isNewlyUpgradable()
						})
					},
					f.prototype.totalProduction = function () {
						var a,
						b;
						return null != (a = this.game.cache.totalProduction)[b = this.name] ? a[b] : a[b] = function (a) {
							return function () {
								var b,
								c,
								d,
								e,
								f;
								e = {},
								b = a.count().floor(),
								d = a.eachProduction();
								for (c in d)
									f = d[c], e[c] = f.times(b);
								return e
							}
						}
						(this)()
					},
					f.prototype.eachProduction = function () {
						var a,
						b;
						return null != (a = this.game.cache.eachProduction)[b = this.name] ? a[b] : a[b] = function (a) {
							return function () {
								var b,
								c,
								d,
								e,
								f;
								for (f = {}, e = a.prod, b = 0, c = e.length; c > b; b++)
									d = e[b], f[d.unit.unittype.name] = d.val.plus(a.stat("base", 0)).times(a.stat("prod", 1));
								return f
							}
						}
						(this)()
					},
					f.prototype.eachCost = function () {
						var a,
						b;
						return null != (a = this.game.cache.eachCost)[b = this.name] ? a[b] : a[b] = _.map(this.cost, function (a) {
								return function (b) {
									return b = _.clone(b),
									b.val = b.val.times(a.stat("cost", 1)).times(a.stat("cost." + b.unit.unittype.name, 1)),
									b
								}
							}
								(this))
					},
					f.prototype.velocity = function () {
						var a,
						b;
						return null != (a = this.game.cache.velocity)[b = this.name] ? a[b] : a[b] = Decimal.min(e, this._producerPath.getDegreeCoefficient(1, !0))
					},
					f.prototype.isVelocityConstant = function () {
						return this._producerPath.getMaxCoefficient() <= 1
					},
					f.prototype.hasStat = function (a, b) {
						return null == b && (b = void 0),
						null != this.stats()[a] && this.stats()[a] !== b
					},
					f.prototype.stat = function (b, c) {
						var d,
						e;
						return null == c && (c = void 0),
						a.assert(null != b),
						null != c && (c = new Decimal(c)),
						e = null != (d = this.stats()[b]) ? d : c,
						a.assert(null != e, "no such stat", this.name, b),
						new Decimal(e)
					},
					f.prototype.stats = function () {
						var a,
						b;
						return null != (a = this.game.cache.stats)[b = this.name] ? a[b] : a[b] = function (a) {
							return function () {
								var b,
								c,
								d,
								e,
								f,
								g,
								h,
								i,
								j,
								k;
								for (i = {}, h = {}, f = a.upgrades.list, b = 0, d = f.length; d > b; b++)
									k = f[b], k.calcStats(i, h);
								for (g = a.affectedBy, c = 0, e = g.length; e > c; c++)
									j = g[c], j.calcStats(i, h, j.parent.count());
								return i
							}
						}
						(this)()
					},
					f.prototype.statistics = function () {
						var a,
						b,
						c;
						return null != (a = null != (b = this.game.session.state.statistics) && null != (c = b.byUnit) ? c[this.name] : void 0) ? a : {}

					},
					f.prototype.url = function () {
						return this.tab.url(this)
					},
					f
				}
				()
			}
		]),
	angular.module("swarmApp").factory("UnitType", function () {
		var a;
		return a = function () {
			function a(a) {
				_.extend(this, a),
				this.producerPath = {},
				this.producerPathList = []
			}
			return a.prototype.producerNames = function () {
				return _.mapValues(this.producerPath, function (a) {
					return _.map(a, function (a) {
						return _.pluck(a, "name")
					})
				})
			},
			a
		}
		()
	}),
	angular.module("swarmApp").factory("UnitTypes", ["spreadsheetUtil", "UnitType", "util", "$log", function (a, b, c, d) {
				var e;
				return e = function () {
					function e(a) {
						var b,
						c,
						d;
						for (null == a && (a = []), this.list = [], this.byName = {}, b = 0, c = a.length; c > b; b++)
							d = a[b], this.register(d)
					}
					return e.prototype.register = function (a) {
						return this.list.push(a),
						this.byName[a.name] = a
					},
					e._buildProducerPath = function (a, b, c) {
						var d,
						e,
						f,
						g,
						h,
						i,
						j;
						for (c = [b].concat(c), a.producerPathList.push(c), null == (d = a.producerPath)[g = b.name] && (d[g] = []), a.producerPath[b.name].push(c), i = b.producedBy, j = [], e = 0, f = i.length; f > e; e++)
							h = i[e], j.push(this._buildProducerPath(a, h, c));
						return j
					},
					e.parseSpreadsheet = function (f, g) {
						var h,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p,
						q,
						r,
						s,
						t,
						u,
						v,
						w,
						x,
						y,
						z,
						A,
						B,
						C,
						D,
						E,
						F;
						for (E = a.parseRows({
									name : ["cost", "prod", "warnfirst", "requires", "cap", "effect"]
								}, g.data.unittypes.elements), C = new e(function () {
									var a,
									c,
									d;
									for (d = [], a = 0, c = E.length; c > a; a++)
										D = E[a], d.push(new b(D));
										return d
									}
										()), w = C.list, i = 0, m = w.length; m > i; i++)F = w[i], F.producedBy = [], F.affectedBy = [];
						for (x = C.list, j = 0, n = x.length; n > j; j++) {
							for (F = x[j], F.showparent && a.resolveList([F], "showparent", C.byName), a.resolveList(F.cost, "unittype", C.byName), a.resolveList(F.prod, "unittype", C.byName), a.resolveList(F.warnfirst, "unittype", C.byName), a.resolveList(F.requires, "unittype", C.byName, {
									required : !1
								}), a.resolveList(F.cap, "unittype", C.byName, {
									required : !1
								}), a.resolveList(F.effect, "unittype", C.byName), a.resolveList(F.effect, "type", f.byName), F.slug = F.label, y = F.prod, k = 0, o = y.length; o > k; k++)
								u = y[k], u.unittype.producedBy.push(F), c.assert(u.val > 0, "unittype prod.val must be positive", u);
							for (z = F.cost, l = 0, p = z.length; p > l; l++)
								h = z[l], c.assert(h.val > 0 || F.unbuyable && F.disabled, "unittype cost.val must be positive", h)
						}
						for (A = C.list, s = 0, q = A.length; q > s; s++)
							for (F = A[s], B = F.producedBy, t = 0, r = B.length; r > t; t++)
								v = B[t], this._buildProducerPath(F, v, []);
						return d.debug("built unittypes", C),
						C
					},
					e
				}
				()
			}
		]),
	angular.module("swarmApp").factory("unittypes", ["UnitTypes", "effecttypes", "spreadsheet", function (a, b, c) {
				return a.parseSpreadsheet(b, c)
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("HeaderCtrl", ["$scope", "$window", "env", "version", "session", "timecheck", "$http", "$interval", "$log", "$location", "kongregateScrolling", "pageTheme", "remoteSaveInit", "touchTooltipInit", "versioncheck", "analytics", "statistics", "achievementslistener", "favico", function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
				var o,
				p;
				return a.env = c,
				a.version = d,
				a.session = e,
				(o = function () {
					return f.enforceNetTime().then(function (b) {
						return i.debug("net time check successful", b),
						a.netTimeInvalid = b,
						b ? (i.debug("cheater", b), $(".viewwrap").before('<div><p class="cheater">There is a problem with your system clock.</p><p>If you don\'t know why you\'re seeing this, <a target="_blank" href="http://www.reddit.com/r/swarmsim">ask about it here</a>.</p></div>'), $(".viewwrap").css({
								display : "none"
							}), $(".footer").css({
								display : "none"
							}), h.cancel(p)) : void 0
					}, function () {
						return i.warn("failed to check net time")
					})
				})(),
				p = h(o, 18e5),
				a.konami = new Konami(function () {
						return a.$emit("konami"),
						i.debug("konami")
					}),
				k(a),
				l(a),
				m(a),
				n(a)
			}
		]),
	angular.module("swarmApp").factory("pageTheme", ["$log", "options", function (a, b) {
				return function (c) {
					var d;
					return c.options = b,
					d = b.constructor.THEME_EL,
					c.$watch("options.theme()", function () {
						return function (a, b) {
							var c;
							return a.url !== d.attr("href") && d.attr("href", a.url),
							c = $("body"),
							null != b && c.removeClass("theme-" + b.name),
							c.addClass("theme-" + a.name)
						}
					}
						(this)),
					c.$watch("options.themeExtra()", function () {
						return function (b, d) {
							return null != b || null != d ? (null == c.themeExtraEl && (c.themeExtraEl = $('<style type="text/css"></style>'), c.themeExtraEl.appendTo("body")), c.themeExtraEl.html(b), a.debug("extratheming", c.themeExtraEl, b)) : void 0
						}
					}
						(this))
				}
			}
		]),
	angular.module("swarmApp").factory("kongregateScrolling", ["$log", "kongregate", "kongregateS3Syncer", "options", function (a, b, c, d) {
				return function (c) {
					return c.options = d,
					b.isKongregate() ? (c.$watch("options.scrolling()", function () {
							return function (a, c) {
								return a !== c && (d.isScrollingChangedSincePageLoad = !0, "resize" === c && (d.isScrollingChangedFromResizeSincePageLoad = !0)),
								b.onScrollOptionChange(!d.isScrollingChangedSincePageLoad, c)
							}
						}
							(this)), c.$watch("options.iframeMinX()", function () {
							return function (c, d) {
								return c !== d ? (a.debug("onchange resize x", c, d), b._resizeGame()) : void 0
							}
						}
							(this)), c.$watch("options.iframeMinY()", function () {
							return function (c, d) {
								return c !== d ? (a.debug("onchange resize y", c, d), b._resizeGame()) : void 0
							}
						}
							(this)), b.onScrollOptionChange(!d.isScrollingChangedSincePageLoad), b.onLoad.then(function () {
							return d.iframeMinX() !== d.constructor.IFRAME_X_MIN || d.iframeMinY() !== d.constructor.IFRAME_Y_MIN ? (a.debug("onload resize", d.iframeMinX(), d.iframeMinY()), b._resizeGame()) : void 0
						}), c.onRender = function () {
						return b.onResize()
					}) : void 0
				}
			}
		]),
	angular.module("swarmApp").factory("remoteSaveInit", ["$log", "kongregate", "kongregateS3Syncer", "dropboxSyncer", "options", function (a, b, c, d) {
				return function (b) {
					return b.$watch("options.autopush()", function () {
						return function (b) {
							var e,
							f,
							g,
							h,
							i;
							for (g = [c, d], h = [], e = 0, f = g.length; f > e; e++)
								i = g[e], h.push(function (c) {
									return a.debug("autopush trying to setup", c.constructor.name),
									c.isVisible() ? (a.debug("autopush visible", c.constructor.name), c.isInit() ? (a.debug("autopush setup", c.constructor.name), c.initAutopush(b)) : (a.debug("autopush not yet init", c.constructor.name), c.init(function () {
												return a.debug("autopush init done, checking success", c.constructor.name),
												c.isInit() ? (a.debug("autopush setup", c.constructor.name), c.initAutopush(b)) : void 0
											}))) : void 0
								}
									(i));
							return h
						}
					}
						(this))
				}
			}
		]),
	angular.module("swarmApp").factory("touchTooltipInit", ["$log", "$location", "$timeout", function (a, b) {
				return function () {
					var c,
					d,
					e,
					f;
					return c = $("body"),
					d = $(window.document),
					e = "touchstart touchmove touchend touchcancel",
					b.search().mousetouch && (e += " mousedown mouseup"),
					f = function () {
						var b;
						return a.debug("touch event detected, setting up tooltip-on-touch"),
						d.off(e, f),
						b = "[title]",
						c.tooltip({
							selector : b,
							trigger : "click"
						})
					},
					d.on(e, f),
					a.debug("adding setupTouch hook")
				}
			}
		])
}
.call(this), function () {
	"use strict";
	var a = [].slice;
	angular.module("swarmApp").factory("Cache", function () {
		var a;
		return a = function () {
			function a() {
				this.firstSpawn = {},
				this.onUpdate(),
				this.onRespec()
			}
			return a.prototype.onPeriodic = function () {
				return this._lastPeriodicClear = (new Date).getTime(),
				this.upgradeIsUpgradable = {},
				this.upgradeEstimateSecsUntilBuyablePeriodic = {}

			},
			a.prototype.onUpdate = function () {
				return this.onPeriodic(),
				this.onTick(),
				this.tinyUrl = {},
				this.stats = {},
				this.eachCost = {},
				this.eachProduction = {},
				this.upgradeTotalCost = {},
				this.producerPathProdEach = {},
				this.producerPathCoefficients = {},
				this.unitRawCount = {},
				this.unitCap = {},
				this.unitCapPercent = {},
				this.upgradeEstimateSecsUntilBuyableCacheSafe = {}

			},
			a.prototype.onTick = function () {
				return this.unitCount = {},
				this.velocity = {},
				this.totalProduction = {},
				this.upgradeMaxCostMet = {},
				this.unitMaxCostMet = {},
				this.unitMaxCostMetOfVelocity = {},
				delete this.tutorialStep,
				(new Date).getTime() - this._lastPeriodicClear >= 3e3 ? this.onPeriodic() : void 0
			},
			a.prototype.onRespec = function () {
				return this.unitVisible = {},
				this.upgradeVisible = {}

			},
			a
		}
		()
	}),
	angular.module("swarmApp").factory("Game", ["unittypes", "upgradetypes", "achievements", "util", "$log", "Upgrade", "Unit", "Achievement", "Tab", "Cache", function (b, c, d, e, f, g, h, i, j, k) {
				var l;
				return l = function () {
					function l(a) {
						this.session = a,
						this._init()
					}
					return l.prototype._init = function () {
						var a,
						e,
						l,
						m,
						n,
						o,
						p,
						q,
						r,
						s,
						t;
						for (this._units = {
								list : _.map(b.list, function (a) {
									return function (b) {
										return new h(a, b)
									}
								}
									(this))
							}, this._units.byName = _.indexBy(this._units.list, "name"), this._units.bySlug = _.indexBy(this._units.list, function (a) {
									return a.unittype.slug
								}), this._upgrades = {
								list : _.map(c.list, function (a) {
									return function (b) {
										return new g(a, b)
									}
								}
									(this))
							}, this._upgrades.byName = _.indexBy(this._upgrades.list, "name"), this._achievements = {
								list : _.map(d.list, function (a) {
									return function (b) {
										return new i(a, b)
									}
								}
									(this))
							}, this._achievements.byName = _.indexBy(this._achievements.list, "name"), this.achievementPointsPossible = d.pointsPossible(), f.debug("possiblepoints: ", this.achievementPointsPossible), this.tabs = j.buildTabs(this._units.list), this.skippedMillis = 0, this.gameSpeed = 1, null == (a = this.session.state).skippedMillis && (a.skippedMillis = 0), p = [].concat(this._units.list, this._upgrades.list, this._achievements.list), e = 0, n = p.length; n > e; e++)
							l = p[e], l._init();
						for (q = this._units.list, m = 0, o = q.length; o > m; m++)
							l = q[m], l._init2();
						return this.cache = new k,
						delete this.now,
						this.tick(null != (r = this.session) && null != (s = r.state) && null != (t = s.date) ? t.reified : void 0),
						this.tick()
					},
					l.prototype.diffMillis = function () {
						return this._realDiffMillis() * this.gameSpeed + this.skippedMillis
					},
					l.prototype._realDiffMillis = function () {
						var a;
						return a = this.now.getTime() - this.session.state.date.reified.getTime(),
						Math.max(0, a)
					},
					l.prototype.diffSeconds = function () {
						return this.diffMillis() / 1e3
					},
					l.prototype.skipMillis = function (a) {
						return a = Math.floor(a),
						this.skippedMillis += a,
						this.session.state.skippedMillis += a
					},
					l.prototype.skipDuration = function (a) {
						return this.skipMillis(a.asMilliseconds())
					},
					l.prototype.skipTime = function () {
						var b;
						return b = 1 <= arguments.length ? a.call(arguments, 0) : [],
						this.skipDuration(moment.duration.apply(moment, b))
					},
					l.prototype.setGameSpeed = function (a) {
						return this.reify(),
						this.gameSpeed = a
					},
					l.prototype.totalSkippedMillis = function () {
						return this.session.state.skippedMillis
					},
					l.prototype.totalSkippedDuration = function () {
						return moment.duration(this.totalSkippedMillis())
					},
					l.prototype.dateStarted = function () {
						return this.session.state.date.started
					},
					l.prototype.momentStarted = function () {
						return moment(this.dateStarted())
					},
					l.prototype.tick = function (a, b) {
						var c;
						return null == a && (a = new Date),
						null == b && (b = !1),
						e.assert(a, "can't tick to undefined time", a),
						!this.now || this.now <= a ? (this.now = a, this.cache.onTick()) : (c = this.now.getTime() - a.getTime(), e.assert(12e4 >= c, "tick tried to go back in time. System clock problem?", this.now, a, c))
					},
					l.prototype.elapsedStartMillis = function () {
						return this.now.getTime() - this.session.state.date.started.getTime()
					},
					l.prototype.timestampMillis = function () {
						return this.elapsedStartMillis() + this.totalSkippedMillis()
					},
					l.prototype.unit = function (a) {
						return _.isUndefined(a) ? void 0 : (_.isString(a) || (a = a.name), this._units.byName[a])
					},
					l.prototype.unitBySlug = function (a) {
						return a ? this._units.bySlug[a] : void 0
					},
					l.prototype.units = function () {
						return _.clone(this._units.byName)
					},
					l.prototype.unitlist = function () {
						return _.clone(this._units.list)
					},
					l.prototype.count = function (a, b) {
						return this.unit(a).count(b)
					},
					l.prototype.counts = function () {
						return this.countUnits()
					},
					l.prototype.countUnits = function () {
						return _.mapValues(this.units(), function (a) {
							return a.count()
						})
					},
					l.prototype.countUpgrades = function () {
						return _.mapValues(this.upgrades(), function (a) {
							return a.count()
						})
					},
					l.prototype.getNewlyUpgradableUnits = function () {
						var a,
						b,
						c,
						d,
						e;
						for (c = this.unitlist(), d = [], a = 0, b = c.length; b > a; a++)
							e = c[a], e.isNewlyUpgradable() && e.isVisible() && d.push(e);
						return d
					},
					l.prototype.upgrade = function (a) {
						return _.isString(a) || (a = a.name),
						this._upgrades.byName[a]
					},
					l.prototype.upgrades = function () {
						return _.clone(this._upgrades.byName)
					},
					l.prototype.upgradelist = function () {
						return _.clone(this._upgrades.list)
					},
					l.prototype.availableUpgrades = function (a) {
						var b,
						c,
						d,
						e,
						f;
						for (null == a && (a = void 0), d = this.upgradelist(), e = [], b = 0, c = d.length; c > b; b++)
							f = d[b], f.isVisible() && f.isUpgradable(a, !0) && e.push(f);
						return e
					},
					l.prototype.availableAutobuyUpgrades = function (a) {
						var b,
						c,
						d,
						e,
						f;
						for (null == a && (a = void 0), d = this.availableUpgrades(a), e = [], b = 0, c = d.length; c > b; b++)
							f = d[b], f.isAutobuyable() && e.push(f);
						return e
					},
					l.prototype.ignoredUpgrades = function () {
						var a,
						b,
						c,
						d,
						e;
						for (c = this.upgradelist(), d = [], a = 0, b = c.length; b > a; a++)
							e = c[a], e.isVisible() && e.isIgnored() && d.push(e);
						return d
					},
					l.prototype.unignoredUpgrades = function () {
						var a,
						b,
						c,
						d,
						e;
						for (c = this.upgradelist(), d = [], a = 0, b = c.length; b > a; a++)
							e = c[a], e.isVisible() && !e.isIgnored() && d.push(e);
						return d
					},
					l.prototype.resourcelist = function () {
						return this.unitlist().concat(this.upgradelist())
					},
					l.prototype.achievement = function (a) {
						return _.isString(a) || (a = a.name),
						this._achievements.byName[a]
					},
					l.prototype.achievements = function () {
						return _.clone(this._achievements.byName)
					},
					l.prototype.achievementlist = function () {
						return _.clone(this._achievements.list)
					},
					l.prototype.achievementsSorted = function () {
						return _.sortBy(this.achievementlist(), function (a) {
							return a.earnedAtMillisElapsed()
						})
					},
					l.prototype.achievementPoints = function () {
						return e.sum(_.map(this.achievementlist(), function (a) {
								return a.pointsEarned()
							}))
					},
					l.prototype.achievementPercent = function () {
						return this.achievementPoints() / this.achievementPointsPossible
					},
					l.prototype.reify = function (a) {
						var b,
						c;
						return null == a && (a = 0),
						c = this.diffSeconds(),
						b = this.counts(c),
						_.extend(this.session.state.unittypes, b),
						this.skippedMillis = 0,
						this.session.state.skippedMillis += this.diffMillis() - this._realDiffMillis(),
						this.session.state.date.reified = this.now,
						this.cache.onUpdate(),
						e.assert(0 === this.diffSeconds(), "diffseconds != 0 after reify!")
					},
					l.prototype.save = function () {
						return this.withSave(function () {})
					},
					l.prototype.importSave = function (a, b) {
						return this.session.importSave(a, b),
						this._init()
					},
					l.prototype.withSave = function (a) {
						var b;
						return this.reify(),
						b = a(),
						this.reify(),
						this.session.save(),
						this.cache.onUpdate(),
						b
					},
					l.prototype.withUnreifiedSave = function (a) {
						var b;
						return b = a(),
						this.session.save(),
						b
					},
					l.prototype.reset = function (a) {
						var b,
						c,
						d,
						e;
						for (null == a && (a = !1), this.session.reset(), this._init(), d = this.unitlist(), b = 0, c = d.length; c > b; b++)
							e = d[b], e._setCount(e.unittype.init || 0);
						return a ? void 0 : this.save()
					},
					l.prototype.ascendEnergySpent = function () {
						var a;
						return a = this.unit("energy"),
						a.spent()
					},
					l.prototype.ascendCost = function (a) {
						var b,
						c,
						d,
						e;
						return null == a && (a = {}),
						e = null != a.spent ? new Decimal(a.spent) : this.ascendEnergySpent(),
						c = this.unit("ascension").count(),
						b = Decimal.pow(1.12, c),
						d = new Decimal(5e4).times(this.unit("mutagen").stat("ascendCost", 1)),
						b.times(5e6).dividedBy(Decimal.pow(2, e.dividedBy(d))).ceil()
					},
					l.prototype.ascendCostCapDiff = function (a) {
						return null == a && (a = this.ascendCost()),
						a.minus(this.unit("energy").capValue())
					},
					l.prototype.ascendCostPercent = function (a) {
						return null == a && (a = this.ascendCost()),
						Decimal.min(1, this.unit("energy").count().dividedBy(a))
					},
					l.prototype.ascendCostDurationSecs = function (a) {
						var b;
						return null == a && (a = this.ascendCost()),
						b = this.unit("energy"),
						a.lessThan(b.capValue()) ? b.estimateSecsUntilEarned(a).toNumber() : void 0
					},
					l.prototype.ascendCostDurationMoment = function (a) {
						var b;
						return null != (b = this.ascendCostDurationSecs(a)) ? moment.duration(b, "seconds") : void 0
					},
					l.prototype.ascend = function (a) {
						if (null == a && (a = !1), !a && this.ascendCostPercent() < 1)
							throw new Error("We require more resources (ascension cost)");
						return this.withSave(function (a) {
							return function () {
								var b,
								c,
								d,
								e,
								f,
								g,
								h,
								i,
								j,
								k,
								l,
								m,
								n,
								o;
								for (h = a.unit("premutagen"), g = a.unit("mutagen"), b = a.unit("ascension"), g._addCount(h.count()), h._setCount(0), b._addCount(1), a.session.state.date.restarted = a.now, b.count().modulo(3).isZero() && a.unit("freeRespec")._addCount(1), a._init(), b.count().equals(1) && (a.cache.firstSpawn.ascension = !0), i = a.unitlist(), c = 0, e = i.length; e > c; c++)
									n = i[c], "mutagen" !== (null != (j = n.tab) ? j.name : void 0) && n._setCount(n.unittype.init || 0);
								for (k = a.upgradelist(), m = [], d = 0, f = k.length; f > d; d++)
									o = k[d], m.push("mutagen" !== (null != (l = o.unit.tab) ? l.name : void 0) ? o._setCount(0) : void 0);
								return m
							}
						}
							(this))
					},
					l.prototype.respecRate = function () {
						return 1
					},
					l.prototype.respecCost = function () {
						return this.ascendCost().times(this.respecCostRate).ceil()
					},
					l.prototype.respecCostRate = .3,
					l.prototype.respecCostCapDiff = function () {
						return this.ascendCostCapDiff(this.respecCost())
					},
					l.prototype.respecCostPercent = function () {
						return this.ascendCostPercent(this.respecCost())
					},
					l.prototype.respecCostDurationSecs = function () {
						return this.ascendCostDurationSecs(this.respecCost())
					},
					l.prototype.respecCostDurationMoment = function () {
						return this.ascendCostDurationMoment(this.respecCost())
					},
					l.prototype.isRespecCostMet = function () {
						return this.unit("energy").count().greaterThanOrEqualTo(this.respecCost())
					},
					l.prototype.respecSpent = function () {
						var a,
						b,
						c,
						d,
						e,
						f;
						for (d = this.unit("mutagen"), b = {}, e = d.upgrades.list, a = 0, c = e.length; c > a; a++)
							f = e[a], b[f.name] = !0;
						return d.spent(b).minus(this.upgrade("mutatehidden").count())
					},
					l.prototype.respec = function () {
						return this.withSave(function (a) {
							return function () {
								var b,
								c;
								if (!a.isRespecCostMet())
									throw new Error("We require more resources");
								return b = a.respecCost(),
								a.unit("energy")._subtractCount(b),
								c = a.ascendEnergySpent().minus(b),
								a.unit("respecEnergy")._addCount(c),
								a._respec()
							}
						}
							(this))
					},
					l.prototype.respecFree = function () {
						return this.withSave(function (a) {
							return function () {
								if (!a.unit("freeRespec").count().greaterThan(0))
									throw new Error("We require more resources");
								return a.unit("freeRespec")._subtractCount(1),
								a._respec()
							}
						}
							(this))
					},
					l.prototype._respec = function () {
						var a,
						b,
						c,
						d,
						f,
						g;
						for (c = this.unit("mutagen"), g = this.respecSpent(), d = c.spentResources(), a = 0, b = d.length; b > a; a++)
							f = d[a], f._setCount(0);
						return c._addCount(g.times(this.respecRate()).floor()),
						this.cache.onRespec(),
						e.assert(c.spent().isZero(), "respec didn't refund all mutagen!")
					},
					l
				}
				()
			}
		]),
	angular.module("swarmApp").factory("game", ["Game", "session", function (a, b) {
				return new a(b)
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("Options", ["$log", "util", "env", "game", "$location", function (a, b, c, d, e) {
				var f;
				return f = function () {
					function f(a) {
						var b;
						this.session = a,
						this.VELOCITY_UNITS = {
							byName : {},
							list : []
						},
						b = function (a) {
							return function (b, c, d, e) {
								var f;
								return f = {
									name : b,
									label : c,
									plural : d,
									mult : e
								},
								f._get = _.isFunction(e) ? function () {
									var a;
									return a = _.clone(this),
									a.mult = a.mult(),
									a
								}
								 : function () {
									return this
								},
								a.VELOCITY_UNITS.byName[f.name] = f,
								a.VELOCITY_UNITS.list.push(f)
							}
						}
						(this),
						b("sec", "second", "seconds", 1),
						b("min", "minute", "minutes", 60),
						b("hr", "hour", "hours", 3600),
						b("day", "day", "days", 86400),
						b("warp", "Swarmwarp", "Swarmwarps", function () {
							return d.upgrade("swarmwarp").effect[0].output()
						})
					}
					return f.prototype.maybeSet = function (c, d, e) {
						return null != d ? (a.debug("set options value", c, d), null != e && b.assert(e[d], "invalid option for " + c + ": " + d), this.set(c, d)) : void 0
					},
					f.prototype.set = function (a, b) {
						return this.session.state.options[a] = b,
						this.session.save()
					},
					f.prototype.get = function (a, b) {
						var c;
						return null != (c = this.session.state.options[a]) ? c : b
					},
					f.prototype.reset = function (a) {
						return delete this.session.state.options[a]
					},
					f.prototype.fps = function (a) {
						return this.maybeSet("fps", a),
						Math.min(60, Math.max(1e-4, this.get("fps", 10)))
					},
					f.prototype.fpsSleepMillis = function () {
						return 1e3 / this.fps()
					},
					f.prototype.showAdvancedUnitData = function (a) {
						return this.maybeSet("showAdvancedUnitData", a),
						!!this.get("showAdvancedUnitData")
					},
					f.prototype.durationFormat = function (a) {
						var c;
						return null != a && (c = {
								human : !0,
								full : !0,
								abbreviated : !0
							}, b.assert(c[a], "invalid options.durationFormat value", a), this.maybeSet("durationFormat", a)),
						this.get("durationFormat", "abbreviated")
					},
					f.prototype.notation = function (a) {
						var c;
						return null != a && (c = {
								"standard-decimal" : !0,
								"scientific-e" : !0,
								hybrid : !0,
								engineering : !0
							}, b.assert(c[a], "invalid options.notation value", a), this.maybeSet("notation", a)),
						this.get("notation", "standard-decimal")
					},
					f.prototype.velocityUnit = function (a, b) {
						var c,
						d,
						e,
						f,
						g;
						return null == b && (b = {}),
						this.maybeSet("velocityUnit", a, this.VELOCITY_UNITS.byName),
						g = this.VELOCITY_UNITS.byName[this.get("velocityUnit")],
						(null == g || "warp" === g.name && ("energy" === (null != (c = null != (d = b.unit) ? d.name : void 0) ? c : b.unit) || "nexus" === (null != (e = null != (f = b.prod) ? f.name : void 0) ? e : b.prod))) && (g = this.VELOCITY_UNITS.list[0]),
						g._get()
					},
					f.prototype.getVelocityUnit = function (a) {
						return null == a && (a = {}),
						this.velocityUnit(void 0, a)
					},
					f.prototype.scrolling = function (a) {
						var b;
						return this.maybeSet("scrolling", a, {
							none : !0,
							resize : !0,
							lockhover : "lockhover"
						}),
						null != (b = this.get("scrolling")) ? b : "none"
					},
					f.IFRAME_X_MIN = 800,
					f.IFRAME_Y_MIN = 600,
					f.prototype.iframeMinX = function (a) {
						return this.maybeSet("iframeMinX", a),
						Math.max(this.get("iframeMinX") || 0, this.constructor.IFRAME_X_MIN)
					},
					f.prototype.iframeMinY = function (a) {
						return this.maybeSet("iframeMinY", a),
						Math.max(this.get("iframeMinY") || 0, this.constructor.IFRAME_Y_MIN)
					},
					f.prototype.autopush = function (a) {
						var b;
						return this.maybeSet("autopush", a),
						null != (b = this.get("autopush")) ? b : !0
					},
					f.THEME_EL = $('link[href^="styles/bootstrapdefault"]'),
					f.THEMES = function () {
						var a,
						d,
						e,
						g,
						h;
						for (b.assert(c.isDebugEnabled || f.THEME_EL[0], "couldn't find theme link"), h = {
								list : []
							}, h.list.push({
								name : "none",
								label : "Default white",
								url : f.THEME_EL.attr("href"),
								credit : "http://bootswatch.com/default/"
							}), g = ["cerulean", "cosmo", "cyborg", "darkly", "flatly", "journal", "lumen", "paper", "readable", "sandstone", "simplex", "slate", "spacelab", "superhero", "united", "yeti"], a = 0, d = g.length; d > a; a++)
							e = g[a], h.list.push({
								name : e,
								label : e,
								url : "bower_components/bootswatch/" + e + "/bootstrap.min.css",
								credit : "http://bootswatch.com/" + e + "/"
							});
						return h.byName = _.indexBy(h.list, "name"),
						h
					}
					(),
					f.prototype.theme = function (a) {
						var b;
						return null != a && (this.set("isCustomTheme", !1), this.maybeSet("theme", a, f.THEMES.byName)),
						this.get("isCustomTheme") ? this.get("theme") : (a = null != (b = this.get("theme")) ? b : "none", ("dark-ff" === a || "dark-chrome" === a) && (a = "slate"), f.THEMES.byName[a])
					},
					f.prototype.customTheme = function (a) {
						return this.set("isCustomTheme", !0),
						this.set("theme", {
							isCustom : !0,
							url : a
						})
					},
					f.prototype.showCharts = function (a) {
						var b;
						return this.maybeSet("showCharts", a),
						null != (b = this.get("showCharts")) ? b : !0
					},
					f.THEME_EXTRA_LENGTH = 1e3,
					f.prototype.themeExtra = function (a) {
						if (null != a) {
							if (a.length >= this.constructor.THEME_EXTRA_LENGTH)
								throw new Error("But it's so big!");
							this.set("themeExtra", a)
						}
						return this.isAprilFoolsTheme() && "on" === this.aprilFoolsState() ? "@import url('/static/kittens.css?1');" : this.get("themeExtra", null)
					},
					f.prototype.aprilFoolsState = function () {
						var a,
						b;
						return null != (b = e.search().forcefools) ? b : (a = moment(), a.isBetween(moment.parseZone("2015-03-31T21:00:00-07:00"), moment.parseZone("2015-04-02T00:00:00-07:00")) ? "on" : a.isBetween(moment.parseZone("2015-04-02T00:00:00-07:00"), moment.parseZone("2015-04-04T00:00:00-07:00")) ? "after" : "off")
					},
					f.prototype.isAprilFoolsTheme = function (a) {
						var b;
						return this.maybeSet("aprilFoolsTheme", a),
						null != (b = this.get("aprilFoolsTheme")) ? b : !1
					},
					f
				}
				()
			}
		]),
	angular.module("swarmApp").factory("options", ["Options", "session", function (a, b) {
				return new a(b)
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("OptionsCtrl", ["$scope", "$location", "options", "session", "game", "env", "$log", "backfill", "isKongregate", "storage", "feedback", "dropboxSyncer", function (a, b, c, d, e, f, g, h, i, j, k, l) {
				var m,
				n;
				return a.options = c,
				a.game = e,
				a.session = d,
				a.env = f,
				a.imported = {},
				a.isKongregate = i,
				a.isDropbox = l.isVisible(),
				a.duration_examples = [moment.duration(16, "seconds"), moment.duration(163, "seconds"), moment.duration(2.5, "hours"), moment.duration(3.33333333, "weeks"), moment.duration(2.222222222222, "months"), moment.duration(1.2, "year")],
				a.form = {
					isCustomTheme : c.theme().isCustom,
					customThemeUrl : c.theme().url,
					theme : c.theme().name,
					themeExtra : c.themeExtra(),
					isThemeExtraOpen : !!c.themeExtra(),
					iframeMinSize : {
						x : c.iframeMinX(),
						y : c.iframeMinY()
					}
				},
				a.setTheme = function (b) {
					return a.options.theme(b),
					a.form.isCustomTheme = !1
				},
				a.selectCustomTheme = function () {
					return a.form.isCustomTheme = !0,
					a.form.customThemeUrl = ""
				},
				a.setCustomTheme = function (b) {
					return console.log("setcustomtheme", b),
					a.options.customTheme(b)
				},
				a.select = function (a) {
					return a.target.select()
				},
				m = function (a) {
					var b,
					c,
					e;
					try {
						c = a.storage.getItem(d.id)
					} catch (f) {
						b = f,
						g.debug("error loading saveddatadetails from storage, continuing", a.name, b)
					}
					return e = {
						name : a.name,
						exists : null != c
					},
					null != c && (e.size = c.length),
					e
				},
				a.savedDataDetails = function () {
					var a,
					b,
					c,
					d;
					for (c = j.storages.list, d = [], a = 0, b = c.length; b > a; a++)
						n = c[a], d.push(m(n));
					return d
				}
				(),
				null == j.flash.isReady && j.flash.onReady.then(function () {
					return function () {
						return a.savedDataDetails = function () {
							var a,
							b,
							c,
							d;
							for (c = j.storages.list, d = [], a = 0, b = c.length; b > a; a++)
								n = c[a], d.push(m(n));
							return d
						}
						()
					}
				}
					(this)),
				a.importSave = function (b) {
					var c;
					if (!b || 0 !== b.indexOf("http")) {
						a.imported = {};
						try {
							return a.game.importSave(b),
							h.run(a.game),
							a.imported.success = !0,
							a.$root.$broadcast("import", {
								source : "options",
								success : !0
							}),
							g.debug("import success")
						} catch (d) {
							return c = d,
							a.imported.error = !0,
							a.$root.$broadcast("import", {
								source : "options",
								success : !1
							}),
							g.warn("import error", c)
						}
					}
				},
				a.confirmReset = function () {
					return confirm("You will lose everything and restart the game. No reset-bonuses here. You sure?") ? (j.removeItem(d.id), a.game.reset(!0), b.url("/")) : void 0
				},
				a.shorturl = function () {
					return k.createTinyurl(a.form["export"]).done(function (b) {
						return a.form["export"] = b.id
					}).fail(function () {
						return a.imported.error = !0
					})
				},
				a.clearThemeExtra = function () {
					return a.form.themeExtraSuccess = null,
					a.form.themeExtraError = null
				},
				a.themeExtra = function (b) {
					var d;
					a.clearThemeExtra();
					try {
						return c.themeExtra(b),
						a.form.themeExtraSuccess = !0
					} catch (e) {
						d = e,
						g.error(d),
						a.form.themeExtraError = null != d ? d.message : void 0
					}
				},
				a.isDefaultMinSize = function () {
					return a.form.iframeMinSize.x === a.options.constructor.IFRAME_X_MIN && a.form.iframeMinSize.y === a.options.constructor.IFRAME_Y_MIN
				},
				a.resetMinSize = function () {
					return a.options.iframeMinX(a.form.iframeMinSize.x = a.options.constructor.IFRAME_X_MIN),
					a.options.iframeMinY(a.form.iframeMinSize.y = a.options.constructor.IFRAME_Y_MIN)
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("Upgrade", ["util", "Effect", "$log", function (a, b, c) {
				var d;
				return d = function () {
					function d(b, c) {
						this.game = b,
						this.type = c,
						this.name = this.type.name,
						this.unit = a.assert(this.game.unit(this.type.unittype))
					}
					return d.prototype._init = function () {
						return this.costByName = {},
						this.cost = _.map(this.type.cost, function (b) {
								return function (c) {
									var d;
									return a.assert(c.unittype, "upgrade cost without a unittype", b.name, name, c),
									d = _.clone(c),
									d.unit = a.assert(b.game.unit(c.unittype)),
									d.val = new Decimal(d.val),
									d.factor = new Decimal(d.factor),
									b.costByName[d.unit.name] = d,
									d
								}
							}
								(this)),
						this.requires = _.map(this.type.requires, function (b) {
								return function (c) {
									var d;
									return a.assert(c.unittype, "upgrade require without a unittype", b.name, name, c),
									d = _.clone(c),
									d.unit = a.assert(b.game.unit(c.unittype)),
									d.val = new Decimal(d.val),
									d
								}
							}
								(this)),
						this.effect = _.map(this.type.effect, function (a) {
								return function (c) {
									return new b(a.game, a, c)
								}
							}
								(this))
					},
					d.prototype.count = function () {
						var b,
						c;
						return c = null != (b = this.game.session.state.upgrades[this.name]) ? b : 0,
						_.isNaN(c) && (a.error("count is NaN! resetting to zero. " + this.name), c = 0),
						this.type.maxlevel && (c = Decimal.min(this.type.maxlevel, c)),
						new Decimal(c)
					},
					d.prototype._setCount = function (a) {
						return this.game.session.state.upgrades[this.name] = new Decimal(a),
						this.game.cache.onUpdate()
					},
					d.prototype._addCount = function (a) {
						return this._setCount(this.count().plus(a))
					},
					d.prototype._subtractCount = function (a) {
						return this._addCount(new Decimal(a).negated())
					},
					d.prototype.isVisible = function () {
						return this.unit.isVisible() || this.unit.unittype.disabled ? null != this.type.maxlevel && this.count().greaterThanOrEqualTo(this.type.maxlevel) ? !1 : this.type.disabled ? !1 : this.game.cache.upgradeVisible[this.name] ? !0 : this.game.cache.upgradeVisible[this.name] = this._isVisible() : !1
					},
					d.prototype._isVisible = function () {
						var a,
						b,
						c,
						d;
						if (this.count().greaterThan(0))
							return !0;
						for (c = this.requires, a = 0, b = c.length; b > a; a++)
							if (d = c[a], d.val.greaterThan(d.unit.count()))
								return !1;
						return !0
					},
					d.prototype.totalCost = function () {
						var a,
						b;
						return null != (a = this.game.cache.upgradeTotalCost)[b = this.name] ? a[b] : a[b] = this._totalCost()
					},
					d.prototype._totalCost = function (a) {
						return null == a && (a = this.count().plus(this.unit.stat("upgradecost", 0))),
						_.map(this.cost, function (b) {
							return function (c) {
								var d;
								return d = _.clone(c),
								d.val = d.val.times(Decimal.pow(d.factor, a)).times(b.unit.stat("upgradecostmult", 1)).times(b.unit.stat("upgradecostmult." + b.name, 1)),
								d
							}
						}
							(this))
					},
					d.prototype.sumCost = function (a, b) {
						return _.map(this._totalCost(b), function (b) {
							var c;
							return c = _.clone(b),
							c.val = c.val.times(c.factor.equals(1) ? a : Decimal.ONE.minus(Decimal.pow(c.factor, a)).dividedBy(Decimal.ONE.minus(c.factor))),
							c
						})
					},
					d.prototype.isCostMet = function () {
						return this.maxCostMet().greaterThan(0)
					},
					d.prototype.maxCostMet = function (b) {
						var d,
						e;
						return null == b && (b = 1),
						null != (d = this.game.cache.upgradeMaxCostMet)[e = this.name + ":" + b] ? d[e] : d[e] = function (d) {
							return function () {
								var e,
								f,
								g,
								h,
								i,
								j,
								k,
								l,
								m;
								for (k = new Decimal(1 / 0), d.type.maxlevel && (k = new Decimal(d.type.maxlevel).minus(d.count())), l = d.totalCost(), f = 0, h = l.length; h > f; f++)
									e = l[f], a.assert(e.val.greaterThan(0), "upgrade cost <= 0", d.name, d), j = e.factor.equals(1) ? e.unit.count().dividedBy(e.val) : Decimal.ONE.minus(e.unit.count().times(b).times(Decimal.ONE.minus(e.factor)).dividedBy(e.val)).log().dividedBy(e.factor.log()), k = Decimal.min(k, j);
								if (k = k.floor(), k.greaterThanOrEqualTo(0))
									for (m = d.sumCost(k), g = 0, i = m.length; i > g; g++)
										if (e = m[g], e.unit.count().lessThan(e.val))
											return c.debug("maxCostMet corrected its own precision"), k.minus(1);
								return k
							}
						}
						(this)()
					},
					d.prototype.isMaxAffordable = function () {
						return null != this.type.maxlevel && this.maxCostMet().greaterThanOrEqualTo(this.type.maxlevel)
					},
					d.prototype.costMetPercent = function () {
						var a,
						b,
						c,
						d,
						e,
						f,
						g,
						h;
						if (b = _.indexBy(this.sumCost(this.maxCostMet()), function (a) {
									return a.unit.name
								}), f = new Decimal(1 / 0), this.isMaxAffordable())
							return Decimal.ONE;
						for (g = this.sumCost(this.maxCostMet().plus(1)), d = 0, e = g.length; e > d; d++)
							a = g[d], c = a.unit.count().minus(b[a.unit.name].val), h = a.val.minus(b[a.unit.name].val), f = Decimal.min(f, c.dividedBy(h));
						return Decimal.min(1, Decimal.max(0, f))
					},
					d.prototype.estimateSecsUntilBuyable = function (a) {
						var b,
						c,
						d,
						e;
						return this.isMaxAffordable() ? {
							val : new Decimal(1 / 0)
						}
						 : (c = this.game.cache.upgradeEstimateSecsUntilBuyableCacheSafe[this.name], null == c && (c = null != (b = this.game.cache.upgradeEstimateSecsUntilBuyablePeriodic)[d = this.name] ? b[d] : b[d] = this._estimateSecsUntilBuyable(), c.cacheSafe && (this.game.cache.upgradeEstimateSecsUntilBuyableCacheSafe[this.name] = c)), e = _.extend({
									val : c.rawVal.plus((c.now - this.game.now.getTime()) / 1e3)
								}, c), e.val.lessThanOrEqualTo(0) && !a && (delete this.game.cache.upgradeEstimateSecsUntilBuyableCacheSafe[this.name], delete this.game.cache.upgradeEstimateSecsUntilBuyablePeriodic[this.name], e = this.estimateSecsUntilBuyable(!0)), e)
					},
					d.prototype._estimateSecsUntilBuyable = function () {
						var a,
						b,
						c,
						d,
						e,
						f,
						g,
						h;
						if (c = _.indexBy(this.sumCost(this.maxCostMet()), function (a) {
									return a.unit.name
								}), a = !0, f = {
								rawVal : new Decimal(0),
								unit : null
							}, null != this.type.maxlevel && this.maxCostMet().plus(1).greaterThan(this.type.maxlevel))
							return 0;
						for (g = this.sumCost(this.maxCostMet().plus(1)), d = 0, e = g.length; e > d; d++)
							b = g[d], h = b.unit.estimateSecsUntilEarned(b.val), f.rawVal.lessThan(h) && (f = {
									rawVal : h,
									unit : b.unit,
									now : this.game.now.getTime()
								}), a &= b.unit.isEstimateCacheable();
						return f.cacheSafe = a,
						f
					},
					d.prototype.isUpgradable = function (a, b) {
						var c,
						d;
						return null == a && (a = void 0),
						null == b && (b = !1),
						b && (a = new Decimal(null != a ? a : 1).dividedBy(this.watchedDivisor())),
						null != (c = this.game.cache.upgradeIsUpgradable)[d = this.name + ":" + a] ? c[d] : c[d] = "upgrade" === this.type["class"] && this.isBuyable() && this.maxCostMet(a).greaterThan(0)
					},
					d.prototype.isAutobuyable = function () {
						return this.watchedAt() > 0
					},
					d.prototype.isNewlyUpgradable = function (a) {
						return null == a && (a = 1),
						this.watchedAt() > 0 && this.isUpgradable(a / this.watchedDivisor())
					},
					d.prototype.isBuyable = function () {
						return this.isCostMet() && this.isVisible()
					},
					d.prototype.buy = function (b) {
						if (null == b && (b = 1), !this.isCostMet())
							throw new Error("We require more resources");
						if (!this.isBuyable())
							throw new Error("Cannot buy that upgrade");
						return b = Decimal.min(b, this.maxCostMet()),
						c.debug("buy", this.name, b),
						this.game.withSave(function (c) {
							return function () {
								var d,
								e,
								f,
								g,
								h,
								i,
								j,
								k,
								l,
								m,
								n,
								o;
								for (m = c.sumCost(b), h = 0, k = m.length; k > h; h++)
									d = m[h], a.assert(d.unit.count().greaterThanOrEqualTo(d.val), "tried to buy more than we can afford. upgrade.maxCostMet is broken!", c.name, name, d), a.assert(d.val.greaterThan(0), "zero cost from sumCost, yet cost was met?", c.name, name, d), d.unit._subtractCount(d.val);
								for (e = c.count(), c._addCount(b), g = i = 0, n = b.toNumber(); n >= 0 ? n > i : i > n; g = n >= 0 ? ++i : --i)
									for (o = c.effect, j = 0, l = o.length; l > j; j++)
										f = o[j], f.onBuy(e.plus(g + 1));
								return b
							}
						}
							(this))
					},
					d.prototype.buyMax = function (a) {
						return this.buy(this.maxCostMet(a))
					},
					d.prototype.calcStats = function (a, b) {
						var c,
						d,
						e,
						f,
						g;
						for (null == a && (a = {}), null == b && (b = {}), c = this.count(), g = this.effect, e = 0, f = g.length; f > e; e++)
							d = g[e], d.calcStats(a, b, c);
						return a
					},
					d.prototype.statistics = function () {
						var a,
						b,
						c;
						return null != (a = null != (b = this.game.session.state.statistics) && null != (c = b.byUpgrade) ? c[this.name] : void 0) ? a : {}

					},
					d.prototype._watchedAtDefault = function () {
						var a;
						return "mutagen" !== (null != (a = this.unit.tab) ? a.name : void 0)
					},
					d.prototype.isManuallyHidden = function () {
						return this.watchedAt() < 0
					},
					d.prototype.watchedAt = function () {
						var a,
						b,
						c;
						return null == (a = this.game.session.state).watched && (a.watched = {}),
						c = null != (b = this.game.session.state.watched[this.name]) ? b : this._watchedAtDefault(),
						"boolean" == typeof c ? c ? 1 : 0 : c
					},
					d.prototype.watchedDivisor = function () {
						return Math.max(this.watchedAt(), 1)
					},
					d.prototype.watch = function (a) {
						return this.game.withUnreifiedSave(function (b) {
							return function () {
								var c;
								return null == (c = b.game.session.state).watched && (c.watched = {}),
								a !== b._watchedAtDefault() ? b.game.session.state.watched[b.name] = a : delete b.game.session.state.watched[b.name]
							}
						}
							(this))
					},
					d
				}
				()
			}
		]),
	angular.module("swarmApp").factory("UpgradeType", function () {
		var a;
		return a = function () {
			function a(a) {
				_.extend(this, a)
			}
			return a
		}
		()
	}),
	angular.module("swarmApp").factory("UpgradeTypes", ["spreadsheetUtil", "UpgradeType", "util", function (a, b, c) {
				var d;
				return d = function () {
					function d(a, b) {
						var c,
						d,
						e;
						for (this.unittypes = a, null == b && (b = []), this.list = [], this.byName = {}, c = 0, d = b.length; d > c; c++)
							e = b[c], this.register(e)
					}
					return d.prototype.register = function (a) {
						return c.assert(a.name, "upgrade without a name", a),
						this.list.push(a),
						this.byName[a.name] = a
					},
					d.parseSpreadsheet = function (e, f, g) {
						var h,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p,
						q,
						r,
						s,
						t,
						u,
						v;
						for (t = a.parseRows({
									name : ["requires", "cost", "effect"]
								}, g.data.upgrades.elements), r = new d(e, function () {
									var a,
									c,
									d;
									for (d = [], a = 0, c = t.length; c > a; a++)
										s = t[a], s.name && d.push(new b(s));
										return d
									}
										()), o = r.list, i = 0, l = o.length; l > i; i++)for (v = o[i], a.resolveList([v], "unittype", e.byName), a.resolveList(v.cost, "unittype", e.byName), a.resolveList(v.requires, "unittype", e.byName), a.resolveList(v.effect, "unittype", e.byName, {
									required : !1
								}), a.resolveList(v.effect, "upgradetype", r.byName, {
									required : !1
								}), a.resolveList(v.effect, "type", f.byName), p = v.cost, j = 0, m = p.length; m > j; j++)
								h = p[j], c.assert(h.val > 0, "upgradetype cost.val must be positive", h), 1 !== v.maxlevel || h.factor || (h.factor = 1), c.assert(h.factor > 0, "upgradetype cost.factor must be positive", h);
						for (q = e.list, k = 0, n = q.length; n > k; k++)
							u = q[k], a.resolveList(u.requires, "upgradetype", r.byName, {
								required : !1
							});
						return r
					},
					d
				}
				()
			}
		]),
	angular.module("swarmApp").factory("upgradetypes", ["UpgradeTypes", "unittypes", "effecttypes", "spreadsheet", function (a, b, c, d) {
				return a.parseSpreadsheet(b, c, d)
			}
		])
}
.call(this), function () {
	"use strict";
	var a = [].slice;
	angular.module("swarmApp").factory("util", ["$log", "$rootScope", "$timeout", function (b, c, d) {
				var e;
				return new(e = function () {
					function e() {}

					return e.prototype.sum = function (a) {
						return _.reduce(a, function (a, b) {
							return a + b
						}, 0)
					},
					e.prototype.assert = function () {
						var d,
						e;
						if (e = arguments[0], d = 2 <= arguments.length ? a.call(arguments, 1) : [], !e)
							throw b.error.apply(b, ["Assertion error"].concat(a.call(d))), c.$emit("assertionFailure", d), new Error(d);
						return e
					},
					e.prototype.error = function () {
						var b;
						return b = 1 <= arguments.length ? a.call(arguments, 0) : [],
						c.$emit("error", b)
					},
					e.prototype.walk = function (a, b, c, d) {
						var e,
						f,
						g,
						h,
						i,
						j,
						k;
						if (null == c && (c = ""), null == d && (d = []), k = b(a, c), null != k && d.push(k), _.isArray(a))
							for (g = f = 0, i = a.length; i > f; g = ++f)
								e = a[g], this.walk(e, b, c + "[" + g + "]", d);
						else if (_.isObject(a))
							for (h in a)
								j = a[h], this.walk(j, b, c + "." + h, d);
						return d
					},
					e.prototype.animateController = function (a, b) {
						var e,
						f,
						g,
						h,
						i,
						j;
						return null == b && (b = {}),
						g = null != (i = b.game) ? i : a.game,
						h = null != (j = b.options) ? j : a.options,
						f = null,
						(e = function () {
							return f = d(e, h.fpsSleepMillis()),
							g.tick(),
							c.$emit("tick", g)
						})(),
						a.$on("$destroy", function () {
							return d.cancel(f)
						})
					},
					e.prototype.isWindowFocused = function (a) {
						var b;
						return null == a && (a = !0),
						!(null != (b = "function" == typeof document.hidden ? document.hidden() : void 0) ? b : !a)
					},
					e.prototype.isFloatEqual = function (a, b, c) {
						return null == c && (c = 0),
						Math.abs(a - b) <= c
					},
					e.prototype.utcdoy = function (a) {
						var b,
						c,
						d;
						return d = moment.utc(a),
						b = parseInt(d.format("DDD")) - 1,
						c = b > 0 ? b + "d " : "",
						"" + c + d.format("H\\h mm:ss.SSS")
					},
					e
				}
					())
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("Effect", ["util", function (a) {
				var b;
				return b = function () {
					function b(b, c, d) {
						this.game = b,
						this.parent = c,
						_.extend(this, d),
						null != d.unittype && (this.unit = a.assert(this.game.unit(d.unittype))),
						null != d.unittype2 && (this.unit2 = a.assert(this.game.unit(d.unittype2))),
						null != d.upgradetype && (this.upgrade = a.assert(this.game.upgrade(d.upgradetype)))
					}
					return b.prototype.parentUnit = function () {
						return null != this.parent.unittype ? this.parent : this.parent.unit
					},
					b.prototype.parentUpgrade = function () {
						return null != this.parent.unittype ? null : this.parent
					},
					b.prototype.hasParentStat = function (a, b) {
						return this.parentUnit().hasStat(a, b)
					},
					b.prototype.parentStat = function (a, b) {
						return this.parentUnit().stat(a, b)
					},
					b.prototype.onBuy = function (a) {
						var b;
						return "function" == typeof(b = this.type).onBuy ? b.onBuy(this, this.game, this.parent, a) : void 0
					},
					b.prototype.calcStats = function (a, b, c) {
						var d;
						return null == a && (a = {}),
						null == b && (b = {}),
						null == c && (c = this.parent.count()),
						"function" == typeof(d = this.type).calcStats && d.calcStats(this, a, b, c),
						a
					},
					b.prototype.bank = function () {
						var a;
						return "function" == typeof(a = this.type).bank ? a.bank(this, this.game) : void 0
					},
					b.prototype.cap = function () {
						var a;
						return "function" == typeof(a = this.type).cap ? a.cap(this, this.game) : void 0
					},
					b.prototype.output = function (a) {
						var b;
						return "function" == typeof(b = this.type).output ? b.output(this, this.game, void 0, a) : void 0
					},
					b.prototype.outputNext = function () {
						return this.output(this.parent.count().plus(1))
					},
					b.prototype.power = function () {
						var a,
						b,
						c;
						return b = this.parentStat("power", 1),
						c = null != (a = this.parentUpgrade()) ? a.name : void 0,
						c && (b = b.times(this.parentStat("power." + c, 1))),
						b
					},
					b
				}
				()
			}
		]),
	angular.module("swarmApp").factory("EffectType", function () {
		var a;
		return a = function () {
			function a(a) {
				_.extend(this, a)
			}
			return a
		}
		()
	}),
	angular.module("swarmApp").factory("EffectTypes", function () {
		var a;
		return a = function () {
			function a(a) {
				var b,
				c,
				d;
				for (null == a && (a = []), this.list = [], this.byName = {}, c = 0, d = a.length; d > c; c++)
					b = a[c], this.register(b)
			}
			return a.prototype.register = function (a) {
				return this.list.push(a),
				this.byName[a.name] = a,
				this
			},
			a
		}
		()
	}),
	angular.module("swarmApp").factory("romanize", function () {
		var a = function (a) {
			if (!+a)
				return !1;
			for (var b = String(+a).split(""), c = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], d = "", e = 3; e--; )
				d = (c[+b.pop() + 10 * e] || "") + d;
			return Array(+b.join("") + 1).join("M") + d
		};
		return a
	}),
	angular.module("swarmApp").factory("effecttypes", ["EffectType", "EffectTypes", "util", "seedrand", "$log", "romanize", function (a, b, c, d, e, f) {
				var g,
				h;
				return g = new b,
				h = function (a, b, d) {
					return null == b[a] && (b[a] = d),
					c.assert(b[a] === d, "conflicting stat operations. expected " + d + ", got " + b[a], a, b, d)
				},
				g.register({
					name : "addUnit",
					onBuy : function (a, b) {
						return a.unit._addCount(this.output(a, b))
					},
					output : function (a) {
						return a.power().times(a.val)
					}
				}),
				g.register({
					name : "addUnitByVelocity",
					onBuy : function (a, b) {
						return a.unit._addCount(this.output(a, b))
					},
					output : function (a) {
						return a.unit.velocity().times(a.val).times(a.power())
					}
				}),
				g.register({
					name : "addUnitRand",
					onBuy : function (a, b, c, d) {
						var e;
						return e = this.output(a, b, c, d),
						e.spawned ? (a.unit.count().isZero() && (b.cache.firstSpawn[a.unit.name] = b.now), a.unit._addCount(e.qty)) : void 0
					},
					output : function (a, b, c, e) {
						var f,
						g,
						h,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p,
						q,
						r,
						s,
						t;
						return null == c && (c = a.parent),
						null == e && (e = c.count()),
						j = a.parentStat("random.minlevel." + c.name),
						e.greaterThanOrEqualTo(j) ? (t = a.parentStat("random.each", 1), m = a.parentStat("random.freq"), k = .9, i = 1.1, o = a.val, g = t.times(Decimal.pow(o, e)), null == (f = b.session.state.date).restarted && (f.restarted = b.session.state.date.started), s = "[" + b.session.state.date.restarted.getTime() + ", " + a.parent.name + ", " + e + "]", p = d.rng(s), q = p(), h = e.equals(j) || e.modulo(8).equals(0) || new Decimal(q + "").lessThan(m), r = p(), l = k + r * (i - k), n = g.times(l + "").ceil(), {
							spawned : h,
							baseqty : g,
							qty : n
						}) : {
							spawned : !1,
							baseqty : new Decimal(0),
							qty : new Decimal(0)
						}
					}
				}),
				g.register({
					name : "compoundUnit",
					bank : function (a) {
						var b;
						return b = a.unit.count(),
						null != a.unit2 && (b = b.plus(a.unit2.count())),
						b
					},
					cap : function (a) {
						var b;
						return "" === a.val2 || null == a.val2 ? void 0 : (b = a.unit.velocity(), null != a.unit2 && (b = b.plus(a.unit2.velocity())), b.times(a.val2).times(a.power()))
					},
					output : function (a, b) {
						var c,
						d,
						e;
						return c = this.bank(a, b),
						e = c.times(a.val - 1),
						null != (d = this.cap(a, b)) && (e = Decimal.min(e, d)),
						e
					},
					onBuy : function (a, b) {
						return a.unit._addCount(this.output(a, b))
					}
				}),
				g.register({
					name : "addUpgrade",
					onBuy : function (a, b) {
						return a.upgrade._addCount(this.output(a, b))
					},
					output : function (a) {
						return a.power().times(a.val)
					}
				}),
				g.register({
					name : "skipTime",
					onBuy : function (a) {
						return a.game.skipTime(this.output(a).toNumber(), "seconds")
					},
					output : function (a) {
						return a.power().times(a.val)
					}
				}),
				g.register({
					name : "multStat",
					calcStats : function (a, b, c, d) {
						var e;
						return h(a.stat, c, "mult"),
						b[a.stat] = (null != (e = b[a.stat]) ? e : Decimal.ONE).times(Decimal.pow(a.val, d))
					}
				}),
				g.register({
					name : "expStat",
					calcStats : function (a, b, c, d) {
						var e;
						return h(a.stat, c, "mult"),
						b[a.stat] = (null != (e = b[a.stat]) ? e : Decimal.ONE).times(Decimal.pow(d, a.val).times(a.val2).plus(1))
					}
				}),
				g.register({
					name : "asympStat",
					calcStats : function (a, b, d, e) {
						var f,
						g;
						return h(a.stat, d, "mult"),
						g = e.times(a.val2),
						c.assert(!g.isNegative(), "negative asympStat weight"),
						b[a.stat] = (null != (f = b[a.stat]) ? f : Decimal.ONE).times(Decimal.ONE.plus(new Decimal(a.val).minus(1).times(Decimal.ONE.minus(Decimal.ONE.dividedBy(g.plus(1))))))
					}
				}),
				g.register({
					name : "logStat",
					calcStats : function (a, b, c, d) {
						var e,
						f;
						return h(a.stat, c, "mult"),
						b[a.stat] = (null != (f = b[a.stat]) ? f : Decimal.ONE).times(new Decimal(null != (e = a.val3) ? e : 1).times(Decimal.log(d.times(a.val).plus(a.val2)).dividedBy(Decimal.log(a.val2)).minus(1)).plus(1))
					}
				}),
				g.register({
					name : "addStat",
					calcStats : function (a, b, c, d) {
						var e;
						return h(a.stat, c, "add"),
						b[a.stat] = (null != (e = b[a.stat]) ? e : new Decimal(0)).plus(new Decimal(a.val).times(d))
					}
				}),
				g.register({
					name : "initStat",
					calcStats : function (a, b, c) {
						var d;
						return h(a.stat, c, "mult"),
						b[a.stat] = (null != (d = b[a.stat]) ? d : Decimal.ONE).times(a.val)
					}
				}),
				g.register({
					name : "multStatPerAchievementPoint",
					calcStats : function (a, b, c, d) {
						var e,
						f;
						return h(a.stat, c, "mult"),
						e = a.game.achievementPoints(),
						b[a.stat] = (null != (f = b[a.stat]) ? f : Decimal.ONE).times(Decimal.pow(Decimal.ONE.plus(new Decimal(a.val).times(e)), d))
					}
				}),
				g.register({
					name : "suffix",
					calcStats : function (a, b, c, d) {
						var e,
						g;
						return d.isZero() ? g = "" : d.lessThan(3999) && (g = f(d.plus(1).toNumber())),
						null == g && (g = d.plus(1).toString()),
						a.unit.suffix = g,
						b.empower = (null != (e = b.empower) ? e : new Decimal(0)).plus(d)
					}
				}),
				g
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").value("analyticsDimensionList", ["version"]),
	angular.module("swarmApp").factory("analyticsDimensions", ["analyticsDimensionList", function (a) {
				var b,
				c,
				d,
				e,
				f;
				for (f = {}, b = 0, c = 0, d = a.length; d > c; c++)
					e = a[c], b += 1, f[e] = "dimension" + b;
				return f
			}
		]),
	angular.module("swarmApp").value("analyticsMetricList", ["saveFileChars", "clickLogChars"]),
	angular.module("swarmApp").factory("analyticsMetrics", ["analyticsMetricList", function (a) {
				var b,
				c,
				d,
				e,
				f;
				for (f = {}, b = 0, c = 0, d = a.length; d > c; c++)
					e = a[c], b += 1, f[e] = "metric" + b;
				return f
			}
		]),
	angular.module("swarmApp").factory("analytics", ["$rootScope", "$analytics", "env", "game", "version", "analyticsDimensions", "analyticsMetrics", "statistics", "session", "$log", function (a, b, c, d, e, f, g, h, i, j) {
				var k,
				l,
				m,
				n,
				o,
				p,
				q;
				return l = f,
				q = g,
				c.gaTrackingID && null != window.ga ? (window.ga("set", l.version, e), a.$on("select", function (a, c) {
						var d,
						e,
						f;
						return d = null != (e = null != c && null != (f = c.unit) ? f.name : void 0) ? e : "#back-button",
						b.pageTrack("/oldui/unit/" + d)
					}), a.$on("save", function () {
						return window.ga("set", q.saveFileChars, i.exportSave().length)
					}), a.$on("achieve", function (a, c) {
						return b.eventTrack("achievementEarned", {
							category : "achievement",
							label : c.name,
							value : c.earnedAtMillisElapsed()
						})
					}), a.$on("command", function (a, c) {
						var d,
						e;
						return b.eventTrack(c.name, {
							category : "command",
							label : null != (d = c.unitname) ? d : c.upgradename,
							value : null != (e = c.twinnum) ? e : c.num
						})
					}), a.$on("buyFirst", function (a, c) {
						var d;
						return b.eventTrack("buyFirst:" + c.name, {
							category : "buyFirst",
							label : null != (d = c.unitname) ? d : c.upgradename,
							value : c.elapsed
						})
					}), a.$on("reset", function () {
						return b.eventTrack("reset", {
							category : "reset"
						})
					}), a.$on("import", function (a, c) {
						return b.eventTrack("import", {
							category : "import",
							value : c.success ? 1 : 0
						})
					}), a.$on("timecheckFailed", function () {
						return b.eventTrack("timecheckFailed", {
							category : "timecheck"
						})
					}), a.$on("timecheckError", function () {
						return b.eventTrack("timecheckError", {
							category : "timecheck"
						})
					}), m = 0, k = 12, n = function (a) {
					var b;
					return o(null != (b = null != a ? a.message : void 0) ? b : a, a, "captureException")
				}, p = function (a) {
					return o(a, a, "captureMessage")
				}, o = function (a, b, c) {
					return m += 1,
					k >= m && (Raven[c](b), j.debug("logging error to sentry", b), m === k) ? j.warn("error threshold reached, no more errors will be reported to sentry") : void 0
				}, a.$on("unhandledException", function (a, b) {
						var c,
						d;
						try {
							return n(b.exception)
						} catch (e) {
							c = e;
							try {
								return j.warn("unhandled exception error logging loop", c),
								Raven.captureError(c)
							} catch (e) {
								return d = e,
								j.warn("exception logging failed, giving up", d)
							}
						}
					}), a.$on("error", function (a, b) {
						return p("emittedError", b)
					}), a.$on("assertionFailure", function (a, b) {
						return p("assertionFailure", b)
					}), a.$on("loadGameFromStorageFailed", function (a, b) {
						return p("loadGameFromStorageFailed", b)
					})) : void j.debug("skipping analytics event logging", window.ga, c.gaTrackingID)
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("ChangelogCtrl", ["$log", "$scope", "env", "version", function (a, b, c) {
				var d,
				e,
				f,
				g,
				h;
				return b.$emit("changelog"),
				b.env = c,
				h = -8,
				b.changestats = {
					_rawheaders : $(".changelog h4"),
					lastHeaders : function (a) {
						return _.filter(b.changestats.headers, function (b) {
							return b.diffDays < a
						})
					}
				},
				e = function (a) {
					var b,
					c,
					d,
					e,
					f,
					g;
					return f = $(a).text(),
					e = f.split(" "),
					g = e[0],
					c = e[1],
					b = moment(c, "YYYY/MM/DD").zone(h),
					d = moment().zone(h).diff(b, "days"), {
						text : f,
						version : g,
						date : b,
						diffDays : d
					}
				},
				b.changestats.headers = function () {
					var a,
					c,
					f,
					g;
					for (f = b.changestats._rawheaders, g = [], a = 0, c = f.length; c > a; a++)
						d = f[a], g.push(e(d));
					return g
				}
				(),
				f = b.changestats.headers,
				b.changestats.lastrelease = f[0],
				b.changestats.firstrelease = f[f.length - 1],
				b.changestats.days = null != (g = b.changestats.firstrelease) ? g.diffDays : void 0,
				a.debug("changelogdate", b.changestats)
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("commands", ["util", "game", "$rootScope", "$log", "loginApi", function (a, b, c, d, e) {
				var f;
				return new(f = function () {
					function d() {}

					return d.prototype._setUndo = function (a) {
						return null == a && (a = {}),
						this._undo = _.extend({}, a, {
								state : b.session.exportSave(),
								date : b.now
							})
					},
					d.prototype.undo = function () {
						var a,
						c;
						if (!(null != (a = this._undo) ? a.state : void 0))
							throw new Error("no undostate available");
						return c = this._undo.state,
						this._setUndo({
							isRedo : !0
						}),
						b.importSave(c, !1)
					},
					d.prototype._emit = function (b, d) {
						return a.assert(null == d.name, "command has a name already?"),
						d.name = b,
						c.$emit("command", d),
						e.saveCommand(d)
					},
					d.prototype.buyUnit = function (a) {
						var b,
						c,
						d;
						return this._setUndo(),
						d = a.unit,
						c = a.num,
						b = d.buy(c),
						this._emit("buyUnit", {
							unit : d,
							unitname : d.name,
							now : d.game.now,
							elapsed : d.game.elapsedStartMillis(),
							attempt : c,
							num : b.num,
							twinnum : b.twinnum,
							ui : a.ui
						})
					},
					d.prototype.buyMaxUnit = function (a) {
						var b,
						c;
						return this._setUndo(),
						c = a.unit,
						b = c.buyMax(a.percent),
						this._emit("buyMaxUnit", {
							unit : c,
							unitname : c.name,
							now : c.game.now,
							elapsed : c.game.elapsedStartMillis(),
							num : b.num,
							twinnum : b.twinnum,
							percent : a.percent,
							ui : a.ui
						})
					},
					d.prototype.buyUpgrade = function (a) {
						var b,
						c;
						return this._setUndo(),
						c = a.upgrade,
						b = c.buy(a.num),
						this._emit("buyUpgrade", {
							upgrade : c,
							upgradename : c.name,
							now : c.game.now,
							elapsed : c.game.elapsedStartMillis(),
							num : b,
							ui : a.ui
						})
					},
					d.prototype.buyMaxUpgrade = function (a) {
						var b,
						c;
						return this._setUndo(),
						c = a.upgrade,
						b = c.buyMax(a.percent),
						this._emit("buyMaxUpgrade", {
							upgrade : c,
							upgradename : c.name,
							now : c.game.now,
							elapsed : c.game.elapsedStartMillis(),
							num : b,
							percent : a.percent,
							ui : a.ui
						})
					},
					d.prototype.buyAllUpgrades = function (a) {
						var b,
						c,
						d,
						e,
						f;
						for (this._setUndo(), f = a.upgrades, b = 0, c = f.length; c > b; b++)
							e = f[b], d = e.buyMax(a.percent / e.watchedDivisor()), this._emit("buyMaxUpgrade", {
								upgrade : e,
								upgradename : e.name,
								now : e.game.now,
								elapsed : e.game.elapsedStartMillis(),
								num : d,
								percent : a.percent,
								ui : "buyAllUpgrades"
							});
						return f.length ? this._emit("buyAllUpgrades", {
							now : f[0].game.now,
							elapsed : f[0].game.elapsedStartMillis(),
							percent : a.percent
						}) : void 0
					},
					d.prototype.ascend = function (a) {
						return this._setUndo(),
						b = a.game,
						b.ascend(),
						this._emit("ascension", {
							now : b.now,
							unit : b.unit("ascension"),
							unitname : "ascension",
							num : 1,
							twinnum : 1,
							elapsed : b.elapsedStartMillis()
						})
					},
					d.prototype.respec = function (a) {
						return this._setUndo(),
						b = a.game,
						b.respec(),
						this._emit("respec", {
							now : b.now,
							elapsed : b.elapsedStartMillis()
						})
					},
					d.prototype.respecFree = function (a) {
						return this._setUndo(),
						b = a.game,
						b.respecFree(),
						this._emit("respec", {
							now : b.now,
							elapsed : b.elapsedStartMillis()
						})
					},
					d
				}
					())
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("StatisticsListener", ["util", "$log", "kongregate", function (a, b, c) {
				var d;
				return d = function () {
					function a(a, b) {
						this.session = a,
						this.scope = b,
						this._init()
					}
					return a.prototype._init = function () {
						var a,
						b;
						return b = null != (a = this.session.state).statistics ? a.statistics : a.statistics = {},
						null == b.byUnit && (b.byUnit = {}),
						null == b.byUpgrade && (b.byUpgrade = {}),
						null != b.clicks ? b.clicks : b.clicks = 0
					},
					a.prototype.push = function (a) {
						var c,
						d,
						e;
						if (d = this.session.state.statistics, d.clicks += 1, null != a.unitname) {
							e = d.byUnit[a.unitname],
							null == e && (e = d.byUnit[a.unitname] = {
									clicks : 0,
									num : 0,
									twinnum : 0,
									elapsedFirst : a.elapsed
								}, this.scope.$emit("buyFirst", a)),
							e.clicks += 1;
							try {
								e.num = new Decimal(e.num).plus(a.num),
								e.twinnum = new Decimal(e.twinnum).plus(a.twinnum)
							} catch (f) {
								c = f,
								b.warn("statistics corrupt for unit, resetting", a.unitname, e, c),
								e.num = new Decimal(a.num),
								e.twinnum = new Decimal(a.twinnum)
							}
						}
						if (null != a.upgradename) {
							e = d.byUpgrade[a.upgradename],
							null == e && (e = d.byUpgrade[a.upgradename] = {
									clicks : 0,
									num : 0,
									elapsedFirst : a.elapsed
								}, this.scope.$emit("buyFirst", a)),
							e.clicks += 1;
							try {
								e.num = new Decimal(e.num).plus(a.num)
							} catch (f) {
								c = f,
								b.warn("statistics corrupt for upgrade, resetting", a.upgradename, e, c),
								e.num = new Decimal(a.num)
							}
						}
						return this.session.save(),
						delete a.now,
						delete a.unit,
						delete a.upgrade
					},
					a.prototype.listen = function (a) {
						return a.$on("reset", function (a) {
							return function () {
								return a._init()
							}
						}
							(this)),
						a.$on("command", function (a) {
							return function (d, e) {
								return b.debug("statistics", d, e),
								a.push(e),
								c.reportStats()
							}
						}
							(this))
					},
					a
				}
				()
			}
		]),
	angular.module("swarmApp").factory("statistics", ["session", "StatisticsListener", "$rootScope", function (a, b, c) {
				var d;
				return d = new b(a, c),
				d.listen(c),
				d
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("StatisticsCtrl", ["$scope", "session", "statistics", "game", "options", "util", function (a, b, c, d, e, f) {
				return a.listener = c,
				a.session = b,
				a.statistics = b.state.statistics,
				a.game = d,
				a.unitStats = function (b) {
					var c,
					d;
					return d = _.clone(null != (c = a.statistics.byUnit) ? c[null != b ? b.name : void 0] : void 0),
					null != d && (d.elapsedFirstStr = f.utcdoy(d.elapsedFirst)),
					d
				},
				a.hasUnitStats = function (b) {
					return !!a.unitStats(b)
				},
				a.showStats = function (b) {
					return a.hasUnitStats(b) || !b.isBuyable() && b.isVisible()
				},
				a.upgradeStats = function (b) {
					var c;
					return c = a.statistics.byUpgrade[b.name],
					null != c && (c.elapsedFirstStr = f.utcdoy(c.elapsedFirst)),
					c
				},
				a.hasUpgradeStats = function (b) {
					return !!a.upgradeStats(b)
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").value("timecheckerServerFormat", "ddd, DD MMM YYYY HH:mm:ss"),
	angular.module("swarmApp").factory("TimeChecker", ["$rootScope", "$http", "$q", "timecheckUrl", "game", "timecheckerServerFormat", "$log", function (a, b, c, d, e, f, g) {
				var h;
				return h = function () {
					function e(a) {
						this.threshold = moment.duration(a, "hours")
					}
					return e.prototype.fetchNetTime = function () {
						return b.get(d)
					},
					e.prototype.isNetTimeInvalid = function () {
						return this.fetchNetTime().then(function (b) {
							return function (c) {
								var d;
								return d = b._isNetTimeInvalid(c.headers().date),
								a.$emit("timecheck", c),
								d
							}
						}
							(this), function () {
							return function (b) {
								return g.debug("fetchnettime promise failed", b),
								a.$emit("timecheckError", {
									error : "fetchNetTime promise failed",
									res : b
								}),
								c.reject(b)
							}
						}
							(this))
					},
					e.prototype._parseDate = function (a) {
						return a = a.replace(/\ [A-Za-z]+$/, ""),
						moment(a, f, !0)
					},
					e.prototype._isNetTimeInvalid = function (b, c) {
						var d,
						e,
						f;
						if (null == c && (c = moment()), null == b)
							return a.$emit("timecheckError", {
								error : "netnowString is required (network failure?)"
							}), null;
						try {
							f = this._parseDate(b)
						} catch (g) {
							return e = g,
							a.$emit("timecheckError", {
								error : "_parseDate exception: " + e
							}),
							null
						}
						return f.isValid() ? (d = c.diff(f, "hours"), Math.abs(d) > this.threshold.as("hours")) : (a.$emit("timecheckError", {
								error : "couldn't parse date: " + b
							}), null)
					},
					e.prototype.enforceNetTime = function () {
						return this.isNetTimeInvalid().then(function () {
							return function (b) {
								return b && a.$emit("timecheckFailed"),
								b
							}
						}
							(this))
					},
					e
				}
				()
			}
		]),
	angular.module("swarmApp").value("timecheckUrl", "./version.json"),
	angular.module("swarmApp").value("timecheckThresholdHours", 96),
	angular.module("swarmApp").factory("timecheck", ["TimeChecker", "timecheckThresholdHours", function (a, b) {
				return new a(b)
			}
		]),
	angular.module("swarmApp").factory("VersionChecker", ["env", "util", "$log", function (a, b, c) {
				var d;
				return d = function () {
					function d(a) {
						this.version = a,
						this._MAX = 1e5
					}
					return d.prototype.check = function (b) {
						return a.isAppcacheEnabled && window.appCacheNanny.hasUpdate() || this.compare(this.version, b) < 0 ? (c.debug("newer version found on server! reloading.", {
								local : this.version,
								remote : b
							}), window.location.reload()) : void 0
					},
					d.prototype.compare = function (a, b) {
						return this.normalize(a) - this.normalize(b)
					},
					d.prototype.normalize = function (a) {
						var c,
						d,
						e,
						f,
						g,
						h;
						for (h = 0, d = a.split("."), d.reverse(), f = e = 0, g = d.length; g > e; f = ++e)
							c = d[f], c = parseInt(c), b.assert(!_.isNaN(c), "version compare failed, a chunk isNaN", c, a), b.assert(c < this._MAX, "version compare failed, a chunk is too big", c, a), h += c * Math.pow(this._MAX, f);
						return h
					},
					d
				}
				()
			}
		]),
	angular.module("swarmApp").factory("versioncheck", ["$rootScope", "VersionChecker", "version", "$log", function (a, b, c, d) {
				var e;
				return e = new b(c),
				a.$on("timecheck", function (a, b) {
					var f,
					g;
					return g = null != b && null != (f = b.data) ? f.version : void 0,
					d.debug("version check", {
						local : c,
						remote : g
					}),
					g ? e.check(g) : void 0
				}),
				e
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("FlashQueue", ["$log", "$timeout", "util", function (a, b) {
				var c;
				return c = function () {
					function c(a, b) {
						this.showTime = null != a ? a : 5e3,
						this.fadeTime = null != b ? b : 1e3,
						this.queue = [],
						this._state = "invisible",
						this._timeout = null
					}
					return c.prototype.push = function (a) {
						return this.queue.push(a),
						this.animate()
					},
					c.prototype.animate = function () {
						return "invisible" === this._state && this.queue.length > 0 ? (a.debug("flashqueue beginning animation", this.get()), this._state = "visible", this._timeout = b(function (c) {
									return function () {
										return c._state = "fading",
										c._timeout = b(function () {
												return a.debug("flashqueue ending animation", c.get()),
												c._state = "invisible",
												c.queue.shift(),
												c.animate()
											}, c.fadeTime)
									}
								}
									(this), this.showTime)) : void 0
					},
					c.prototype.isVisible = function () {
						return "visible" === this._state
					},
					c.prototype.get = function () {
						return this.queue[0]
					},
					c.prototype.clear = function () {
						return a.debug("flashqueue clearing animation"),
						this.queue.length = 0,
						this._timeout && b.cancel(this._timeout),
						this._state = "invisible"
					},
					c
				}
				()
			}
		]),
	angular.module("swarmApp").factory("flashqueue", ["$log", "FlashQueue", "$rootScope", function (a, b, c) {
				var d;
				return d = new b,
				c.$on("achieve", function (b, c) {
					return a.debug("achievement flashqueue pushing achievement", c),
					d.push(c)
				}),
				d
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("FlashQueueCtrl", ["$scope", "flashqueue", function (a, b) {
				return a.achieveQueue = b
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("AchievementsCtrl", ["$scope", "game", "$location", "$log", function (a, b, c, d) {
				var e,
				f;
				return a.game = b,
				null == (e = b.session.state).achievementsShown && (e.achievementsShown = {
						earned : !0,
						unearned : !0,
						masked : !0,
						order : "default",
						reverse : !1
					}),
				a.form = {
					show : _.clone(b.session.state.achievementsShown)
				},
				f = {
					"default" : function (a) {
						return a.earnedAtMillisElapsed()
					},
					percentComplete : function (a) {
						return a.progressOrder()
					}
				},
				a.order = {
					pred : f[a.form.show.order]
				},
				a.onChangeVisibility = function () {
					return a.order.pred = f[a.form.show.order],
					b.withUnreifiedSave(function () {
						return b.session.state.achievementsShown = _.clone(a.form.show)
					})
				},
				a.state = function (a) {
					return a.isEarned() ? "earned" : a.isUnmasked() ? "unearned" : a.type.points <= 0 ? "hidden" : "masked"
				},
				a.isVisible = function (b) {
					var c;
					return c = a.state(b),
					"earned" === c ? a.form.show.earned : "unearned" === c ? a.form.show.unearned : a.form.show.masked
				},
				a.achieveclick = function (b) {
					return d.debug("achieveclick", b),
					a.$emit("achieveclick", b)
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("Achievement", ["util", "$log", "$rootScope", "$filter", function (a, b, c, d) {
				var e;
				return e = function () {
					function b(a, b) {
						this.game = a,
						this.type = b,
						this.name = this.type.name
					}
					return b.prototype._init = function () {
						var b;
						return null == (b = this.game.session.state).achievements && (b.achievements = {}),
						this.requires = _.map(this.type.requires, function (b) {
								return function (c) {
									return c = _.clone(c),
									c.unittype && (c.resource = c.unit = a.assert(b.game.unit(c.unittype))),
									c.upgradetype && (c.resource = c.upgrade = a.assert(b.game.upgrade(c.upgradetype))),
									a.assert(!(c.unit && c.upgrade), "achievement requirement can't have both unit and upgrade", b.name),
									c
								}
							}
								(this)),
						a.assert(this.requires.length <= 1, "multiple achievement requirements not yet supported", this.name),
						this.visible = _.map(this.type.visible, function (b) {
								return function (c) {
									return c = _.clone(c),
									c.unittype && (c.resource = c.unit = a.assert(b.game.unit(c.unittype))),
									c.upgradetype && (c.resource = c.upgrade = a.assert(b.game.upgrade(c.upgradetype))),
									a.assert(!!c.unit != !!c.upgrade, "achievement visiblity must have unit xor upgrade", b.name),
									c
								}
							}
								(this))
					},
					b.prototype.description = function () {
						var a;
						return a = this.type.description,
						this.type.requires.length > 0 && (this.type.requires[0].unittype || this.type.requires[0].upgradetype) && (a = a.replace("$REQUIRED", d("longnum")(this.type.requires[0].val, void 0, !0))),
						a
					},
					b.prototype.isEarned = function () {
						return null != this.game.session.state.achievements[this.name]
					},
					b.prototype.earn = function (a) {
						return null == a && (a = this.game.elapsedStartMillis()),
						this.isEarned() ? void 0 : (this.game.withUnreifiedSave(function (b) {
								return function () {
									return b.game.session.state.achievements[b.name] = a
								}
							}
								(this)), c.$emit("achieve", this))
					},
					b.prototype.earnedAtMillisElapsed = function () {
						return this.game.session.state.achievements[this.name]
					},
					b.prototype.earnedAtMoment = function () {
						var a;
						return null == this.isEarned() ? void 0 : (a = moment(this.game.session.state.date.started), a.add(this.game.session.state.achievements[this.name], "ms"), a)
					},
					b.prototype.pointsEarned = function () {
						return this.isEarned() ? this.type.points : 0
					},
					b.prototype.isMasked = function () {
						return !this.isUnmasked()
					},
					b.prototype.isUnmasked = function () {
						var a,
						b,
						c,
						d;
						if (0 === this.visible.length)
							return !1;
						for (c = this.visible, a = 0, b = c.length; b > a; a++)
							if (d = c[a], d.resource.count().lessThan(d.val))
								return !1;
						return !0
					},
					b.prototype.hasProgress = function () {
						var a,
						b,
						c,
						d;
						for (c = this.requires, a = 0, b = c.length; b > a; a++)
							if (d = c[a], null != d.resource)
								return !0;
						return !1
					},
					b.prototype.progressMax = function () {
						return null != this.hasProgress() && null != this.requires[0].val ? new Decimal(this.requires[0].val) : void 0
					},
					b.prototype.progressVal = function () {
						var a,
						b;
						return b = this.requires[0],
						null != b.upgrade ? b.upgrade.count() : null != b.unit ? b.unit.unittype.unbuyable ? b.unit.count() : new Decimal(null != (a = b.unit.statistics().twinnum) ? a : 0) : void 0
					},
					b.prototype.progressPercent = function () {
						return null != this.hasProgress() ? this.progressVal().dividedBy(this.progressMax()) : void 0
					},
					b.prototype.progressOrder = function () {
						return this.isEarned() ? 2 : this.isMasked() ? -2 : this.hasProgress() && this.progressMax() > 0 ? this.progressPercent().toNumber() : -1
					},
					b
				}
				()
			}
		]),
	angular.module("swarmApp").factory("AchievementTypes", ["spreadsheetUtil", "util", "$log", function (a, b) {
				var c;
				return c = function () {
					function c() {
						this.list = [],
						this.byName = {}

					}
					return c.prototype.register = function (a) {
						return this.list.push(a),
						this.byName[a.name] = a
					},
					c.prototype.pointsPossible = function () {
						return b.sum(_.map(this.list, function (a) {
								return a.points
							}))
					},
					c.parseSpreadsheet = function (d, e, f) {
						var g,
						h,
						i,
						j,
						k,
						l,
						m,
						n;
						for (n = a.parseRows({
									name : ["requires", "visible"]
								}, d.data.achievements.elements), l = new c, g = 0, i = n.length; i > g; g++)
							m = n[g], l.register(m);
						for (k = l.list, h = 0, j = k.length; j > h; h++)
							m = k[h], a.resolveList(m.requires, "unittype", e.byName, {
								required : !1
							}), a.resolveList(m.requires, "upgradetype", f.byName, {
								required : !1
							}), a.resolveList(m.visible, "unittype", e.byName, {
								required : !1
							}), a.resolveList(m.visible, "upgradetype", f.byName, {
								required : !1
							}), b.assert(m.points >= 0, "achievement must have points", m.name, m), b.assert(_.isNumber(m.points), "achievement points must be number", m.name, m);
						return l
					},
					c
				}
				()
			}
		]),
	angular.module("swarmApp").factory("AchievementsListener", ["util", "$log", function (a, b) {
				var c;
				return c = function () {
					function a(a, b) {
						this.game = a,
						this.scope = b,
						this._listen(this.scope)
					}
					return a.prototype.achieveUnit = function (a, c) {
						var d,
						e,
						f,
						g,
						h,
						i,
						j;
						for (null == c && (c = !1), h = this.game.achievementlist(), j = [], f = 0, g = h.length; g > f; f++)
							d = h[f], j.push(function () {
								var f,
								g,
								h,
								j,
								k;
								for (h = d.requires, k = [], f = 0, g = h.length; g > f; f++)
									i = h[f], !i.event && i.unit && i.val && i.unit.name === a ? (c ? e = i.unit.count() : (e = null != (j = i.unit.statistics().twinnum) ? j : 0, e = new Decimal(e)), b.debug("achievement check: unitcount after command", i.unit.name, e, null != e && e >= i.val), null != e && e.greaterThanOrEqualTo(i.val) ? (b.debug("earned", d.name, d), k.push(d.earn())) : k.push(void 0)) : k.push(void 0);
								return k
							}
								());
						return j
					},
					a.prototype.achieveUpgrade = function () {
						var a,
						c,
						d,
						e,
						f,
						g,
						h;
						for (f = this.game.achievementlist(), h = [], d = 0, e = f.length; e > d; d++)
							a = f[d], h.push(function () {
								var d,
								e,
								f,
								h;
								for (f = a.requires, h = [], d = 0, e = f.length; e > d; d++)
									g = f[d], !g.event && g.upgrade && g.val ? (c = g.upgrade.count(), b.debug("achievement check: upgradecount after command", g.upgrade.name, c, null != c && c >= g.val), null != c && c.greaterThanOrEqualTo(g.val) ? (b.debug("earned", a.name, a), h.push(a.earn())) : h.push(void 0)) : h.push(void 0);
								return h
							}
								());
						return h
					},
					a.prototype._listen = function (a) {
						var c,
						d,
						e,
						f,
						g;
						for (this.scope = a, g = this.game.achievementlist(), d = function (a) {
							return function (c) {
								var d,
								e,
								f,
								g,
								h;
								for (f = c.requires, h = [], d = 0, e = f.length; e > d; d++)
									g = f[d], h.push(g.event && !g.unit ? function (d) {
										var e;
										return d.val && (d.val = JSON.parse(d.val), b.debug("parse event-achievement json", d.event, d.val)),
										e = a.scope.$on(d.event, function (a, e) {
												var f,
												g;
												return b.debug("achieve listen", d.event, e, d.val),
												!d.val || (g = _.pick(e, _.keys(d.val)), f = _.isEqual(g, d.val), b.debug("validate", d.event, d.val, g, f), f) ? c.earn() : void 0
											})
									}
										(g) : void 0);
									return h
								}
							}
								(this), e = 0, f = g.length; f > e; e++)c = g[e], d(c);
						return this.scope.$on("command", function (a) {
							return function (c, d) {
								return b.debug("checking achievements for command", d),
								null != d.unitname && a.achieveUnit(d.unitname),
								null != d.upgradename && a.achieveUpgrade(d.upgradename),
								"ascension" === d.name ? (b.debug("ascending!", a.game.unit("ascension").count()), a.achieveUnit("ascension", !0)) : void 0
							}
						}
							(this))
					},
					a
				}
				()
			}
		]),
	angular.module("swarmApp").factory("achievementslistener", ["AchievementsListener", "game", "$rootScope", function (a, b, c) {
				return new a(b, c)
			}
		]),
	angular.module("swarmApp").factory("achievements", ["AchievementTypes", "unittypes", "upgradetypes", "spreadsheet", function (a, b, c, d) {
				return a.parseSpreadsheet(d, b, c)
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").filter("encodeURIComponent", function () {
		return function (a) {
			return window.encodeURIComponent(a)
		}
	}),
	angular.module("swarmApp").directive("cost", ["$log", function () {
				return {
					restrict : "E",
					scope : {
						costlist : "=",
						num : "=?",
						buybuttons : "=?",
						noperiod : "=?"
					},
					template : '<span ng-repeat="cost in costlist track by cost.unit.name">\n  <span ng-if="!$first && $last"> and </span>\n  <a ng-if="isRemainingBuyable(cost)" ng-href="#{{cost.unit.url()}}?num={{\'@\'+totalCostVal(cost)|encodeURIComponent}}">\n    {{totalCostVal(cost) | bignum}} {{totalCostVal(cost) == 1 ? cost.unit.unittype.label : cost.unit.unittype.plural}}<!--whitespace\n  --></a><span ng-if="!isRemainingBuyable(cost)" ng-class="{costNotMet:!isCostMet(cost)}">\n    {{totalCostVal(cost) | bignum}} {{totalCostVal(cost) == 1 ? cost.unit.unittype.label : cost.unit.unittype.plural}}<!--whitespace\n  --></span><span ng-if="$last && !noperiod">.</span><span ng-if="!$last && costlist.length > 2">, </span>\n</span>',
					link : function (a) {
						return null == a.num && (a.num = 1),
						a.totalCostVal = function (b) {
							return b.val.times(a.num + "")
						},
						a.isCostMet = function (b) {
							return b.unit.count().greaterThanOrEqualTo(a.totalCostVal(b))
						},
						a.countRemaining = function (b) {
							return a.totalCostVal(b).minus(b.unit.count()).ceil()
						},
						a.isRemainingBuyable = function (b) {
							var c;
							return c = a.countRemaining(b),
							c.greaterThan(0) && b.unit.isBuyable(!0) && b.unit.isBuyButtonVisible()
						}
					}
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("MainCtrl", ["$scope", "$log", "game", "$routeParams", "$location", "version", "options", function (a, b, c, d, e, f, g) {
				var h,
				i,
				j,
				k,
				l,
				m,
				n,
				o;
				return a.game = c,
				a.options = g,
				a.cur = {},
				a.cur.unit = a.game.unitBySlug(d.unit),
				a.cur.tab = null != (i = null != (j = a.game.tabs.byName[d.tab]) ? j : null != (k = a.cur.unit) ? k.tab : void 0) ? i : a.game.tabs.list[0],
				a.cur.tab.lastselected = a.cur.unit,
				(d.tab !== a.cur.tab.name && null != d.tab || !a.cur.tab.isVisible()) && e.url("/"),
				null == d.unit || null != a.cur.unit && a.cur.unit.unittype.slug === d.unit && null != a.cur.tab.indexByUnitName[a.cur.unit.name] && a.cur.unit.isVisible() || (b.debug("invalid unit", d.unit, a.cur.unit, null == a.cur.unit, (null != (l = a.cur.unit) && null != (m = l.unittype) ? m.slug : void 0) !== d.unit, null == a.cur.tab.indexByUnitName[null != (n = a.cur.unit) ? n.name : void 0], !(null != (o = a.cur.unit) && "function" == typeof o.isVisible ? o.isVisible() : void 0)), e.url(a.cur.tab.url(!1))),
				b.debug("tab", a.cur),
				a.click = function (b) {
					return e.url(a.cur.tab.url(b))
				},
				a.filterVisible = function (a) {
					return a.isVisible()
				},
				h = function (b, d) {
					var e;
					return b += d + c.tabs.list.length,
					b %= c.tabs.list.length,
					e = c.tabs.list[b],
					e === a.cur.tab ? null : e.isVisible() ? e : h(b, d)
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("Tab", function () {
		var a;
		return a = function () {
			function a(a, b, c) {
				this.leadunit = a,
				this.index = b,
				this.name = null != c ? c : this.leadunit.name,
				this.units = [],
				this.sortedUnits = [],
				this.indexByUnitName = {},
				this.push(this.leadunit)
			}
			return a.prototype.push = function (a) {
				return this.indexByUnitName[a.name] = this.units.length,
				this.units.push(a),
				this.sortedUnits.unshift(a)
			},
			a.prototype.next = function (a) {
				var b,
				c;
				return b = this.indexByUnitName[null != (c = null != a ? a.name : void 0) ? c : a],
				this.units[b + 1]
			},
			a.prototype.prev = function (a) {
				var b,
				c;
				return b = this.indexByUnitName[null != (c = null != a ? a.name : void 0) ? c : a],
				this.units[b - 1]
			},
			a.prototype.isVisible = function () {
				return this.leadunit.isVisible()
			},
			a.prototype.isNewlyUpgradable = function () {
				return _.some(this.units, function (a) {
					return a.isVisible() && a.isNewlyUpgradable()
				})
			},
			a.prototype.sortUnits = function () {
				return "all" === this.name ? this.sortedUnits : _.sortBy(this.sortedUnits, function (a) {
					return -1 * a.stat("empower", 0)
				})
			},
			a.buildTabs = function (b) {
				var c,
				d,
				e,
				f,
				g,
				h;
				for (f = {
						list : [],
						byName : {},
						byUnit : {}

					}, c = null, d = 0, e = b.length; e > d; d++)
					h = b[d], h.unittype.tab && !h.unittype.disabled && (g = f.byName[h.unittype.tab], null != g ? g.push(h) : (g = f.byName[h.unittype.tab] = new a(h, f.list.length), f.list.push(g)), f.byUnit[h.name] = g, c ? c.push(h) : c = f.byName.all = new a(h, 1, "all"));
				return c.sortedUnits.reverse(),
				f
			},
			a.prototype.url = function (a) {
				var b;
				return null == a && (a = this.lastselected),
				b = a ? "/unit/" + a.unittype.slug : "",
				"/tab/" + this.name + b
			},
			a
		}
		()
	})
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").directive("buyunit", ["$log", "game", "commands", function (a, b, c) {
				return {
					templateUrl : "views/buyunit.html",
					scope : {
						num : "=?",
						fixednum : "=?",
						unit : "="
					},
					restrict : "E",
					link : function (d) {
						var e,
						f,
						g;
						return d.commands = c,
						d.is25Visible = function () {
							var a;
							return a = d.resource.maxCostMet(.25),
							d.resource.maxCostMet().greaterThan(a) && a.greaterThan(1)
						},
						d.fullnum = function () {
							var a,
							b,
							c;
							return null != d.fixednum ? a = new Decimal(d.fixednum + "").dividedBy(d.unit.twinMult()) : (b = null != (c = d.num) ? c : 1, b = Decimal.max(1, Decimal.min(d.resource.maxCostMet(), new Decimal(b + "").floor())), b.isNaN() && (b = Decimal.ONE), b)
						},
						d.unit = d.resource = b.unit(d.unit),
						a.debug("buyunit", d.resource),
						d.buyResource = function (a) {
							return a.unit = a.resource,
							delete a.resource,
							c.buyUnit(a)
						},
						d.buyMaxResource = function (a) {
							return a.unit = a.resource,
							delete a.resource,
							c.buyMaxUnit(a)
						},
						d.statTwin = function () {
							return d.resource.twinMult()
						},
						d.isBuyButtonVisible = function () {
							return d.resource.isBuyButtonVisible()
						},
						d.verb = null != (e = null != (f = d.unit) && null != (g = f.type) ? g.verb : void 0) ? e : "buy"
					}
				}
			}
		]),
	angular.module("swarmApp").directive("buyupgrade", ["$log", "game", "commands", function (a, b, c) {
				return {
					templateUrl : "views/buyunit.html",
					scope : {
						num : "=?",
						upgrade : "="
					},
					restrict : "E",
					link : function (d) {
						return d.commands = c,
						d.is25Visible = function () {
							var a;
							return a = d.resource.maxCostMet(.25),
							d.resource.maxCostMet().greaterThan(a) && a.greaterThan(1)
						},
						d.fullnum = function () {
							var a,
							b;
							return a = null != (b = d.num) ? b : 1,
							a = Decimal.max(1, Decimal.min(d.resource.maxCostMet(), new Decimal(a + "").floor())),
							a.isNaN() && (a = Decimal.ONE),
							a
						},
						d.upgrade = d.resource = b.upgrade(d.upgrade),
						a.debug("buyupgrade", d.resource),
						d.buyResource = function (a) {
							return a.upgrade = a.resource,
							delete a.resource,
							c.buyUpgrade(a)
						},
						d.buyMaxResource = function (a) {
							return a.upgrade = a.resource,
							delete a.resource,
							c.buyMaxUpgrade(a)
						},
						d.statTwin = function () {
							return Decimal.ONE
						},
						d.isBuyButtonVisible = function () {
							return !0
						},
						d.verb = "ability" === d.upgrade.type["class"] ? "cast" : "buy"
					}
				}
			}
		]),
	angular.module("swarmApp").directive("buyunitdropdown", ["$log", "game", "commands", function (a, b, c) {
				return {
					templateUrl : "views/buyunit-dropdown.html",
					scope : {
						num : "=?",
						unit : "="
					},
					restrict : "E",
					transclude : !0,
					link : function (d) {
						return d.commands = c,
						d.is25Visible = function (a) {
							var b;
							return null == a && (a = d.unit),
							b = a.maxCostMet(.25),
							a.maxCostMet().greaterThan(b) && b.greaterThan(1)
						},
						d.fullnum = function () {
							var a,
							b;
							return a = null != (b = d.num) ? b : 1,
							a = Decimal.max(1, Decimal.min(d.unit.maxCostMet(), new Decimal(a + "").floor())),
							a.isNaN() && (a = Decimal.ONE),
							a
						},
						d.filterVisible = function (a) {
							return a.isVisible()
						},
						d.unit = b.unit(d.unit),
						a.debug("buyunit", d.unit),
						d.buyUnit = function (a) {
							return c.buyUnit(a)
						},
						d.buyMaxUnit = function (a) {
							return c.buyMaxUnit(a)
						},
						d.buyUpgrade = function (a) {
							return c.buyUpgrade(a)
						},
						d.buyMaxUpgrade = function (a) {
							return c.buyMaxUpgrade(a)
						},
						d.statTwin = function () {
							return d.unit.twinMult()
						},
						d.isBuyButtonVisible = function () {
							return d.unit.isBuyButtonVisible()
						}
					}
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").directive("tabs", ["game", "util", "options", "version", "commands", function (a, b, c, d, e) {
				return {
					templateUrl : "views/tabs.html",
					scope : {
						cur : "="
					},
					restrict : "E",
					link : function (d) {
						return d.tabs = a.tabs,
						d.options = c,
						d.game = a,
						d.filterVisible = function (a) {
							return a.isVisible()
						},
						d.buyUpgrades = function (a, b) {
							return null == b && (b = 1),
							a.length > 0 ? e.buyAllUpgrades({
								upgrades : a,
								percent : b
							}) : void 0
						},
						b.animateController(d, {
							game : a,
							options : c
						}),
						d.undo = function () {
							return d.isUndoable() ? e.undo() : void 0
						},
						d.secondsSinceLastAction = function () {
							var b,
							c,
							d;
							return (a.now.getTime() - (null != (b = null != (c = e._undo) && null != (d = c.date) && "function" == typeof d.getTime ? d.getTime() : void 0) ? b : 0)) / 1e3
						},
						d.undoLimitSeconds = 30,
						d.isRedo = function () {
							var a;
							return null != (a = e._undo) ? a.isRedo : void 0
						},
						d.isUndoable = function () {
							return d.secondsSinceLastAction() < d.undoLimitSeconds && !d.isRedo()
						}
					}
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").directive("tutorial", ["game", function (a) {
				return {
					template : '<div ng-if="tutStep() > 0" class="alert animif alert-info" role="alert">\n  <button ng-if="showCloseButton()" type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n\n  <div ng-if="tutStep() == 1">\n    <p>Welcome to Swarm Simulator. Starting with just a few larvae and a small pile of meat, grow a massive swarm of giant bugs.</p>\n    <p>Your brood starts its life with a small pile of meat and a single larva-producing hatchery. Larvae mutate into other units. Begin your growth by using your meat and larvae to hatch some <a href="#/unit/drone">drones</a>.</p>\n  </div>\n  <p ng-if="tutStep() == 2">You lead a small brood of worker drones. Drones gather meat. Use this meat to build more drones and expand your brood.</p>\n  <p ng-if="tutStep() == 3">You lead a small brood of worker drones. Once you have plenty of meat, upgrade your hatchery to produce more larvae by selecting \'<a href="#/unit/larva">larvae</a>\' and spending some meat.</p>\n  <p ng-if="tutStep() == 11">A <span class="glyphicon glyphicon-circle-arrow-up"></span> appears when you have enough meat to upgrade your hatchery.</p>\n  <p ng-if="tutStep() == 4">You lead a small brood of worker drones. They long for a <a href="#/unit/queen">queen</a>. You must sacrifice many drones to hatch a queen, but once born, your queen will slowly hatch drones without consuming meat or larvae.</p>\n  <p ng-if="tutStep() == 5">Hatch more queens to grow your swarm. Hatching drones with the "Twin Drones" upgrade will allow you to rapidly raise more queens.</p>\n  <p ng-if="tutStep() == 6">Queens have rapidly grown your swarm, and your growth demands more <a href="#/unit/territory">territory</a>. Begin capturing <a href="#/unit/territory">territory</a> by building military units - swarmlings or stingers.</p>\n  <p ng-if="tutStep() == 7">Your warriors have slowly begun securing territory. Continue expanding your military.</p>\n  <p ng-if="tutStep() == 8">Your warriors have captured a lot of territory, and soon you can secure your first expansion. Expansions increase larva production. Select \'<a href="#/unit/larva">larvae</a>\' to expand.</p>\n  <p ng-if="tutStep() == 9">Expansion is the key to growing your swarm rapidly. Build a large military to expand your territory and produce more larvae. Build more queens and, eventually, nests to produce more meat for your military.</p>\n\n  <p ng-if="tutStep() == 10">Your swarm has grown large enough to <b>ascend</b> - gain even greater power and restart on a new world! Take a look at the <a href="#/unit/mutagen">mutagen tab</a>.</p>\n  <p ng-if="tutStep() == 100">Congratulations on your first ascension! Mutations can make your swarm much more powerful. Mutagen you haven\'t spent yet will produce some larvae - don\'t spend it all right away!</p>\n</div>',
					scope : {
						game : "=?"
					},
					restrict : "E",
					link : function (b) {
						var c,
						d;
						return c = null != (d = b.game) ? d : a,
						b.showCloseButton = function () {
							return 10 === b.tutStep() || 100 === b.tutStep()
						},
						b.tutStep = function () {
							var b;
							return null != (b = a.cache).tutorialStep ? b.tutorialStep : b.tutorialStep = function () {
								return function () {
									var a,
									b;
									if (a = c.countUnits(), b = c.countUpgrades(), !a.ascension.isZero())
										return c.cache.firstSpawn.ascension ? 100 : 0;
									if (c.cache.firstSpawn.premutagen && a.ascension.isZero())
										return 10;
									if (b.expansion.greaterThanOrEqualTo(5))
										return 0;
									if (b.expansion.greaterThan(0))
										return 9;
									if (b.hatchery.greaterThan(0)) {
										if (a.queen.greaterThanOrEqualTo(5))
											return a.territory.greaterThan(5) ? 8 : a.territory.greaterThan(0) ? 7 : 6;
										if (a.queen.greaterThan(0))
											return 5
									}
									return a.drone.greaterThanOrEqualTo(10) ? b.hatchery.greaterThan(0) ? 4 : a.meat.greaterThanOrEqualTo(300) ? 11 : 3 : a.drone.greaterThan(0) ? 2 : 1
								}
							}
							(this)()
						}
					}
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").directive("unit", ["$log", "game", "commands", "options", "util", "$location", "parseNumber", function (a, b, c, d, e, f, g) {
				return {
					templateUrl : "views/directive-unit.html",
					restrict : "E",
					scope : {
						cur : "="
					},
					link : function (a) {
						var e,
						h,
						i,
						j,
						k,
						l,
						m,
						n,
						o,
						p,
						q,
						r;
						for (a.game = b, a.commands = c, a.options = d, h = function () {}, a.estimateUpgradeSecs = function (a) {
							var b,
							c,
							d,
							e,
							f;
							return b = a.estimateSecsUntilBuyable(),
							f = b.val.toNumber(),
							isFinite(f) ? (e = moment.duration(f, "seconds"), e.nonexact = !(null != (c = null != (d = b.unit) && "function" == typeof d.isEstimateExact ? d.isEstimateExact() : void 0) ? c : !0), e) : 1 / 0
						}, a.form = {
								buyCount : ""
							}, q = f.search(), null != q.num ? a.form.buyCount = q.num : null != q.twinnum && (a.form.buyCount = "=" + q.twinnum), e = Decimal.ONE, a.buyCount = function () {
							var b,
							c;
							return b = null != (c = g(a.form.buyCount || "1", a.cur)) ? c : Decimal.ONE,
							b.equals(e) || (e = b),
							e
						}, a.filterVisible = function (a) {
							return a.isVisible()
						}, a.watched = {}, n = null != (m = a.cur.upgrades.byClass.upgrade) ? m : [], i = 0, k = n.length; k > i; i++)
							r = n[i], a.watched[r.name] = r.watchedAt();
						for (p = null != (o = a.cur.upgrades.byClass.ability) ? o : [], j = 0, l = p.length; l > j; j++)
							r = p[j], a.watched[r.name] = !r.isManuallyHidden();
						return a.updateWatched = function (b) {
							return b.watch(a.watched[b.name])
						},
						a.updateWatchedAbility = function (b) {
							return b.watch(a.watched[b.name] ? 0 : -1)
						},
						a.unitCostAsPercent = function (a, b) {
							var c,
							d,
							e;
							return c = new Decimal(9999.99),
							d = b.unit.count(),
							d.lessThanOrEqualTo(0) ? c : (e = Decimal.max(1, a.maxCostMet()), Decimal.min(c, b.val.times(e).dividedBy(d)))
						},
						a.unitCostAsPercentOfVelocity = function (a, b) {
							var c,
							d;
							return c = new Decimal(9999.99),
							d = b.unit.velocity(),
							d.lessThanOrEqualTo(0) ? c : Decimal.min(c, b.val.times(a.maxCostMetOfVelocity()).dividedBy(d));

						},
						a.description = function (b, c) {
							return null == c && (c = b.descriptionFn),
							c(a)
						}
					}
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").directive("unitdesc", ["game", "commands", "options", function (a, b, c) {
				return {
					template : '<p ng-if="templateUrl" ng-include="templateUrl" class="desc desc-unit desc-template desc-{{unit.name}}"></p><p ng-if="!templateUrl" class="desc desc-unit desc-text desc-{{unit.name}}">{{desc}}</p>',
					scope : {
						unit : "=",
						game : "=?"
					},
					restrict : "E",
					link : function (d) {
						return null == d.game && (d.game = a),
						d.commands = b,
						d.options = c,
						d.desc = d.unit.unittype.description,
						d.templateUrl = function () {
							return "-" !== d.desc && d.desc ? "" : "views/desc/unit/" + d.unit.name + ".html"
						}
						()
					}
				}
			}
		]),
	angular.module("swarmApp").directive("upgradedesc", ["game", "commands", "options", function (a, b, c) {
				return {
					template : '<p ng-if="templateUrl" ng-include="templateUrl" desc desc-upgrade desc-template desc-{{upgrade.name}}"></p><p ng-if="!templateUrl" class="desc desc-upgrade desc-text desc-{{upgrade.name}}">{{desc}}</p>',
					scope : {
						upgrade : "=",
						game : "=?"
					},
					restrict : "E",
					link : function (d) {
						return null == d.game && (d.game = a),
						d.commands = b,
						d.options = c,
						d.desc = d.upgrade.type.description,
						d.templateUrl = function () {
							return "-" !== d.desc && d.desc ? "" : "views/desc/upgrade/" + d.upgrade.name + ".html"
						}
						()
					}
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("LoadSaveCtrl", ["$scope", "$log", "game", "session", "version", "$location", "backfill", "isKongregate", "storage", "saveId", function (a, b, c, d, e, f, g, h, i, j) {
				var k,
				l,
				m;
				a.form = {},
				a.isKongregate = h,
				a.select = function (a) {
					return a.target.select()
				},
				a.contactUrl = function () {
					return "#/contact?" + $.param({
						error : a.form.error
					})
				};
				try {
					l = d.getStoredSaveData()
				} catch (n) {
					return k = n,
					b.error("couldn't even read localstorage! oh no!", k),
					c.reset(!0),
					a.form.errored = !0,
					a.form.error = k.message,
					a.form.domain = window.location.host,
					void a.$emit("loadGameFromStorageFailed", k.message)
				}
				try {
					d.load(),
					b.debug("Game data loaded successfully.", this)
				} catch (n) {
					k = n,
					l ? (b.warn("Failed to load non-empty saved data! Oh no!"), c.reset(!0), a.form.errored = !0, a.form.error = k.message, a.form["export"] = l, a.$emit("loadGameFromStorageFailed", k.message)) : (b.debug("Empty saved data; probably the user's first visit here. Resetting quietly."), c.reset(!0), i.flash.onReady.then(function () {
							var d;
							return d = i.flash.getItem(j),
							d ? (b.debug("flash loaded successfully, and found a saved game there that wasn't in cookies/localstorage! importing."), a.$root.$broadcast("savedGameRecoveredFromFlash", k.message), c.importSave(d, !0)) : b.debug("flash loaded successfully, but no saved game found. this is truly a new visitor.")
						}))
				}
				return null != (m = f.search().savedata) && (b.info("loading game from url..."), c.importSave(m, !0), b.info("loading game from url successful!")),
				g.run(c)
			}
		]),
	angular.module("swarmApp").controller("AprilFoolsCtrl", ["$scope", "options", function (a, b) {
				return a.options = b
			}
		]),
	angular.module("swarmApp").controller("WelcomeBackCtrl", ["$scope", "$log", "$interval", "game", "$location", function (a, b, c, d, e) {
				var f,
				g;
				return f = null,
				a.$on("import", function (a, c) {
					return b.debug("welcome back: import", null != c ? c.success : void 0, c),
					(null != c ? c.success : void 0) ? g(!0, !0) : void 0
				}),
				a.$on("savedGameRecoveredFromFlash", function () {
					return b.debug("welcome back: saved game recovered from flash"),
					g()
				}),
				a.$on("reset", function () {
					return null != ("function" == typeof a.closeWelcomeBack ? a.closeWelcomeBack() : void 0)
				}),
				(g = function (g, h) {
					var i,
					j,
					k,
					l,
					m,
					n,
					o,
					p,
					q;
					if (a.durationSinceClosed = d.session.durationSinceClosed(void 0, h), a.showWelcomeBack = a.durationSinceClosed.asMinutes() >= 3 || e.search().forcewelcome, o = (d.session.dateClosed(h).getTime() - d.session.state.date.reified.getTime()) / 1e3, b.debug("time since game closed", a.durationSinceClosed.humanize(), {
							millis : d.session.millisSinceClosed(void 0, h),
							reifiedToCloseDiffInSecs : o
						}), $(window).unload(function () {
							return d.session.onClose()
						}), null == f && (f = c(function () {
									return d.session.onHeartbeat()
								}, 6e4)), d.session.onHeartbeat(), !a.showWelcomeBack)
						return void b.debug("skipping welcome back screen: offline time too short", a.durationSinceClosed.asMinutes());
					for (a.closeWelcomeBack = function () {
						return b.debug("closeWelcomeBack"),
						void $("#welcomeback").alert("close")
					}, k = [], l = 0, n = d.tabs.byName.meat.sortedUnits, j = 0, m = n.length; m > j && (q = n[j], !(l >= 3)); j++)
						q.velocity().isZero() || (l += 1, k.push(q));
					return k = k.concat(_.map(d.tabs.list, "leadunit")),
					p = {},
					a.offlineGains = _.map(k, function (a) {
							var b,
							c,
							d;
							return !p[a.name] && (p[a.name] = !0, d = a.count(), b = a._countInSecsFromReified(o), c = d.minus(b), c.greaterThan(0)) ? {
								unit : a,
								val : c
							}
							 : void 0
						}),
					a.offlineGains = function () {
						var b,
						c,
						d,
						e;
						for (d = a.offlineGains, e = [], b = 0, c = d.length; c > b; b++)
							i = d[b], i && e.push(i);
						return e
					}
					()
				})(!1, !1)
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("favico", ["game", "env", "$rootScope", "$log", function (a, b, c, d) {
				var e,
				f,
				g;
				return g = null != window.Favico ? new(e = function () {
						function b() {
							this.instance = new Favico({
									animation : "none"
								}),
							this.lastcount = 0
						}
						return b.prototype.update = function () {
							var b,
							c;
							return c = a.getNewlyUpgradableUnits(),
							b = c.length,
							b !== this.lastcount && (d.debug("favicon update", {
									stale : this.lastcount,
									fresh : b,
									units : c
								}), b > 0 ? this.instance.badge(b) : this.instance.reset()),
							this.lastcount = b
						},
						b
					}
						()) : new(f = function () {
						function a() {}

						return a.prototype.update = function () {},
						a
					}
						()),
				c.$on("tick", function () {
					return g.update()
				}),
				g
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").directive("debugdd", ["env", "game", "util", function () {
				return {
					scope : {
						label : "=",
						min : "=?",
						max : "=?",
						value : "="
					},
					restrict : "E",
					template : '<dt ng-class="{envalert:value < min || value > max}">{{label}}</dt>\n<dd ng-class="{envalert:value < min || value > max}">{{value|number}}</dt>'
				}
			}
		]),
	angular.module("swarmApp").directive("debug", ["env", "game", "util", "$location", function (a, b, c, d) {
				return {
					template : '<div ng-cloak ng-if="env.isDebugEnabled" class="container well">\n  <p class="small pull-right">{{heights()}}</p>\n  <p class="envalert">Debug</p>\n  <div class="row">\n    <div class="col-md-8">\n      <div>\n        Set count:\n        <select tabindex="1" ng-options="u as u.type.label for u in game.resourcelist()" ng-model="form.resource" ng-change="selectResource()">\n          <option value="">-- select unit --</option>\n        </selected>\n        <input tabindex="2" type="text" ng-model="form.count" ng-change="setResource()">\n        <code>{{form.count|longnum}}</code>\n        <button ng-click="game.save()">save</button>\n      </div>\n      <div>\n        export <input tabindex="3" ng-model="form.export" onclick="this.select()">\n        import <input tabindex="4" ng-model="form.import" ng-change="game.importSave(form.import);form.import=\'\'">\n        <button tabindex="5" class="resetalert" ng-click="confirmReset()">\n          <span class="glyphicon glyphicon-warning-sign"></span>\n          Wipe all saved data and start over\n        </button>\n      </div>\n      <p>export age: {{now().getTime() - form.exportAge.getTime()}}</p>\n      <div>\n        Skip time:\n        <button ng-click="game.skipTime(1, \'minute\')">1 minute</button>\n        <button ng-click="game.skipTime(5, \'minute\')">5 minutes</button>\n        <button ng-click="game.skipTime(15, \'minute\')">15 minutes</button>\n        <button ng-click="game.skipTime(1, \'hour\')">1 hour</button>\n        <button ng-click="game.skipTime(4, \'hour\')">4 hour</button>\n        <button ng-click="game.skipTime(8, \'hour\')">8 hour</button>\n        <button ng-click="game.skipTime(24, \'hour\')">24 hour</button>\n      </div>\n      <div>\n        Game speed: {{game.gameSpeed | number}}x\n        <button ng-click="game.setGameSpeed(1)">1x: Normal</button>\n        <button ng-click="game.setGameSpeed(0)">0x: Pause</button>\n        <button ng-click="game.setGameSpeed(1.5)">1.5x</button>\n        <button ng-click="game.setGameSpeed(2)">2x</button>\n        <button ng-click="game.setGameSpeed(4)">4x</button>\n        <button ng-click="game.setGameSpeed(10)">10x</button>\n        <button ng-click="game.setGameSpeed(60)">60x</button>\n        <button ng-click="game.setGameSpeed(100)">100x</button>\n        <button ng-click="game.setGameSpeed(1000)">1000x</button>\n        <button ng-click="game.setGameSpeed(3600)">3600x</button>\n      </div>\n      <p title="{{game.dateStarted().toString()}}">You started playing {{game.momentStarted().fromNow()}}<span ng-if="game.totalSkippedMillis() > 0"> (skipped an extra {{game.totalSkippedDuration().humanize()}})</span>.</p>\n    </div>\n    <dl class="dl-horizontal col-md-4">\n      <debugdd label="\'performance.memory.usedJSHeapSize\'" value="mem()" max="100000000"></debugdd>\n    </dl>\n  </div>\n</div>',
					restrict : "E",
					link : function (e) {
						return e.env = a,
						e.game = b,
						e.util = c,
						e.heights = function () {
							return {
								"htmlheight()" : $(document.documentElement).height(),
								"bodyheight()" : $(document.body).height()
							}
						},
						e.form = {},
						e["export"] = function () {
							return e.form["export"] = e.game.session.exportSave(),
							e.form.exportAge = new Date
						},
						e.now = function () {
							return e.game.now
						},
						e["export"](),
						e.selectResource = function () {
							return e.form.count = e.form.resource.count()
						},
						e.setResource = function () {
							return e.game.withSave(function () {
								var a,
								c,
								d,
								f,
								g,
								h;
								if (e.form.resource._setCount(e.form.count), "nexus" === e.form.resource.name) {
									for (f = b.upgradelist(), g = [], a = 0, c = f.length; c > a; a++)
										h = f[a], "nexus" === h.name.substring(0, 5) ? (d = parseInt(h.name[5]), g.push(e.form.count >= d ? h._setCount(1) : void 0)) : g.push(void 0);
									return g
								}
							}),
							e["export"]()
						},
						e.confirmReset = function () {
							return confirm("really?") ? (e.game.reset(!0), d.url("/")) : void 0
						},
						e.mem = function () {
							var a;
							return "undefined" != typeof performance && null !== performance && null != (a = performance.memory) ? a.usedJSHeapSize : void 0
						}
					}
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("isKongregate", function () {
		return function () {
			return _.contains(window.location.search, "kongregate")
		}
	}),
	angular.module("swarmApp").factory("Kongregate", ["isKongregate", "$log", "$location", "game", "$rootScope", "$interval", "options", "$q", "loginApi", "env", function (a, b, c, d, e, f, g, h, i, j) {
				var k;
				return k = function () {
					function c() {}

					return c.prototype.isKongregate = function () {
						return a()
					},
					c.prototype.load = function () {
						var a,
						c;
						b.debug("loading kongregate script..."),
						c = h.defer(),
						this.onLoad = c.promise,
						this.onLoad.then(function (a) {
							return function () {
								return a._onLoad()
							}
						}
							(this));
						try {
							this.kongregate = window.parent.kongregate,
							this.parented = window.parent.document.getElementsByTagName("iframe")[0]
						} catch (d) {
							a = d
						}
						return this.kongregate ? (b.debug("kongregate api loaded from parent frame"), void c.resolve()) : $.getScript("https://cdn1.kongregate.com/javascripts/kongregate_api.js").done(function (a) {
							return function () {
								return b.debug("kongregate script loaded, now trying to load api", window.kongregateAPI),
								window.kongregateAPI.loadAPI(function () {
									return b.debug("kongregate api loaded"),
									a.kongregate = window.kongregateAPI.getAPI(),
									c.resolve()
								})
							}
						}
							(this)).fail(function () {
							return function (a, d, e) {
								return b.error("kongregate load failed", a, d, e),
								c.reject()
							}
						}
							(this))
					},
					c.prototype.onResize = function () {},
					c.prototype._onResize = function () {},
					c.prototype._resizeGame = function (a, b) {
						return this.kongregate.services.resizeGame(Math.max(g.iframeMinX(), null != a ? a : 0), Math.max(g.iframeMinY(), null != b ? b : 0)),
						this.parented ? (b = this.parented.style.height, a = this.parented.style.width, this.parented.style.height = "100%", this.parented.style.width = "100%", document.documentElement.style.height = b, document.documentElement.style.width = a) : void 0
					},
					c.prototype.onScrollOptionChange = function (a, c) {
						var d;
						return d = g.scrolling(),
						b.debug("updating kong scroll option", d),
						"resize" === d ? (document.body.style.overflow = "hidden", this.onResize = this._onResize, this.onResize(!0)) : (document.body.style.overflow = "", this.onResize = function () {}),
						"lockhover" === d ? this.bindLockhover() : this.unbindLockhover(),
						"resize" !== d && "resize" === c && this.isLoaded && !a ? this._resizeGame(null, null) : void 0
					},
					c.prototype.unbindLockhover = function () {
						return $("html").off("DOMMouseScroll mousewheel")
					},
					c.prototype.bindLockhover = function () {
						var a,
						b;
						return b = $("body")[0],
						a = $("body,html"),
						$("html").on("DOMMouseScroll mousewheel", function (c) {
							var d,
							e,
							f,
							g,
							h,
							i,
							j;
							return d = $(this),
							i = this.scrollTop || b.scrollTop,
							h = this.scrollHeight,
							f = window.innerHeight,
							e = "DOMMouseScroll" === c.type ? -40 * c.originalEvent.detail : c.originalEvent.wheelDelta,
							j = e > 0,
							g = function () {
								return c.stopPropagation(),
								c.preventDefault(),
								c.returnValue = !1,
								!1
							},
							!j && -e > h - f - i ? (a.scrollTop(h), g()) : j && e > i ? (a.scrollTop(0), g()) : void 0
						})
					},
					c.prototype._swarmApiLogin = function () {
						var a;
						if (j.isServerBackendEnabled)
							return a = function (a) {
								return function () {
									return b.debug("kongregate swarmapi login..."),
									i.login("kongregate", {
										user_id : a.kongregate.services.getUserId(),
										game_auth_token : a.kongregate.services.getGameAuthToken(),
										username : a.kongregate.services.getUsername()
									}).success(function (a, c, d) {
										return b.debug("kongregate swarmapi login success", a, c, d)
									}).error(function (a, c, d) {
										return b.debug("kongregate swarmapi login error", a, c, d)
									})
								}
							}
						(this),
						this.kongregate.services.isGuest() ? (b.debug("kongregate swarmapi guest login..."), i.login("guestuser").success(function (a, c, d) {
								return b.debug("kongregate swarmapi guest login success", a, c, d)
							}).error(function (a, c, d) {
								return b.debug("kongregate swarmapi guest login error", a, c, d)
							})) : a(),
						this.kongregate.services.addEventListener("login", a)
					},
					c.prototype._onLoad = function () {
						var a,
						c,
						d,
						e;
						return b.debug("kongregate successfully loaded!", this.kongregate),
						this.isLoaded = !0,
						this.reportStats(),
						this._swarmApiLogin(),
						Raven.setUser({
							id : this.kongregate.services.getUsername()
						}),
						c = $(document.documentElement),
						a = $(document.body),
						e = null,
						d = new Date(0),
						this._onResize = function (c) {
							return function (f) {
								var g,
								h,
								i;
								return i = Math.max(a.height(), 600),
								(i !== e || f) && (g = new Date, h = g.getTime() - d.getTime(), (i > e || h >= 1e3 && e - i > 100 || f) && (b.debug("onresize: " + e + " to " + i + " (" + (i > e ? "up" : "down") + "), " + h + "ms"), e = i, d = g, c._resizeGame(800, i), c.parented)) ? c.parented.style.height = i + "px" : void 0
							}
						}
						(this),
						this.onScrollOptionChange(!0),
						b.debug("setup onresize")
					},
					c.prototype.reportStats = function () {
						var a,
						c;
						try {
							if (!this.isLoaded || !d.session.state.kongregate)
								return;
							if (c = new Date, this.lastReported && c.getTime() < this.lastReported.getTime() + 6e4)
								return;
							return this.lastReported = c,
							this.kongregate.stats.submit("Hatcheries", this._count(d.upgrade("hatchery"))),
							this.kongregate.stats.submit("Expansions", this._count(d.upgrade("expansion"))),
							this.kongregate.stats.submit("GameComplete", this._count(d.unit("ascension"))),
							this.kongregate.stats.submit("Mutations Unlocked", this._count(d.upgrade("mutatehidden"))),
							this.kongregate.stats.submit("Achievement Points", d.achievementPoints()),
							this._submitTimetrialMins("Minutes to First Nexus", d.upgrade("nexus1")),
							this._submitTimetrialMins("Minutes to Fifth Nexus", d.upgrade("nexus5")),
							this._submitTimetrialMins("Minutes to First Ascension", d.unit("ascension"))
						} catch (e) {
							return a = e,
							b.warn("kongregate reportstats failed - continuing", a)
						}
					},
					c.prototype._count = function (a) {
						return a.count().floor().toNumber()
					},
					c.prototype._timetrialMins = function (a) {
						var b,
						c;
						return (b = null != (c = a.statistics()) ? c.elapsedFirst : void 0) ? Math.ceil(b / 1e3 / 60) : void 0
					},
					c.prototype._submitTimetrialMins = function (a, b) {
						var c;
						return c = this._timetrialMins(b),
						c ? this.kongregate.stats.submit(a, c) : void 0
					},
					c
				}
				()
			}
		]),
	angular.module("swarmApp").factory("kongregate", ["$log", "Kongregate", function (a, b) {
				var c;
				return c = new b,
				a.debug("isKongregate:", c.isKongregate()),
				c.isKongregate() && c.load(),
				c
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").service("seedrand", ["session", function (a) {
				var b;
				return new(b = function () {
					function b() {}

					return b.prototype.mkseed = function (b, c) {
						return null == c && (c = a.state.date.started),
						c + ":" + b
					},
					b.prototype.rng = function (a, b) {
						var c;
						return null == b && (b = null),
						c = this.mkseed(a, b),
						new Math.seedrandom(c)
					},
					b.prototype.rand = function (a, b) {
						return null == b && (b = null),
						this.rng(a, b)()
					},
					b
				}
					())
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("Backfill", ["$log", function (a) {
				var b;
				return b = function () {
					function b() {}

					return b.prototype.run = function (b) {
						return function () {
							var c,
							d,
							e,
							f,
							g,
							h,
							i,
							j,
							k,
							l,
							m,
							n,
							o;
							if (l = b.unit("premutagen"), c = b.unit("ascension"), f = b.upgrade("hatchery"), e = b.upgrade("expansion"), k = b.unit("invisiblehatchery").stat("random.minlevel.hatchery"), j = b.unit("invisiblehatchery").stat("random.minlevel.expansion"), l.count().isZero() && c.count().isZero() && (f.count().greaterThanOrEqualTo(k) || e.count().greaterThanOrEqualTo(j))) {
								for (a.info("backfilling mutagen for old save"), m = [f, e], n = [], h = 0, i = m.length; i > h; h++)
									o = m[h], n.push(function () {
										var a,
										b,
										c;
										for (c = [], g = a = 0, b = o.count().toNumber(); b >= 0 ? b > a : a > b; g = b >= 0 ? ++a : --a)
											c.push(function () {
												var a,
												b,
												c,
												e;
												for (c = o.effect, e = [], a = 0, b = c.length; b > a; a++)
													d = c[a], e.push(d.onBuy(new Decimal(g + 1)));
												return e
											}
												());
										return c
									}
										());
								return n
							}
							return a.debug("no mutagen backfill necessary")
						}
						(),
						function () {
							var a;
							return a = b.unit("freeRespec"),
							a.isCountInitialized() ? void 0 : a._setCount(a.unittype.init)
						}
						(),
						function () {
							var c,
							d,
							e;
							return c = b.unit("ascension"),
							e = c.statistics(),
							new Decimal(null != (d = null != e ? e.num : void 0) ? d : 0).greaterThan(c.count()) && c.count().isZero() ? (a.info("backfill lost ascension tally", c.count() + "", e.num), c._setCount(e.num)) : void 0
						}
						(),
						a.debug("backfill success")
					},
					b
				}
				()
			}
		]),
	angular.module("swarmApp").factory("backfill", ["Backfill", function (a) {
				return new a
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("DropboxdatastoreCtrl", ["$scope", "$log", "env", "dropboxSyncer", function (a, b, c, d) {
				return a.env = c,
				a.syncer = d,
				a.syncer.dsc.authDriver(new Dropbox.AuthDriver.Popup({
						receiverUrl : window.location.protocol + "//" + window.location.host + window.location.pathname + "views/dropboxauth.html"
					})),
				a.isAuth = function () {
					return a.syncer.isAuth()
				},
				a.updatesavelisting = function () {
					return a.syncer.fetch(function () {})
				},
				a.loggedin = function () {
					return a.syncer.init(function () {})
				},
				a.syncer.isAuth() && a.syncer.init(),
				a.droplogin = function () {
					return b.debug("attempt login"),
					a.syncer.dsc.authenticate(function (c, d) {
						return b.debug("authenticate err: " + c),
						b.debug("authenticate client: " + d),
						a.syncer.init(function () {})
					})
				},
				a.droplogout = function () {
					return a.syncer.savedgames = [],
					a.syncer._datastore.recordsChanged.removeListener(a.syncer._recordChangedListener),
					a.syncer.dsc.signOut({
						mustInvalidate : !0
					})
				},
				a.fetch = function () {
					return a.syncer.fetch(function () {})
				},
				a.addSavegame = function () {
					return a.syncer.push(function () {})
				},
				a.importSavegame = function () {
					return a.syncer.pull()
				},
				a.clearSavegame = function () {
					return a.syncer.clear(function () {})
				},
				a.moment = function (b) {
					return null == b && (b = a.syncer.savedgame.get("created")),
					moment(b)
				}
			}
		]),
	angular.module("swarmApp").controller("KongregateS3Ctrl", ["$scope", "$log", "env", "kongregate", "kongregateS3Syncer", "$timeout", function (a, b, c, d, e, f) {
				var g,
				h,
				i,
				j;
				return j = e,
				a.kongregate = d,
				a.env = c,
				c.isKongregateSyncEnabled && d.isKongregate() ? (g = a.$watch("kongregate.kongregate", function (a) {
							return null != a ? (g(), i()) : void 0
						}), a.isVisible = j.isVisible(), a.isGuest = function () {
					return null == a.api || a.api.isGuest()
				}, a.saveServerUrl = c.saveServerUrl, a.remoteSave = function () {
					var a;
					return null != (a = j.fetched) ? a.encoded : void 0
				}, a.remoteDate = function () {
					var a;
					return null != (a = j.fetched) ? a.date : void 0
				}, a.policy = function () {
					return j.policy
				}, a.isPolicyCached = function () {
					return j.cached
				}, a.policyError = null, a.getAutopushError = function () {
					return j.getAutopushError()
				}, i = function () {
					return a.api = d.kongregate.services,
					a.api.addEventListener("login", function () {
						return a.$apply()
					}),
					a.init()
				}, a.isBrowserSupported = function () {
					return null != window.FormData && null != window.Blob
				}, h = a.cooldown = {
						byName : {},
						set : function (a, b) {
							return null == b && (b = 5e3),
							h.byName[a] = f(function () {
									return h.clear(a)
								}, b)
						},
						clear : function (a) {
							return h.byName[a] ? (f.cancel(h.byName[a]), delete h.byName[a]) : void 0
						}
					}, a.init = function (c) {
					var d;
					return a.policyError = null,
					h.set("init"),
					d = j.init(function (a, c) {
							return b.debug("kong syncer inited", a, c),
							void h.clear("init")
						}, a.api.getUserId(), a.api.getGameAuthToken(), c),
					d["catch"](function (b) {
						return a.policyError = "Failed to fetch sync permissions: " + (null != b ? b.status : void 0) + ", " + (null != b ? b.statusText : void 0) + ", " + (null != b ? b.responseText : void 0),
						h.clear("init")
					})
				}, a.fetch = function () {
					var c;
					return h.set("fetch"),
					c = j.fetch(function (c, d, e) {
							return a.$apply(),
							h.clear("fetch"),
							b.debug("kong syncer fetched", c, d),
							e
						}),
					c.error(function (b) {
						return a.$apply(),
						h.clear("fetch"),
						404 !== b.status ? a.policyError = "Failed to fetch remote saved game: " + (null != b ? b.status : void 0) + ", " + (null != b ? b.statusText : void 0) + ", " + (null != b ? b.responseText : void 0) : void 0
					})
				}, a.push = function () {
					var c,
					d;
					try {
						return h.set("push"),
						d = j.push(function () {
								return h.clear("push"),
								a.$apply(),
								d
							}),
						d.error(function (b) {
							return h.clear("push"),
							a.policyError = "Failed to push remote saved game: " + (null != b ? b.status : void 0) + ", " + (null != b ? b.statusText : void 0) + ", " + (null != b ? b.responseText : void 0)
						})
					} catch (e) {
						return c = e,
						h.clear("push"),
						b.error("error pushing saved game (didn't even get to the http request!)", c),
						a.policyError = "Error pushing remote saved game: " + (null != c ? c.message : void 0)
					}
				}, a.pull = function () {
					return j.pull()
				}, a.clear = function () {
					var b;
					return h.set("clear"),
					b = j.clear(function (b, c, d) {
							return h.clear("clear"),
							a.$apply(),
							d
						}),
					b.error(function (b) {
						return h.clear("clear"),
						a.policyError = "Failed to clear remote saved game: " + (null != b ? b.status : void 0) + ", " + (null != b ? b.statusText : void 0) + ", " + (null != b ? b.responseText : void 0)
					})
				}) : void 0
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").filter("duration", ["options", "$filter", function (a, b) {
				return function (c, d, e, f) {
					var g,
					h,
					i;
					if (c === 1 / 0)
						return "";
					if (null != c.toNumber && (c = c.toNumber()), !c)
						return "";
					if (h = null != (null != c ? c.nonexact : void 0) && c.nonexact ? " or less" : "", g = moment.duration(c, d), null == e)
						switch (e = "d[d] h:mm:ss", "function" == typeof a.durationFormat ? a.durationFormat() : void 0) {
						case "human":
							return h + g.humanize();
						case "full":
							e = function () {
								switch (!1) {
								case !(g.asSeconds() < 60):
									return "0:s";
								default:
									return "y [yr] M [mth] d [day] hh:mm:ss"
								}
							}
							();
							break;
						case "abbreviated":
							if (g.asYears() >= 100)
								return i = b("longnum")(g.asYears()), i + " years";
							e = function () {
								switch (!1) {
								case !(g.asYears() >= 1):
									return "y [years] M [months]";
								case !(g.asMonths() >= 1):
									return "M [months] d [days]";
								case !(g.asDays() >= 1):
									return "d [days] h [hours]";
								case !(g.asMinutes() >= 1):
									return "h:mm:ss";
								default:
									return {
										template : "00:ss",
										trim : !1
									}
								}
							}
							()
						}
					return g.format(e, f) + h
				}
			}
		]),
	angular.module("swarmApp").filter("momentFromNow", ["$filter", function () {
				return function (a) {
					return moment(a).fromNow()
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("feedback", ["$log", "game", "version", "env", "isKongregate", function (a, b, c, d, e) {
				var f;
				return new(f = function () {
					function c() {}

					return c.prototype.createTinyurl = function (c) {
						var f;
						return null == c && (c = b.session.exportSave()),
						null != (f = b.cache.tinyUrl)[c] ? f[c] : f[c] = function () {
							return function () {
								var b;
								return b = e() ? "https://www.swarmsim.com?kongregate=1/#/importsplash?savedata=" + encodeURIComponent(c) : "https://swarmsim.github.io/#/importsplash?savedata=" + encodeURIComponent(c),
								jQuery.ajax("https://www.googleapis.com/urlshortener/v1/url", {
									type : "POST",
									data : JSON.stringify({
										key : d.googleApiKey,
										longUrl : b
									}),
									contentType : "application/json",
									dataType : "json"
								}).done(function (b, c, d) {
									return a.debug("createTinyurl success", b, c, d)
								}).fail(function (b, c, d) {
									return a.debug("createTinyurl fail ", b, c, d)
								})
							}
						}
						(this)()
					},
					c
				}
					())
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("ContactCtrl", ["$scope", "feedback", "version", "$location", "isKongregate", "$log", function (a, b, c, d, e) {
				var f,
				g,
				h,
				i,
				j,
				k,
				l;
				return a.urls = {
					"short" : "???",
					expand : "???"
				},
				a.userAgentGuess = function () {
					return function () {
						var a,
						b,
						c,
						d,
						e,
						f,
						g;
						for (b = [{
									name : "Chrome",
									regex : /Chrome\/(\S+)/
								}, {
									name : "Firefox",
									regex : /Firefox\/(\S+)/
								}, {
									name : "MSIE",
									regex : /MSIE (\S+);/
								}, {
									name : "Opera",
									regex : /Opera\/(\S+)/
								}, {
									name : "Safari",
									regex : /Version\/(\S+).*?Safari\//
								}
							], g = "undefined" != typeof window && null !== window && null != (f = window.navigator) ? f.userAgent : void 0, c = 0, d = b.length; d > c; c++)
							if (a = b[c], e = g.match(a.regex))
								return a.name + " " + e[1];
						return g
					}
				}
				(this)(),
				b.createTinyurl().done(function () {
					return function (b) {
						return a.urls["short"] = b.id,
						a.urls.expand = b.id + "+"
					}
				}
					(this)),
				a.initTopic = null != d.search().error ? "bug" : void 0,
				i = d.search().error && d.search().error !== !0,
				l = {
					bug : {
						subject : function () {
							return "Swarm Simulator Bug Report (" + (new Date).toLocaleString() + ")"
						},
						message : function () {
							return "Describe the bug here. Step-by-step instructions saying how to make the bug reoccur are helpful.\n\n*****\n\nBug report information:\n\n* Swarm Simulator version: " + c + "\n* Saved game: " + a.urls.expand + "\n* Source: " + (e() ? "Kongregate" : "Standalone") + "\n* Browser: " + a.userAgentGuess + (i ? "\n* Error message: ```" + d.search().error + "```" : "")
						},
						anonDebug : function () {
							var b;
							return (b = d.search().error || "") && (b += "|"),
							c + "|" + a.userAgentGuess + "|" + b + a.urls.expand
						}
					},
					other : {
						subject : function () {
							return "Swarm Simulator Feedback (" + (new Date).toLocaleString() + ")"
						},
						message : function () {
							return ""
						},
						anonDebug : function () {
							return ""
						},
						emailTo : function () {
							return LZString.decompressFromBase64("GYUxBMCMEMGMGsACBnA7tATgW2QSywHSwD2WQA==")
						}
					}
				},
				f = function (a, b) {
					var c,
					d;
					return (null != (c = null != (d = l[a]) ? d[b] : void 0) ? c : l.other[b])()
				},
				k = function (a) {
					return f(a, "subject")
				},
				j = function (a) {
					return f(a, "message")
				},
				g = function (a) {
					return f(a, "anonDebug")
				},
				a.emailTo = h = function (a) {
					return f(a, "emailTo")
				},
				a.redditUrl = function (a) {
					return "https://www.reddit.com/message/compose/?to=kawaritai&subject=" + encodeURIComponent(k(a)) + "&message=" + encodeURIComponent(j(a))
				},
				a.mailtoUrl = function (a) {
					return "mailto:" + h(a) + "?subject=" + encodeURIComponent(k(a)) + "&body=" + encodeURIComponent(j(a))
				},
				a.anonForm = function (a) {
					var b,
					c;
					return c = "https://docs.google.com/a/swarmsim.com/forms/d/18ywqkqMlviAgKACVZUI6XkaGte2piKN3LGbii8Qwvmw/viewform?entry.1461412788=" + encodeURIComponent(g(a)),
					b = 1950,
					c.length > b && (c = c.substring(0, b) + encodeURIComponent("...TRUNCATED...")),
					c
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("ErrorSavingCtrl", ["$scope", "game", "$rootScope", function (a, b) {
				var c,
				d;
				return d = c = 0,
				a.game = b,
				a.form = {},
				a.$on("save", function () {
					return d += 1
				}),
				a.$on("save:failed", function (e, f) {
					var g;
					return c += 1,
					0 === d ? (a.form.errored = !0, a.form.error = null != (g = f.error) ? g.message : void 0, a.form["export"] = b.session.exportSave()) : void 0
				}),
				a.select = function (a) {
					return a.target.select()
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("ClearthemeCtrl", ["$scope", "options", "$location", function (a, b, c) {
				var d,
				e;
				return c.search().custom && c.search().theme ? b.customTheme(c.search().theme) : (e = c.search().theme, c.search().themeExtra || (e = "none"), e && b.theme(e)),
				c.search().themeExtra ? b.themeExtra(null != (d = c.search().themeExtra) ? d : "") : void 0
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("cookieStorage", function () {
		var a;
		return new(a = function () {
			function a() {}

			return a.prototype.getItem = function (a) {
				return $.cookie(a)
			},
			a.prototype.setItem = function (a, b) {
				return $.cookie(a, b, {
					expires : 36500,
					secure : !1
				})
			},
			a.prototype.removeItem = function (a) {
				return $.removeCookie(a)
			},
			a
		}
			())
	}),
	angular.module("swarmApp").factory("flashStorage", ["$q", "$log", "env", function (a, b) {
				var c;
				return new(c = function () {
					function c() {
						var c,
						d;
						c = a.defer(),
						this.onReady = c.promise;
						try {
							this.storage = new SwfStore({
									namespace : "swarmsim",
									swf_url : "./storage.swf",
									timeout : 10,
									onready : function (a) {
										return function () {
											return null == a.isReady && (a.isReady = !0),
											c.resolve(),
											b.debug("flash storage ready")
										}
									}
									(this),
									onerror : function (a) {
										return function () {
											return a.isReady = !1,
											c.reject(),
											b.warn("flash storage error")
										}
									}
									(this)
								})
						} catch (e) {
							d = e,
							this.isReady = !1,
							c.reject(),
							b.warn("flash storage init error")
						}
					}
					return c.prototype.getItem = function (a) {
						return this.storage.get(a)
					},
					c.prototype.setItem = function (a, b) {
						return this.storage.set(a, b)
					},
					c.prototype.removeItem = function (a) {
						return this.storage.clear(a)
					},
					c.prototype.clear = function () {
						return this.storage.clearAll()
					},
					c
				}
					())
			}
		]),
	angular.module("swarmApp").factory("MultiStorage", ["$log", function (a) {
				var b;
				return b = function () {
					function b() {
						this.storages = {
							list : [],
							byName : {}

						}
					}
					return b.prototype.addStorage = function (a, b) {
						var c;
						return c = {
							name : a,
							storage : b
						},
						this.storages.list.push(c),
						this.storages.byName[a] = c,
						this[a] = b,
						this
					},
					b.prototype._withEachStore = function (b, c, d) {
						var e,
						f,
						g,
						h,
						i,
						j,
						k;
						for (null == d && (d = function () {
								return !1
							}), f = 0, i = this.storages.list, g = 0, h = i.length; h > g; g++) {
							k = i[g];
							try {
								if (j = c(k), d(j))
									return j
							} catch (l) {
								if (e = l, f += 1, f >= this.storages.list.length)
									throw a.warn("multistore." + b + " failed with all stores, throwing", e), e;
								a.info("multistore." + b + " error (continuing)", k.name, e)
							}
						}
						return void 0
					},
					b.prototype.getItem = function (b) {
						var c;
						return c = function (c) {
							return a.debug("multistore.getitem", c.name),
							c.storage.getItem(b)
						},
						this._withEachStore("getItem", c, function (a) {
							return null != a
						})
					},
					b.prototype.setItem = function (b, c) {
						return this._withEachStore("setItem", function (d) {
							return a.debug("multistore.setitem", d.name, b),
							d.storage.setItem(b, c)
						})
					},
					b.prototype.removeItem = function (b) {
						return this._withEachStore("removeItem", function (c) {
							return a.debug("multistore.removeitem", c.name, b),
							c.storage.removeItem(b)
						})
					},
					b.prototype.toJSON = function () {
						return void 0
					},
					b
				}
				()
			}
		]),
	angular.module("swarmApp").factory("storage", ["MultiStorage", "flashStorage", "cookieStorage", function (a, b, c) {
				return (new a).addStorage("local", window.localStorage).addStorage("cookie", c).addStorage("flash", b)
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("ImportsplashCtrl", ["$scope", "isKongregate", "game", function (a, b, c) {
				return a.isKongregate = b(),
				a.click = function () {
					return c.withSave(function () {}),
					a.isKongregate ? window.location.href = "http://www.kongregate.com/games/swarmsim/swarm-simulator" : window.location = "#/"
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("kongregateS3Syncer", ["$log", "kongregate", "storage", "game", "env", "$interval", "$q", "$rootScope", function (a, b, c, d, e, f, g, h) {
				var i;
				return new(i = function () {
					function i() {
						jQuery.ajaxSetup({
							cached : !1
						})
					}
					return i.prototype.isVisible = function () {
						return e.isKongregateSyncEnabled && b.isKongregate()
					},
					i.prototype.init = function (e, f, h, i) {
						var j,
						k;
						return null == e && (e = function () {}),
						j = g.defer(),
						k = j.promise,
						k.then(e),
						b.onLoad.then(function (b) {
							return function () {
								var e,
								g,
								k,
								l,
								m;
								b.policy = null,
								i && c.removeItem("s3Policy");
								try {
									l = c.getItem("s3Policy"),
									l ? (b.policy = JSON.parse(l), b.cached = !0) : a.debug("no cached s3 policy", b.policy)
								} catch (n) {
									e = n,
									a.warn("couldn't load cached s3 policy", e)
								}
								return a.debug("cached policy", b.policy),
								null == b.policy || (g = (null != (m = b.policy.localDate) ? m.expires : void 0) < d.now.getTime()) ? (b.cached = !1, a.debug("refreshing s3 policy", i, g), k = function (d, e) {
									return "success" === e ? (b.policy = d, a.debug("caching s3 policy", b.policy), c.setItem("s3Policy", JSON.stringify(b.policy))) : a.warn("couldn't refresh s3 policy", d, e),
									b.fetch(function (a) {
										return j.resolve(a)
									})
								}, b._refreshPolicy(k, f, h)) : (a.debug("cached s3 policy is good; not refreshing", b.policy), void b.fetch(function () {
										return j.resolve()
									}))
							}
						}
							(this)),
						b.onLoad["catch"](function () {
							return function (a) {
								return j.reject(a)
							}
						}
							(this)),
						k
					},
					i.prototype.isInit = function () {
						return null != this.policy
					},
					i.prototype.initAutopush = function (b) {
						return null == b && (b = !0),
						this.autopushInterval && (f.cancel(this.autopushInterval), this.autopushInterval = null),
						$(window).off("unload", "kongregate.autopush"),
						b ? (this.autopushInterval = f(function (a) {
									return function () {
										return a.autopush()
									}
								}
									(this), e.autopushIntervalMs), $(window).unload("kongregate.autopush", function (b) {
								return function () {
									return a.debug("autopush unload"),
									b.autopush()
								}
							}
								(this))) : void 0
					},
					i.prototype._refreshPolicy = function (c, f, g) {
						var h,
						i;
						return null == c && (c = function () {}),
						null == f && (f = b.kongregate.services.getUserId()),
						null == g && (g = b.kongregate.services.getGameAuthToken()),
						h = {
							policy : {
								user_id : f,
								game_auth_token : g
							}
						},
						i = $.post(e.saveServerUrl + "/policies", h, function () {
								return function (b, e, f) {
									return a.debug("refreshed s3 policy", b, e, f),
									b.localDate = {
										refreshed : d.now.getTime(),
										expires : d.now.getTime() + 1e3 * b.expiresIn
									},
									c(b, e, f)
								}
							}
								(this)),
						i.fail(function (b, c, d) {
							return a.error("refreshing s3 failed", b, c, d)
						})
					},
					i.prototype.fetch = function (b) {
						var c;
						if (null == b && (b = function () {}), !this.policy.get)
							throw new Error("no policy. init() first.");
						return c = $.get(this.policy.get, function (c) {
								return function (d, e, f) {
									return a.debug("fetched from s3", d, e, f),
									c.fetched = d,
									b(d, e, f)
								}
							}
								(this)),
						c.fail(function (b, c, d) {
							return 404 === (null != b ? b.status : void 0) ? a.debug("s3 fetch empty", b, c, d) : a.warn("s3 fetch failed", b, c, d);

						})
					},
					i.prototype.fetchedSave = function () {
						var a;
						return null != (a = this.fetched) ? a.encoded : void 0
					},
					i.prototype.fetchedDate = function () {
						var a;
						return null != (null != (a = this.fetched) ? a.date : void 0) ? new Date(this.fetched.date) : void 0
					},
					i.prototype.pull = function () {
						var a;
						if (a = this.fetchedSave(), !a)
							throw new Error("nothing to pull");
						return d.importSave(a),
						h.$broadcast("import", {
							source : "kongregateS3Syncer",
							success : !0
						})
					},
					i.prototype.push = function (b, c) {
						var e,
						f,
						g,
						h,
						i;
						if (null == b && (b = function () {}), null == c && (c = d.session.exportSave()), !this.policy.post)
							throw new Error("no policy. init() first.");
						e = new FormData,
						h = this.policy.post.params;
						for (f in h)
							i = h[f], a.debug("form keyval", f, i), e.append(f, i);
						return g = {
							encoded : c,
							date : d.now
						},
						e.append("file", new Blob([JSON.stringify(g)], {
								type : "application/json"
							})),
						$.ajax({
							url : this.policy.post.url,
							data : e,
							cache : !1,
							contentType : !1,
							processData : !1,
							type : "POST",
							error : function () {
								return function (b, c, d) {
									return a.error("s3 post fail", null != b ? b.responseText : void 0, b, c, d)
								}
							}
							(this),
							success : function (c) {
								return function (d, e, f) {
									return a.debug("exported to s3", d, e, f),
									c.fetched = g,
									b(d, e, f)
								}
							}
							(this)
						})
					},
					i.prototype.getAutopushError = function () {
						var a;
						return this.fetchedSave() === d.session.exportSave() ? "nochanges" : (null != (a = this.fetchedDate()) ? a : new Date(0)) > d.session.state.date.reified ? "remotenewer" : d.session.state.date.reified.getTime() === d.session.state.date.started.getTime() ? "newgame" : void 0
					},
					i.prototype.autopush = function () {
						return this.isInit() && this.autopushInterval ? this.getAutopushError() ? a.debug("autopush triggered with no changes, ignoring") : (a.debug("autopushing (with changes, for real)"), this.push()) : void 0
					},
					i.prototype.clear = function (b) {
						if (null == b && (b = function () {}), !this.policy["delete"])
							throw new Error("no policy. init() first.");
						return $.ajax({
							type : "DELETE",
							url : this.policy["delete"],
							error : function () {
								return function (b, c, d) {
									return a.error("s3 delete failed", null != b ? b.responseText : void 0, b, c, d)
								}
							}
							(this),
							success : function (c) {
								return function (d, e, f) {
									return a.debug("cleared from s3", d, e, f),
									delete c.fetched,
									b(d, e, f)
								}
							}
							(this)
						})
					},
					i
				}
					())
			}
		]),
	angular.module("swarmApp").factory("dropboxSyncer", ["$log", "env", "session", "game", "$location", "isKongregate", "$interval", "$rootScope", function (a, b, c, d, e, f, g, h) {
				var i;
				return new(i = function () {
					function i() {
						this._datastore = null,
						this._recschanged = null,
						this.savedgames = [],
						this.newSavegame = "game",
						this.appKey = b.dropboxAppKey,
						a.debug("env.dropboxAppKey:", this.appKey),
						this.dsc = new Dropbox.Client({
								key : this.appKey
							}),
						this.dsc.authenticate({
							interactive : !1
						})
					}
					return i.prototype.isVisible = function () {
						var a;
						return b.dropboxAppKey && (null != (a = e.search().dropbox) ? a : b.isDropboxEnabled && !f())
					},
					i.prototype.isAuth = function () {
						return this.dsc.isAuthenticated()
					},
					i.prototype._getTable = function () {
						return this._datastore.getTable("saveddata")
					},
					i.prototype.init = function (b) {
						var c;
						return this.isAuth() ? (a.debug("initializing dropbox"), c = new Dropbox.Datastore.DatastoreManager(this.dsc), c.openDefaultDatastore(function (c) {
								return function (d, e) {
									return d && a.debug("dropbox opendef err: " + d),
									a.debug("dropbox opendef datastore: " + e),
									c._datastore = e,
									c._recordChangedListener = function () {
										return c.fetch()
									},
									c._datastore.recordsChanged.addListener(c._recordChangedListener),
									a.debug("dropbox done initing, now fetching"),
									c.fetch(b)
								}
							}
								(this))) : a.debug("not logged in to dropbox, not initializing")
					},
					i.prototype.isInit = function () {
						return null != this._datastore
					},
					i.prototype.initAutopush = function (c) {
						return null == c && (c = !0),
						this.autopushInterval && (g.cancel(this.autopushInterval), this.autopushInterval = null),
						$(window).off("unload", "kongregate.autopush"),
						c ? (this.autopushInterval = g(function (a) {
									return function () {
										return a.autopush()
									}
								}
									(this), b.autopushIntervalMs), $(window).unload("kongregate.autopush", function (b) {
								return function () {
									return a.debug("autopush unload"),
									b.autopush()
								}
							}
								(this))) : void 0
					},
					i.prototype.fetch = function (b) {
						var c;
						return null == b && (b = function () {}),
						a.debug("dropbox is fetching (lulz)"),
						c = this._getTable(),
						this.savedgames = c.query({
								name : this.newSavegame
							}),
						this.savedgame = this.savedgames[0],
						a.debug("fetched from dropbox: " + this.savedgame),
						b()
					},
					i.prototype.fetchedSave = function () {
						var a;
						return null != (a = this.savedgame) && "function" == typeof a.get ? a.get("data") : void 0
					},
					i.prototype.fetchedDate = function () {
						var a,
						b;
						return (null != (a = this.savedgame) && "function" == typeof a.get ? a.get("created") : void 0) ? new Date(null != (b = this.savedgame) && "function" == typeof b.get ? b.get("created") : void 0) : void 0
					},
					i.prototype.push = function (b) {
						var d,
						e;
						return null == b && (b = function () {}),
						this.clear(),
						a.debug("saving to dropbox"),
						e = this._getTable(),
						d = e.insert({
								name : this.newSavegame,
								created : new Date,
								data : c.exportSave()
							}),
						b()
					},
					i.prototype.getAutopushError = function () {
						var a;
						return this.fetchedSave() === d.session.exportSave() ? "nochanges" : (null != (a = this.fetchedDate()) ? a : new Date(0)) > d.session.state.date.reified ? "remotenewer" : d.session.state.date.reified.getTime() === d.session.state.date.started.getTime() ? "newgame" : void 0
					},
					i.prototype.autopush = function () {
						return this.isInit() && this.autopushInterval ? this.getAutopushError() ? a.debug("autopush triggered with no changes, ignoring") : (a.debug("autopushing (with changes, for real)"), this.push()) : void 0
					},
					i.prototype.pull = function () {
						var a;
						if (a = this.fetchedSave(), !a)
							throw new Error("nothing to pull");
						return d.importSave(a),
						h.$broadcast("import", {
							source : "dropboxSyncer",
							success : !0
						})
					},
					i.prototype.clear = function (b) {
						var c,
						d,
						e,
						f,
						g;
						for (null == b && (b = function () {}), e = this.savedgames, f = [], c = 0, d = e.length; d > c; c++)
							g = e[c], a.debug("do delete of:" + g), f.push(this._getTable().get(g.getId()).deleteRecord());
						return f
					},
					i
				}
					())
			}
		])
}
.call(this), function () {
	angular.module("swarmApp").controller("ChartCtrl", ["$scope", "$log", "game", "options", function (a, b, c, d) {
				var e,
				f,
				g;
				return a.game = c,
				a.options = d,
				a.prodchart = e = {
					type : "PieChart"
				},
				f = {
					color : $("body").css("color"),
					fontName : $("body").css("font"),
					fontSize : $("body").css("font-size")
				},
				e.options = {
					backgroundColor : $("body").css("background-color"),
					titleTextStyle : f,
					fontName : f.fontName,
					fontSize : f.fontSize,
					chartArea : {
						backgroundColor : $("body").css("background-color")
					},
					pieSliceBorderColor : $("body").css("background-color"),
					pieResidueSliceLabel : "Other",
					legend : {
						position : "labeled",
						textStyle : f
					},
					pieSliceTextStyle : _.omit(f, "color"),
					title : "Production Rates",
					sliceVisibilityThreshold : .01,
					tooltip : {
						trigger : "none"
					}
				},
				g = a.game.unit("territory").velocity(),
				a.updatecharts = function () {
					var c,
					d,
					f,
					h,
					i;
					for (b.debug("updating chart data"), e.data = [["Unit Name", "Production"]], f = a.game.tabs.byName.territory.sortedUnits, h = [], c = 0, d = f.length; d > c; c++)
						i = f[c], h.push(i.isVisible() && "territory" !== i.name ? e.data.push([i.type.label, i.totalProduction().territory.dividedBy(g).toNumber()]) : void 0);
					return h
				},
				a.updatecharts()
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("parseNumber", ["$log", "numberSuffixesShort", "numberSuffixesLong", function (a, b, c) {
				var d,
				e,
				f,
				g,
				h,
				i,
				j,
				k,
				l,
				m;
				for (d = Decimal.constructor({
							rounding : Decimal.ROUND_CEIL
						}), l = {}, j = [b, c], e = 0, h = j.length; h > e; e++)
					for (m = j[e], f = g = 0, i = m.length; i > g; f = ++g)
						if (k = m[f]) {
							if (null != l[k.toLowerCase()])
								throw new Error("duplicate parsenumber suffix: " + k);
							l[k.toLowerCase()] = {
								index : f,
								exp : 3 * f,
								replace : "e" + 3 * f
							}
						}
				return function (b, c) {
					var e,
					f,
					g,
					h,
					i,
					j,
					k,
					m,
					n;
					if (n = null != (j = b + "") ? j.replace(",", "") : void 0, null != (g = /%$/.exec(n))) {
						try {
							i = Decimal.min(100, Decimal.max(0, n.replace("%", "")))
						} catch (o) {
							e = o,
							i = new Decimal(0)
						}
						n = c.maxCostMet(i.dividedBy(100)),
						a.debug("parse percent", b, i, n + "")
					}
					null != (g = /\ ?[a-zA-Z]+/.exec(n)) && (g.length > 0 && null != (f = l[g[0].toLowerCase()]) ? (n = n.replace(g[0], f.replace), a.debug("parse suffix", b, n)) : a.debug("parse suffix (invalid)", b, n, g)),
					null != (h = /^\=/.exec(n)) ? n = n.replace("=", "") : null != (m = /^@/.exec(n)) && (h = !0, n = n.replace("@", ""));
					try {
						if (k = d.max(1, n), m && (k = d.max(1, k.minus(c.count())), a.debug("parse target", b, k + "", "-" + c.count())), h ? (k = k.dividedBy(c.twinMult()).ceil(), a.debug("parse twins", b, k + "", "x" + c.twinMult())) : k = k.floor(), k = new Decimal(k), k.isFinite() && !k.isNaN())
							return k
					} catch (o) {
						return e = o,
						a.debug("user input parse error", e)
					}
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").directive("login", ["loginApi", "$log", "kongregate", "env", function (a, b, c, d) {
				return {
					restrict : "EA",
					template : '<div ng-cloak ng-if="env.isServerFrontendEnabled">\n  Login directive! user: {{loginApi.user.username}}\n  <div ng-if="!loginApi.user.id">\n    <a ng-if="isKongregate()" href="javascript:" ng-click="kongregateLogin()">Login</a>\n    <a ng-if="!isKongregate()" href="#/login">Login</a>\n  </div>\n  <a ng-if="loginApi.user.id && !isKongregate()" href="javascript:" ng-click="loginApi.logout()">Logout</a>\n</div>',
					link : function (b) {
						return b.env = d,
						b.loginApi = a,
						b.isKongregate = function () {
							return c.isKongregate()
						},
						b.kongregateLogin = function () {
							return c.kongregate.services.showRegistrationBox()
						}
					}
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").factory("userApi", ["$resource", "env", function (a, b) {
				return a(b.isServerBackendEnabled ? b.saveServerUrl + "/user/:id" : "/DISABLED/user/:id")
			}
		]),
	angular.module("swarmApp").factory("characterApi", ["$resource", "env", function (a, b) {
				return a(b.isServerBackendEnabled ? b.saveServerUrl + "/character/:id" : "/DISABLED/character/:id")
			}
		]),
	angular.module("swarmApp").factory("commandApi", ["$resource", "env", function (a, b) {
				return a(b.isServerBackendEnabled ? b.saveServerUrl + "/command/:id" : "/DISABLED/command/:id")
			}
		]),
	angular.module("swarmApp").factory("user", ["loginApi", function (a) {
				return function () {
					return a.user
				}
			}
		]),
	angular.module("swarmApp").config(["$httpProvider", function (a) {
				return a.defaults.useXDomain = !0,
				a.defaults.withCredentials = !0
			}
		]),
	angular.module("swarmApp").factory("loginApi", ["loginApiEnabled", "env", function (a, b) {
				var c,
				d,
				e,
				f;
				if (b.isServerBackendEnabled)
					return a;
				f = {},
				e = {
					logout : !0,
					saveCommand : !0,
					whoami : !0,
					maybeConnectLegacyCharacter : !0
				};
				for (d in a)
					c = a[d], f[d] = e[d] ? function () {}

				 : function () {
					throw new Error("login backend is disabled")
				};
				return f
			}
		]),
	angular.module("swarmApp").factory("loginApiEnabled", ["$http", "env", "util", "$log", "session", "characterApi", "isKongregate", "commandApi", function (a, b, c, d, e, f, g, h) {
				var i;
				return new(i = function () {
					function c() {
						this.characters = {},
						b.isServerBackendEnabled && (this.user = this.whoami().success(function (a) {
									return function () {
										return a.maybeConnectLegacyCharacter(),
										d.debug("user already logged in", a.user)
									}
								}
									(this)).error(function (a) {
									return function () {
										return g() ? void 0 : a.login("guestuser").success(function () {
											return d.debug("created guest user"),
											a.maybeConnectLegacyCharacter()
										}).error(function () {
											return d.debug("failed to create guest user")
										})
									}
								}
									(this)))
					}
					return c.prototype.hasUser = function () {
						return null != this.user.id
					},
					c.prototype.whoami = function () {
						return b.isServerBackendEnabled ? a.get(b.saveServerUrl + "/whoami").success(function (a) {
							return function (b) {
								return a.user = b
							}
						}
							(this)).error(function (a) {
							return function () {
								return a.user = {}

							}
						}
							(this)) : void 0
					},
					c.LOGIN_TAILS = {
						kongregate : "/callback",
						guestuser : "/callback"
					},
					c.prototype.login = function (c, e) {
						var f,
						g;
						return null == e && (e = {}),
						g = null != (f = this.constructor.LOGIN_TAILS[c]) ? f : "",
						b.saveServerUrl || d.error("env.saveServerUrl is blank, expect all swarmapi calls to fail. I hope this isn't the production environment!"),
						a.post(b.saveServerUrl + "/auth/" + c + g, e, {
							withCredentials : !0
						}).success(function (a) {
							return function (b) {
								return a.user = b.user,
								a.maybeConnectLegacyCharacter()
							}
						}
							(this))
					},
					c.prototype.logout = function () {
						return b.isServerBackendEnabled ? a.get(b.saveServerUrl + "/logout", {}, {
							withCredentials : !0
						}).success(function (a) {
							return function () {
								return a.whoami()
							}
						}
							(this)) : void 0
					},
					c.prototype.maybeConnectLegacyCharacter = function () {
						var a,
						c;
						if (b.isServerBackendEnabled)
							return null != this.user && null == e.state.idOnServer ? (d.debug("connectLegacyCharacter found a legacy character, connecting..."), c = e.exportJson(), a = f.save({
										user : this.user.id,
										name : "swarm",
										source : "connectLegacy",
										state : e.exportJson()
									}, function (b) {
										return function () {
											return e.state.idOnServer = a.id,
											b.characters[a.id] = a,
											e.save(),
											d.debug("connectLegacyCharacter connected!", e.state.serverId)
										}
									}
										(this), function () {
										return function (a, b, c) {
											return d.warn("connectLegacyCharacter failed!", a, b, c)
										}
									}
										(this))) : void 0
					},
					c.prototype.saveCommand = function (a) {
						var c,
						f;
						if (b.isServerBackendEnabled)
							return null == e.state.idOnServer ? (d.debug("server saveCommand quitting because character has no id. trying connectlegacycharacter.", a), this.maybeConnectLegacyCharacter()) : (c = e.exportJson(), a = _.omit(a, ["unit", "upgrade"]), d.debug("server saveCommand start", f), f = h.save({
										character : e.state.idOnServer,
										body : a,
										state : c
									}, function () {
										return function () {
											return d.debug("server saveCommand success", f)
										}
									}
										(this), function (a) {
										return function (b, c, g) {
											var h;
											return d.warn("server saveCommand failed!", b, c, g),
											400 <= (h = b.status) && 500 > h ? (d.warn("server saveCommand bad request. trying to recreate character on server.", f), delete e.state.idOnServer, a.maybeConnectLegacyCharacter()) : void 0
										}
									}
										(this)))
					},
					c
				}
					())
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("LoginCtrl", ["$scope", "loginApi", function (a, b) {
				return a.form = {},
				a.submit = function () {
					return b.login("local", a.form)
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("DebugApiCtrl", ["$scope", "env", "loginApi", "$http", "$log", function (a, b, c, d, e) {
				var f,
				g;
				return a.env = b,
				a.loginApi = c,
				a.form = {
					url : "/whoami"
				},
				a.calling = !1,
				f = function (a) {
					return $("<pre>").text(a).prependTo("#testApiCallResults")
				},
				g = window.submitApiCall = function (b) {
					return a.calling ? (f("already calling an api. please be patient."), e.error("already calling an api. please be patient.")) : (e.info("debugapi request", b), a.calling = new Date, d(b).success(function (b, c, d) {
							var g;
							return g = (new Date).getTime() - a.calling.getTime(),
							a.calling = !1,
							e.info("debugapi response", b, c, d),
							f("success: " + c + ", " + g + "ms\n\n" + JSON.stringify(b, null, 2))
						}).error(function (b, c, d) {
							var g;
							return g = (new Date).getTime() - a.calling.getTime(),
							a.calling = !1,
							e.warn("debugapi error", b, c, d),
							f("ERROR: " + c + ", " + g + "ms\n\n" + JSON.stringify(b, null, 2))
						}))
				},
				a.submitApiCall = function (c) {
					return g({
						method : c,
						url : "" + b.saveServerUrl + a.form.url,
						headers : a.form.headers,
						data : a.form.data
					})
				}
			}
		])
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").directive("newslink", function () {
		return {
			restrict : "EA",
			template : '<p ng-if="env.isDebugEnabled" style="border:1px red solid">Swarm Simulator v1.1 is coming soon! <a data-toggle="modal" data-target="#newsmodal" href="javascript:">See what\'s changing</a>.</p>\n<div class="modal fade" id="newsmodal" tabindex="-1" role="dialog" aria-labelledby="newsmodal-title" aria-hidden="true">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div ng-include="\'views/newsmodal.html\'"></div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>',
			link : function () {}

		}
	})
}
.call(this), function () {
	"use strict";
	angular.module("swarmApp").controller("DecimallegendCtrl", ["$scope", "numberSuffixesShort", "numberSuffixesLong", "$log", function (a, b, c, d) {
				var e,
				f,
				g;
				return g = _.zip(function () {
						e = [];
						for (var a = 0, c = b.length; c >= 0 ? c > a : a > c; c >= 0 ? a++ : a--)
							e.push(a);
						return e
					}
						.apply(this), b, c),
				a.rows = function () {
					var a,
					b,
					c;
					for (c = [], a = 0, b = g.length; b > a; a++)
						f = g[a], c.push({
							rownum : f[0],
							"short" : f[1],
							"long" : f[2],
							val : new Decimal("1e" + 3 * (f[0] || 0)),
							string : "1e" + 3 * (f[0] || 0)
						});
					return c
				}
				(),
				a.rows[0].string += " (1)",
				a.rows[1].string += " (1,000)",
				a.rows[2].string += " (1,000,000)",
				d.debug(a.rows)
			}
		])
}
.call(this), angular.module("swarmApp").run(["$templateCache", function (a) {
			"use strict";
			a.put("views/achievements.html", '<tabs></tabs> <h2><b>{{game.achievementPoints() | longnum}}</b> achievement points</h2> <div class="progress"> <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="{{game.achievementPercent()*100|number:0}}" aria-valuemin="0" aria-valuemax="100" ng-style="{width: game.achievementPercent()*100+\'%\'}"> {{game.achievementPercent()|percent:0}} complete </div> <!--div class="progress-bar progress-bar-warning" role="progressbar" style="width: {{(1-game.achievementPercent())|percent:0}}"></div--> </div> <p>Show <label><input type="checkbox" checked ng-model="form.show.earned" ng-change="onChangeVisibility()">earned</label> <label><input type="checkbox" checked ng-model="form.show.unearned" ng-change="onChangeVisibility()">unearned</label> <label><input type="checkbox" checked ng-model="form.show.masked" ng-change="onChangeVisibility()">masked</label> achievements, sorted by <label><input type="radio" ng-model="form.show.order" value="default" ng-change="onChangeVisibility()">default</label> <label><input type="radio" ng-model="form.show.order" value="percentComplete" ng-change="onChangeVisibility()">% complete</label>, <label><input type="checkbox" checked ng-model="form.show.reverse" ng-change="onChangeVisibility()">{{form.show.reverse ? "highest" : "lowest"}} first</label> </p> <p ng-if="game.upgrade(\'achievementbonus\').count().greaterThan(0)">Your achievements grant a <b>+{{game.upgrade(\'achievementbonus\').calcStats().prod|percent:{plusOne:true} }}</b> bonus to larva production.</p> <ul class="list-unstyled"> <li ng-repeat="achievement in game.achievementsSorted() | filter:isVisible:achievement | orderBy:order.pred:form.show.reverse" class="achieve"> <div ng-if="state(achievement) == \'earned\'" class="alert achievetext alert-success" ng-click="achieveclick(achievement)"> <span class="achieveicon hidden-xs glyphicon glyphicon-ok" title="Someday I\'ll add real achievement icons"></span> <span class="achievepoints hidden-xs" ng-if="achievement.type.points > 0">+{{achievement.type.points|number}}</span> <span class="achieveicon-xs visible-xs glyphicon glyphicon-ok" title="Someday I\'ll add real achievement icons"></span> <span class="achievepoints-xs visible-xs" ng-if="achievement.type.points > 0">+{{achievement.type.points|number}}</span> <h3>{{achievement.type.label}}</h3> <p class="achievedesc">{{achievement.description()}}</p> <p><em>{{achievement.type.longdesc || \'&nbsp;\'}}</em></p> <span class="achievedate small" title="{{achievement.earnedAtMoment().format(\'dddd, MMMM Do YYYY, h:mm:ss a\')}}">Earned {{achievement.earnedAtMoment().fromNow()}}</span> </div> <div ng-if="state(achievement) == \'unearned\'" class="alert achievetext alert-warning" ng-click="achieveclick(achievement)"> <span class="achieveicon hidden-xs glyphicon glyphicon-ok" title="Someday I\'ll add real achievement icons"></span> <span class="achievepoints hidden-xs" ng-if="achievement.type.points > 0">{{achievement.type.points|number}}</span> <span class="achieveicon-xs visible-xs glyphicon glyphicon-ok" title="Someday I\'ll add real achievement icons"></span> <span class="achievepoints-xs visible-xs" ng-if="achievement.type.points > 0">+{{achievement.type.points|number}}</span> <h3>{{achievement.type.label}}</h3> <p class="achievedesc">{{achievement.description()}}</p> <p><em>{{achievement.type.longdesc || \'&nbsp;\'}}</em></p> <div ng-if="achievement.hasProgress()" class="progress" style="margin-bottom:0"> <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="{{achievement.progressVal().toNumber()|number}}" aria-valuemin="0" aria-valuemax="{{achievement.progressMax().toNumber()|number}}" ng-style="{width:achievement.progressPercent().times(100)+\'%\'}"> {{achievement.progressPercent()|percent:0}}<span ng-if="achievement.progressPercent().greaterThan(0.3)">: {{achievement.progressVal() | bignum:0}} of {{achievement.progressMax() | bignum:0}} </span> </div> </div> </div> <div ng-if="state(achievement) == \'masked\'" class="alert achievetext alert-warning" ng-click="achieveclick(achievement)"> <span class="achieveicon hidden-xs glyphicon glyphicon-question-sign" title="it is a mystery"></span> <span class="achievepoints hidden-xs" ng-if="achievement.type.points > 0">{{achievement.type.points|number}}</span> <span class="achieveicon-xs visible-xs glyphicon glyphicon-question-sign" title="it is a mystery"></span> <span class="achievepoints-xs visible-xs">+{{achievement.type.points|number}}</span> <h3>???</h3> <p class="achievedesc">???</p> <p><em>&nbsp;</em></p> </div> </li> </ul>'),
			a.put("views/appcache-loader.html", '<!DOCTYPE html> <html manifest="/manifest.appcache"> <head> <meta charset="utf-8"> <title>appCache loader</title>  <body> <!--\n  Based on the "Offline IFRAME Hack" by the awesome Financial Times Labs team:\n  http://labs.ft.com/category/tutorial/\n-->  '),
			a.put("views/buyunit-dropdown.html", '<div class="dropdown btn-group" ng-if="isBuyButtonVisible()"> <button class="btn btn-default dropdown-toggle" data-toggle="dropdown"> <span ng-if="!unit.maxCostMet().isZero()">Buy up to {{unit.maxCostMet().times(statTwin())|bignum}}</span> <span ng-if="unit.maxCostMet().isZero()" class="disabled">Can\'t buy</span> <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu"> <li ng-if="!unit.isCostMet()" role="presentation" class="disabled"><a role="menuitem"> Can\'t buy </a></li> <li ng-if="unit.isCostMet()" role="presentation"><a role="menuitem" tabindex="-1" ng-click="buyUnit({unit:unit, num:fullnum()})" href="javascript:"> Buy {{fullnum().times(statTwin())|bignum}} </a></li> <li ng-if="is25Visible()" role="presentation"><a role="menuitem" ng-click="buyMaxUnit({unit:unit, percent:0.25})" href="javascript:"> Buy {{unit.maxCostMet(0.25).times(statTwin())|bignum}} </a></li> <li ng-if="unit.maxCostMet().greaterThan(1)" role="presentation"><a role="menuitem" ng-click="buyMaxUnit({unit:unit, percent:1})" href="javascript:"> Buy {{unit.maxCostMet().times(statTwin())|bignum}} </a></li> <li ng-repeat-start="upgrade in unit.upgrades.list | filter:filterVisible" role="presentation" class="divider"></li> <li role="presentation" class="dropdown-header titlecase">{{upgrade.type.label}}</li> <li ng-if="!upgrade.isCostMet()" role="presentation" class="disabled"><a role="menuitem"> Can\'t buy </a></li> <li ng-if="upgrade.isCostMet()" role="presentation"><a role="menuitem" tabindex="-1" ng-click="buyUpgrade({upgrade:upgrade, num:fullnum()})" href="javascript:"> Buy {{fullnum()|bignum}} </a></li> <li ng-if="is25Visible(upgrade)" role="presentation"><a role="menuitem" ng-click="buyMaxUpgrade({upgrade:upgrade, percent:0.25})" href="javascript:"> Buy {{upgrade.maxCostMet(0.25)|bignum}} </a></li> <li ng-repeat-end ng-if="upgrade.maxCostMet().greaterThan(1)" role="presentation"><a role="menuitem" ng-click="buyMaxUpgrade({upgrade:upgrade, percent:1})" href="javascript:"> Buy {{upgrade.maxCostMet()|bignum}} </a></li> </ul> </div>'),
			a.put("views/buyunit.html", '<span ng-if="isBuyButtonVisible()"> <span ng-if="fixednum"> <a ng-if="resource.isCostMet()" role="button" class="btn btn-default titlecase" ng-class="{disabled:unit.maxCostMet().lessThan(fullnum())}" ng-click="buyResource({resource:resource, num:fullnum()})"> {{verb}} {{fullnum().times(statTwin())|bignum}} {{unit.unittype.plural}} </a> </span> <div ng-if="!fixednum" class="btn-group btn-group-justified"> <a ng-if="!resource.isCostMet()" role="button" class="btn btn-default disabled"> Can\'t {{verb}} </a> <a ng-if="resource.isCostMet()" role="button" class="btn btn-default titlecase" ng-click="buyResource({resource:resource, num:fullnum()})"> {{verb}} {{fullnum().times(statTwin())|bignum}} </a> <a ng-if="is25Visible()" role="button" class="btn btn-default titlecase" ng-click="buyMaxResource({resource:resource, percent:0.25})"> {{verb}} {{resource.maxCostMet(0.25).times(statTwin())|bignum}} </a> <a ng-if="resource.maxCostMet().greaterThan(1)" role="button" class="btn btn-default titlecase" ng-click="buyMaxResource({resource:resource, percent:1})"> {{verb}} {{resource.maxCostMet().times(statTwin())|bignum}} </a> </div> </span>'),
			a.put("views/changelog.html", '<tabs></tabs> <h1>Patch Notes</h1> <p>See the <a analytics-on analytics-category="outbound" analytics-event="click" analytics-label="source code repository" target="_blank" href="https://github.com/erosson/swarm">source code repository</a> for a more thorough, but less readable, change history. {{changestats.headers.length|number}} updates released since {{changestats.firstrelease.date.format(\'YYYY/MM/DD\')}}.</p> <hr> <div ng-if="false && env.isDebugEnabled" class="well"> <p>The game has been running since {{changestats.firstrelease.date.format(\'YYYY/MM/DD\')}}, for {{changestats.days|number}} days</p> <p>All-time: {{changestats.headers.length|number}} releases, {{changestats.headers.length/changestats.days|number:2}} releases per day</p> <p>Last week: {{changestats.lastHeaders(7).length|number}} releases, {{changestats.lastHeaders(7).length/7|number:2}} releases per day</p> </div> <div class="changelog"> <!-- template\n<h4>0.0.1 <span>2009/09/09</span></h4>\n<ul>\n  <li>blah</li>\n</ul>\n--> <div class="panel-group" id="accordion"> <div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion" data-target="#changelog10x" href="javascript:"> Version 1.0.x </a> </h4> </div> <div id="changelog10x" class="panel-collapse collapse in"> <div class="panel-body"> <h4>1.0.59<span>2015/07/30</span></h4> <ul> <li>Fixed rounding errors when buying <code>@n</code> units. It should now buy that many or slightly more, but never less.</li> <li title="Mouseover text!">Added a critically import, but mildly secret, feature to inactive mutagen.</li> </ul> <h4>1.0.58<span>2015/07/05</span></h4> <ul> <li>The tooltip text for buy-exactly-n units is now more consistent.</li> <li title="Darn those \'invisible backend changes\'.">Fixed the buy-all-upgrades button.</li> </ul> <h4>1.0.57<span>2015/07/05</span></h4> <ul> <li>The options page now includes a legend for standard-decimal suffixes.</li> <li>Small update to the feedback page.</li> <li>Some invisible backend changes.</li> </ul> <h4>1.0.56<span>2015/06/06</span></h4> <ul> <li>Fixed a bug with buy-all-upgrades and upgrade notification settings.</li> </ul> <h4>1.0.55<span>2015/05/13</span></h4> <ul> <li>Fixed a minor grammar error in the swarmling description.</li> <li>"Buy all upgrades" and "buy cheapest upgrades" now use your upgrade notification settings.</li> </ul> <h4>1.0.54<span>2015/05/13</span></h4> <ul> <li>Upgrade notifiers have several new options: notify when buyable, notify at 2x cost, notify at 4x cost or never notify.</li> <li>Upgrades may now be hidden. (Mostly.)</li> <li title="Mouseover text changed too. Easy come, easy go.">Queen achievements have been changed slightly.</li> </ul> <h4>1.0.53<span>2015/05/07</span></h4> <ul> <li>Cocoons now include a buy-exact-cost link for the maximum number of larvae you can clone, similar to the Clone Larvae description.</li> <li>Fixed some bad grammar in the locust and hatchery descriptions.</li> </ul> <h4>1.0.52<span>2015/04/28</span></h4> <ul> <li>Fixed a bug involving mutagen, visibility, the undo button, and the respec button. (Really this time.)</li> <li>Added some links to the send-feedback page.</li> </ul> <h4>1.0.51<span>2015/04/28</span></h4> <ul> <li>You can now set FPS below 1.</li> <li>Fixed a bug involving mutagen, visibility, and the undo button.</li> <li>Some invisible backend changes.</li> </ul> <h4 title="What, you expected something special for the 50th update since 1.0?">1.0.50<span>2015/04/26</span></h4> <ul> <li>The "buy all upgrades" button is disabled if it would buy zero upgrades.</li> <li>Swarmwarp time-skipped now uses the same time format as the rest of the game, and respects the duration format chosen in the options screen. It shows months/years when necessary, instead of hundreds/thousands of days.</li> <li>Some invisible backend changes. The game now contacts `https://api.swarmsim.com` much more often.</li> </ul> <h4>1.0.49<span>2015/04/22</span></h4> <ul> <li>The buy-all-upgrades button is now always visible. Previously, it was visible only with show-advanced-unit-data selected in the options screen.</li> <li>Progress bar text outlining, zoomed in, looks slightly better.</li> <li>v1.0.48\'s hatched-per-second text now respects the velocity format chosen in the options screen. Thanks <a href="https://github.com/zorbathut" target="_blank">zorbathut</a>!</li> <li>Fixed a bug with some buy-n-units formats.</li> <li>Imported saved data is now better at ignoring whitespace.</li> <li>Some invisible backend changes. The game now contacts `https://api.swarmsim.com` more often.</li> </ul> <h4>1.0.48<span>2015/04/17</span></h4> <ul> <li>Swarmwarp duration can now display seconds. Thanks <a href="https://github.com/zorbathut" target="_blank">zorbathut</a>!</li> <li>"Show advanced unit data" in the options menu now shows information about how many of that unit you can hatch every second, based on your current income. Thanks <a href="https://github.com/zorbathut" target="_blank">zorbathut</a>!</li> <li>Added a reset button for the Kongregate minimum size option, and explained how it interacts with screen width.</li> <li>Some invisible backend changes.</li> </ul> <h4>1.0.47<span>2015/04/09</span></h4> <ul> <li>Improved the \'send feedback\' page.</li> <li>Made the in-game bug report page easier to find.</li> <li>Fixed a bug involving fractional creatures.</li> <li>You can now undo a mutagen respec with the undo button.</li> <li>Fixed a bug where the game wasn\'t saved after using the undo button.</li> </ul> <h4>1.0.46<span>2015/04/07</span></h4> <ul> <li>Added home screen icons for iOS/Android/Windows Metro. Thanks <a href="https://github.com/aeakett" target="_blank">aeakett</a>!</li> <li>The Cosmo, Paper, and Darkly themes now have larger progress bars with easier-to-read progress bar text.</li> <li>Kongregate players can now set a minimum size for the game in the options screen.</li> </ul> <h4><s>1.0.45<span><s>2015/04/06</s></span></s></h4> <h4>1.0.44<span>2015/04/05</span></h4> <ul> <li>Changed the server address used for Kongregate saves. No behavior changes.</li> <li>Touchscreens can now tap to see "mouseover" text. (If you don\'t have a touchscreen, or have a touchscreen but don\'t use it, nothing\'s changed.)</li> </ul> <h4>1.0.43<span>2015/04/02</span></h4> <ul> <li>The "undo" button, removed from the game months ago for technical reasons, <a href="https://imgur.com/Z1eHY3y" target="_blank">has now returned</a>. You can undo your most recent action (purchase, upgrade, ability, upgrade-all, or ascension) within 30 seconds. <ul> <li>Undo works like exporting your game before taking an action, then importing it afterward.</li> </ul></li> <li>Changed the abbreviated forms of sexagintillion ("Sx" to "Sg"), septuagintillion ("Sp" to "St"), and octogintillion ("Oc") to ("Og") - they were duplicates of sextillion, septillion, and octillion, respectively. "Sx", "Sp", and "Oc" now do what most people expect when used as input.</li> </ul> <h4>1.0.42<span>2015/04/01</span></h4> <ul> <li>Corrected the year shown in today\'s Exciting Announcement. I\'m sure it\'s correct this time. Wouldn\'t make the same mistake twice, no chance of that.</li> <li><a target="_blank" href="https://www.reddit.com/r/swarmsim/comments/310qs2/ascending_on_april_1/">Buffed mutagen.</a></li> </ul> <h4 title="Let\'s pretend that releasing .41 on 4/1 was part of my plan, and not just a coincidence.">1.0.41<span>2015/04/01</span></h4> <ul> <li>Fixed a spelling error in the buy-button verbs for bats and mutations.</li> <li>Fixed a bug that caused clone larvae to link to the wrong number of cocoons.</li> <li>Fixed a bug that caused next/previous links for territory units on small screens to display the wrong empower-level.</li> <li>Some super-secret changes.</li> </ul> <h4>1.0.40<span>2015/03/30</span></h4> <ul> <li>Fixed a bug where exact-cost links for buying a group of units often gave the wrong cost.</li> </ul> <h4>1.0.39<span>2015/03/30</span></h4> <ul> <li>Added a fancier input field for buy-exactly-N units. <ul> <li>Several new features: buy-percentage, buy-this-many-after-twins, and buy-until-this-many. Mouseover the input field for directions.</li> <li>Pressing Enter after typing a number now buys that many units, just like clicking the buy button.</li> <li>Standard-decimal suffixes, like \'10 billion\' or \'10b\', now work as input.</li> <li>Fixed a bug that limited how much you could buy at once. Numbers bigger than 1e300 (or 1e38 in Safari) work properly now.</li> <li>Fixed a bug that prevented the coefficient for numbers formatted like \'1e10\' from being anything other than 1.</li> <li>Fixed a bug that sometimes cleared numbers formatted like \'1e10\' while you typed them.</li> <li>The up/down arrows next to this input were, unfortunately, lost. No one used them anyway, right?</li> </ul></li> <li>All buy-exact-cost links use the new buy-until-this-many input format. Clicking \'buy\' twice now buys only one extra unit, and large numbers shouldn\'t have rounding errors that cause them to \'miss\' the required cost.</li> <li>Used v1.0.38\'s buy-button verbs in a few more places. Thanks <a target="_blank" href="https://github.com/0x4F72">0x4F72</a>!</li> </ul> <h4>1.0.38<span>2015/03/28</span></h4> <ul> <li>Reworded expansion achievements to clarify that they don\'t carry over between ascensions - you must have that many expansions all at once.</li> <li>Bugfix: upgrades should no longer throw errors or be \'undefined\' after using a buy-exact-cost link for a large number of units.</li> <li>Bugfix: displayed energy percentages are now rounded the same way everywhere.</li> <li>The options screen now allows you to use the old non-exact duration format ("a few seconds", etc).</li> <li>Buy buttons for units now use a more appropriate verb, instead of "buy" - drones hatch, nests build, larvae uncocoon, mutations mutate, etc.</li> </ul> <h4>1.0.37<span>2015/03/23</span></h4> <ul> <li>Importing a saved game through the options screen, importing an online save, and loading a game saved in Flash storage all show the \'welcome back\' screen.</li> <li>By popular demand, the options screen allows you to choose Swarmwarp as a velocity format. ("You produce 10 drones per second", "You produce 9,000 drones per Swarmwarp".) This format will show energy production in seconds.</li> <li>The energy tab now displays energy production correctly when no unit is selected.</li> </ul> <h4>1.0.36<span>2015/03/14</span></h4> <ul> <li>New games, where no units have been purchased, are no longer autosaved online.</li> <li>Engineering notation now works with very large numbers. Thanks <a target="_blank" href="https://github.com/Shoelace">Shoelace</a>!</li> <li>Selecting territory shows a <a target="_blank" href="https://imgur.com/5TyxGvb">territory production pie chart</a>, just in time for <span title="Missed the 1:59 release time by 10 minutes, though. Dang!">Pi Day. Thanks <a target="_blank" href="https://github.com/Shoelace">Shoelace</a>!</span></li> </ul> <h4>1.0.35<span>2015/03/12</span></h4> <ul> <li>Logging out of/importing from Dropbox works once again. (Oops.)</li> <li>Auto-export will no longer overwrite a remote save newer than your current game. "Newer" means "time of last action", so buying anything makes your game eligible for auto-export again.</li> <li>If auto-export won\'t run because nothing\'s changed or because the remote save is newer, it\'ll say so on the options screen.</li> </ul> <h4>1.0.34<span>2015/03/11</span></h4> <ul> <li>Kongregate and Dropbox automatically export an online save every 15 minutes. (Neither <i>imports</i> online saves automatically yet.) This can be disabled on the options screen.</li> <li>Dropbox\'s options screen UI has changed to be more similar to Kongregate\'s, and to be slightly more difficult to misclick.</li> </ul> <h4>1.0.33<span>2015/03/10</span></h4> <ul> <li>Some invisible backend changes.</li> </ul> <h4>1.0.32<span>2015/03/10</span></h4> <ul> <li>The anonymous feedback form works again.</li> <li>Some invisible backend changes.</li> </ul> <h4>1.0.31<span>2015/03/09</span></h4> <ul> <li>The in-game feedback page has been improved.</li> <li>The energy tab\'s percentage now updates as time passes, and matches the progress bar exactly.</li> <li>Added basic support for inserting your own graphics (and other styling) into the game through custom CSS. (No built-in graphics choices just yet.)</li> </ul> <h4>1.0.30<span>2015/03/07</span></h4> <ul> <li>Importing saved games works once again. (Oops.)</li> </ul> <h4>1.0.29<span>2015/03/07</span></h4> <ul> <li>The options screen should no longer raise a "mixed content error".</li> <li>Progress bar estimates involving meat are no longer capped at 2 years.</li> <li>Progress bar estimates many years long are now formatted nicely.</li> <li>Very long progress bar estimates involving meat are no longer "undefined".</li> <li title="Mouseover text!">Added a critically import, but mildly secret, feature that was missing from the Nexus.</li> <li>Kongregate\'s <code>autoresize</code> option should once again be stable.</li> <li>The options screen now allows you to export your game as a short url, and import by visiting that url.</li> </ul> <h4>1.0.28<span>2015/03/04</span></h4> <ul> <li>The nexus no longer has an "undefined" progress bar when you can afford to upgrade it.</li> <li>The unit velocity display ("You earn x drones per second") is no longer stuck. (This was only a display error, you didn\'t lose any production.)</li> </ul> <h4>1.0.27<span>2015/03/04</span></h4> <ul> <li>Estimated upgrade times involving units from the meat tab should now be much more accurate.</li> <li>All upgrade progress bars now display more precise estimates - "00:12:34", instead of "a few seconds". <ul><li>Thanks to <a target="_blank" href="https://github.com/Shoelace">Shoelace</a> for contributing the code for this change!</li></ul> </li> <li>Units and mutations with a maximum bonus now advertise their diminishing returns in their descriptions.</li> </ul> <h4>1.0.26<span>2015/03/02</span></h4> <ul> <li>Kongregate players now have the option to save your game online. Check out the options screen! <ul> <li>Kongregate doesn\'t sync automatically just yet - you\'ll have to go to the options menu and export/import by hand. This should be automated soon!</li> </ul></li> <li>Users of Internet Explorer 7 and 8 and earlier are now prompted to upgrade.</li> </ul> <h4>1.0.25<span>2015/03/01</span></h4> <ul> <li>Your mutagen tab should no longer mysteriously disappear. Players who\'ve ascended but lost their mutagen tab should now have it back.</li> </ul> <h4>1.0.24<span>2015/02/26</span></h4> <ul> <li>The game should now load properly on Kongregate with Flash or Kongregate\'s APIs disabled.</li> </ul> <h4>1.0.23<span>2015/02/26</span></h4> <ul> <li>Fixed a typo in the description for hatcheries.</li> <li>Added a warning to hatchery mutations about the pitfalls of spending mutagen too soon.</li> <li>Fixed a bug where predicted hatchery/expansion mutagen gains were too low. (Actual mutagen gains have not changed; this was a display error.)</li> <li>Changing the Kongregate scrolling style from autoresize to lock-mousewheel now resizes the window properly.</li> <li>Some invisible changes to how Kongregate embeds the game. Fixes some bugs around Kongregate statistics reporting and other Kongregate API use. (There is a small chance this affected Kongregate\'s scrolling behavior for some of you, though it\'s not intended to - let me know if scrolling\'s broken now.)</li> </ul> <h4>1.0.22<span>2015/02/25</span></h4> <ul> <li>After ascending for the first time, you\'ll see a tutorial message reminding you that unspent mutagen generates larvae.</li> <li>Fixed a bug that prevented mutant hatcheries from being displayed as part of the bonus multiplier on the "larva" screen. (They\'ve always correctly affected larva production; this was a display error.)</li> <li>Added more details to the description of hatcheries about larva production. It should now be easier to tell how much larvae your hatcheries are producing, compared to your mutagen.</li> </ul> <h4>1.0.21<span>2015/02/24</span></h4> <ul> <li>Added a "reset upgrade notifiers" button on the ascension screen.</li> <li>Kongregate users now have the option to lock mousewheel scrolling to the Swarm Simulator window, instead of the whole Kongregate page, while the mouse is over the game. This is still a bit experimental. You\'ll find it on the <a href="#/options">options screen</a>.</li> <li>The standalone/non-Kongregate game now has the option to sync your saved progress to a <a href="https://dropbox.com" target="_blank">Dropbox</a> account. Check out the options screen! <ul> <li>Dropbox doesn\'t sync automatically just yet - you\'ll have to go to the options menu and export/import by hand. This should be automated soon!</li> <li>Kongregate users - I\'m working on another form of online syncing for you, too. Patience! (Kongregate\'s terms won\'t let me show you Dropbox\'s login screen; sorry.)</li> <li>Thanks to <a target="_blank" href="https://github.com/Shoelace">Shoelace</a> for <a target="_blank" href="https://github.com/erosson/swarm/issues/164">contributing this code</a>!</li> </ul> </li> </ul> <h4>1.0.20<span>2015/02/23</span></h4> <ul> <li>Saved data is now stored in three places - browser localstorage, browser cookies, and Flash storage. This should make it harder to accidentally lose your save.</li> <li>The buy-dropdowns available with no unit selected no longer cause a scrollbar to appear.</li> <li>The progress bar at the top of the achievements screen works again.</li> <li>By popular demand, the achievements screen can now be sorted by percent completed.</li> </ul> <h4>1.0.19<span>2015/02/22</span></h4> <ul> <li>The list of themes now has a scrollbar.</li> <li>Themes are now hosted on the same server as the game - your browser is less likely to have them blocked.</li> </ul> <h4>1.0.18<span>2015/02/21</span></h4> <ul> <li>The patch notes page now displays how many times the game\'s been updated.</li> <li>You can now choose from a list of color themes from <a href="http://bootswatch.com/" target="_blank">http://bootswatch.com/</a>. <ul> <li>If you were using the dark/inverted theme before, it\'s been removed. You\'re now using the (far less buggy) <a href="http://bootswatch.com/slate" target="_blank">slate theme</a>. You might also like <a href="http://bootswatch.com/cyborg" target="_blank">cyborg</a> or <a href="http://bootswatch.com/darkly" target="_blank">darkly</a>.</li> <li>Designers: you can set a URL for your own custom theme (CSS file). <a href="#/contact">Contact me</a> if you come up with something cool, and I might add it to the game!</li> </ul></li> </ul> <h4>1.0.17<span>2015/02/20</span></h4> <ul> <li>Progress bars are now displayed correctly in Internet Explorer.</li> </ul> <h4>1.0.16<span>2015/02/20</span></h4> <ul> <li>Fixed ascension cost progress bar estimates better than in v1.0.14.</li> <li>Removed the link to a very old version of the game from the options menu.</li> <li>You can now <a href="#/cleartheme">disable the experimental dark theme with this link</a> if it\'s not working properly.</li> </ul> <h4>1.0.15<span>2015/02/19</span></h4> <ul> <li>Setting "velocity format" in the options screen works once again.</li> <li>The autoresize scroll option now works properly after reloading the page.</li> </ul> <h4>1.0.14<span>2015/02/19</span></h4> <ul> <li>Kongregate users can now find an option to use v1.0.11\'s autoresizing on the options screen.</li> <li>Fixed a bug that prevented estimated time from appearing on the ascension cost progress bar.</li> <li>The ascension cost progress bar now shows a more precise estimated time. (Other progress bars will get this soon; patience!)</li> <li>Experimental dark color themes for select web browsers are now available in the options menu. The old way of temporarily accessing these themes has been removed.</li> </ul> <h4>1.0.13<span>2015/02/18</span></h4> <ul> <li>Errors reading and writing to localstorage (perhaps because third-party cookies are blocked for a Kongregate user) now display a proper error message, instead of a blank screen.</li> <li>Swarmwarp now specifies that it doesn\'t generate energy.</li> </ul> <h4>1.0.12<span>2015/02/18</span></h4> <ul> <li>Removed the Kongregate resizing added in the last update.</li> </ul> <h4>1.0.11<span>2015/02/18</span></h4> <ul> <li>Mousewheel scrolling on Kongregate should now be less painful. The game should resize itself as needed to avoid double-scrollbars.</li> <li>The checkboxes on the achievement screen are now saved across page refreshes.</li> <li>Your last ascension date/time is now recorded, and visible in the statistics screen. If you\'ve already ascended, this date will be wrong until your next ascension - sorry!</li> <li>There\'s now a guaranteed mutagen spawn every 8 hatcheries or expansions. This is intended to help out players who\'ve had bad luck with their mutagen spawn rates.</li> <li>Fixed a bug with mutagen spawn calculations. Your saved game\'s random mutagen spawns are different than they were in v1.0.10.</li> </ul> <h4>1.0.10<span>2015/02/17</span></h4> <ul> <li>Fixed missing unit descriptions.</li> </ul> <h4>1.0.9<span>2015/02/17</span></h4> <ul> <li>Fixed the description of the "Power Overwhelming" achievement - it now correctly says 5 nexus are required, not one. (The achievement "Phenomenal Cosmic Power" is already awarded for one nexus.)</li> <li>Kongregate now has a high score list for best time, in minutes, to build your 5th nexus.</li> </ul> <h4>1.0.8<span>2015/02/15</span></h4> <ul> <li>Fixed a bug where simply viewing some types of units would log many errors.</li> <li>Fixed a bug that displayed a description of "undefined" for some achievements.</li> <li>Fixed a bug that sometimes caused problems when buying your first nexus.</li> <li>Preparing to release the game on Kongregate. (No visible changes.)</li> </ul> <h4>1.0.7<span>2015/02/15</span></h4> <ul> <li>You can now ignore upgrade notifiers <span class="glyphicon glyphicon-circle-arrow-up"></span> using the checkbox <input type="checkbox" checked> next to each upgrade. Viewing an upgrade no longer causes its upgrade notifier to disappear. This new setting\'s saved when closing the browser or refreshing the page.</li> </ul> <h4>1.0.6<span>2015/02/15</span></h4> <ul> <li>Fixed a bug related to getting the public test achievement.</li> </ul> <h4>1.0.5<span>2015/02/15</span></h4> <ul> <li>The achievement earned for helping on public test is now worth no points.</li> <li>Achievements worth no points no longer display "+0 points", and aren\'t visible in the achievements list unless you\'ve earned them.</li> <li>Numbers in achievement descriptions now use the number format you\'ve selected in the options screen.</li> <li>Fixed a crash that sometimes occurred when calculating upgrade costs.</li> <li>Changes to the contact-the-developer link: <ul> <li>Fixed a bug that prevented saved data from being properly sent with all messages. Saved games are now included as shortened URLs.</li> <li>Instead of one form, there\'s now a "contact" page with three links: Reddit PM, email, or the anonymous feedback form. All of these include debug information for bug reports.</li> <li>Removed the Reddit-username-or-email field from the anonymous feedback form, since you can now contact the developer directly by Reddit or email.</li> </ul></li> </ul> <h4>1.0.4<span>2015/02/13</span></h4> <ul> <li>Long swarmwarp durations are now formatted with hours and days, not just minutes.</li> <li>Fixed a bug with very expensive unit/upgrade purchases that would sometimes enable the buy button when you didn\'t have quite enough resources to actually buy.</li> <li>Ascensions are now tracked on the statistics screen. (Your first ascension date is probably wrong because ascension dates/times weren\'t tracked before now - sorry!)</li> </ul> <h4>1.0.3<span>2015/02/12</span></h4> <ul> <li>When you reopen the game after being away for more than a few minutes, you\'ll see a "welcome back" screen that says how long you were away and how much your swarm produced.</li> </ul> <h4>1.0.2<span>2015/02/11</span></h4> <ul> <li>Fixed a misspeeled achievement.</li> <li>When you haven\'t yet spent any mutagen, the mutagen respec buttons are now visible, but disabled. Previously they weren\'t visible.</li> <li title="They have mouseover text now!">Added a critically important secret that was missing from most of v1.0\'s new units.</li> <li>The achievement for helping on the test server is now awarded if you ascended before the game was reset in v1.0.0-publictest9.</li> </ul> <h4>1.0.1<span>2015/02/10</span></h4> <ul> <li>Importing certain saved games from the test server should no longer work.</li> </ul> <h4>1.0.0 - <a href="https://www.reddit.com/r/swarmsim/comments/2vhiwp/v10_mutation_prestige_new_units_bigger_numbers_no/">release announcement</a><span>2015/02/10</span></h4> <ul> <li>Removed the "we\'re testing, your progress may be reset" warning. Version 1.0 means no more (intentional) resets, ever.</li> <li>The meat tab looks different. Late game units have been renamed, and there\'s several new units.</li> <li>Added <b>mutation</b>, a soft-reset/prestige system. <ul> <li>After your 80th expansion or 40th hatchery, building more expansions/hatcheries may, at random, provide some <b>mutagen</b>. <ul><li>If you\'ve already built more than 40 hatcheries or 80 expansions, you should have automatically received mutagen for building them.</li></ul> </li> <li>Mutagen starts off inactive. To activate your mutagen, you must <b>ascend</b> - travel through space to a new world with only a few mutagen-enhanced larvae.</li> <li>Ascension requires a large amount of energy and a mature swarm. (You can\'t reset as fast as lots of other games.)</li> <li>There are several interesting mutations you can choose to unlock with your mutagen. Unlocking any one type of mutation increases the cost to unlock others. Plan carefully which ones you want first!</li> <li>If you\'d like to try a different mutation strategy, you may <b>respec</b> to remove all mutations and restore all the mutagen you\'ve spent. You have a limited number of free respecs, and you can pay energy to respec more frequently.</li> </ul></li> <li>Several changes to existing units and abilities. <ul> <li>Swarmwarp now costs much less energy, but no longer restores energy.</li> <li>Bats now cost 100 energy. Previously they cost 10 lepidoptera - same energy required per bat, but it\'s now harder to accidentally spend all your lepidoptera.</li> <li>Nightbugs now increase max energy by up to x6 instead of x4.</li> <li>Expansions now display their total percentage with condensed numbers.</li> </ul></li> <li>Large numbers of units are handled better: it\'s now possible to produce up to 1e100,000 meat, or any other unit. (Units are no longer limited by Javascript\'s usual maximum of 1.7e308.) At that point, you\'ll simply stop producing meat, instead of receiving buggy "infinite" meat.</li> <li>"Buy all upgrades" moved into the "more..." menu, instead of its own menu/tab. It no longer buys meat-tab twin upgrades.</li> <li>Added an option to format numbers with engineering notation. Thanks to <a target="_blank" href="https://github.com/Shoelace">Shoelace</a> for <a target="_blank" href="https://github.com/erosson/swarm/issues/247">contributing this code</a>!</li> <li>Anonymous feedback form should work more reliably, even with very long save files.</li> <li>The buy-N-units input field now suports scientific-e notation, and allows buying more than 1e21 units at once.</li> <li>Added an achievement for everyone who\'s helped test v1.0. Your game on <a href="https://swarmsim.github.io">the production server</a> should receive the achievement automatically if you\'ve ascended at least once on <a href="https://swarmsim-publictest.github.io">the test server</a>.</li> </ul> </div> </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion" data-target="#changelog10xpublictest" href="javascript:"> Version 1.0.x, public test </a> </h4> </div> <div id="changelog10xpublictest" class="panel-collapse collapse"> <div class="panel-body"> <h4>1.0.0-publictest29<span>2015/02/15</span></h4> <ul> <li>Created a button to award the publictest achievement. It\'s still awarded automatically, but this helps players with a web browser that doesn\'t allow it.</li> </ul> <h4>1.0.0-publictest28<span>2015/02/11</span></h4> <ul> <li>The achievement for helping on publictest is now awarded if you ascended before the game was reset in v1.0.0-publictest9.</li> <li>Updated offline-screen text: 1.0\'s out now, not "soon."</li> </ul> <h4>1.0.0-publictest27<span>2015/02/10</span></h4> <ul> <li>Updated the previous changelog entry to mention the new achievement.</li> <li>Disabled all UI. Full 1.0 release is coming. Thanks for all your help testing things!</li> </ul> <h4>1.0.0-publictest26<span>2015/02/09</span></h4> <ul> <li>Empowered units beyond level 20 now have their name formatted correctly.</li> <li>Meat mutation now has different effects on different units. It\'s a little more powerful for units earlier than hives, but becomes substantially less powerful for later units.</li> <li>The meat limit has been raised to 1e100,000.</li> <li>Added a few more meat-producing units.</li> <li>Twin costs for very advanced units have increased.</li> <li>A few invisible changes to prepare for the v1.0 release.</li> <li>Added an achievement for everyone who\'s helped test v1.0. After v1.0 is released, your game on <a href="https://swarmsim.github.io">the production server</a> should receive the achievement automatically if you\'ve ascended at least once on <a href="https://swarmsim-publictest.github.io">the test server</a>.</li> </ul> <h4>1.0.0-publictest25<span>2015/02/05</span></h4> <ul> <li>Fixed a typo in Mutation Frequency\'s description.</li> <li>Bugfix: mutant lepidoptera now increase maximum energy, as advertised.</li> <li>Bugfix: meat tab is selected by default, not mutagen.</li> <li>Bugfix: the buy-N-units input once again updates costs every time you press a key.</li> <li>Once mutagen is visible, hatcheries/expansions now show the minimum number required to earn mutagen.</li> </ul> <h4>1.0.0-publictest24<span>2015/02/05</span></h4> <ul> <li>Bugfix: mutagen respecs no longer reduce your current energy/meat/territory.</li> <li>Mutagen respecs have been redesigned. Respeccing now refunds 100% of your mutagen, but requires a fraction of your next ascension\'s energy cost, <i>and</i> resets your next ascension\'s energy cost (that is, sets your energy-spent for this ascension to 0). You may respec with no penalty 4 times, and gain 1 more free respec every three times you ascend. <ul> <li>Respeccing was intended to be a rarely-used way to correct mistakes or try a new mutation strategy, not something done multiple times per ascension to exploit specific mutations. The original cost of respeccing was a mistake; the cost was much too low to limit respec usage.</li> </ul></li> <li>The buy-N-units input field now suports scientific-e notation, and allows buying more than 1e21 units at once.</li> <li>Exact-cost links no longer round costs, and should now always cover the full cost of expensive upgrades. (Really this time.)</li> </ul> <h4>1.0.0-publictest23<span>2015/02/03</span></h4> <ul> <li>Bugfix: hatcheries and expansions once again display estimated mutagen rewards.</li> </ul> <h4>1.0.0-publictest22<span>2015/02/02</span></h4> <ul> <li>Fixed a bug that made lepidoptera additive with mutant lepidoptera, instead of multiplicative. Players with both will earn more energy now.</li> </ul> <h4>1.0.0-publictest21<span>2015/02/02</span></h4> <ul> <!--li>You\'ll now see a "welcome back" screen when you open the game, showing how long you were away and your swarm\'s production during that time.</li--> <li>The meat limit has been raised to 1e1000.</li> <li>Mutant lepidoptera now increase the energy cost of ascending. (More precisely, they decrease the effect of spending energy has on decreasing ascension cost.) <ul> <li>This mutation was speeding up ascensions a bit too much. Paying for an ascension is still quicker with this mutation than without it, but not by quite so much.</li> </ul></li> <li>Ascension cost increases by 12% per ascension, down from 20%.</li> <li>Meta-mutation is about 35% less effective.</li> <li>Meat rush and territory rush mutations are about 4 times stronger. (Larvae rush is unchanged.)</li> <li>Hatcheries grant slightly more mutagen than before.</li> <li>Expansions 40 to 79 no longer grant mutagen. The mutagen tab now appears at 80 expansions or 40 hatcheries, whichever comes first; instead of 40 expansions. <ul> <li>In a new game, mutagen became visible long before you could do anything with it. Timing should now be more appropriate. This change isn\'t intended to be a nerf; early expansions never gave much mutagen anyway.</li> </ul></li> </ul> <h4>1.0.0-publictest20<span title="rabbit rabbit">2015/02/01</span></h4> <ul> <li>It\'s no longer possible to crash the game by buying millions of upgrades at once.</li> <li>Exact-cost links now always round up whenever rounding is necessary; they should now always cover an upgrade\'s full cost.</li> </ul> <h4>1.0.0-publictest19<span>2015/01/31</span></h4> <ul> <li>Numbers throughout the game are always rounded down now. No more numbers formatted like "1.00e+3M".</li> <li>The unit limit has been raised from 1e300 to 1e400. (Units can exceed Javascript\'s normal maximum for the first time.)</li> <li>There\'s now some tutorial text when you first unlock mutagen.</li> </ul> <h4>1.0.0-publictest18<span>2015/01/31</span></h4> <ul> <li>The cocoons link in Clone Larvae\'s description now works properly.</li> <li>Ascension should no longer be disabled when you have enough energy.</li> <li>Importing v0.2 games should work again.</li> <li>Anonymous feedback form should work more reliably, even with very long save files.</li> <li>Using swarmwarp and immediately reloading the page should no longer result in negative energy.</li> </ul> <h4>1.0.0-publictest17<span>2015/01/30</span></h4> <ul> <li>Swarmwarp should now work properly.</li> <li>Available upgrades are updated slightly less often, but the game should run faster now.</li> <li>Added an option for engineering notation. Thanks to <a target="_blank" href="https://github.com/Shoelace">Shoelace</a> for <a target="_blank" href="https://github.com/erosson/swarm/issues/247">contributing this code</a>.</li> </ul> <h4>1.0.0-publictest16<span>2015/01/30</span></h4> <ul> <li>Ascending works once again.</li> <li>Buying large numbers of units with buy-exact-cost links or with the buy-exactly-n field work again.</li> <li>Units-bought are tracked properly for achievements once again.</li> </ul> <h4>1.0.0-publictest15<span>2015/01/29</span></h4> <ul> <li>Lots of invisible backend changes; preparing to remove the 1e300 meat limit. High risk of something breaking in this version - if you find bugs, or the game runs much slower than before, <a target="_blank" ng-href="#/contact">please let me know</a>. (The meat limit has <i>not</i> been removed yet.)</li> <li>Saved games should now load properly in all browsers.</li> </ul> <h4><s>1.0.0-publictest14</s><span><s>2015/01/29</s></span></h4> <h4>1.0.0-publictest13<span>2015/01/29</span></h4> <ul> <li>Ascending initially costs much more energy, but the cost drops much faster as you spend energy. This change should reduce the need to hoard energy for a long time before ascending.</li> <li>The cost of ascending now increases every time you ascend.</li> <li>"Upgrade all" no longer buys meat-tab twin upgrades or mutagen unlock upgrades.</li> <li>Unspent mutagen no longer produces meat. (It still produces larvae.)</li> <li>Some invisible backend changes.</li> </ul> <h4>1.0.0-publictest12<span>2015/01/24</span></h4> <ul> <li>Expansions now display their total percentage with condensed numbers.</li> <li>Ascension achievements now properly display a progress bar and progress percentage.</li> <li>The Clone Larvae description now has a link to preserve exactly your maximum cloneable as cocoons, similar to the exact-cost links found for upgrades.</li> <li>Upgrades that cost larvae no longer have a buy-exact-cost link for larvae before cocoons are available.</li> <li>Added a new secret.</li> </ul> <h4 title="also, celebrated programmer\'s birthday">1.0.0-publictest11 <span>2015/1/23</span></h4> <ul title="also, celebrated programmer\'s birthday"> <li>Merged change from 0.2.26: Added \'velocity format\' to the options menu. Units gained per second may instead be shown per-minute, per-hour, or per-day.</li> </ul> <h4>1.0.0-publictest10<span>2015/01/21</span></h4> <ul> <li>Unlocking mutations now works reliably.</li> <li>The game now saves/reloads reliably. (You might have lost progress since the last version. Sorry!)</li> </ul> <h4>1.0.0-publictest9<span>2015/01/21</span></h4> <ul> <li><b><a href="https://www.reddit.com/r/swarmsim/comments/2t5m25/v100publictest8_test_server_resetting_soon/">Your progress has been reset!</a></b></li> <li>All twin upgrades and achievements now use the correct unit names.</li> <li>Lots of new achievements are now available. You should see achievements for all new units, ascending, and unlocking mutations.</li> <li>Queens and nests are visible immediately after ascending.</li> </ul> <h4>1.0.0-publictest8<span>2015/01/21</span></h4> <ul> <li>Fixed a bug where mutagen-unlock costs were displayed too low.</li> <li>Mutagen gains increased, but mutation unlock costs also increased.</li> <ul> <li>The intent is to make it more difficult to unlock every type of mutation. Your first 2-3 mutations require fewer hatcheries/expansions now, but everything past that requires more.</li> </ul> <li>Reduced random range for amount of mutagen gained. The expected amount of mutagen for building an expansion will always be greater than the amount for the previous expansion.</li> <li>Nightbugs now increase max energy by up to x6 instead of x4.</li> <li>Mutant lepidoptera now increase both max energy and energy regeneration.</li> <li>Unused mutagen now produces the correct/advertised amount of larvae, instead of 10x that.</li> <li>Mutagen text for hatcheries and expansions now names the correct upgrade.</li> </ul> <h4>1.0.0-publictest7<span>2015/01/19</span></h4> <ul> <li>Merged bugfix from 0.2.25: Fixed a bug that made it possible to buy more than 5 levels of Accomplished Ancestry upgrades.</li> </ul> <h4>1.0.0-publictest6<span>2015/01/19</span></h4> <ul> <li>All 0.2.x saves with the required 40 expansions now properly award mutagen when imported. If yours didn\'t, try again.</li> </ul> <h4>1.0.0-publictest5<span>2015/01/19</span></h4> <ul> <li>"Buy all upgrades" moved into the "more..." menu, instead of its own menu/tab</li> <li>The "mutant lepidoptera" upgrade now has the correct name</li> <li>The 1e300 unit cap is more thorough now</li> <li>Updated the description of bats to reflect their cost change</li> </ul> <h4>1.0.0-publictest4 - <a href="https://www.reddit.com/r/swarmsim/comments/2ssnw5/help_test_v10_mutation_and_new_units/">release announcement</a><span>2015/01/17</span></h4> <ul> <li>0.2.x saves no longer need to refresh the page to get their mutagen</li> <li>One new mutation; several rebalanced mutations</li> </ul> <h4>1.0.0-publictest3<span>2015/01/17</span></h4> <ul> <li>The \'ascend\' button works again</li> <li>Infinity meat is no longer possible; there\'s now a cap of 1e300</li> <li>Importing a mutagen-less 0.2.x save and reloading the page now awards you mutagen for the expansions/hatcheries you\'ve already bought</li> </ul> <h4>1.0.0-publictest2<span>2015/01/14</span></h4> <ul> <li>Opened <a href="http://swarmsim-publictest.github.io">http://swarmsim-publictest.github.io</a>. Break things!</li> <li>The meat tab looks different. Late game units have been renamed, and there\'s several new units.</li> <li>Added <b>mutation</b>, a soft-reset/prestige system. <ul> <li>After your 40th expansion or hatchery, building more expansions/hatcheries may, at random, provide some <b>mutagen</b>.</li> <li>Mutagen starts off inactive. To activate your mutagen, you must <b>ascend</b> - travel through space to a new world with only a few mutagen-enhanced larvae.</li> <li>Ascension requires a large amount of energy and a mature swarm. (You can\'t reset as fast as lots of other games.)</li> <li>There are several interesting mutations you can choose to unlock with your mutagen. Unlocking any one type of mutation increases the cost to unlock others. Plan carefully which ones you want first!</li> <li>If you\'d like to try a different mutation strategy, you may <b>respec</b> to remove all mutations and restore 70% of all the mutagen you\'ve spent.</li> </ul></li> <li>Swarmwarp now costs much less energy, but no longer restores energy.</li> <li>Bats now cost 100 energy. Previously they cost 10 lepidoptera - same energy required per bat, but it\'s now harder to accidentally spend all your lepidoptera.</li> </ul> </div> </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion" data-target="#changelog02x" href="javascript:"> Version 0.2.x </a> </h4> </div> <div id="changelog02x" class="panel-collapse collapse"> <div class="panel-body"> <h4 title="also, celebrated programmer\'s birthday">0.2.26 <span>2015/1/23</span></h4> <ul title="also, celebrated programmer\'s birthday"> <li>Added \'velocity format\' to the options menu. Units gained per second may instead be shown per-minute, per-hour, or per-day.</li> </ul> <h4>0.2.25 <span>2015/1/19</span></h4> <ul> <li>Fixed a bug that made it possible to buy more than 5 levels of Accomplished Ancestry upgrades.</li> </ul> <h4>0.2.24 <span>2015/1/10</span></h4> <ul> <li>"Buy all upgrades" button.</li> </ul> <h4>0.2.23 <span>2014/12/11</span></h4> <ul> <li>Wasp achievements are no longer named after bees. (Switched achievement names with stingers.) Thanks /u/umbrot.</li> </ul> <h4>0.2.22 <span>2014/12/2</span></h4> <ul> <li>Cost links now work for very large numbers. (That is, <code>?twinnum=...</code> works for numbers formatted like <code>1e+21</code>.)</li> </ul> <h4>0.2.21 <span>2014/11/10</span></h4> <ul> <li>Fixed another memory leak. If you\'re still seeing the game crash your browser, <a target="_blank" ng-href="#/contact">please let me know</a>.</li> </ul> <h4>0.2.20 <span>2014/11/09</span></h4> <ul> <li>Fixed a bug with "next upgrade costs" links. They should now be links much more often, and mocking grey text much less often.</li> </ul> <h4>0.2.19 <span>2014/11/09</span></h4> <ul> <li>Added an option for old-style hybrid number formatting.</li> </ul> <h4>0.2.18 <span>2014/11/02</span></h4> <ul> <li>Some invisible backend changes. Nothing to see here.</li> </ul> <h4>0.2.17 <span>2014/11/02</span></h4> <ul> <li>Abbreviated numbers bigger than decillions no longer fall back to exponential format.</li> <li>Some preparation for a future release.</li> <li>Added some new units in the meat tab for very advanced players.</li> </ul> <h4>0.2.16 <span>2014/10/20</span></h4> <ul> <li>Removed 0.2.15\'s undo button. It\'ll be back once lag associated with it is resolved.</li> </ul> <h4>0.2.15 <span>2014/10/19</span></h4> <ul> <li>After buying something, an \'undo\' button is available for a few seconds.</li> </ul> <h4>0.2.14 <span>2014/10/13</span></h4> <ul> <li>Some invisible backend changes. Nothing to see here.</li> </ul> <h4>0.2.13 <span>2014/10/8</span></h4> <ul> <li>The statistics screen works again.</li> <li>Fixed a possible memory leak. If you\'re still seeing the game crash your browser, <a target="_blank" ng-href="#/contact">please let me know</a>.</li> </ul> <h4>0.2.12 <span>2014/10/7</span></h4> <ul> <li>Upgrade progress bars now estimate how long the wait is before you can afford the next upgrade.</li> <li>Progress bars at low percentages should now be easier to read.</li> </ul> <h4>0.2.11 <span>2014/10/5</span></h4> <ul> <li>Nexus purchases should work properly again.</li> </ul> <h4>0.2.10 <span>2014/10/5</span></h4> <ul> <li>Temporarily disabled the display of bat bonuses next to each energy ability. (Shouldn\'t have tried to rush that part.)</li> </ul> <h4>0.2.9 <span>2014/10/5</span></h4> <ul> <li>New ability: <b>Swarmwarp</b>. Travel through time, instantly gaining 15 minutes\' worth of production.</li> <li>New unit: <b>Bat</b>. Increases the power of all energy-based abilities.</li> <li>The description for each new energy-tab unit now specifies its maximum effect.</li> </ul> <h4>0.2.8 <span>2014/10/4</span></h4> <ul> <li>Fixed a speling erorr in an achievement.</li> <li>Fixed several links on small screens and in the tutorial.</li> <li>Minor footer restyling.</li> </ul> <h4>0.2.7 <span>2014/10/3</span></h4> <ul> <li>Progress bars now have numbers again. Oops.</li> </ul> <h4>0.2.6 <span>2014/10/3</span></h4> <ul> <li>Energy income is now properly shown when no unit is selected.</li> <li>Achievements now have progress bars.</li> <li>Importing an exported game no longer complains of an error.</li> <li>Remove the front page link to 0.1.x. It\'s still available in the options menu.</li> </ul> <h4>0.2.5 <span>2014/10/2</span></h4> <ul> <li>The feedback form in the menu works again. Oops.</li> <li>Progress bars should now round numbers correctly.</li> </ul> <h4>0.2.4 <span>2014/10/1</span></h4> <ul> <li>New Energy unit: <b>Nightbug</b>. Increases maximum energy storage.</li> <li>New Energy unit: <b>Lepidoptera</b>. Increases energy generated per second.</li> <li>Changed how larvae production is displayed.</li> </ul> <h4>0.2.3 <span>2014/09/29</span></h4> <ul> <li>Empowered units now appear at the top of the unit list. The intent here is to keep the units you\'re most likely interested in near the top, but if having the order change on you is annoying, complain loudly and I\'ll consider changing it back.</li> <li>More digits are shown for long-formatted numbers ("1.23456 million", not "1.23m")</li> <li>The game should load slightly faster/more reliably.</li> <li>Selecting an invalid tab/unit is a little less broken.</li> </ul> <h4>0.2.2 <span>2014/09/28</span></h4> <ul> <li>Fixed memory leak: you should no longer need to periodically refresh the game.</li> <li>Added poorly-supported inverted color schemes for <a target="_blank" href="#?theme=dark-chrome">Chrome</a> and <a target="_blank" href="#?theme=dark-ff">Firefox</a>.</li> </ul> <h4>0.2.1 <span>2014/09/27</span></h4> <ul> <li>Earning an achievement now correctly updates larvae/sec.</li> </ul> <h4>0.2.0 - <a href="https://www.reddit.com/r/swarmsim/comments/2hb0lv/020_reset_and_release_date_friday_september_26/">release announcement</a><span>2014/09/26</span></h4> <ul> <li><b>Full Reset</b> - everyone\'s game has been restarted. If you like, <a href="archive/0.1.37">you may continue to play your 0.1.x save for a while longer here</a>, but you won\'t get any new features.</li> <li><b><a href="https://www.reddit.com/r/swarmsim/comments/2frtef/upcoming_inject_larvae_changes_cost_no_longer/">Energy</a></b> - buy your first nexus for 3.3 trillion meat to begin generating energy. Energy is used for special abilities. <ul> <li>Inject Larvae has been renamed to Clone Larvae, now costs energy, no longer increases in cost, requires 4 nexus to cast, and has a cap based on your larvae gained per second.</li> <li>There are several other new energy-based abilities which generate meat, larvae, and territory quickly.</li> <li>Cocooning is no longer available until Clone Larvae is unlocked, and its description is now clearer about how it\'s used.</li> </ul> </li> <li><b><a href="https://www.reddit.com/r/swarmsim/comments/2gu9py/upcoming_020_changes_empowered_military_units/">Empowered Military Units</a></b> - you can now upgrade your territory-generating units to a higher tier, increasing both their cost and territory gains and adding a suffix to their name. A tier 2 swarmling - Swarmling II - is more expensive, and stronger, than the final unupgraded military unit. <ul> <li>Cost, and territory per second, for unupgraded military units have both been increased.</li> <li>Expansions are much more expensive.</li> <li>Hatcheries are cheaper.</li> <li>Accomplished Ancestry (larvae from achievements) now has a territory cost, but can be upgraded up to 5 times.</li> </ul> </li> <li>Meat-generating units no longer cost territory.</li> <li>Changed twin upgrade costs for meat-generating units.</li> <li>The last meat-generating unit is a little more expensive.</li> <li>Unit/upgrade costs, whenever possible, now include a link to buy the exact number of missing units. Due to twin upgrade cost changes, the button added for this in 0.1.36 is gone.</li> </ul> </div> </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion" data-target="#changelog01x" href="javascript:"> Version 0.1.x </a> </h4> </div> <div id="changelog01x" class="panel-collapse collapse"> <div class="panel-body"> <h4>0.1.37 <span>2014/09/25</span></h4> <ul> <li>Minor tutorial text update.</li> <li>Options menu layout changes.</li> <li>0.2.0 prep.</li> </ul> <h4>0.1.36 <span>2014/09/24</span></h4> <ul> <li>Several achievements now require the correct unit count.</li> <li>There\'s now a button to buy exactly the number of units needed for twin upgrades.</li> </ul> <h4>0.1.35 <span>2014/09/23</span></h4> <ul> <li><a target="_blank" href="https://www.reddit.com/r/swarmsim/comments/2hb0lv/020_reset_and_release_date_friday_september_26/">v0.2.0 announcement.</a></li> </ul> <h4>0.1.34 <span>2014/09/23</span></h4> <ul> <li>Title bar icon now shows how many upgrades <span class="glyphicon glyphicon-circle-arrow-up"></span> are waiting.</li> <li>Upgrades now have a progress bar showing how soon you\'ll be able to buy the next upgrade.</li> <li>More preparation for 0.2.0. Getting close!</li> </ul> <h4>0.1.33 <span>2014/09/21</span></h4> <ul> <li>More preparation for 0.2.0\'s launch. Nothing to see yet.</li> </ul> <h4>0.1.32 <span>2014/09/19</span></h4> <ul> <li>Better savestate recovery if another accidental reset happens. <a target="_blank" href="https://www.reddit.com/r/swarmsim/comments/2gupcf/0130_deleted_my_save/ckn9hxi">Read more here</a>.</li> </ul> <h4>0.1.31 <span>2014/09/19</span></h4> <ul> <li>0.1.29 save files work again. Ooops. Unfortunately, if you\'ve bought anything in 0.1.30 your save is gone and unrecoverable - huge mistake on my part, sorry, the reset wasn\'t supposed to happen yet.</li> </ul> <h4>0.1.30 <span>2014/09/18</span></h4> <ul> <li>Minor sidebar formatting fix.</li> <li>Lots more invisible 0.2.0 preparation.</li> </ul> <h4>0.1.29 <span>2014/09/17</span></h4> <ul> <li>Inject Larvae now displays how many larvae will be cloned.</li> <li>Lots of invisible 0.2.0 preparation.</li> </ul> <h4>0.1.28 <span>2014/09/16</span></h4> <ul> <li>Units now have a \'close\' button, to deselect.</li> <li>Invisible backend change, nothing to see here.</li> </ul> <h4>0.1.27 <span>2014/09/16</span></h4> <ul> <li>The options menu allows you to always show numbers in scientific-E notation (like 1.23e8).</li> </ul> <h4>0.1.26 <span>2014/09/15</span></h4> <ul> <li>A few invisible backend changes. Preparing for 0.2.0.</li> <li>Buttons are now clickable on small screens again. Oops.</li> <li>0.1.19 link/warning is gone.</li> <li>Tabs remember their last selected unit.</li> </ul> <h4>0.1.25 <span>2014/09/14</span></h4> <ul> <li>Adjusted a late-game upgrade\'s visibility.</li> <li>Minor export format change.</li> <li>Minor sidebar formatting changes.</li> <li>Bigger clickable area to select a unit.</li> <li>Larva upgrades should now properly appear in their dropdown.</li> <li>Unlocking a new upgrade (for example, buying a nest to unlock twin queens) now makes the upgrade indicator appear properly.</li> </ul> <h4>0.1.24 <span>2014/09/14</span></h4> <ul> <li>Removed 0.1.22\'s grid UI.</li> <li>Wide screens are wider.</li> <li>Another UI overhaul: tabbed sidebar. We\'re getting closer to something I\'m happy with; the UI should be more stable soon - thanks for being patient.</li> <li>If you love scrolling, enable "advanced unit data" in options and look for the all-units tab in the menu.</li> </ul> <h4>0.1.23 <span>2014/09/13</span></h4> <ul> <li>Selecting a unit now continues to show that tab\'s unit table, instead of next/previous navigation.</li> <li>Unit selection no longer tries to fill the entire screen. (Oops.)</li> </ul> <h4>0.1.22 <span>2014/09/12</span></h4> <ul> <li>Added an <a href="#/maingrid">experimental, unpolished new(er) interface</a>. Let me know what you think of it - it might replace tabs.</li> </ul> <h4>0.1.21 <span>2014/09/12</span></h4> <ul> <li>Removed swipe navigation - no more accidentally moving to a different unit because you moved the mouse wrong.</li> <li>You\'ll now see an indicator <span class="glyphicon glyphicon-circle-arrow-up"></span> when you can afford a new upgrade. It should be hidden for unwanted upgrades - looking at a unit/buy-dropdown without buying an available upgrade will make the indicator for that type of upgrade disappear.</li> <li>Reformatted tables a bit.</li> </ul> <h4>0.1.20 <span>2014/09/11</span></h4> <ul> <li>New UI! Units are now grouped into tabs instead of one long sidebar, among other changes.</li> </ul> <h4>0.1.19 <span>2014/09/10</span></h4> <ul> <li>Fixed a bug with larva visibility.</li> <li>Altered some early units\' visibility to better match the tutorial text.</li> </ul> <h4>0.1.18 <span>2014/09/08</span></h4> <ul> <li>Some achievements are unmasked as you get closer to completing them.</li> <li>Fixed achievement link color.</li> <li>Masked achievements ("???") can now be shown/hidden.</li> </ul> <h4>0.1.17 <span>2014/09/07</span></h4> <ul> <li>Achievements!</li> <li>Added some missing unit descriptions.</li> </ul> <h4>0.1.16 <span>2014/09/05</span></h4> <ul> <li>Changelog link moved next to the other links. Maybe it\'ll be clearer that it\'s a link now, and people will actually see this page.</li> <li>Fixed cocoon typo.</li> </ul> <h4>0.1.15 <span>2014/09/05</span></h4> <ul> <li>Added a new larva upgrade, Cocooning, required to buy a new unit, the Cocoon. If you\'re trying to save up lots of larvae, encase them in cocoons for safekeeping so you don\'t accidentally spend them. Cocoons should let you use the "buy max" button without fear.</li> </ul> <h4>0.1.14 <span>2014/09/04</span></h4> <ul> <li>The game\'s non-https address should now load properly in Firefox.</li> <li>The options screen lets you opt out of Google Analytics.</li> </ul> <h4>0.1.13 <span>2014/09/04</span></h4> <ul> <li>You can now specify a much higher number of units to buy at once - it doesn\'t max out at 1 sextillion anymore.</li> </ul> <h4>0.1.12 <span>2014/09/04</span></h4> <ul> <li>Invisible backend changes, nothing to see here.</li> </ul> <h4>0.1.11 <span>2014/09/03</span></h4> <ul> <li>Upgrade costs should have more consistent order.</li> <li>Nicer, more consistent number formatting.</li> <li>The page refreshes automatically when a newer version of the game is detected.</li> </ul> <h4>0.1.10 <span>2014/09/02</span></h4> <ul> <li>Inject Larvae works again. Oops.</li> </ul> <h4>0.1.9 <span>2014/09/01</span></h4> <ul> <li>When buying multiple units, their total cost is shown instead of the cost for a single unit.</li> <li>The cost of the maximum number of units you can afford can now be shown as a percentage. This is off by default, visit the options menu to enable it.</li> </ul> <h4>0.1.8 <span>2014/09/01</span></h4> <ul> <li>Buy-exactly-n is back by popular demand.</li> <li>Units-bought counts include twins again. (Oops.)</li> <li>Top secret voodoo magic.</li> </ul> <h4>0.1.7 <span>2014/08/31</span></h4> <ul> <li>You can now buy multiple upgrades with one click.</li> <li>There are now three buttons for buying units: buy 1, buy 25%, buy max. Buy-exactly-n is gone; it was awkward to use anyway.</li> <li>Removed the buy/select mode from the top. It wasn\'t widely used, and was confusing if accidentally changed.</li> </ul> <h4>0.1.6 <span>2014/08/31</span></h4> <ul> <li>More invisible backend changes, nothing to see here.</li> </ul> <h4>0.1.5 <span>2014/08/31</span></h4> <ul> <li>Unit list is better behaved with long unit names and text selection.</li> <li>Some invisible backend changes.</li> </ul> <h4>0.1.4 <span>2014/08/29</span></h4> <ul> <li>Mid-tier meat-producing units now warn players who want to start their next tier very early. (High-tier units assume you already know better.)</li> <li>Selecting a unit now shows how fast it\'s being produced. Statistics page has this too.</li> </ul> <h4>0.1.3 <span>2014/08/29</span></h4> <ul> <li>Giant Arachnomorphs have a valid price.</li> <li>Any save state with a broken (NaN) value should have it automatically reset to 0.</li> </ul> <h4>0.1.2 <span>2014/08/29</span></h4> <ul> <li>Number formatting improved for numbers below 999 decillion.</li> </ul> <h4>0.1.1 <span>2014/08/28</span></h4> <ul> <li>Column buy/buy-max buttons work.</li> </ul> <h4>0.1.0 <span>2014/08/28</span></h4> <ul> <li>Initial public testing release. Here be dragons.</li> </ul> </div> </div> </div> <!--div class="panel panel-default">\n    <div class="panel-heading">\n      <h4 class="panel-title">\n        <a data-toggle="collapse" data-parent="#accordion" data-target="#collapseThree" href="javascript:">\n          Collapsible Group Item #3\n        </a>\n      </h4>\n    </div>\n    <div id="collapseThree" class="panel-collapse collapse">\n      <div class="panel-body">\n        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.\n      </div>\n    </div>\n  </div--> </div> </div>'),
			a.put("views/character_new.html", '<div ng-if="!user.id"> Loading... </div> <div ng-if="user.id"> <h1>{{user.username}}#{{user.id}}<small ng-if="isSelf"> (self)</small> - New Character</h1> <!--p>{{user.characters.length|number}} characters</p>\n  <ul>\n    <li ng-repeat="character in user.characters">\n      <a href="#/character/{{character.id}}">{{character.name}}</a>\n    </li>\n  </ul--> <form ng-submit="onSubmit()"> <div class="form-group"> <label for="character-name">Character Name</label> <span>(You may change this later)</span> <input id="character-name" type="text" class="form-control" ng-model="form.name"> </div> <div class="form-group"> <div class="radio" ng-repeat="league in leagues.playableList"> <label> <input type="radio" ng-value="league.name" ng-model="form.league"> <strong>{{league.label}}</strong> <p>{{league.desc}}</p> </label> </div> </div> <button type="submit" class="btn btn-primary">Create Character</button> <a ng-href="#/user/{{userSlug}}" class="btn-link btn">Back</a> </form> </div>'),
			a.put("views/cleartheme.html", "<p>Theme set.</p>"),
			a.put("views/contact.html", '<tabs></tabs> <h2 class="contact-title"><span>Contact the Swarm Simulator developer</span></h2> <p><a target="_blank" href="https://www.reddit.com/r/swarmsim/comments/3a924d/wheres_the_next_big_content_update_or_why_havent/"><span class="glyphicon glyphicon-warning-sign"></span> (2015/07) Replies from the developer may take a little while.</a></p> <div id="contact-tabs" class="panel-group" role="tablist" aria-multiselectable="true"> <div class="panel panel-default"> <button id="contact-bug-head" class="btn btn-default btn-lg btn-block" data-toggle="collapse" data-parent="#contact-tabs" data-target="#contact-bug-body" aria-controls="contact-bug-body" title="Don\'t report your drones, silly."> <span class="fa fa-bug"></span> Report a Bug or Problem </button> <div id="contact-bug-body" class="panel-collapse collapse" ng-class="{in:initTopic==\'bug\'}" role="tabpanel" aria-labelledby="contact-bug-head"> <div class="panel-body"> <p>Something broken? These links send a private message to the developer, and automatically include some information used to investigate your bug report.</p> <p> Before reporting a bug, <a target="_blank" href="https://www.reddit.com/r/swarmsim/wiki/faq">please read the FAQ</a>. <a target="_blank" href="https://www.reddit.com/r/swarmsim/wiki/faq#wiki_my_swarm_stopped_producing_stuff.21">Is your larvae/energy production stuck?</a> <a target="_blank" href="https://www.reddit.com/r/swarmsim/wiki/faq#wiki_i_lost_my_saved_game.21">Lost your saved game?</a> <a target="_blank" href="https://www.reddit.com/r/swarmsim/wiki/faq#wiki_i_spent_mutagen.2C_and_my_larva_production_dropped.21">Larva production dropped after spending mutagen?</a> </p> <ul> <li><a target="_blank" ng-href="{{mailtoUrl(\'bug\')}}">E-mail {{emailTo()}}</a></li> <li><a target="_blank" ng-href="{{redditUrl(\'bug\')}}">Reddit private message /u/kawaritai</a></li> <li><a target="_blank" ng-href="{{anonForm(\'bug\')}}">Report bug anonymously (no reply)</a></li> </ul> </div> </div> </div> <div class="panel panel-default"> <button id="contact-idea-head" class="btn btn-default btn-lg btn-block" data-toggle="collapse" data-parent="#contact-tabs" data-target="#contact-idea-body" aria-controls="contact-idea-body"> <span class="fa fa-lightbulb-o"></span> Offer an Idea or Suggestion </button> <div id="contact-idea-body" class="panel-collapse collapse" role="tabpanel" aria-labelledby="contact-idea-head"> <div class="panel-body"> <p>Your idea\'s most likely to make it into the game if other players like it too! The <a target="_blank" href="https://www.reddit.com/r/swarmsim">Swarm Simulator subreddit</a> or <a target="_blank" href="https://www.kongregate.com/forums/4545-swarm-simulator">Swarm Simulator Kongregate forums</a> are the best places to post your suggestions and ideas. The developer reads everything, though I can\'t always reply.</p> <p>If you prefer, you can also <a target="_blank" ng-href="{{anonForm(\'idea\')}}">message the developer privately with your idea</a>. I can\'t reply to suggestions submitted privately, but I read them all.</p> </div> </div> </div> <div class="panel panel-default"> <button id="contact-gameplay-head" class="btn btn-default btn-lg btn-block" data-toggle="collapse" data-parent="#contact-tabs" data-target="#contact-gameplay-body" aria-controls="contact-gameplay-body"> <span class="glyphicon glyphicon-question-sign"></span> Ask a Gameplay Question </button> <div id="contact-gameplay-body" class="panel-collapse collapse" role="tabpanel" aria-labelledby="contact-gameplay-head"> <div class="panel-body"> <p>Other players can probably help! The <a target="_blank" href="https://www.reddit.com/r/swarmsim">Swarm Simulator subreddit</a> or <a target="_blank" href="https://www.kongregate.com/forums/4545-swarm-simulator">Swarm Simulator Kongregate forums</a> are the fastest ways to get help from others.</p> </div> </div> </div> <div class="panel panel-default"> <button id="contact-other-head" class="btn btn-default btn-lg btn-block" data-toggle="collapse" data-parent="#contact-tabs" data-target="#contact-other-body" aria-controls="contact-other-body"> <span class="fa fa-comment"></span> Any Other Feedback </button> <div id="contact-other-body" class="panel-collapse collapse" role="tabpanel" aria-labelledby="contact-other-head"> <div class="panel-body"> <p>Compliments, complaints, or any other comments - I\'d like to hear from you!</p> <ul> <li><a target="_blank" ng-href="{{mailtoUrl()}}">E-mail {{emailTo()}}</a></li> <li><a target="_blank" ng-href="{{redditUrl()}}">Reddit private message /u/kawaritai</a></li> <li><a target="_blank" ng-href="{{anonForm()}}">Send feedback anonymously (no reply)</a></li> </ul> </div> </div> </div> </div>'),
			a.put("views/debug.html", '<div ng-cloak ng-if="!env.isDebugEnabled"> <p title="No cheats for you. Nice exploring, though!">You found the debug page! Too bad it only works in the development build.</p> </div> <div ng-cloak ng-if="env.isDebugEnabled"> <p title="If you edited the html to see this: shame on you, you filthy cheater.">You found the debug page! Looks like this is a dev build, too. Have fun.</p> <div> <button ng-click="session.save()">Save</button> </div> <div> <button ng-click="game.ascend(true)">Ascend</button> </div> <div> <button ng-click="throwUp()" title="Test exception handler">Test exception</button> <button ng-click="assertFail()" title="Test assertion error">Test assert</button> <button ng-click="error()" title="Test error report">Test error report</button> <button ng-click="achieve()">Test achievement UI</button> </div> <div> numberformat: <input placeholder="int" ng-model="form.numberformat"> == {{form.numberformat | longnum}}; {{form.numberformat | bignum}} </div> <div> <input type="text" ng-model="form.notify.label" ng-init="form.notify.label=\'hihi\'"> <input type="number" size="3" ng-model="form.notify.points" ng-init="form.notify.points=10"> <input type="text" ng-model="form.notify.description" ng-init="form.notify.description=\'haha\'"> <button ng-click="notify.push(form.notify)">Notify</button> <button ng-click="notify.shift()">Next</button> queue: {{notify | json}} </div> <div> <a target="_blank" href="http://www.homestarrunner.com/vcr_cheat.html">alter session</a>: <textarea rows="20" cols="80" ng-model="form.session" ng-model-options="{\'default\':500, \'blur\':0}"></textarea> <div><input type="text" ng-model="form.sessionExport" readonly></div> </div> <ul> <li ng-repeat="dump in dumps"> <h4>{{dump.title}}</h4> <code>{{dump.data}}</code> </li> </ul> </div>'),
			a.put("views/debugapi.html", '<h1>Debug API</h1> <p>Not a computer programmer? Don\'t know what an API is? You\'re most likely lost. <a href="#/">Get me out of here!</a></p> <p>Here you can play around with API calls to the swarmsim server at {{env.saveServerUrl}}. (Unlike the other debug page, this one\'s visible in production because you can\'t cheat with it. It is not a bug.) Have fun!</p> <p>TODO: document available api calls. Until then, <a target="_blank" href="http://github.com/swarmsim/swarm-server-sails/tree/master/config/routes.js">use the source</a>. <a target="_blank" href="http://github.com/swarmsim/swarm-server-sails/tree/master/config/policies.js">This one, too</a>. It\'s mostly REST-style URLs, except for the AuthController and MiscController stuff. </p> <p ng-if="loginApi.user.id">Logged in as: <code>{{loginApi.user|json}}</code>. <a href="javascript:" ng-click="loginApi.logout()">Logout</a></p> <p ng-if="!loginApi.user.id">Not logged in.</p> <hr> <h4>Make an API call</h4> <p><code>window.submitApiCall()</code> works too, but only from this page.</p> <form ng-submit="testApiCall()"> <div class="form-group"> <label>url</label> <input class="form-control" type="text" placeholder="/whoami" ng-model="form.url"> <div><a ng-href="{{env.saveServerUrl}}{{form.url}}" target="_blank">{{env.saveServerUrl}}{{form.url}}</a></div> </div> <div class="form-group"> <label>headers</label> <textarea class="form-control" placeholder="{\'content-type\': \'application/json\', ...}" ng-model="form.headers"></textarea> </div> <div class="form-group"> <label>body</label> <textarea class="form-control" placeholder="{foo=\'bar\', baz=\'quux\', ...}" ng-model="form.data"></textarea> </div> <button class="btn btn-default" ng-class="{disabled:calling}" ng-click="submitApiCall(\'get\')">HTTP GET</button> <button class="btn btn-default" ng-class="{disabled:calling}" ng-click="submitApiCall(\'post\')">HTTP POST</button> </form> <div id="testApiCallResults"> </div>'),
			a.put("views/decimallegend.html", '<h1>Standard-decimal suffixes</h1> <p>Based on <a target="_blank" href="http://home.kpn.nl/vanadovv/BignumbyN.html">this list</a>.</p> <table class="table table-striped"> <tr> <th>Value <th>Short suffix <th>Long suffix  <tr ng-repeat="row in rows"> <td>{{row.string}} <td>{{row.short}} <td>{{row.long}}  </table>'),
			a.put("views/directive-unit.html", '<div class="desc-icon-resource desc-icon-{{cur.name}} icon-{{cur.name}}" title="{{cur.unittype.lol}}"></div> <unitdesc title="{{cur.unittype.lol}}" unit="cur"></unitdesc> <p> <ng-pluralize ng-if="!cur.capValue()" count="cur.count().toNumber()" when="{\'0\':\'You own no {{cur.unittype.plural}}.\',\n           \'one\':\'You own 1 {{cur.unittype.label}}.\',\n           \'other\':\'You own {{cur.count()|longnum}} {{cur.unittype.plural}}.\'}"> </ng-pluralize> <div ng-if="cur.capValue()"> <div class="progress" style="margin-bottom:0"> <div class="progress-bar" role="progressbar" aria-valuenow="{{cur.count()}}" aria-valuemin="0" aria-valuemax="{{cur.capValue()}}" ng-style="{width:cur.capPercent().times(100)+\'%\'}"> {{cur.capPercent()|percent:{floor:true} }}, {{cur.capDurationMoment()|duration}} </div> </div> <p>{{cur.count()|longnum:0}} / {{cur.capValue()|longnum:0}} {{cur.unittype.label}}</p> </div> <div ng-if="cur.prod.length"> <p> Each produces <span ng-repeat="(name, val) in cur.eachProduction()"> <span ng-if="!$first && !$last">, </span><span ng-if="!$first && $last"> and </span> <span>{{val.times(options.getVelocityUnit({prod:cur}).mult)|longnum:2}} <ng-pluralize count="val" when="{\'one\':game.unit(name).unittype.label, \'other\':game.unit(name).unittype.plural}"></ng-pluralize></span> </span> per {{options.getVelocityUnit({prod:cur}).label}}. <span ng-if="cur.hasStat(\'prod\', 1)">(&times;{{cur.stat(\'prod\')|bignum:10}} bonus)</span> </p> <p ng-if="cur.count().greaterThan(0)"> In total, they produce <span ng-repeat="(name, val) in cur.totalProduction()"> <span ng-if="!$first && !$last">, </span><span ng-if="!$first && $last"> and </span> <span>{{val.times(options.getVelocityUnit({prod:cur}).mult)|longnum:2}} <ng-pluralize count="val" when="{\'one\':game.unit(name).unittype.label, \'other\':game.unit(name).unittype.plural}"></ng-pluralize></span> </span> per {{options.getVelocityUnit({prod:cur}).label}}. </p> </div> <div ng-if="cur.showparent && cur.showparent.prod.length"> You earn <!--span ng-repeat="(name, val) in cur.showparent.totalProduction()">\n      <span ng-if="!$first && !$last">, </span><span ng-if="!$first && $last"> and </span>\n      <span>{{val|longnum:2}} <ng-pluralize count="val" when="{\'one\':game.unit(name).unittype.label, \'other\':game.unit(name).unittype.plural}"></ng-pluralize></span>\n    </span--> <span>{{cur.velocity().times(options.getVelocityUnit({unit:cur}).mult)|longnum:2}} {{cur.unittype.plural}}</span> per {{options.getVelocityUnit({unit:cur}).label}}. <span ng-if="cur.showparent.hasStat(\'prod\', 1)">(&times;{{cur.showparent.stat(\'prod\')|bignum:10}} bonus)</span> <span ng-if="cur.capValue()"> At 100%, you\'ll stop earning {{cur.unittype.label}}. </span> </div> <div ng-if="!cur.showparent && cur.velocity() > 0"> You earn <!-- TODO why isn\'t ng-pluralize working here? Switching units keeps the same label. --> <span>{{cur.velocity().times(options.getVelocityUnit({unit:cur}).mult)|longnum:2}} {{cur.unittype.plural}}</span> per {{options.getVelocityUnit({unit:cur}).label}}. <span ng-if="cur.capValue()"> At 100%, you\'ll stop earning {{cur.unittype.label}}. </span> </div> <div class="clear-afterdesc"></div> <div ng-if="!cur.unbuyable && cur.cost.length && cur.isBuyButtonVisible()"> <hr> <!--div class="form-group">\n      <label for="buyone">Buy one</label>\n      <button id="buyone" ng-click="cur.buy(1)" class="form-control unit-buy" ng-disabled="!cur.isCostMet()">\n        <span ng-repeat="cost in cur.cost">\n          <span ng-class="{costNotMet:cost.val > cost.unit.count()}">{{cost.val|bignum}} {{cost.unit.unittype.plural}}</span><span ng-if="!$last">, </span>\n        </span>\n      </button>\n    </div--> <div ng-if="cur.count().isZero() && cur.isCostMet()" ng-repeat="warn in (cur.warnfirst | filter:isWarningVisible)"> <!-- nested div to get the animation right: disappear instantly when switching units, fade when closing manually --> <!-- TODO: too bad the "fade when closing manually" part doesn\'t want to work --> <div class="alert alert-warning alert-dismissable animif" role="alert"> <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> <p>{{warn.text}}</p> </div> </div> <div class="form-group"> <p> <form class="form-inline" ng-submit="commands.buyUnit({unit:cur, num:buyCount()})"> <span class="titlecase">{{cur.unittype.verbing}}</span> <input type="text" ng-model="form.buyCount" placeholder="1" class="form-control" title="\'10%\' buys 10% of the maximum you can afford.\n\'=1000\' buys exactly 1,000 after accounting for twins, rounded up.\n\'@1000\' buys the number needed to have a total of 1,000. If you already have 200, this will buy up to 800.\nNumbers with suffixes work: \'23 billion\', \'23b\', or \'23e9\'."> {{buyCount().equals(1) ? cur.unittype.label : cur.unittype.plural}} <span ng-if="cur.twinMult().greaterThan(1)" ng-class="{strikethrough:false && form.buyCount.indexOf(\'=\') >= 0}">(&times;{{cur.twinMult()|bignum}} twins)</span> will cost <cost costlist="cur.eachCost()" num="buyCount()"></cost> </form> </p> <p ng-if="options.showAdvancedUnitData()"> <span ng-if="cur.maxCostMet().greaterThan(0)"> <span class="titlecase">{{cur.unittype.verbing}}</span> your maximum of {{cur.maxCostMet().times(cur.twinMult())|longnum}} {{cur.maxCostMet().times(cur.twinMult()).equals(1) ? cur.unittype.label : cur.unittype.plural}} </span> <span ng-if="cur.maxCostMet().lessThanOrEqualTo(0)"> <span class="titlecase">{{cur.unittype.verbing}}</span> your next {{cur.unittype.label}} </span> will cost <span ng-repeat="cost in cur.eachCost()"> <span ng-if="!$first && $last"> and </span> <span>{{unitCostAsPercent(cur, cost) | percent:0}} of your {{cost.unit.unittype.plural}}</span><span ng-if="$last">.</span><span ng-if="!$last && cur.eachCost().length > 2">, </span> </span> </p> <p ng-if="options.showAdvancedUnitData() && cur.maxCostMetOfVelocity().greaterThan(0)"> <span ng-if="cur.maxCostMetOfVelocity().times(cur.twinMult()).times(options.getVelocityUnit({unit:cur}).mult).greaterThanOrEqualTo(1)"> You can {{cur.unittype.verb}} {{cur.maxCostMetOfVelocity().times(cur.twinMult()).times(options.getVelocityUnit({unit:cur}).mult)|longnum}} {{cur.maxCostMetOfVelocity().times(cur.twinMult()).times(options.getVelocityUnit({unit:cur}).mult).equals(1) ? cur.unittype.label : cur.unittype.plural}} every {{options.getVelocityUnit({unit:cur}).label}}, using </span> <span ng-if="cur.maxCostMetOfVelocity().times(cur.twinMult()).times(options.getVelocityUnit({unit:cur}).mult).lessThan(1)"> You can {{cur.unittype.verb}} one {{cur.unittype.label}} every {{cur.maxCostMetOfVelocityReciprocal().dividedBy(cur.twinMult()).dividedBy(options.getVelocityUnit({unit:cur}).mult)|longnum}} {{cur.maxCostMetOfVelocityReciprocal().dividedBy(cur.twinMult()).dividedBy(options.getVelocityUnit({unit:cur}).mult).equals(1) ? options.getVelocityUnit({unit:cur}).label : options.getVelocityUnit({unit:cur}).plural}}, using </span> <span ng-repeat="cost in cur.eachCost()"> <span ng-if="!$first && $last"> and </span> <span>{{unitCostAsPercentOfVelocity(cur, cost) | percent:0}} of your {{cost.unit.unittype.label}} income</span><span ng-if="$last">.</span><span ng-if="!$last && cur.eachCost().length > 2">, </span> </span> </p> <buyunit unit="cur" num="buyCount()"></buyunit> </div> </div> <div ng-if="(visibleUpgrades = (cur.upgrades.byClass.upgrade | filter:filterVisible)).length > 0"> <hr> <h4>Upgrades</h4> <ul class="list-unstyled"> <li ng-repeat="upgrade in visibleUpgrades"> <h5 ng-class="{\'text-muted\':upgrade.isManuallyHidden()}"> {{upgrade.type.label}} <span ng-if="upgrade.type.maxlevel != 1">({{upgrade.count()+""|number}})</span> <label class="form-inline pull-right" style="white-space:nowrap" title="Show upgrade notifier?"> <span class="glyphicon glyphicon-circle-arrow-up" ng-class="{\'text-muted\':!upgrade.isNewlyUpgradable()}"></span> <!--input type="checkbox" class="checkbox-inline" style="margin:0" ng-model="watched[upgrade.name]" ng-change="updateWatched(upgrade)"--> <select ng-model="watched[upgrade.name]" ng-change="updateWatched(upgrade)" class="form-control input-sm" style="display:inline"> <option value="-1">Hide upgrade <option value="0">Never notify <option value="1">Notify when buyable <option value="2">Notify at 2&times; cost <option value="4">Notify at 4&times; cost </select> </label> </h5> <div ng-hide="upgrade.isManuallyHidden()"> <upgradedesc title="{{upgrade.type.lol}}" upgrade="upgrade"></upgradedesc> <p> <span ng-if="upgrade.type.maxlevel == 1">This</span> <span ng-if="upgrade.type.maxlevel != 1">Next</span> upgrade costs <!-- special-case: show buybuttons only for twin upgrades. a bit hacky, but for other upgrades it\'s a bad idea. TODO: move to spreadsheet. --> <cost costlist="upgrade.totalCost()" buybuttons="upgrade.name.indexOf(\'twin\') >= 0"></cost> </p> <div class="progress" style="margin-bottom:0"> <div class="progress-bar" role="progressbar" aria-valuenow="{{upgrade.costMetPercent().times(1000)}}" aria-valuemin="0" aria-valuemax="1000" ng-style="{width:upgrade.costMetPercent().times(100)+\'%\'}"> {{upgrade.costMetPercent()|percent:{floor:true} }} {{estimateUpgradeSecs(upgrade)|duration}} </div> </div> <buyupgrade upgrade="upgrade"></buyupgrade> </div> <div style="clear:right"></div> </li> </ul> </div> <div ng-if="(visibleAbilities = (cur.upgrades.byClass.ability | filter:filterVisible)).length > 0"> <hr> <h4>Abilities</h4> <ul class="list-unstyled"> <li ng-repeat="abil in visibleAbilities"> <h5 ng-class="{\'text-muted\':abil.isManuallyHidden()}"> {{abil.type.label}} <div class="pull-right"> <input type="checkbox" class="checkbox-inline" style="margin:0" ng-model="watched[abil.name]" ng-change="updateWatchedAbility(abil)"> </div> <div style="clear:right"></div> </h5> <div ng-hide="abil.isManuallyHidden()"> <upgradedesc title="{{abil.type.lol}}" upgrade="abil"></upgradedesc> <p> This ability costs <cost costlist="abil.totalCost()" noperiod="true"></cost> per use. </p> <div class="progress" style="margin-bottom:0"> <div class="progress-bar" role="progressbar" aria-valuenow="{{abil.costMetPercent().times(1000)}}" aria-valuemin="0" aria-valuemax="1000" ng-style="{width:abil.costMetPercent().times(100)+\'%\'}"> {{abil.costMetPercent()|percent:{floor:true} }} {{estimateUpgradeSecs(abil)|duration}} </div> </div> <buyupgrade upgrade="abil"></buyupgrade> </div> </li> </ul> </div> </p>'),
			a.put("views/dropboxauth.html", '<!doctype html> <html> <head> <script src="https://www.dropbox.com/static/api/dropbox-datastores-1.0-latest.js"></script>  <body> <script>Dropbox.AuthDriver.Popup.oauthReceiver();</script>  '),
			a.put("views/importsplash.html", '<tabs></tabs> <br> <p class="alert alert-info">Game imported, but not yet saved.</p> <div ng-if="isKongregate"> <button class="btn btn-primary" ng-click="click()">Save Game and Return to Kongregate</button> </div> <div ng-if="!isKongregate"> <button class="btn btn-primary" ng-click="click()">Save Game and Continue Playing</button> </div>'),
			a.put("views/login.html", '<!--form role="form" action="{{action}}" method="post"--> <form role="form" ng-submit="submit()" method="post"> <input type="text" name="identifier" ng-model="form.identifier" placeholder="Username or Email"> <input type="password" name="password" ng-model="form.password" placeholder="Password"> <button type="submit">Sign in</button> </form>'),
			a.put("views/main.html", '<tabs cur="cur.tab"></tabs> <div class="tab-content"> <div class="tab-pane active table-responsive"> <table class="table unit-table table-hover" style="width:auto; float:left"> <!-- filthy hack to show achievements on larvae page --> <tr ng-if="cur.tab.name == \'larva\' && game.upgrade(\'achievementbonus\').count().greaterThan(0)"> <td class="upgrade-indicator"> <td class="titlecase"> <a href="#/achievements"> <span class="list-icon-resource icon-achievements"></span> achievement points </a> <td>{{game.achievementPoints()|bignum:0}} <td>+{{game.upgrade(\'achievementbonus\').calcStats().prod|percent:{plusOne:true} }} larvae  <tr ng-repeat="unit in cur.tab.sortUnits() | filter:filterVisible track by unit.name"> <td class="upgrade-indicator" ng-click="click(unit)"> <span ng-if="unit.isNewlyUpgradable()" title="New upgrade available" class="animif glyphicon glyphicon-circle-arrow-up"></span>  <td ng-click="click(unit)"> <span class="list-icon-resource icon-{{unit.name}}"></span> <a ng-href="#{{cur.tab.url(unit)}}" class="titlecase unselectedlist-label label-{{unit.name}}"> <span class="label-label">{{unit.unittype.label}}</span> <span class="label-suffix">{{unit.suffix}}</span> </a>  <td ng-click="click(unit)"> {{unit.count()|bignum:0}}  <td ng-click="click(unit)"> <span ng-if="!unit.velocity().isZero()"> +{{unit.velocity().times(options.getVelocityUnit({unit:unit}).mult)|bignum:2}}/{{options.getVelocityUnit({unit:unit}).name}} </span> <span ng-if="unit.velocity().isZero() && cur.tab.name == \'territory\' && !val.isZero()" ng-repeat="(name, val) in unit.totalProduction()"> +{{val.times(options.getVelocityUnit({unit:name}).mult)|bignum:2}}/{{options.getVelocityUnit({unit:name}).name}}</span>  <td ng-if="options.showAdvancedUnitData()"> <buyunitdropdown unit="unit" num="1"></buyunitdropdown>   </table> <!-- without this, dropdown creates vertical scrollbar due to table-responsive. we want horiz scrollbars on small screens, not vert on big screens! --> <p style="padding-bottom:200px"></p> </div> </div>'),
			a.put("views/newsmodal.html", '<div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="newsmodal-header">Swarm Simulator v1.1: Altruism, Branching, Characters</h4> </div> <div class="modal-body"> <p>(Hi there, Github lurkers! Nothing in here is a promise until it\'s actually released.)</p> <ul> <li>Multiple characters: play more than one swarm on the same account! No need to juggle import/export codes, or play in more than one browser - just switch characters.</li> <li>Leagues: new swarms can choose to play under a new, experimental set of rules! TODO: rename leagues to something not-PoE; potential confusion with SC ladder leagues too. Universe? Parallel universe? Galaxy? <s>World?</s> Evolutionary branch? Genetic branch? (branching sounds cool, but could easily imply character class not realm...) Plane? Dimension?<ul> <li>TODO: wow, tldr. capture this in screenshots, or summarize and link to the details.</li> <li>Once a swarm has been created, it cannot change its league until the league itself ends. You can have multiple swarms, each in a different league.</li> <li>Existing swarms are all in the <b>Open League</b>, and new swarms can choose to join the Open League. This league has no unusual rules, and will run <span title="* May not literally run forever">forever</span>.</li> <li>New swarms can choose to join the experimental <b>Genesis League</b>. Genesis (HAS SPECIAL RULES: TODO #536). If these rules are successful, they\'ll eventually be applied to other leagues!</li> <li>Genesis is a <i>temporary</i> league: when Genesis ends, all Genesis swarms will merge into the Open League. The end date for Genesis is not yet scheduled, but it will be announced at least two weeks in advance.</li> <li>Genesis is just the beginning - we\'re planning more content for leagues in the future!</li> </ul></li> <li>New in-app purchases! Generous swarm leaders can provide an energy-related boost to all online players <i>except the buyer</i>. Your name will be announced to everyone who receives your purchase, or you can choose to help out anonymously. Other players, and the Swarm Simulator developer, will appreciate your support! TODO: give these mtx a name; screenshot</li> <li>New achievements!</li> </ul> </div>'),
			a.put("views/options.html", '<tabs></tabs> <div class="container"> <h1>Options</h1> <div class="form-group"> <label class="control-label"> <span class="glyphicon glyphicon-eye-open"></span> Show advanced unit data <input type="checkbox" ng-init="form.showadvancedunitdata=options.showAdvancedUnitData()" ng-model="form.showadvancedunitdata" ng-change="options.showAdvancedUnitData(form.showadvancedunitdata)"> </label> <p>Show more detailed numbers for each of your units.</p> </div> <div class="form-group" ng-if="isKongregate()"> <div><label class="control-label"><span class="glyphicon glyphicon-resize-vertical"></span> Kongregate scrolling style</label></div> <label style="font-weight:normal"><input type="radio" ng-model="form.scrolling" value="none" ng-change="options.scrolling(form.scrolling)" ng-init="form.scrolling=options.scrolling()">Browser default</label> <label style="font-weight:normal"><input type="radio" ng-model="form.scrolling" value="resize" ng-change="options.scrolling(form.scrolling)">Resize automatically, no inner scrollbar</label> <label style="font-weight:normal"><input type="radio" ng-model="form.scrolling" value="lockhover" ng-change="options.scrolling(form.scrolling)"><span class="envalert">(beta)</span> Lock mousewheel scrolling</label> <p ng-if="form.scrolling==\'lockhover\'">This makes mousewheel scrolling only affect Swarm Simulator\'s scrollbar, instead of the whole Kongregate page, while your mouse is over the game. We\'re still testing this option - if it\'s broken for you, <a href="#/contact">please report it</a>!</p> <p ng-if="options.isScrollingChangedFromResizeSincePageLoad && form.scrolling!=\'resize\'">The game will widen to fill your screen when you refresh the page.</p> <p>Minimum size: <input ng-model="form.iframeMinSize.x" type="number" min="0" max="99999" ng-change="options.iframeMinX(form.iframeMinSize.y)">&times; <input ng-model="form.iframeMinSize.y" type="number" min="0" max="99999" ng-change="options.iframeMinY(form.iframeMinSize.y)"> <button class="btn btn-default" ng-class="{disabled:isDefaultMinSize()}" ng-click="resetMinSize()">Reset size</button> </p> <p ng-if="form.scrolling!=\'resize\' && !isDefaultMinSize()"> Swarm Simulator can\'t automatically stretch to fill the width of your screen when a minimum size is set. </p> </div> <div class="form-group"> <label class="control-label" for="fps"><span class="glyphicon glyphicon-film"></span> Maximum frames per second</label> <input type="range" class="form-control" id="fps" min="1" max="60" step="1" ng-init="form.fps=options.fps()" ng-model="form.fps" ng-change="options.fps(form.fps);form.fpsNum=options.fps()"> <!--button ng-click="options.reset(\'fps\');form.fps=options.fps()">Reset</button--> <p><input type="number" min="0" ng-init="form.fpsNum=options.fps()" ng-model="form.fpsNum" ng-change="options.fps(form.fpsNum);form.fps=options.fps()"> fps. Time between frames: {{options.fpsSleepMillis()|number:0}}ms</p> <p>Reduce this setting if the game is slowing down your computer. This doesn\'t affect gameplay; your units won\'t produce resources any faster or slower.</p> </div> <div class="form-group"> <div><label class="control-label"><span class="glyphicon glyphicon-barcode"></span> Number format</label></div> <label style="font-weight:normal"><input type="radio" ng-model="form.notation" value="standard-decimal" ng-change="options.notation(form.notation)">Standard decimal <!--(<a target="_blank" href="http://home.kpn.nl/vanadovv/BignumbyN.html">legend</a>)--> (<a href="#/decimallegend">legend</a>) </label> <label style="font-weight:normal"><input type="radio" ng-model="form.notation" value="scientific-e" ng-change="options.notation(form.notation)" ng-init="form.notation=options.notation()">Scientific-E</label> <label style="font-weight:normal"><input type="radio" ng-model="form.notation" value="hybrid" ng-change="options.notation(form.notation)">Hybrid</label> <label style="font-weight:normal"><input type="radio" ng-model="form.notation" value="engineering" ng-change="options.notation(form.notation)">Engineering</label> <p>Examples: {{123456789|longnum}}, {{123456789|bignum}}, {{123456789e+30|longnum}}, {{123456789e+30|bignum}}</p> </div> <div class="form-group"> <div><label class="control-label"><span class="glyphicon glyphicon-dashboard" ng-init="form.velocityUnit=options.velocityUnit().name"></span> Velocity format</label></div> <label ng-repeat="vu in options.VELOCITY_UNITS.list" style="font-weight:normal" class="titlecase"> <input type="radio" ng-model="form.velocityUnit" value="{{vu.name}}" ng-change="options.velocityUnit(form.velocityUnit)">{{vu.plural}} </label> <p>Example: {{10 * options.velocityUnit().mult|longnum}} meat/{{options.velocityUnit().name}}</p> </div> <div class="form-group"> <div><label class="control-label"><span class="glyphicon glyphicon-time"></span> Duration format</label></div> <label style="font-weight:normal"><input type="radio" ng-model="form.durationFormat" value="abbreviated" ng-change="options.durationFormat(form.durationFormat)">Exact</label> <label style="font-weight:normal"><input type="radio" ng-init="form.durationFormat=options.durationFormat()" ng-model="form.durationFormat" value="human" ng-change="options.durationFormat(form.durationFormat)">Approximate</label> <!--label style="font-weight:normal"><input type="radio" ng-model="form.durationFormat" value="full" ng-change="options.durationFormat(form.durationFormat)" ng-init="form.notation=options.notation()">Full</input></label--> <p>Examples: <span ng-repeat="sample_duration in duration_examples">{{sample_duration |duration}}<span ng-if="!$last">, </span></span> </p> </div> <div class="form-group"> <div class="dropdown"> <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true"> <span class="glyphicon glyphicon-picture"></span> Theme <span class="envalert">(beta)</span> <span class="caret"></span> </button> <ul class="dropdown-menu scrollable-menu" role="menu" aria-labelledby="themeMenu"> <li ng-repeat="theme in options.constructor.THEMES.list" role="presentation" style="list-style-type:none"> <a role="menuitem" tabindex="-1" class="titlecase" ng-click="setTheme(theme.name)" href="javascript:">{{theme.label}}</a> </li> <li role="presentation" class="divider" style="list-style-type:none"></li> <li role="presentation" style="list-style-type:none"> <a role="menuitem" tabindex="-1" class="titlecase" ng-click="selectCustomTheme()" href="javascript:">Custom style</a> </li> <li role="presentation" style="list-style-type:none"> <a role="menuitem" tabindex="-1" href="javascript:" aria-expanded="false" aria-controls="themeExtra" ng-click="form.isThemeExtraOpen=true">Additional styling (advanced)</a> </li> </ul> </div> <p ng-if="!form.isCustomTheme">Current theme: <a ng-href="{{options.theme().credit}}" target="_blank" class="titlecase">{{options.theme().label}}</a></p> <div ng-if="form.isCustomTheme"> <p>CSS file URL: (<a href="#/cleartheme">Reset</a>)</p> <div class="input-group"> <input type="text" class="form-control" ng-model="form.customThemeUrl"> <span class="input-group-btn"><button class="btn btn-default" ng-click="setCustomTheme(form.customThemeUrl)">Set theme</button></span> </div> </div> <div> <div class="collapse" ng-class="{in:form.isThemeExtraOpen}" id="themeExtra"> <div class="well" ng-class="{\'has-success\':!!form.themeExtraSuccess,\'has-error\':!!form.themeExtraError,\'has-feedback\':!!form.themeExtraSuccess || !!form.themeExtraError}"> <button class="form-control btn btn-danger" ng-click="form.themeExtra = \'\'; themeExtra(form.themeExtra)">Clear all extra styling/graphics</button> <p>Enter some additional CSS. {{form.themeExtra.length|number}}/1,000 chars. Use <code>@import</code> to save space.</p> <textarea class="form-control" ng-model="form.themeExtra" ng-change="clearThemeExtra()"></textarea> <button class="form-control btn btn-primary" ng-click="themeExtra(form.themeExtra)">Apply</button> <p ng-show="form.themeExtraError" class="text-danger">{{form.themeExtraError}}</p> </div> </div> </div> </div> <div class="form-group" ng-if="isDropbox"> <!-- glyphicons are normally 14x14, but dropbox logo comes with some extra padding --> <div><label class="control-label"><img src="images/dropbox-logos_dropbox-glyph-blue.eff8e77c.png" style="height:18px;width:18px">Sync saved data with other devices <span class="envalert">(beta)</span></label></div> <div ng-cloak ng-controller="DropboxdatastoreCtrl"> <input ng-if="!isAuth()" type="image" class="btn btn-default" ng-click="droplogin()" alt="Log in with Dropbox" title="Log in with Dropbox" src="images/dropbox-logos_dropbox-logotype-blue.3a37fb58.png" style="height:30%;width:30%"> <!--button ng-if="!isAuth()" class="btn btn-default" ng-click="droplogin()">\n        <img alt="Log in with Dropbox" title="Log in with Dropbox" src="images/dropbox-logos_dropbox-logotype-blue.3a37fb58.png" style="height:30%;width:30%;display:inline">\n      </button--> <div ng-if="isAuth()"> <img src="images/dropbox-logos_dropbox-vertical-blue.aca38b3d.png" style="float:left"> <div><label><input type="checkbox" ng-init="form.autopush=options.autopush()" ng-model="form.autopush" ng-change="options.autopush(form.autopush)" class="">Auto-export every 15 minutes and before closing</label></div> <div><button class="btn btn-primary" ng-click="addSavegame()">Export saved data to Dropbox</button></div> <div><button class="btn btn-default" ng-click="fetch()">Check for new online saved data</button></div> <p ng-if="!syncer.savedgame">Nothing exported to Dropbox yet.</p> <div ng-if="syncer.savedgame"> <div><button class="btn btn-primary" ng-click="importSavegame()">Import saved data (replaces your current game)</button></div> <div><button class="btn btn-default" ng-click="clearSavegame()">Delete saved data from Dropbox</button></div> <div><button class="btn btn-default" id="dropboxlogout" ng-click="droplogout()">Logout</button></div> <p>Last exported: {{syncer.savedgame.get(\'data\').length|number}} chars {{moment(syncer.savedgame.get(\'created\')).fromNow()}}. <span ng-if="syncer.getAutopushError()">Will not auto-export online<span ng-if="syncer.getAutopushError()==\'nochanges\'"> because nothing\'s changed since the last export</span><span ng-if="syncer.getAutopushError()==\'newgame\'"> because this is a new game</span><span ng-if="syncer.getAutopushError()==\'remotenewer\'"> because the online save is newer than the one you\'re playing</span>.</span> </p> </div> <div style="clear:left"></div> </div> </div> </div> <div ng-cloak ng-controller="KongregateS3Ctrl"> <div ng-if="isVisible"> <div><label class="control-label"><img src="/images/badge16x16K.b088c361.gif" width="16" height="16" alt="Kongregate logo"> Sync saved data with other devices <span class="envalert">(beta)</span></label></div> <div ng-if="isGuest()"><a href="javascript:" ng-click="api.showSignInBox()">Sign in to Kongregate to save your game to Swarm Simulator\'s servers.</a></div> <div ng-if="!isGuest()"> <p>Hi {{api.getUsername()}}! Save your game to Swarm Simulator\'s servers using your Kongregate account.</p> <div><label><input type="checkbox" ng-init="form.autopush=options.autopush()" ng-model="form.autopush" ng-change="options.autopush(form.autopush)" class="">Auto-export every 15 minutes and before closing</label></div> <div><button class="btn btn-primary" ng-class="{disabled:cooldown.byName.push}" ng-click="push()">Export online saved data</button></div> <div><button class="btn btn-default" ng-class="{disabled:cooldown.byName.fetch}" ng-click="fetch()">Check for new online saved data</button></div> <p ng-if="!remoteSave()">No online saved data yet. <a class="" data-toggle="collapse" data-target="#kongregateS3Details" href="javascript:" aria-expanded="false" aria-controls="kongregateS3Details">How do online saves work?</a></p> <div ng-if="remoteSave()"> <div><button class="btn btn-primary" ng-click="pull()">Import online saved data (replaces your current game)</button></div> <div><button class="btn btn-default" ng-class="{disabled:cooldown.byName.clear}" ng-click="clear()">Delete online saved data</button></div> <p>Last exported: {{remoteSave().length|number}} chars {{remoteDate()|momentFromNow}}. <span ng-if="getAutopushError()">Will not auto-export online<span ng-if="getAutopushError()==\'nochanges\'"> because nothing\'s changed since the last export</span><span ng-if="getAutopushError()==\'newgame\'"> because this is a new game</span><span ng-if="getAutopushError()==\'remotenewer\'"> because the online save is newer than the one you\'re playing</span>.</span> <a class="" data-toggle="collapse" data-target="#kongregateS3Details" href="javascript:" aria-expanded="false" aria-controls="kongregateS3Details">How do online saves work?</a> </p> </div> <p ng-if="policyError" class="text-danger">{{policyError}}</p> <div ng-if="!isBrowserSupported()"> <p class="text-danger">Looks like your web browser won\'t work with Kongregate sync: <code>FormData</code>/<code>Blob</code> support not found. <a target="_blank" href="http://browsehappy.com">You should upgrade your browser.</a></p> </div> </div> <div class="collapse" id="kongregateS3Details"> <div class="well"> <p>A Swarm Simulator server at <b>{{saveServerUrl}}</b> verifies you\'re logged into Kongregate, and grants your browser permission to upload/download saved data at <b>https://swarmsim.s3.amazonaws.com</b>. If you\'re having trouble syncing, make sure your browser isn\'t blocking either of these locations.</p> <p ng-if="policy()">Refreshed S3 permissions {{policy().localDate.refreshed|momentFromNow}}, during {{isPolicyCached() ? "an earlier session" : "this session"}}. Expires {{policy().localDate.expires|momentFromNow}}.</p> <p ng-if="!policy()" class="text-danger">S3 permissions are missing!</p> <p><button class="btn btn-default" ng-class="{disabled:cooldown.byName.init}" ng-click="init(true)">Force permission refresh now</button></p> </div> </div> </div> </div> <div ng-class="{\'form-group\':true,\'has-success\':!!imported.success,\'has-error\':!!imported.error,\'has-feedback\':!!imported.success || !!imported.error}"> <label class="control-label" for="export"><span class="glyphicon glyphicon-download-alt"></span> Import/export saved data</label> <div class="input-group"> <input type="text" class="form-control" id="export" ng-init="form.export=session.exportSave()" ng-model="form.export" ng-change="importSave(form.export)" ng-click="select($event)"> <span class="input-group-btn"> <button class="btn btn-default" type="button" ng-click="shorturl()">Create short URL</button> </span> </div> <span ng-show="!!imported.success" class="glyphicon glyphicon-ok form-control-feedback"></span> <span ng-show="!!imported.error" class="glyphicon glyphicon-remove form-control-feedback"></span> <div class="alert alert-warning" ng-cloak ng-if="isKongregate() && !game.session.state.kongregate"> This saved data was imported from outside Kongregate. You can still play it on Kongregate, but you won\'t appear on Kongregate\'s leaderboards. Start a new game on Kongregate to be eligible for the leaderboards. </div> <p>To export, click the text above and copy (ctrl-c). To import, click the text and paste (ctrl-v) your exported data.</p> <p>It\'s normal for imported saves to have more units than you exported with. Your swarm continues its work even after saved data is exported/before it\'s imported.</p> </div> <div> <p><a class="" data-toggle="collapse" data-target="#saveDetails" href="javascript:" aria-expanded="false" aria-controls="saveDetails"> Where is Swarm Simulator\'s data saved? </a></p> <div class="collapse" id="saveDetails"> <div class="well"> <p>Swarm Simulator saves your progress in your browser\'s localstorage, cookies, and Flash (SWF) storage. Your saved game will be loaded if it\'s found in any one of these sources. This is done to avoid accidentally losing your saved data; it\'s not intended to track you or otherwise invade your privacy. The \'wipe all saved data\' button below will clear all three storage locations.</p> <p ng-repeat="detail in savedDataDetails"> <span class="titlecase">{{detail.name}}</span> storage: <span ng-if="detail.exists">{{detail.size}} chars</span> <span ng-if="!detail.exists">empty</span> </p> </div> </div> </div> <div class="form-group"> <button class="resetalert" ng-click="confirmReset()"> <span class="glyphicon glyphicon-warning-sign"></span> Wipe all saved data and start over </button> <p title="{{game.dateStarted().toString()}}">You started playing {{game.momentStarted().fromNow()}}<span ng-if="env.showSkipped && game.totalSkippedMillis() > 0"> (skipped an extra {{game.totalSkippedDuration().humanize()}})</span>.</p> </div> <div class="form-group"> <label class="control-label"><span class="glyphicon glyphicon-cloud-upload"></span> Analytics</label> <p>Swarm Simulator, like many websites, uses Google Analytics to track actions you take while playing. We use this data to improve the game. Feel free to <a target="_blank" href="https://tools.google.com/dlpage/gaoptout" title="I thought about asking Analytics to track how many people click this link, but decided not to.">opt out of Google Analytics</a>.</p> <p><a target="_blank" href="http://www.google.com/policies/privacy/partners/">How Google uses data when you use our partners\' sites or apps</a></p> </div> </div>'),
			a.put("views/statistics.html", '<tabs></tabs> <div class="container statistics"> <h1>Statistics</h1> <div ng-repeat="unit in game.unitlist()">{{unit.label}}</div> <div class="table-responsive" ng-init="unitlist = (game.unitlist() | filter:showStats)"> <table class="table" ng-if="unitlist.length > 0"> <tr> <th>unit <th>first bought <th>clicks <th>bought manually <th>twins  <tbody> <tr ng-repeat="unit in unitlist" ng-init="ustats = unitStats(unit)"> <td class="name">{{unit.unittype.label}} <td>{{ustats.elapsedFirstStr}} <td>{{ustats.clicks | bignum}} <td>{{ustats.num | bignum}} <td>{{ustats.twinnum | bignum}}   </table> <div ng-if="unitlist.length == 0"> No units purchased. </div> </div> <div class="table-responsive" ng-init="upgradelist = (game.upgradelist() | filter:hasUpgradeStats)"> <table class="table" ng-if="upgradelist.length > 0"> <tr> <th>upgrade <th>first bought <th>clicks <th>total bought  <tbody> <tr ng-repeat="upgrade in upgradelist" ng-init="ustats = upgradeStats(upgrade)"> <td class="name">{{upgrade.type.label}} <td>{{ustats.elapsedFirstStr}} <td>{{ustats.clicks | number}} <td>{{ustats.num | number}}   </table> <div ng-if="upgradelist.length == 0"> No upgrades purchased. </div> </div> <dl class="dl-horizontal"> <dt>save file size <dd>{{session.exportSave().length | number}} base64 chars <dt>start date <dd>{{game.momentStarted().fromNow()}} - {{game.dateStarted().toString()}} <dt>last ascended <dd ng-if="game.unit(\'ascension\').count().isZero()">never <dd ng-if="!game.unit(\'ascension\').count().isZero()">{{game.session.state.date.restarted|momentFromNow}} - {{game.session.state.date.restarted.toString()}} </dl> </div>'),
			a.put("views/tabs.html", '<ul ng-if="!isOffline" class="nav nav-tabs" role="tablist"> <li ng-repeat="tab in tabs.list | filter:filterVisible" class="tab-resource tab-{{name}}" ng-class="{active: cur.name === tab.name}"> <a ng-href="#{{tab.url()}}" role="tab"> <div class="tab-icon-resource tab-icon-{{tab.name}} icon-{{tab.name}}"></div> <!-- TODO why isnt\' pluralize working? --> {{tab.leadunit.count()|bignum:0}} <span class="tab-label label-{{tab.leadunit.name}}"> <span class="label-label">{{tab.leadunit.unittype.plural}}</span> <span class="label-suffix"></span> </span> <span ng-if="tab.leadunit.capValue()">({{tab.leadunit.capPercent()|percent:{floor:true,places:0} }})</span> <!--br>{{tab.unit.velocity()|bignum:0}}/sec--> <!--TODO: ewww, a special case--> <span ng-if="tab.name==\'mutagen\'">(+{{game.unit(\'premutagen\').count()|bignum:0}})</span> <span ng-if="tab.isNewlyUpgradable()" title="New upgrade available" class="animif glyphicon glyphicon-circle-arrow-up"></span> </a> </li> <li role="tab" class="dropdown" ng-class="{active: !cur}"> <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:"> More... <span class="caret"></span> </a> <ul class="dropdown-menu" role="menu"> <li role="presentation" ng-class="{disabled:game.availableAutobuyUpgrades() <= 0}"><a role="menuitem" tabindex="-1" href="javascript:" ng-click="buyUpgrades(game.availableAutobuyUpgrades())"> <span class="glyphicon glyphicon-circle-arrow-up"></span> Buy all {{game.availableAutobuyUpgrades().length | number}} upgrades </a></li> <li role="presentation" ng-class="{disabled:game.availableAutobuyUpgrades(0.25) <= 0}"><a role="menuitem" tabindex="-1" href="javascript:" ng-click="buyUpgrades(game.availableAutobuyUpgrades(0.25), 0.25)"> <span class="glyphicon glyphicon-upload"></span> Buy cheapest {{game.availableAutobuyUpgrades(0.25).length | number}} upgrades </a></li> <li role="presentation" class="divider"></li> <li ng-class="{disabled:!isUndoable()}" role="presentation"> <a role="menuitem" tabindex="-1" href="javascript:" ng-click="undo()"> <span class="glyphicon glyphicon-share-alt mirror"></span> Undo <span ng-if="isUndoable()">({{undoLimitSeconds - secondsSinceLastAction() | number:0}} sec)</span> </a> </li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#/options"> <span class="glyphicon glyphicon-cog"></span> Options </a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#/achievements"> <span class="glyphicon glyphicon-ok"></span> Achievements </a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#/statistics"> <span class="glyphicon glyphicon-stats"></span> Statistics </a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#/changelog"> <span class="glyphicon glyphicon-book"></span> Patch Notes </a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="http://reddit.com/r/swarmsim" target="_blank"> <span class="glyphicon glyphicon-user"></span> Community </a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#/contact"> <span class="fa fa-comment"></span> Send Feedback </a></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#/contact?error"> <span class="fa fa-bug"></span> Report Problem </a></li> <!--li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:" ng-click="hotkeys.toggleCheatSheet()" target="_blank">\n        <span class="glyphicon glyphicon-share-alt"></span> Keyboard Shortcuts\n      </a></li--> <li role="presentation"><a role="menuitem" tabindex="-1" href="#/tab/all"> <span class="glyphicon glyphicon-list-alt"></span> Show all units </a></li> </ul> </li> </ul>'),
			a.put("views/unit.html", '<tabs cur="cur.tab"></tabs> <div class="tab-content"> <div class="tab-pane active row"> <!-- we want the sidebar on the left on large screens, but "sidebar" on the bottom on phones.\n         table plus pull-right makes most of the page unclickable for some reason, so \n         individual pull/push offsets for each screen size are needed. --> <div class="col-lg-9 col-md-8 col-sm-7 col-lg-push-3 col-md-push-4 col-sm-push-5"> <ul class="nav nav-pills nav-justified text-nowrap visible-xs"> <li><a ng-href="#/unit/{{cur.unit.prev.unittype.slug}}" ng-if="cur.unit.prev && cur.unit.prev.isVisible()"> <span class="glyphicon glyphicon-chevron-left"></span> {{cur.unit.prev.count() | bignum:0}} {{cur.unit.prev.unittype.plural}} {{cur.unit.prev.suffix}} <span class="prev-icon-resource icon-{{cur.unit.prev.name}}"></span> </a></li> <li><a ng-href="#/unit/{{cur.unit.next.unittype.slug}}" ng-if="cur.unit.next && cur.unit.next.isVisible()"> <span class="next-icon-resource icon-{{cur.unit.next.name}}"></span> {{cur.unit.next.count() | bignum:0}} {{cur.unit.next.unittype.plural}} {{cur.unit.next.suffix}} <span class="glyphicon glyphicon-chevron-right"></span> </a></li> </ul> <a ng-href="#{{cur.tab.url(false)}}" type="button" class="close pull-right btn"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></a> <h3><a class="selected-label label-{{cur.unit.name}}" ng-href="#{{cur.tab.url(false)}}"> <span class="label-label">{{cur.unit.unittype.label}}</span><span class="label-suffix"> {{cur.unit.suffix}}</span> </a></h3> <unit cur="cur.unit"></unit> </div> <div class="col-lg-3 col-md-4 col-sm-5 col-lg-pull-9 col-md-pull-8 col-sm-pull-7"> <table class="table unit-table table-hover"> <!-- filthy hack to show achievements on larvae page --> <tr ng-if="cur.tab.name == \'larva\' && game.upgrade(\'achievementbonus\').count() > 0"> <td class="upgrade-indicator"> <td class="titlecase"> <a href="#/achievements" class="unit-sidebar"> <span class="list-icon-resource icon-achievements"></span> <div class="pull-left">achievement points</div> <div class="unit-count">{{game.achievementPoints()|bignum:0}}</div> </a>   <tr ng-repeat="unit in cur.tab.sortUnits() | filter:filterVisible track by unit.name" ng-class="{active:unit.name===cur.unit.name}" ng-click="click(unit)"> <td class="upgrade-indicator"> <span ng-if="unit.isNewlyUpgradable()" title="New upgrade available" class="animif glyphicon glyphicon-circle-arrow-up"></span>  <td class="titlecase"> <a href="#/tab/{{cur.tab.name}}/unit/{{unit.unittype.slug}}" class="unit-sidebar"> <span class="list-icon-resource icon-{{unit.name}}"></span> <div class="pull-left list-label label-{{unit.name}}"> <span class="label-label">{{unit.unittype.label}}</span> <span class="label-suffix">{{unit.suffix}}</span> </div> <div class="unit-count"> {{unit.count()|bignum:0}} <span ng-if="unit.capValue()">({{unit.capPercent()|percent:{floor:true} }})</span> </div> </a>   </table> </div> </div> </div>'),
			a.put("views/user.html", '<div ng-if="!user.id"> Loading... </div> <div ng-if="user.id"> <h1>{{user.username}}#{{user.id}} <small ng-if="isSelf"> (self)</small> <small>{{characters.length|number}} characters</small> </h1> <p ng-if="isSelf"> <a ng-href="#/user/{{userSlug}}/character/new" class="btn btn-default"><!--span class="fa fa-user-plus"--><span class="glyphicon glyphicon-plus"></span> Create a New Character</a> <a class="btn btn-default disabled"><span class="glyphicon glyphicon-import"></span> Import Open League Character (TODO)</a> <a class="pull-right btn btn-default disabled"><span class="glyphicon glyphicon-cog"></span> Options (TODO)</a> </p> <ul class="list-unstyled"> <li ng-repeat="character in characters" class="well"> <p> <a ng-class="{disabled:character.league.isPlayable}" href="#/character/{{character.id}}">{{character.name}}</a> - {{character.league.label}}. Last played {{character.updatedAt.fromNow()}}. <span ng-if="character.deleted">DELETED</span> <span class="pull-right" ng-if="isSelf"> <button ng-if="character.league.name == \'open\'" ng-click="onDupe(character)" class="btn btn-default"><span class="fa fa-copy"></span> Duplicate</button> <button ng-if="character.league.name == \'open\'" class="btn btn-default disabled"><span class="glyphicon glyphicon-export"></span> Export</button> <button ng-click="onDelete(character)" class="btn btn-default"><span class="glyphicon glyphicon-remove"></span> Delete</button> </span> </p> <p> <span ng-if="character.state.unittypes.ascension > 0">{{character.state.unittypes.ascension| bignum}} ascensions,</span> <span ng-if="character.state.unittypes.ascension > 0 || character.state.unittypes.nexus > 0">{{character.state.unittypes.nexus | bignum}} nexus,</span> {{character.state.upgrades.hatchery || 0 | bignum}} hatcheries, {{character.state.upgrades.expansion || 0 | bignum}} expansions. </p> <!--a ng-href="#/character/{{character.id}}" class="btn btn-default">Play</a--> </li> </ul> </div>'),
			a.put("views/desc/unit/bat.html", "<p>Bats empower all of your swarm's energy-based abilities.</p> <p>Your bats make your abilities {{unit.effect[0].calcStats().power | percent:{places:2,plusOne:true} }} more powerful. Raising more has diminishing returns, but can increase this to a maximum of {{unit.effect[0].val | percent:{plusOne:true} }}.</p>"),
			a.put("views/desc/unit/cocoon.html", "<p>Each cocoon is a larva encased within a protective shell. Larvae can freely enter and leave their cocoons, but cannot be transformed into other units while cocooned.</p> <p>Clone Larvae clones cocoons as if they were normal larvae. Cocoon your larvae intended for cloning to avoid accidentally spending them.</p> <p>You produce {{ game.unit('larva').velocity().times(options.velocityUnit().mult) | longnum }} larvae per {{options.velocityUnit().label}}, allowing you to clone up to <span ng-if=\"game.unit('cocoon').isVisible() && game.unit('cocoon').count().greaterThanOrEqualTo(game.upgrade('clonelarvae').effect[0].cap())\">{{ game.upgrade('clonelarvae').effect[0].cap() | longnum }} larvae.</span> <span ng-if=\"!(game.unit('cocoon').isVisible() && game.unit('cocoon').count().greaterThanOrEqualTo(game.upgrade('clonelarvae').effect[0].cap()))\"> <a ng-href=\"#{{game.unit('cocoon').url()}}?num={{'@'+game.upgrade('clonelarvae').effect[0].cap()|encodeURIComponent}}\">{{ game.upgrade('clonelarvae').effect[0].cap() | longnum }} larvae</a>. </span> </p>"),
			a.put("views/desc/unit/moth.html", "<p>Lepidoptera are mysterious creatures, with furry bodies and large wings, emerging from their dens only at night. The lepidoptera are attracted to the light of your nightbugs, and energy is attracted to the lepidoptera.</p> <p>Your lepidoptera generate {{unit.effect[0].calcStats().prod | percent:{places:2,plusOne:true} }} more energy. Hatching more has diminishing returns, but can increase this to a maximum of {{unit.effect[0].val | percent:{plusOne:true} }}.</p>"),
			a.put("views/desc/unit/mutagen.html", '<p title="Also creates heroic turtles.">Allows mutation, increasing the power of each member of your swarm.</p> <p>To activate mutagen, your swarm must <b>ascend</b> - restart on a new world. Space travel is too harsh for most of your swarm, but mutagen strengthens a few of your swarm\'s larvae for the trip to their new planet. All the descendents of these larvae - your new swarm - will benefit from mutagen\'s power.</p> <p>Ascending will activate {{game.unit(\'premutagen\').count()|longnum}} new mutagen. Your swarm\'s ancestors have infested {{game.unit(\'ascension\').count()|longnum}} worlds so far.</p> <p>Ascending now will cost {{game.ascendCost()|longnum}} energy. Spend energy elsewhere to reduce this cost; you\'ve spent {{game.ascendEnergySpent()|longnum}} energy.</p> <div class="progress" style="margin-bottom:0"> <div ng-if="game.ascendCostCapDiff().greaterThan(0)" class="progress-bar progress-bar-danger pull-right" role="progressbar" aria-valuenow="{{game.ascendCostCapDiff()}}" aria-valuemin="0" aria-valuemax="{{game.ascendCost()}}" ng-style="{width:game.ascendCostCapDiff().dividedBy(game.ascendCost()).times(100)+\'%\'}"> {{game.ascendCostCapDiff()|longnum}} more than your max energy! </div> <div class="progress-bar" role="progressbar" aria-valuenow="{{game.unit(\'energy\').count()}}" aria-valuemin="0" aria-valuemax="{{game.ascendCost()}}" ng-style="{width:game.ascendCostPercent().times(100)+\'%\'}"> {{game.unit(\'energy\').count()|longnum}} energy, {{game.ascendCostPercent()|percent:0}}<span ng-if="game.ascendCostCapDiff().lessThanOrEqualTo(0) && game.ascendCostPercent().lessThan(1)">: {{game.ascendCostDurationMoment()|duration}}</span> </div> </div> <p><button title="" ng-click="commands.ascend({game:game})" class="btn btn-primary" ng-class="{disabled:game.ascendCost().greaterThan(game.unit(\'energy\').count())}">Ascend - activate mutagen and restart</button></p> <p><button title="" ng-click="game.session.state.watched={}" class="btn btn-default">Reset upgrade notifiers <span class="small disabled glyphicon glyphicon-circle-arrow-up"></span></button></p> <div> <p> Respeccing refunds all {{game.respecSpent().times(game.respecRate()) | longnum}} mutagen you\'ve spent, but resets all mutagen units and upgrades to 0, and resets your next ascension\'s energy cost to {{game.ascendCost({spent:0}) | longnum}}. </p> <p>Respeccing now will cost {{game.respecCost()|longnum}} energy ({{game.respecCostRate|percent}} of your next ascension\'s cost).</p> <p><button title="" ng-click="commands.respec({game:game})" ng-class="{disabled:game.respecSpent().isZero() || !game.isRespecCostMet()}" class="btn btn-default">Respec - refund mutagen, but reset ascension cost</button></p> <p>One free respec is available every three ascensions. You have {{game.unit(\'freeRespec\').count()|longnum}} free respecs remaining.</p> <p><button title="" ng-click="commands.respecFree({game:game})" ng-class="{disabled:game.respecSpent().isZero() || game.unit(\'freeRespec\').count().lessThanOrEqualTo(0)}" class="btn btn-default">Respec (free)</button></p> </div>'),
			a.put("views/desc/unit/mutantarmy.html", "<p>Increases all territory generated by {{unit.effect[0].calcStats().prod | percent:{places:2, plusOne:true} }}.</p>"),
			a.put("views/desc/unit/mutantbat.html", "<p>Increases power of all abilities by {{unit.effect[0].calcStats().power | percent:{places:2, plusOne:true} }}.</p>"),
			a.put("views/desc/unit/mutantclone.html", "<p>Increases Clone Larvae's maximum by {{unit.effect[0].calcStats()['power.clonelarvae'] | percent:{places:2, plusOne:true} }}.</p>"),
			a.put("views/desc/unit/mutanteach.html", "<p>When a hatchery or expansion spawns mutagen, {{unit.effect[0].calcStats()['random.each'] | percent:{places:2,plusOne:true} }} more mutagen is generated.</p>"),
			a.put("views/desc/unit/mutantfreq.html", "<p>Increases the chance of spawning mutagen when buying a hatchery or expansion by {{unit.effect[1].val * (unit.effect[0].calcStats()['random.freq'] - 1) | percent:2}}.</p> <p>You currently have a {{unit.effect[0].unit.stat('random.freq') | percent:2}} chance to spawn mutagen. More {{unit.plural}} have diminishing returns, but can increase this to a maximum of {{unit.effect[1].val * unit.effect[0].val | percent:2}}.</p>"),
			a.put("views/desc/unit/mutanthatchery.html", "<p>Increases larvae production by {{unit.effect[0].calcStats().prod | percent:{places:2, plusOne:true} }}.</p> <p ng-if=\"unit.count().lessThanOrEqualTo(10)\"><i>Raw mutagen produces larvae that doesn't benefit from hatchery mutations. Don't spend all your mutagen too early!</i></p>"),
			a.put("views/desc/unit/mutantmeat.html", '<p ng-repeat="effect in unit.effect"> <span ng-if="effect.unit.isVisible()"> <span class="titlecase">{{effect.unit.unittype.plural}}</span> are {{effect.calcStats().prod | percent:{places:2, plusOne:true} }} more productive. </span> </p>'),
			a.put("views/desc/unit/mutantnexus.html", "<p>Increases energy generation by {{unit.effect[0].calcStats().prod | percent:{places:2,plusOne:true} }}. Creating more has diminishing returns, but increases this to a maximum of {{unit.effect[0].val | percent:{places:2,plusOne:true} }}.</p> <p>Increases maximum energy by {{unit.effect[1].calcStats().capMult | percent:{places:2,plusOne:true} }}. Creating more has diminishing returns, but increases this to a maximum of {{unit.effect[1].val | percent:{places:2,plusOne:true} }}.</p> <p>However, {{unit.effect[2].calcStats().ascendCost | percent:{places:2,plusOne:true} }} more energy must be spent to decrease ascension costs. Creating more increases this to a maximum of {{unit.effect[2].val | percent:{places:2,plusOne:true} }}.</p>"),
			a.put("views/desc/unit/mutantrush.html", "<p>Increases Larvae Rush's power by {{unit.effect[0].calcStats()['power.larvarush'] | percent:{places:2,plusOne:true} }}.</p> <p>Increases Meat Rush's power by {{unit.effect[1].calcStats()['power.meatrush'] | percent:{places:2,plusOne:true} }}.</p> <p>Increases Territory Rush's power by {{unit.effect[2].calcStats()['power.territoryrush'] | percent:{places:2,plusOne:true} }}.</p>"),
			a.put("views/desc/unit/mutantswarmwarp.html", "<p>Increases Swarmwarp's power by {{unit.effect[0].calcStats()['power.swarmwarp'] | percent:{places:2,plusOne:true} }}.</p>"),
			a.put("views/desc/unit/nexus.html", "<p>Nexus are the focal points for the energy needed to cast spells and use special abilities.</p> <p>Drawing energy from multiple nexus is powerful but difficult - each nexus is more expensive than the last, and ultimately there is a limit to the number of nexus your spellcasters can utilize.</p>"),
			a.put("views/desc/unit/nightbug.html", "<p>Nightbugs wriggle and glow when exposed to the energy of your nexus. Gather nightbugs near your nexus to store additional energy.</p> <p>Your nightbugs store up to {{unit.effect[0].calcStats().capMult | percent:{places:2, plusOne:true} }} more maximum energy. Hatching more has diminishing returns, but can increase this to a maximum of {{unit.effect[0].val | percent:{plusOne:true} }}.</p>"),
			a.put("views/desc/unit/premutagen.html", "<p>Mutagen cannot be used while inactive. Ascend to begin a new swarm, resetting most of your units and upgrades, but activating all of your mutagen. Active mutagen allows powerful upgrades.</p>"),
			a.put("views/desc/unit/territory.html", '<p title="Your terrifying warriors tear through their foes to capture territory.">Your swarm\'s military captures territory, fueling your expansion.</p> <div class="titlecase" ng-controller="ChartCtrl" ng-hide="game.unit(\'territory\').velocity().isZero()"> <div ng-if="options.showCharts()" class="animif"> <div google-chart chart="prodchart" style="padding:0;width:500px"></div> </div> <div ng-show="options.showCharts()"> <div><button class="btn btn-default btn-sm" ng-click="options.showCharts(false)">Hide chart</button></div> </div> <div ng-hide="options.showCharts()"> <div><button class="btn btn-default btn-sm" ng-click="options.showCharts(true)">Show chart</button></div> </div> </div>'),
			a.put("views/desc/upgrade/achievementbonus.html", "Larva production increased by {{upgrade.type.effect[0].val * 10 | percent:0}} per 10 achievement points."),
			a.put("views/desc/upgrade/centipedeempower.html", "<p>Dramatically increase both your chilopodomorphs' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('centipede').count() | longnum }} of your chilopodomorphs.</p>"),
			a.put("views/desc/upgrade/clonelarvae.html", "<p>Clone {{ upgrade.effect[0].output() | longnum }} new larvae.</p><p>You produce {{ game.unit('larva').velocity().times(options.velocityUnit().mult) | longnum }} larvae per {{options.velocityUnit().label}}, allowing you to clone up to <span ng-if=\"game.unit('cocoon').isVisible() && game.unit('cocoon').count().greaterThanOrEqualTo(upgrade.effect[0].cap())\">{{ upgrade.effect[0].cap() | longnum }} larvae.</span> <span ng-if=\"!(game.unit('cocoon').isVisible() && game.unit('cocoon').count().greaterThanOrEqualTo(upgrade.effect[0].cap()))\"> <a ng-href=\"#{{game.unit('cocoon').url()}}?num={{'@'+upgrade.effect[0].cap()|encodeURIComponent}}\">{{ upgrade.effect[0].cap() | longnum }} larvae</a>. </span> You have {{ upgrade.effect[0].bank() | longnum}} larvae and cocoons available to clone.</p>"),
			a.put("views/desc/upgrade/devourerempower.html", "<p>Dramatically increase both your devourers' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('devourer').count() | longnum }} of your devourers.</p>"),
			a.put("views/desc/upgrade/expansion.html", "<p>Each expansion increases your hatcheries' larvae production by {{upgrade.type.effect[0].val | percent:{plusOne:true} }}. Currently, your expansions increase hatchery production by {{upgrade.effect[0].calcStats().prod | percent:{plusOne:true,longnum:true} }}.</p> <p ng-if=\"upgrade.count().greaterThanOrEqualTo(upgrade.unit.stat('random.minlevel.expansion'))\" title=\"Savescumming won't work, by the way.\"> Your next expansion has a {{upgrade.unit.stat('random.freq')|percent:0}} chance to award {{upgrade.effect[1].outputNext().qty|longnum}} mutagen. </p> <p ng-if=\"!upgrade.count().greaterThanOrEqualTo(upgrade.unit.stat('random.minlevel.expansion')) && game.unit('mutagen').isVisible()\"> Build {{upgrade.unit.stat('random.minlevel.expansion')|longnum}} expansions to begin earning mutagen. </p>"),
			a.put("views/desc/upgrade/giantspiderempower.html", "<p>Dramatically increase both your giant arachnomorphs' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('giantspider').count() | longnum }} of your giant arachnomorphs.</p>"),
			a.put("views/desc/upgrade/goonempower.html", "<p>Dramatically increase both your goons' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('goon').count() | longnum }} of your goons.</p>"),
			a.put("views/desc/upgrade/hatchery.html", "<p> Each hatchery produces {{upgrade.type.effect[0].val.times(options.velocityUnit().mult) | longnum}} more larvae per {{options.velocityUnit().label}}. Currently, your hatcheries produce a total of {{upgrade.unit.totalProduction().larva.times(options.velocityUnit().mult) | longnum:0}} larvae per {{options.velocityUnit().label}}. With no multipliers, they would produce {{upgrade.unit.prod[0].val.plus(upgrade.effect[0].calcStats().base).times(options.velocityUnit().mult) | longnum:0}} larvae per {{options.velocityUnit().label}}.</p> <p ng-if=\"upgrade.count().greaterThanOrEqualTo(upgrade.unit.stat('random.minlevel.hatchery'))\" title=\"Savescumming won't work, by the way.\"> Your next hatchery has a {{upgrade.unit.stat('random.freq')|percent:0}} chance to award {{upgrade.effect[1].outputNext().qty|longnum}} mutagen. </p> <p ng-if=\"!upgrade.count().greaterThanOrEqualTo(upgrade.unit.stat('random.minlevel.hatchery')) && game.unit('mutagen').isVisible()\"> Build {{upgrade.unit.stat('random.minlevel.hatchery')|longnum}} hatcheries to begin earning mutagen. </p>"),
			a.put("views/desc/upgrade/iamrich.html", ""),
			a.put("views/desc/upgrade/larvarush.html", "Instantly give birth to {{ upgrade.effect[0].output().plus(upgrade.effect[1].output()) | longnum }} new larvae."),
			a.put("views/desc/upgrade/locustempower.html", "<p>Dramatically increase both your locusts' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('locust').count() | longnum }} of your locusts.</p>"),
			a.put("views/desc/upgrade/meatrush.html", "Instantly create {{ upgrade.effect[0].output().plus(upgrade.effect[1].output()) | longnum }} new meat."),
			a.put("views/desc/upgrade/mosquitoempower.html", "<p>Dramatically increase both your culicimorphs' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('mosquito').count() | longnum }} of your culicimorphs.</p>"),
			a.put("views/desc/upgrade/mutatearmy.html", "<p>Increases the amount of territory captured, and increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/mutatebat.html", "<p>Increases the power of all abilities, and increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/mutateclone.html", "<p>Increases Clone Larvae's maximum, and increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/mutateeach.html", "<p>When a hatchery or expansion spawns mutagen, more mutagen is generated. Increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/mutatefreq.html", "<p>Increases the chance of spawning mutagen when buying a hatchery or expansion, and increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/mutatehatchery.html", "<p>Increases larvae production, and increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/mutatemeat.html", "<p>Increases production of all meat units, and increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/mutatenexus.html", "<p>Increases energy generated, but also increases the energy cost of ascending. Increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/mutaterush.html", "<p>Increases the power of Larvae Rush, Meat Rush, and Territory Rush, and increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/mutateswarmwarp.html", "<p>Increases Swarmwarp's power, and increases the cost of unlocking other mutagen powers.</p>"),
			a.put("views/desc/upgrade/roachempower.html", "<p>Dramatically increase both your roaches' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('roach').count() | longnum }} of your roaches.</p>"),
			a.put("views/desc/upgrade/spiderempower.html", "<p>Dramatically increase both your arachnomorphs' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('spider').count() | longnum }} of your arachnomorphs.</p>"),
			a.put("views/desc/upgrade/stingerempower.html", "<p>Dramatically increase both your stingers' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('stinger').count() | longnum }} of your stingers.</p>"),
			a.put("views/desc/upgrade/swarmlingempower.html", "<p>Dramatically increase both your swarmlings' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('swarmling').count() | longnum }} of your swarmlings.</p>"),
			a.put("views/desc/upgrade/swarmwarp.html", "Warp time around your swarm. Instantly travel into the future, gaining {{ upgrade.effect[0].output() | duration:'seconds' }} of production. Does not produce energy."),
			a.put("views/desc/upgrade/territoryrush.html", "Instantly capture {{ upgrade.effect[0].output().plus(upgrade.effect[1].output()) | longnum }} new territory."),
			a.put("views/desc/upgrade/waspempower.html", "<p>Dramatically increase both your wasps' meat cost and territory captured.</p><p>This will destroy all {{ game.unit('wasp').count() | longnum }} of your wasps.</p>")
		}
	]);
