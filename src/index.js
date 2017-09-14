import restify from 'restify'

const port = process.env.HTTPPORT || 80,
      stats = {
        'clients': {},
        'internalEntries': 0,
        'totalHits': 0
      }

function countHit( resolve, reject, data ) {
  const req = data.req

  req
    .question
    .forEach(
      ( question ) => {
        if ( !( req.address.address in stats.clients ) )
          stats.clients[ req.address.address ] = {}

        if ( !( question.name in stats.clients[ req.address.address ] ) )
          stats.clients[ req.address.address ][ question.name ] = { hit: 0 }

        stats.clients[ req.address.address ][ question.name ].hit++
      }
    )

  resolve()
}

function start( resolve, reject, data ) {
  const server = restify.createServer(),
        entries = data.entries

  server
    .get(
      '/api',
      ( req, res, next ) => {
        entries.keys(
          ( err, keys ) => {
            // Set it globally
            stats.internalEntries = keys.length

            // Start the local response logic
            let ret = Object.assign( {}, stats )

            Object.keys( stats.clients)
              .forEach(
                ( client ) => {
                  Object.keys( stats.clients[ client ] )
                    .forEach(
                      domain => ret.totalHits += stats.clients[ client ][ domain ].hit
                    )
                }
              )

            res.send( ret )
            next()
          }
        )
      }
    )

  server
    .on( 'error', e => reject( `[API] ERROR: ${e.message}` ) )
    .listen( port, () => {
      console.log( `[API] HTTP Server listening on ${server.url}` )
      resolve()
    })
}

export default class {
  constructor( dns ) {
    dns
      .on( 'init', ( resolve, reject, data ) => {
        start( resolve, reject, data )
      })
      .on( 'resolve.internal', ( resolve, reject, data ) => countHit( resolve, reject, data ) )
      .on( 'resolve.external', ( resolve, reject, data ) => countHit( resolve, reject, data ) )
  }
}