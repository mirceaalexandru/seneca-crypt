"use strict";

var assert = require( 'assert' )

var Lab = require( 'lab' )
var lab = exports.lab = Lab.script()
var suite = lab.suite;
var test = lab.test;
var before = lab.before;

var util = require( './util.js' )

var seneca

suite( 'init stage suite tests ', function() {
  before( {}, function( done ) {
    util.init( {}, function( err, si ) {
      seneca = si
      done()
    } )
  } )

  var message = 'Some message'
  var password = 'A Complicated passord'
  test( 'crypt-decrypt with default', function( done ) {
    seneca.act( "role: 'crypt', encrypt: 'message'", {message: message, password: password}, function( err, encrypt_msg ) {
      console.log(err)
      assert( !err )
      assert( encrypt_msg )

      seneca.act( "role: 'crypt', decrypt: 'message'", {message: encrypt_msg.message, password: password}, function( err, msg ) {
        assert( !err )
        assert( msg )
        assert.equal( message, msg.message )
        done()
      } )
    } )
  } )

} )




