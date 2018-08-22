import React, { Component } from 'react';
import DraggableComp from './DraggableComp';
import DroppableArea from './DroppableArea';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items : ["item1", "item2", "item3"],
      added : []
    }
  }
  handleDrop(item) {
    const {items} = this.state;
    items.splice(items.indexOf(item.text), 1);
    
    this.setState( prevState => ({
      items,
      added : [...prevState.added, item.text]
    }));
  }
  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <main>
          {this.state.items.map( str =>
            <DraggableComp text={str}>
              <div key={str} className="data-div">{str}</div>
            </DraggableComp>
          )}
          <DroppableArea onDrop={item => this.handleDrop(item)} addedItems={this.state.added}/>
        </main>
      </DragDropContextProvider>
    );
  }
}

// Export the wrapped component:
export default App;