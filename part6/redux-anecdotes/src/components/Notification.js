import { connect } from 'react-redux'

const Notification = (props) => {
	console.log(props.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
	if (props.notification === null)
    return null
  
  return <div style={style}>{props.notification}</div>
}

const mapStateToProps = (state) => {
  return {
		notification: state.notification
	}
}

export default connect(mapStateToProps)(Notification)