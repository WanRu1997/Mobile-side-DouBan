var Top250 ={
    init: function(){
        this.index = 0;
        this.$Load =  $('.Loading');
        this.isLoading =false;
        this.$element = $('#Top250');
        this.$main =  $('main');
        this.isFinish = false;
        this.bind();
        this.start();
    },
    start: function(){
        var _this = this;
        this.getData(function(data){
            _this.render(data);
        })
    },
    bind: function(){
        var _this = this;
        $('main').scroll(function(){
            if($('section').eq(0).height() -10 <= _this.$main.height()+_this.$main.scrollTop()){
              _this.start();
            }
          })
        
    }, 
    getData: function(callback){
        var _this = this;
        if(this.isLoading) return;
        this.isLoading = true; 
        this.$Load.show();
        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            type: 'GET',
            data: {
              start: _this.index,
              count:'25'
            },
            dataType: 'jsonp'
           }).done(function(ret){
            _this.index+=20;
            callback&&callback(ret);
            console.log(ret);
           }).fail(function(){
            console.log('error...');
           }).always(function(){
              _this.isLoading = false;
              _this.$Load.hide();
           }
           );
    },
     render: function(data){
        var _this = this;
        data.subjects.forEach(function(movie){
            var tpl='<div class="item">\
            <a href="#">\
              <div class="cover">\
                <img src= "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">\
              </div>\
              <div class="detail">\
                <h2>肖克的救赎</h2>\
                <div class="extra"><span class="score">9.6</span>分/<span class="collect"></span>收藏</div>\
                <div class="extra"><span class="year"></span>/<span class="genres"></span></div>\
                <div class="extra">导演：<span class="directors"></span></div>\
                <div class="extra">主演：<span class="casts"></span></div>\
              </div>\
            </a>\
              </div>';
          var $node = $(tpl);
          $node.find('a').attr('href',movie.alt);
          $node.find('.cover img').attr('src',movie.images.medium);
          $node.find('.detail h2').text(movie.title);
          $node.find('.detail .year').text(movie.year);
          $node.find('.detail .collect').text(movie.collect_count);
          $node.find('.detail .genres').text(movie.genres.join(','));
          $node.find('.detail .score').text(movie.rating.average);
          $node.find('.detail .directors').text(function(){
            var arry = [];
            movie.directors.forEach(function(item){
               arry.push(item.name);
            });
            return arry.join(',');
          });
          $node.find('.detail .casts').text(function(){
            var castsArry = [];
            movie.casts.forEach(function(item){
               castsArry.push(item.name);
            });
            return castsArry.join(',');
          });
          _this.$element.find('.content').append($node);
          });
    } 
}
var US_box = {
    init: function(){
        this.$element = $('#us_box');
        this.start();
    },
    start: function(){
        var _this = this;
        $.ajax({
            url: 'https://api.douban.com/v2/movie/us_box',
            type: 'GET',
            dataType: 'jsonp'
           }).done(function(ret){
            console.log(ret);
            _this.render(ret);
           }).fail(function(){
            console.log('error...');
           });
    },
    render: function(data){
        var _this = this;
        data.subjects.forEach(function(movie){
            movie.subjects = movie;
            var Rank=movie.subject
            var tpl='<div class="item">\
            <a href="#">\
                <div class="cover">\
                <img src= "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">\
                </div>\
                <div class="detail">\
                <h2>肖克的救赎</h2>\
                <div class="extra"><span class="score">9.6</span>分/<span class="collect"></span>收藏</div>\
                <div class="extra"><span class="year"></span>/<span class="genres"></span></div>\
                <div class="extra">导演：<span class="directors"></span></div>\
                <div class="extra">主演：<span class="casts"></span></div>\
                </div>\
            </a>\
            </div>';
            var $node = $(tpl);
            $node.find('a').attr('href',Rank.alt);
            $node.find(".cover img").attr('src',Rank.images.medium);
            $node.find('.detail h2').text(Rank.title);
            $node.find('.detail .year').text(Rank.year);
            $node.find('.detail .collect').text(Rank.collect_count);
            $node.find('.detail .genres').text(Rank.genres.join(','));
            $node.find('.detail .score').text(Rank.rating.average);
            $node.find('.detail .directors').text(function(){
                var arry = [];
                Rank.directors.forEach(function(item){
                   arry.push(item.name);
                });
                return arry.join(',');
            });
            $node.find('.detail .casts').text(function(){
                var castsArry = [];
                Rank.casts.forEach(function(item){
                   castsArry.push(item.name);
                });
                return castsArry.join(',');
              });
              _this.$element.find('.content').append($node);
        }) 
    }
}

 var search = {
    init: function(){
        this.keyword = '';
        this.index = 0;
        this.$Loading = $('.Loading');
        this.$main = $('main');
        this.isLoading = false;
        this.bind();
    },
    bind: function(){
        var _this = this;
        $('.button_box input').on('click',function(){
            _this.keyword = $('.input_box input').val();
            console.log(_this.keyword);
            $('#Serach .content').empty();
            _this.start();
        });
       /* $('main').scroll(function(){
            if($('#Serach').height() -10 <= _this.$main.height()+_this.$main.scrollTop()){
              _this.start();
            }
          })  */
    },
    start: function(){
        this.getData();
    },
    getData: function(){
        var _this = this;
        if(_this.isLoading) return;
        _this.isLoading = true;
        this.$Loading.show();
        $.ajax({
            url: 'http://api.douban.com/v2/movie/search',
            type: 'GET',
            data:{
                q:_this.keyword,
                start:_this.index
            },
            dataType: 'jsonp'
           }).done(function(ret){
            console.log(ret);
            _this.index+=20;
            _this.render(ret);
           }).fail(function(){
            console.log('error...');
           }).always(function(){
               _this.$Loading.hide();
               _this.isLoading = false;
           });
    },
    render: function(data){
        data.subjects.forEach(function(movie){
            var tpl='<div class="item">\
            <a href="#">\
              <div class="cover">\
                <img src= "http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">\
              </div>\
              <div class="detail">\
                <h2>肖克的救赎</h2>\
                <div class="extra"><span class="score">9.6</span>分/<span class="collect"></span>收藏</div>\
                <div class="extra"><span class="year"></span>/<span class="genres"></span></div>\
                <div class="extra">导演：<span class="directors"></span></div>\
                <div class="extra">主演：<span class="casts"></span></div>\
              </div>\
            </a>\
            </div>';
            var $node = $(tpl);
            $node.find('a').attr('href',movie.alt);
            $node.find(".cover img").attr('src',movie.images.medium);
            $node.find('.detail h2').text(movie.title);
            $node.find('.detail .year').text(movie.year);
            $node.find('.detail .collect').text(movie.collect_count);
            $node.find('.detail .genres').text(movie.genres.join(','));
            $node.find('.detail .score').text(movie.rating.average);
            $node.find('.detail .directors').text(function(){
                var arry = [];
                movie.directors.forEach(function(item){
                   arry.push(item.name);
                });
                return arry.join(',');
              });
            $node.find('.detail .casts').text(function(){
                var castsArry = [];
                movie.casts.forEach(function(item){
                   castsArry.push(item.name);
                });
                return castsArry.join(',');
              });
            $('#Serach .content').append($node);
              
        });
    }
} 

var app = {
    init: function(){
        this.$tabp=$('footer>div');
        this.$panels=$('section');
        this.bind();
        Top250.init();
        US_box.init();
        search.init();
    },
    bind: function(){
        var _this = this;
        this.$tabp.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
            _this.$panels.hide().eq($(this).index()).fadeIn();
        });
    }
}
app.init();
  
