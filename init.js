/*!
 * HTML Tidy mixin for Chocolat
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var tidy = require('./tidy');

/*
 * Hook up menu items.
 */

Hooks.addMenuItem('Actions/HTML/HTML Tidy', '', function() {
  var type = Document.current().rootScope();
  
  if (~['basic.html.text', 'plain.text'].indexOf(type)) {
    Recipe.run(function(recipe) {
      var sel = (!recipe.selection.length)? new Range(0, recipe.length) : recipe.selection
        , output = ''
        , text = recipe.textInRange(sel);
      
      tidy(text, function(output) {
        Recipe.run(function(recipe) {
          if (output) {
            recipe.replaceTextInRange(sel, output);
          }
        });
      });
    });
  } else {
    Alert.beep();
  }
});