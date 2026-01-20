#!/bin/bash
# Permanent fix for CocoaPods sandbox issues on Apple Silicon

echo "🔧 Applying permanent sandbox fix..."

# 1. Patch all resource scripts
find Pods/Target\ Support\ Files -name "*-resources.sh" -exec sed -i '' 's/realpath -mq "${0}"/echo "${0}"/g' {} \; 2>/dev/null

# 2. Fix permissions
chmod -R 755 Pods 2>/dev/null

# 3. Remove cache
rm -f resources-to-copy-*.txt 2>/dev/null

echo "✓ Sandbox fix applied"
