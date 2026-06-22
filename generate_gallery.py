import os

assets_dir = 'src/assets'
files = os.listdir(assets_dir)
image_files = [f for f in files if f.lower().endswith(('.jpeg', '.jpg', '.png', '.webp'))]

html_content = """<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; background: #f8f6f1; padding: 20px; }
  h1 { text-align: center; }
  .grid { display: grid; grid-template-cols: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
  .card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 10px; text-align: center; }
  .card img { max-width: 100%; max-height: 200px; object-fit: contain; }
  .filename { font-size: 12px; color: #555; margin-top: 10px; word-break: break-all; }
</style>
</head>
<body>
<h1>Fit Secrets Assets Gallery</h1>
<div class="grid">
"""

for img in image_files:
    # Use relative path from this HTML file
    src_path = f"src/assets/{img}"
    html_content += f"""
  <div class="card">
    <img src="{src_path}" alt="{img}">
    <div class="filename">{img}</div>
  </div>
"""

html_content += """
</div>
</body>
</html>
"""

with open('gallery.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Gallery HTML generated with {len(image_files)} images.")
