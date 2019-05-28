<?php get_header(); ?>
<?php $page = get_page_by_path('home'); ?>

<div
    class="hero" 
    style="background-image:url('<?php echo get_the_post_thumbnail_url($page); ?>')">
</div>

<div id="home" class="container">
  <h1>
    <?php echo $page->post_name; ?>
  </h1>

  <?php echo $page->post_content; ?>

  <button id="reviews-btn" class="btn">
    get reviews
  </button>
</div>

<?php get_footer(); ?>