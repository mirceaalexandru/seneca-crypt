exports.init = function( options, done ) {

  var si = require( 'seneca' )( {log: 'print'} )
  si.use( './../app' )

  si.ready( function( err ) {
    if( err ) {
      return process.exit( !console.error( err ) );
    }

    done( null, si )
  } )
}
