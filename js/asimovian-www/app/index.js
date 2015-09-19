/**
 * @copyright 2015 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 */
'use strict';

/**
 * Expects requirejs.js to have been pre-loaded by a <script> reference or dynamically.
 */
plurbootstrap.require([
    'plur/web/Bootstrap' ],
function(
    WebBootstrap ) {

WebBootstrap.init(plurbootstrap)
    .addPaths({'asimovian-www': 'asimovian-www/js/asimovian-www'})
    .require([ 'asimovian-www/app/index/App' ], function(IndexApp) {
        new IndexApp().start();
    });
});
