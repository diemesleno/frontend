import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchPostsIfNeeded
} from '../../modules/listings/index'

class Listings extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  render() {
    const { index, isFetching } = this.props;

    const varImg = {
      backgroundImage: 'url(/mapa-leblon.jpg)'
    }

    return <div>
      <h1>Teste aqui pessoal</h1>
      <h2>Subtítulo do teste aqui pessoal</h2>

      {isFetching &&
        <div>Fetching listings</div>}

      {index &&
        <div className="listings">
          <div style={varImg}>
            &nbsp;
          </div>

          <div>
            {index.map((listing, i) => {
              const bgImgUrl = `listings/photos/${listing.photo}`
              const divStyle = {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0) 50%, rgba(0, 0, 0, 0.7) 80%), url(${bgImgUrl})`
              }

              return <div className="listing" key={i}>
                <Link to={`listings/${listing.id}`}>
                  <div className="image-container" style={divStyle}>
                    <div>
                      <span>R${listing.price}</span>
                      <span className="address">
                        {listing.address.street}
                      </span>
                      <span className="neighborhood">
                        {listing.address.neighborhood}, {listing.address.city}
                      </span>
                    </div>
                  </div>

                  <div className="text-container">
                    <div className="description">
                      {listing.description}
                    </div>

                    <table>
                      <tbody>
                        <tr>
                          <td>Quartos</td>
                          <td>{listing.rooms}</td>
                          <td>Vagas Garagem</td>
                          <td>{listing.garage_spots}</td>
                        </tr>
                        <tr>
                          <td>Banheiros</td>
                          <td>{listing.bathrooms}</td>
                          <td>Andar</td>
                          <td>{listing.floor}</td>
                        </tr>
                        <tr>
                          <td>Área</td>
                          <td>{listing.area}</td>
                          <td>R$/m²</td>
                          <td>{Math.floor(listing.price / listing.area)}</td>
                        </tr>
                      </tbody>
                    </table>

                    <Link to={`listings/${listing.id}`} className="btn">

                      Ver Detalhes
                    </Link>
                  </div>
                </Link>
              </div>
            })}
          </div>
        </div>
      }
    </div>
  }
}

const mapStateToProps = state => ({
  isFetching: state.listings.isFetching,
  index: state.listings.index
})

export default connect(
  mapStateToProps
)(Listings)
