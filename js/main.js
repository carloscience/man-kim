var MK = MK || {}; // main app object
var JST = JST || {};

MK.data = {};

// configure backbone layouts
Backbone.Layout.configure({
  manage: true,

  // where are the HTML templates:
  prefix: "templates/",

  fetchTemplate: function(path) {
    console.log('fetch:', arguments);
    // Concatenate the file extension.
    path = path + ".html";

    // If cached, use the compiled template.
    if (JST[path]) {
      return JST[path];
    }

    // Put fetch into `async-mode`.
    var done = this.async();

    // Seek out the template asynchronously.
    $.ajax({
      cache: false, // set cache to false for IE
      type: 'GET',
      url: path,
      dataType: 'text',
      success: function(contents) {
          done(_.template(contents));
      }
    });
  }
});

// Backbone router for nav links
MK.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    '!index': 'index',
    '!shop': 'shop',
    '!collections': 'fallWinter',
    '!fall-winter': 'fallWinter',
    '!spring-summer': 'springSummer',
    '!films': 'films',
    '!about': 'about',
    '!careers': 'careers',
    '!contact': 'contact'
  },

  index: function() {
    console.log('got index');
    var pages = $('body').attr('class');
    if (pages != undefined) {
      $('body').removeClass('pages');
      $('#content').empty();
    }
    //MK.thumbnails.render();
  },

  shop: function() {
    console.log('got shop');
    MK.addHeaderSidebar();
  },

  collections: function() {
    console.log('got collections');
    MK.addHeaderSidebar();
  },

  fallWinter: function() {
    MK.addHeaderSidebar();
    MK.getCollection('fall_winter');
  },

  springSummer: function() {
    MK.addHeaderSidebar();
    MK.getCollection('spring_summer');
  },

  films: function() {
    console.log('got films');
    MK.addHeaderSidebar();
  },

  about: function() {
    console.log('got about');
    MK.addHeaderSidebar();
    MK.about.render();
    //MK.thumbnails.render();
  },

  careers: function() {
    console.log('got about');
    MK.addHeaderSidebar();
    MK.careers.render();
  },

  contact: function() {
    console.log('got contact');
    MK.addHeaderSidebar();
    MK.contact.render();
  }

});

MK.addHeaderSidebar = function() {
  var pages = $('body').attr('class');
  if (pages != "pages") {
    $('body').addClass('pages');
  }
}

MK.getCollection = function(collection) {
  $.getJSON('data/collections.json', function(data) {
    console.log('collection is ' + data);
        $.extend(MK.data, data);
        model = data[collection];
        switch (collection) {
          case 'fall_winter':
            MK.fallWinter = new MK.FallWinter({data: model});
            break;
          case 'spring_summer':
            MK.springSummer = new MK.SpringSummer({data: model});
            break;
        }
  });
}

MK.FallWinter = Backbone.Layout.extend({
  template: 'fall_winter',
  el: '#content',
  initialize: function() {
    console.log('collection initialized');
    this.render();
  }
});

MK.SpringSummer = Backbone.Layout.extend({
  template: 'spring_summer',
  el: '#content',
  initialize: function() {
    console.log('collection initialized');
    this.render();
  }
});

MK.Shop = Backbone.Layout.extend({
    template: 'shop', // load home template
    el: '#content',
    initialize: function(){
      console.log('shop initialized');
    }
});

MK.Fashion = Backbone.Layout.extend({
    template: 'fashion', // load work template
    el: '#content',
    initialize: function(){
        console.log('fashion initialized');
    }
});
  
MK.Films = Backbone.Layout.extend({
    template: 'films', // load contact template
    el: '#content',
    initialize: function() {
      console.log('films initialized');
    }
});

MK.About = Backbone.Layout.extend({
    template: 'about', // load contact template
    el: '#content',
    events: {
      'click .careers': 'careers'
    },
    initialize: function() {
      console.log('about initialized');
    },
    careers: function() {
      console.log('got careers');
      MK.careers.render();
    }
});

MK.Careers = Backbone.Layout.extend({
  template: 'careers',
  el: '#content',
  initialize: function() {
    console.log('careers initialized');
  }
});

MK.Contact = Backbone.Layout.extend({
    template: 'contact', // load contact template
    el: '#content',
    initialize: function() {
      console.log('contact initialized');
    }
});

/*MK.Header = Backbone.Layout.extend({
    template: 'header', // load header template
    el: '#header',
    initialize: function() {
      console.log('header initialize');
      console.log(this.$el.html());
      this.render(); // render header
    }
});

MK.LeftNav = Backbone.Layout.extend({
    template: 'sidebar',
    el: '#left_nav',
    initialize: function(){
      console.log('left nav initialized');
    }
});

DR.TopNav = Backbone.Layout.extend({
    template: 'top_nav',
    el: '#main',
    initialize: function() {
      console.log('top nav initialized');
    }
  });

DR.Thumbnails = Backbone.Layout.extend({
    template: 'thumbnails',
    el: '#thumbnails',
    initialize: function() {
      console.log('thumbnails el is ' + this.el);
      $.getJSON('data/thumbnails.json', function(data) {
        console.log(data);
        $.extend(DR.data, data);
        var val = 'thumbnails';
        model = data[val];
        DR.thumbnailView = new DR.ThumbnailView({data: model});
      });
      console.log('thumbnails initialized');
    }
  });

DR.ThumbnailView = Backbone.Layout.extend({
    template: 'thumbnails',
    el: '#thumbnails',
    initialize: function() {
      this.render();
    }
  });*/

$(document).ready(function() {

  $('.fancybox').fancybox({
    padding : 0,
    openEffect  : 'elastic'
  });
  //$("html, body").animate({ scrollTop: 0 });
  $('.topnav').on('click', function(e) {
      $('.topnav').each(function(data) {
        $(this).removeClass('ulineBlack');
        $(e.currentTarget).addClass('ulineBlack');
      });
  });

  $('#collections').on('mouseenter', function(e) {
    console.log('rolling over collection');
    $('#drop_menu').show();
  });

  $('#drop_menu').on('mouseleave', function(e) {
    $(this).hide();
  });
  
  MK.about = new MK.About();
  MK.contact = new MK.Contact();
  MK.careers = new MK.Careers();
  MK.router = new MK.Router();

  // start router
  Backbone.history.start();
  
});