const DashCard = (props) => {
  return (
    <div className={`dash-card ${props.margin}`}>
      {props.children}
    </div>
  )
}

export default DashCard