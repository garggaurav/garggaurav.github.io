;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $.fn.foundationButtons          ? $doc.foundationButtons() : null;
  $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
  $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
  $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
  $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;

  $('input, textarea').placeholder();


  // Hide address bar on mobile devices
  if (Modernizr.touch) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

(function ($) {
// VERTICALLY ALIGN FUNCTION
$.fn.vAlign = function() {
  return this.each(function(i){
    var ah = $(this).height();
    var ph = $(this).parent().height();
    var mh = Math.ceil((ph-ah) / 2);
    if (Modernizr.mq('only screen and (max-width: 767px)') || (document.documentElement && document.documentElement.clientWidth < 768)) {
      mh = 10;
      $(this).parent().find('.seven.columns').before($(this));
    }
    else {
      if ($(this).hasClass('right')) {
        $(this).parent().find('.seven.columns').after($(this));
      }
    }
    $(this).css('margin-top', mh);
  });
};
})(jQuery);

  $(window).on('resize', function(){
    var $imgheight = $('#about img').outerHeight(true);
    if ($imgheight > 700) { $imgheight = 700; }
    var $headlineheight = $('.headline h1').outerHeight(true) + $('.headline h2').outerHeight(true) + $('.headline .button').outerHeight(true);
    if ($headlineheight < $imgheight) {
      $('.headline').css('padding-top', ($imgheight - $headlineheight)/1.7).css('padding-bottom', ($imgheight - $headlineheight)/2.3).css('height', 'auto');
    }
    else {
      $('.headline').css('height', $imgheight).css('padding-top', 0).css('padding-bottom', 0);
    }
    $('.feature .five.columns').vAlign();
  });

  // Can also be used with $(document).ready()
  $(document).ready(function() {
    // prettify code
    prettyPrint();

    // start the font rendering
    $(".headline h1").lettering()
    $(".headline h1").fitText(1.4);

    // set size of headline box on load
    var $imgheight = $('#about img').outerHeight(true);
    if ($imgheight > 700) { $imgheight = 700; }
    var $headlineheight = $('.headline h1').outerHeight(true) + $('.headline h2').outerHeight(true) + $('.headline .button').outerHeight(true);
    if ($headlineheight < $imgheight) {
      $('.headline').css('padding-top', ($imgheight - $headlineheight)/1.7).css('padding-bottom', ($imgheight - $headlineheight)/2.3).css('height', 'auto');
    }
    else {
      $('.headline').css('height', $imgheight).css('padding-top', 0).css('padding-bottom', 0);
    }

    // fancybox modal image viewer
    $('span.gallery-icon a').fancybox({
      'padding' : 0,
      'transitionIn' : 'none',
      'transitionOut' : 'none',
      'overlayOpacity': '0.4',
      'overlayColor' : '#000000',
      'type' : 'image',
      'changeFade' : 0
    });

  });

  $(window).load(function() {
    // vertically align work
    $('.feature .five.columns').vAlign();
  });

})(jQuery, this);