import React, { Component } from 'react';
import {
  any,
  oneOfType,
  oneOf,
  instanceOf,
  element,
  shape,
  object,
  string,
  bool,
  func
} from 'prop-types';

import './styles.css';

class Placement extends Component {
  render() {
    const { isOpen, children, position, contentClassName, hidden, modifiers } = this.props;
    const hiddenClassName = hidden ? 'hidden' : '';
    return (
      <div 
        className={`placement-container ${position} ${contentClassName} ${hiddenClassName} ${modifiers}`}>
        { isOpen && children() }
      </div>
    );
  }

  renderInPortal() {
    const { isPortal, isOpen } = this.props;
    return isPortal && isOpen ? this.renderContent() : null;
  }

  renderPlacement() {
    const { isPortal, isOpen } = this.props;
    return !isPortal && isOpen ? this.renderContent() : null;
  }

  renderContent() {

  }
}

Placement.propTypes = {
  target: oneOfType([any]),
  context: oneOfType([
    instanceOf(element),
    shape({
      current: instanceOf(element)
    })
  ]),
  modifiers: oneOfType([object]),
  position: oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start'
  ]),
  className: string,
  targetClassName: string,
  contentClassName: string,
  isPortal: bool,
  hidden: bool,
  isOpen: bool.isRequired,
  children: func.isRequired,
  onDismiss: fun.isRequired
}

Placement.defaultProps = {
  modifiers: '',
  position: 'auto-start',
  className: '',
  targetClassName: '',
  contentClassName: '',
  isPortal: false,
}

// Use Case

// <Placement
//     isOpen={this.props.isOpen}
//     target={<Button onClick={}>Open Something<Button>}
//     onDismiss={this.props.onDismiss}
//     contentClassName={styles.content}
//     position="bottom-end"
// >
//     {() => (
//         <div><List …. /></div>
//     )}
// </Placement>