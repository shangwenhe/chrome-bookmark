document.addEventListener('DOMContentLoaded', () => {
  const bookmarkContainer = document.getElementById('bookmarks-container');
  const historyContainer = document.getElementById('history-container');
  
  // 配置常量
  const ITEMS_PER_PAGE = 50; // 每页显示的项目数
  const SCROLL_THRESHOLD = 200; // 滚动加载阈值（像素）
  const NOTIFICATION_DURATION = 3000; // 通知显示时间（毫秒）
  
  // 存储数据和状态
  let allBookmarks = [];
  let allHistory = [];
  let bookmarkPage = 0;
  let historyPage = 0;
  let isLoadingBookmarks = false;
  let isLoadingHistory = false;
  let hasMoreBookmarks = true;
  let hasMoreHistory = true;

  // 辅助函数：安全获取主机名
  function getSafeHostname(url) {
      try {
          if (!url || typeof url !== 'string') {
              return '';
          }
          return new URL(url).hostname;
      } catch (error) {
          logError(error, `解析URL: ${url}`);
          return '';
      }
  }

  // 辅助函数：获取Favicon URL
  function getFaviconUrl(url) {
      const hostname = getSafeHostname(url);
      return hostname ? `https://www.google.com/s2/favicons?domain=${hostname}&sz=16` : '';
  }
  
  // 处理未捕获的全局错误
  function setupGlobalErrorHandler() {
    window.addEventListener('error', (event) => {
      logError(event.error, '全局错误');
      showError('发生未预期的错误，请刷新页面重试');
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      logError(event.reason, '未处理的Promise错误');
      showError('操作失败，请重试');
    });
  }

  // 通知系统
  function createNotification(message, type = 'info') {
    // 确保通知容器存在
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.id = 'notification-container';
      document.body.appendChild(notificationContainer);
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    
    // 添加动画效果
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // 设置自动关闭
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode === notificationContainer) {
          notificationContainer.removeChild(notification);
        }
        // 如果通知容器为空，移除它
        if (notificationContainer.children.length === 0) {
          notificationContainer.remove();
        }
      }, 300);
    }, NOTIFICATION_DURATION);
    
    return notification;
  }
  
  // 显示不同类型的通知
  function showSuccess(message) {
    createNotification(message, 'success');
  }
  
  function showError(message) {
    createNotification(message, 'error');
  }
  
  function showWarning(message) {
    createNotification(message, 'warning');
  }
  
  function showInfo(message) {
    createNotification(message, 'info');
  }
  
  // 错误日志记录
  function logError(error, context = '') {
    console.error(`[${context}] 错误:`, error);
    // 可以在这里添加远程错误日志记录功能（如果需要）
  }
  
  // 显示加载指示器
  function showLoading(element) {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-indicator';
    loadingElement.innerHTML = '<p style="text-align: center; color: #666; padding: 10px;">加载中...</p>';
    loadingElement.id = 'loading-' + Date.now(); // 唯一ID
    element.appendChild(loadingElement);
    return loadingElement;
  }

  // 移除加载指示器
  function removeLoading(element) {
    const loadingElement = element.querySelector('.loading-indicator');
    if (loadingElement) {
      loadingElement.remove();
    }
  }

  // -------------------------- 书签相关（倒序排列） --------------------------
  // 递归收集所有书签（含文件夹结构）
  function collectAllBookmarks(node, folderPath = []) {
    let result = [];
    if (node.children && node.children.length > 0) {
      const currentFolderPath = [...folderPath, node.title];
      node.children.forEach(child => {
        const childItems = collectAllBookmarks(child, currentFolderPath);
        result = [...result, ...childItems];
      });
    } else if (node.url) {
      result.push({
        url: node.url,
        title: node.title,
        folderPath: folderPath.join(' / ')
      });
    }
    return result;
  }

  // 初始化书签数据
  function initializeBookmarks() {
    // 检查权限
    if (!chrome.bookmarks) {
      const errorMsg = '无法访问书签功能，请确保插件已获得书签权限';
      bookmarkContainer.innerHTML = `<p style="text-align: center; color: #ff4d4f; padding: 20px;">${errorMsg}</p>`;
      showError(errorMsg);
      logError(new Error('缺少书签权限'), '初始化书签');
      return;
    }
    
    const loading = showLoading(bookmarkContainer);
    
    try {
      chrome.bookmarks.getTree((tree) => {
        try {
          removeLoading(bookmarkContainer);
          
          if (!tree || !tree.length) {
            throw new Error('书签数据为空');
          }
          
          allBookmarks = collectAllBookmarks(tree[0]);
          allBookmarks.reverse();
          
          // 按文件夹分组
          const folderMap = {};
          allBookmarks.forEach(bookmark => {
            if (!folderMap[bookmark.folderPath]) {
              folderMap[bookmark.folderPath] = [];
            }
            folderMap[bookmark.folderPath].push(bookmark);
          });
          
          // 重置分组后的数据
          allBookmarks = [];
          Object.keys(folderMap).forEach(folderPath => {
            // 添加文件夹标题标记
            if (folderPath) {
              allBookmarks.push({ type: 'folder', folderPath });
            }
            // 添加该文件夹下的所有书签
            allBookmarks = [...allBookmarks, ...folderMap[folderPath]];
          });
          
          // 渲染第一页
          bookmarkPage = 0;
          renderBookmarksPage();
          
          // 如果没有书签，显示提示
          if (allBookmarks.length === 0) {
            bookmarkContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">暂无书签数据</p>';
            showInfo('您当前没有保存的书签');
          }
        } catch (error) {
          logError(error, '处理书签数据');
          removeLoading(bookmarkContainer);
          bookmarkContainer.innerHTML = '<p style="text-align: center; color: #ff4d4f; padding: 20px;">加载书签数据时出错，请刷新页面重试</p>';
          showError('加载书签失败，请刷新页面重试');
        }
      });
    } catch (error) {
      logError(error, '调用书签API');
      removeLoading(bookmarkContainer);
      bookmarkContainer.innerHTML = '<p style="text-align: center; color: #ff4d4f; padding: 20px;">访问书签API失败</p>';
      showError('无法访问书签功能');
    }
  }

  // 渲染书签的一页
  function renderBookmarksPage() {
    if (isLoadingBookmarks || !hasMoreBookmarks) return;
    
    isLoadingBookmarks = true;
    const loading = showLoading(bookmarkContainer);
    
    // 计算当前页的数据范围
    const startIndex = bookmarkPage * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, allBookmarks.length);
    const currentPageItems = allBookmarks.slice(startIndex, endIndex);
    
    // 模拟异步加载延迟
    setTimeout(() => {
      try {
        // 检查currentPageItems是否有效
        if (!Array.isArray(currentPageItems)) {
          throw new Error('无效的数据格式');
        }
        
        currentPageItems.forEach((item, index) => {
          try {
            if (item.type === 'folder') {
              // 创建文件夹标题
              const folderTitle = document.createElement('div');
              folderTitle.className = 'bookmark-folder-title';
              folderTitle.textContent = item.folderPath || '未分类';
              bookmarkContainer.insertBefore(folderTitle, loading);
            } else {
              // 创建书签链接
              const link = createLinkElement(item.url, item.title);
              bookmarkContainer.insertBefore(link, loading);
            }
          } catch (error) {
            logError(error, `渲染书签项[${index}]`);
            // 跳过错误项，继续渲染其他项
          }
        });
        
        removeLoading(bookmarkContainer);
        
        // 更新状态
        bookmarkPage++;
        hasMoreBookmarks = endIndex < allBookmarks.length;
        isLoadingBookmarks = false;
        
        // 如果已加载所有书签，显示提示
        if (!hasMoreBookmarks && allBookmarks.length > 0) {
          showSuccess(`已加载全部 ${allBookmarks.length} 个书签`);
        }
      } catch (error) {
        logError(error, '渲染书签页面');
        removeLoading(bookmarkContainer);
        isLoadingBookmarks = false;
        showError('加载更多书签时出错');
      }
    }, 100); // 轻微延迟以模拟网络加载
  }

  // -------------------------- 历史记录相关（仅最近三天） --------------------------
  // 初始化历史记录数据
  function initializeHistory() {
    // 检查权限
    if (!chrome.history) {
      const errorMsg = '无法访问历史记录功能，请确保插件已获得历史记录权限';
      historyContainer.innerHTML = `<p style="text-align: center; color: #ff4d4f; padding: 20px;">${errorMsg}</p>`;
      showError(errorMsg);
      logError(new Error('缺少历史记录权限'), '初始化历史记录');
      return;
    }
    
    const loading = showLoading(historyContainer);
    const threeDaysAgo = new Date().getTime() - 3 * 24 * 60 * 60 * 1000;
    
    try {
      // 使用更大的maxResults值，但在客户端进行过滤
      chrome.history.search({ text: '', maxResults: 2000 }, (items) => {
        try {
          removeLoading(historyContainer);
          
          if (!items) {
            throw new Error('历史记录数据为空');
          }
          
          allHistory = items
            .filter(item => item && item.lastVisitTime >= threeDaysAgo && item.url) // 确保有URL
            .sort((a, b) => b.lastVisitTime - a.lastVisitTime);
        
          // 渲染第一页
          historyPage = 0;
          renderHistoryPage();
        
          // 如果没有历史记录，显示提示
          if (allHistory.length === 0) {
            historyContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">暂无最近三天的历史记录</p>';
            showInfo('最近三天内没有浏览历史记录');
          }
        } catch (error) {
          logError(error, '处理历史记录数据');
          removeLoading(historyContainer);
          historyContainer.innerHTML = '<p style="text-align: center; color: #ff4d4f; padding: 20px;">加载历史记录时出错，请刷新页面重试</p>';
          showError('加载历史记录失败，请刷新页面重试');
        }
      });
    } catch (error) {
      logError(error, '调用历史记录API');
      removeLoading(historyContainer);
      historyContainer.innerHTML = '<p style="text-align: center; color: #ff4d4f; padding: 20px;">访问历史记录API失败</p>';
      showError('无法访问历史记录功能');
    }
  }

  // 渲染历史记录的一页
  function renderHistoryPage() {
    if (isLoadingHistory || !hasMoreHistory) return;
    
    isLoadingHistory = true;
    const loading = showLoading(historyContainer);
    
    // 计算当前页的数据范围
    const startIndex = historyPage * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, allHistory.length);
    const currentPageItems = allHistory.slice(startIndex, endIndex);
    
    // 模拟异步加载延迟
    setTimeout(() => {
      try {
        // 检查currentPageItems是否有效
        if (!Array.isArray(currentPageItems)) {
          throw new Error('无效的数据格式');
        }
        
        currentPageItems.forEach((item, index) => {
          try {
            // 确保item有效
            if (!item || !item.url) {
              return; // 跳过无效项
            }
            
            const link = document.createElement('a');
            link.className = 'history-item';
            link.href = item.url;
            link.target = '_blank';

            const faviconUrl = getFaviconUrl(item.url);
            const visitTime = new Date(item.lastVisitTime);
            const formattedTime = visitTime.toLocaleString();

            link.innerHTML = `
              <img src="${faviconUrl}" class="favicon" alt="图标">
              <span class="link-text">${item.title || item.url}</span>
              <span class="history-time">${formattedTime}</span>
            `;

            historyContainer.insertBefore(link, loading);
          } catch (error) {
            logError(error, `渲染历史记录项[${index}]`);
            // 跳过错误项，继续渲染其他项
          }
        });
        
        removeLoading(historyContainer);
        
        // 更新状态
        historyPage++;
        hasMoreHistory = endIndex < allHistory.length;
        isLoadingHistory = false;
        
        // 如果已加载所有历史记录，显示提示
        if (!hasMoreHistory && allHistory.length > 0) {
          showSuccess(`已加载全部 ${allHistory.length} 条历史记录`);
        }
      } catch (error) {
        logError(error, '渲染历史记录页面');
        removeLoading(historyContainer);
        isLoadingHistory = false;
        showError('加载更多历史记录时出错');
      }
    }, 100); // 轻微延迟以模拟网络加载
  }

  // 辅助函数：创建书签链接元素
  function createLinkElement(url, title) {
    const link = document.createElement('a');
    link.className = 'bookmark-link';
    link.href = url;
    link.target = '_blank';

    const faviconUrl = getFaviconUrl(url);
    link.innerHTML = `
      <img src="${faviconUrl}" class="favicon" alt="图标">
      <span class="link-text">${title || url}</span>
    `;
    return link;
  }

  // 滚动加载更多数据
  function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    
    // 当滚动到页面底部附近时加载更多
    if (bodyHeight - scrollPosition < SCROLL_THRESHOLD) {
      // 如果还有书签数据且未在加载中，则加载下一页
      if (hasMoreBookmarks && !isLoadingBookmarks) {
        renderBookmarksPage();
      }
      
      // 如果还有历史记录数据且未在加载中，则加载下一页
      if (hasMoreHistory && !isLoadingHistory) {
        renderHistoryPage();
      }
    }
  }

  // -------------------------- 初始化 --------------------------
  setupGlobalErrorHandler();
  showInfo('正在加载您的书签和历史记录...');
  initializeBookmarks();
  initializeHistory();
  
  // 添加滚动事件监听器以实现懒加载
  window.addEventListener('scroll', handleScroll);
  
  // 页面卸载前清理
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('scroll', handleScroll);
  });
});