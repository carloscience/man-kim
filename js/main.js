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
    '!shop_form': 'shop_form',
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
    $('#content').empty();
    MK.defaultStyle();
    var pages = $('body').attr('class');
    if (pages != undefined) {
      $('body').removeClass('pages');
    }
    //MK.home.render();
  },

  shop: function() {
    console.log('got shop');
    //$('.videoBG').hide();
    //MK.defaultStyle();
    //MK.addHeaderSidebar();
    MK.shop.render();
  },

  shop_form: function() {
    console.log('got shop');
    $('.videoBG').hide();
    MK.defaultStyle();
    MK.addHeaderSidebar();
    MK.shopForm.render();
  },

  collections: function() {
    $('.videoBG').hide();
    MK.defaultStyle();
    console.log('got collections');
    MK.addHeaderSidebar();
  },

  fallWinter: function() {
    MK.defaultStyle();
    MK.addHeaderSidebar();
    MK.getCollection('fall_winter');
  },

  springSummer: function() {
    MK.defaultStyle();
    MK.addHeaderSidebar();
    MK.getCollection('spring_summer');
  },

  films: function() {
    console.log('got films');
    $('.videoBG').hide();
    MK.defaultStyle();
    MK.addHeaderSidebar();
    MK.films.render();
  },

  about: function() {
    console.log('got about');
    $('.videoBG').hide();
    MK.defaultStyle();
    MK.addHeaderSidebar();
    MK.about.render();
    //MK.thumbnails.render();
  },

  careers: function() {
    console.log('got about');
    $('.videoBG').hide();
    MK.defaultStyle();
    MK.addHeaderSidebar();
    MK.careers.render();
  },

  contact: function() {
    console.log('got contact');
    $('.videoBG').hide();
    $('body').addClass('contact_bg');
    //$('body:eq(0)').removeClass('contact_bg');
    $('.contact_bg:eq(1)').unwrap();
    $('.videoBG').remove();
    //$('#container').unwrap();
    //$('#container').addClass('navLeft');
    $('#drop_menu').hide();
    MK.addHeaderSidebar();
    MK.contact.render();
  }

});

MK.defaultStyle = function() {
  console.log('default styles');
  $('body').removeClass('contact_bg');
  //$('.videoBG').hide();
  //$('body').unwrap();

  $('.videoBG_wrapper').unwrap();
  $('#container').removeClass('navLeft');
  $('#drop_menu').hide();
}

MK.addHeaderSidebar = function() {
  var pages = $('body').attr('class');
  if (pages != "pages") {
    $('body').addClass('pages');
  }
}

MK.Home = Backbone.Layout.extend({
  template: 'home',
  el: '#content',
  initialize: function() {
    console.log('home initialized');
  }
});

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
    $('.pages:eq(1)').unwrap();
    $('.videoBG').remove();
    $('#top_nav #drop_menu').show();
    this.render();
  }
});

MK.SpringSummer = Backbone.Layout.extend({
  template: 'spring_summer',
  el: '#content',
  initialize: function() {
    console.log('collection initialized');
    $('.pages:eq(1)').unwrap();
    $('.videoBG').remove();
    $('#top_nav #drop_menu').show();
    this.render();
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
    template: 'films', // load films template
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

MK.Shop = Backbone.Layout.extend({
  template: 'shop',
  el: '#shop_overlay',
  initialize: function() {
    console.log('shop initialized');
  }
});

MK.ShopForm = Backbone.Layout.extend({
    template: 'shop', // load home template
    el: '#content',
    initialize: function(){
      console.log('shop initialized');
    }
});

$(document).ready(function() {
//Shadowbox.init();
  $('.fancybox').fancybox({
    padding : 0,
    openEffect  : 'elastic'
  });
  
  /*var BV = new $.BigVideo();
      BV.init();
      BV.show('films/videoloop.mov', {ambient:true});*/
  //$("html, body").animate({ scrollTop: 0 });

  var videoBG = $('body').videoBG({
    position:"fixed",
    zIndex:0,
    mp4:'js/assets/nuloop.mp4',
    ogv:'js/assets/nuloop.ogv',
    webm: 'js/assets/nuloop.webm',
    poster:'js/assets/nuloop.jpg',
    opacity:1,
    fullscreen:true,});

  $('.topnav').on('click', function(e) {
      $('.topnav').each(function(data) {
        $(this).removeClass('ulineBlack');
        $(e.currentTarget).addClass('ulineBlack');
      });
  });

  $('#collections').on('mouseenter', function(e) {
    console.log('rolling over collection');
    $('#top_nav #drop_menu').show();
  });

  $('#collections_home').on('mouseenter', function(e) {
    console.log('rolling over collection');
    $('#bottom_nav #drop_menu').show();
  })

  $('#top_nav #drop_menu').on('mouseleave', function(e) {
    $(this).hide();
  });

  /*$('#collections_home, .dropdown_nav a').on('click', function() {
    Shadowbox.init();
  });*/
  
  MK.home = new MK.Home();
  MK.about = new MK.About();
  MK.contact = new MK.Contact();
  MK.careers = new MK.Careers();
  MK.films = new MK.Films();
  MK.shop = new MK.Shop();
  MK.shopForm = new MK.ShopForm();
  MK.router = new MK.Router();

  // start router
  Backbone.history.start();
  
});