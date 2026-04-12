import os
import json

# 设置 notes 文件夹路径
notes_dir = "notes"
# 设置输出文件路径
output_file = "notes_list.json"

# 存储笔记信息
notes = []

# 检查 notes 文件夹是否存在
if os.path.exists(notes_dir):
    # 遍历 notes 文件夹
    for filename in os.listdir(notes_dir):
        if filename.endswith(".md"):
            # 提取文件名（不含扩展名）作为标题
            title = filename[:-3]
            # 构建文件路径
            file_path = os.path.join(notes_dir, filename)
            # 获取文件修改时间，用于排序
            mod_time = os.path.getmtime(file_path)
            notes.append({
                "title": title,
                "file": file_path.replace("\\", "/"),  # 将Windows路径分隔符转为Web格式
                "mod_time": mod_time
            })

# 按修改时间倒序排序（最新的在前）
notes.sort(key=lambda x: x["mod_time"], reverse=True)

# 将结果写入 notes_list.json
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"✅ 成功生成 {output_file}，共找到 {len(notes)} 篇笔记。")