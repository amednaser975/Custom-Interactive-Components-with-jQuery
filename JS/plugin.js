/*global $, window , document, setInterval, clearInterval, console */

$(function () {

    'use strict';
    // Calculate Body padding(3)
    $('body').css('paddingTop', $('.navbar').innerHeight());

    //Smoothly Scroll To an Element(2)
    $('.navbar li a').click( function(e) {
      e.preventDefault();
      $('html , body').animate({

        scrollTop: $('#'+$(this).data('scroll')).offset().top+1

      },1000);
    });

    //Add Active class with First Method(4)
    /*$('.navbar li').click(function () {

      $(this).addClass('active').siblings().removeClass('active');

    });*/
    //Add Active class with Second Method(4)
    $('.navbar li a').click(function () {

      $(this).addClass('active').parent().siblings().find('a').removeClass('active');

    });
    //Add Active class with Third Method(4)
    /*$('.navbar li a').click(function(){

      $('.navbar li a').removeClass('active');
      $(this).addClass('active');

    });*/

    //Sync Navbar Links with Sections(5,6)
    $(window).scroll(function(){

      $('.block').each(function(){

        if($(window).scrollTop() > $(this).offset().top){

          var blockID=$(this).attr('id');
          $('.navbar li a').removeClass('active');
          $(".navbar li a[data-scroll='"+blockID+"']").addClass('active');
        }

      });

    });
    // Scroll To Top button
    $(window).scroll(function(){
      var scrollToTop =$(".scroll-to-top");
      if ($(window).scrollTop() >= 1000){
        if (scrollToTop.is(":hidden")){
          scrollToTop.fadeIn(400);
        }
      } else {
        scrollToTop.fadeOut(400);
      }
    });

    // Click On scrollToTop To Go Up
    $('.scroll-to-top').click(function(event){

      event.preventDefault();
      $('html , body').animate({
        scrollTop:0

      },1000);
    });
    // Create Popup (10,11)
    $('.show-popup').click( function() {
        
        $('.'+$(this).data('popup')).fadeIn();
    });
    $('.popup').click( function() {
        $(this).fadeOut();
    });
    $('.popup .inner').click( function(e) {
        e.stopPropagation();
    });
    $('.popup .close').click( function(e) {
       e.preventDefault();
       //$('.popup').fadeOut(); => First Method
       // Or $(this).parentsUntil('body').fadeOut(); => Second Method 
       $(this).parentsUntil('.popup').parent().fadeOut();     // => This Method is Recommended
    });
    $(document).keydown( function(e)  {
       if(e.keyCode==27){
           $('.popup').fadeOut();
       } 
    });
    // Buttons with Effects (12,14)
    $('.buttons-effect').each(function(){
        $(this).prepend("<span></span>");
    });
    $('.from-left , .border-left').hover( function() {
        $(this).find('span').eq(0).animate({
            width:'100%'
        },500);
    }, function () {
        $(this).find('span').eq(0).animate({
            width:0
        },500);
    });
    // Buttons with Effects (13,15)
    $('.from-top , .border-top').hover( function() {
        $(this).find('span').eq(0).animate({
            height:'100%'
        },500);
    }, function () {
        $(this).find('span').eq(0).animate({
            height:0
        },500);
    });
    // Animated Progress
    $('.animated-progress span').each(function(){
        
        $(this).animate({
            
            width: $(this).attr('data-progress')+'%'
            
        },1000 , function(){
           
            $(this).text($(this).attr('data-progress')+'%');
            
        });
    });
    // Fixed Menu (18,19)
    $('.fixed-menu .fa-cog').on('click',function(){
       
        $(this).parent('.fixed-menu').toggleClass('is-visible');
        if($(this).parent('.fixed-menu').hasClass('is-visible')){
            
            $(this).parent('.fixed-menu').animate({
                left:0
                
            },500);
            $('body').animate({
                
                paddingLeft:$(this).parent('.fixed-menu').innerWidth()
                
            },500);
        
        }else {
            
            $(this).parent('.fixed-menu').animate({
                left:'-'+$(this).parent('.fixed-menu').innerWidth()
                
            },500);
            $('body').animate({
                
                paddingLeft:0   
                
            },500);
        }
        
    });
    // Change Colors (20)
    $('.change-colors li').on('click' , function(){
       
        $('body').attr('data-default-color',$(this).data('color'));
    });
    // Thumbnails Gallery (21,22,23,24)
    var numOfThumbnails = $('.thumbnails').children().length,
        
        marginBetweenThumbnails = '.5',
        
        totalMarginBetweenThumbnails = marginBetweenThumbnails * ( numOfThumbnails -1 ),
        
        thumbnailsWidth = (100 - totalMarginBetweenThumbnails) / numOfThumbnails;
    
    $('.thumbnails img').css({
        
       marginRight:marginBetweenThumbnails +'%',
       
       width:thumbnailsWidth + '%'
    
    });
    
    $('.thumbnails img').on('click', function(){
       
        $(this).addClass('selected').siblings().removeClass('selected');
        $('.master-img img').hide().attr('src',$(this).attr('src')).fadeIn(500);    
    });
    $('.master-img .fa-chevron-left').on('click', function () {
       
        if($('.thumbnails .selected').is(':first-child')) {
            
            $('.thumbnails img:last').click();
        } else {
            
            $('.thumbnails .selected').prev().click();
        }
        
    });
    $('.master-img .fa-chevron-right').on('click' , function() {
       
        if($('.thumbnails .selected').is(':last-child')){
            
            $('.thumbnails img').eq(0).click();
        } else {
            
            $('.thumbnails .selected').next().click();
        }
        
    });
    // Toggle Product Class(25)
    $('.products .product .icon , .items .item .icon').on('click' , function(){
        
        $(this).toggleClass('fa-plus fa-minus').next('p').slideToggle();
        
    });
    // Switch List and Grid View (26,27)
    $('.view-options i').click( function() {
       
        $(this).addClass('active').siblings().removeClass('active');
        $('.items').removeClass('list-view grid-view').addClass($(this).data('class'));
        
    });
    // Error Message Effect(28)
    $('.error-message').each(function () {
       
        $(this).animate({
            right:0
            
        }, 1000, function () {
            
            $(this).delay(3000).fadeOut();
        });
    });
    // Hide Placeholder On Focus & Restore On Blur(29)
    var placeAttr = '';
    $('[placeholder]').focus(function () {
        
        placeAttr = $(this).attr('placeholder');
        $(this).attr('placeholder','');
    }).blur(function () {
       
        $(this).attr('placeholder',placeAttr);
    });
    
    // Show Message When Field is Empty(30)
    $('[required]').blur(function () {
       
        if($(this).val() == '') {
            
            $(this).next('span').fadeIn().delay(2000).fadeOut();
        }
        
    });
    
    // Add Asterisk to all Required Fields and Custmize it with jQuery(31)
    $('<span class="asterisk">*</span>').insertBefore(':input[required]');
    
    $('.asterisk').parent('div').css('position','relative');
    
    $('.asterisk').each(function () {
       
        $('.asterisk').css({
        
        position:'absolute',
        top:15,
        color:'#F00',
        fontWeight:'bold',
        fontSize:20,
        left:$(this).parent('div').find(':input').innerWidth()-20
            
        });
        
    });
    
    // Customize the Input Field(32,33)
    $('.our-form input[type="file"]').wrap('<div class="custom-file"></div>');
    
    $('.custom-file').prepend('<span>Upload Your Files</span>');
    
    $('.custom-file').append('<i class="icon fas fa-upload da-lg skin-color"></i>');
    
    $('.our-form input[type="file"]').change(function () {
       
        $(this).prev('span').text($(this).val());
    });
    
    // Detect Unicode of Keyboard Keys(34)
    $('.detect-unicode').on('keyup', function (event) {
       
        var keyboardKey = event.unicode || event.which ;
        $('.unicode').text(keyboardKey);
    });
    
    // Change Input Direction Depend on the Language(35,36)
    $('.auto-direction').on('keyup', function () {
       
        if ($(this).val().charCodeAt(0)<200) {
            
            //$(this).attr('placeholder','Type Your Name');
            $(this).css('direction','ltr');
            
        } else {
            
            //$(this).attr('placeholder','اكتب اسمك');
            $(this).css('direction','rtl');
            
        }
    });
    
    // Convert Input Value to Tags(37,38)
    $('.add-tag').on('keyup', function (event) {
       
        var keyboardKey = event.unicode || event.which ;
        if (keyboardKey === 188) {
            
            var thisValue = $(this).val().slice(0,-1);
            $('.tags').append('<span class="tag-span"><i class="icon fa fa-times"></i>' + thisValue + '</span>');
            $(this).val('');
        }
    });
    
    $('.tags').on('click', '.tag-span .icon', function () {
       
        $(this).parent('.tag-span').fadeOut(800);
    });
    
    // Trim Paragraph Text Characters(39)
    function trimText(selector, maxLenth) {
        
        $(selector).each(function () {
            if ($(selector).text().length > maxLenth) {
           
            var trimmedText = $(this).text().substr(0, maxLenth);
            $(this).text(trimmedText +'...');
                
        }    
        });
        
    }
    trimText('.trimmed-texts .p-one',100);
    trimText('.trimmed-texts .p-two',200);
    trimText('.trimmed-texts .p-three',300);
    
    // Bounce Button Effects(40)
    /*$('.bounce').on('click', function () {
       
        $(this).animate({
            
            marginTop:'-=20px'
        
        },400).animate({
            
            marginTop:'+=20px'
        
        },400);
    });*/
    
    // Bounce Button Effects(41)
    function bounceElement(selector, times, distance, speed) {
        
        for (var i = 0; i < times; i = i + 1) {
            
            $(selector).animate({
            
            top:'-=' + distance
            
            }, speed).animate({
                
               top:'+=' + distance 
                
            },speed);
        }
        
    }
    $('.bounce.first').on('click', function () {
        
        bounceElement($(this), 2, 20, 1000);
    });
    $('.bounce.second').on('click', function () {
        
        bounceElement($(this), 3, 25, 600);
    });
    $('.bounce.third').on('click', function () {
        
        bounceElement($(this), 5, 30, 400);
    });
    
    // Adjust Elements Heights To bo The Same(42)
    var theMaxHeight = 0;
    $('.same-height div').each( function () {
        
        if ($(this).height() > theMaxHeight) {
            
            theMaxHeight = $(this).height();
        }
    });
    $('.same-height div').height(theMaxHeight);
    
    // Shuffle Cards(43)
    var theZIndex = 0;
    $('.cards .card').click('click',  function () {
       
        $(this).animate({
            
            left:'20%',
            marginTop:30
           
        },400, function () {
            
            theZIndex--;
            $(this).css('z-index',theZIndex);
            
        }).animate({
                
            left:$(this).css('left'),
            marginTop:0

        }, 400);
            
    });
    
    // Create Blink Warning(44)
    blinkWarning();
    function blinkWarning() {
        
        $('.blink-warning').fadeOut(1000, function () {
           
            $(this).fadeIn(1000);
            blinkWarning();
        });
    }
    
    // ToDo List (45,46)
    var newTask = $('.task-input');
    $('.add-task').on('submit', function (event) {
        
        event.preventDefault();
        if (newTask.val() != '') {
            
            $('<li>'+newTask.val()+'</li>').appendTo('.tasks');
            newTask.val('');
        }
    });
    $('.tasks').on('click', 'li', function () {
        
       $(this).css('text-decoration','line-through').delay(200).fadeOut(400 ,function () {
       
           $(this).remove();
       });
       
    });
    
    // Type Write Effects(47)
    var theText = $('.typer').data('text'),
        textLenght = theText.length,
        n = 0,
        theTyper = setInterval( function () {
            
            $('.typer').each( function () {
               
                $(this).text($(this).text() + theText[n]);
            });
            
            n+=1;
            if (n >= textLenght) {
                clearInterval(theTyper);
            }
        },100);
    
    // Calculate Table Cell Price Values(48)
    var totalPrice = 0;
    $('.price').each(function () {
       
        totalPrice += parseInt($(this).text());
        
    });
    $('.total').text(totalPrice);
    
    // Auto Change Content(49)
    (function autoChange() {
        
        $('.ticker-list .active').each(function () {
            
            if (! $(this).is(':last-child')) {
                
                $(this).delay(500).fadeOut(500, function () {
                    
                    $(this).removeClass('active').next().addClass('active').fadeIn();
                    
                    autoChange();
                });
            
            } else {
                
                $(this).delay(500).fadeOut(400, function () {
                   
                    $(this).removeClass('active');
                    $('.ticker-list li').eq(0).addClass('active').fadeIn();
                    autoChange();
                });
            }
        });
    }());
    
    // Dynamic Tabs(50)
    $('.tabs-list li').on('click', function () {
       
        $(this).addClass('active').siblings().removeClass('active');
        
        $('.content-list > div').hide();
        
        $($(this).data('content')).fadeIn();
    });
    
    // Switch Tabs View(51)
    $('.switch-tabs').on('click', function () {
       
        $(this).next('.dynamic-tabs').toggleClass('left-tabs');
        
    });
    
    // Email Suggest Box(52,53)
    var emailProviders = ['gmail.com','hotmail.com','yahoo.com','outlook.com'],
        finalString = '';
    
    $('.email-suggest').on('keyup', function () {
        
        finalString = '';
        if(! $(this).next().is('.suggest-box')) { // ! $(this).val().includes([emailProviders])

            $('<ul class="suggest-box"></ul>').insertAfter($(this));

        }
        for (var i = 0; i < emailProviders.length; i+=1) {
            
            if ($(this).val().indexOf('@') != -1) {
                
                //finalString += '<li class="active">' + $(this).val()+ emailProviders[i] + '</li>';   
                $(this).next().remove();
            } else {
                
                finalString += '<li>' + $(this).val() + '@' + emailProviders[i] + '</li>';
            }
            /*if(! $(this).val().includes(emailProviders[i])) {
                
                finalString += '<li>' + $(this).val() + '@' + emailProviders[i] + '</li>';
            } else {
                
                finalString += '<li>' + $(this).val().substr(0, $(this).val().indexOf('@')) + '@'  + emailProviders[i] + '</li>';
            }*///Don't Work
        }
        $('.suggest-box').html(finalString);
        $('body').on('click', '.suggest-box li', function () {
           
            $('.email-suggest').val($(this).text());
            $(this).parent().fadeOut(300);
        });
        
        
    });
    
});
    

