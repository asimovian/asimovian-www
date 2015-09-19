/**
 * @copyright 2015 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @requires plur/PlurObject
 */
 'use strict';

define([
    'plur/PlurObject' ],
function(
    PlurObject ) {

/**
 * Application for www.asimovian.software website.
 *
 * @constructor asimovian-www/app/Index
 **
 */
var Index = function() {
};

Index.prototype = PlurObject.create('asimovian-www/app/Index', Index);

Index.prototype.start = function() {
    console.log('It\'s happening!!');
};

return Index;
});