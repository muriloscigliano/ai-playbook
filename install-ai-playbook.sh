#!/bin/bash
# ============================================================
# AI-First Product Playbook — Installer
# ============================================================
# Installs the AI agent patterns playbook system into any project.
#
# Usage:
#   Option 1 — Symlink (recommended, stays in sync):
#     ./install-ai-playbook.sh /path/to/your/project
#
#   Option 2 — Copy (standalone, doesn't auto-update):
#     ./install-ai-playbook.sh /path/to/your/project --copy
#
#   Option 3 — Install globally for all AI agent projects:
#     ./install-ai-playbook.sh --global
#
# ============================================================

set -euo pipefail

PLAYBOOK_DIR="$(cd "$(dirname "$0")" && pwd)"

FILES=(
    "AI_AGENT_PATTERNS_PLAYBOOK.md"
    "AI_FIRST_BUILD_GUIDE.md"
    "AI_DESIGN_PRINCIPLES.md"
    "AI_ANTI_PATTERNS.md"
    "INDUSTRY_GUIDES.md"
    "PATTERN_INDEX.md"
)

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

usage() {
    echo "Usage: $0 <target-project-path> [--copy]"
    echo "       $0 --global"
    echo ""
    echo "Options:"
    echo "  <path>    Target project directory"
    echo "  --copy    Copy files instead of symlinking (won't auto-update)"
    echo "  --global  Install to ~/.claude/ (available to ALL AI agent projects)"
    echo ""
    echo "Examples:"
    echo "  $0 ~/projects/my-saas-app"
    echo "  $0 ~/projects/my-saas-app --copy"
    echo "  $0 --global"
}

install_to_dir() {
    local target_dir="$1"
    local mode="${2:-symlink}"

    # Create .claude/ai-playbook/ in target
    local playbook_target="${target_dir}/.claude/ai-playbook"
    mkdir -p "$playbook_target"

    for file in "${FILES[@]}"; do
        local source="${PLAYBOOK_DIR}/${file}"
        local dest="${playbook_target}/${file}"

        if [ ! -f "$source" ]; then
            echo "WARNING: ${file} not found in ${PLAYBOOK_DIR}, skipping"
            continue
        fi

        # Remove existing
        rm -f "$dest"

        if [ "$mode" = "copy" ]; then
            cp "$source" "$dest"
            echo -e "  ${GREEN}✓${NC} Copied ${file}"
        else
            ln -s "$source" "$dest"
            echo -e "  ${GREEN}✓${NC} Symlinked ${file}"
        fi
    done

    # Create/update CLAUDE.md if it doesn't exist
    local claude_md="${target_dir}/CLAUDE.md"
    local playbook_section="## AI-First Playbook

This project uses the AI Agent Patterns Playbook for architecture and design guidance.

### Engineering Patterns (78)
- Quick index: \`Read .claude/ai-playbook/PATTERN_INDEX.md\`
- Pattern lookup: \`Grep \"## <number>. Pattern\" .claude/ai-playbook/AI_AGENT_PATTERNS_PLAYBOOK.md\`
- Build guide: \`Read .claude/ai-playbook/AI_FIRST_BUILD_GUIDE.md\`
- Full reference: \`.claude/ai-playbook/AI_AGENT_PATTERNS_PLAYBOOK.md\` (78 patterns, read specific sections only)

### Design Principles (17) + UX Patterns (7)
- Design reference: \`.claude/ai-playbook/AI_DESIGN_PRINCIPLES.md\`
- Covers: autonomy taxonomy, human task vocabulary, constraint taxonomy, governance
- Cross-referenced to engineering patterns"

    if [ -f "$claude_md" ]; then
        # Check if section already exists
        if grep -q "AI-First Playbook" "$claude_md" 2>/dev/null; then
            echo -e "  ${YELLOW}→${NC} CLAUDE.md already has playbook section, skipping"
        else
            echo "" >> "$claude_md"
            echo "$playbook_section" >> "$claude_md"
            echo -e "  ${GREEN}✓${NC} Appended playbook section to existing CLAUDE.md"
        fi
    else
        echo "$playbook_section" > "$claude_md"
        echo -e "  ${GREEN}✓${NC} Created CLAUDE.md with playbook reference"
    fi

    # Add to .gitignore if symlinked (symlinks to outside repo can confuse git)
    if [ "$mode" = "symlink" ]; then
        local gitignore="${target_dir}/.gitignore"
        if [ -f "$gitignore" ]; then
            if ! grep -q ".claude/ai-playbook/" "$gitignore" 2>/dev/null; then
                echo "" >> "$gitignore"
                echo "# AI playbook (symlinked from central location)" >> "$gitignore"
                echo ".claude/ai-playbook/" >> "$gitignore"
                echo -e "  ${GREEN}✓${NC} Added .claude/ai-playbook/ to .gitignore"
            fi
        fi
    fi
}

# Parse args
if [ $# -eq 0 ]; then
    usage
    exit 1
fi

if [ "$1" = "--global" ]; then
    echo "Installing AI Playbook globally to ~/.claude/ai-playbook/"
    install_to_dir "$HOME" "symlink"
    echo ""
    echo -e "${GREEN}Done!${NC} The playbook is now available to ALL AI agent projects."
    echo "Installed to ~/.claude/ai-playbook/"
    exit 0
fi

if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    usage
    exit 0
fi

TARGET="$1"
MODE="symlink"

if [ "${2:-}" = "--copy" ]; then
    MODE="copy"
fi

if [ ! -d "$TARGET" ]; then
    echo "Error: ${TARGET} is not a directory"
    exit 1
fi

echo "Installing AI Playbook to ${TARGET}"
echo "Mode: ${MODE}"
echo ""
install_to_dir "$TARGET" "$MODE"
echo ""
echo -e "${GREEN}Done!${NC}"
if [ "$MODE" = "symlink" ]; then
    echo "Files are symlinked — updates to the source will auto-propagate."
else
    echo "Files are copied — run again to update."
fi
echo ""
echo "AI agent will now have access to:"
echo "  - 78 AI agent patterns (full reference)"
echo "  - Pattern index (quick lookup)"
echo "  - Build guide (decision trees + phases)"
