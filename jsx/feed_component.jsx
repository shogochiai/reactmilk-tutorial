(function(global){
  var FEED = React.createClass({
    render(){
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
      </div>);
    },
    onInputKeyPress(e){
      if(e.which == 13){
        var tweet = e.target.value;
        var $div = this.createTweet(tweet);
        setTimeout(_=>{
          document.getElementById("tweet_list").appendChild($div); //2wayなので筋悪
        },0);
      }
    },
    createTweet(tweet){
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
