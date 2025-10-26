$(document).ready(function() {
    
    let challengesSectionTriggered = false;
    let flipCardsTriggered = false;
    
    // 效果1: 改為文字淡入效果 - 支援往回滾動
    function handleChallengesFadeIn() {
        const challengesSection = $('#challenges');
        const sectionTop = challengesSection.offset().top;
        const sectionBottom = sectionTop + challengesSection.outerHeight();
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        // 當章節在可視範圍內時
        if (scrollTop + windowHeight > sectionTop + 100 && scrollTop < sectionBottom - 100) {
            if (!challengesSectionTriggered) {
                challengesSectionTriggered = true;
                // 標題先出現
                setTimeout(() => {
                    challengesSection.find('h2').addClass('visible');
                }, 200);
                
                // 卡片依序出現
                challengesSection.find('.challenge-card').each(function(index) {
                    const card = $(this);
                    setTimeout(() => {
                        card.addClass('visible');
                    }, 600 + (index * 300));
                });
            }
        } else {
            // 重置狀態，允許再次觸發
            challengesSectionTriggered = false;
            challengesSection.find('h2').removeClass('visible');
            challengesSection.find('.challenge-card').removeClass('visible');
        }
    }
    
    // 效果2: 翻卡效果 - 延長間隔時間
    function handleFlipCards() {
        const flipSection = $('.success-cases-bg');
        const sectionTop = flipSection.offset().top;
        const sectionBottom = sectionTop + flipSection.outerHeight();
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        // 當翻卡區域在可視範圍內時
        if (scrollTop + windowHeight > sectionTop + 200 && scrollTop < sectionBottom - 200) {
            if (!flipCardsTriggered) {
                flipCardsTriggered = true;
                $('.flip-card').each(function(index) {
                    const card = $(this);
                    setTimeout(() => {
                        card.addClass('flipped');
                    }, index * 800); /* 延長間隔時間到 800ms */
                });
            }
        } else {
            // 重置狀態，允許再次觸發
            flipCardsTriggered = false;
            $('.flip-card').removeClass('flipped');
        }
    }
    
    // 效果3: 文字高亮效果 - 依次出現，但文字永遠顯示
    function handleTextHighlight() {
        $('.highlight-text').each(function(index) {
            const text = $(this);
            const textTop = text.offset().top;
            const windowHeight = $(window).height();
            const scrollTop = $(window).scrollTop();
            
            // 當文字進入螢幕下方四分之三位置時，依序高亮
            if (scrollTop + windowHeight * 0.75 > textTop && !text.hasClass('highlighted')) {
                setTimeout(() => {
                    text.addClass('highlighted');
                }, index * 600);
            }
            // 往回滾動時移除高亮效果，但文字還是顯示
            else if (scrollTop + windowHeight * 0.9 < textTop && text.hasClass('highlighted')) {
                text.removeClass('highlighted');
            }
        });
    }
    
    // 滾動事件監聽
    $(window).scroll(function() {
        handleChallengesFadeIn();
        handleFlipCards();
        handleTextHighlight();
    });
    
    // 頁面載入時也檢查一次
    handleChallengesFadeIn();
    handleFlipCards();
    handleTextHighlight();
    
});