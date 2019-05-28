<?php
  add_theme_support('post-thumbnails');

  function enqueueMyScripts(){
    wp_enqueue_style(
      'materializeCss',
      'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css'
    );

    wp_enqueue_style(
      'myCss',
      get_template_directory_uri() . '/style.css',
      array('materializeCss')
    );

    wp_enqueue_script(
      'myJs',
      get_template_directory_uri().'/script.js',
      null,null,true
    );

    wp_localize_script(
      'myJs',
      'ajaxLocalisedObj',
      array('ajaxUrl'=>admin_url('admin-ajax.php'))
    );
  }

  add_action(
    'wp_enqueue_scripts',
    'enqueueMyScripts'
  );

  function get_posts_by_category() {
    $posts = get_posts(
      array(
        'category_name'=>$_POST['category'],
        'numberposts'=>-1
      )
    );
    echo json_encode($posts);
    die();
  }
  
  add_action(
  'wp_ajax_get_posts_by_category',
  'get_posts_by_category');

  add_action(
    'wp_ajax_nopriv_get_posts_by_category',
    'get_posts_by_category');
?>