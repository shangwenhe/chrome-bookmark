// vimium.js

document.addEventListener('DOMContentLoaded', () => {
  const hintsContainer = document.getElementById('vimium-hints');

  let isHintMode = false;
  let currentHints = []; // { element, fullHint }
  let userInput = '';

  // --- 配置 ---
  const CHAR_SET = 'abcdefghijklmnopqrstuvwxyz';
  const HINT_BASE = CHAR_SET.length;
  const HINT_START_INDEX = 26; // 从索引26开始，即 'aa'

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
    if (isHintMode || document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
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

  document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
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
    
    handleScroll(e);

    if (key === 'f') {
      enterHintMode();
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

  console.log('Vimium 功能已加载。按 \'f\' 打开链接提示，按 \'j/k\' 上下滚动。');
});