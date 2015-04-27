(function(global){
  var NOTIFICATIONS = React.createClass({
    render(){
      this.observeNotification();
      return (<div id="notification" style={{display: "none"}}>
        <ul id="notification_list">
          {
            this.props.notifications.map(notification=>{
              return <li onClick={this.onNotificationClick} key={notification.id} id={notification.id}>{notification.content}</li>;
            })
          }
        </ul>
      </div>);
    },
    observeNotification(){
      var ds_notification = milkcocoa.dataStore(`notifications/${this.props.username}`);

      ds_notification.on("set", data=>{
        var $li = document.createElement("li");
        $li.innerHTML = data.value.content;
        $li.setAttribute("id", data.id);
        $li.addEventListener("click", this.onNotificationClick);
        document.getElementById("notification_list").appendChild($li);
      });
      ds_notification.on("remove", data=>{
        document.getElementById(data.id).remove();
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
