// controllers/registrationController.js

const {Staff} = require('../models/Staff');
const Attendance = require('../models/Attendance');


exports.getStaffDetails = async (req, res) => {
    try {
      const { staffId } = req.params;
  
      // Check if staffId is provided
      if (!staffId) {
        return res.status(400).json({ message: 'Staff ID is required' });
      }
  
      // Find staff member by staffId
      const staff = await Staff.findOne({ where: { staffId } });
  
      // Check if staff member exists
      if (!staff) {
        return res.status(404).json({ message: 'Staff not found' });
      }
  
      // Return staff details
      res.status(200).json(staff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};


let totalRegistrations = 0; // Track total registrations


exports.registerStaff = async (req, res) => {
  try {
    const { staffId } = req.body;
    const staff = await Staff.findOne({ where: { staffId } });

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Check if the staff member is already registered
    const existingAttendance = await Attendance.findOne({ where: { staffId } });
    if (existingAttendance) {
      return res.status(400).json({ message: 'Staff already registered' });
    }

    // Increment total registrations count
    totalRegistrations++;

    // Generate seat number based on total registrations count
    const seatNumber = generateSeatNumber(totalRegistrations);

    // Create an attendance record
    await Attendance.create({
      staffId: staff.staffId,
      seatNumber
    });

    res.status(200).json({ message: 'Staff registered successfully', seatNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


function generateSeatNumber(totalRegistrations) {
    // Assuming there are 100 seats
    const maxSeats = 110;
  
    // If totalRegistrations exceeds the maximum number of seats,
    // return null to indicate that no more seats are available
    if (totalRegistrations > maxSeats) {
      return null;
    }
  
    // Seat numbers will be assigned in order of registration, starting from 1
    return totalRegistrations;
  }


exports.getAttendance = async (req, res) => {
    try {
      // Fetch all attendance records
      const attendanceRecords = await Attendance.findAll();
  
      // Prepare data to send
      const attendanceData = await Promise.all(
        attendanceRecords.map(async (record) => {
          const staff = await Staff.findOne({ where: { staffId: record.staffId } });
          return {
            name: staff.name,
            seatNumber: record.seatNumber,
            email: staff.email,
            staffNumber: staff.staffId
          };
        })
      );
  
      res.status(200).json(attendanceData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };