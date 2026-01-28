# Deploiement sur Debian avec Nginx

## Prerequis

- Serveur Debian 11 ou 12
- Acces root ou sudo
- Connexion internet

## Deploiement automatique

```bash
# Cloner le projet sur le serveur
git clone <url-du-repo> /opt/spa-planning
cd /opt/spa-planning

# Lancer le deploiement
sudo ./deploy.sh
```

## Deploiement manuel

### 1. Installation des dependances systeme

```bash
sudo apt-get update
sudo apt-get install -y nginx curl

# Installation de Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
```

### 2. Build de l'application

```bash
cd /chemin/vers/spa-planning
npm ci
npm run build
```

### 3. Deploiement des fichiers

```bash
sudo mkdir -p /var/www/spa-planning
sudo cp -r dist/* /var/www/spa-planning/
sudo chown -R www-data:www-data /var/www/spa-planning
```

### 4. Configuration Nginx

```bash
sudo cp nginx/spa-planning.conf /etc/nginx/sites-available/spa-planning
sudo ln -sf /etc/nginx/sites-available/spa-planning /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # Optionnel
sudo nginx -t
sudo systemctl reload nginx
```

## Configuration HTTPS avec Certbot

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

Certbot configurera automatiquement la redirection HTTP vers HTTPS.

## Configuration du nom de domaine

Editez `/etc/nginx/sites-available/spa-planning` et remplacez:
```
server_name _;
```
par:
```
server_name votre-domaine.com www.votre-domaine.com;
```

Puis rechargez Nginx:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Structure des fichiers deployes

```
/var/www/spa-planning/       # Fichiers de l'application
/etc/nginx/sites-available/  # Configuration Nginx disponible
/etc/nginx/sites-enabled/    # Configuration Nginx active
/var/log/nginx/              # Logs Nginx
```

## Commandes utiles

```bash
# Verifier le statut de Nginx
sudo systemctl status nginx

# Voir les logs d'acces
sudo tail -f /var/log/nginx/spa-planning.access.log

# Voir les logs d'erreur
sudo tail -f /var/log/nginx/spa-planning.error.log

# Tester la configuration Nginx
sudo nginx -t

# Recharger Nginx apres modification
sudo systemctl reload nginx
```

## Mise a jour de l'application

```bash
cd /opt/spa-planning
git pull
npm ci
npm run build
sudo cp -r dist/* /var/www/spa-planning/
sudo chown -R www-data:www-data /var/www/spa-planning
```
