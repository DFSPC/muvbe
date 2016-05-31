<?php
/*
Plugin Name: Tipo de post imagen o video
*/

add_action( 'init', 'my_photo_cpt' );
  function my_photo_cpt() {
  	$labels = array(
  		'name'               => _x( 'Photo uploads', 'post type general name', 'your-plugin-textdomain' ),
  		'singular_name'      => _x( 'Photo', 'post type singular name', 'your-plugin-textdomain' ),
  		'menu_name'          => _x( 'Photos', 'admin menu', 'your-plugin-textdomain' ),
  		'name_admin_bar'     => _x( 'Photo', 'add new on admin bar', 'your-plugin-textdomain' ),
  		'add_new'            => _x( 'Add New', 'photo', 'your-plugin-textdomain' ),
  		'add_new_item'       => __( 'Add New Photo', 'your-plugin-textdomain' ),
  		'new_item'           => __( 'New Photo', 'your-plugin-textdomain' ),
  		'edit_item'          => __( 'Edit Media', 'your-plugin-textdomain' ),
  		'view_item'          => __( 'View Media', 'your-plugin-textdomain' ),
  		'all_items'          => __( 'All Media', 'your-plugin-textdomain' ),
  		'search_items'       => __( 'Search Media', 'your-plugin-textdomain' ),
  		'parent_item_colon'  => __( 'Parent Photos:', 'your-plugin-textdomain' ),
  		'not_found'          => __( 'No media found.', 'your-plugin-textdomain' ),
  		'not_found_in_trash' => __( 'No media found in Trash.', 'your-plugin-textdomain' )
  	);

  	$args = array(
  		'labels'             => $labels,
  		'description'        => __( 'Description.', 'your-plugin-textdomain' ),
  		'public'             => true,
  		'publicly_queryable' => true,
  		'show_ui'            => true,
  		'show_in_menu'       => true,
  		'query_var'          => true,
  		'rewrite'            => array( 'slug' => 'photo-upload' ),
  		'capability_type'    => 'post',
  		'has_archive'        => true,
  		'hierarchical'       => false,
  		'menu_position'      => null,
  		'show_in_rest'       => true,
  		'rest_base'          => 'photos-api',
  		'rest_controller_class' => 'WP_REST_Posts_Controller',
  		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
  	);

  	register_post_type( 'photo', $args );
}