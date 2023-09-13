(function($) {
	
	"use strict";
	
	/* Default Variables */
	var NaxosOptions = {
		loader:false,
		navigation:'sticky',	//sticky, default
		zoomControlDiv:null,
		mapColor:'',
		mapMarker:'',
		security:'',
		rtl:false
	};
	
	if (typeof Naxos!=='undefined') {
		jQuery.extend(NaxosOptions, Naxos);
	}
	
	$.NaxosTheme = {
		
		//Initialize
		init:function() {
			//RTL
			if (jQuery('body').hasClass('rtl')) {
				NaxosOptions.rtl = true;
			}
			
			this.loader();
			this.animations();
			this.navigation();
			this.searchWrapper();
			this.scroll();
			this.smoothScroll();
			this.banner();
			this.lightBox();
			this.parallax();
            this.subscribe();
			this.imageSlider();
			this.shop();
			this.map();
			this.shortCodes();
			this.replace();
		},
		
		//Page Loader
		
	/*	loader:function() {
            jQuery(".page-loader").fadeOut();
			if (NaxosOptions.loader) {
				jQuery(window).on("load", function() {
					jQuery(".page-loader").fadeOut();
				});
			}
		},
		*/
		//Animations
		animations:function() {
			new WOW().init();
		},
		
		//Navigation
		navigation:function() {
			//Add 'span' to main menu item
			jQuery(".nav-menu > li > a").each(function() {
				var item = jQuery(this),
					txt = item.html();
				
				jQuery(this).parent().addClass('nav-item');
				jQuery(this).addClass('nav-link js-scroll-trigger').html("<span>"+txt+"</span>");
			});
			
			//Mobile menu open
			jQuery('.menu-bar').on("click", function() {
				jQuery('.header').addClass('mobile-menu-open');
				jQuery(".nav-menu li.dropdown > .dropdown-arrow").show();
			});

			//Mobile menu close
			jQuery('.close-button').on("click", function() {
				jQuery('.header').removeClass('mobile-menu-open');
				jQuery(".nav-menu li.dropdown > .dropdown-arrow").hide();
			});
			
			//Dropdown menu
			var $arrow = jQuery('<div class="dropdown-arrow"><i class="fas fa-chevron-down"></i></div>').hide();
			jQuery('.nav-menu li.dropdown').append($arrow);
			
			jQuery(document).on("click", ".nav-menu li.dropdown > .dropdown-arrow", function(e) {
				e.preventDefault();
				jQuery(this).toggleClass("open");
				jQuery(this).parent().find("> .sub-menu").slideToggle("slow");
			});
			
			//Fixed menu
			if (NaxosOptions.navigation==='normal') {
				jQuery('.main-menu-area').addClass('fixed-top');
			}
		},
		
		//Search wrapper
		searchWrapper:function() {
			if (jQuery('.nav-search-icon').length===0) {
				return;
			} else {
				jQuery('.nav-search-icon').append('\
					<li class="nav-item search-option">\
						<a class="nav-link" href="#">\
							<i class="fas fa-search"></i>\
						</a>\
					</li>'
				);
			}
			
			var $search = jQuery('.search-wrapper'),
				$searchIcon = jQuery('.search-option'),
				$closeBtn = jQuery('.search-close-btn');
			
			//Search button
			$searchIcon.on("click", function(e) {
				e.preventDefault();
				$search.addClass('wrapper-active');
			});

			//Close search window
			$closeBtn.on("click", function() {
				$search.removeClass('wrapper-active');
			});
		},
		
		//Scroll
		scroll:function() {
			jQuery(window).on("scroll", function() {
				var pos = jQuery(window).scrollTop();

				//Main menu scroll animation
				if (pos>=100) {
					jQuery(".main-menu-area").addClass("fixed-menu animate slideInDown");
				} else {
					jQuery(".main-menu-area").removeClass("fixed-menu animate slideInDown");
				}

				//Scroll to top button
				if (pos>=500) {
					jQuery(".to-top").addClass("fixed-totop");
				} else {
					jQuery(".to-top").removeClass("fixed-totop");
				}
			});
		},
		
		//Smooth scroll
		smoothScroll:function() {
			//Menu click event to scroll
			jQuery('a.js-scroll-trigger[href*="#"]:not([href="#"])').on("click", function() {
				if (location.pathname.replace(/^\//, '')===this.pathname.replace(/^\//, '') && location.hostname===this.hostname) {
					jQuery('.nav-menu > li').each(function() {
						jQuery(this).removeClass('current_page_item');
					});
					
					var target = $(this.hash);
					target = target.length ? target : jQuery('[name='+this.hash.slice(1)+']');
					
					if (target.length) {
						var pos = target.offset().top-30;
						jQuery('html, body').animate({scrollTop:pos}, 1000);
						return false;
					}
				}
			});

			//Close responsive menu when a scroll trigger link is clicked
			jQuery('.js-scroll-trigger').on('click', function(e) {
				var link = jQuery(this).attr('href');

				if (link!="" && link!="#") {
					jQuery('.navbar-collapse').collapse('hide');
					jQuery('.header').removeClass('mobile-menu-open');
					jQuery(".nav-menu li.dropdown > .dropdown-arrow").hide();
				} else {
					//Dropdown menu fix
					e.preventDefault();
					
					if (jQuery(this).parent().find("> .dropdown-arrow").is(":visible")) {
						jQuery(this).parent().find("> .dropdown-arrow").toggleClass("open");
						jQuery(this).parent().find("> .sub-menu").slideToggle("slow");
					}
				}				
			});

			//Activate scrollspy to add active class to navbar items on scroll
			try {
				new bootstrap.ScrollSpy(document.body, {
					target:'#mainNav',
					offset:56
				});
			} catch(err) {}
		},
		
		//Banner
		banner:function() {
			var bgImg, src, delay, arr, section, container;
			
			//Image background
			if (jQuery(".banner.image-bg").length>0) {
				bgImg = $(".banner.image-bg");
				
				//Image				
				src = bgImg.data("source");				
				
				if (src!==undefined && src!=="") {
					arr = src.split(",");
					bgImg.backstretch(arr);
				}
			}
			
			//Slide background
			if (jQuery(".banner.slide-bg").length>0) {
				bgImg = $(".banner.slide-bg");
				
				//Images
				src = bgImg.data("source");
				
				if (src!==undefined && src!=="") {
					delay = bgImg.data("delay") * 1000;		
					arr = src.split(",");
					bgImg.backstretch(arr, {duration:delay, fade:750});
				}
			}
			
			//Video background
			if (jQuery(".banner.video-bg").length>0) {
				bgImg = $(".banner.video-bg");
				
				//Hide player on mobile
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					jQuery(".player").hide();
					jQuery(".player-controls").hide();
				}

				//Youtube player
				jQuery(".player").mb_YTPlayer();

				//Player controls
				jQuery("#play").on("click", function() {
					jQuery(".player").playYTP();
				});

				jQuery("#pause").on("click", function() {
					jQuery(".player").pauseYTP();
				});
			}
			
			//Append outer section to container
			if (jQuery("section#banner").length>0) {
				section = $("section#banner");
				container = section.find(" > .container");
				bgImg.prepend(container);
				section.remove();
			}
			
			if (jQuery(".banner-image-center.w-100").length>0) {
				jQuery(".banner-image-center.w-100").appendTo("#home");
			}
		},
		
		//Light box
		lightBox:function() {
			jQuery('a[data-rel^=lightcase]').lightcase();
		},
		
		//Parallax sections
		parallax:function() {
			if (jQuery('.parallax').length===0) {
				return;
			}
	
			jQuery(window).on('load', function() {
				jQuery('.parallax').each(function() {
					if (jQuery(this).data('image')) {
						jQuery(this).parallax('50%', 0.5);
						jQuery(this).css({backgroundImage:'url('+jQuery(this).data('image')+')'});
					}
				});
			});
		},
		
		//Background image
		bgImage:function() {
			if (jQuery('.bg-img').length===0) {
				return;
			}
			
			jQuery(window).on('load', function() {
				jQuery('.bg-img').each(function() {
					if (jQuery(this).data('image')) {
						jQuery(this).css({backgroundImage:'url('+jQuery(this).data('image')+')'});
					}
				});
			});
		},
        
        //Subscribe form
        subscribe:function() {
			if (jQuery('#subscribe-form').length===0) {
				return;
			}
            
            var $subscribeForm = jQuery("#subscribe-form");
            
            $subscribeForm.on('submit', function(e) {
				e.preventDefault();
                
                var email = jQuery('.field-subscribe').val();

                //Validate email address
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    var action = $subscribeForm.attr("action");
                    
                    $.ajax({
                        type:"POST",
                        url:action,
                        data:{
							action:"subscribe",
							security:NaxosOptions.security,
							email:email
						},
                        dataType:"JSON",
                        success:function(data) {
                            if (data.status==="success") {
                                $subscribeForm[0].reset();
                                jQuery("#subscribe-result").fadeIn();
                            } else {
								alert(data.type);
							}
                        }
                    });
                }
            });
        },
		
		//Image slider
		imageSlider:function($root, onComplete) {
			if (typeof $root==='undefined') {$root = $('body');}
			
			if ($root.find('.image-slider').length===0) {
				if (onComplete && typeof onComplete==='function') {
					onComplete();
				}
				
				return;
			}
			
			//Replace block gallery
			$root.find('.image-slider').each(function() {
				let $that = jQuery(this);				
				let $grid = $that.find('.blocks-gallery-grid');
				
				$that.html($grid.html());
				$grid.remove();
				
				var $list = $that.find('li');
				
				$list.each(function() {
					var $item = $(this);
					var $img = $item.find('img');
					
					$img.removeClass().addClass('img-responsive img-rounded');
					$img.removeAttr('data-id').removeAttr('srcset').removeAttr('sizes').removeAttr('alt');
					$img.appendTo($item);

					var $figure = $item.find('figure');
					$figure.remove();
				});
				
				var $arrows = 	'<div class="arrows">'+
									'<a class="arrow left">'+
										'<i class="fas fa-chevron-left"></i>'+
									'</a>'+
									'<a class="arrow right">'+
										'<i class="fas fa-chevron-right"></i>'+
									'</a>'+
								'</div>';
				
				$that.append($arrows);
				$arrows = $that.find('.arrows');
				
				$that.wrap('<div class="image-slider" />').contents().unwrap();
				$list.wrap('<div />').contents().unwrap();	
			});
	
			$root.find('.image-slider').each(function() {
				var $that = jQuery(this),
					$arrows = $that.find('.arrows'),
					$list = jQuery(this).find('> div').not('.arrows'),
					timeout, 
					delay = false,
					process = false;
	
				var setHeight = function($that, onComplete) {
					$that.css({
						height:$that.find('> div:visible img').outerHeight(true)
					});
					
					if (onComplete && typeof onComplete==='function') {
						onComplete();
					}
				};
	
				if ($that.attr('data-delay')) {
					delay = parseInt($that.attr('data-delay'), 10);
					timeout = setInterval(function() {
						$arrows.find('.arrow.right').click();
					}, delay);
				}
	
				jQuery(this).waitForImages(function() {
					jQuery(this).css({position:'relative'});
	
					$list.hide().css({
						position:'absolute',
						top:0,
						left:0,
						zIndex:1,
						width:'100%',
						paddingLeft:15,
						paddingRight:15,
					});
	
					$list.eq(0).show();
	
					setHeight($that, onComplete);
					
					jQuery(window).on('resize', function() {
						setTimeout(function() {
							setHeight($that);
						}, 1);
					});
	
					if ($list.length===1) {
						$arrows.hide();
						clearInterval(timeout);
						delay = false;
					}
				});
	
				$arrows.find('.arrow').on('click', function(e) {
					if (process) {
						e.preventDefault();
						return;
					}
					
					clearInterval(timeout);
					
					var isRight = jQuery(this).hasClass('right');
					var $current = $that.find('> div:visible').not('.arrows'), $next;
	
					if (isRight) {						
						$next = $current.next();	
						
						if (!$next || $next.is('.arrows')) {
							$next = $list.eq(0);
						}
					} else {
						if ($current.is(':first-child')) {
							$next = $list.last();
						} else {
							$next = $current.prev();
						}
					}
	
					process = true;
					$current.css({zIndex:1});
					
					$next.css({opacity:0, zIndex:2}).show().animate({opacity:1}, {duration:300, queue:false, complete:function() {
						$current.hide().css({opacity:1});
						
						if (delay!==false) {
							timeout = setInterval(function() {
								$arrows.find('.arrow.right').click();
							}, delay);
						}
						
						process = false;
					}});
				});
			});
		},
		
		//Shop
        shop:function() {
            //Single product image slider
            if (jQuery('#product-slider-nav').length>0) {
                jQuery('#product-slider-nav').slick({
                    asNavFor:'#product-slider',
                    arrows:false,
                    dots:false,
                    infinite:true,
                    touchMove:false,                    
                    vertical:true,
                    verticalSwiping:true,
                    slidesToShow:3,
                    focusOnSelect:true,
                    responsive:[{
                        breakpoint:767,
                        settings:{
                            vertical:false,
                            slidesToShow:3
                        }
                    }]
                });
                
                jQuery('#product-slider').slick({
                    asNavFor:'#product-slider-nav',
                    arrows:false,
                    dots:false,
                    swipeToSlide:true                    
                });
            }
        },
		
		//Google Maps
		map:function() {
			if (jQuery('#google-map').length===0) {
				return;
			}
			
			var that = this;
	
			jQuery(window).on('load', function() {
				that.mapCreate();
			});
		},
		
		//Create map
		mapCreate:function() {
			var $map = jQuery('#google-map');
			
			//Main color			
			var main_color = NaxosOptions.mapColor==='' ? $map.data('color') : NaxosOptions.mapColor;
			NaxosOptions.mapColor = '';
			
			//Map marker
			var map_marker = NaxosOptions.mapMarker==='' ? $map.data('marker') : NaxosOptions.mapMarker;
			NaxosOptions.mapMarker = '';

			//Saturation and brightness
			var saturation_value = -20;
			var brightness_value = 5;

			//Map style
			var style = [ 
				{//Set saturation for the labels on the map
					elementType:"labels",
					stylers:[
						{saturation:saturation_value},
					]
				}, 

				{//Poi stands for point of interest - don't show these labels on the map 
					featureType:"poi",
					elementType:"labels",
					stylers:[
						{visibility:"off"},
					]
				},

				{//Hide highways labels on the map
					featureType:'road.highway',
					elementType:'labels',
					stylers:[
						{visibility:"off"},
					]
				}, 

				{//Hide local road labels on the map
					featureType:"road.local", 
					elementType:"labels.icon", 
					stylers:[
						{visibility:"off"}, 
					] 
				},

				{//Hide arterial road labels on the map
					featureType:"road.arterial", 
					elementType:"labels.icon", 
					stylers:[
						{visibility:"off"},
					] 
				},

				{//Hide road labels on the map
					featureType:"road",
					elementType:"geometry.stroke",
					stylers:[
						{visibility:"off"},
					]
				},

				{//Style different elements on the map
					featureType:"transit", 
					elementType:"geometry.fill", 
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				}, 

				{
					featureType:"poi",
					elementType:"geometry.fill",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				},

				{
					featureType:"poi.government",
					elementType:"geometry.fill",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				},

				{
					featureType:"poi.attraction",
					elementType:"geometry.fill",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				},

				{
					featureType:"poi.business",
					elementType:"geometry.fill",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				},

				{
					featureType:"transit",
					elementType:"geometry.fill",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				},

				{
					featureType:"transit.station",
					elementType:"geometry.fill",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				},

				{
					featureType:"landscape",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]	
				},

				{
					featureType:"road",
					elementType:"geometry.fill",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				},

				{
					featureType:"road.highway",
					elementType:"geometry.fill",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				},

				{
					featureType:"water",
					elementType:"geometry",
					stylers:[
						{hue:main_color},
						{visibility:"on"}, 
						{lightness:brightness_value}, 
						{saturation:saturation_value},
					]
				}
			];
			
			var coordY = $map.data('latitude'), coordX = $map.data('longitude');
			var latlng = new google.maps.LatLng(coordY, coordX);
			
			var settings = {
				zoom:$map.data('zoom'),
				center:new google.maps.LatLng(coordY, coordX),
				mapTypeId:google.maps.MapTypeId.ROADMAP,
				panControl:false,
				zoomControl:false,
				mapTypeControl:false,
				streetViewControl:false,
				scrollwheel:false,
				draggable:true,
				mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU},
				navigationControl:false,
				navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
				styles:style
			};
			
			var map = new google.maps.Map($map.get(0), settings);
			
			window.addEventListener("resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
			});
			
			var contentString = $map.parent().find('#map-info').html() || '';
			var infoWindow = new google.maps.InfoWindow({content: contentString});
			var companyPos = new google.maps.LatLng(coordY, coordX);
			
			var marker = new google.maps.Marker({
				position:companyPos,
				map:map,
				icon:map_marker,
				zIndex:3
			});
	
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.open(map, marker);
			});
			
			//Add custom buttons for the zoom-in/zoom-out on the map
			if (NaxosOptions.zoomControlDiv===null) {				
				var zoomControlDiv = document.createElement('div');		
				var zoomControl = new customZoomControl(zoomControlDiv, map);
				NaxosOptions.zoomControlDiv = zoomControlDiv;
			}

			//Insert the zoom div on the top left of the map
			map.controls[google.maps.ControlPosition.LEFT_TOP].push(NaxosOptions.zoomControlDiv);
		},
		
		//Shortcodes
		shortCodes:function() {
			var count_mobile, count_tablet, count_desktop;
			
			//Clients
			if (jQuery('.clients-slider').length>0) {
				var $clients = jQuery('.clients-slider');
				
				count_mobile = parseInt($clients.data("count-mobile"), 10);
				count_tablet = parseInt($clients.data("count-tablet"), 10);
				count_desktop = parseInt($clients.data("count-desktop"), 10);
				
				//Dots
				var dots = false;
				
				if ($clients.data('dots')) {
					dots = true;
				}
				
				//Initialize
				jQuery('.clients-slider').owlCarousel({
					responsive:{
                        0:{
                            items:count_mobile
                        },
						576:{
                            items:count_tablet
                        },
                        768:{
                            items:count_desktop
                        }
                    },
					autoplay:3000,
                    autoplaySpeed:300,
					loop:true,
					dots:dots,
					dotsEach:2,
					rtl:NaxosOptions.rtl
                });
			}
			
			//Testimonials
            if (jQuery('.testimonial-slider').length>0) {
				jQuery(".testimonial-slider").append(jQuery(".single-block-text"));
				jQuery(".testimonial-nav").append(jQuery(".single-block-media"));
				
				jQuery(".testimonial-slider").slick({
					slidesToShow:1,
					slidesToScroll:1,
					arrows:false,
               			        fade:true,
					asNavFor:".testimonial-nav",
					rtl:NaxosOptions.rtl
				});

				jQuery(".testimonial-nav").slick({
					slidesToShow:5,
					slidesToScroll:1,
					asNavFor:".testimonial-slider",
                    arrows:false,
					centerMode:true,
					focusOnSelect:true,
					variableWidth:false,
					rtl:NaxosOptions.rtl,
                    responsive:[
						{
							breakpoint:991,
							settings:{
								slidesToShow:3,
                                arrows:false
							}
						},
						{
							breakpoint:480,
							settings:{
								slidesToShow:1,
                                arrows:false
							}
						}
					]
				});
			}
			
			//Counters
            if (jQuery('.number-count').length>0) {
                jQuery('.number-count').each(function() {
                    jQuery(this).counterUp({
                        delay:4,
                        time:1000
                    });
                });                
			}
			
			//Screenshots
			if (jQuery('.screenshot-slider').length>0) {
				var $screenshot = jQuery('.screenshot-slider');
				
				count_mobile = parseInt($screenshot.data("count-mobile"), 10);
				count_tablet = parseInt($screenshot.data("count-tablet"), 10);
				count_desktop = parseInt($screenshot.data("count-desktop"), 10);
				
				$screenshot.owlCarousel({
					responsive:{
						0:{
							items:count_mobile
						},			 
						768:{
							items:count_tablet
						},			
						960 : {
							items:count_desktop
						}
					},
					responsiveClass:true,
					autoplay:true,
					autoplaySpeed:1000,
					loop:true,
					margin:30,
					dotsEach:2,
					rtl:NaxosOptions.rtl
				});
				
				if ($screenshot.hasClass('zoom-screenshot')) {
					$screenshot.magnificPopup({
						delegate:"a",
						type:"image",
						closeOnContentClick:false,
						closeBtnInside:false,
						mainClass:"mfp-with-zoom",
						image:{verticalFit:true},
						gallery:{enabled:true},
						zoom:{
							enabled:true,
							duration:300, // Don't forget to change the duration also in CSS
							opener:function(element) {
								return element.find("img");
							}
						}
					});
				}
			}
			
			//Skills
			if (jQuery('.progress .progress-bar').length>0) {				
				setTimeout(function() {
					$(window).scroll(function() {
						var scrollTop = jQuery(window).scrollTop();

						jQuery('.progress .progress-bar').each(function() {
							var $that = jQuery(this), 
								itemTop = $that.offset().top-jQuery(window).height()+$that.height()/2;

							if (scrollTop>itemTop && $that.outerWidth()===0) {
								var percent = parseInt(jQuery(this).attr('data-value'), 10)+'%';
								var $value = jQuery(this).parent().parent().find('.progress-value');

								if ($value.length>0) {
									$value.css({width:percent, opacity:0}).html('<span>'+percent+'</span>');
								}

								$that.animate({width:percent}, {duration:1500, queue:false, complete:function() {
									if ($value.length>0) {
										$value.animate({opacity:1}, {duration:300, queue:false});
									}
								}});
							}
						});
					}).scroll();
				}, 1);
			}
			
			//Read more button
			if (jQuery('.more-link').length>0) {
				jQuery('.more-link').removeClass('btn btn-default');
			}
			
			//Footer widgets
			if (jQuery('.footer-widgets > .container > div').length>0) {
				jQuery('.footer-widgets > .container > div > div.col-12').each(function( index ) {
					if (index==1) {
						jQuery(this).removeClass('col-lg-3').addClass('col-lg-2 offset-lg-1');
					}
				});
			}
		},
		
		//Replace
		replace:function() {
			//Search form
			var search_btn = jQuery(".widget_search").find("input.search-submit");
			search_btn.replaceWith('<button class="search-submit" type="submit"><i class="fas fa-search"></i></button>');
			
			//Instagram
			if (jQuery(".instagram-feed li").length>0) {
				jQuery(".instagram-feed li").each(function() {
					var width = $(this)[0].getBoundingClientRect().width;
					jQuery(this).css('height', width+'px');
				});
			}
			
			//Social widget
			if (jQuery(".widget_social").length>0) {
				jQuery(".widget_social").prev(".widget_text").addClass("mb-0");
			}
			
			//Categories
			if (jQuery(".widget_categories .cat-item").length>0) {
				jQuery(".widget_categories .cat-item").each(function() {
					var item = jQuery(this);
					var txt = item.html();

					txt = txt.replace("(", "<span>");
					txt = txt.replace(")", "</span>");

					item.html(txt);
				});
			}
			
			//Comment submit button
			if (jQuery(".comment-form .submit").length>0) {
				var comment_btn = jQuery(".comment-form .submit");
				var comment_txt = comment_btn.val();
				comment_btn.replaceWith('<button id="submit" name="submit" class="submit btn btn-default" type="submit">'+comment_txt+'</button>');		
			}
		},
		
		//Share functions
		share:function(network, title, image, url) {
			//Window size
			var w = 650, 
				h = 350, 
				params = 'width='+w+', height='+h+', resizable=1';
			
			//Title
			if (typeof title==='undefined') {
				title = jQuery('title').text();
			} else if (typeof title==='string') {
				if (title.indexOf("#")!=-1 && jQuery(title).length>0) {
					title = jQuery(title).text();
				}
			}
			
			title = title.trim();
			
			//Image
			if (typeof image==='undefined') {
				image = '';
			} else if (typeof image==='string') {
				if (!/http/i.test(image)) {
					if (jQuery(image).length>0) {
						if (jQuery(image).is('img')) {
							image = jQuery(image).attr('src');
						} else {
							image = jQuery(image).find('img').eq(0).attr('src');
						}
					} else {
						image = '';
					}
				}
			}
			
			//Url
			if (typeof url==='undefined') {
				url = document.location.href;
			} else {
				if (url.startsWith("#")) {
					url = document.location.protocol+'//'+document.location.host+document.location.pathname+url;
				}
			}
			
			//Share
			if (network==='twitter') {
				return window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(title)+'&url='+encodeURIComponent(url), 'share', params);
			} else if (network==='facebook') {
				return window.open('https://www.facebook.com/sharer/sharer.php?s=100&p[url]='+encodeURIComponent(url)+'&p[title]='+encodeURIComponent(title)+'&p[images][0]='+encodeURIComponent(image), 'share', params);
			} else if (network==='pinterest') {
				return window.open('https://pinterest.com/pin/create/bookmarklet/?media='+image+'&description='+title+' '+encodeURIComponent(url), 'share', params);
			} else if (network==='linkedin') {
				return window.open('https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(url)+'&title='+title, 'share', params);
			}
			
			return;
		}
		
	};
	
	//Initialize
	$.NaxosTheme.init();

})(jQuery);

//Map zoom controls
function customZoomControl(controlDiv, map) {
	//Grap the zoom elements from the DOM and insert them in the map 
	var controlUIzoomIn = document.getElementById('zoom-in'),
	controlUIzoomOut = document.getElementById('zoom-out');

	controlDiv.appendChild(controlUIzoomIn);
	controlDiv.appendChild(controlUIzoomOut);

	//Setup the click event listeners and zoom-in or out according to the clicked element
	controlUIzoomIn.addEventListener('click', function() {
		map.setZoom(map.getZoom()+1);
	});

	controlUIzoomOut.addEventListener('click', function() {
		map.setZoom(map.getZoom()-1);
	});
}

//Share Functions
function shareTo(network, title, image, url) {
	return jQuery.NaxosTheme.share(network, title, image, url);
}


