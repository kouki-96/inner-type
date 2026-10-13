import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Helper for Gemini call with retries and model fallback on 503 / high demand
async function generateGeminiWithRetry(ai: GoogleGenAI, prompt: string, temperature = 0.75): Promise<string> {
  const models = ['gemini-2.5-flash', 'gemini-3.8-flash', 'gemini-2.5-pro'];
  let lastError: unknown = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: { temperature },
        });
        if (response.text) {
          return response.text;
        }
      } catch (err: unknown) {
        lastError = err;
        console.warn(`[Gemini Plugin Retry] Model ${model} attempt ${attempt + 1} failed:`, err instanceof Error ? err.message : err);
        await new Promise(res => setTimeout(res, 1000));
      }
    }
  }

  throw lastError || new Error('現在AIモデルが混雑しております。時間をおいて再試行してください。');
}

// Custom Vite plugin for server-side Gemini API endpoints
function expressGeminiPlugin(): Plugin {
  return {
    name: 'express-gemini-middleware',
    configureServer(server) {
      server.middlewares.use('/api/gemini/deep-reading', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const {
              personalityName,
              tagline,
              categoryTag,
              customStatus,
              profile,
              testMode,
              aiPromptText,
            } = JSON.parse(body || '{}');

            const ai = new GoogleGenAI({
              apiKey: process.env.GEMINI_API_KEY,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const birthPlace = profile?.birthPlace || '指定なし';
            const relationshipStatus = profile?.relationshipStatus || '指定なし';

            const prompt = aiPromptText ? `
あなたはいま世界で最も信頼されている西洋占星術師・臨床心理アナリストです。
以下のユーザーの【詳細診断プロファイル】および【行動心理スコア】を元に、この方の本質・恋愛運・キャリア・将来の展望を網羅した最高精度の「深層精密鑑定レポート」を作成してください。

${aiPromptText}

【補足精密データ】
・出生地: ${birthPlace}
・現在の恋愛ステータス: ${relationshipStatus}
・診断モード: ${testMode === 'gradient' ? '5段階グラデーション精密診断' : 'クイックシチュエーション診断'}

【鑑定回答フォーマット】
以下の5つの項目（【】付きの見出し）で、丁寧かつ深みのある日本語（敬体・占い×心理学のソリッドで神秘的なトーン）で600〜800文字程度で執筆してください。

【1. あなたの宿命と本質の輝き】
（生年月日・12星座エレメントと性格タイプから紐解く、本人がまだ気づいていない真の強み・隠された才能）

【2. 心理ステータスと現在のバランス分析】
（論理${customStatus?.logic}pt/行動${customStatus?.action}pt/共感${customStatus?.empathy}pt/創造${customStatus?.creativity}pt/安定${customStatus?.stability}pt の数値から見る現在の心理状態と注意すべき盲点）

【3. 恋愛・パートナーシップの未来展開】
（現在の恋愛ステータス「${relationshipStatus}」をふまえた、惹かれやすいお相手・今後の恋愛展開・運命の出会いや愛を深めるための具体的アドバイス）

【4. 仕事・キャリアでの飛躍アクション】
（最大の成果を出すための働き方・職場で一目置かれるコツ）

【5. あなたへの問いかけ】
（より深い気づきを得るためのメッセージと、自分自身に問いかけるべき質問1つ）
` : `
あなたはいま世界で最も信頼されている西洋占星術師・心理アナリストです。
以下の心理・行動パターン分析結果に基づき、この方の性格特性とアドバイス（深層アドバイスレポート）を執筆してください。

【診断情報】
・性格タイプ：${personalityName || '未設定'}
・キャッチコピー：${tagline || ''}
・分類：${categoryTag || ''}
・スコア：論理的思考${customStatus?.logic}%, 行動性${customStatus?.action}%, 協調性${customStatus?.empathy}%, 創造性${customStatus?.creativity}%, 安定性${customStatus?.stability}%

【回答フォーマット】
以下の3つの見出し（【】で囲む）で、分かりやすく丁寧な日本語（敬体）で書いてください。
1. 【あなたの本質的な強み】
2. 【気をつけたい注意点】
3. 【これからを充実させるアドバイス】
`;

            const readingText = await generateGeminiWithRetry(ai, prompt, 0.75);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, reading: readingText }));
          } catch (err: unknown) {
            console.error('Gemini Middleware Error:', err);
            const msg = err instanceof Error ? err.message : 'Unknown error';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: msg }));
          }
        });
      });

      server.middlewares.use('/api/gemini/compatibility', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const { myName, myPersonality, targetName, targetPersonality } = JSON.parse(body || '{}');

            const ai = new GoogleGenAI({
              apiKey: process.env.GEMINI_API_KEY,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const prompt = `
あなたはいま信頼されている人間関係アドバイザーです。
以下の2人の性格タイプをもとに、お互いの相性と人間関係・仕事での関わり方のアドバイスを作成してください。

【ご自身】
・お名前：${myName || '自分'}（${myPersonality}）

【お相手】
・お名前：${targetName || 'お相手'}（${targetPersonality}）

【回答フォーマット】
以下の構成で、分かりやすく前向きなトーンで作成してください（250〜350文字）。
・相性度：85% （80%〜98%の範囲で算出）
・【お二人の関係の強み】：一緒にいることで生まれるメリット
・【すれ違いを防ぐポイント】：お互いの違いを理解するための注意点
・【関係を良くする具体的コツ】：明日から使えるコミュニケーション方法
`;

            const compatibilityText = await generateGeminiWithRetry(ai, prompt, 0.7);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, compatibility: compatibilityText }));
          } catch (err: unknown) {
            console.error('Gemini Middleware Error:', err);
            const msg = err instanceof Error ? err.message : 'Unknown error';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: msg }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), expressGeminiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
