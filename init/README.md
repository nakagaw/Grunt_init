# Grunt_init v0.0.1

#npm install

npm installを実行すると、package.jsonの内容に従って、packageをnode_modules以下にインストールします。

#bower install

npm installを実行すると、bower.jsonの内容に従って、packageを_bower_components以下にインストールします。

.bowerccという設定ファイルでデフォルトのディレクトリ名を変えられます。

#grunt init

_libに_bower_componentsから選抜で主要ファイルをコピーします。
と同時に、htdocsというディレクトリを作成、ディレクトリもいい感じに構築。
_dev以下に、_libから必要なファイルを移動。

※ボイラーテンプレートのindex.htmlのままだとリンクパスとかバラバラなので注意

#grunt

ボイラーテンプレートからもってきてmain.scssにリネームしただけで

@inport 'normalize';

と

/* ==========================================================================
   Author's custom styles
   ========================================================================== */

@import 'global_var', 'layout', 'parts';

パーシャルファイルをインポートを追記。

作業。

#grunt release

リリース。