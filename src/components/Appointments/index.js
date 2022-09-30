// import {Component} from 'react'

// import {v4} from 'uuid'
// import AppointmentItem from '../AppointmentItem/index'
// import './index.css'

// class Appointments extends Component {
//   state = {title: '', date: '', appointmentsList: []}

//   onSubmitForm = event => {
//     event.preventDefault()
//     const {title, date} = this.state
//     const newAppointment = {
//       id: v4(),
//       title,
//       date,
//       isStared: false,
//     }
//     this.setState(prevState => ({
//       appointmentsList: [...prevState.appointmentsList, newAppointment],
//       title: '',
//       date: '',
//     }))
//   }

//   onChangeTitle = event => {
//     this.setState({title: event.target.value})
//   }

//   onChangeDate = event => {
//     this.setState({date: event.target.value})
//   }

//   starButtonClicked = id => {
//     this.setState(prevState => ({
//       appointmentsList: prevState.appointmentsList.map(eachAppointment => {
//         if (id === eachAppointment.id) {
//           return {...eachAppointment, isStared: !eachAppointment.isStared}
//         }
//         return eachAppointment
//       }),
//     }))
//   }

//   starredAppointments = () => {
//     const {appointmentsList} = this.state
//     const filteredAppointments = appointmentsList.filter(
//       eachAppointment => eachAppointment.isStared === true,
//     )
//     this.setState({appointmentsList: filteredAppointments})
//   }

//   render() {
//     const {appointmentsList} = this.state
//     return (
//       <div className="bg-container">
//         <div className="card-container">
//           <h1 className="heading">Add Appointments</h1>
//           <div className="form-container">
//             <form className="form" onSubmit={this.onSubmitForm}>
//               <label htmlFor="text-element" className="title">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="text-element"
//                 placeholder="Title"
//                 className="title-input"
//                 onChange={this.onChangeTitle}
//               />
//               <label htmlFor="date-element" className="title">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 id="date-element"
//                 className="title-input"
//                 onChange={this.onChangeDate}
//               />
//               <button type="submit" className="button">
//                 Add
//               </button>
//             </form>
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
//               alt="appointments"
//               className="image"
//             />
//           </div>
//           <hr />
//           <div className="appointments-container">
//             <div className="ac-nav">
//               <h1 className="ac-heading">Appointments</h1>
//               <button
//                 type="button"
//                 className="ac-button"
//                 onClick={this.starredAppointments}
//               >
//                 Starred
//               </button>
//             </div>
//             <ul className="all-appointments">
//               {appointmentsList.map(eachAppointment => (
//                 <AppointmentItem
//                   appointmentsList={eachAppointment}
//                   starButtonClicked={this.starButtonClicked}
//                 />
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default Appointments

import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
