import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Placement extends Component {
  render() {
    const { isOpen, children } = this.props;
    return (
      <>
        { isOpen && children() }
      </>
    );
  }
}

Placement.propTypes = {
  target: PropTypes.oneOfType([PropTypes.any]),
  context: PropTypes.oneOfType([
    PropTypes.instanceof(PropTypes.element),
    PropTypes.shape({
      current: PropTypes.instanceOf(PropTypes.element)
    })
  ]),
  modifiers: PropTypes.oneOfType([object]),
  position: PropTypes.oneOf([
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
  className: PropTypes.string,
  targetClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  isPortal: PropTypes.bool,
  hidden: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
  onDismiss: PropTypes.fun.isRequired
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