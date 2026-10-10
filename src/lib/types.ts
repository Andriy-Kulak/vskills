export type SourceType = 'x' | 'github';
export type Engine = 'hyperframes' | 'remotion' | 'seek-t-html' | 'video-model' | 'other';
export type Category = 
  | 'ad-9x16'
  | 'brand-showreel'
  | 'character-story'
  | 'data-viz'
  | 'editing-workflow'
  | 'explainer'
  | 'music-visual'
  | 'other'
  | 'product-launch'
  | 'typography'
  | 'ui-motion';

export type PromptKind = 'full' | 'brief' | 'example';

export interface EntryMetrics {
  views?: number | null;
  likes?: number | null;
  checked?: string | null;
}

export interface Entry {
  id: string;
  title: string;
  creator_name: string;
  creator_handle: string;
  source_url: string;
  source_type: SourceType;
  date: string;
  model?: string | null;
  engine?: Engine | null;
  category?: Category | null;
  tags?: string[];
  prompt?: string | null;
  prompt_kind?: PromptKind | null;
  prompt_source_url?: string | null;
  prompt_in_source_post?: boolean | null;
  skill_url?: string | null;
  repo_url?: string | null;
  install?: string | null;
  needs_assets?: boolean | null;
  effort?: string | null;
  video_url?: string | null;
  thumbnail_url?: string | null;
  metrics?: EntryMetrics | null;
  license_note?: string | null;
}

export interface FilterState {
  search: string;
  category: Category | 'all';
  model: string;
  engine: Engine | 'all';
  hasPrompt: boolean | null;
  hasSkill: boolean | null;
  needsAssets: boolean | null;
}

export const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: 'all',
  model: 'all',
  engine: 'all',
  hasPrompt: null,
  hasSkill: null,
  needsAssets: null,
};

export const CATEGORY_LABELS: Record<Category, string> = {
  'ad-9x16': 'Ad (9:16)',
  'brand-showreel': 'Brand Showreel',
  'character-story': 'Character Story',
  'data-viz': 'Data Visualization',
  'editing-workflow': 'Editing Workflow',
  'explainer': 'Explainer',
  'music-visual': 'Music Visual',
  'other': 'Other',
  'product-launch': 'Product Launch',
  'typography': 'Typography',
  'ui-motion': 'UI Motion',
};

export const ENGINE_LABELS: Record<Engine, string> = {
  'hyperframes': 'Hyperframes',
  'remotion': 'Remotion',
  'seek-t-html': 'Seek-T (HTML/Canvas)',
  'video-model': 'Video Model',
  'other': 'Other',
};
