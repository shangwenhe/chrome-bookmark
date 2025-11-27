document.addEventListener('DOMContentLoaded', () => {
  const bookmarkContainer = document.getElementById('bookmarks-container');
  const historyContainer = document.getElementById('history-container');

  // 配置常量
  const ITEMS_PER_PAGE = 100; // 每页显示的项目数
  const SCROLL_THRESHOLD = 200; // 滚动加载阈值（像素）
  const NOTIFICATION_DURATION = 3000; // 通知显示时间（毫秒）

  // 存储数据和状态
  let allBookmarks = [];
  let allHistory = [];
  let groupedHistory = {}; // 新增：分组后的历史记录
  let historyPage = 0;
  let isLoadingBookmarks = false;
  let isLoadingHistory = false;
  let hasMoreBookmarks = true;
  let hasMoreHistory = true;

  // --- 新增：暴露全局搜索数据 ---
  window.searchData = {
    getBookmarks: () => [...allBookmarks],
    getHistory: () => [...allHistory],
    getFaviconUrl: getFaviconUrl
  };

  // --- 缓存管理函数 ---
  function getHostname(url) {
      try {
          if (!url || typeof url !== 'string') {
              return '';
          }
          return new URL(url).hostname;
      } catch (error) {
          logError(error, `解析 URL 获取主机名: ${url}`);
          return '';
      }
  }

  // --- Favicon 获取函数 (带缓存) ---
  function getFaviconUrl(url) {
      return new Promise((resolve, reject) => {
          const hostname = getHostname(url);
          reject(new Error( "获取 Favicon 失败"));
      });
  }

  // --- 辅助函数 ---
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

  function createNotification(message, type = 'info') {
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.id = 'notification-container';
      document.body.appendChild(notificationContainer);
    }
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, NOTIFICATION_DURATION);
    return notification;
  }

  function showSuccess(message) { createNotification(message, 'success'); }
  function showError(message) { createNotification(message, 'error'); }
  function showWarning(message) { createNotification(message, 'warning'); }
  function showInfo(message) { createNotification(message, 'info'); }
  function logError(error, context = '') {
    console.error(`[${context}] 错误:`, error);
  }

  function showLoading(element) {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-indicator';
    loadingElement.innerHTML = '<p style="text-align: center; color: #666; padding: 10px;">加载中...</p>';
    element.appendChild(loadingElement);
    return loadingElement;
  }
  function removeLoading(element) {
    const loadingElement = element.querySelector('.loading-indicator');
    if (loadingElement) loadingElement.remove();
  }

  // -------------------------- 新增：日期格式化函数 --------------------------
  function formatHistoryTime(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    // 生成分组键（例如：11月27日14时）
    const groupKey = `${month} / ${day} ${hour}时`;
    // 生成显示时间（例如：14:35:22）
    const displayTime = date.toTimeString().split(' ')[0].substring(0, 8);
    return { groupKey, displayTime, fullDate: date };
  }

  // -------------------------- 书签相关 --------------------------
  function collectAllBookmarks(node, folderPath = []) {
    let result = [];
    if (node.children && node.children.length > 0) {
      const currentFolderPath = [...folderPath, node.title];
      node.children.forEach(child => {
        const childItems = collectAllBookmarks(child, currentFolderPath);
        result = [...result, ...childItems];
      });
    } else if (node.url) {
      result.push({ url: node.url, title: node.title, folderPath: folderPath.join(' / ') });
    }
    return result;
  }

  function initializeBookmarks() {
    if (!chrome.bookmarks) {
      const errorMsg = '无法访问书签功能，请确保插件已获得书签权限';
      bookmarkContainer.innerHTML = `<p style="text-align: center; color: #ff4d4f; padding: 20px;">${errorMsg}</p>`;
      showError(errorMsg);
      return;
    }
    const loading = showLoading(bookmarkContainer);
    try {
      chrome.bookmarks.getTree((tree) => {
        try {
          removeLoading(bookmarkContainer);
          if (!tree || !tree.length) throw new Error('书签数据为空');
          allBookmarks = collectAllBookmarks(tree[0]);
          allBookmarks.reverse();

          const folderMap = {};
          allBookmarks.forEach(bookmark => {
            if (!folderMap[bookmark.folderPath]) folderMap[bookmark.folderPath] = [];
            folderMap[bookmark.folderPath].push(bookmark);
          });

          allBookmarks = [];
          Object.keys(folderMap).forEach(folderPath => {
            if (folderPath) allBookmarks.push({ type: 'folder', folderPath });
            allBookmarks = [...allBookmarks, ...folderMap[folderPath]];
          });

          bookmarkPage = 0;
          renderBookmarksPage();

          if (allBookmarks.length === 0) {
            bookmarkContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">暂无书签数据</p>';
            showInfo('您当前没有保存的书签');
          }
        } catch (error) {
          logError(error, '处理书签数据');
          removeLoading(bookmarkContainer);
          bookmarkContainer.innerHTML = '<p style="text-align: center; color: #ff4d4f; padding: 20px;">加载书签数据时出错，请刷新页面重试</p>';
          showError('加载书签失败');
        }
      });
    } catch (error) {
      logError(error, '调用书签API');
      removeLoading(bookmarkContainer);
      bookmarkContainer.innerHTML = '<p style="text-align: center; color: #ff4d4f; padding: 20px;">访问书签API失败</p>';
      showError('无法访问书签功能');
    }
  }

  async function renderBookmarksPage() {
    if (isLoadingBookmarks || !hasMoreBookmarks) return;
    isLoadingBookmarks = true;
    const loading = showLoading(bookmarkContainer);
    const startIndex = bookmarkPage * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, allBookmarks.length);
    const currentPageItems = allBookmarks.slice(startIndex, endIndex);

    try {
      if (!Array.isArray(currentPageItems)) throw new Error('无效的数据格式');
      for (const item of currentPageItems) {
        if (item.type === 'folder') {
          const folderTitle = document.createElement('div');
          folderTitle.className = 'bookmark-folder-title';
          folderTitle.textContent = item.folderPath || '未分类';
          bookmarkContainer.insertBefore(folderTitle, loading);
        } else {
          try {
            const base64Icon = await getFaviconUrl(item.url);
            const link = createLinkElement(item.url, item.title, base64Icon);
            bookmarkContainer.insertBefore(link, loading);
          } catch (error) {
            console.log(`为书签 "${item.title}" 创建默认链接`);
            const link = createLinkElement(item.url, item.title);
            bookmarkContainer.insertBefore(link, loading);
          }
        }
      }
      removeLoading(bookmarkContainer);
      bookmarkPage++;
      hasMoreBookmarks = endIndex < allBookmarks.length;
      isLoadingBookmarks = false;
      if (!hasMoreBookmarks && allBookmarks.length > 0) {
        showSuccess(`已加载全部 ${allBookmarks.length} 个书签`);
      }
    } catch (error) {
      logError(error, '渲染书签页面');
      removeLoading(bookmarkContainer);
      isLoadingBookmarks = false;
      showError('加载更多书签时出错');
    }
  }

  // -------------------------- 历史记录相关（重点修改）--------------------------
  function initializeHistory() {
    if (!chrome.history) {
      const errorMsg = '无法访问历史记录功能，请确保插件已获得历史记录权限';
      historyContainer.innerHTML = `<p style="text-align: center; color: #ff4d4f; padding: 20px;">${errorMsg}</p>`;
      showError(errorMsg);
      return;
    }
    const loading = showLoading(historyContainer);
    const threeDaysAgo = new Date().getTime() - 3 * 24 * 60 * 60 * 1000;
    try {
      chrome.history.search({ text: '', maxResults: 2000 }, (items) => {
        try {
          removeLoading(historyContainer);
          if (!items) throw new Error('历史记录数据为空');
          
          // 过滤最近3天的历史记录并排序
          allHistory = items
            .filter(item => item && item.lastVisitTime >= threeDaysAgo && item.url)
            .sort((a, b) => b.lastVisitTime - a.lastVisitTime);

          // 新增：按小时分组历史记录
          groupedHistory = {};
          allHistory.forEach(item => {
            const { groupKey } = formatHistoryTime(item.lastVisitTime);
            if (!groupedHistory[groupKey]) {
              groupedHistory[groupKey] = [];
            }
            groupedHistory[groupKey].push(item);
          });

          // 转换为扁平化的分组列表（包含标题和项目）
          let flatHistory = [];
          Object.keys(groupedHistory).forEach(groupKey => {
            // 添加分组标题
            flatHistory.push({ type: 'group', groupKey });
            // 添加该分组下的所有历史记录
            flatHistory = flatHistory.concat(groupedHistory[groupKey]);
          });
          allHistory = flatHistory; // 替换为扁平化列表

          historyPage = 0;
          renderHistoryPage();

          if (allHistory.length === 0) {
            historyContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">暂无最近三天的历史记录</p>';
            showInfo('最近三天内没有浏览历史记录');
          }
        } catch (error) {
          logError(error, '处理历史记录数据');
          removeLoading(historyContainer);
          historyContainer.innerHTML = '<p style="text-align: center; color: #ff4d4f; padding: 20px;">加载历史记录时出错，请刷新页面重试</p>';
          showError('加载历史记录失败');
        }
      });
    } catch (error) {
      logError(error, '调用历史记录API');
      removeLoading(historyContainer);
      historyContainer.innerHTML = '<p style="text-align: center; color: #ff4d4f; padding: 20px;">访问历史记录API失败</p>';
      showError('无法访问历史记录功能');
    }
  }

  async function renderHistoryPage() {
    if (isLoadingHistory || !hasMoreHistory) return;
    isLoadingHistory = true;
    const loading = showLoading(historyContainer);
    const startIndex = historyPage * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, allHistory.length);
    const currentPageItems = allHistory.slice(startIndex, endIndex);

    try {
      if (!Array.isArray(currentPageItems)) throw new Error('无效的数据格式');
      for (const item of currentPageItems) {
        if (!item) continue;

        // 处理分组标题
        if (item.type === 'group') {
          const groupTitle = document.createElement('div');
          groupTitle.className = 'history-date-header';
          groupTitle.textContent = item.groupKey;
          historyContainer.insertBefore(groupTitle, loading);
          continue;
        }

        // 处理普通历史记录项
        if (!item.url) continue;
        try {
          const base64Icon = await getFaviconUrl(item.url);
          const link = document.createElement('a');
          link.className = 'history-item';
          link.href = item.url;
          link.target = '_blank';
          const { displayTime } = formatHistoryTime(item.lastVisitTime);
          link.innerHTML = `
            <img src="${base64Icon}" class="favicon" alt="图标">
            <span class="link-text">${item.title || item.url}</span>
            <span class="history-time">${displayTime}</span>
          `;
          historyContainer.insertBefore(link, loading);
        } catch (error) {
          console.log(`为历史记录 "${item.title}" 创建默认链接`);
          const link = document.createElement('a');
          link.className = 'history-item';
          link.href = item.url;
          link.target = '_blank';
          const { displayTime } = formatHistoryTime(item.lastVisitTime);
          link.innerHTML = `
            <i class="fas fa-clock favicon" style="width:16px; height:16px; display:inline-block; text-align:center;"></i>
            <span class="link-text">${item.title || item.url}</span>
            <span class="history-time">${displayTime}</span>
          `;
          historyContainer.insertBefore(link, loading);
        }
      }
      removeLoading(historyContainer);
      historyPage++;
      hasMoreHistory = endIndex < allHistory.length;
      isLoadingHistory = false;
      if (!hasMoreHistory && allHistory.length > 0) {
        // 计算实际的历史记录数量（排除分组标题）
        const actualHistoryCount = allHistory.filter(item => !item.type).length;
        showSuccess(`已加载全部 ${actualHistoryCount} 条历史记录`);
      }
    } catch (error) {
      logError(error, '渲染历史记录页面');
      removeLoading(historyContainer);
      isLoadingHistory = false;
      showError('加载更多历史记录时出错');
    }
  }

  function createLinkElement(url, title, icon = null) {
    const link = document.createElement('a');
    link.className = 'bookmark-link';
    link.href = url;
    link.target = '_blank';
    if (icon) {
      link.innerHTML = `
        <img src="${icon}" class="favicon" alt="图标">
        <span class="link-text">${title || url}</span>
      `;
    } else {
      link.innerHTML = `
        <i class="fas fa-bookmark favicon" style="width:16px; height:16px; display:inline-block; text-align:center;"></i>
        <span class="link-text">${title || url}</span>
      `;
    }
    return link;
  }

  // --- 滚动加载 ---
  function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    if (bodyHeight - scrollPosition < SCROLL_THRESHOLD) {
      if (hasMoreBookmarks && !isLoadingBookmarks) renderBookmarksPage();
      if (hasMoreHistory && !isLoadingHistory) renderHistoryPage();
    }
  }

  // -------------------------- 初始化 --------------------------
  setupGlobalErrorHandler();
  showInfo('正在加载您的书签和历史记录...');
  initializeBookmarks();
  initializeHistory();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('scroll', handleScroll);
  });
});