// GitHub Pages Publication Filter Debug Script
// 复制这段代码到浏览器Console中运行来调试问题

console.log('🔧 GitHub Pages Publication Filter Debug Script');
console.log('='.repeat(50));

// 1. 检查基本元素
function checkBasicElements() {
    console.log('1️⃣ 检查基本元素...');
    
    var filterButtons = document.getElementsByClassName('filter-btn');
    var publicationItems = document.getElementsByClassName('publication-item');
    
    console.log('📊 Filter buttons found:', filterButtons.length);
    console.log('📄 Publication items found:', publicationItems.length);
    
    // 检查按钮
    for (var i = 0; i < filterButtons.length; i++) {
        var btn = filterButtons[i];
        var filter = btn.getAttribute('data-filter');
        var onclick = btn.getAttribute('onclick');
        console.log('🔘 Button ' + i + ': filter="' + filter + '", onclick="' + (onclick ? 'yes' : 'no') + '"');
    }
    
    return filterButtons.length > 0 && publicationItems.length > 0;
}

// 2. 测试自动分类
function testAutoClassification() {
    console.log('\n2️⃣ 测试自动分类...');
    
    var items = document.getElementsByClassName('publication-item');
    
    for (var i = 0; i < Math.min(3, items.length); i++) {
        var item = items[i];
        var titleElement = item.querySelector('.pub-title a');
        var venueElement = item.querySelector('.pub-venue');
        
        if (titleElement && venueElement) {
            var title = titleElement.textContent || titleElement.innerText || '';
            var venue = venueElement.textContent || venueElement.innerText || '';
            var currentCategory = item.getAttribute('data-category');
            
            console.log('📄 Item ' + i + ':');
            console.log('   Title: "' + title.substring(0, 50) + '..."');
            console.log('   Venue: "' + venue + '"');
            console.log('   Current category: "' + (currentCategory || 'none') + '"');
        }
    }
}

// 3. 测试过滤功能
function testFiltering() {
    console.log('\n3️⃣ 测试过滤功能...');
    
    // 尝试点击ALL按钮
    var allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) {
        console.log('🔘 Testing ALL filter...');
        allBtn.click();
        
        setTimeout(function() {
            var visibleItems = 0;
            var items = document.getElementsByClassName('publication-item');
            for (var i = 0; i < items.length; i++) {
                if (items[i].style.display !== 'none') {
                    visibleItems++;
                }
            }
            console.log('👁️ Visible items after clicking ALL:', visibleItems);
        }, 100);
    }
}

// 4. 手动执行过滤
function manualFilter(filterType) {
    console.log('\n4️⃣ 手动执行过滤: ' + filterType);
    
    var items = document.getElementsByClassName('publication-item');
    var visibleCount = 0;
    
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var categories = item.getAttribute('data-category') || '';
        
        if (filterType === 'all') {
            item.style.display = 'block';
            visibleCount++;
        } else {
            if (categories.indexOf(filterType) >= 0) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        }
    }
    
    console.log('👁️ Manual filter result: ' + visibleCount + ' items visible');
    return visibleCount;
}

// 5. 强制重新分类
function forceReClassify() {
    console.log('\n5️⃣ 强制重新分类...');
    
    // 简化的分类规则
    var categoryRules = {
        'machine-learning': ['machine', 'model', 'neural', 'learning', 'multimodal', 'language model', 'llm'],
        'natural-language': ['language', 'text', 'sql', 'code', 'math', 'reasoning'],
        'computer-vision': ['vision', 'image', 'visual', 'detection']
    };
    
    var topVenues = ['ICLR', 'NeurIPS', 'ICML', 'ACL', 'EMNLP', 'NAACL', 'CVPR', 'ECCV', 'TPAMI'];
    
    var items = document.getElementsByClassName('publication-item');
    var reclassified = 0;
    
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var titleElement = item.querySelector('.pub-title a');
        var venueElement = item.querySelector('.pub-venue');
        
        if (titleElement && venueElement) {
            var title = (titleElement.textContent || titleElement.innerText || '').toLowerCase();
            var venue = (venueElement.textContent || venueElement.innerText || '').toLowerCase();
            var text = title + ' ' + venue;
            
            var categories = [];
            
            // 检查顶级会议
            var isTopVenue = topVenues.some(function(v) {
                return venue.indexOf(v.toLowerCase()) >= 0;
            });
            if (isTopVenue) categories.push('selected');
            
            // 检查类别
            for (var category in categoryRules) {
                var keywords = categoryRules[category];
                var matched = keywords.some(function(keyword) {
                    return text.indexOf(keyword) >= 0;
                });
                if (matched) categories.push(category);
            }
            
            if (categories.length === 0) categories.push('machine-learning');
            
            var newCategory = categories.join(' ');
            item.setAttribute('data-category', newCategory);
            
            console.log('📄 Reclassified item ' + i + ': [' + newCategory + ']');
            reclassified++;
        }
    }
    
    console.log('✅ Reclassified ' + reclassified + ' items');
}

// 运行诊断
console.log('🚀 开始诊断...');

if (checkBasicElements()) {
    testAutoClassification();
    testFiltering();
    
    // 提供手动命令
    console.log('\n📋 可用的手动命令:');
    console.log('manualFilter("all") - 显示所有论文');
    console.log('manualFilter("selected") - 显示精选论文');
    console.log('manualFilter("machine-learning") - 显示ML论文');
    console.log('manualFilter("natural-language") - 显示NLP论文');
    console.log('forceReClassify() - 强制重新分类所有论文');
    
    window.manualFilter = manualFilter;
    window.forceReClassify = forceReClassify;
    
} else {
    console.log('❌ 基本元素检查失败，页面可能还没完全加载');
    console.log('请等待页面完全加载后重新运行此脚本');
}

console.log('\n🔧 调试脚本执行完毕'); 