#######
# FTP
#######
yum install ftp

########
# Java
#######
 # http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html 
 # で最新バージョンのrpmURLを取得
 wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u91-b14/jdk-8u91-linux-x64.rpm" -O jdk-8u91-linux-x64.rpm

# インストール
sudo rpm -ivh jdk-8u91-linux-x64.rpm

#環境設定
echo 'export JAVA_HOME=/usr/java/default' >> /etc/profile.d/jdk.sh
source /etc/profile.d/jdk.sh

# インストール確認
java -version
ls -la /usr/bin/ | grep java
ls -la /usr/java/

