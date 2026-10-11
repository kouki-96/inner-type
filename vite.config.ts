import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

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
            const { personalityName, tagline, categoryTag, status } = JSON.parse(body || '{}');

            const ai = new GoogleGenAI({
              apiKey: process.env.GEMINI_API_KEY,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const prompt = `
あなたは経験豊富な心理カウンセラーであり、性格診断アナリストです。
以下の心理・行動パターン分析結果に基づき、この方の性格特性とアドバイス（深層アドバイスレポート）を執筆してください。

【診断情報】
・性格タイプ：${personalityName || '未設定'}
・キャッチコピー：${tagline || ''}
・分類：${categoryTag || ''}
・スコア：論理的思考${status?.logic}%, 行動性${status?.action}%, 協調性${status?.empathy}%, 創造性${status?.creativity}%, 安定性${status?.stability}%

【回答フォーマット】
以下の3つの見出し（【】で囲む）で、分かりやすく丁寧な日本語（敬体）で書いてください。総文字数は300〜400文字程度。
1. 【あなたの本質的な強み】（仕事や人間関係で発揮される最大の長所）
2. 【気をつけたい注意点】（ストレス時や無意識に出やすい行動のクセ）
3. 【これからを充実させるアドバイス】（明日から意識すると良い具体的行動）
`;

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
              config: { temperature: 0.7 },
            });

            const readingText = response.text || '詳細分析レポートの生成に失敗しました。';
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
あなたは頼れる人間関係アドバイザーです。
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

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
              config: { temperature: 0.7 },
            });

            const compatibilityText = response.text || '相性分析の生成に失敗しました。';
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

