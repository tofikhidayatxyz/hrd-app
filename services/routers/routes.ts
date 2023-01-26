import { ComponentType } from 'react'
import EmployeeIndex from '../../screens/Employee'
import SingIn from '../../screens/Auth/SingInScreen'
import SignUp from '../../screens/Auth/SingUpScreen'
import Home from '../../screens/Home/HomeScreen'
import EmployeeCreate from '../../screens/Employee/Create'
import AttendanceCreate from '../../screens/Attendance/Create'
import ParticipantCreate from '../../screens/Participant/Create'
import ParticipantIndex from '../../screens/Participant'
import DeveloperIndex from '../../screens/Developer'
import DeveloperCreate from '../../screens/Developer/Create'

/**
 * Maping interface
 */
interface RouterInterface {
  name: string
  type?: string
  component: ComponentType<any>
  options?: any
  title?: string
  path?: string
  auth?: boolean
}

/**
 * Main Routers
 */
const Routers: Array<RouterInterface> = [
  {
    name: 'auth.signin',
    type: 'page',
    component: SingIn,
    auth: false,
    options: {
      title: 'Sign In',
      headerShown: false,
    },
  },
  {
    name: 'auth.signup',
    type: 'page',
    auth: false,
    component: SignUp,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'home',
    type: 'page',
    auth: true,
    component: Home,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'auth.otp',
    type: 'modal',
    component: SingIn,
    title: 'OTP',
    auth: true,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'employee.index',
    type: 'page',
    auth: true,
    component: EmployeeIndex,
    title: 'Emploee',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'employee.create',
    type: 'page',
    auth: true,
    component: EmployeeCreate,
    title: 'Create Employee',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'attendance.create',
    type: 'page',
    auth: true,
    component: AttendanceCreate,
    title: 'Create Attendance',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'participant.index',
    type: 'page',
    auth: true,
    component: ParticipantIndex,
    title: 'Emploee',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'participant.create',
    type: 'page',
    auth: true,
    component: ParticipantCreate,
    title: 'Create Employee',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'developer.index',
    type: 'page',
    auth: true,
    component: DeveloperIndex,
    title: 'Developer',
    options: {
      headerShown: false,
    },
  },
  {
    name: 'developer.create',
    type: 'page',
    auth: true,
    component: DeveloperCreate,
    title: 'Create Developer',
    options: {
      headerShown: false,
    },
  },
]

export default Routers
