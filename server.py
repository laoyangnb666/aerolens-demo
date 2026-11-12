"""AeroLens 本地服务器（演示版）：静态资源 + 诗歌生成转发（百度千帆）。

浏览器直连千帆接口会被 CORS 拦截，因此由本地服务代为请求，
密钥只保留在服务端，不暴露在前端代码中。

【演示说明】本仓库为前端演示程序，默认不内置任何 API 密钥：
  - 未配置密钥时，/api/poem 返回 501，前端自动回退到内置的
    本地诗歌生成器（js/app.js 中的 composePoem），AI 诗歌功能照常可用；
  - 如需启用大模型成诗，请设置环境变量 QIANFAN_API_KEY 后重启本服务。

用法：python server.py [端口]，默认 8765
"""

import json
import os
import sys
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
API_URL = "https://qianfan.baidubce.com/v2/tokenplan/personal/chat/completions"
# 密钥从环境变量读取，切勿提交到代码仓库
API_KEY = os.environ.get("QIANFAN_API_KEY", "")
MODEL = os.environ.get("QIANFAN_MODEL", "deepseek-v4.1-flash-1017")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_POST(self):
        if self.path.split("?")[0] != "/api/poem":
            self.send_error(404)
            return

        if not API_KEY:
            # 演示模式：未配置密钥，交由前端本地诗歌生成器兜底
            self._json(501, {"error": "demo mode: QIANFAN_API_KEY not configured, "
                                     "frontend will fall back to the built-in local poem composer"})
            return

        try:
            length = int(self.headers.get("Content-Length") or 0)
            payload = json.loads(self.rfile.read(length) or b"{}")
            messages = payload.get("messages") or []
            if not messages:
                self._json(400, {"error": "messages is required"})
                return

            body = json.dumps({
                "model": MODEL,
                "messages": messages,
                "temperature": payload.get("temperature", 0.9),
                "max_tokens": payload.get("max_tokens", 900),
                # 该模型默认会长时间思考，压低推理开销以保证诗歌秒级返回
                "reasoning_effort": payload.get("reasoning_effort", "minimal"),
            }, ensure_ascii=False).encode("utf-8")

            req = urllib.request.Request(API_URL, data=body, headers={
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json",
            })
            with urllib.request.urlopen(req, timeout=25) as resp:
                self._json(200, json.loads(resp.read().decode("utf-8")))
        except urllib.error.HTTPError as e:
            detail = e.read().decode("utf-8", "ignore")
            self._json(502, {"error": "upstream %s" % e.code, "detail": detail})
        except Exception as e:
            self._json(502, {"error": str(e)})

    def _json(self, status, obj):
        data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print("[AeroLens] serving on http://localhost:%d" % port)
    server.serve_forever()


if __name__ == "__main__":
    main()