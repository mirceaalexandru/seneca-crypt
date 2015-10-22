"use strict"

var crypto = require( 'crypto' )

module.exports = function( options ) {
  options = options || {}
  var seneca = this;

  var default_algorithm = options.algorithm || 'aes-256-ctr'
  var default_password = options.password

  function encrypt_message( args, done ) {
    var password = args.password || default_password
    var algorithm = args.algorithm || default_algorithm
    var message = args.message

    if( !password ) {
      return done( 'No password provided' )
    }

    if( !message ) {
      return done( 'No message to encrypt' )
    }

    var cipher = crypto.createCipher( algorithm, password )

    var crypted = cipher.update( message, 'utf8', 'hex' )

    crypted += cipher.final( 'hex' )

    done( null, {message: crypted} )
  }

  function decrypt_message( args, done ) {
    var password = args.password || default_password
    var algorithm = args.algorithm || default_algorithm
    var message = args.message

    if( !password ) {
      return done( 'No password provided' )
    }

    if( !message ) {
      return done( 'No message to decrypt' )
    }

    var decipher = crypto.createDecipher( algorithm, password )
    var dec = decipher.update( message, 'hex', 'utf8' )
    dec += decipher.final( 'utf8' )
    done( null, {message: dec} )
  }

  seneca
    .add( {role: 'crypt', encrypt: 'message'}, encrypt_message )
    .add( {role: 'crypt', decrypt: 'message'}, decrypt_message )
}