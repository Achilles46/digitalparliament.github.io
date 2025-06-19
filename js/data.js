// 测试模块数据
const MODULES = [
    {
        id: 'politics',
        name: '核心政治模块',
        icon: '🏛️',
        estimatedTime: '8-10分钟',
        questionCount: 10,
        description: '探讨政治权力结构、民主制度、政党制度等核心政治议题'
    },
    {
        id: 'economy',
        name: '经济制度模块',
        icon: '💰',
        estimatedTime: '6-8分钟',
        questionCount: 8,
        description: '涵盖所有制、市场经济、收入分配、宏观调控等经济议题'
    },
    {
        id: 'rights',
        name: '人权自由模块',
        icon: '⚖️',
        estimatedTime: '6-8分钟',
        questionCount: 8,
        description: '关注言论自由、司法独立、个人权利与集体权利平衡'
    }
];

// 题库数据
const QUESTIONS = {
    politics: [
        {
            id: 'pol_001',
            type: 'choice',
            category: 'power_structure',
            question: '您认为当前中国的政治权力结构存在哪些核心问题？',
            options: [
                {
                    text: '应该进一步加强党的集中统一领导，提高决策效率',
                    score: 5,
                    tendency: 'left'
                },
                {
                    text: '现行体制基本合理，主要是执行和监督层面需要完善',
                    score: 3,
                    tendency: 'center_left'
                },
                {
                    text: '需要在现有框架内扩大民主参与，完善制衡机制',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '应该大幅扩大人大、司法等机构的独立性和权力',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '需要根本性的政治体制改革，建立三权分立体系',
                    score: -5,
                    tendency: 'right'
                }
            ],
            weight: 1.2
        },
        {
            id: 'pol_002',
            type: 'likert',
            category: 'democracy',
            question: '民主集中制是最适合中国的政治制度',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.0
        },
        {
            id: 'pol_003',
            type: 'choice',
            category: 'corruption',
            question: '您如何看待当前的反腐败斗争和权力监督机制？',
            options: [
                {
                    text: '反腐力度很大，当前做法已经很有效',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '反腐成效显著，但制度性防腐机制仍需完善',
                    score: 2,
                    tendency: 'center_left'
                },
                {
                    text: '媒体监督、公民监督的空间应该进一步扩大',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '主要依靠政治意志，缺乏独立的监督机构',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '应该建立更加透明的财产申报和司法独立制度',
                    score: -4,
                    tendency: 'right'
                }
            ],
            weight: 1.1
        },
        {
            id: 'pol_004',
            type: 'likert',
            category: 'participation',
            question: '普通公民应该有更多机会直接参与重大政治决策',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.0
        },
        {
            id: 'pol_005',
            type: 'choice',
            category: 'media',
            question: '您如何看待当前中国的媒体环境和信息传播？',
            options: [
                {
                    text: '媒体应该更好地服务党和人民事业，当前方向正确',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '适度的媒体管理是必要的，避免了西方式的信息混乱',
                    score: 2,
                    tendency: 'center_left'
                },
                {
                    text: '在维护稳定与保障自由之间需要找到更好平衡',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '政府信息公开程度不够，应该扩大公民知情权',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '媒体监管过严，应该保障充分的新闻和言论自由',
                    score: -4,
                    tendency: 'right'
                }
            ],
            weight: 1.1
        },
        {
            id: 'pol_006',
            type: 'likert',
            category: 'stability',
            question: '政治稳定比政治民主更重要',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.2
        },
        {
            id: 'pol_007',
            type: 'choice',
            category: 'reform',
            question: '您认为中国下一步政治改革应该重点关注什么？',
            options: [
                {
                    text: '进一步加强党的建设，提高执政能力',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '完善人民代表大会制度，加强人大监督职能',
                    score: 1,
                    tendency: 'center_left'
                },
                {
                    text: '扩大基层民主，增强公民政治参与',
                    score: -1,
                    tendency: 'center'
                },
                {
                    text: '推进司法独立，建立权力制衡机制',
                    score: -3,
                    tendency: 'center_right'
                },
                {
                    text: '实现多党竞争，建立民主选举制度',
                    score: -5,
                    tendency: 'right'
                }
            ],
            weight: 1.3
        },
        {
            id: 'pol_008',
            type: 'likert',
            category: 'leadership',
            question: '中国共产党的领导是中国特色社会主义最本质的特征',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.5
        },
        {
            id: 'pol_009',
            type: 'choice',
            category: 'governance',
            question: '在重大决策制定过程中，最重要的考虑因素应该是什么？',
            options: [
                {
                    text: '党的意志和人民的根本利益',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '专家论证和科学决策',
                    score: 2,
                    tendency: 'center_left'
                },
                {
                    text: '民意调查和公众参与',
                    score: -1,
                    tendency: 'center'
                },
                {
                    text: '人大审议和民主程序',
                    score: -3,
                    tendency: 'center_right'
                },
                {
                    text: '多方博弈和妥协平衡',
                    score: -4,
                    tendency: 'right'
                }
            ],
            weight: 1.2
        },
        {
            id: 'pol_010',
            type: 'likert',
            category: 'system',
            question: '中国的政治制度比西方民主制度更具优越性',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.4
        }
    ],
    
    economy: [
        {
            id: 'eco_001',
            type: 'choice',
            category: 'ownership',
            question: '您认为中国当前的所有制结构存在什么根本性问题？',
            options: [
                {
                    text: '公有制比重下降过快，应该重新国有化重要产业',
                    score: 5,
                    tendency: 'left'
                },
                {
                    text: '公有制主体地位很好，但需要加强国有资产管理',
                    score: 3,
                    tendency: 'center_left'
                },
                {
                    text: '现在的公私并存格局基本合理，需要优化管理',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '国有企业效率低下，应该大幅推进私有化改革',
                    score: -3,
                    tendency: 'center_right'
                },
                {
                    text: '应该全面私有化，让市场完全主导资源配置',
                    score: -5,
                    tendency: 'right'
                }
            ],
            weight: 1.3
        },
        {
            id: 'eco_002',
            type: 'likert',
            category: 'market',
            question: '市场应该在资源配置中起决定性作用',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.2
        },
        {
            id: 'eco_003',
            type: 'choice',
            category: 'inequality',
            question: '面对当前的收入差距问题，您认为最重要的解决方案是什么？',
            options: [
                {
                    text: '大幅提高税收，强化政府再分配功能',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '完善社会保障制度，加大转移支付力度',
                    score: 2,
                    tendency: 'center_left'
                },
                {
                    text: '通过教育和技能培训提高劳动者收入',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '减少政府干预，让市场自然调节收入分配',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '降低税负，激发企业活力带动就业增长',
                    score: -4,
                    tendency: 'right'
                }
            ],
            weight: 1.2
        },
        {
            id: 'eco_004',
            type: 'likert',
            category: 'welfare',
            question: '政府应该提供全民免费的医疗和教育服务',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.1
        },
        {
            id: 'eco_005',
            type: 'choice',
            category: 'regulation',
            question: '您如何看待政府对经济的干预程度？',
            options: [
                {
                    text: '政府应该加强对经济的统一规划和调控',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '在关键领域保持国家调控，其他交给市场',
                    score: 2,
                    tendency: 'center_left'
                },
                {
                    text: '政府主要负责维护市场秩序和公平竞争',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '尽量减少政府干预，让市场自由运作',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '政府应该完全退出经济活动，实现最小政府',
                    score: -4,
                    tendency: 'right'
                }
            ],
            weight: 1.2
        },
        {
            id: 'eco_006',
            type: 'likert',
            category: 'labor',
            question: '工会应该有更强的集体谈判权来保护劳动者利益',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.1
        },
        {
            id: 'eco_007',
            type: 'choice',
            category: 'development',
            question: '在经济发展战略上，您认为应该优先考虑什么？',
            options: [
                {
                    text: '实现共同富裕，缩小贫富差距',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '提高经济效率，做大蛋糕再分配',
                    score: 1,
                    tendency: 'center_left'
                },
                {
                    text: '平衡效率与公平，协调发展',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '优先发展效率，通过竞争促进繁荣',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '追求最大经济自由，减少一切限制',
                    score: -4,
                    tendency: 'right'
                }
            ],
            weight: 1.3
        },
        {
            id: 'eco_008',
            type: 'likert',
            category: 'globalization',
            question: '经济全球化总体上有利于中国发展',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.0
        }
    ],
    
    rights: [
        {
            id: 'rights_001',
            type: 'choice',
            category: 'speech',
            question: '您如何看待言论自由与社会稳定的关系？',
            options: [
                {
                    text: '社会稳定更重要，应该严格管理有害言论',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '在确保基本稳定前提下适度放宽言论空间',
                    score: 2,
                    tendency: 'center_left'
                },
                {
                    text: '两者可以平衡，关键是制定合理的界限',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '言论自由是基本权利，限制应该非常谨慎',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '言论自由不应受到任何形式的限制',
                    score: -4,
                    tendency: 'right'
                }
            ],
            weight: 1.3
        },
        {
            id: 'rights_002',
            type: 'likert',
            category: 'privacy',
            question: '为了国家安全，个人隐私权可以适当让步',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.2
        },
        {
            id: 'rights_003',
            type: 'choice',
            category: 'justice',
            question: '您认为中国司法体系面临的最大问题是什么？',
            options: [
                {
                    text: '司法应该更好地服务于党和人民事业',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '当前司法改革方向正确，需要完善而不是颠覆',
                    score: 2,
                    tendency: 'center_left'
                },
                {
                    text: '需要在司法专业化和政治性之间找到平衡',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '司法独立性不足，应该大幅减少行政干预',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '应该建立完全独立的司法体系',
                    score: -4,
                    tendency: 'right'
                }
            ],
            weight: 1.3
        },
        {
            id: 'rights_004',
            type: 'likert',
            category: 'equality',
            question: '法律面前人人平等在中国得到了很好的实现',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.2
        },
        {
            id: 'rights_005',
            type: 'choice',
            category: 'religion',
            question: '您如何评价中国的宗教信仰自由政策？',
            options: [
                {
                    text: '当前政策基本合理，维护了宗教领域的稳定',
                    score: 3,
                    tendency: 'left'
                },
                {
                    text: '宗教中国化方向正确，但推进方式需要改进',
                    score: 1,
                    tendency: 'center_left'
                },
                {
                    text: '宗教与政治分离政策是正确的，但执行中有偏差',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '对某些宗教的政策存在歧视性，需要更加平等',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '宗教管理过严，信仰自由受到不当限制',
                    score: -3,
                    tendency: 'right'
                }
            ],
            weight: 1.1
        },
        {
            id: 'rights_006',
            type: 'likert',
            category: 'collective',
            question: '集体利益应该优先于个人权利',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.2
        },
        {
            id: 'rights_007',
            type: 'choice',
            category: 'assembly',
            question: '您如何看待公民集会和结社的权利？',
            options: [
                {
                    text: '应该严格管理，防止被外部势力利用',
                    score: 4,
                    tendency: 'left'
                },
                {
                    text: '在法律框架内允许，但要加强监督',
                    score: 2,
                    tendency: 'center_left'
                },
                {
                    text: '公民有基本的集会结社权，应该依法保障',
                    score: 0,
                    tendency: 'center'
                },
                {
                    text: '应该扩大公民结社空间，促进公民社会发展',
                    score: -2,
                    tendency: 'center_right'
                },
                {
                    text: '集会结社是基本人权，不应受到限制',
                    score: -4,
                    tendency: 'right'
                }
            ],
            weight: 1.2
        },
        {
            id: 'rights_008',
            type: 'likert',
            category: 'minority',
            question: '少数群体的权利应该得到特殊保护',
            scale: 7,
            leftLabel: '完全不同意',
            rightLabel: '完全同意',
            weight: 1.1
        }
    ]
};

// 政治光谱分类
const POLITICAL_SPECTRUM = {
    left: { name: '左派倾向', color: '#e74c3c', range: [20, 100] },
    center_left: { name: '中左倾向', color: '#f39c12', range: [5, 19] },
    center: { name: '中间派', color: '#2ecc71', range: [-4, 4] },
    center_right: { name: '中右倾向', color: '#3498db', range: [-19, -5] },
    right: { name: '右派倾向', color: '#9b59b6', range: [-100, -20] }
};

// 导出数据（兼容浏览器环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MODULES, QUESTIONS, POLITICAL_SPECTRUM };
} 