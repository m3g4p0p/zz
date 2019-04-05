<?php
/**
 * The template for displaying Category pages.
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.2
 */

$templates = array( 'category-' . get_query_var( 'cat' ) . '.twig', 'index.twig' );
$context = Timber::context();
$context['title'] = single_cat_title( '', false );
$context['posts'] = new Timber\PostQuery();

Timber::render( $templates, $context );
