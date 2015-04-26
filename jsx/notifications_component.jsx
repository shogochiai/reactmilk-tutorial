(function(global){
  var NOTIFICATIONS = React.createClass({
    render(){
      this.observeNotification();
      return (<div id="notification">
        <ul id="notification_list">
          {
            this.props.notifications.map(notification=>{
              <li onClick={this.onNotificationClick} key={this.props.notification.id}>{this.props.notification.content}</li>
            })
          }
        </ul>
      </div>);
    },
    observeNotification(){
      milkcocoa.dataStore(`notifications/${this.props.username}`).on("set", data=>{
        var $li = docuemnt.createElement("li");
        $li.innerHTML = `${data.content}が${data.user}から届きました`;
        $li.setAttribute("id", data.id);
        document.getElementById("notification_list").appendChild($li);
      });
    },
    onNotificationClick(e){
      var id = e.target.id;
      milkcocoa.dataStore(`notifications/${this.props.username}`).remove(id);
    }
  });

  global.NOTIFICATIONS = NOTIFICATIONS;
  return global;
}(window));
