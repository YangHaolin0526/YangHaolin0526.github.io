# Publication Filter Setup Instructions

## 📁 已完成的更改

我们已经完成了以下修改：

1. **创建了独立的JavaScript文件**: `assets/js/publication-filter.js`
2. **更新了脚本加载**: 修改了 `_includes/scripts.html` 添加新的JS文件
3. **简化了publication.html**: 移除了内联JavaScript，使用jQuery兼容的外部文件
4. **手动分类了所有论文**: 每篇论文都有正确的 `data-category` 属性

## 🛠️ 解决依赖问题

### 方法 1: 使用Docker (推荐)
```bash
# 安装Docker后，在项目根目录运行：
docker run --rm -it -p 4000:4000 -v "${PWD}:/srv/jekyll" jekyll/jekyll:latest jekyll serve --host 0.0.0.0
```

### 方法 2: 更新Ruby和依赖
```bash
# 安装rbenv和新版本的Ruby
brew install rbenv
rbenv install 3.0.0
rbenv global 3.0.0

# 重新安装依赖
bundle install --without production
```

### 方法 3: 使用GitHub Pages直接部署
1. 将所有更改push到GitHub
2. 在仓库设置中启用GitHub Pages
3. GitHub会自动构建和部署

### 方法 4: 测试新系统
打开项目根目录下的 `test_new_system.html` 文件可以直接在浏览器中测试过滤功能。

## 🔍 验证步骤

1. **本地测试**: 打开 `test_new_system.html` 确认过滤器工作正常
2. **部署测试**: 使用上述任一方法启动Jekyll服务器
3. **功能验证**: 
   - 点击过滤按钮应该有蓝色高亮
   - "SELECTED PAPERS"应该默认激活
   - 切换过滤器应该显示/隐藏相应论文
   - 浏览器控制台应该显示过滤日志

## 📊 分类说明

- **SELECTED PAPERS**: 顶级会议论文 (ICLR, NeurIPS, ACL, EMNLP等)
- **MACHINE LEARNING**: 所有ML相关论文
- **NATURAL LANGUAGE PROCESSING**: NLP、代码生成、推理等
- **COMPUTER VISION**: 视觉、多模态相关
- **ALL**: 显示所有论文

## 🚨 如果仍有问题

1. 检查浏览器控制台错误信息
2. 确认jQuery已正确加载
3. 验证 `assets/js/publication-filter.js` 文件存在
4. 确认 `_includes/scripts.html` 包含了新的script标签

## 🎯 下一步

1. 选择一个部署方法解决依赖问题
2. 启动Jekyll服务器
3. 访问 `/publications` 页面测试功能
4. 如果正常工作，就可以部署到GitHub Pages了！ 