/* ============================================================
   YOUR SKY FOR YOU — LANDING — i18n & interactions
   v2.0 — official site aligned with the 16-slide deck
   ============================================================ */

const i18n = {
  zh: {
    'nav.product': '产品', 'nav.solution': '产品', 'nav.atlas': '相册', 'nav.tech': '技术', 'nav.dock': '机场', 'nav.impact': '影响力', 'nav.esg': 'ESG', 'nav.cta': '了解产品',

    'hero.live': '景区定点部署 · 全自动无人值守',
    'hero.t1': '天际', 'hero.t2': '为你',
    'hero.sub': '每一片风景，都拥有专属的天际视角；每一个人，都能零门槛拍出惊艳的航拍大片。',
    'hero.cta1': '了解产品', 'hero.cta2': '浏览地球相册',
    'hero.k1': '设备门槛', 'hero.k2': '操作步骤', 'hero.k3': '全天候待命',
    'hero.a1': '合规空域管控', 'hero.a2': 'AI 视觉决策', 'hero.a3': '无人值守机库', 'hero.scroll': 'SCROLL ↓',

    'toc.eyebrow': '目录 // CONTENTS', 'toc.title': '从一道墙，走到一片天空',
    'toc.desc': '六个问题，一条完整的产品路径：为什么做、答案是什么、留下什么、凭什么可信、还能多什么，最后收束到我们想把天空做成什么。',
    'toc.i1': '为什么做：四道门槛', 'toc.i2': '答案：把机库留在景区', 'toc.i3': '记忆：3D 地球相册',
    'toc.i4': '可信：优势与技术栈', 'toc.i5': '能力：自研、视觉与大模型', 'toc.i6': '收束：把天空做成基础设施',
    'toc.route': '阅读路径 // THE ROUTE',
    'toc.r1': '向往', 'toc.r1d': '想留住风景的人', 'toc.r2': '受阻', 'toc.r2d': '四道门槛挡在前面',
    'toc.r3': '惊喜', 'toc.r3d': '机库、地球相册与诗', 'toc.r4': '相信', 'toc.r4d': '技术栈、两块自研与社会价值',
    'toc.foot': '16 SECTIONS · ONE PRODUCT',

    'gap.eyebrow': '为什么 // WHY IT MATTERS', 'gap.title': '旅拍的四道坎',
    'gap.desc': '旅行途中，人人都想留下一张「我来过」的照片。但举起手机，得到的常常是人潮、平视，和一张没有自己的风景。景区拥挤、视角单一、空域禁飞、专业能力——这不是游客审美不行，而是设备、空域和技术一起把专业航拍变成了少数人的特权。',
    'gap.h1': '景区拥挤，拍摄受限', 'gap.p1': '热门机位人潮密集，三脚架和自拍杆常常展不开；最好的光影只有几分钟，拍摄很容易仓促杂乱。',
    'gap.h2': '独行拍摄，视角单一', 'gap.p2': '一个人旅行时，手持机位固定、取景范围狭窄，人与全景很难同框。想要「人在景中」的高级感，最后只能靠运气。',
    'gap.h3': '空域禁飞，门槛极高', 'gap.p3': '核心景区空域管控严格，私人无人机禁止飞行，即便买了设备，也常常无处可飞。',
    'gap.h4': '缺乏专业摄影能力', 'gap.p4': '构图、光影、机位都依赖长期经验。普通用户反复拍摄，画面依然扁平、缺少层次，最后就变成一句「拍不出来」。',
    'gap.t1k': '对个人', 'gap.t1v': '挡住的是影像平权：没有设备、没有技术的人，本该也能拥有专业视角。',
    'gap.t2k': '对景区', 'gap.t2v': '少了一种可消费、可传播的体验增量，游客停留时间与二次传播都被浪费。',
    'gap.t3k': '对社会', 'gap.t3v': '大量普通人的旅行记忆，无法以真实坐标沉淀下来，成为可回看的地理资产。',
    'gap.note': '所以我们做这件事，不只是看到一个产品机会，而是把它当成一次影像平权。', 'gap.cta': '看看它拍下了什么',

    'sol.eyebrow': '产品 // THE PRODUCT', 'sol.title': '把机库留在景区，把天空交给游客',
    'sol.desc': 'Your Sky For You 在景区定点部署全自动、无人值守、合规安全的智能机库。游客不需要买无人机，不需要会操控，也不需要飞行执照。整个体验被压缩成两个动作：选一个点位，按一下。',
    'sol.a1': '选一个点位', 'sol.a1d': '按景区、时段与风景类型选择机位',
    'sol.a2': '按一下', 'sol.a2d': '剩下的交给机库、AI 与云端',
    'sol.p1k': '合规', 'sol.p1v': '景区定点部署，统一空域管控，杜绝黑飞风险。',
    'sol.p2k': '零门槛', 'sol.p2v': '无需设备、无需操控、无需飞行执照。',
    'sol.p3k': '稳定', 'sol.p3v': '和专业航拍相比，门槛被拿掉了，画质与视角反而更稳定。',
    'sol.fig': '大疆机场 3 // 精准回舱 · 触点充电 · 自动回传',
    'sol.compare': '对比 // BEFORE & AFTER', 'sol.th1': '维度', 'sol.th2': '传统航拍', 'sol.th3': 'YOUR SKY',
    'sol.r1k': '设备', 'sol.r1a': '自购无人机与电池', 'sol.r1b': '景区机库，无需购买',
    'sol.r2k': '空域', 'sol.r2a': '私人飞行，多地禁飞', 'sol.r2b': '定点部署，统一管控',
    'sol.r3k': '技能', 'sol.r3a': '需要长期练习', 'sol.r3b': 'AI 全流程，零门槛',
    'sol.r4k': '成片', 'sol.r4a': '依赖个人经验', 'sol.r4b': '稳定构图与光影',
    'sol.r5k': '留存', 'sol.r5a': '本地相册，难以回看', 'sol.r5b': '3D 地球相册，坐标可回看',
    'sol.note': 'SAME LANDSCAPE · DIFFERENT ALTITUDE',

    'run.eyebrow': '运行方式 // HOW IT RUNS', 'run.title': '一次点击，四次自动',
    'run.desc': '从预约到返航，四步全部无人干预，用户端只剩「选」和「按」。',
    'run.h1': '预约', 'run.p1': '游客选择景区点位和时段，系统分配最近的机库。', 'run.t1': 'BOOKING',
    'run.h2': '起飞', 'run.p2': '机库开舱，无人机按预设航线自动起飞。', 'run.t2': 'TAKE-OFF',
    'run.h3': '拍摄', 'run.p3': 'AI 识别场景，自动完成构图、曝光和连拍。', 'run.t3': 'CAPTURE',
    'run.h4': '返航', 'run.p4': '无人机精准回舱、自主补电，原片自动回传云端。', 'run.t4': 'RETURN',
    'run.ov1t': '智能机库', 'run.ov1s': '状态：全自动待命', 'run.ov1u': '补电：自主完成',
    'run.ov2t': 'AI 拍摄', 'run.ov2s': '决策：识别 → 构图 → 曝光', 'run.ov2u': '回传：云端秒级',

    'atlas.eyebrow': '地球相册 // THE ATLAS', 'atlas.title': '照片不躺在相册里，<br />而是钉在地球上',
    'atlas.desc': '每张作品自动绑定经纬度、机型、飞行高度，以及 ISO、光圈、快门这些参数。你可以在全球点位之间浏览，按风景分类检索，也可以回看一整段旅途轨迹。它不是更花哨的相册，而是可以重新走一遍的地理记忆。',
    'atlas.gCity': '城市', 'atlas.gCoast': '海岸', 'atlas.gNature': '自然', 'atlas.count3': '3 个点位',
    'atlas.city1t': '哈利法塔暮色', 'atlas.city1d': '沙漠与海湾之间，828 米的高度刺破暮色。',
    'atlas.city2t': '塞纳河之夜', 'atlas.city2d': '铁塔亮灯的瞬间，整条塞纳河变成金色。',
    'atlas.city3t': '曼哈顿暮色', 'atlas.city3d': '帝国大厦亮起灯，万家灯火同时回答黄昏。',
    'atlas.coast1t': '环礁蓝', 'atlas.coast1d': '深浅不一的蓝，是海底地形写下的等高线。',
    'atlas.coast2t': '珊瑚环礁', 'atlas.coast2d': '一圈白沙把海分成两种颜色，也把时间分成两层。',
    'atlas.coast3t': '爱琴海岸', 'atlas.coast3d': '白墙蓝顶沿着火山崖壁层层落向海面。',
    'atlas.nat1t': '雪线之上', 'atlas.nat1d': '云层之下，山脊像被光削出的刀锋。',
    'atlas.nat2t': '冰川湖', 'atlas.nat2d': '浮冰把湖面切成缓慢移动的拼图。',
    'atlas.nat3t': '雨林河曲', 'atlas.nat3d': '一条河在绿色里反复转弯，直到看不见尽头。',
    'atlas.mpH': '实时参数面板 // LIVE METADATA',

    'adv.eyebrow': '核心优势 // WHY YOUR SKY', 'adv.title': '选择 YOUR SKY 的五个理由',
    'adv.desc': '从合规到成片，从留存到文案，一套系统覆盖完整链路。',
    'adv.q1': '谁能飞？', 'adv.a1': '合规安全', 'adv.d1': '景区定点部署、统一空域管控，杜绝黑飞风险。',
    'adv.q2': '谁来飞？', 'adv.a2': '零门槛体验', 'adv.d2': '无需设备、无需操控、无需飞行执照。',
    'adv.q3': '怎么拍好？', 'adv.a3': 'AI 全流程', 'adv.d3': '智能构图、光影优化、场景自适应拍摄。',
    'adv.q4': '留下什么？', 'adv.a4': '3D 地球相册', 'adv.d4': '作品钉在真实坐标上，可视化留存与回看旅途。',
    'adv.q5': '还能多什么？', 'adv.a5': '大模型文案', 'adv.d5': '图像智能分析，生成专属诗句与分享文案。',

    'tech.eyebrow': '技术架构 // TECHNOLOGY', 'tech.title': '四层技术栈',
    'tech.desc': '硬件自动化、前端可视化、AI 视觉与大模型四层协同，软硬件深度联动。横向由 DeepSeek v4 辅助前端 UI 逆向开发。',
    'tech.h4': '大模型层', 'tech.p4': 'GLM-5.3-Flash 做图像理解与文案生成，让每张照片配得上一句诗。',
    'tech.h3': 'AI 视觉层', 'tech.p3': '场景识别、智能构图、光影优化三类算法，在快门之前完成专业决策。',
    'tech.h2': '可视化层', 'tech.p2': 'Three.js 三维地球与 Blender 高精度模型，覆盖移动端与云端界面。',
    'tech.h1': '硬件自动化层', 'tech.p1': '大疆司空 FlightHub 2 飞控、行业级无人机与标准化机库完成调度与起降。',
    'tech.fig': '3D EARTH // 每一张照片都有真实坐标',
    'tech.stack': '技术栈 // POWERED BY',

    'dock.eyebrow': '硬件设备 // DJI DOCK SERIES', 'dock.title': '大疆机场系列，全天候无人值守',
    'dock.desc': '飞行这件事，我们选择交给已经成熟的工业体系，而不是自己造飞行器。大疆司空平台负责任务调度、航线规划、远程监控与多机集群；硬件侧使用大疆机场系列与行业级无人机，保证飞行稳定、画质与全天候运行。',
    'dock.s1': '整机重量', 'dock.s2': '防护等级', 'dock.s3': '工作温度', 'dock.s4': '最长飞行', 'dock.s5': '作业半径',
    'dock.g1t': '产品外观', 'dock.g1s': '全自动机库 + Matrice 4D',
    'dock.g2t': '车载部署', 'dock.g2s': '固定与移动两种模式',
    'dock.g3t': '环境感知', 'dock.g3s': '风速 · 雨量 · 温度 · 水浸',
    'dock.tableTitle': '机型对比 // DOCK 3 vs DOCK 2', 'dock.col1': '参数',
    'dock.r1': '整机重量', 'dock.r2': '防护等级', 'dock.r3': '工作温度', 'dock.r4': '最大运行海拔',
    'dock.r5': '充电时间', 'dock.r6': '适配飞行器', 'dock.r7': '图传天线', 'dock.r8': '云平台',
    'dock.note': '数据来源：大疆行业应用官方技术参数',
    'dock.m4d': '4/3 CMOS 广角 2,000 万像素，中长焦与长焦均 4,800 万像素；54 分钟最长飞行，激光测距最远 1,800 米。',
    'dock.m4td': '在 4D 基础上增加 640×512 热成像与近红外补光，支持夜间与热异常场景的巡检级作业。',
    'dock.st1': '任务调度', 'dock.st1v': '已接入', 'dock.st2': '航线规划', 'dock.st2v': '自动生成',
    'dock.st3': '返航充电', 'dock.st3v': '自主完成', 'dock.st4': '环境监测', 'dock.st4v': '风速 / 雨量 / 水浸',
    'dock.verdict': '把飞行安全交给成熟平台，团队专注体验与算法。',

    'self.eyebrow': '自研能力 // IN-HOUSE', 'self.title': '前端与三维，两块自研',
    'self.desc': '一块解决「怎么用」，一块解决「怎么看见」。自研不是重复造轮子，而是把体验的关键环节握在自己手里。',
    'self.aTag': 'FRONT-END ENGINEERING', 'self.aTitle': 'DeepSeek v4 前端 UI 逆向开发',
    'self.aDesc': '我们对标高端可视化产品，拆解界面与交互范式，自动适配移动端与云端布局，解决迭代慢、适配差、交互生硬的问题。',
    'self.bTag': '3D MODELING', 'self.bTitle': 'Blender 三维地球建模',
    'self.bDesc': '自建高精度地球模型，还原地貌纹理，让照片按经纬度精准挂载、按地域分类、按轨迹渲染；再用轻量化算法保证缩放、切换与检索流畅。',

    'av.eyebrow': 'AI 视觉 // AI VISION', 'av.title': '零门槛，不等于拍得普通',
    'av.desc': '按下快门之前，三类算法已经替用户做完了专业决策。用户只需要站在风景里。',
    'av.h1': '场景识别', 'av.p1': '先看懂山川、云海、日落、城市海岸线和人文建筑，匹配不同的拍摄逻辑。',
    'av.h2': '智能构图', 'av.p2': '内置摄影美学模型，自适应黄金构图、全景构图与人像融合构图。',
    'av.h3': '光影优化', 'av.p3': '实时感知光强和角度，自动调节参数与成片色调，保留现场氛围。',
    'av.flow': '识别 → 构图 → 曝光', 'av.note': 'AI 在快门之前完成三步决策',

    'llm.eyebrow': '大模型 // GLM-5.3-FLASH', 'llm.title': '让每一张航拍，配得上一句诗',
    'llm.desc': 'GLM-5.3-Flash 先做图像理解，解析风景元素、光影氛围、场景风格与画面层次；再结合拍摄地点、时节和氛围，生成古风诗句、文艺文案或治愈短句。',
    'llm.f1': '上传', 'llm.f1d': '原片自动回传云端', 'llm.f2': '理解', 'llm.f2d': '解析元素、光影与层次',
    'llm.f3': '成文', 'llm.f3d': '秒级生成专属文案',
    'llm.t1': '古风', 'llm.t2': '文艺', 'llm.t3': '简约', 'llm.t4': '治愈',
    'llm.foot': 'SECONDS · MULTI-STYLE · PER PHOTO',
    'llm.poem': '云开千嶂出<br />风过一湖平',
    'llm.style': '风格', 'llm.styleV': '古风 · 七言', 'llm.scene': '场景', 'llm.sceneV': '云海 / 群山 / 日出', 'llm.time': '生成耗时',

    'impact.eyebrow': '社会影响力 // SOCIAL IMPACT', 'impact.title': '让专业航拍，成为一项公共能力',
    'impact.desc': '我们不只是做一台更好用的相机，而是在重新分配「看见风景」的能力。机库网络一旦成为景区基础设施，受益者就不只是游客。',
    'impact.h1': '影像平权', 'impact.p1': '没有设备、没有技术、没有执照的人，也能获得专业视角。影像表达不再由预算和技能决定。',
    'impact.h2': '文旅体验增量', 'impact.p2': '为景区提供可消费、可传播的体验产品，延长停留时间，也让游客成为目的地的高质量传播者。',
    'impact.h3': '地理记忆资产', 'impact.p3': '普通人的旅行记忆以真实坐标沉淀，形成可回看、可检索、可传承的个人地理档案。',
    'impact.h4': '公共基础设施', 'impact.p4': '同一套机库网络可在非高峰时段复用于景区巡检、应急勘察与生态监测，提高公共资源利用率。',
    'impact.figT': '影像平权', 'impact.figS': '三代人 · 同一片天空',
    'impact.lvHead': '价值层级 // VALUE LAYERS',
    'impact.l1k': '个人', 'impact.l1v': '从「拍不到」到「零门槛拥有专业航拍」。',
    'impact.l2k': '景区', 'impact.l2v': '从「收门票」到「提供可传播的体验增量」。',
    'impact.l3k': '社会', 'impact.l3v': '从「少数人的玩具」到「可被调用的公共能力」。',
    'impact.commitTag': '我们的边界 // COMMITMENTS',
    'impact.c1': '不打扰：拍摄不干扰游客与生态', 'impact.c2': '不越界：严格遵守空域与隐私边界', 'impact.c3': '不转嫁：把门槛降到零，而不是把成本转给用户',

    'esg.eyebrow': '可持续与治理 // ESG', 'esg.title': '把增长，建立在可持续与合规之上',
    'esg.desc': '共享机库天然比「人手一台无人机」更轻。我们把这个结构优势，延伸成一套可被检查的环境、社会与治理承诺。',
    'esg.eTitle': '环境 // Environment',
    'esg.e1': '共享替代购买：一台机库服务多人，减少个人无人机闲置与电池废弃。',
    'esg.e2': '低碳补能：机场顶盖集成太阳能板，探索光伏辅助供电与储能调度。',
    'esg.e3': '无痕拍摄：固定航线、不落地、不踩踏，减少对植被与地貌的干扰。',
    'esg.e4': '数字优先：电子相册与云端回看，减少实体冲印与物料消耗。',
    'esg.sTitle': '社会 // Social',
    'esg.s1': '影像平权：让老人、儿童、残障人士也能获得专业级旅行影像。',
    'esg.s2': '适老化与无障碍：大字号、低学习成本的交互与语音引导。',
    'esg.s3': '青少年科普：把机库与航拍算法变成可参观、可讲解的科技课堂。',
    'esg.s4': '在地就业：景区运维、机库巡检与内容运营优先本地招募。',
    'esg.gTitle': '治理 // Governance',
    'esg.g1': '空域合规：固定点位、实名飞行、统一报备，杜绝黑飞。',
    'esg.g2': '数据最小化：仅保留作品必需的坐标与参数，支持一键删除。',
    'esg.g3': '隐私保护：人像与敏感区域自动模糊，拍摄范围公开可查。',
    'esg.g4': '供应链合规：采用大疆行业级硬件与官方云平台，全链路可追溯。',
    'esg.figT': '共享 · 低碳 · 无痕', 'esg.figS': '太阳能顶盖 · 固定航线 · 景区零打扰',
    'esg.t1k': '合规目标', 'esg.t1v': '100% 空域报备', 'esg.t2k': '安全目标', 'esg.t2v': '0 起违规飞行',
    'esg.t3k': '数据目标', 'esg.t3v': '可查询 · 可删除', 'esg.t4k': '披露目标', 'esg.t4v': '年度影响力简报',
    'esg.note': '以上为运营目标与承诺，非已完成的第三方认证。',

    'roll.eyebrow': '落地路径 // ROLLOUT', 'roll.title': '从一次试点，到一张网络',
    'roll.h1': '景区试点', 'roll.p1': '在核心景区部署首台智能机库，跑通预约、拍摄、返航的完整闭环。',
    'roll.h2': '多点位复制', 'roll.p2': '以标准化机库与统一空域管控，把一个景区的经验复制到更多点位。',
    'roll.h3': '城市与文旅网络', 'roll.p3': '连接城市与文旅目的地，让天际视角成为可被调用的基础设施。',

    'tel.eyebrow': '关键数字 // BY THE NUMBERS',
    'tel.k1': '道旅拍门槛', 'tel.k2': '类视觉算法', 'tel.k3': '项核心技术', 'tel.k4': '全天候待命',

    'close.eyebrow': '愿景 // THE VISION', 'close.title': '把天空，<br />做成一项基础设施。',
    'close.sub': '每一片风景，都拥有专属的天际视角；每一个人，都能零门槛拍出惊艳的航拍大片。从景区试点，到多点位复制，再到城市与文旅网络——我们希望把天空，交给每一个人。',
    'close.btn1': '回顾产品', 'close.btn2': '浏览相册',

    'footer.tag': 'AI 一体化智能机库航拍平台', 'footer.ver': 'V. 2.1 — SKY AS INFRASTRUCTURE'
  },

  en: {
    'nav.product': 'Product', 'nav.solution': 'Product', 'nav.atlas': 'Atlas', 'nav.tech': 'Tech', 'nav.dock': 'Dock', 'nav.impact': 'Impact', 'nav.esg': 'ESG', 'nav.cta': 'Explore',

    'hero.live': 'SITE-DEPLOYED · FULLY AUTONOMOUS',
    'hero.t1': 'YOUR', 'hero.t2': 'SKY',
    'hero.sub': 'For every landscape, a dedicated sky view — and for everyone, a professional aerial shot with zero barriers.',
    'hero.cta1': 'Explore the Product', 'hero.cta2': 'Browse the Atlas',
    'hero.k1': 'Equipment barrier', 'hero.k2': 'Steps', 'hero.k3': 'Always on standby',
    'hero.a1': 'Airspace control', 'hero.a2': 'AI decisions', 'hero.a3': 'Unmanned dock', 'hero.scroll': 'SCROLL ↓',

    'toc.eyebrow': 'Contents // THE MAP', 'toc.title': 'From one wall to an open sky',
    'toc.desc': 'Six questions, one complete product path: why we build it, what the answer is, what stays, why it is credible, what else it can do, and finally what we want the sky to become.',
    'toc.i1': 'Why: four barriers', 'toc.i2': 'Answer: keep the dock on site', 'toc.i3': 'Memory: the 3D Earth Atlas',
    'toc.i4': 'Trust: advantages & stack', 'toc.i5': 'Capability: in-house, vision, LLM', 'toc.i6': 'Close: sky as infrastructure',
    'toc.route': 'The Route',
    'toc.r1': 'Desire', 'toc.r1d': 'People who want to keep the view', 'toc.r2': 'Friction', 'toc.r2d': 'Four barriers in the way',
    'toc.r3': 'Delight', 'toc.r3d': 'A dock, an atlas and a poem', 'toc.r4': 'Trust', 'toc.r4d': 'Stack, in-house work and social value',
    'toc.foot': '16 SECTIONS · ONE PRODUCT',

    'gap.eyebrow': 'Why // WHY IT MATTERS', 'gap.title': 'Four barriers to a travel shot',
    'gap.desc': 'Everyone wants a photo that says “I was here”. But the phone gives us crowds, eye level, and a landscape without us. Crowded sites, one angle, no-fly zones and missing skills — ordinary travellers are locked out of professional aerial imagery.',
    'gap.h1': 'Crowded sites, no room to shoot', 'gap.p1': 'Popular viewpoints leave no room for a tripod or a selfie stick. The best light lasts minutes, so the shot is rushed and messy.',
    'gap.h2': 'Solo travel, one fixed angle', 'gap.p2': 'Handheld shots are fixed and narrow. You and the landscape rarely share the frame, so the “inside the view” feeling is left to luck.',
    'gap.h3': 'No-fly airspace, high barrier', 'gap.p3': 'Core scenic areas are strictly controlled. Private drones are banned, so even buying one does not mean you can fly it.',
    'gap.h4': 'No professional photography skills', 'gap.p4': 'Composition, light and camera position depend on years of practice. Repeated attempts still come out flat and lack depth.',
    'gap.t1k': 'For individuals', 'gap.t1v': 'It blocks visual equality: people without gear or skills should still be able to own a professional view.',
    'gap.t2k': 'For scenic sites', 'gap.t2v': 'They lose a consumable, shareable experience increment — and the longer stays and word of mouth that come with it.',
    'gap.t3k': 'For society', 'gap.t3v': 'Millions of ordinary travel memories never settle on real coordinates as a revisitable geographic asset.',
    'gap.note': 'So this is not just a product opportunity. It is a step toward visual equality.', 'gap.cta': 'See what it captures',

    'sol.eyebrow': 'Product // THE PRODUCT', 'sol.title': 'Keep the dock at the site. Give the sky to the visitor.',
    'sol.desc': 'Your Sky For You deploys fully automated, unmanned and compliant smart docks at scenic sites. Visitors need no drone, no piloting skill and no licence. The whole experience collapses into two actions: pick a spot, tap once.',
    'sol.a1': 'Pick a spot', 'sol.a1d': 'Choose by site, time slot and scenery type',
    'sol.a2': 'Tap once', 'sol.a2d': 'The dock, AI and cloud do the rest',
    'sol.p1k': 'Compliant', 'sol.p1v': 'Fixed site deployment under unified airspace control. No illegal flights.',
    'sol.p2k': 'Zero barrier', 'sol.p2v': 'No equipment, no piloting, no licence.',
    'sol.p3k': 'Stable', 'sol.p3v': 'Compared with manual aerial photography, the barrier is gone while image quality and angles become more consistent.',
    'sol.fig': 'DJI Dock 3 // precision landing · contact charging · auto upload',
    'sol.compare': 'Before & After', 'sol.th1': 'Dimension', 'sol.th2': 'Traditional aerial', 'sol.th3': 'YOUR SKY',
    'sol.r1k': 'Equipment', 'sol.r1a': 'Buy your own drone and batteries', 'sol.r1b': 'Site dock, nothing to buy',
    'sol.r2k': 'Airspace', 'sol.r2a': 'Private flight, often banned', 'sol.r2b': 'Fixed sites, unified control',
    'sol.r3k': 'Skills', 'sol.r3a': 'Requires long practice', 'sol.r3b': 'AI end-to-end, zero barrier',
    'sol.r4k': 'Result', 'sol.r4a': 'Depends on personal experience', 'sol.r4b': 'Consistent composition and light',
    'sol.r5k': 'Memory', 'sol.r5a': 'Local album, hard to revisit', 'sol.r5b': '3D Earth Atlas, coordinates included',
    'sol.note': 'SAME LANDSCAPE · DIFFERENT ALTITUDE',

    'run.eyebrow': 'How It Runs // AUTOMATED', 'run.title': 'One tap, four automations',
    'run.desc': 'From booking to return, every step is unmanned. The visitor only picks and taps.',
    'run.h1': 'Book', 'run.p1': 'The visitor picks a site and time slot; the system assigns the nearest dock.', 'run.t1': 'BOOKING',
    'run.h2': 'Take off', 'run.p2': 'The dock opens and the drone lifts off along a preset route.', 'run.t2': 'TAKE-OFF',
    'run.h3': 'Capture', 'run.p3': 'AI reads the scene and handles composition, exposure and burst capture.', 'run.t3': 'CAPTURE',
    'run.h4': 'Return', 'run.p4': 'The drone lands precisely, recharges itself and uploads the originals.', 'run.t4': 'RETURN',
    'run.ov1t': 'Smart dock', 'run.ov1s': 'Status: fully automated', 'run.ov1u': 'Recharge: self-managed',
    'run.ov2t': 'AI capture', 'run.ov2s': 'Detect → compose → expose', 'run.ov2u': 'Upload: cloud, seconds',

    'atlas.eyebrow': 'The Atlas // 3D EARTH', 'atlas.title': 'Photos do not sit in an album.<br />They are pinned to the Earth.',
    'atlas.desc': 'Every shot binds its latitude, longitude, drone model and altitude together with ISO, aperture and shutter speed. Browse places worldwide, filter by scenery, or replay a whole journey. It is not a fancier album — it is a geographic memory you can walk through again.',
    'atlas.gCity': 'City', 'atlas.gCoast': 'Coast', 'atlas.gNature': 'Nature', 'atlas.count3': '3 places',
    'atlas.city1t': 'Burj at dusk', 'atlas.city1d': 'Between desert and gulf, 828 metres pierce the dusk.',
    'atlas.city2t': 'Seine by night', 'atlas.city2d': 'The moment the tower lights up, the whole Seine turns to gold.',
    'atlas.city3t': 'Manhattan dusk', 'atlas.city3d': 'As the Empire State lights up, ten thousand windows answer the dusk.',
    'atlas.coast1t': 'Lagoon blue', 'atlas.coast1d': 'Every shade of blue is a contour line written by the seabed.',
    'atlas.coast2t': 'Coral atoll', 'atlas.coast2d': 'A ring of white sand splits the sea into two colours, and time into two layers.',
    'atlas.coast3t': 'Aegean coast', 'atlas.coast3d': 'White walls and blue domes step down the volcanic cliff to the sea.',
    'atlas.nat1t': 'Above the snowline', 'atlas.nat1d': 'Below the cloud, ridges are knives cut by light.',
    'atlas.nat2t': 'Glacier lagoon', 'atlas.nat2d': 'Ice floes turn a still lake into a slowly moving puzzle.',
    'atlas.nat3t': 'Rainforest bend', 'atlas.nat3d': 'A river turns again and again through green, until it disappears.',
    'atlas.mpH': 'Live metadata panel',

    'adv.eyebrow': 'Advantages // WHY YOUR SKY', 'adv.title': 'Five reasons to choose YOUR SKY',
    'adv.desc': 'From compliance to capture, from memory to caption — one system covers the whole chain.',
    'adv.q1': 'Who can fly?', 'adv.a1': 'Compliance', 'adv.d1': 'Fixed site deployment and unified airspace control remove illegal flight.',
    'adv.q2': 'Who flies?', 'adv.a2': 'Zero barrier', 'adv.d2': 'No equipment, no piloting, no licence.',
    'adv.q3': 'How does it shoot well?', 'adv.a3': 'AI end-to-end', 'adv.d3': 'Smart composition, light optimisation and scene-adaptive capture.',
    'adv.q4': 'What stays?', 'adv.a4': '3D Earth Atlas', 'adv.d4': 'Works pinned to real coordinates, revisitable across the journey.',
    'adv.q5': 'What else does it add?', 'adv.a5': 'LLM copywriting', 'adv.d5': 'Image intelligence that writes a bespoke poem and share copy.',

    'tech.eyebrow': 'Technology // FOUR LAYERS', 'tech.title': 'Four-layer stack',
    'tech.desc': 'Hardware automation, front-end visualisation, AI vision and an LLM work as one system. DeepSeek v4 supports front-end UI reverse engineering on the side.',
    'tech.h4': 'LLM layer', 'tech.p4': 'GLM-5.3-Flash understands the image and writes the caption, so every shot deserves a poem.',
    'tech.h3': 'AI vision layer', 'tech.p3': 'Scene recognition, smart composition and light optimisation make professional decisions before the shutter.',
    'tech.h2': 'Visualisation layer', 'tech.p2': 'A Three.js 3D Earth and a Blender-built high-precision globe cover mobile and cloud interfaces.',
    'tech.h1': 'Hardware automation', 'tech.p1': 'DJI FlightHub 2, industry drones and standardised docks handle dispatch and take-off/landing.',
    'tech.fig': '3D EARTH // every photo has real coordinates',
    'tech.stack': 'Stack // POWERED BY',

    'dock.eyebrow': 'Hardware // DJI DOCK SERIES', 'dock.title': 'DJI Dock series, unmanned in all weather',
    'dock.desc': 'We do not build aircraft. We hand flight to a mature industrial system. DJI FlightHub handles dispatch, route planning, remote monitoring and fleet management; the DJI Dock series and industry drones guarantee stable flight, image quality and all-weather operation.',
    'dock.s1': 'Dock weight', 'dock.s2': 'Ingress protection', 'dock.s3': 'Operating temp.', 'dock.s4': 'Max flight time', 'dock.s5': 'Operating radius',
    'dock.g1t': 'Product design', 'dock.g1s': 'Automated dock + Matrice 4D',
    'dock.g2t': 'Vehicle deployment', 'dock.g2s': 'Fixed and mobile modes',
    'dock.g3t': 'Environmental sensing', 'dock.g3s': 'Wind · rain · temperature · flooding',
    'dock.tableTitle': 'Dock 3 vs Dock 2', 'dock.col1': 'Spec',
    'dock.r1': 'Total weight', 'dock.r2': 'Ingress protection', 'dock.r3': 'Operating temperature', 'dock.r4': 'Max operating altitude',
    'dock.r5': 'Charging time', 'dock.r6': 'Supported aircraft', 'dock.r7': 'Video antennas', 'dock.r8': 'Cloud platform',
    'dock.note': 'Source: DJI Enterprise official specifications',
    'dock.m4d': '4/3 CMOS wide camera at 20 MP; medium-tele and tele cameras at 48 MP; 54 minutes of flight; laser ranging up to 1,800 m.',
    'dock.m4td': 'Adds a 640×512 thermal camera and near-infrared illuminator on top of the 4D for night and heat-anomaly inspection.',
    'dock.st1': 'Task dispatch', 'dock.st1v': 'Connected', 'dock.st2': 'Route planning', 'dock.st2v': 'Automatic',
    'dock.st3': 'Return & charge', 'dock.st3v': 'Self-managed', 'dock.st4': 'Environment sensing', 'dock.st4v': 'Wind / rain / flooding',
    'dock.verdict': 'Leave flight safety to a mature platform; our team focuses on experience and algorithms.',

    'self.eyebrow': 'In-House // TWO BUILDS', 'self.title': 'Front-end and 3D, both in-house',
    'self.desc': 'One solves how it is used; the other solves how it is seen. In-house work is not reinventing wheels — it is owning the moments that define the experience.',
    'self.aTag': 'FRONT-END ENGINEERING', 'self.aTitle': 'DeepSeek v4 front-end UI reverse engineering',
    'self.aDesc': 'We benchmark high-end visualisation products, decode their interface and interaction patterns, and adapt layouts across mobile and cloud — fixing slow iteration, poor responsiveness and stiff interactions.',
    'self.bTag': '3D MODELING', 'self.bTitle': 'Blender 3D Earth modelling',
    'self.bDesc': 'A high-precision globe with restored terrain textures lets photos pin by coordinates, classify by region and render along tracks; lightweight algorithms keep zoom, switching and search fluid.',

    'av.eyebrow': 'AI Vision // THREE ALGORITHMS', 'av.title': 'Zero barrier does not mean ordinary',
    'av.desc': 'Before the shutter, three algorithms have already made the professional decisions. The visitor just stands in the landscape.',
    'av.h1': 'Scene recognition', 'av.p1': 'Reads mountains, sea of clouds, sunset, urban coastline and cultural architecture, then matches the right shooting logic.',
    'av.h2': 'Smart composition', 'av.p2': 'A built-in photographic aesthetic model adapts golden-ratio, panoramic and portrait-fusion compositions.',
    'av.h3': 'Light optimisation', 'av.p3': 'Senses light intensity and angle in real time, adjusts parameters and grade while keeping the atmosphere.',
    'av.flow': 'Recognise → Compose → Expose', 'av.note': 'Three AI decisions before the shutter',

    'llm.eyebrow': 'LLM // GLM-5.3-FLASH', 'llm.title': 'Every aerial shot deserves a poem',
    'llm.desc': 'GLM-5.3-Flash first understands the image — landscape elements, light, mood and depth — then combines location, season and atmosphere to write classical verse, literary prose or healing short lines.',
    'llm.f1': 'Upload', 'llm.f1d': 'Originals return to cloud', 'llm.f2': 'Understand', 'llm.f2d': 'Elements, light and depth',
    'llm.f3': 'Write', 'llm.f3d': 'A bespoke caption in seconds',
    'llm.t1': 'Classical', 'llm.t2': 'Literary', 'llm.t3': 'Minimal', 'llm.t4': 'Healing',
    'llm.foot': 'SECONDS · MULTI-STYLE · PER PHOTO',
    'llm.poem': 'Clouds part, a thousand peaks emerge<br />Wind crosses, the lake lies still',
    'llm.style': 'Style', 'llm.styleV': 'Classical · seven-character', 'llm.scene': 'Scene', 'llm.sceneV': 'Cloud sea / mountains / sunrise', 'llm.time': 'Latency',

    'impact.eyebrow': 'Social Impact // PUBLIC CAPABILITY', 'impact.title': 'Make professional aerial imaging a public capability',
    'impact.desc': 'We are not just building a better camera. We are redistributing the ability to see a landscape. Once a dock network becomes scenic infrastructure, the beneficiaries go far beyond tourists.',
    'impact.h1': 'Visual equality', 'impact.p1': 'People without gear, skills or a licence can still own a professional view. Expression is no longer decided by budget and technique.',
    'impact.h2': 'Cultural tourism increment', 'impact.p2': 'Sites gain a consumable, shareable experience product that lengthens stays and turns visitors into high-quality storytellers.',
    'impact.h3': 'Geographic memory', 'impact.p3': 'Ordinary travel memories settle on real coordinates, becoming a revisitable, searchable, inheritable personal geographic archive.',
    'impact.h4': 'Public infrastructure', 'impact.p4': 'The same dock network can be reused off-peak for site inspection, emergency survey and ecological monitoring.',
    'impact.figT': 'Visual equality', 'impact.figS': 'Three generations · one sky',
    'impact.lvHead': 'Value layers',
    'impact.l1k': 'Individual', 'impact.l1v': 'From “cannot capture it” to “a professional aerial view with zero barrier”.',
    'impact.l2k': 'Scenic site', 'impact.l2v': 'From selling tickets to offering a shareable experience increment.',
    'impact.l3k': 'Society', 'impact.l3v': 'From a toy for the few to a callable public capability.',
    'impact.commitTag': 'Our boundaries',
    'impact.c1': 'Do not disturb: shooting never interrupts visitors or ecology', 'impact.c2': 'Do not overstep: airspace and privacy boundaries are strictly observed', 'impact.c3': 'Do not transfer the cost: remove the barrier instead of charging for it',

    'esg.eyebrow': 'Sustainability & Governance // ESG', 'esg.title': 'Build growth on sustainability and compliance',
    'esg.desc': 'A shared dock is inherently lighter than one drone per person. We extend that structural advantage into checkable environmental, social and governance commitments.',
    'esg.eTitle': 'Environment',
    'esg.e1': 'Sharing over buying: one dock serves many, reducing idle drones and discarded batteries.',
    'esg.e2': 'Low-carbon energy: solar panels on the dock lid explore PV-assisted power and storage scheduling.',
    'esg.e3': 'Leave-no-trace capture: fixed routes, no landing, no trampling, less disturbance to vegetation and terrain.',
    'esg.e4': 'Digital first: electronic albums and cloud replay reduce physical prints and materials.',
    'esg.sTitle': 'Social',
    'esg.s1': 'Visual equality: professional travel imagery for seniors, children and people with disabilities.',
    'esg.s2': 'Accessibility: large type, low-learning-cost interaction and voice guidance.',
    'esg.s3': 'Youth science: docks and aerial algorithms become a visitable, explainable tech classroom.',
    'esg.s4': 'Local jobs: site operations, dock inspection and content roles prioritise local hiring.',
    'esg.gTitle': 'Governance',
    'esg.g1': 'Airspace compliance: fixed sites, real-name flight and unified filing. No illegal flights.',
    'esg.g2': 'Data minimisation: only coordinates and parameters required by the work, with one-tap deletion.',
    'esg.g3': 'Privacy: automatic blurring of people and sensitive areas; shooting zones are publicly visible.',
    'esg.g4': 'Supply chain: DJI enterprise hardware and official cloud platforms, fully traceable.',
    'esg.figT': 'Shared · low-carbon · leave-no-trace', 'esg.figS': 'Solar lid · fixed routes · zero disturbance',
    'esg.t1k': 'Compliance target', 'esg.t1v': '100% airspace filing', 'esg.t2k': 'Safety target', 'esg.t2v': '0 violations',
    'esg.t3k': 'Data target', 'esg.t3v': 'Queryable · deletable', 'esg.t4k': 'Disclosure target', 'esg.t4v': 'Annual impact brief',
    'esg.note': 'These are operating targets and commitments, not completed third-party certifications.',

    'roll.eyebrow': 'Rollout // PATH', 'roll.title': 'From one pilot to a network',
    'roll.h1': 'Scenic pilot', 'roll.p1': 'Deploy the first smart dock at a core scenic site and close the loop of booking, capture and return.',
    'roll.h2': 'Multi-site replication', 'roll.p2': 'Replicate the playbook across more sites with standardised docks and unified airspace control.',
    'roll.h3': 'City & cultural network', 'roll.p3': 'Connect cities and cultural destinations, turning sky perspectives into callable infrastructure.',

    'tel.eyebrow': 'By the Numbers // KEY FIGURES',
    'tel.k1': 'travel barriers', 'tel.k2': 'vision algorithms', 'tel.k3': 'core technologies', 'tel.k4': 'always on standby',

    'close.eyebrow': 'Vision // THE VISION', 'close.title': 'Make the sky<br />an infrastructure.',
    'close.sub': 'For every landscape, a dedicated sky view; for everyone, a professional aerial shot with zero barriers. From a scenic pilot, to multi-site replication, to a city and cultural network — we want to give the sky to everyone.',
    'close.btn1': 'Revisit the product', 'close.btn2': 'Browse the atlas',

    'footer.tag': 'AI-integrated drone dock & aerial platform', 'footer.ver': 'V. 2.1 — SKY AS INFRASTRUCTURE'
  }
};

let currentLang = 'zh';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = i18n[lang][el.getAttribute('data-i18n')];
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = i18n[lang][el.getAttribute('data-i18n-html')];
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  try { localStorage.setItem('aerolens-lang', lang); } catch (e) {}
}

/* ---- scroll reveal ---- */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---- counter ---- */
function animateCounter(el, target, suffix) {
  const dur = 1600, start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(performance.now());
}
function initCounters() {
  const tel = document.querySelector('#numbers');
  if (!tel) return;
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(el =>
        animateCounter(el, parseInt(el.dataset.count, 10), el.dataset.suffix || ''));
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(tel);
}

/* ---- init ---- */
document.addEventListener('DOMContentLoaded', () => {
  let saved = 'zh';
  try { saved = localStorage.getItem('aerolens-lang') || 'zh'; } catch (e) {}
  applyLang(saved);
  initReveal();
  initCounters();
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.addEventListener('click', () => applyLang(b.dataset.lang)));
});