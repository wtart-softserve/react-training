import React, { Component } from 'react';
import Dismissable from '../Dismissable';

class DismissableUseCase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenUseCaseOne: false,
      isOpenUseCaseTwo: false
    }

    this.ref = React.createRef();
  }
  render() {
    return(
      <section>
        <button onClick={this.openUseCaseOne}>Toggle Case One</button>
        <article>
          { this.renderUseCaseOne() }
        </article>
      </section>
    );
  }

  openUseCaseOne = e => {
    e.stopPropagation();
    this.setState({isOpenUseCaseOne: true});
  }

  renderUseCaseOne() {
    const { isOpenUseCaseOne } = this.state;
    return !isOpenUseCaseOne
      ? null
      : (
        <article>
          <Dismissable onDismiss={this.closeUseCaseOne}>
            <article className="use-case" ref={this.ref}>
              
              <button onClick={this.openUseCaseTwo}>Open Use Cse Two</button>
              <Dismissable onDismiss={this.closeUseCaseTwo}>
                {this.state.isOpenUseCaseTwo &&  <div>
                    <p>hurra</p>
                  </div>}
              </Dismissable>
            </article>
          </Dismissable>
        </article>
      );
  }

  closeUseCaseOne = () => {
    this.setState({ isOpenUseCaseOne: false});
  }

  openUseCaseTwo = e => {
    e.stopPropagation();
    this.setState({isOpenUseCaseTwo: true});
  }

  closeUseCaseTwo = () => {
    this.setState({isOpenUseCaseTwo: false});
  }
};

export default DismissableUseCase;

