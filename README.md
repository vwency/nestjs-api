# Nest js training

### Technology 

1) boilerplate
2) prismaORM

### Deploy or prod run

Install direnv

```
apt install direnv -y   Ubuntu / Debian-like  
yum install direnv      Redhat  
pacman -S direnv        Archlinux  
dnf install direnv      Fedora  
zypper install direnv   openSUSE  
```

```
export SECRET_KEY="abc123"
export DATABASE_TYPE="postgres"
export DATABASE_HOST="localhost"
export DATABASE_PORT="5432"
export DATABASE_USERNAME="postgres"
export DATABASE_NAME=""
export DATABASE_PASSWORD="12345678"
export AT_SECRET="at-secret"
export PGDATA="/data/pg-data"
export BACKEND_PORT="3000"
export GOOGLE_CLIENT_ID=""
export GOOGLE_CLIENT_SECRET=""
export GOOGLE_REDIRECT_URI="http://localhost:3000/auth/google/redirect"

export DATABASE_URL="${DATABASE_TYPE}://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}"
```


Execute direnv

``` direnv allow ```  

Install latest docker-compose and build  

``` sudo mv ~/docker-compose-linux-x86_64 /usr/local/bin/docker-compose ```  

``` docker-compose build ; docker-compose up  ```  
