This wordpress plugin is based on WP Favorite Posts as listed below.
It extends json api (if installed) to provide a friendly interface for mobile apps.

1. add fav

  method： json=wpfp/add
  params：
	 postid: required
	 cookie: optional

2. remove fav

  method：json=wpfp/remove
  params：
	postid：required 
	cookie：optional

3. get a user's fav postids

  method：json=wpfp/lists
  params：
         cookie ：optional


#About WP Favorite Posts

[http://wordpress.org/plugins/wp-favorite-posts]

#About JSON API

[https://wordpress.org/plugins/json-api]

#About JSON USER API

[https://wordpress.org/plugins/json-api-user/]
