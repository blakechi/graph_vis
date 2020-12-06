import React, { Component } from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import './grid.css'
import MyResponsiveNetwork from './nivoNetwork';
import NetworkData from './data/network.json'
import Scene from './three_visualisation';
import GridWrapper from './GridWrapper';

const AutoWidthGridLayout = WidthProvider(GridLayout)

class MyFirstGrid extends Component {
    render() {
        // layout is an array of objects, see the demo for more complete usage
        const layout = [
            {i: 'a', x: 0, y: 0, w: 1260, h: 8, static: true},
            {i: 'b', x: 0, y: 8, w: 420, h: 4, minW: 2, maxW: 1260, minH: 2, maxH: 6},
            {i: 'c', x: 4, y: 8, w: 420, h: 4, minW: 2, maxW: 1260, minH: 2, maxH: 6},
            {i: 'd', x: 8, y: 8, w: 420, h: 4, minW: 2, maxW: 1260, minH: 2, maxH: 6}
        ];

        return (
            <AutoWidthGridLayout 
                className="layout" 
                layout={layout} 
                cols={1260} 
                rowHeight={50} 
                compactType={'horizontal'} 
                verticalCompact={true}
            >
                {layout.map(ele => 
                    <GridWrapper key={ele.i}>
                        {ele.i === 'a'? <Scene /> : <MyResponsiveNetwork data={NetworkData}/>}
                    </GridWrapper>
                )}
            </AutoWidthGridLayout>
        )
    }
}

export default MyFirstGrid;