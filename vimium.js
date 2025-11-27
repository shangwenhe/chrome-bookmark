// vimium.js
document.addEventListener("DOMContentLoaded", () => {
  const hintsContainer = document.getElementById("vimium-hints");
  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchCloseBtn = document.getElementById("search-close");

  let isHintMode = false;
  let currentHints = [];
  let userInput = "";
  let isSearchMode = false;
  let searchResultsList = [];
  let activeSearchIndex = -1;

  // 配置
  const CHAR_SET = "sadjklewcmpgh";
  const HINT_BASE = CHAR_SET.length;
  const HINT_START_INDEX = 13 * 3;

  // 生成提示字符
  const generateHintByIndex = (index) => {
    if (index < 0) return "";
    let hint = "";
    do {
      const charIndex = index % HINT_BASE;
      hint = CHAR_SET[charIndex] + hint;
      index = Math.floor(index / HINT_BASE) - 1;
    } while (index >= 0);
    return hint;
  };

  // 清除提示
  const clearHints = () => {
    hintsContainer.innerHTML = "";
    currentHints = [];
    userInput = "";
    isHintMode = false;
    document.body.style.cursor = "default";
  };

  // 渲染提示
  const renderHints = () => {
    hintsContainer.innerHTML = "";
    const inputLen = userInput.length;

    currentHints.forEach((hintObj) => {
      const hintElement = document.createElement("div");
      hintElement.className = "vimium-hint";
      const dimPart = hintObj.fullHint.substring(0, inputLen);
      const normalPart = hintObj.fullHint.substring(inputLen);
      hintElement.innerHTML = `<span class="dim">${dimPart.toUpperCase()}</span><span>${normalPart.toUpperCase()}</span>`;

      // 重新获取元素位置（避免渲染延迟导致的位置错误）
      const rect = hintObj.element.getBoundingClientRect();
      // 确保提示在可视区域内
      if (rect.width <= 0 || rect.height <= 0) return;

      // 修正提示位置，适配fixed定位的搜索弹窗
      hintElement.style.top = `${rect.top}px`;
      hintElement.style.left = `${rect.left}px`;
      hintElement.style.zIndex = "999999"; // 强制最高层级

      hintsContainer.appendChild(hintElement);
    });
  };

  // 滚动处理
  const handleScroll = (e) => {
    if (
      isHintMode ||
      isSearchMode ||
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA"
    ) {
      return;
    }
    const key = e.key.toLowerCase();
    const scrollStep = window.innerHeight * 0.9;
    if (key === "j") {
      window.scrollBy(0, scrollStep);
      e.preventDefault();
    } else if (key === "k") {
      window.scrollBy(0, -scrollStep);
      e.preventDefault();
    }
  };

  // 检查元素是否真正可见
  const isElementVisible = (element) => {
    if (!element) return false;
    // 检查元素本身是否隐藏
    if (
      element.style.display === "none" ||
      element.style.visibility === "hidden"
    )
      return false;
    // 检查计算样式
    const computedStyle = window.getComputedStyle(element);
    if (
      computedStyle.display === "none" ||
      computedStyle.visibility === "hidden"
    )
      return false;
    // 检查BoundingClientRect
    const rect = element.getBoundingClientRect();
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  };

  // 进入提示模式（支持搜索结果和关闭按钮）
  const enterHintMode = () => {
    if (isHintMode) return;

    isHintMode = true;
    document.body.style.cursor = "crosshair";
    userInput = "";

    // 失焦搜索框
    if (document.activeElement === searchInput) {
      searchInput.blur();
    }

    // 增加延迟，确保搜索弹窗元素完全渲染
    setTimeout(() => {
      let targetElements = [];

      // 优先处理搜索弹窗内的元素（如果搜索模式激活）
      if (isSearchMode) {
        // 单独获取搜索弹窗内的元素，确保优先级
        const searchCloseBtnEl = document.getElementById("search-close");
        const searchResultItems = document.querySelectorAll(
          "#search-results .search-result-item"
        );

        // 先添加关闭按钮（如果可见）
        if (searchCloseBtnEl && isElementVisible(searchCloseBtnEl)) {
          targetElements.push(searchCloseBtnEl);
        }
        // 再添加搜索结果项（过滤不可见的）
        Array.from(searchResultItems).forEach((item) => {
          if (isElementVisible(item)) {
            targetElements.push(item);
          }
        });
      }

      // 补充书签和历史记录元素（非搜索模式时显示）
      if (!targetElements.length) {
        const normalElements = document.querySelectorAll(
          ".bookmark-link, .history-item"
        );
        targetElements = Array.from(normalElements).filter((el) =>
          isElementVisible(el)
        );
      }

      // 生成提示（确保有元素才继续）
      if (targetElements.length === 0) {
        clearHints();
        return;
      }

      currentHints = targetElements.map((link, index) => {
        const fullHint = generateHintByIndex(index + HINT_START_INDEX);
        return { element: link, fullHint: fullHint };
      });

      // 强制渲染提示
      renderHints();
    }, 100);
  };

  // 处理提示输入
  const handleHintInput = (e) => {
    if (!isHintMode) return;
    const key = e.key.toLowerCase();

    // 仅关闭链接提示，不影响搜索弹窗
    if (key === "escape") {
      clearHints();
      e.preventDefault();
      return;
    }

    if (key === "backspace") {
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
    const matchedHints = currentHints.filter((hintObj) => {
      return hintObj.fullHint.startsWith(newInput);
    });

    if (matchedHints.length === 0) {
      e.preventDefault();
      return;
    }

    const exactMatch = matchedHints.find(
      (hintObj) => hintObj.fullHint === newInput
    );
    if (exactMatch) {
      clearHints();
      // 处理不同元素的点击逻辑
      if (exactMatch.element.id === "search-close") {
        // 点击关闭按钮
        exitSearchMode();
      } else if (exactMatch.element.classList.contains("search-result-item")) {
        // 点击搜索结果项
        const url = exactMatch.element.href;
        window.open(url, "_blank");
        exitSearchMode();
      } else {
        // 点击书签/历史记录
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
    searchModal.classList.add("active");
    searchInput.value = "";
    searchResultsList = [];
    activeSearchIndex = -1;
    searchInput.focus();
    renderSearchResults([]);
  };

  // 退出搜索模式
  const exitSearchMode = () => {
    if (!isSearchMode) return;

    isSearchMode = false;
    searchModal.classList.remove("active");
    searchInput.blur();
    searchResultsList = [];
    activeSearchIndex = -1;
    clearHints();
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
      .filter((item) => item.type !== "folder" && item.url)
      .map((item) => {
        const title = (item.title || "").toLowerCase();
        const url = item.url.toLowerCase();
        const folder = (item.folderPath || "").toLowerCase();

        // 分割关键词并过滤空值
        const keywords = lowerQuery
          .trim()
          .split(/\s+/)
          .filter((keyword) => keyword.length > 0);

        if (keywords.length === 0) {
          return { ...item, type: "bookmark", matchScore: 0 };
        }

        // 计算匹配分数（匹配的关键词数量 + 匹配位置权重）
        let matchScore = 0;
        keywords.forEach((keyword) => {
          const inTitle = title.includes(keyword) ? 3 : 0; // 标题匹配权重最高
          const inUrl = url.includes(keyword) ? 2 : 0; // URL匹配权重次之
          const inFolder = folder.includes(keyword) ? 1 : 0; // 文件夹匹配权重最低

          if (inTitle + inUrl + inFolder > 0) {
            matchScore += inTitle + inUrl + inFolder;
          }
        });

        return { ...item, type: "bookmark", matchScore };
      })
      .filter((item) => item.matchScore > 0) // 过滤无匹配的结果
      .sort((a, b) => b.matchScore - a.matchScore); // 按匹配度排序（高匹配度在前）

    const matchedHistory = history
      .filter((item) => item.url)
      .filter((item) => {
        const title = (item.title || "").toLowerCase();
        const url = item.url.toLowerCase();
        return title.includes(lowerQuery) || url.includes(lowerQuery);
      })
      .map((item) => ({
        ...item,
        type: "history",
      }));

    searchResultsList = [...matchedBookmarks, ...matchedHistory];
    renderSearchResults(searchResultsList);
  };

  // 渲染搜索结果
  const renderSearchResults = async (results) => {
    searchResults.innerHTML = "";

    if (results.length === 0) {
      const noResults = document.createElement("div");
      noResults.className = "search-no-results";
      noResults.textContent = searchInput.value
        ? "未找到匹配的结果"
        : "请输入关键词搜索书签或历史记录";
      searchResults.appendChild(noResults);
      return;
    }

    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      const resultItem = document.createElement("a");
      resultItem.className = `search-result-item ${
        i === activeSearchIndex ? "active" : ""
      }`;
      resultItem.href = item.url;
      resultItem.target = "_blank";

      let faviconHtml = "";
      try {
        await window.searchData.getFaviconUrl(item.url);
        faviconHtml = `<i class="fas fa-${
          item.type === "bookmark" ? "bookmark" : "clock"
        } favicon" style="width:16px; height:16px; display:inline-block; text-align:center;"></i>`;
      } catch (e) {
        faviconHtml = `<i class="fas fa-${
          item.type === "bookmark" ? "bookmark" : "clock"
        } favicon" style="width:16px; height:16px; display:inline-block; text-align:center;"></i>`;
      }

      resultItem.innerHTML = `
        ${faviconHtml}
        <span class="result-text">${item.title || item.url}</span>
        <span class="result-type">${
          item.type === "bookmark" ? "书签" : "历史记录"
        }</span>
      `;

      resultItem.addEventListener("click", () => {
        exitSearchMode();
      });

      resultItem.addEventListener("mouseenter", () => {
        activeSearchIndex = i;
        updateActiveSearchItem();
      });

      searchResults.appendChild(resultItem);
    }
  };

  // 更新激活的搜索项
  const updateActiveSearchItem = () => {
    const items = searchResults.querySelectorAll(".search-result-item");
    items.forEach((item, index) => {
      if (index === activeSearchIndex) {
        item.classList.add("active");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        item.classList.remove("active");
      }
    });
  };

  // 处理搜索键盘输入
  const handleSearchInput = (e) => {
    if (!isSearchMode) return;

    switch (e.key) {
      case "Escape":
        searchInput.blur();
        e.preventDefault();
        break;
      case "Enter":
        // if (activeSearchIndex >= 0 && searchResultsList.length > 0) {
        //   const activeItem = searchResults.querySelector('.search-result-item.active');
        //   if (activeItem) {
        //     activeItem.click();
        //   }
        // }
        e.preventDefault();
        break;
      case "ArrowUp":
        e.preventDefault();
        activeSearchIndex = Math.max(0, activeSearchIndex - 1);
        updateActiveSearchItem();
        break;
      case "ArrowDown":
        e.preventDefault();
        activeSearchIndex = Math.min(
          searchResultsList.length - 1,
          activeSearchIndex + 1
        );
        updateActiveSearchItem();
        break;
      // 移除对F键的拦截，允许正常输入
      default:
        clearTimeout(window.searchDebounce);
        window.searchDebounce = setTimeout(() => {
          searchItems(searchInput.value);
        }, 100);
        break;
    }
  };

  // 搜索事件绑定
  searchInput.addEventListener("input", () => {
    searchItems(searchInput.value);
  });

  // 关闭按钮点击事件
  searchCloseBtn.addEventListener("click", exitSearchMode);

  // 全局键盘事件（核心修复：搜索框聚焦时允许输入f）
  document.addEventListener("keydown", (e) => {
    // 跳过功能键/修饰键
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    const isSearchInputFocused = document.activeElement === searchInput;
    const key = e.key.toLowerCase();

    // 提示模式优先处理
    if (isHintMode) {
      handleHintInput(e);
      return;
    }

    // 🔥 核心修复：搜索框聚焦时，允许正常输入所有字符（包括f）
    if (isSearchInputFocused) {
      // 仅处理方向键/回车/ESC等功能键，不拦截普通字符输入
      if (["arrowup", "arrowdown", "enter", "escape"].includes(key)) {
        handleSearchInput(e);
      }
      // 搜索框聚焦时，按F键+修饰键（如Shift+F）才触发提示模式（可选）
      // 纯F键允许正常输入
      return;
    }

    // 搜索模式下（输入框未聚焦）
    if (isSearchMode) {
      handleSearchInput(e);
      // 输入框未聚焦时，按F键触发提示模式
      if (key === "f") {
        enterHintMode();
        e.preventDefault();
        return;
      }
    }

    // 普通模式下的操作
    handleScroll(e);
    if (key === "f") {
      enterHintMode();
      e.preventDefault();
    } else if (key === "/") {
      enterSearchMode();
      e.preventDefault();
    }
  });

  // 滚动时关闭提示
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (isHintMode) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        clearHints();
      }, 500);
    }
  });

  console.log(
    "Vimium 功能已加载。按 'f' 打开链接提示，按 'j/k' 上下滚动，按 '/' 打开搜索。"
  );
});
