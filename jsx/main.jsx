(function(){
  milkcocoa.getCurrentUser( (err, user) => {
    var isLoggedIn = (err == null);
    if(isLoggedIn){
      milkcocoa.dataStore("tweet").query({}).done(tweets=>{
        milkcocoa.dataStore(`notifications/${user.password.email.split("@")[0]}`).query({}).done(notifications=>{
          React.render(<FEED tweets={tweets} user={user} notifications={notifications} />, document.body);
        });
      });
    } else {
      React.render(<LP />, document.body);
    }
  });
}());
