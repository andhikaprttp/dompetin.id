/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
(function(a){"use strict";a.fn.counterUp=function(b){var c=a.extend({time:400,delay:10},b);return this.each(function(){var b=a(this),d=c;b.waypoint(function(){var a=[],c=d.time/d.delay;b.data("text")==null?b.data("text",b.text()):b.text(b.data("text"));var e=b.text(),f=/[0-9]+,[0-9]+/.test(e);e=e.replace(/,/g,"");for(var g,h=/^[0-9]+$/.test(e),j=/^[0-9]+\.[0-9]+$/.test(e),k=j?(e.split(".")[1]||[]).length:0,l=c;1<=l;l--){if(g=parseInt(e/c*l),j&&(g=parseFloat(e/c*l).toFixed(k)),f)for(;/(\d+)(\d{3})/.test(g.toString());)g=g.toString().replace(/(\d+)(\d{3})/,"$1,$2");a.unshift(g)}b.data("counterup-nums",a),b.text("0");b.data("counterup-func",function(){b.text(b.data("counterup-nums").shift()),b.data("counterup-nums").length?setTimeout(b.data("counterup-func"),d.delay):(delete b.data("counterup-nums"),b.data("counterup-nums",null),b.data("counterup-func",null))}),setTimeout(b.data("counterup-func"),d.delay)},{offset:"100%",triggerOnce:!0})})}})(jQuery);
