import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo/site';

/**
 * robots.txt configuration.
 *
 * The site explicitly opts in to AI training crawlers because Pillar 2 of the
 * editorial strategy is AI citation visibility (Claude, ChatGPT, Perplexity,
 * Google AI Overviews, etc.). LLMs that cannot crawl the content cannot cite
 * it, and ambiguous robots.txt rules are interpreted conservatively by some
 * AI vendors. Explicit Allow rules per user-agent give every major AI crawler
 * unambiguous permission to crawl every public URL.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ['/components-demo/', '/api/'];

  return {
    rules: [
      // Default rule for all crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },

      // Google AdSense — Mediapartners-Google crawls ad-targeted pages;
      // AdsBot-Google checks ad landing pages. Explicit allow.
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'AdsBot-Google-Mobile',
        allow: '/',
        disallow,
      },

      // Anthropic — ClaudeBot (search + training crawler) and the older anthropic-ai
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow,
      },

      // OpenAI — GPTBot (training) and ChatGPT-User (live retrieval)
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow,
      },

      // Google — Google-Extended grants generative-AI training permission separately
      // from regular Googlebot indexing, which is already covered by the default rule.
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow,
      },

      // Perplexity — PerplexityBot (training) and Perplexity-User (live retrieval)
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
        disallow,
      },

      // Apple Intelligence — Applebot-Extended is the AI-training variant of Applebot
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow,
      },

      // Common Crawl — CCBot powers many LLM training datasets
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow,
      },

      // Cohere
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'cohere-training-data-crawler',
        allow: '/',
        disallow,
      },

      // Meta — used for Llama and other Meta AI products
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow,
      },
      {
        userAgent: 'meta-externalagent',
        allow: '/',
        disallow,
      },

      // Bytedance
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow,
      },

      // Mistral
      {
        userAgent: 'MistralAI-User',
        allow: '/',
        disallow,
      },

      // DuckDuckGo (uses Bing index + their own bot)
      {
        userAgent: 'DuckAssistBot',
        allow: '/',
        disallow,
      },

      // You.com
      {
        userAgent: 'YouBot',
        allow: '/',
        disallow,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
