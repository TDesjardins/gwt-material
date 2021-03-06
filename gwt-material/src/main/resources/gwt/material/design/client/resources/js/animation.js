function showGrid(id, duration){
  var speed = 900;
  var container =  $(id);
  container.each(function() {
    var elements = $(this).children();
    elements.each(function() {
      var elementOffset = $(this).offset();
      var offset = elementOffset.left*0.5 + elementOffset.top;
      var delay = parseFloat(offset/speed).toFixed(2);
      $(this)
          .css("-webkit-transition-delay", delay+'s')
          .css("-o-transition-delay", delay+'s')
          .css("transition-delay", delay+'s')
          .removeClass('closed')
          .addClass('animated');
    });
  });
}

function closeGrid(id, duration){
  var speed = 900;
  var container =  $(id);
  container.each(function() {
    var elements = $(this).children();
    elements.each(function() {
      var elementOffset = $(this).offset();
      var offset = elementOffset.left*0.5 + elementOffset.top;
      var delay = parseFloat(offset/speed).toFixed(2);
      $(this)
          .css("-webkit-transition-delay", delay+'s')
          .css("-o-transition-delay", delay+'s')
          .css("transition-delay", delay+'s')
          .removeClass('animated')
          .addClass('closed');
    });
  });
}

var swipeLeft = false;
var swipeRight = false;

/* Hook the Dismissable Collection to includke the swipe left and swipe right
 callback */
function initDismissableCollection() {
  // Dismissible Collections
  $('.dismissable').each(function() {
    $(this).hammer({
      prevent_default: false
    }).bind('pan', function(e) {
      if (e.gesture.pointerType === "touch") {
        var $this = $(this);
        var direction = e.gesture.direction;
        var x = e.gesture.deltaX;
        var velocityX = e.gesture.velocityX;

        $this.velocity({ translateX: x
        }, {duration: 50, queue: false, easing: 'easeOutQuad'});

        // Swipe Left
        if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) {
          swipeLeft = true;
        }

        // Swipe Right
        if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) {
          swipeRight = true;
        }
      }
    }).bind('panend', function(e) {
      // Reset if collection is moved back into original position
      if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {
        swipeRight = false;
        swipeLeft = false;
      }

      if (e.gesture.pointerType === "touch") {
        var $this = $(this);
        if (swipeLeft || swipeRight) {
          var fullWidth;
          if (swipeLeft) { fullWidth = $this.innerWidth(); }
          else { fullWidth = -1 * $this.innerWidth(); }

          $this.velocity({ translateX: fullWidth,
          }, {duration: 100, queue: false, easing: 'easeOutQuad', complete:
              function() {
                $this.css('border', 'none');
                $this.velocity({ height: 0, padding: 0,
                }, {duration: 200, queue: false, easing: 'easeOutQuad', complete:
                    function() {
                      $this.remove();
                    }
                });
              }
          });
        }
        else {
          $this.velocity({ translateX: 0,
          }, {duration: 100, queue: false, easing: 'easeOutQuad'});
        }
        swipeLeft = false;
        swipeRight = false;
      }
    });

  });
}