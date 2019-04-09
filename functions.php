<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */
require_once( __DIR__ . '/vendor/autoload.php' );
require_once( __DIR__ . '/lib/form-data.php');

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
	});

	add_filter('template_include', function( $template ) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

add_action('wp_enqueue_scripts', function() {
	wp_enqueue_style('style', get_template_directory_uri() . '/static/css/style.css');
	wp_enqueue_script('bundle', get_template_directory_uri() . '/static/js/bundle.js', null, null, true);
});

// add_action('init', function() {
// 	register_post_type('zz-article', [
// 		'labels' => [
// 			'name' => __('Articles'),
// 			'singular_name' => __('Article'),
// 		],
// 		'public' => true,
// 		'has_archive' => true,
// 		'rewrite' => [
// 			'slug' => 'article'
// 		],
// 		'menu_position' => 5,
// 	]);
// });

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;

/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {

	const MAX_FILE_SIZE = 1048576;
	private $scripts = [];

	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['menu'] = new Timber\Menu();
		$context['site'] = $this;
		$context['site_name'] = $this->name;
		$context['form_data'] = $this->handle_form_data();

		list(
			$context['site_name'],
			$context['site_name_repeat'],
		) = preg_split('/\s+/', $this->name, 2);

		return $context;
	}

	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5', array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats', array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	public function enqueue_script($src) {
		if (!in_array($src, $this->scripts)) {
			$this->scripts[] = $src;
		}
	}

	public function get_scripts() {
		return array_reduce($this->scripts, function($result, $src) {
			return $result . '<script src="' . get_template_directory_uri() . '/static/js/' . $src . '.js"></script>';
		}, '');
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter( new Twig_SimpleFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		$twig->addFunction(new Timber\Twig_Function('enqueue_script', [$this, 'enqueue_script']));
		$twig->addFunction(new Timber\Twig_Function('get_scripts', [$this, 'get_scripts']));
		$this->add_wp_functions($twig, ['get_category_link', 'current_user_can', 'wp_nonce_field']);
		return $twig;
	}

	private function add_wp_functions($twig, $functions) {
		foreach ($functions as $function) {
			$twig->addFunction(new Timber\Twig_Function($function, $function));
		}
	}

	private function handle_form_data() {
		$form_data = new FormData();

		return $form_data
			->apply('attachment', function(&$entries) {
				if (
					!isset($entries['attachment_nonce']) ||
					!wp_verify_nonce($entries['attachment_nonce'], 'attachment')
				) {
					throw new RuntimeException('could not verify nonce');
				}

				$attachment = $entries['attachment'];
				$tmp_name = $attachment['tmp_name'];
				$filetype = wp_check_filetype(basename($attachment['name']));
				$upload_path = ABSPATH . 'uploads';
				$hashed_filename = sprintf('%s.%s', sha1_file($tmp_name), $filetype['ext']);

				if ($attachment['size'] > self::MAX_FILE_SIZE) {
					throw new RuntimeException('Max file size exceeded.');
				}

				if (!file_exists($upload_path)) {
					mkdir($upload_path);
				}

				if (!move_uploaded_file(
					$tmp_name,
					sprintf(
						'%s/%s',
						$upload_path,
						$hashed_filename
					)
				)) {
					throw new RuntimeException('Failed to move uploaded file.');
				}

				$entries['url'] = "/uploads/$hashed_filename";
			})
			->apply('submit', function($entries) {
				return wp_handle_comment_submission(wp_unslash($entries));
			})
			->getEntries();
	}
}

new StarterSite();
