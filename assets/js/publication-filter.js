/* Publication Filter System for Jekyll */
$(document).ready(function() {
    console.log('Publication filter system initializing...');
    
    // 全局过滤函数
    window.filterPublications = function(filter, clickedButton) {
        console.log('Filtering by:', filter);
        
        // 移除所有active类
        $('.filter-btn').removeClass('active');
        
        // 添加active到点击的按钮
        $(clickedButton).addClass('active');
        
        var visibleCount = 0;
        
        // 遍历所有publication项目
        $('.publication-item').each(function() {
            var $item = $(this);
            var categories = $item.attr('data-category') || '';
            
            if (filter === 'all' || categories.indexOf(filter) >= 0) {
                $item.show();
                visibleCount++;
            } else {
                $item.hide();
            }
        });
        
        console.log('Showing', visibleCount, 'publications for filter:', filter);
    };
    
    // 初始化过滤器
    function initializePublicationFilters() {
        console.log('Initializing publication filters...');
        
        var $filterButtons = $('.filter-btn');
        var $publicationItems = $('.publication-item');
        
        console.log('Found', $filterButtons.length, 'filter buttons');
        console.log('Found', $publicationItems.length, 'publication items');
        
        if ($filterButtons.length > 0 && $publicationItems.length > 0) {
            // 默认显示selected过滤器
            var $selectedBtn = $('.filter-btn[data-filter="selected"]');
            if ($selectedBtn.length > 0) {
                window.filterPublications('selected', $selectedBtn[0]);
                console.log('Publication filters initialized successfully!');
                return true;
            }
        }
        
        console.log('Publication filter elements not found, retrying...');
        return false;
    }
    
    // 延迟初始化以确保DOM完全加载
    setTimeout(function() {
        if (!initializePublicationFilters()) {
            // 如果第一次失败，再试一次
            setTimeout(initializePublicationFilters, 1000);
        }
    }, 500);
}); 