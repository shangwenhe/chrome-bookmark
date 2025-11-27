#!/bin/bash

# 定义需要读取的文件列表
files=(
    "index.html"
    "manifest.json"
    "script.js"
    "style.css"
    "vimium.js"
)

# 遍历文件列表
for file in "${files[@]}"; do
    # 检查文件是否存在且可读
    if [ -f "$file" ] && [ -r "$file" ]; then
        # 输出文件名分隔符（便于区分）
        echo "========================================"
        echo "📄 文件名称: $file"
        echo "========================================"
        echo "\`\`\`$file\n"
        # 输出文件内容
        cat "$file"
        # 输出空行分隔不同文件

        echo "\n\`\`\`"
        echo "\n\n"
    else
        # 文件不存在或不可读时提示
        echo "========================================"
        echo "❌ 错误: 文件 '$file' 不存在或不可读取"
        echo "========================================"
        echo "\n\n"
    fi
done