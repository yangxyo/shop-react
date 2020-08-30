import React, { Fragment } from "react"
import { RouteComponentProps } from "react-router-dom"
import { IProduct, products } from "./ProductsData"

type Props = RouteComponentProps<{ id: string }>

interface IState {
  product?: IProduct
  added: boolean
}

class ProductPage extends React.Component<Props, IState> {
  public constructor(props: Props) {
    super(props)
    this.state = {
      added: false
    }
  }

  public componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10)
      const product = products[id - 1]
      this.setState({ product })
    }
  }

  public render() {
    const product = this.state.product
    return (
      <div className="page-container">
        {product ? (
          <Fragment>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p className="product-price">
              {new Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency"
              }).format(product.price)}
            </p>
            {!this.state.added && (
              <button onClick={this.handleAddClick}>Add to basket</button>
            )}
          </Fragment>
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    )
  }

  private handleAddClick = () => {
    this.setState({ added: true })
  }
}

export default ProductPage
