var sectionHeight = 600;

function resizePages() {
	var h = $(window).height();
	sectionHeight  =  h < 600 ? 600 : h;
	$('section#cover').css('height',sectionHeight);
	$('.wrapper').each(function () {
		$(this).css('height',$(this).closest('section').height() + 85);
	});


	$('#covercontainer h1').css('padding-top',sectionHeight/2-95);
	$('#covercontainer .navcontainer').css('padding-top',sectionHeight/2);
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
		console.log(top);
		if(top >= (sectionHeight / 2 + $('.navcontainer').height())) {
			$('#footer').css({
				top: 0
			});
		}
		else {
			$('#footer').css({
				top: -30
			});
		}
    }, 500));

    // Flip
    $('.hover').hover(function(){
		$(this).addClass('flip');
	},function(){
		$(this).removeClass('flip');
	})
    
});





























