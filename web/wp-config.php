<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'muvbe_26');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', '127.0.0.1');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'S5a5,}gaE70ph!,|S,(H:JVAY<A/t=Mubxr3VHY#S(sRZ99}=bY[{(Wr;XOEUyCG');
define('SECURE_AUTH_KEY',  ':-iT3DGI^8`5je?oFmL%OZQJQ3b6x%>_]j]}E`mnDf`B.=TZLX?O,}XvxJe*h}~n');
define('LOGGED_IN_KEY',    'kVD[:5Y}#/{8}}TZXLQKfFKZ1W[<33.1JJ)8J?Y+4; S8sllQew5[x$05XBj R$3');
define('NONCE_KEY',        '.LLgxaS8@U05I{o,t+p*;V8ck1x4Gt)SMlO}|ga,}`ZXaZDTUB-mfl(Km,CHtG}5');
define('AUTH_SALT',        '8_+}VsNr$$?_$F 2=d4 `*%E1IX3hVeK?Ym^;gp8Q@ZX&ZbMNJ|%]JP=-^O+xHN-');
define('SECURE_AUTH_SALT', 'LD2b$g ,j+q.2C<LvKE$ ;!nd0/mF7PH%3=Ze$|#8(!LL|1ziL,3,a+4/Lc||*-Z');
define('LOGGED_IN_SALT',   'W36<O5.Jpk-P-<5sfNyvmWC%,&h%:8 J/5*1[LPN4v7DdzLky31*_Uq]sRle(`8d');
define('NONCE_SALT',       '7>&U8KFWHb/yNlq!56Tza!:T;klh3)? /-(VAbhco;NhU`A5FN~!u]qK-9%qEqf1');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
  define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
