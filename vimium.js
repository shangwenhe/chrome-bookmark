// vimium.js
document.addEventListener('DOMContentLoaded', () => {
  const hintsContainer = document.getElementById('vimium-hints');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchCloseBtn = document.getElementById('search-close');

  let isHintMode = false;
  let currentHints = [];
  let userInput = '';
  let isSearchMode = false;
  let searchResultsList = [];
  let activeSearchIndex = -1;

  // 配置
  const CHAR_SET = 'sadjklewcmpgh';
  const HINT_BASE = CHAR_SET.length;
  const HINT_START_INDEX = 13*3;

  // 生成提示字符
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

  // 清除提示
  const clearHints = () => {
    hintsContainer.innerHTML = '';
    currentHints = [];
    userInput = '';
    isHintMode = false;
    document.body.style.cursor = 'default';
  };

  // 渲染提示
  const renderHints = () => {
    hintsContainer.innerHTML = '';
    const inputLen = userInput.length;

    currentHints.forEach(hintObj => {
      const hintElement = document.createElement('div');
      hintElement.className = 'vimium-hint';
      const dimPart = hintObj.fullHint.substring(0, inputLen);
      const normalPart = hintObj.fullHint.substring(inputLen);
      hintElement.innerHTML = `<span class="dim">${dimPart.toUpperCase()}</span><span>${normalPart.toUpperCase()}</span>`;

      const rect = hintObj.element.getBoundingClientRect();
      hintElement.style.top = `${rect.top }px`;
      hintElement.style.left = `${rect.left}px`;

      hintsContainer.appendChild(hintElement);
    });
  };

  // 滚动处理
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

  // 进入提示模式（支持搜索结果）
  const enterHintMode = () => {
    if (isHintMode) return;

    isHintMode = true;
    document.body.style.cursor = 'crosshair';
    userInput = '';

    // 失焦搜索框（关键修复1）
    if (document.activeElement === searchInput) {
      searchInput.blur();
    }

    setTimeout(() => {
      // 选择器包含搜索结果中的所有链接（关键修复2）
      const links = document.querySelectorAll(
        '#search-results .search-result-item, .bookmark-link, .history-item'
      );

      if (links.length === 0) {
        clearHints();
        return;
      }

      currentHints = Array.from(links).map((link, index) => {
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

  // 处理提示输入
  const handleHintInput = (e) => {
    if (!isHintMode) return;
    const key = e.key.toLowerCase();

    // 仅关闭链接提示，不影响搜索弹窗
    if (key === 'escape') {
      clearHints();
      e.preventDefault();
      return;
    }

    if (key === 'backspace') {
      if (userInput.length > 0) {
        userInput = userInput.slice(0, -1);
        renderHints();
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
    const matchedHints = currentHints.filter(hintObj => {
      return hintObj.fullHint.startsWith(newInput);
    });

    if (matchedHints.length === 0) {
      e.preventDefault();
      return;
    }

    const exactMatch = matchedHints.find(hintObj => hintObj.fullHint === newInput);
    if (exactMatch) {
      clearHints();
      // 处理搜索结果项的点击（关键修复3）
      if (exactMatch.element.classList.contains('search-result-item')) {
        const url = exactMatch.element.href;
        window.open(url, '_blank');
        exitSearchMode();
      } else {
        exactMatch.element.click();
      }
      e.preventDefault();
      return;
    }

    userInput = newInput;
    currentHints = matchedHints;
    renderHints();

    e.preventDefault();
  };

  // 进入搜索模式
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

  // 退出搜索模式
  const exitSearchMode = () => {
    if (!isSearchMode) return;
    
    isSearchMode = false;
    searchModal.classList.remove('active');
    searchInput.blur();
    searchResultsList = [];
    activeSearchIndex = -1;
  };

  // 搜索书签和历史记录
  const searchItems = (query) => {
    if (!query) {
      searchResultsList = [];
      renderSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const bookmarks = window.searchData?.getBookmarks() || [];
    const history = window.searchData?.getHistory() || [];

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

    searchResultsList = [...matchedBookmarks, ...matchedHistory];
    renderSearchResults(searchResultsList);
  };

  // 渲染搜索结果
  const renderSearchResults = async (results) => {
    searchResults.innerHTML = '';

    if (results.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'search-no-results';
      noResults.textContent = searchInput.value ? '未找到匹配的结果' : '请输入关键词搜索书签或历史记录';
      searchResults.appendChild(noResults);
      return;
    }

    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      const resultItem = document.createElement('a');
      resultItem.className = `search-result-item ${i === activeSearchIndex ? 'active' : ''}`;
      resultItem.href = item.url;
      resultItem.target = '_blank';
      
      let faviconHtml = '';
      try {
        await window.searchData.getFaviconUrl(item.url);
        faviconHtml = `<i class="fas fa-${item.type === 'bookmark' ? 'bookmark' : 'clock'} favicon" style="width:16px; height:16px; display:inline-block; text-align:center;"></i>`;
      } catch (e) {
        faviconHtml = `<i class="fas fa-${item.type === 'bookmark' ? 'bookmark' : 'clock'} favicon" style="width:16px; height:16px; display:inline-block; text-align:center;"></i>`;
      }

      resultItem.innerHTML = `
        ${faviconHtml}
        <span class="result-text">${item.title || item.url}</span>
        <span class="result-type">${item.type === 'bookmark' ? '书签' : '历史记录'}</span>
      `;

      resultItem.addEventListener('click', () => {
        exitSearchMode();
      });

      resultItem.addEventListener('mouseenter', () => {
        activeSearchIndex = i;
        updateActiveSearchItem();
      });

      searchResults.appendChild(resultItem);
    }
  };

  // 更新激活的搜索项
  const updateActiveSearchItem = () => {
    const items = searchResults.querySelectorAll('.search-result-item');
    items.forEach((item, index) => {
      if (index === activeSearchIndex) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('active');
      }
    });
  };

  // 处理搜索键盘输入（修复ESC失焦）
  const handleSearchInput = (e) => {
    if (!isSearchMode) return;

    switch (e.key) {
      // 关键修复4：ESC仅失焦输入框，不关闭弹窗
      case 'Escape':
        searchInput.blur();
        e.preventDefault();
        break;
      case 'Enter':
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

  // 仅保留点击关闭按钮和点击外部关闭
  searchCloseBtn.addEventListener('click', exitSearchMode);
  // searchModal.addEventListener('click', (e) => {
  //   if (e.target === searchModal) {
  //     exitSearchMode();
  //   }
  // });

  // 全局键盘事件（核心修复）
  document.addEventListener('keydown', (e) => {
    const isSearchInputFocused = document.activeElement === searchInput;
    
    // 输入框聚焦时的处理逻辑
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
      if (isSearchMode) {
        handleSearchInput(e);
      }
      // 关键修复5：输入框聚焦时按F键，先失焦再触发提示模式
      if (e.key.toLowerCase() === 'f' && isSearchMode) {
        searchInput.blur();
        enterHintMode();
        e.preventDefault();
        return;
      }
      return;
    }
    
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    const key = e.key.toLowerCase();

    if (isHintMode) {
      handleHintInput(e);
      return;
    }

    if (isSearchMode) {
      handleSearchInput(e);
      return;
    }

    handleScroll(e);

    if (key === 'f') {
      enterHintMode();
      e.preventDefault();
    } else if (key === '/') {
      enterSearchMode();
      e.preventDefault();
    }
  });

  // 点击空白处关闭提示
  // document.addEventListener('click', (e) => {
  //   if (isHintMode && (e.target === document.body || e.target.classList.contains('site-container') || e.target.classList.contains('flex-container') || e.target.classList.contains('content-container'))) {
  //     clearHints();
  //   }
  // });

  // 滚动时关闭提示
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