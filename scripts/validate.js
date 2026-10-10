#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'data', 'schema.json');
const entriesPath = path.join(__dirname, '..', 'data', 'entries.json');

console.log('Validating entries.json against schema...\n');

let entries;

try {
  JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  console.log('✓ Schema loaded');
} catch (err) {
  console.error('✗ Failed to load schema:', err.message);
  process.exit(1);
}

try {
  entries = JSON.parse(fs.readFileSync(entriesPath, 'utf-8'));
  console.log(`✓ Entries loaded (${entries.length} entries)`);
} catch (err) {
  console.error('✗ Failed to load entries:', err.message);
  process.exit(1);
}

const errors = [];
const warnings = [];
const ids = new Set();

const requiredFields = ['id', 'title', 'creator_name', 'creator_handle', 'source_url', 'source_type'];
const requiredFieldsForX = ['date'];
const validSourceTypes = ['x', 'github'];
const validEngines = ['hyperframes', 'remotion', 'seek-t-html', 'video-model', 'other', null];
const validCategories = [
  'ad-9x16', 'brand-showreel', 'character-story', 'data-viz',
  'editing-workflow', 'explainer', 'music-visual', 'other',
  'product-launch', 'typography', 'ui-motion', null
];
const validPromptKinds = ['full', 'brief', 'example', null];

entries.forEach((entry, index) => {
  const prefix = `Entry ${index} (${entry.id || 'NO ID'})`;

  // Check required fields
  requiredFields.forEach(field => {
    if (!entry[field]) {
      errors.push(`${prefix}: Missing required field '${field}'`);
    }
  });

  // Check additional required fields for X posts
  if (entry.source_type === 'x') {
    requiredFieldsForX.forEach(field => {
      if (!entry[field]) {
        errors.push(`${prefix}: Missing required field '${field}' for X posts`);
      }
    });
  }

  // Check ID format and uniqueness
  if (entry.id) {
    if (!/^[a-z0-9-]+$/.test(entry.id)) {
      errors.push(`${prefix}: ID must be lowercase alphanumeric with hyphens only`);
    }
    if (ids.has(entry.id)) {
      errors.push(`${prefix}: Duplicate ID`);
    }
    ids.add(entry.id);
  }

  // Check date format
  if (entry.date && !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
    errors.push(`${prefix}: Date must be in YYYY-MM-DD format`);
  }

  // Check source_type
  if (entry.source_type && !validSourceTypes.includes(entry.source_type)) {
    errors.push(`${prefix}: Invalid source_type '${entry.source_type}'`);
  }

  // Check engine
  if (entry.engine !== undefined && !validEngines.includes(entry.engine)) {
    errors.push(`${prefix}: Invalid engine '${entry.engine}'`);
  }

  // Check category
  if (entry.category !== undefined && !validCategories.includes(entry.category)) {
    errors.push(`${prefix}: Invalid category '${entry.category}'`);
  }

  // Check prompt_kind
  if (entry.prompt_kind !== undefined && !validPromptKinds.includes(entry.prompt_kind)) {
    errors.push(`${prefix}: Invalid prompt_kind '${entry.prompt_kind}'`);
  }

  // Check URLs
  ['source_url', 'prompt_source_url', 'skill_url', 'repo_url', 'video_url', 'thumbnail_url'].forEach(field => {
    if (entry[field] && typeof entry[field] === 'string') {
      try {
        new URL(entry[field]);
      } catch {
        errors.push(`${prefix}: Invalid URL in '${field}': ${entry[field]}`);
      }
    }
  });

  // Warnings for missing optional but recommended fields
  if (!entry.prompt && !entry.repo_url && !entry.skill_url) {
    warnings.push(`${prefix}: No prompt, repo_url, or skill_url - entry may not be very useful`);
  }
});

console.log('\n--- Validation Results ---\n');

if (warnings.length > 0) {
  console.log(`Warnings (${warnings.length}):`);
  warnings.forEach(w => console.log(`  ⚠ ${w}`));
  console.log('');
}

if (errors.length > 0) {
  console.log(`Errors (${errors.length}):`);
  errors.forEach(e => console.log(`  ✗ ${e}`));
  console.log('\nValidation FAILED');
  process.exit(1);
}

console.log('✓ All entries valid!');
console.log(`\nSummary:`);
console.log(`  Total entries: ${entries.length}`);
console.log(`  With prompts: ${entries.filter(e => e.prompt).length}`);
console.log(`  With skills: ${entries.filter(e => e.skill_url || e.repo_url).length}`);
console.log(`  From X: ${entries.filter(e => e.source_type === 'x').length}`);
console.log(`  From GitHub: ${entries.filter(e => e.source_type === 'github').length}`);
console.log('\nValidation PASSED');
