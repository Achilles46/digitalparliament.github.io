// 应用主类
class PoliticalTestApp {
    constructor() {
        this.selectedModules = [];
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.currentState = 'module_selection'; // module_selection, quiz, results
        
        this.init();
    }

    init() {
        this.renderModuleSelection();
    }

    // 渲染模块选择界面
    renderModuleSelection() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="container fade-in">
                <div class="module-selector">
                    <h2>🍽️ 选择您感兴趣的测试模块</h2>
                    <p>请至少选择一个模块开始测试</p>
                    
                    <div class="module-grid">
                        ${MODULES.map(module => `
                            <div class="module-card" data-module-id="${module.id}" onclick="app.toggleModule('${module.id}')">
                                <div class="module-icon">${module.icon}</div>
                                <h3>${module.name}</h3>
                                <p>预计用时：${module.estimatedTime}</p>
                                <span class="question-count">${module.questionCount}题</span>
                                <div class="module-description">${module.description}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="selection-summary">
                        <p>已选择 <span id="selected-count">0</span> 个模块，预计用时 <span id="estimated-time">0</span> 分钟</p>
                    </div>
                    
                    <button class="btn btn-success start-test-btn" onclick="app.startTest()" disabled>
                        开始测试
                    </button>
                </div>
            </div>
        `;
    }

    // 切换模块选择
    toggleModule(moduleId) {
        const moduleCard = document.querySelector(`[data-module-id="${moduleId}"]`);
        
        if (this.selectedModules.includes(moduleId)) {
            // 取消选择
            this.selectedModules = this.selectedModules.filter(id => id !== moduleId);
            moduleCard.classList.remove('selected');
        } else {
            // 选择模块
            this.selectedModules.push(moduleId);
            moduleCard.classList.add('selected');
        }
        
        this.updateSelectionSummary();
    }

    // 更新选择摘要
    updateSelectionSummary() {
        const selectedCount = this.selectedModules.length;
        const totalTime = this.selectedModules.reduce((total, moduleId) => {
            const module = MODULES.find(m => m.id === moduleId);
            const avgTime = parseInt(module.estimatedTime.split('-')[0]);
            return total + avgTime;
        }, 0);

        document.getElementById('selected-count').textContent = selectedCount;
        document.getElementById('estimated-time').textContent = totalTime;
        
        const startBtn = document.querySelector('.start-test-btn');
        if (selectedCount > 0) {
            startBtn.disabled = false;
            startBtn.classList.remove('btn-secondary');
            startBtn.classList.add('btn-success');
        } else {
            startBtn.disabled = true;
            startBtn.classList.remove('btn-success');
            startBtn.classList.add('btn-secondary');
        }
    }

    // 开始测试
    startTest() {
        if (this.selectedModules.length === 0) {
            alert('请至少选择一个测试模块');
            return;
        }

        // 构建题目列表
        this.currentQuestions = [];
        this.selectedModules.forEach(moduleId => {
            const moduleQuestions = QUESTIONS[moduleId] || [];
            moduleQuestions.forEach(question => {
                this.currentQuestions.push({
                    ...question,
                    moduleId: moduleId
                });
            });
        });

        // 随机打乱题目顺序
        this.shuffleArray(this.currentQuestions);
        
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.currentState = 'quiz';
        
        this.renderQuiz();
    }

    // 随机打乱数组
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // 渲染答题界面
    renderQuiz() {
        const mainContent = document.getElementById('main-content');
        const question = this.currentQuestions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex + 1) / this.currentQuestions.length) * 100;

        mainContent.innerHTML = `
            <div class="container fade-in">
                <div class="quiz-container">
                    <div class="quiz-progress">
                        <div class="quiz-progress-bar" style="width: ${progress}%"></div>
                    </div>
                    
                    <div class="quiz-info">
                        <span>第 ${this.currentQuestionIndex + 1} / ${this.currentQuestions.length} 题</span>
                        <span>${MODULES.find(m => m.id === question.moduleId)?.name || '未知模块'}</span>
                    </div>
                    
                    <div class="question-card">
                        <span class="question-type">${this.getQuestionTypeLabel(question.type)}</span>
                        <h3 class="question-title">${question.question}</h3>
                        
                        <div class="options-container">
                            ${this.renderQuestionOptions(question)}
                        </div>
                    </div>
                    
                    <div class="quiz-navigation">
                        <button class="btn btn-secondary" onclick="app.previousQuestion()" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                            上一题
                        </button>
                        
                        <button class="btn btn-primary" onclick="app.nextQuestion()" id="next-btn" disabled>
                            ${this.currentQuestionIndex === this.currentQuestions.length - 1 ? '查看结果' : '下一题'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        // 检查是否已有答案
        this.checkCurrentAnswer();
    }

    // 获取题目类型标签
    getQuestionTypeLabel(type) {
        const labels = {
            'choice': '单选题',
            'likert': '量表题',
            'ranking': '排序题',
            'scenario': '情景题',
            'open': '开放题'
        };
        return labels[type] || '问题';
    }

    // 渲染题目选项
    renderQuestionOptions(question) {
        if (question.type === 'choice') {
            return question.options.map((option, index) => `
                <div class="option" onclick="app.selectOption('${question.id}', ${index})">
                    <input type="radio" name="q_${question.id}" value="${index}" id="opt_${question.id}_${index}">
                    <label for="opt_${question.id}_${index}" class="option-text">${option.text}</label>
                </div>
            `).join('');
        } else if (question.type === 'likert') {
            const scale = question.scale || 7;
            const options = [];
            
            for (let i = 1; i <= scale; i++) {
                options.push(`
                    <div class="likert-option" onclick="app.selectLikert('${question.id}', ${i})">
                        <input type="radio" name="q_${question.id}" value="${i}" id="likert_${question.id}_${i}">
                        <div class="likert-label">${i}</div>
                    </div>
                `);
            }
            
            return `
                <div class="likert-scale">
                    ${options.join('')}
                </div>
                <div class="likert-endpoints">
                    <span>${question.leftLabel || '完全不同意'}</span>
                    <span>${question.rightLabel || '完全同意'}</span>
                </div>
            `;
        }
        
        return '<p>暂不支持此题目类型</p>';
    }

    // 选择选项
    selectOption(questionId, optionIndex) {
        this.userAnswers[questionId] = {
            type: 'choice',
            value: optionIndex
        };
        
        // 更新UI
        document.querySelectorAll(`input[name="q_${questionId}"]`).forEach(input => {
            input.checked = false;
        });
        
        document.getElementById(`opt_${questionId}_${optionIndex}`).checked = true;
        
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        document.querySelectorAll('.option')[optionIndex].classList.add('selected');
        
        document.getElementById('next-btn').disabled = false;
    }

    // 选择李克特量表选项
    selectLikert(questionId, value) {
        this.userAnswers[questionId] = {
            type: 'likert',
            value: value
        };
        
        // 更新UI
        document.querySelectorAll(`input[name="q_${questionId}"]`).forEach(input => {
            input.checked = false;
        });
        
        document.getElementById(`likert_${questionId}_${value}`).checked = true;
        
        document.querySelectorAll('.likert-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector(`#likert_${questionId}_${value}`).parentElement.classList.add('selected');
        
        document.getElementById('next-btn').disabled = false;
    }

    // 检查当前题目是否已答
    checkCurrentAnswer() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        const answer = this.userAnswers[question.id];
        
        if (answer) {
            if (answer.type === 'choice') {
                document.getElementById(`opt_${question.id}_${answer.value}`).checked = true;
                document.querySelectorAll('.option')[answer.value].classList.add('selected');
            } else if (answer.type === 'likert') {
                document.getElementById(`likert_${question.id}_${answer.value}`).checked = true;
                document.querySelector(`#likert_${question.id}_${answer.value}`).parentElement.classList.add('selected');
            }
            document.getElementById('next-btn').disabled = false;
        }
    }

    // 上一题
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuiz();
        }
    }

    // 下一题
    nextQuestion() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        
        if (!this.userAnswers[question.id]) {
            alert('请先回答当前问题');
            return;
        }

        if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuiz();
        } else {
            this.showResults();
        }
    }

    // 显示结果
    showResults() {
        this.currentState = 'results';
        
        const scores = this.calculateScores();
        const position = this.calculatePosition(scores.total);
        
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="container fade-in">
                <div class="results-container">
                    <div class="results-header">
                        <h2>🎯 您的政治观点分析结果</h2>
                        <div class="political-position">${position.name}</div>
                        <p>总分：${scores.total.toFixed(1)} 分</p>
                    </div>
                    
                    <div class="spectrum-visualization">
                        <h3>政治光谱定位</h3>
                        <div class="spectrum-bar">
                            <div class="spectrum-pointer" style="left: ${this.getSpectrumPosition(scores.total)}%">
                                ${this.getPositionEmoji(position.name)}
                            </div>
                        </div>
                        <div class="spectrum-labels">
                            <span>左派</span>
                            <span>中左</span>
                            <span>中间</span>
                            <span>中右</span>
                            <span>右派</span>
                        </div>
                    </div>
                    
                    <div class="score-display">
                        ${this.renderModuleScores(scores)}
                    </div>
                    
                    <div class="results-actions">
                        <button class="btn btn-primary" onclick="app.restart()">重新测试</button>
                        <button class="btn btn-secondary" onclick="app.shareResults()">分享结果</button>
                        <button class="btn btn-secondary" onclick="app.downloadResults()">下载报告</button>
                    </div>
                </div>
            </div>
        `;
    }

    // 计算分数
    calculateScores() {
        const moduleScores = {};
        let totalScore = 0;
        let totalWeight = 0;

        // 初始化模块分数
        this.selectedModules.forEach(moduleId => {
            moduleScores[moduleId] = { score: 0, weight: 0, count: 0 };
        });

        // 计算每个答案的分数
        Object.keys(this.userAnswers).forEach(questionId => {
            const question = this.currentQuestions.find(q => q.id === questionId);
            const answer = this.userAnswers[questionId];
            
            let score = 0;
            
            if (answer.type === 'choice') {
                score = question.options[answer.value].score;
            } else if (answer.type === 'likert') {
                // 李克特量表：1-7转换为-3到+3
                const scale = question.scale || 7;
                const midpoint = (scale + 1) / 2;
                score = (answer.value - midpoint) * (6 / (scale - 1));
            }
            
            const weight = question.weight || 1;
            const weightedScore = score * weight;
            
            // 累加到模块分数
            if (moduleScores[question.moduleId]) {
                moduleScores[question.moduleId].score += weightedScore;
                moduleScores[question.moduleId].weight += weight;
                moduleScores[question.moduleId].count += 1;
            }
            
            totalScore += weightedScore;
            totalWeight += weight;
        });

        // 计算最终分数
        const finalScore = totalWeight > 0 ? totalScore / totalWeight : 0;
        
        // 计算模块平均分数
        Object.keys(moduleScores).forEach(moduleId => {
            const moduleData = moduleScores[moduleId];
            if (moduleData.weight > 0) {
                moduleData.averageScore = moduleData.score / moduleData.weight;
            } else {
                moduleData.averageScore = 0;
            }
        });

        return {
            total: finalScore,
            modules: moduleScores
        };
    }

    // 计算政治立场
    calculatePosition(score) {
        for (const [key, position] of Object.entries(POLITICAL_SPECTRUM)) {
            if (score >= position.range[0] && score <= position.range[1]) {
                return { ...position, key };
            }
        }
        return POLITICAL_SPECTRUM.center;
    }

    // 获取光谱位置百分比
    getSpectrumPosition(score) {
        // 将-5到+5的分数映射到0-100%
        return Math.max(0, Math.min(100, ((score + 5) / 10) * 100));
    }

    // 获取立场表情符号
    getPositionEmoji(positionName) {
        const emojis = {
            '左派倾向': '🔴',
            '中左倾向': '🟡',
            '中间派': '🟢',
            '中右倾向': '🔵',
            '右派倾向': '🟣'
        };
        return emojis[positionName] || '⚪';
    }

    // 渲染模块分数
    renderModuleScores(scores) {
        return this.selectedModules.map(moduleId => {
            const module = MODULES.find(m => m.id === moduleId);
            const moduleScore = scores.modules[moduleId];
            const position = this.calculatePosition(moduleScore.averageScore);
            
            return `
                <div class="score-card">
                    <h3>${module.icon} ${module.name}</h3>
                    <div class="score-number" style="color: ${position.color}">
                        ${moduleScore.averageScore.toFixed(1)}
                    </div>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${this.getSpectrumPosition(moduleScore.averageScore)}%; background-color: ${position.color}"></div>
                    </div>
                    <p>${position.name}</p>
                    <small>基于 ${moduleScore.count} 个问题</small>
                </div>
            `;
        }).join('');
    }

    // 重新开始
    restart() {
        this.selectedModules = [];
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.currentState = 'module_selection';
        
        this.renderModuleSelection();
    }

    // 分享结果
    shareResults() {
        const scores = this.calculateScores();
        const position = this.calculatePosition(scores.total);
        
        const shareText = `我刚完成了政治经济学观点测试，结果是：${position.name}（${scores.total.toFixed(1)}分）。快来测测你的政治立场吧！`;
        
        if (navigator.share) {
            navigator.share({
                title: '政治经济学观点测试结果',
                text: shareText,
                url: window.location.href
            });
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(shareText).then(() => {
                alert('结果已复制到剪贴板！');
            }).catch(() => {
                alert('分享文本：\n' + shareText);
            });
        }
    }

    // 下载结果
    downloadResults() {
        const scores = this.calculateScores();
        const position = this.calculatePosition(scores.total);
        const timestamp = new Date().toISOString().split('T')[0];
        
        let report = `政治经济学观点测试报告\n`;
        report += `生成时间：${timestamp}\n\n`;
        report += `整体结果：${position.name}\n`;
        report += `总分：${scores.total.toFixed(1)}\n\n`;
        
        report += `各模块得分：\n`;
        this.selectedModules.forEach(moduleId => {
            const module = MODULES.find(m => m.id === moduleId);
            const moduleScore = scores.modules[moduleId];
            const modulePosition = this.calculatePosition(moduleScore.averageScore);
            
            report += `${module.name}：${moduleScore.averageScore.toFixed(1)} (${modulePosition.name})\n`;
        });
        
        const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `政治观点测试报告_${timestamp}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new PoliticalTestApp();
}); 