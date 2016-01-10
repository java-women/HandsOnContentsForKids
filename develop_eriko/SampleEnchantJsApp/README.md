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

## 3．遊び方

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
