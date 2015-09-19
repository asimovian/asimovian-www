/**
 * @copyright 2015 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @requires plur/PlurObject plur/app/Application
 */
 'use strict';

define([
    'plur/PlurObject',
    'plur/app/Application' ],
function(
    PlurObject,
    Application ) {

/**
 * Application for www.asimovian.software website.
 *
 * @constructor asimovian-www/app/index/App
 * @extends plur/app/Application
 **
 */
var Index = function() {
};

Index.prototype = PlurObject.create('asimovian-www/app/index/App', Index, Application);

/**
 * @function asimovian-www/app/index/App.prototype.start
 */
Index.prototype.start = function() {
    console.log('It\'s happening!!');
};

return Index;
});