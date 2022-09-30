// import {format} from 'date-fns'
// import './index.css'

// const AppointmentItem = props => {
//   const {appointmentsList, starButtonClicked} = props
//   const {title, date, id, isStared} = appointmentsList

//   const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

//   const starImage = isStared
//     ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
//     : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

//   const showAppointments = () => {
//     starButtonClicked(id)
//   }

//   return (
//     <li className="list-elements">
//       <div className="top-nav">
//         <h1 className="heading">{title}</h1>
//         <button
//           type="button"
//           className="star-button"
//           onClick={showAppointments}
//         >
//           <img src={starImage} alt="star" className="stars" />
//         </button>
//       </div>
//       <p className="date-para">{formattedDate}</p>
//     </li>
//   )
// }

// export default AppointmentItem

import './index.css'

const AppointmentIem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">{title}</p>
        <button
          type="button"
          testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentIem
