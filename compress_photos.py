#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
压缩 public/photos/ 下的所有 JPEG 照片：
- 最长边缩放到 1600px（保留细节，适合网页画廊）
- JPEG 质量 80
- 直接覆盖原文件（文件名不变，photos.js 引用保持一致）
"""
import os
import glob
from PIL import Image

SRC_DIR = r"C:\Users\willi\WorkBuddy\2026-09-02-21-24-02\portfolio\public\photos"
MAX_DIM = 1600
QUALITY = 80

total_before = 0
total_after = 0
for f in glob.glob(os.path.join(SRC_DIR, "*.jpg")):
    im = Image.open(f)
    if im.mode != "RGB":
        im = im.convert("RGB")
    w, h = im.size
    if max(w, h) > MAX_DIM:
        if w >= h:
            nw, nh = MAX_DIM, int(h * MAX_DIM / w)
        else:
            nw, nh = int(w * MAX_DIM / h), MAX_DIM
        im = im.resize((nw, nh), Image.LANCZOS)
    before = os.path.getsize(f)
    im.save(f, "JPEG", quality=QUALITY, optimize=True)
    after = os.path.getsize(f)
    total_before += before
    total_after += after
    print(f"  {os.path.basename(f)}: {w}x{h} -> {im.size[0]}x{im.size[1]}, "
          f"{before//1024}KB -> {after//1024}KB")

print(f"\n总计：{total_before//1024//1024}MB -> {total_after//1024//1024}MB")