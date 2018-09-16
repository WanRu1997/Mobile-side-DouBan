$('footer>div').on('click',function(){
  var index = $(this).index();
$('section').hide().eq(index).fadeIn();
 $(this).addClass('active').siblings().removeClass('active');
});
var index = 0;
var isLoading = false;
start();
function start(){
  if(isLoading) return;
   isLoading = true;
   $('.Loading').show();
  $.ajax({
    url: 'http://api.douban.com/v2/movie/top250',
    type: 'GET',
    data: {
      start: index,
      count:'25'
    },
    dataType: 'jsonp'
   }).done(function(ret){
    console.log(ret);
    setData(ret);
    index+=20;
   }).fail(function(){
    console.log('error...');
   }).always(function(){
      isLoading = false;
      $('.Loading').hide();
   }
   );
};
$('main').scroll(function(){
  if($('section').eq(0).height() -10 <= $('main').height()+$('main').scrollTop()){
    start();
  }
});
  
function setData(data){
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
  $('#Top250').eq(0).append($node);
  });
}