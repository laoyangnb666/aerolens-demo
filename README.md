# AeroLens · 地球相册（前端演示版）

> **▶ 在线体验：https://laoyangnb666.github.io/aerolens-demo/login.html**
>
> **⚠️ 这是一个前端演示程序（Frontend Demo）**
> 本仓库仅用于展示界面与交互效果，所有数据均为演示数据，不含真实后端服务与真实账号体系。
> 本地完整版（含无人机同步、EXIF 解析、真实模型配置等）未开源。

AeroLens 是一个「AI 无人机三维地球相册」概念产品：登录后进入一颗可旋转的三维地球，
航拍照片按 GPS 坐标钉在拍摄位置上，点击照片即可查看拍摄参数，并让 AI 为这张照片作一首双语诗。

![Tech](https://img.shields.io/badge/stack-Three.js%20%2B%20Tailwind%20%2B%20GSAP-38bdf8)
![Type](https://img.shields.io/badge/type-frontend%20demo-fbbf24)
![License](https://img.shields.io/badge/license-MIT-34d399)

---

## ✨ 功能一览（演示）

| 功能 | 说明 |
|---|---|
| 🌍 三维地球相册 | Three.js 渲染可旋转地球，照片按经纬度定位（含屏幕空间防碰撞排布） |
| 🖼️ 照片详情 | 机位、机型、飞行高度、ISO / 光圈 / 快门、分辨率等拍摄参数展示 |
| 📝 **AI 诗歌** | 为当前照片生成中英双语诗；支持大模型成诗 + 本地兜底成诗双模式（见下文） |
| 🚁 无人机照片同步 | 演示版保留入口：扫描 DCIM 目录、读取 EXIF（GPS / 机型 / 飞行参数）、自动定位 |
| 🌐 中英双语 | 全站 i18n，语言偏好本地记忆 |
| 🔐 演示登录 / 注册 | **纯演示**：仅写入浏览器 localStorage，无真实鉴权与服务器 |

## 🧪 关于「演示注册」

- 注册页 / 登录页**不连接任何服务器**，账号信息只保存在你自己的浏览器 `localStorage` 中；
- 随便填写即可通过校验，用于完整体验「注册 → 登录 → 进入相册」的流程；
- 请**不要**使用真实常用密码（演示程序不加密存储）；
- 清除浏览器站点数据即可「注销」。

## 📝 AI 诗歌：双模式说明

点击照片详情中的「AI 诗篇」按钮即可成诗，两种模式自动切换：

1. **本地模式（默认，开箱即用）**
   未配置大模型密钥时，前端调用内置的本地诗歌生成器
   （`js/app.js` 中的 `composePoem`：根据时间 / 光线 / 意象 / 高度等特征拼装，同一照片永远得到同一首诗）。
2. **大模型模式（可选）**
   本地服务器 `server.py` 会把请求转发到百度千帆。配置环境变量后重启服务即启用：

   ```bash
   # Windows (PowerShell)
   $env:QIANFAN_API_KEY = "bce-v3/xxxx"   # 你的千帆 API Key
   python server.py 8765
   ```

   密钥只存在于服务端环境变量中，**请勿提交到任何仓库**。

## 🚀 本地运行

**最简单的方式：直接打开在线演示** —— [https://laoyangnb666.github.io/aerolens-demo/login.html](https://laoyangnb666.github.io/aerolens-demo/login.html)
（静态托管模式，AI 诗歌自动使用本地成诗模式）

本地运行：

```bash
# 1. 进入仓库目录
cd aerolens-demo

# 2. 启动本地服务器（需 Python 3.8+，无第三方依赖）
python server.py 8765

# 3. 浏览器打开
#    http://localhost:8765/login.html
```

Windows 用户也可直接双击 `launcher.bat`（首次运行会注册 `aerolens://` 协议）。

> 也可以用任意静态服务器（如 `python -m http.server`）直接浏览页面，
> 但 `/api/poem` 转发不可用，AI 诗歌将始终走本地模式。

## 📁 目录结构

```
├── index.html          # 三维地球相册主页面
├── landing.html        # 产品宣传页
├── login.html          # 登录（演示）
├── register.html       # 注册（演示）
├── server.py           # 本地服务器：静态资源 + 诗歌转发（密钥走环境变量）
├── launcher.bat        # Windows 一键启动
├── css/                # 样式
├── js/
│   ├── app.js          # 主应用：地球渲染、照片标记、详情、AI 诗歌
│   ├── data.js         # 演示照片数据（重庆两江产业园航拍）
│   ├── landing.js      # 宣传页逻辑
│   ├── login.js / register.js
│   └── page-transition.js
└── vendor/             # 第三方库与演示图片素材
```

## 📄 许可证

[MIT](LICENSE) — 演示素材（`vendor/photos`、`vendor/textures`）仅供学习演示使用，请勿商用。
