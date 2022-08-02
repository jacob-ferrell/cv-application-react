import React from 'react';
import Section from './components/Section';
import Field from './components/Field';
import './App.css'
import WorkForm from './components/WorkForm';
import SchoolForm from './components/SchoolForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    const generalInfo = ['Name', 'Email', 'Phone-Number'];
    const education = ['School Name', 'Title of Study', 'Date of Study'];
    const experience = [
      'Company Name', 'Position', 'Title', 
      'Main Tasks', 'Date Started', 'Date Ended'
    ];
    const labels = generalInfo.concat(education).concat(experience)
    this.state = this.createState(labels);
    this.createFields = this.createFields.bind(this);
    this.createState = this.createState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formatKey = this.formatKey.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }

  formatKey = key => key.toLowerCase().replace(/\s/g, '-');

  handleChange = event => {
    console.log(this.state)
    this.setState({
        [this.formatKey(event.target.id)]: event.target.value
    });
  }

  handleFormSubmit = event => {
    let data = {};
    const generalInfo = ['Name', 'Email', 'Phone-Number'];
    const school = ['School Name', 'Title of Study', 'Date of Study'];
    const experience = [
      'Company Name', 'Position', 'Title', 'Main Tasks', 
      'Date Started', 'Date Ended'
    ];
    const assignValues = keys => {
      keys.map(this.formatKey).forEach(key => {
        data[key] = this.state[key];
        this.setState({ [key]: '' })
      });
    }
    if (event.target.id == 'work-form') {
      assignValues(experience);
      this.setState({
        work: [...this.state.work, data]
      })
    } else if (event.target.id == 'school-form') {
      assignValues(school);
      this.setState({
        education: [...this.state.education, data]
      })
    } else {
      assignValues(generalInfo);
      Object.keys(data).forEach(key => {
        this.setState({ [key]: data[key] })
      })
    }
    event.preventDefault();
  }

  createState = labels => {
    const obj = {};
    labels.map(e => e.toLowerCase().replace(/\s/g, '-')).forEach(label => obj[label.toLowerCase()] = '');
    obj.work = [];
    obj.education = [];
    return obj;
}

  createFields = labels => {
    return labels.map(label => {
      return (
          <Field label={label} key={label.toLowerCase()}
           id={label.toLowerCase()} handleChange={this.handleChange}/>
      );
  })
  }
    render() {
      return (
        <div className="App">
          <Section createFields={this.createFields} 
          labels={['Name', 'Email', 'Phone-Number']}
          handleFormSubmit={this.handleFormSubmit}
          className='general-info'/>
          <Section createFields={this.createFields} 
          labels={['School Name', 'Title of Study', 'Date of Study']}
          handleFormSubmit={this.handleFormSubmit}
          formType='school-form'
          className={'education'}/>
          <Section createFields={this.createFields} 
          labels={[
            'Company Name', 'Position', 'Title', 'Main Tasks', 
            'Date Started', 'Date Ended'
          ]}
          handleFormSubmit={this.handleFormSubmit}
          formType='work-form'
          className={'experience'}/>

        </div>
      );
    }
}

export default App;
