#!/bin/bash

# Script de deploiement pour SPA-Planning sur Debian avec Nginx
# Usage: sudo ./deploy.sh

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables
APP_NAME="spa-planning"
APP_DIR="/var/www/$APP_NAME"
NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"
NGINX_ENABLED="/etc/nginx/sites-enabled/$APP_NAME"
NODE_VERSION="20"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Deploiement de SPA-Planning${NC}"
echo -e "${GREEN}========================================${NC}"

# Verification root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Erreur: Ce script doit etre execute en tant que root (sudo)${NC}"
    exit 1
fi

# Mise a jour du systeme
echo -e "${YELLOW}[1/7] Mise a jour du systeme...${NC}"
apt-get update -qq

# Installation de Nginx
echo -e "${YELLOW}[2/7] Installation de Nginx...${NC}"
apt-get install -y nginx curl

# Installation de Node.js via NodeSource
echo -e "${YELLOW}[3/7] Installation de Node.js ${NODE_VERSION}...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
else
    echo "Node.js deja installe: $(node -v)"
fi

# Creation du repertoire de l'application
echo -e "${YELLOW}[4/7] Creation du repertoire de l'application...${NC}"
mkdir -p $APP_DIR

# Build de l'application
echo -e "${YELLOW}[5/7] Build de l'application...${NC}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

npm ci --silent
npm run build

# Copie des fichiers buildes
echo -e "${YELLOW}[6/7] Deploiement des fichiers...${NC}"
rm -rf $APP_DIR/*
cp -r dist/* $APP_DIR/
chown -R www-data:www-data $APP_DIR

# Configuration Nginx
echo -e "${YELLOW}[7/7] Configuration de Nginx...${NC}"
cp nginx/spa-planning.conf $NGINX_CONF

# Activer le site
ln -sf $NGINX_CONF $NGINX_ENABLED

# Desactiver le site par defaut si present
if [ -f /etc/nginx/sites-enabled/default ]; then
    rm -f /etc/nginx/sites-enabled/default
fi

# Test de la configuration Nginx
nginx -t

# Redemarrage de Nginx
systemctl reload nginx
systemctl enable nginx

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   Deploiement termine avec succes!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "L'application est accessible sur: ${YELLOW}http://$(hostname -I | awk '{print $1}')${NC}"
echo ""
echo -e "Pour configurer HTTPS, utilisez Certbot:"
echo -e "  ${YELLOW}apt-get install certbot python3-certbot-nginx${NC}"
echo -e "  ${YELLOW}certbot --nginx -d votre-domaine.com${NC}"
