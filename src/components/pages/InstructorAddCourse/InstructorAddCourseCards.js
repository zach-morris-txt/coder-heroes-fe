import React, { useState } from 'react';
import { addProgram, setError } from '../../../redux/actions/instructorActions';
import { connect } from 'react-redux';
import '../../../styles/index.less';
import { Select, Input, Form } from 'antd';
import { timeConverter } from '../../common/timeHelpers';

const { Option } = Select;

//below are the options for "new program" details to map from in the return section
const subjects = ['Python', 'Java', 'C++', 'JavaScript'];
const classSize = ['1', '2-5', '6-10', '10-15'];
const durations = ['45 min', '60 min', '90 min'];
const dates = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const times = [
  '08:00:00',
  '09:00:00',
  '10:00:00',
  '11:00:00',
  '12:00:00',
  '13:00:00',
  '14:00:00',
  '15:00:00',
  '16:00:00',
  '17:00:00',
  '18:00:00',
  '19:00:00',
];
const sessions = ['1', '2', '3', '4', '5', '6', '7', '8'];
const ages = ['3-6', '7-10', '10-15'];

const InstructorAddCourseCards = props => {
  const [state, setState] = useState({
    subject: '',
    other: '',
    description: '',
    prerequisite: '',
    classSize: '',
    age: '',
    session: '',
    duration: '',
    dates: '',
    times: '',
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.addProgram(state);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ marginTop: 30, fontSize: 20 }}>
          You can submit new program below!
        </h1>
      </div>
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <Form
          wrapperCol={{ span: 50 }}
          layout="horizontal"
          onChange={handleChange}
        >
          <Form.Item lable="Select">
            <label htmlFor="subject">Subject: </label>
            <Select
              onChange={value => {
                setState({
                  ...state,
                  subject: value,
                });
              }}
            >
              {subjects.map(subject => (
                <Option value={subject}>{subject}</Option>
              ))}
            </Select>
            {/* {state.subject === "Other" && <input type="text" />} */}
          </Form.Item>
          <Form.Item>
            <label htmlFor="other">Subject Not Listed? </label>
            <Input value={state.other} name="other" />
          </Form.Item>
          <Form.Item>
            <label htmlFor="description">Description: </label>
            <Input value={state.description} name="description" />
          </Form.Item>
          <Form.Item>
            <label htmlFor="prereq">Prerequisite: </label>
            <Input value={state.prerequisite} name="prerequisite" />
          </Form.Item>
          <Form.Item>
            <label htmlFor="size">Class Size: </label>
            <Select
              onChange={value => {
                setState({
                  ...state,
                  classSize: value,
                });
              }}
            >
              {classSize.map(classSize => (
                <Option value={classSize}>{classSize}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <label htmlFor="age">Age Group: </label>
            <Select
              onChange={value => {
                setState({
                  ...state,
                  age: value,
                });
              }}
            >
              {ages.map(age => (
                <Option value={age}>{age}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <label htmlFor="sessions">Total Sessions: </label>
            <Select
              onChange={value => {
                setState({
                  ...state,
                  session: value,
                });
              }}
            >
              {sessions.map(session => (
                <Option value={session}>{session}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <label htmlFor="duration">Course Duration: </label>
            <Select
              onChange={value => {
                setState({
                  ...state,
                  duration: value,
                });
              }}
            >
              {durations.map(duration => (
                <Option value={duration}>{duration}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <label htmlFor="date">Preferred Date: </label>
            <Select
              onChange={value => {
                setState({
                  ...state,
                  dates: value,
                });
              }}
            >
              {dates.map(date => (
                <Option value={date}>{date}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <label htmlFor="time">Preferred Time: </label>
            <Select
              onChange={value => {
                setState({
                  ...state,
                  times: value,
                });
              }}
            >
              {times.map(time => (
                <Option value={time}>{timeConverter(time)}</Option>
              ))}
            </Select>
          </Form.Item>
          {props.errorMessage && <div>Error: {props.errorMessage}</div>}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={handleSubmit}>Submit!</button>
          </div>
        </Form>
      </section>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    errorMessage: state.errorMessage,
  };
};
//export default InstructorAddCourseCards
export default connect(mapStateToProps, { addProgram, setError })(
  InstructorAddCourseCards
);
