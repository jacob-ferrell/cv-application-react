import React from 'react';
import Section from './components/Section';
import Field from './components/Field';
import ListDisplay from'./components/ListDisplay';
import './App.css'
import uniqid from 'uniqid';


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
    this.deleteItem = this.deleteItem.bind(this);
    this.edit = this.edit.bind(this);

  }

  formatKey = key => key.toLowerCase().replace(/\s/g, '-');

  handleChange = event => {
    console.log(this.state)
    this.setState({
        [this.formatKey(event.target.id)]: event.target.value
    });
  }

  handleFormSubmit = event => {
    let data = { id: uniqid() };
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
    event.target.reset();
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
          <Field label={label} key={this.formatKey(label)}
          className={this.formatKey(label)}
           id={label.toLowerCase()} handleChange={this.handleChange}/>
      );
  })
  }

  deleteItem = event => {
    console.log(this.state)
    const id = event.target.name;
    const getFiltered = type => this.state[type].filter(x => x.id !== id)
    this.setState({ 
      work: getFiltered('work'), 
      education: getFiltered('education')
    })
  }

  edit = event => {
    const items = this.state.work.concat(this.state.education);
    const id = event.target.name;
    const item = items.find(x => x.id == id);
    console.log(item)
    Object.keys(item).forEach(key => {
      this.setState({ [key]: item[key]})
    })
    console.log(this.state)
  }

    render() {
      return (
        <div className="App">
          <Section createFields={this.createFields} 
          labels={['Name', 'Email', 'Phone-Number']}
          handleFormSubmit={this.handleFormSubmit}
          title='General Info'
          hideSubmit={true}
          className='general-info'/>
          <Section createFields={this.createFields} 
          labels={['School Name', 'Title of Study', 'Date of Study']}
          handleFormSubmit={this.handleFormSubmit}
          formType='school-form'
          title='Education'
          className={'education'}/>
          <Section createFields={this.createFields} 
          labels={[
            'Company Name', 'Position', 'Title', 'Main Tasks', 
            'Date Started', 'Date Ended'
          ]}
          handleFormSubmit={this.handleFormSubmit}
          title='Work Experience'
          formType='work-form'
          className='experience'/>
          <div className='lists-container'>
            <ListDisplay title='Work Experience' list={this.state.work}
            deleteItem={this.deleteItem} type='work' edit={this.edit}/>
            <ListDisplay title='Education' list={this.state.education}
            deleteItem={this.deleteItem} type='education' edit={this.edit}/>
          </div>
        </div>
        
      );
    }
}

export default App;
