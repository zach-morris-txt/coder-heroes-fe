import React, { useState } from 'react';
import { Calendar, Modal, Badge, Button } from 'antd';
import '../../../styles/index.less';
import '../../../styles/InstructorStyles/calenderStyle.less';
import { connect } from 'react-redux';
import { setSelectedCourse } from '../../../redux/actions/instructorActions';
import { dateConverter } from '../../common/dateHelpers';

import { InfoCircleOutlined } from '@ant-design/icons';

const InstructorCalender = props => {
  const { instructor } = props;
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = item => {
    setIsModalVisible(true);
    setSelectedCourse(item);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function getListData(value) {
    let listData = [];

    const calendarDate = value._d.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    instructor.course_schedule.forEach(item => {
      const dateFirst = item.start_date.slice(7, 10);
      const monthFirst = item.start_date.slice(5, 7);
      const yearFirst = item.start_date.slice(0, 4);
      const convertedDateFromat = monthFirst + dateFirst + '-' + yearFirst;
      //since we are getting ISO dateformat from backend, I want to transit to mm-dd-yyyy so that it could be shown
      if (convertedDateFromat.replaceAll('-', '/') === calendarDate) {
        listData.push(item);
      }
    });
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <div className="calendar-card">
        <ul className="events">
          {listData.map(item => (
            <li
              key={item.id}
              className="list"
              onClick={e => {
                showModal(item);
              }}
            >
              <Badge
                className="badge-capital"
                status={'success'}
                text={item.subject}
              />
              <Button
                onClick={() => showModal(item)}
                type="primary"
                shape="round"
                icon={<InfoCircleOutlined />}
                size={'small'}
              >
                {' '}
                details
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <section className="site-calendar-demo-card">
        <div>
          <h1>Your Calendar</h1>

          <Modal //the pop up when i click on the course in the calender
            title="Selected Course"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <h3>{selectedCourse.description}</h3>
            <p>
              Course Date:{' '}
              {selectedCourse.start_date &&
                dateConverter(selectedCourse.start_date)}
            </p>
            <p>
              Course Time:
              {`${selectedCourse.start_time}-${selectedCourse.end_time}`}
            </p>
            <p>
              Course Location:
              {selectedCourse.location}
            </p>
            <p>Student List:</p>
          </Modal>
        </div>
        <Calendar dateCellRender={dateCellRender} />
      </section>
    </>
  );
};

const mapStateToProps = state => {
  return { instructor: state.instructorReducer };
};
export default connect(mapStateToProps, { setSelectedCourse })(
  InstructorCalender
);
