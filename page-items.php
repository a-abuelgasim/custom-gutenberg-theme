<?php get_header(); ?>
<?php $page = get_page_by_path('items'); ?>
<div id="items" class="container">
  <h1><?php echo $page->post_name; ?></h1>
  <?php echo $page->post_content; ?>
</div>
<?php get_footer(); ?>