import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';
import DraggableComp from './DraggableComp';

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

const boxTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem())
  },
}
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})

class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
    addedItems: PropTypes.array,
  }

  render() {
    const { canDrop, isOver, connectDropTarget, addedItems} = this.props
    const isActive = canDrop && isOver

    let backgroundColor = '#222'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {isActive ? 'Release to drop' : 'Drag a box here'}
        {addedItems.map( str =>
          <DraggableComp text={str}>
            <div key={str} className="data-div">{str}</div>
          </DraggableComp>
        )}
      </div>,
    )
  }
}

export default DropTarget(ItemTypes.CARD, boxTarget, collect)(Dustbin);