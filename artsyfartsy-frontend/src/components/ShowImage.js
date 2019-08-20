import React from 'react'
import backArrow from '../images/backArrow.png'

export default class ShowImg extends React.Component {
    constructor(props){
        super(props)
        this.params = props.match.params
        this.state = {
            piece: {},
            inGallery: false,
            userGallery: [],
            goBack: true
        }
    }

    getPiece = () => {
        fetch(`http://localhost:3000/pieces/${this.params.id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                piece: data,
            })
        this.getInGallery(data)
        })
    }

    getInGallery = (piece) => {
        fetch(`http://localhost:3000/users/${3}/gallery`)
        .then(res => res.json())
        .then(data => {
            this.setState({userGallery: [...data]})
            let temp = data.filter(item => {
                return item.id === piece.id
            })
            if(temp.length > 0){
                this.setState({
                    inGallery: true
                })
            }
        })
    }

    handleAdd = () => {
        if(!this.state.inGallery){
            this.setState({
                inGallery: true
            })
            this.addToGallery()
        }
        else{
            this.setState({
                inGallery: false
            })
            this.removeFromGallery()
        }
    }

    addToGallery = () => {
        if (this.state.userGallery.length < 12){
          fetch("http://localhost:3000/users/add", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({user_id: 3, piece: this.state.piece})
          })
        //   .then(res => res.json())
        //   .then(data => data.id ? console.log("added") : console.log("there was an error processing the request"))
        } else {
          console.log('You have enough Old Masters.')
        }
      }

      removeFromGallery = () => {
          fetch("http://localhost:3000/users", {
              method: "DELETE",
              headers: {"content-type" : "application/json"},
              body: JSON.stringify({
                  user_id: 3,
                  piece_id: this.state.piece.id
              })
          })
      }


    render(){
        return (
            <div>
                <div id="arrowcontainer" onClick={() => this.props.history.goBack()}><img id="backarrow" src={backArrow} alt="back arrow"/></div>
                <div className="showPage">
                        <img className="showImage" src={this.state.piece.primaryImage} alt="piece" />
                    <div className="showDetails">
                        <div id="showTitle">{this.state.piece.title}</div>
                        <div id="showArtist">{` - ${this.state.piece.artistDisplayName}`}</div>
                        <button className="showButton"onClick={this.handleAdd}>{this.state.inGallery ? "Remove from Gallery" : "Add to Gallery"}</button>
                        <div className="fineDetails">
                            <p>{this.state.piece.medium ? `Medium : ${this.state.piece.medium}`: null}</p>
                            <p>{this.state.piece.dimensions ? `Dimensions : ${this.state.piece.dimensions}`: null}</p>
                            <p>{this.state.piece.medium ? `Department : ${this.state.piece.department}`: null}</p>
                            <p>{this.state.piece.classification ? `Classification : ${this.state.piece.classification}`: null}</p>
                            <p>{this.state.piece.repository ? `On display at : ${this.state.piece.repository}`: null}</p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        this.getPiece()
    }
}