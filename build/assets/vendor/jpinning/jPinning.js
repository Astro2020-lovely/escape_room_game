/*!
 * jPinning v0.1
 * Pin and unpin your headers while you are scrolling
 * MIT License
 */
(function( $ ) {
	$.fn.jPinning = function( options ) {
		// Default settings
		var defaults = {
			offset: false, //offset for header to hide or show in pixels
			onPin: function(){}, //Fires when the header shows up
			onUnpin: function(){} //Fires when the header hides out
		};
		// Merge default settings with user settings
		var settings = $.extend( {}, defaults, options );

		var elements = {
			lastScrollTop: 0,
      document: $(document),
			window: $(window),
			status: 'pinned'
		};

		var classes = {
			nav: 			'pinning-nav',
			pinned: 	'pinned',
			unpinned: 'unpinned',
			top: 			'pinning-top'
		};

		var methods = {

			isUnpinned: function(){
				/**
				* Check if header is unpinned
				* @return boolean
				*/
				if( elements.status == 'unpinned' )
					return true;
				return false;
			},

			isPinned: function(){
				/**
				* Check if header is pinned
        * @return boolean
				*/
				if( elements.status == 'pinned' )
					return true;
				return false;
			},

			prepare: function(){
				/*
				* This will add the needed classes for the header to work properly
				*/
				elements.target.addClass(classes.nav);
				elements.target.css('position', 'fixed');
			},

			pin: function(){
				/*
				* If the header is unpinned this function will update the status to "pinned",
				* update header classes and execute the callback function.
				*/
				if( methods.isUnpinned() ){
					elements.status = 'pinned';
					elements.target.removeClass(classes.unpinned).addClass(classes.pinned);
					settings.onPin.call( elements.target );
				}
			},

			unpin: function(){
				/*
				* If the header is pinned this function will update the status to "unpinned",
				* update header classes and execute the callback function.
				*/

				if( methods.isPinned() ){
					elements.status = 'unpinned';
					elements.target
						.removeClass(classes.pinned)
						.removeClass(classes.top)
						.addClass(classes.unpinned);
					settings.onUnpin.call( elements.target );
				}
			},

      calcOffset: function(st){
        /**
         * Check if offset is setted and if so calculate it
         * @return boolean
         */

        if( settings.offset == 'auto' ){
          settings.offset = elements.target.outerHeight();
        }

        if( settings.offset ){
          if( st > settings.offset ){
            return true;
          }else {
            return false;
          }
        }else {
          return true;
        }
      },

			pinHandler: function(){
				/* 
				* This function will add "top" class to the header when it reachs the top of the page.
				* Also it will call pin() or unpin() functions depending if the user is scrolling up or down.
				*/
				var st = elements.window.scrollTop(),
        maxScroll = elements.document.height() - elements.window.height();

        if( st < 0 ) {
          st = 0;
        }

        if( st >= maxScroll ) {
          st = maxScroll;
          elements.lastScrollTop = st - 1;
        }

				if ( st == 0 ){
					elements.target.addClass(classes.top);
				}

			  if ( st <= elements.lastScrollTop ){
          /* Scrolling up */
          methods.pin();
			  } else {
          /* Scrolling down */
          var offset = methods.calcOffset(st);
          if( offset ){
            methods.unpin();
          }
			  }

			  elements.lastScrollTop = st;
			}
		};

		// jPinning init
		return this.each(function() {
			elements.target = $(this); //Get initialized element
			methods.prepare(); //Prepare element
			$(window).on( 'scroll', methods.pinHandler ); //Call handler on scroll
		});

	};
}( jQuery ));