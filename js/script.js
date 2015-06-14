
function fadedEls(el, shift) {
    el.css('opacity', 0);

    switch (shift) {
        case undefined: shift = 0;
        break;
        case 'h': shift = el.eq(0).outerHeight();
        break;
        case 'h/2': shift = el.eq(0).outerHeight() / 2;
        break;
    }

    $(window).resize(function() {
        if (!el.hasClass('ani-processed')) {
            el.eq(0).data('scrollPos', el.eq(0).offset().top - $(window).height() + shift);
        }
    }).scroll(function() {
        if (!el.hasClass('ani-processed')) {
            if ($(window).scrollTop() >= el.eq(0).data('scrollPos')) {
                el.addClass('ani-processed');
                el.each(function(idx) {
                    $(this).delay(idx * 200).animate({
                        opacity : 1
                    }, 1000);
                });
            }
        }
    });
};

(function($) {
$(function() {

  if (/msie/i.test(navigator.userAgent)) {
    $('img').each(function() {
      $(this).css({
        width: $(this).attr('width') + 'px',
        height: 'auto'
      });
    });
  }


  


  // ordered-items
  (function(el) {
    $(window).scroll(function() {
      if ($(window).width() > 480) {
        $('.row', el).each(function(idx) {
          if ($(window).scrollTop() >= ($(this).offset().top - $(window).height() + $(window).height()/2 +100)) {
            // scroll current block to top
            if (!$(this).hasClass('active')) {
              $.scrollTo($(this), {axis:'y', duration:500});
            }
            $(this).addClass('active');
          } else {
            $(this).removeClass('active');
          }
        });
      }
    });

    $(window).resize(function() {
      $('.page-transitions', el).each(function() {
        var maxH = 0;
        $('.pt-page', this).css('height', 'auto').each(function() {
          var h = $(this).outerHeight();
          if (h > maxH) maxH = h;
        }).css('height', maxH+'px');
        $(this).css('height', maxH+'px');
      });
    });

    $('.page-transitions', el).each(function() {
      var pt = PageTransitions();
      pt.init(this);

      $('.pt-control-prev', this).on('click', function() {
        pt.gotoPage(68, 'prev');
        return false;
      });

      $('.pt-control-next', this).on('click', function() {
        pt.gotoPage(68, 'next');
        return false;
      });
    });
  })($('.ordered-items'));


  // responsive
  $(window).resize(function() {
    // ordered-items
    if ($(window).width() > 480) {
      $('.ordered-items.mobile-processed').removeClass('mobile-processed').children().each(function() {
        $('.box', this).each(function() {
          $(this).appendTo($(this).parent());
        });
      });
    } else {
      $('.ordered-items:not(.mobile-processed)').addClass('mobile-processed').children().each(function() {
        $('.box', this).each(function() {
          $(this).insertAfter($(this).parent().find('h3'));
        });
      });
    }
  });

  // Sections height & scrolling
        $(window).resize(function() {
            var sH = $(window).height();
            $('section.header-10-sub').css('height', (sH - $('header').outerHeight()) + 'px');
           // $('section:not(.header-10-sub):not(.content-11)').css('height', sH + 'px');
        });        

        // Parallax

        $('.header-10-sub, .content-23.custom-bg').each(function() {
            if(! isMobile.any())
            $(this).parallax('50%', 0.3, true);
            else
            $(this).css('background-attachment', 'initial');
        });

        /* For the section content-8 */
        if ($('.content-8').length > 0) {
            fadedEls($('.content-8'), 300);
        }

        /* For the section content-7 */

        if ($('.content-7').length > 0) {

            // Faded elements
            //fadedEls($('.content-7'), 300);

            // Ani screen
            (function(el) {
                $('img:first-child', el).css('left', '-29.7%');

                $(window).resize(function() {
                    if (!el.hasClass('ani-processed')) {
                        el.data('scrollPos', el.offset().top - $(window).height() + el.outerHeight());
                    }
                }).scroll(function() {
                    if (!el.hasClass('ani-processed')) {
                        if ($(window).scrollTop() >= el.data('scrollPos')) {
                            el.addClass('ani-processed');
                            $('img:first-child', el).animate({
                                left : 0
                            }, 500);
                        }
                    }
                });
            })($('.screen'));
        }

        
        $('body').prepend($('.mask, .popup-video').not('pre .mask, pre .popup-video'));
        $('header-23 .mask, header-23 .popup-video').not('pre .mask, pre .popup-video').detach();

        var iframe = $('#pPlayer')[0];
        var player = $f(iframe);
        player.addEvent('ready', function() {});

        function addEvent(element, eventName, callback) {
            if (element.addEventListener) {
                element.addEventListener(eventName, callback, false);
            } else {
                element.attachEvent(eventName, callback, false);
            }
        }

        $('#play').on('click', function(evt) {
            evt.preventDefault();
            $('.popup-video').addClass('shown');
            $('.popup-video, .mask').fadeIn('slow', function() {
                player.api('play')
            });
            $('.mask').on('click', function() {
                player.api('pause');
                $('.popup-video, .mask').fadeOut('slow', function() {
                    $('.popup-video').removeClass('shown');
                });
            });
        });

       
        /*(function(el) {
            el.css('left', '-100%');

            $(window).resize(function() {
                if (!el.hasClass('ani-processed')) {
                    el.data('scrollPos', el.offset().top - $(window).height() + el.outerHeight());
                }
            }).scroll(function() {
                if (!el.hasClass('ani-processed')) {
                    if ($(window).scrollTop() >= el.data('scrollPos')) {
                        el.addClass('ani-processed');
                        el.animate({
                            left : 0
                        }, 500);
                    }
                }
            });
        })($('.content-11 > .container'));*/


  $(window).resize().scroll();

});


$(window).load(function() {

  $('html').addClass('loaded');


  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });


  $(window).resize().scroll();

  $('.content-23').each(function() {
        if(! isMobile.any())
            $(this).parallax('50%', 0.3, true);
        else
            $(this).css('background-attachment', 'initial');
    });
  startupKit.attachBgVideo();

});
})(jQuery);