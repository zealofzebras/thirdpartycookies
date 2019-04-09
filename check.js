
var thirdpartycookies = (function (undefined) {
    
    var iframe;
    var initcomplete = false;
    
    var self = {

      enabled: undefined,

      callback: undefined,

      retest: function() {
        iframe.src = iframe.src;
      },

      test: function(callback) {
        if (!initcomplete)
          this.init();

        if (this.enabled === undefined)
          this.callback = callback;
        else 
          callback(this.enabled);

      },


    }

    var receiveMessage = function (evt) {
        if (evt.data === 'MM:3PCunsupported') {
          this.enabled = false;
        } else if (evt.data === 'MM:3PCsupported') {
          this.enabled = true;
        };
        if (this.callback)
          this.callback(this.enabled);
      };
      
    var prepareFrame = function() {
          iframe = document.createElement("iframe");
          iframe.setAttribute("src", "https://thirdpartycookies.com/set.html");
          iframe.style.display = "none";
          //todo: defer if document is not ready
          document.body.appendChild(iframe);
    };

    self.init = function() {
        prepareFrame();
    }

    window.addEventListener("message", receiveMessage.bind(self), false);

      
    return self; 
  
  })();