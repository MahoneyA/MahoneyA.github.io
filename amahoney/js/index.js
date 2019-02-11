$(window).ready(function () {
        var preloader = $('#preloader'),
            imagesCount = $('img').length;
        hscroll= $('body');
        precent = 100 / imagesCount;
        progress = 0;
        loadedImg = 0;

        if (imagesCount>0){
            preloader.css('background', '#38383a');
            hscroll.css('overflow', 'hidden');

            $('.progress_bar').circularProgress({
                color: '#ff5168',
                line_width:20,
                height:'350px',
                width:'350px',
                percent: 0
            }).circularProgress('animate', precent, 1800);

            for(var i = 0; i<imagesCount; i++){
                var img_copy = new Image();
                img_copy.src = document.images[i].src;
                img_copy.onload = img_load;
                img_copy.onerror = img_load;
            }
            function img_load() {
                progress +=precent;
                loadedImg++;
                if(progress>=100||loadedImg==imagesCount){
                    preloader.delay(500).fadeOut('slow');
                    hscroll.css('overflow','');
                }
                $('.progress_bar').circularProgress('animate', progress,1800);
            }
        }else {
            preloader.remove();
        }

    });

    $(document).ready(function() {

        var navPos, winPos, navHeight;

        function refreshVar() {
            navPos = $('nav').offset().top;
            navHeight = $('nav').outerHeight(true);
        }

        refreshVar();
        $(window).resize(refreshVar);

        $('<div class="clone-nav"></div>').insertBefore('nav').css('height', navHeight).hide();

        $(window).scroll(function() {
            winPos = $(window).scrollTop();

            if (winPos >= navPos) {
                $('nav').addClass('fixed shadow');
                $('.clone-nav').show();
            }
            else {
                $('nav').removeClass('fixed shadow');
                $('.clone-nav').hide();
            }
        });

    });
    $(window).scroll(function () {
        var st=$(this).scrollTop();

        $(".header_text").css({
            "transform": "translate(0%, -" + st/20 + "%"
        });
    });

    $(document).ready(function() {
        var animTime = 4000, // Задержка между слайдами
            opacityDelay = 500,
            autoSlideDelay2,
            animTime2,
            autoSlideDelay = 8000; // Начальная задержка
        $(window).resize(function () {
            $(".slider").height($(".active").height());
        });

        $(document).ready(function() {
            $(".slider").height($(".active").height());

            index = $('.active').index(".slide");
            $('.slide').eq(index).fadeTo(opacityDelay, 1);
            $('.slide').each(function(i, elem) {
                $('.pagi').append('<div class="pagi-elem" data-id="'+i+'"></div>');
                if ($(this).hasClass('active')) { $('.pagi-elem').eq(i).addClass('current') };
            });
            delay();
        });

        $('#next').click(function () {
            index1 = $('.active').index(".slide");
            index2 = index1+1;
            if (index2 == $(".slide").length ) { index2 = 0; }
            clearTimeout(autoSlideDelay2);
            clearInterval(animTime2);
            delay();
            opacity_refresh(index1, index2);
        });

        $('#prev').click(function () {
            index1 = $('.active').index(".slide");
            index2 = index1-1;
            if (index2 == -1 ) { index2 = $(".slide").length-1; }
            clearTimeout(autoSlideDelay2);
            clearInterval(animTime2);
            delay();
            opacity_refresh(index1, index2);
        });

        $('.pagi').on('click', '.pagi-elem', function () {
            index1 = $('.active').index(".slide");
            index2 = $(this).data('id');
            clearTimeout(autoSlideDelay2);
            clearInterval(animTime2);
            delay();
            opacity_refresh(index1, index2);
        });

        function opacity_refresh(index1, index2) {
            $('.pagi-elem').eq(index1).removeClass('current');
            $('.active').fadeTo(opacityDelay, 0);
            $('.active').removeClass('active');
            $('.slide').eq(index2).addClass('active');
            $('.pagi-elem').eq(index2).addClass('current');
            $('.slide').eq(index2).fadeTo(opacityDelay, 1);
            // delay();
        }


        function delay() {
            autoSlideDelay2 = setTimeout(function() {
                animTime2 = setInterval(function() {
                    index1 = $('.active').index(".slide");
                    index2 = index1+1;
                    if (index2 == $(".slide").length ) { index2 = 0; }
                    opacity_refresh(index1, index2);
                }, animTime);
            }, autoSlideDelay);
        }
    });
    $(window).ready(function () {
        $('a[href^="#"]').bind("click", function(e){ var anchor = $(this); $('html, body').stop().animate({ scrollTop: $(anchor.attr("href")).offset().top }, 1000); e.preventDefault();  return false;
        }
        );
    });
