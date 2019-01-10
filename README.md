# enchant.jsを用いたプログラミング学習ゲーム


## 1. 開発環境

Software  | Version
------------- | -------------
Intellij IDEA  | 15.0.2
enchant.js  | 0.8.2
Java | 1.8.0_60
Gradle | 2.7
Spring Boot | 1.3.1.RELEASE

## 2. 実行方法

以下のコマンドを実行

方法１

    gradlew bootRun
    
方法２

    gradlew bootRepackage
    java -jar javajo-teaching-for-kids-1.0-0-SNAPSHOT.jar

## 3. プロジェクト構成
```
src
└─main
    ├─java
    │  └─javajo
    │      │  Main.java
    │      │
    │      ├─config
    │      │      WebSecurityConfig.java
    │      │
    │      └─controller                   … Controllerを配置
    │              GameController.java
    │
    └─resources
        │  application.properties
        │
        ├─resources                         … EnchantJSのライブラリと画像ファイル
        │                                       ファビコンやその他が画像ファイルを配置
        │
        ├─static                           … 静的コンテンツを配置
        │  │  index.html
        │  │  top.html
        │  │
        │  └─js
        │      └─ stage001.js
        │
        └─templates                        … テンプレートを配置
             └─ stage001.html
```

## 4,ゲームコンテンツ追加方法

1．Controllerを作成する
例）
src/main/java/javajo/controller/GameController.java
```java
@Controller
public class GameController {
    @RequestMapping(value = "/stage001", method = RequestMethod.GET)
    public String stage001() {
        return "stage001";
    }
}
```

2．ゲームコンテンツを表示するHTMLを作成する
Controllerで指定したテンプレートHTML名で作成
例）
src/main/resources/templates/stage001.html
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Stage001</title>
    <script type="text/javascript" src="enchant.js"></script>
    <script type="text/javascript" src="plugins/avatar.enchant.js"></script>
    <script type="text/javascript" src="plugins/nineleap.enchant.js"></script>
    <script type="text/javascript" src="js/stage001.js"></script>
    <style type="text/css">
        body {
        margin: 0;
        padding: 0;
        }
    </style>
</head>
<body>
</body>
</html>
```

3．ゲームコンテンツJSを作成する
テンプレートHTMLに指定したJS名で作成
例）
src/main/resources/satic/js/stage001.js
```javascript
enchant();

window.onload = function(){

    var core = new Core(320, 320);
    
   …省略…
}
```

4．トップ画面にゲームコンテンツのリンクを追加する
例）
src/main/resources/satic/top.html
```html
<!DOCTYPE html>
<html>
<head>
    …省略…
</head>
<body>
<div class="container">
    <div class="jumbotron">
        <div class="row">
            <div class="col-lg-6">
                <img src="javajo.png">
            </div>
            <div class="col-lg-6">
                <div class="panel panel-danger">
                    <div class="panel-heading">
                        <h3 class="panel-title"><a href="stage001" target="content">Stage001</a></h3>
                    </div>
                    <div class="panel-body">
                        敵を倒そう！
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    …省略…
</body>
</html>

```

## 5．遊び方

1．以下のURLにアクセス

    http://localhost:18081/

2．ログインする

3．ゲームコンテンツのリング(Stage001)をクリック

4．「START」画面が表示されるので、画面クリックかEnterボタンクリックで開始

5．左右の矢印キーでアバターを移動

6．モンスターのところまで移動してスペースキーで攻撃

### この状態だとモンスターのHPが高すぎてGame Over!!

7．以下のようにURLにゲットパラメータを追加してアクセス

    ※右側にエディタを作成してする予定
    ※以下のURLにアクセスして直接パラメータ改竄したゲームをすることは可能
      http://localhost:18081/stage001?enemey=10

8．手順4～6の通りモンスターを攻撃

### モンスターのHPを0にするとClear!!


# for Azure Webapps deploy

1. JavajoTeachingForKids ディレクトリをでGradleタスク実行
    - clean
    - build
1. WebAppsの作成
    - Java8最新
    - Windowsサーバ
    - Tomcat8.5最新
1. JavajoTeachingForKidsディレクトリ内にあるweb.configをWebAppsのwwwroot直下に配置
1. 最初のGradleタスク実行で作成されたjarファイルをwwwroot配下に配置 
