var sectionHeight = 600;

function resizePages() {
	var h = $(window).height();
	sectionHeight  =  h < 600 ? 600 : h;
	
	// Each sections height
	$('section#cover').css('height',sectionHeight);
	$('section').css('min-height',sectionHeight);
	$('.wrapper').each(function () {
		$(this).css('min-height',$(this).closest('section').height() - 100);
	});

	// Home Page height adjust
	$('#covercontainer h1').css('padding-top',sectionHeight/2-95);
	$('#covercontainer .navcontainer').css('padding-top',sectionHeight/2);

	// Flip Images height and width
	$('.front .pad').each(function () {
		var $frontPad = $(this),
			$backPad = $(this).closest('.panel').find('.back .pad');
		if($frontPad.height() > $backPad.height()) {
			$backPad.height($frontPad.height());
			$(this).closest('.custom-profile').height($frontPad.height());
		}
		else {
			$frontPad.height($backPad.height());
			$(this).closest('.custom-profile').height($backPad.height());
		}

	});
}


$(document).ready(function() {

	var scrollElement = 'html, body';
	$('html, body').each(function () {
		var initScrollTop = $(this).attr('scrollTop');
		$(this).attr('scrollTop', initScrollTop + 1);
		if ($(this).attr('scrollTop') == initScrollTop + 1) {
			scrollElement = this.nodeName.toLowerCase();
			$(this).attr('scrollTop', initScrollTop);
			return false;
		}    
	});
	$(".down a, .goTo").click(function(event) {
		event.preventDefault();
		
		var $this = $(this),
		target = this.hash,
		$target = $(target);
		
		$(scrollElement).stop().animate({
			'scrollTop': $target.offset().top
		}, 300, 'swing', function() {
			window.location.hash = target;
		});
	});

	//resize
	$(window).resize(function(e) {
		resizePages();
	});
	resizePages();


	//scroll
		

	$(window).scroll(_.throttle(function(e){
        var top = $(document).scrollTop();
		var wHeight = Math.max(640,$(window).height());
		// Shift navigation element to top
		if(top >= (sectionHeight / 2 + $('.navcontainer').height())) {
			$('#footer').css({
				opacity: 1,
				top: 0
			});
		}
		else {
			$('#footer').css({
				opacity: 0,
				top: -30
			});
		}

		$('section:not(:last)').each(function () {
			if((window.scrollY + 200) >= this.offsetTop && (window.scrollY + 200) < $(this).next()[0].offsetTop) {
				var self = this;
				$('#footer li a:not(:first)').each(function(){
					if($(this).data('id') == self.id) {
						$('#footer .active').removeClass('active');	
						$(this).addClass('active');	
					}
				});
			}
		});

		if((window.scrollY + 200) > $('section:last')[0].offsetTop) {
			$('#footer .active').removeClass('active');	
			$('#footer a:last').addClass('active');	
		}
    }, 300));

    // Flip
    $('.hover').click(function(){
		$(this).toggleClass('flip');
	});

	
    
});





























