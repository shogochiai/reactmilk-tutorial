(function(global){
  var FEED = React.createClass({
    render(){
      this.observeTweet();
      var tweets = this.props.tweets;
      return (<div id="feed">
        <h1>{this.username() + "'s feed"}</h1>
        <input type="text" placeholder="Tweets here!" onKeyPress={this.onInputKeyPress} />
        <div id="tweet_list">
          {tweets.map((tweet)=>{
            return (<div key={tweet.id} className="tweet">
              <p>{tweet.user}</p>
              <p>{tweet.content}</p>
            </div>);
          })}
        </div>
        <button onClick={this.onLogoutClick}>Logout</button>
        <NOTIFICATIONS notifications={this.props.notifications} username={this.username()} />
      </div>);
    },
    onInputKeyPress(e){
      if(e.which == 13){
        var tweet = e.target.value;
        saveTweet(tweet);
        var $div = this.createTweetDiv(tweet);
        this.renderTweet($div);
      }
    },
    saveTweet(){
      milkcocoa.dataStore("tweet").push({content:tweet, user: this.username()});
    },
    observeTweet(){
      milkcocoa.dataStore("tweet").on("push", (data)=>{
        var $div = this.createTweetDiv(data.content);
        this.renderTweet($div);

        var called_name = replyFilter(data.content);
        if(called_name != "") milkcocoa.dataStore(`notifications/${called_name}`).set(data.id,{user:data.user, content:data.content});
      });
    },
    replyFilter(content){
      var base = content.split("@");
      var called_name = "";
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

      $p_user.innerHTML = this.username();
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
    }
  });

  global.FEED = FEED;

  return global;

}(window));
