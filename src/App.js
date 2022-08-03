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
    this.getFiltered = this.getFiltered.bind(this);

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
      let id;
      if (this.state.edit.work) {
        id = this.state.edit.work.id;
        data.id = id;
      } else id = '';
      const filtered = this.getFiltered('work', id);
      this.setState({
        work: filtered.concat([data])
      })
    } else if (event.target.id == 'school-form') {
      assignValues(school);
      let id;
      if (this.state.edit.education) {
        id = this.state.edit.education.id;
        data.id = id;
      } else id = '';
      const filtered = this.getFiltered('education', id);
      this.setState({
        education: filtered.concat([data])
      })
    }
    this.setState({ edit: { work: null, education: null } }) 
    event.preventDefault();
  }

  createState = labels => {
    const obj = {};
    labels.map(e => e.toLowerCase().replace(/\s/g, '-')).forEach(label => obj[label.toLowerCase()] = '');
    obj.work = [];
    obj.education = [];
    obj.edit = { work: null, education: null };
    return obj;
}

  createFields = labels => {
    return labels.map(label => {
      return (
          <Field label={label} 
          key={this.formatKey(label)} 
          values={this.state}
          className={this.formatKey(label)}
          id={this.formatKey(label)} 
          handleChange={this.handleChange}/>
      );
  })
  }

  getFiltered = (type, id) => {
    return this.state[type].filter(x => x.id !== id)
  }

  deleteItem = event => {
    console.log(this.state)
    const id = event.target.name;
    this.setState({ 
      work: this.getFiltered('work', id), 
      education: this.getFiltered('education', id)
    })
  }

  edit = event => {
    const id = event.target.name;
    let type;
    let item = this.state.work.find(x => x.id == id)
    if (item) {
      type = 'work'
    } else {
      type = 'education';
      item = this.state.education.find(x => x.id == id)
    }
    //const items = this.state.work.concat(this.state.education);
    //const item = items.find(x => x.id == id);
    console.log(item)
    Object.keys(item).forEach(key => {
      this.setState({ [key]: item[key]})
    })
    this.setState({ edit: { [type]: item } });
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
