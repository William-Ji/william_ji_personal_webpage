#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
照片一键导入脚本（无需第三方库，Python 标准库即可运行）

用法：
    python import_photos.py "D:\\我的照片\\作品集"

功能：
    1. 递归扫描目标文件夹里的图片（jpg/jpeg/png/webp/gif/bmp）
    2. 复制到 public/photos/ 目录（Vite 会原样拷贝到构建产物）
    3. 若图片位于一级子文件夹内，自动用「子文件夹名」作为分类（如 手表微距 / 荷花风景）
    4. 生成 src/photos.js（React 组件直接 import）

提示：分类依赖子文件夹名，建议你的照片按类别分文件夹存放，例如：
    D:\\我的照片\\作品集\\手表微距\\*.jpg
    D:\\我的照片\\作品集\\荷花风景\\*.jpg
"""

import os
import sys
import shutil
import json

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(ROOT, "public", "photos")
DATA_FILE = os.path.join(ROOT, "src", "photos.js")

EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"}


def main():
    if len(sys.argv) < 2:
        print("请提供照片文件夹路径，例如：")
        print('  python import_photos.py "D:\\我的照片\\作品集"')
        sys.exit(1)

    src = sys.argv[1]
    if not os.path.isdir(src):
        print(f"路径不存在：{src}")
        sys.exit(1)

    # 收集图片
    images = []
    for dirpath, dirnames, filenames in os.walk(src):
        for fn in sorted(filenames):
            if os.path.splitext(fn)[1].lower() in EXTS:
                full = os.path.join(dirpath, fn)
                rel = os.path.relpath(dirpath, src)
                category = rel.split(os.sep)[0] if rel != "." else "生活随拍"
                images.append((full, category, fn))

    if not images:
        print("未找到任何图片文件。")
        sys.exit(1)

    os.makedirs(OUT_DIR, exist_ok=True)

    entries = []
    used = set()
    for full, category, fn in images:
        ext = os.path.splitext(fn)[1].lower()
        base = os.path.splitext(fn)[0]
        name = base
        k = 2
        while name.lower() in used:
            name = f"{base}_{k}"
            k += 1
        used.add(name.lower())
        out_name = f"{name}{ext}"
        shutil.copy2(full, os.path.join(OUT_DIR, out_name))
        entries.append({
            "title": base,
            "category": category,
            "src": f"photos/{out_name}",
        })

    payload = json.dumps(entries, ensure_ascii=False, indent=2)

    header = (
        "// 由 import_photos.py 自动生成，请勿手动修改\n"
        "// src 使用相对路径，指向 public/photos/ 下的文件\n"
        "export const photos = "
    )
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(header + payload + "\n")

    cats = sorted({e["category"] for e in entries})
    print(f"✅ 已导入 {len(entries)} 张照片 -> {OUT_DIR}")
    print(f"   分类：{', '.join(cats)}")
    print(f"   数据文件：{DATA_FILE}")
    print("   运行 npm run dev 刷新网页即可看到真实照片。")


if __name__ == "__main__":
    main()
