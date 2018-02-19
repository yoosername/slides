import React from "react";

class Presentation extends React.Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    name: "Reveal",
    sections: []
  }

  render() {
    let jsx = '';
    this.props.sections.forEach((section, i) => {
      if(section.markdown) {
        let dataSeparator = section.dataSeparator
        ? `data-separator="${section.dataSeparator}"`: null;
        let dataSeparatorVertical = section.dataSeparatorVertical
        ? `data-separator-vertical="${section.dataSeparatorVertical}"` : null;
        let dataSeparatorNotes = section.dataSeparatorNotes
        ? `data-separator-notes="${section.dataSeparatorNotes}"` : null;
        let  markdown = `
          <section data-markdown ${dataSeparator} ${dataSeparatorVertical} ${dataSeparatorNotes}>
            <script type="text/template">
              ${section.markdown}
            </script>
          </section>
        `;
        jsx += markdown;
      }
      else if(section.markup) {
        jsx += section.markup;
      }
      else {
        throw new Error('invalid section properties (need markup or markdown for each section)');
      }
    })
    return(
      <div className='reveal'>
        <div className='slides' dangerouslySetInnerHTML={{__html: jsx}}>
        </div>
      </div>
    );
  }
}

export default Presentation;
