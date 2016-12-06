import React from 'react';
import Page from './page';

var PageList = React.createClass({
  render: function() {
    console.log("Pages: ", this.props.pages);
    return  <div>
      <div className='brand'>
        { this.props.pages.map((page) =>
          <Page key={ page._id }
                id={ page._id }
                title={ page.title }
                image={ page.image }
                imageLink={ page.imageLink }
                description={ page.description }
                buttonText={ page.buttonText }
                buttonLink={ page.buttonLink }                
                />
        )}
      </div>
    </div>
  },

  componentDidMount: function() {
    this.props.onRefresh();
  }
  
});

module.exports = PageList;
