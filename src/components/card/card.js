import React from 'react';
import './card.css';

class Card extends React.Component {
    constructor() {
        super();
    }

    render() {
        const ChildElement = this.props.ChildElement;

        return(
            <article className="w-90 center bg-near-white pa3 pa4-ns mv3 shadow-4">
                <ChildElement data={this.props.data} methods={this.props.methods} />
            </article>

    )
    }

}

export default Card;