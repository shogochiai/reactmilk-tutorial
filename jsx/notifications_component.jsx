(function(global){
  var NOTIFICATIONS = React.createClass({
    render(){
      this.observeNotification();
      return (<div id="notification">
        <ul id="notification_list">
          {
            this.props.notifications.map(notification=>{
              return <li onClick={this.onNotificationClick} key={notification.id}>{notification.content}</li>;
            })
          }
        </ul>
      </div>);
    },
    observeNotification(){
      var ds_notification = milkcocoa.dataStore(`notifications/${this.props.username}`);
      var $nList = document.getElementById("notification_list");

      ds_notification.on("set", data=>{
        $nList.appendChild(<p>{data.value.content}</p>);
      });
      ds_notification.on("remove", data=>{
        console.log(data);
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


/*
        var $li = docuemnt.createElement("li");
        $li.innerHTML = `${data.content}が${data.user}から届きました`;
        $li.setAttribute("id", data.id);
        document.getElementById("notification_list").appendChild($li);

*/
