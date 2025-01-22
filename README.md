# Nest js training

### Technology 

1) boilerplate
2) prismaORM
3) express-session

### Deploy or prod run

Install direnv

```
apt install direnv -y   Ubuntu / Debian-like  
yum install direnv      Redhat  
pacman -S direnv        Archlinux  
dnf install direnv      Fedora  
zypper install direnv   openSUSE  
```

touch .envrc


Execute direnv

``` direnv allow ```  

Install latest docker-compose and build  

``` sudo mv ~/docker-compose-linux-x86_64 /usr/local/bin/docker-compose ```  

``` docker-compose build ; docker-compose up  ```  
