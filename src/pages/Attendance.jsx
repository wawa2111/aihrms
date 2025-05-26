import React from 'react';
import QRAttendance from '../features/attendance/QRAttendance';

const Attendance = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>
      <QRAttendance />
    </div>
  );
};

export default Attendance;