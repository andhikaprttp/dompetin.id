(function ($) {
    "use strict";

	var parameters = [];

	var settings_block = '<div class="block-settings-wrapper">'+
							'<div id="block_settings" class="block_settings">'+
								'<section>'+
									'<h3>HEADER STYLE</h3>'+
									'<ul>'+
										'<li class="header-index"><a href="'+js_load_parameters.theme_site_url+'">Single Image</a></li>'+
										'<li class="header-index-slide"><a href="'+js_load_parameters.theme_site_url+'/index-slide">Image Slideshow</a></li>'+
										'<li class="header-index-video"><a href="'+js_load_parameters.theme_site_url+'/index-video">Video Background</a></li>'+
									'</ul>'+
									'<hr>'+
									'<h3>COLORS</h3>'+
									'<span class="blue" 		title="Blue" 		data-color="#7c4fe0"></span>'+
									'<span class="green" 		title="Green" 		data-color="#2aa275"></span>'+
									'<span class="red" 			title="Red" 		data-color="#ff3d65"></span>'+
									'<span class="turquoise" 	title="Turquoise" 	data-color="#46cad7"></span>'+
									'<span class="purple" 		title="Purple" 		data-color="#d1397c"></span>'+
									'<span class="orange" 		title="Orange" 		data-color="#ee8f67"></span>'+
									'<span class="yellow" 		title="Yellow" 		data-color="#ffbe00"></span>'+
                                    '<span class="grey" 		title="Grey" 		data-color="#656d78"></span>'+
								'</section>'+
								'<span id="settings_close">Close</span>'+
							'</div>'+
						'</div>';

	//Init color buttons
	function initColor() {
		$(".block-settings-wrapper section span").on("click", function() {
			var cls = $(this).attr("class");
			var color = $(this).data("color");

			//CSS
			$("#naxos-color-schema-css").attr("href", js_load_parameters.theme_default_path+"/assets/colors/"+cls+".css");
		
			//Google Maps
			if ($("#google-map").length>0) {
				$("#google-map").data("color", color);
				$("#google-map").data("marker", js_load_parameters.theme_default_path+"/assets/images/map-marker-"+cls+".png");

				$.NaxosTheme.mapCreate();
			}
		});
	}

	//Init open/close button	
	function initClose() {
		parameters.push("opened");

		$("#settings_close").on("click", function(e) {
			e.preventDefault();	
			
			$("body").toggleClass("opened-settings");

			if (!$.cookies.get("opened")) {
				$.cookies.set("opened", "opened-settings");
			} else {
				$.cookies.del("opened");
			}
		});
	}

	//Init cookies
	function initCookies() {
		for (var key in parameters) {
			if (parameters.hasOwnProperty(key)) {
				var name = parameters[key];
				var parameter = $.cookies.get(name);

				if (parameter) {
					$("body").addClass(parameter);
				}
			}
		}
	}

	//Init
	$("body").prepend(settings_block);
	initColor();	
	initClose();
	initCookies();

	//Activate header style
	var url = window.location.href;
	url = url.replace(/\/$/, "");
	var ind = url.lastIndexOf("/");
	url = url.substr(ind+1);

	if (url.indexOf("index")===-1) {url = "index";}

	var $page = $("li.header-"+url);

	$page.addClass("active");
	$page.append('<i class="fas fa-check"></i>');
	
})(jQuery);