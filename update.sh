#!/bin/bash

# Script de mise a jour pour SPA-Planning
# Usage: sudo ./update.sh

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

APP_DIR="/opt/spa-planning"
WEB_DIR="/var/www/spa-planning"

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}   Mise a jour de SPA-Planning${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# Verification root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Erreur: Ce script doit etre execute en tant que root (sudo)${NC}"
    exit 1
fi

# Verification du repertoire
if [ ! -d "$APP_DIR" ]; then
    echo -e "${RED}Erreur: Repertoire $APP_DIR introuvable${NC}"
    echo -e "${YELLOW}Executez d'abord: git clone <repo> $APP_DIR${NC}"
    exit 1
fi

cd "$APP_DIR"

# Sauvegarder la version actuelle
CURRENT_COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "inconnu")
echo -e "${YELLOW}[1/5] Version actuelle: ${CURRENT_COMMIT}${NC}"

# Recuperer les changements
echo -e "${YELLOW}[2/5] Recuperation des mises a jour...${NC}"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "       Branche: ${CYAN}${BRANCH}${NC}"
git pull origin "$BRANCH"

NEW_COMMIT=$(git rev-parse --short HEAD)
echo -e "       Nouvelle version: ${GREEN}${NEW_COMMIT}${NC}"

# Installer les dependances
echo -e "${YELLOW}[3/5] Installation des dependances...${NC}"
npm ci --silent

# Build
echo -e "${YELLOW}[4/5] Build de l'application...${NC}"
npm run build

# Deploiement
echo -e "${YELLOW}[5/5] Deploiement des fichiers...${NC}"
rm -rf "$WEB_DIR"/*
cp -r dist/* "$WEB_DIR"/
chown -R www-data:www-data "$WEB_DIR"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Mise a jour terminee!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Version: ${CYAN}${CURRENT_COMMIT}${NC} -> ${GREEN}${NEW_COMMIT}${NC}"
echo -e "Branche: ${CYAN}${BRANCH}${NC}"
echo ""

# Afficher les derniers commits
echo -e "${YELLOW}Derniers changements:${NC}"
git log --oneline -3
