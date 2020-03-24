/*

Credits:
    - Lummit (source code, media: https://obnoxious.club/ | https://github.com/Lumm1t/ | Discord: Lummit#0201)
    - expl0it, shellcode.team (website template, big help with code)
    - Steam (emoticon: https://steamcommunity-a.akamaihd.net/economy/emoticon/mgh_17)
    - Trollface image (http://www.rw-designer.com/icon-image/7835-256x256x32.png)
    - Tumblr images/icons:
        a) https://68.media.tumblr.com/730ba51e7f6b0203e023deeb0db8367b/tumblr_osgbbiLXWV1suieauo1_500.jpg
        b) https://68.media.tumblr.com/8436227895295acecdea170b612fb766/tumblr_nxgg5bYqm81rclv0wo1_500.jpg
        c) https://68.media.tumblr.com/49394d5aa66d4c7ea4ffebda38c6be7e/tumblr_orv2rd9eVC1rgewhto1_400.gif
        d) http://picture-cdn.wheretoget.it/ot63b4-l-610x610-shirt-rose-tumblr-grunge-grunge+t+shirt-clothes-t+shirt-tumblr+shirt-dead+roses-black+bear-soft+grunge-soft-soft+ghetto-ghetto-chill-cute-white-red-red+roses-white+tee-pale-sad-dar.jpg
        e) https://ih1.redbubble.net/image.268210271.5200/sticker,375x360-bg,ffffff.u2.png

Thanks for:
    - Google
    - StackOverflow
    - jQuery
    - jQuery Marquee
    - animate.css
    - typed.js

*/

"use scrict";


        $(document).ready(function () {

            var links = [

                {
                    name: 'shop',
                    link: 'https://hexpay.gg/u/arzo'
                },
                
                {
                    name: 'youtube',
                    link: 'https://www.youtube.com/channel/UCY6J8om0uRNYpE2-TgYgNOg?view_as=subscriber'
                },

                {
                    name: 'discord',
                    link: 'https://discord.gg/MZqwxMG'
                }          
          
            ];
         
            for (var i in links)
            {

                var link = links[i];

                $('#marquee').append('<a href="' + link.link + '" target="_BLANK">' + link.name + '</a>');

                link = $('#marquee').children('a').last();
                
                if (i != links.length - 1) 
                    $('#marquee').append(' <img class="emoticon" src="assets/others/mgh_17.png"> ');

            }

            if (window.mobileAndTabletCheck())
            {
                $("#brand").replaceWith('<span id="brand" style="margin-left:0.3pc;"></span>');

                $("#background").replaceWith('<div id="background" style="background-image: url(https://obnoxious.club/assets/images/mobile-background.jpg);"></div>');

                $("#audio").remove();

                app.shouldIgnoreVideo = true;
            } 
            else
            {
            app.titleChanger();
            app.iconChanger([
                "assets/icons/roses/pepe.png", 
            ]);
            }

        });

        if ($.cookie('videoTime'))
        {
        	app.videoElement.currentTime = $.cookie('videoTime');
        	app.audioElement.currentTime = $.cookie('videoTime');
        }

        document.addEventListener('contextmenu', function (event) { 
            event.preventDefault() 
        });

        $(window).on('keydown', function () {
            if (event.keyCode == 123)
                return false;
            else if (event.ctrlKey && event.shiftKey && event.keyCode == 73)
                return false;
            else if (event.ctrlKey && event.keyCode == 73)
                return false;
            else if (event.ctrlKey && event.shiftKey && event.keyCode == 74)
                return false;
            else if (event.ctrlKey && event.keyCode == 74)
                return false;
        });

        document.body.onkeyup = function (e)
        {

            if (e.keyCode == 32 && app.skippedIntro)
            {

                if (app.backgroundToggler)
                {
                    app.videoElement.play();
                    app.audioElement.play();
                }
                else
                {
                    app.videoElement.pause();
                    app.audioElement.pause();
                }

                return app.backgroundToggler = !app.backgroundToggler;
            }

        }

 

        var skipIntro = function () {

            if (app.skippedIntro)
                return;

            app.skippedIntro = true;

            timeouts.forEach(function (timeout) {
                clearTimeout(timeout);
            });

            $(".top-right").remove();

            $('#main').fadeOut(100, function () {

                $("#main").remove();

                $('#marquee').marquee({
                    duration: 19000,
                    gap: 400,
                    delayBeforeStart: 900,
                    direction: 'left',
                    duplicated: true
                });

                setTimeout(function () {
                    $('.brand-header').animateCss(app.effects[ Math.floor(Math.random() * app.effects.length) ]);
                }, 200);

                setTimeout(function () {
                    var typed = new Typed("#brand", {
                     strings: app.brandDescription,
                     typeSpeed: 40,
                     onComplete: function () {
                        clearCursor()
                     }
                    });
                }, 1350);

                setTimeout(function () {

                    if (!app.shouldIgnoreVideo)
                    {
                        app.videoElement.play();
                        app.audioElement.play();
                    }

                    app.videoElement.addEventListener("timeupdate", function () {
                        $.cookie('videoTime', app.videoElement.currentTime, { expires: 1 });
                    }, false);

                    $('.marquee-container').fadeIn(100);

                    $('.marquee-container').animateCss('zoomIn');

                    $('.container').fadeIn();

                    $('.background').fadeIn(200, function () {

                        if (!app.shouldIgnoreVideo)
                            $("#audio").animate({volume: app.musicVolume}, app.musicFadeIn);

                    });
                }, 200);

            });
        };

        var clearCursor  = function () {
            return $("span").siblings(".typed-cursor").css("opacity", "0");
        }
})()
