import React, { useState, useEffect } from 'react';
import Section from './components/Section';
import Field from './components/Field';
import ListDisplay from'./components/ListDisplay';
import './App.css'
import uniqid from 'uniqid';


function App(props) {
  {/* constructor(props) {
    super(props);
    const generalInfo = ['Name', 'Email', 'Phone-Number'];
    const education = ['School Name', 'Title of Study', 'Date of Study'];
    const experience = [
      'Company Name', 'Position', 'Title', 
      'Main Tasks', 'Date Started', 'Date Ended'
    ];
    const labels = generalInfo.concat(education).concat(experience)
    state = createState(labels);
    createFields = createFields.bind(this);
    createState = createState.bind(this);
    handleChange = handleChange.bind(this);
    formatKey = formatKey.bind(this);
    handleFormSubmit = handleFormSubmit.bind(this);
    deleteItem = deleteItem.bind(this);
    edit = edit.bind(this);
    getFiltered = getFiltered.bind(this);
    canSubmit = canSubmit.bind(this);

  } */}
  const generalInfo = ['Name', 'Email', 'Phone-Number'];
  const education = ['School Name', 'Title of Study', 'Date of Study'];
  const experience = [
    'Company Name', 'Position', 'Title', 
    'Main Tasks', 'Date Started', 'Date Ended'
  ];
  const labels = generalInfo.concat(education).concat(experience)
  const [state, setState] = useState(createState(labels))

  function formatKey(key){ 
    return key.toLowerCase().replace(/\s/g, '-');
  }
  const handleChange = event => {
    let updated = {};
    updated = { [formatKey(event.target.id)]: event.target.value }
    setState(prevState => ({
      ...prevState,
      ...updated
    }))
  }

  const handleFormSubmit = event => {
    let data = { id: uniqid() };
    const assignValues = keys => {
      keys.map(formatKey).forEach(key => {
        data[key] = state[key];
        let updated = { [key]: '' };
        setState(prevState => ({
          ...prevState,
          ...updated
        }))
      });
    }
    if (event.target.id == 'work-form') {
      assignValues(experience);
      let id;
      if (state.edit.work) {
        id = state.edit.work.id;
        data.id = id;
      } else id = '';
      const filtered = getFiltered('work', id);
      let updated = { work: filtered.concat([data]) }
      setState(prevState => ({
        ...prevState,
        ...updated
      }))
    } else if (event.target.id == 'school-form') {
      assignValues(education);
      let id;
      if (state.edit.education) {
        id = state.edit.education.id;
        data.id = id;
      } else id = '';
      const filtered = getFiltered('education', id);
      let updated = { education: filtered.concat([data]) }
      setState(prevState => ({
        ...prevState,
        ...updated
      }))
    }
    let updated = { edit: { work: null, education: null } }
    setState(prevState => ({
      ...prevState,
      ...updated
    }))
    event.preventDefault();
  }

  function createState(labels) {
    const obj = {};
    labels.map(e => e.toLowerCase().replace(/\s/g, '-')).forEach(label => obj[label.toLowerCase()] = '');
    obj.work = [];
    obj.education = [];
    obj.edit = { work: null, education: null };
    return obj;
}

  const createFields = labels => {
    return labels.map(label => {
      return (
          <Field label={label} 
          key={formatKey(label)} 
          values={state}
          className={formatKey(label)}
          id={formatKey(label)} 
          handleChange={handleChange}/>
      );
  })
  }

  function getFiltered(type, id) {
    return state[type].filter(x => x.id !== id)
  }

  const deleteItem = event => {
    console.log(state)
    const id = event.target.name;
    let updated = { 
      work: getFiltered('work', id), 
      education: getFiltered('education', id)
    }
    setState(prevState => ({
      ...prevState,
      ...updated
    }))
  }

  const edit = event => {
    const id = event.target.name;
    let type;
    let item = state.work.find(x => x.id == id)
    if (item) {
      type = 'work'
    } else {
      type = 'education';
      item = state.education.find(x => x.id == id)
    }
    Object.keys(item).forEach(key => {
      let updated = { [key]: item[key] }
      setState(prevState => ({
        ...prevState,
        ...updated
      }))
    })
    let updated = { edit: { [type]: item } }
    setState(prevState => ({
      ...prevState,
      ...updated
    }))
  }

  const canSubmit = () => {
    const generalInfoFilled = state.name && state.email && state['phone-number'];
    const education = state.education.length;
    const experience = state.work.length;
    return generalInfoFilled && education && experience;
  }


      return (
        <div className="App">
          <div className='main-content'>
            <div className='sections-container'>
              <Section createFields={createFields} 
              labels={['Name', 'Email', 'Phone-Number']}
              handleFormSubmit={handleFormSubmit}
              title='General Info'
              hideSubmit={true}
              className='general-info'/>
              <Section createFields={createFields} 
              labels={['School Name', 'Title of Study', 'Date of Study']}
              handleFormSubmit={handleFormSubmit}
              formType='school-form'
              title='Education'
              edit = {state.edit.education}
              className={'education'}/>
              <Section createFields={createFields} 
              labels={[
                'Company Name', 'Position', 'Title', 'Main Tasks', 
                'Date Started', 'Date Ended'
              ]}
              handleFormSubmit={handleFormSubmit}
              title='Work Experience'
              formType='work-form'
              edit={state.edit.work}
              className='experience'/>
            </div>
            <div className='lists-container'>
              <div className='list'>
                <h3>General Info</h3>
                <ul>
                  <li>{state.name}</li>
                  <li>{state.email}</li>
                  <li>{state['phone-number']}</li>
                </ul>
              </div>
              <ListDisplay title='Work Experience' list={state.work}
              deleteItem={deleteItem} type='work' edit={edit}/>
              <ListDisplay title='Education' list={state.education}
              deleteItem={deleteItem} type='education' edit={edit}/>
            </div>
          </div>
          {canSubmit() ? <button >Submit Resume</button> : null }
        </div>
        
      );
    }


export default App;
