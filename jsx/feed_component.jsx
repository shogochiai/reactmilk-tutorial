(function(global){
  var FEED = React.createClass({
    render(){
      this.observeTweet();
      var tweets = this.props.tweets;
      return (<div id="feed">
        <div id="notifier" onClick={this.onClickNotifier}>{this.props.notifications.length}</div>
        <NOTIFICATIONS notifications={this.props.notifications} username={this.username()} />

        <h1>{this.username() + "'s feed"}</h1>
        <input type="text" placeholder="Tweets here!" onKeyPress={this.onInputKeyPress} />
        <div id="tweet_list">
          {tweets.map((tweet)=>{
            return <div key={tweet.id} className="tweet">
              <p>{tweet.user}</p>
              <p>{tweet.content}</p>
            </div>;
          })}
        </div>
        <button onClick={this.onLogoutClick}>Logout</button>
      </div>);
    },
    onInputKeyPress(e){
      if(e.which == 13) this.saveTweet(e.target.value);
    },
    saveTweet(tweet){
      milkcocoa.dataStore("tweet").push({content:tweet, user: this.username()});
    },
    observeTweet(){
      milkcocoa.dataStore("tweet").on("push", (data)=>{
        var tweet = data.value.content;
        var $div = this.createTweetDiv(tweet);
        this.renderTweet($div);

        var called_name = this.replyFilter(tweet);

        if(called_name != "") milkcocoa.dataStore(`notifications/${called_name}`).set(data.id,{user:data.value.user, content:data.value.content});
      });
    },
    replyFilter(content){
      var called_name = "";
      var base = content.split("@");
      for(var i=base.length-1; i>=1;i--){
        called_name = base[i].split(" ")[0];
      }
      return called_name;
    },
    renderTweet($div){
      setTimeout(_=>{
        document.getElementById("tweet_list").appendChild($div); //2wayなので筋悪
      },0);
    },
    createTweetDiv(tweet){
      var $div = document.createElement("div");
      var $p_user = document.createElement("p");
      var $p_content = document.createElement("p");
      $div.setAttribute("class","tweet");
      $p_user.setAttribute("class","tweet_owner");

      $p_user.innerHTML = `@${this.username()}`;
      $p_content.innerHTML = tweet;

      $div.appendChild($p_user);
      $div.appendChild($p_content);
      return $div;
    },
    username(){
      return this.props.user.password.email.split("@")[0];
    },
    onLogoutClick(){
      milkcocoa.logout();
      location.reload();
    },
    onClickNotifier(){
      document.getElementById("notification_list").setAttribute("class","active");
    },
    observeNotifier(){
      var ds_notification = milkcocoa.dataStore(`notifications/${this.props.username}`);
      var len = this.props.notification.length;
      var $notifier = document.getElementById("notifier");
      ds_notification.on("set", data=>{
        $notifier.innerHTML = len + 1;
      });
      ds_notification.on("remove", data=>{
        $notifier.innerHTML = len + 1;
      });
    },

  });

  global.FEED = FEED;

  return global;

}(window));
