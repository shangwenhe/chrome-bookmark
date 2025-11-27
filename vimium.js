// vimium.js
document.addEventListener('DOMContentLoaded', () => {
  const hintsContainer = document.getElementById('vimium-hints');
  // 新增：搜索相关DOM元素
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchCloseBtn = document.getElementById('search-close');

  let isHintMode = false;
  let currentHints = []; // { element, fullHint }
  let userInput = '';
  // 新增：搜索状态变量
  let isSearchMode = false;
  let searchResultsList = [];
  let activeSearchIndex = -1;

  // --- 配置 ---
  const CHAR_SET = 'sadjklewcmpgh';
  const HINT_BASE = CHAR_SET.length;
  const HINT_START_INDEX = 13*3; // 从索引26开始，即 'aa'

  /**
   * 将数字索引转换为对应的提示字符串 (如 26 -> 'aa')
   * @param {number} index - 链接的索引 (从0开始)
   * @returns {string} 生成的小写提示字符
   */
  const generateHintByIndex = (index) => {
    if (index < 0) return '';
    let hint = '';
    do {
      const charIndex = index % HINT_BASE;
      hint = CHAR_SET[charIndex] + hint;
      index = Math.floor(index / HINT_BASE) - 1;
    } while (index >= 0);
    return hint;
  };

  const clearHints = () => {
    hintsContainer.innerHTML = '';
    currentHints = [];
    userInput = '';
    isHintMode = false;
    document.body.style.cursor = 'default';
  };

  /**
   * 根据 currentHints 和 userInput 重新渲染所有提示
   * 已输入的部分会被灰度处理
   */
  const renderHints = () => {
    hintsContainer.innerHTML = '';
    const inputLen = userInput.length;

    currentHints.forEach(hintObj => {
      const hintElement = document.createElement('div');
      hintElement.className = 'vimium-hint';

      // 已输入的部分
      const dimPart = hintObj.fullHint.substring(0, inputLen);
      // 未输入的部分
      const normalPart = hintObj.fullHint.substring(inputLen);

      // 设置HTML内容，实现灰度效果，并转为大写
      hintElement.innerHTML = `<span class="dim">${dimPart.toUpperCase()}</span><span>${normalPart.toUpperCase()}</span>`;

      const rect = hintObj.element.getBoundingClientRect();
      hintElement.style.top = `${rect.top }px`;
      hintElement.style.left = `${rect.left}px`;

      hintsContainer.appendChild(hintElement);
    });
  };

  const handleScroll = (e) => {
    if (isHintMode || isSearchMode || document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      return;
    }
    const key = e.key.toLowerCase();
    const scrollStep = window.innerHeight * 0.9;
    if (key === 'j') {
      window.scrollBy(0, scrollStep);
      e.preventDefault();
    } else if (key === 'k') {
      window.scrollBy(0, -scrollStep);
      e.preventDefault();
    }
  };

  const enterHintMode = () => {
    if (isHintMode) return;

    isHintMode = true;
    document.body.style.cursor = 'crosshair';
    userInput = '';

    setTimeout(() => {
      // 调整选择器：包含搜索结果中的链接
      const links = document.querySelectorAll('a[href]:not(.bookmark-folder-title):not([href="#"])');

      if (links.length === 0) {
        clearHints();
        return;
      }

      currentHints = Array.from(links).map((link, index) => {
        // 应用你的修改：index + HINT_START_INDEX
        const fullHint = generateHintByIndex(index + HINT_START_INDEX);
        return { element: link, fullHint: fullHint };
      }).filter(hintObj => {
        try {
          const rect = hintObj.element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
        } catch (e) {
          return false;
        }
      });

      renderHints();

      if (currentHints.length === 0) {
        clearHints();
      }

    }, 0);
  };

  const handleHintInput = (e) => {
    if (!isHintMode) return;
    const key = e.key.toLowerCase();

    if (key === 'escape') {
      clearHints();
      e.preventDefault();
      return;
    }

    if (key === 'backspace') {
      if (userInput.length > 0) {
        userInput = userInput.slice(0, -1);
        renderHints(); // 直接重新渲染即可，因为 currentHints 没变
      } else {
        clearHints();
      }
      e.preventDefault();
      return;
    }

    if (e.key.length > 1) {
      return;
    }

    const newInput = userInput + key;

    // 过滤出匹配新输入的提示
    const matchedHints = currentHints.filter(hintObj => {
      return hintObj.fullHint.startsWith(newInput);
    });

    // 如果没有匹配项，不更新
    if (matchedHints.length === 0) {
      e.preventDefault();
      return;
    }

    // 检查是否有完全匹配
    const exactMatch = matchedHints.find(hintObj => hintObj.fullHint === newInput);
    if (exactMatch) {
      clearHints();
      exactMatch.element.click();
      e.preventDefault();
      return;
    }

    // 更新输入并重新渲染
    userInput = newInput;
    currentHints = matchedHints; // 只保留匹配的提示
    renderHints();

    e.preventDefault();
  };

  // -------------------------- 新增：搜索功能 --------------------------
  /**
   * 进入搜索模式
   */
  const enterSearchMode = () => {
    if (isSearchMode || isHintMode) return;
    
    isSearchMode = true;
    searchModal.classList.add('active');
    searchInput.value = '';
    searchResultsList = [];
    activeSearchIndex = -1;
    searchInput.focus();
    renderSearchResults([]);
  };

  /**
   * 退出搜索模式
   */
  const exitSearchMode = () => {
    if (!isSearchMode) return;
    
    isSearchMode = false;
    searchModal.classList.remove('active');
    searchInput.blur();
    searchResultsList = [];
    activeSearchIndex = -1;
  };

  /**
   * 搜索书签和历史记录
   * @param {string} query 搜索关键词
   */
  const searchItems = (query) => {
    if (!query) {
      searchResultsList = [];
      renderSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const bookmarks = window.searchData?.getBookmarks() || [];
    const history = window.searchData?.getHistory() || [];

    // 过滤书签（排除文件夹类型）
    const matchedBookmarks = bookmarks
      .filter(item => item.type !== 'folder' && item.url)
      .filter(item => {
        const title = (item.title || '').toLowerCase();
        const url = item.url.toLowerCase();
        const folder = (item.folderPath || '').toLowerCase();
        return title.includes(lowerQuery) || url.includes(lowerQuery) || folder.includes(lowerQuery);
      })
      .map(item => ({
        ...item,
        type: 'bookmark'
      }));

    // 过滤历史记录
    const matchedHistory = history
      .filter(item => item.url)
      .filter(item => {
        const title = (item.title || '').toLowerCase();
        const url = item.url.toLowerCase();
        return title.includes(lowerQuery) || url.includes(lowerQuery);
      })
      .map(item => ({
        ...item,
        type: 'history'
      }));

    // 合并结果（书签在前，历史记录在后）
    searchResultsList = [...matchedBookmarks, ...matchedHistory];
    renderSearchResults(searchResultsList);
  };

  /**
   * 渲染搜索结果
   * @param {Array} results 搜索结果列表
   */
  const renderSearchResults = async (results) => {
    searchResults.innerHTML = '';

    if (results.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'search-no-results';
      noResults.textContent = searchInput.value ? '未找到匹配的结果' : '请输入关键词搜索书签或历史记录';
      searchResults.appendChild(noResults);
      return;
    }

    // 批量渲染结果项
    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      const resultItem = document.createElement('a');
      resultItem.className = `search-result-item ${i === activeSearchIndex ? 'active' : ''}`;
      resultItem.href = item.url;
      resultItem.target = '_blank';
      
      // 处理Favicon
      let faviconHtml = '';
      try {
        await window.searchData.getFaviconUrl(item.url);
        faviconHtml = `<i class="fas fa-${item.type === 'bookmark' ? 'bookmark' : 'clock'} favicon" style="width:16px; height:16px; display:inline-block; text-align:center;"></i>`;
      } catch (e) {
        faviconHtml = `<i class="fas fa-${item.type === 'bookmark' ? 'bookmark' : 'clock'} favicon" style="width:16px; height:16px; display:inline-block; text-align:center;"></i>`;
      }

      // 构建结果项HTML
      resultItem.innerHTML = `
        ${faviconHtml}
        <span class="result-text">${item.title || item.url}</span>
        <span class="result-type">${item.type === 'bookmark' ? '书签' : '历史记录'}</span>
      `;

      // 点击事件
      resultItem.addEventListener('click', () => {
        exitSearchMode();
      });

      // 鼠标悬停事件
      resultItem.addEventListener('mouseenter', () => {
        activeSearchIndex = i;
        updateActiveSearchItem();
      });

      searchResults.appendChild(resultItem);
    }
  };

  /**
   * 更新激活的搜索项样式
   */
  const updateActiveSearchItem = () => {
    const items = searchResults.querySelectorAll('.search-result-item');
    items.forEach((item, index) => {
      if (index === activeSearchIndex) {
        item.classList.add('active');
        // 滚动到可视区域
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('active');
      }
    });
  };

  /**
   * 处理搜索键盘输入
   * @param {KeyboardEvent} e 键盘事件
   */
  const handleSearchInput = (e) => {
    if (!isSearchMode) return;

    switch (e.key) {
      // 移除ESC关闭搜索的逻辑
      case 'Enter':
        if (activeSearchIndex >= 0 && activeSearchIndex < searchResultsList.length) {
          const activeItem = searchResultsList[activeSearchIndex];
          window.open(activeItem.url, '_blank');
          exitSearchMode();
        }
        e.preventDefault();
        break;
      case 'ArrowUp':
        e.preventDefault();
        activeSearchIndex = Math.max(0, activeSearchIndex - 1);
        updateActiveSearchItem();
        break;
      case 'ArrowDown':
        e.preventDefault();
        activeSearchIndex = Math.min(searchResultsList.length - 1, activeSearchIndex + 1);
        updateActiveSearchItem();
        break;
      default:
        // 普通输入，延迟搜索（防抖）
        clearTimeout(window.searchDebounce);
        window.searchDebounce = setTimeout(() => {
          searchItems(searchInput.value);
        }, 100);
        break;
    }
  };

  // 搜索事件绑定
  searchInput.addEventListener('input', () => {
    searchItems(searchInput.value);
  });

  searchCloseBtn.addEventListener('click', exitSearchMode);

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      exitSearchMode();
    }
  });

  // -------------------------- 全局键盘事件 --------------------------
  document.addEventListener('keydown', (e) => {
    // 判断是否是搜索输入框且处于聚焦状态
    const isSearchInputFocused = document.activeElement === searchInput;
    
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      // 如果是搜索输入框，处理搜索键盘事件
      if (isSearchMode) {
        handleSearchInput(e);
      }
      // 输入框聚焦时，按F键不触发链接提示
      return;
    }
    
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    const key = e.key.toLowerCase();

    // 优先处理提示模式
    if (isHintMode) {
      handleHintInput(e);
      return;
    }

    // 处理搜索模式
    if (isSearchMode) {
      handleSearchInput(e);
      return;
    }

    // 常规按键处理
    handleScroll(e);

    if (key === 'f') {
      enterHintMode();
      e.preventDefault();
    } else if (key === '/') { // 新增：按 / 进入搜索
      enterSearchMode();
      e.preventDefault();
    }
  });

  document.addEventListener('click', (e) => {
    if (isHintMode && (e.target === document.body || e.target.classList.contains('site-container') || e.target.classList.contains('flex-container') || e.target.classList.contains('content-container'))) {
      clearHints();
    }
  });

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (isHintMode) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        clearHints();
      }, 500);
    }
  });

  console.log('Vimium 功能已加载。按 \'f\' 打开链接提示，按 \'j/k\' 上下滚动，按 \'/\' 打开搜索。');
});