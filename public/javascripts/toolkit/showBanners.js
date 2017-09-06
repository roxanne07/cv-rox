var getBannerAmount = function(banners) {
    return banners.length;
}
var randomInitial = function(banners) {
    return Math.floor(Math.random() * getBannerAmount(banners)) + 1;
}
var hideAllBanner = function(banners, method, navs) {
    $(navs).removeClass("active");
    /*
    if(method === "hide")banners.hide();
    if(method === "fade")banners.fadeOut();
    if(method === "slide")banners.slideUp();
    */
    switch(method) {
        case "fade":
            banners.fadeOut();
            break;
        case "slide":
            banners.slideUp();
            break;
        default:
            banners.hide();
            break;
    }
}
var showCurrentBanner = function(banners, currentBanner, method, navs) {
    banners.each(function(index) {
        if((index+1) === currentBanner) {
            if(method === "fade")$(this).fadeIn();
            if(method === "slide")$(this).slideDown();
        }
    });

    $(navs).each(function(index) {
        if((index+1) === currentBanner)
            $(this).addClass("active");
    });
}
var resetCurrentBanner = function(resetValue) {
    return resetValue;
}
var nextBanner = function(banners, currentBanner) {
    return currentBanner === getBannerAmount(banners) ? resetCurrentBanner(1) : ++currentBanner;
}
var runInterval;
function showBanners(banners, showOneBannerTime, inMethod, outMethod, navs, initIndex) {
    if(getBannerAmount(banners) <= 1) return;
    //var currentBanner = randomInitial(banners);
    var currentBanner = initIndex == undefined ? randomInitial(banners) : initIndex;

    if(initIndex > getBannerAmount(banners)){
        currentBanner = 1;
    }else if (initIndex == false){
        currentBanner = getBannerAmount(banners);
    }

    hideAllBanner(banners, "hide", navs);
    showCurrentBanner(banners, currentBanner, inMethod, navs);
    currentBanner = nextBanner(banners, currentBanner);
    /*
    setInterval(function() {
        hideAllBanner(banners, outMethod, navs);
        showCurrentBanner(banners, currentBanner, inMethod, navs);
        currentBanner = nextBanner(banners, currentBanner);
    }, showOneBannerTime);
    */
    
    
    clearInterval(runInterval);
    runInterval = setInterval(function() {
        hideAllBanner(banners, outMethod, navs);
        showCurrentBanner(banners, currentBanner, inMethod, navs);
        currentBanner = nextBanner(banners, currentBanner);
    }, showOneBannerTime);
    
}