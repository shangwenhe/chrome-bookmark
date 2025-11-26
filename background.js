// background.js

/**
 * 通过 Google Favicon 服务获取图标并转换为 Base64
 * @param {string} url - 目标网址
 * @returns {Promise<string>} - 解析为 Base64 字符串的 Promise
 */
function fetchFaviconAsBase64(url) {
  return new Promise((resolve, reject) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      if (!hostname) {
        throw new Error("无效的 URL");
      }

      // 使用 Google 的 Favicon 服务
      const faviconUrl = `https://www.favicon.vip/get.php?url=${hostname}`;
      // 后台脚本可以不受限制地发起 fetch 请求
      fetch(faviconUrl)
        .then(response => {
          if (!response.ok) {
            // 如果 Google 服务返回错误，我们视为没有找到图标
            throw new Error(`无法找到 Favicon (HTTP ${response.status})`);
          }
          return response.blob();
        })
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // reader.result 是 Base64 字符串
          reader.onerror = () => reject(new Error('无法读取图片 Blob'));
          reader.readAsDataURL(blob);
        })
        .catch(error => {
          console.warn(`获取 Favicon 失败 for ${url}:`, error);
          reject(error);
        });

    } catch (error) {
      console.warn(`解析 URL 失败 for favicon: ${url}`);
      reject(error);
    }
  });
}

// 监听来自前端页面的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 如果收到的是获取 Favicon 的请求
  if (request.action === 'fetchFavicon') {
    fetchFaviconAsBase64(request.url)
      .then(base64 => {
        // 成功时，发送带有 Base64 字符串的响应
        sendResponse({ success: true, base64: base64 });
      })
      .catch(error => {
        // 失败时，发送带有错误信息的响应
        sendResponse({ success: false, error: error.message });
      });

    // 重要：由于我们是异步发送响应，必须返回 true
    return true;
  }
});

console.log("后台服务工作线程已启动。");