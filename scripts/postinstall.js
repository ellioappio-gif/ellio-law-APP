#!/usr/bin/env node
/**
 * Postinstall script to fix iOS compatibility issues
 * - Fixes react-native-screens constexpr compilation errors
 * - Ensures App Store compliance
 */

const fs = require('fs');
const path = require('path');

const fixes = [
  {
    name: 'react-native-screens constexpr fix',
    file: 'node_modules/react-native-screens/ios/RNSScreenStackHeaderConfig.mm',
    replacements: [
      {
        find: 'static constexpr auto DEFAULT_TITLE_FONT_SIZE = @17;',
        replace: 'static const auto DEFAULT_TITLE_FONT_SIZE = @17;'
      },
      {
        find: 'static constexpr auto DEFAULT_TITLE_LARGE_FONT_SIZE = @34;',
        replace: 'static const auto DEFAULT_TITLE_LARGE_FONT_SIZE = @34;'
      }
    ]
  }
];

fixes.forEach(fix => {
  const filePath = path.join(__dirname, fix.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${fix.name}: File not found at ${fix.file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  fix.replacements.forEach(replacement => {
    if (content.includes(replacement.find)) {
      content = content.replace(replacement.find, replacement.replace);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${fix.name}: Fixed`);
  } else {
    console.log(`ℹ️  ${fix.name}: Already fixed or not applicable`);
  }
});

console.log('\n✅ Postinstall fixes completed');
