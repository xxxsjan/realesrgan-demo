# realesrgan

## 安装软件

ffmpeg

realesrgan

<https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.2.5.0>

assets 下载 realesrgan-ncnn-vulkan-20220424-windows

放到根目录soft下，例如soft/realesrgan-ncnn-vulkan-20220424-windows

## realesrgan基础使用

./realesrgan-ncnn-vulkan.exe -i input.jpg -o output.png -n [model_name]
model_name可选值：

1. realesrgan-x4plus（默认）
2. reaesrnet-x4plus
3. realesrgan-x4plus-anime（针对动漫插画图像优化，有更小的体积）
4. realesr-animevideov3 (针对动漫视频)

## 开始

1获取视频帧
ffmpeg -i onepiece_demo.mp4 -qscale:v 1 -qmin 1 -qmax 1 -vsync 0 tmp_frames/frame%08d.png

2处理图片
./realesrgan-ncnn-vulkan.exe -i tmp_frames -o out_frames -n realesr-animevideov3 -s 2 -f jpg

3生成视频
ffmpeg -r 23.98 -i out_frames/frame%08d.jpg -c:v libx264 -r 23.98 -pix_fmt yuv420p   output.mp4
