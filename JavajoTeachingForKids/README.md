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

    gradlew bootRun

## 3. プロジェクト構成

src
└─main
    ├─java
    │  └─javajo
    │      │  Main.java
    │      │
    │      └─controller
    │              GameController.java
    │
    └─resources
        │  application.properties
        │
        ├─resources
        │  │  apad.png
        │  │  avatarBg1.png
        │  │  avatarBg2.png
        │  │  avatarBg3.png
        │  │  bar.png
        │  │  chara0.png
        │  │  chara1.png
        │  │  chara2.png
        │  │  chara3.png
        │  │  chara4.png
        │  │  chara5.png
        │  │  chara6.png
        │  │  chara7.png
        │  │  clear.png
        │  │  droid.dae
        │  │  effect0.png
        │  │  enchant-sphere.png
        │  │  enchant.png
        │  │  end.png
        │  │  favicon.ico
        │  │  font0.png
        │  │  font1.png
        │  │  font2.png
        │  │  gameover.png
        │  │  icon0.png
        │  │  icon1.png
        │  │  indicator.png
        │  │  javajo.png
        │  │  map0.png
        │  │  map1.png
        │  │  map2.png
        │  │  pad.png
        │  │  space0.png
        │  │  space1.png
        │  │  space2.png
        │  │  space3.png
        │  │  start.png
        │  │
        │  └─monster
        │          bigmonster1.gif
        │          bigmonster2.gif
        │          monster1.gif
        │          monster2.gif
        │          monster3.gif
        │          monster4.gif
        │          monster5.gif
        │          monster6.gif
        │          monster7.gif
        │
        ├─static
        │  │  index.html
        │  │
        │  ├─build
        │  │  │  enchant.js
        │  │  │
        │  │  └─plugins
        │  │          avatar.enchant.js
        │  │          box2d.enchant.js
        │  │          collada.gl.enchant.js
        │  │          extendMap.enchant.js
        │  │          gl.enchant.js
        │  │          memory.enchant.js
        │  │          mixing.enchant.js
        │  │          mmd.gl.enchant.js
        │  │          nineleap.enchant.js
        │  │          physics.gl.enchant.js
        │  │          primitive.gl.enchant.js
        │  │          socket.enchant.js
        │  │          tl.enchant.js
        │  │          twitter.enchant.js
        │  │          ui.enchant.js
        │  │          util.enchant.js
        │  │          widget.enchant.js
        │  │          wiiu.enchant.js
        │  │
        │  └─js
        │          stage001.js
        │
        └─templates
                stage001.html
            
## 4．遊び方

1．以下のURLにアクセス

    http://localhost:8080/

2．「START」画面が表示されるので、画面クリックかEnterボタンクリックで開始

3．左右の矢印キーでアバターを移動

4．モンスターのところまで移動してスペースキーで攻撃

### この状態だとモンスターのHPが高すぎてGame Over!!

5．以下のようにURLにゲットパラメータを追加してアクセス

    http://localhost:8080/?[モンスターのHP]
    ※[モンスターのHP]を好きな数値に書き換える

6．手順2～4の通りモンスターを攻撃

### モンスターのHPを0にするとClear!!
