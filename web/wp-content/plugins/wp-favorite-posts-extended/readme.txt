=== WP Favorite Posts Extended ===
Contributors: avrilmaomao
Donate link:
Tags: favorite posts, favorite, favourite, posts, favorites, json,api
wp-favorite-posts, reading list, post list, post lists, lists
Requires at least: 3.5
Tested up to: 4.0
Stable tag: 0.1

Based on plugin "WP Favorite Posts",added json api feature.

== Description ==
This plugin is based on "WP Favorite Posts",and extends json api to provide access for mobile apps.
Three methods are provided:
wpfp/add
	 postid: required
	 cookie: optional
wpfp/remove
	postid：required
	cookie：optional
wpfp/lists
    cookie ：optional
The cookie param is the same as "JSON API USER" plugin used.

These methods support users not logged,if the client side can receive and send cookies.

code can be found at: https://github.com/avrilmaomao/wp-favorite-posts-extended

== Installation ==

1. Unzip into your `/wp-content/plugins/` directory.
1. Activate the plugin through the 'Plugins' menu in WordPress
1. Install Plugin "JSON API" and "JSON API USER"
1. In "JSON API" settings page, activate "WPFP" controller


== Screenshots ==

== Changelog ==
= 0.1 (2014-11-05) =
* First Release
