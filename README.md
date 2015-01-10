
# Grunt_init v0.0.1
=======

## 事前準備

* node.js
* grunt-cli

以上はインストールが終わっている前提。

#npm install

Gruntプラグインインストール

* "grunt": "~0.4.5",
* "grunt-contrib-connect": "~0.8.0",
* "grunt-contrib-watch": "~0.6.1",
* "grunt-contrib-clean": "~0.6.0",
* "grunt-contrib-copy": "~0.6.0",
* "grunt-compass-multiple": "~0.2.1",
* "grunt-autoprefixer": "^1.0.1",
* "grunt-contrib-csslint": "~0.3.1",
* "grunt-contrib-cssmin": "~0.10.0",
* "grunt-contrib-jshint": "~0.10.0",
* "grunt-contrib-uglify": "~0.6.0",
* "load-grunt-tasks": "~0.6.0",
* "grunt-bower-task": "^0.4.0"

#bower install

bowerからライブラリ・フレームワークのダウンロード

* "jquery": "~2.1.1",
* "html5-boilerplate": "~4.3.0",
* "normalize-scss": "~3.0.2",
* "modernizr": "~2.8.3",
* "backbone": "~1.1.2"

Backbone.jsにUnderscore.jsが同梱されてるので一緒に落とされます。

#grunt init

1. _bower_componentsから_lib以下に主要ファイルをコピー

2. bowerから、以下を落としてきてリネーム＆_dev以下にコピー
  * html5-boilerplateのindex.html
  * JQuery
  * normalize.scss

3. build用の空ディレクトリを作成

#grunt

* 'uglify'
* 'compassMultiple'
* 'connect:livereload'
* 'watch'

_scss、_script以下のファイルを監視、編集されたら
jsはミニファイしてjs/script.js、scssはCompassコンパイルしてcss/main.cssに。

#grunt build

* 'jshint'
* 'clean:build'
* 'copy:build'
* 'cssmin'
* 'csslint'

構文チェック。
build以下へ必要なファイルをコピー、不要なファイルを削除。
