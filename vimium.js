// vimium.js

document.addEventListener('DOMContentLoaded', () => {
  const hintsContainer = document.getElementById('vimium-hints');

  let isHintMode = false;
  let currentHints = [];

  // --- 新的基于计数的提示生成逻辑 ---

  // 字符集，建议使用易于区分和输入的字符
  // 你可以调整字符的顺序，把更易于输入的放在前面
  const CHAR_SET = 'abcdefghijklmnopqrstuvwxyz';
  const HINT_BASE = CHAR_SET.length; // 进制数，这里是26进制

  /**
   * 将数字索引转换为对应的提示字符串 (如 0 -> 'a', 26 -> 'aa')
   * @param {number} index - 链接的索引 (从0开始)
   * @returns {string} 生成的提示字符
   */
  const generateHintByIndex = (index) => {
    if (index < 0) return '';
    
    let hint = '';
    do {
      // 取余得到当前位的字符索引
      const charIndex = index % HINT_BASE;
      // 将字符插入到结果的最前面
      hint = CHAR_SET[charIndex] + hint;
      // 整除进入下一位
      index = Math.floor(index / HINT_BASE) - 1; // -1 是为了让 'a' 对应 0, 'aa' 对应 26
    } while (index >= 0);

    return hint;
  };
  
  // --- 逻辑修改结束 ---

  const clearHints = () => {
    hintsContainer.innerHTML = '';
    currentHints = [];
    isHintMode = false;
    document.body.style.cursor = 'default';
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

    setTimeout(() => {
      const links = document.querySelectorAll('a[href]:not(.bookmark-folder-title):not([href="#"])');
      
      if (links.length === 0) {
        clearHints();
        return;
      }

      // --- 使用新的基于计数的生成函数 ---
      links.forEach((link, index) => {
        try {
          const rect = link.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 &&
              rect.bottom > 0 && rect.top < window.innerHeight) {
            
            // 直接使用链接的索引来生成提示字符
            const hintText = generateHintByIndex(index+30);
            
            const hintElement = document.createElement('div');
            hintElement.className = 'vimium-hint';
            hintElement.textContent = hintText;
            hintElement.style.top = `${rect.top + window.scrollY + 2}px`;
            hintElement.style.left = `${rect.left + window.scrollX + 2}px`;

            hintsContainer.appendChild(hintElement);
            currentHints.push({
              hint: hintText,
              element: link
            });
          }
        } catch (e) {
          console.error("Error creating hint for link:", link, e);
        }
      });

      if (currentHints.length === 0) {
        clearHints();
      }

    }, 0);
  };

  // handleHintInput 和其他函数保持不变
  const handleHintInput = (e) => {
    if (!isHintMode) return;
    const key = e.key.toLowerCase();
    if (key === 'escape') {
      clearHints();
      e.preventDefault();
      return;
    }
    if (e.key.length > 1 && !['backspace', 'delete'].includes(key)) {
      return;
    }

    let newHints = [];
    let exactMatch = null;

    if (key === 'backspace' || key === 'delete') {
        clearHints();
        setTimeout(enterHintMode, 0);
        e.preventDefault();
        return;
    }

    currentHints.forEach(hintObj => {
      if (hintObj.hint.startsWith(key)) {
        const newHint = hintObj.hint.substring(key.length);
        if (newHint === '') {
          exactMatch = hintObj;
        } else {
          newHints.push({ ...hintObj, hint: newHint });
        }
      }
    });

    if (exactMatch) {
      clearHints();
      exactMatch.element.click();
      e.preventDefault();
    } else if (newHints.length > 0) {
      hintsContainer.innerHTML = '';
      newHints.forEach(hintObj => {
        const hintElement = document.createElement('div');
        hintElement.className = 'vimium-hint';
        hintElement.textContent = hintObj.hint;
        const rect = hintObj.element.getBoundingClientRect();
        hintElement.style.top = `${rect.top + window.scrollY + 2}px`;
        hintElement.style.left = `${rect.left + window.scrollX + 2}px`;
        hintsContainer.appendChild(hintElement);
      });
      currentHints = newHints;
      e.preventDefault();
    } else {
      clearHints();
      e.preventDefault();
    }
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
  
  window.addEventListener('scroll', () => {
    if (isHintMode) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        clearHints();
      }, 500);
    }
  });

  console.log('Vimium 功能已加载。按 \'f\' 打开链接提示，按 \'j/k\' 上下滚动。提示字符现在基于链接位置。');
});